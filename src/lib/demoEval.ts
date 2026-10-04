import { demoModel, demoSteps, policyRules, tools } from '../data/demo';
import type { CheckStatus, DemoCheck, DemoNodeId, DemoResult, DemoSettings, DemoStep, FeedbackEndpoint, StaticVerdict, StepVariantKey, StepView } from '../types';

/** Aggregator priority from the contracts: ERROR > POLICY_VIOLATION > SUSPICIOUS > SAFE. */
const PRIORITY: Array<[CheckStatus, StaticVerdict]> = [
  ['error', 'ERROR'],
  ['violation', 'POLICY_VIOLATION'],
  ['suspicious', 'SUSPICIOUS'],
];

/** Tools → static verdict → sampling → JEV → decision → feedback, all from the visitor's three choices. */
export function evaluate({ scenario, rules, threshold }: DemoSettings, feedbackRows: FeedbackEndpoint[]): DemoResult {
  const attack = scenario === 'attack';

  const checks: DemoCheck[] = tools.map((t) => {
    const base = { id: t.id, name: t.name, hint: t.hint };
    if (!t.runs) return { ...base, status: 'na', detail: t.skipReason ?? 'n/a', evidence: 0 };
    if (!attack) return { ...base, ...t.benign, evidence: 0 };
    if (!t.needs) return { ...base, ...t.attack, evidence: t.evidence ?? 0 };

    const live = policyRules.filter((r) => t.needs?.includes(r.id) && rules[r.id]);
    if (!live.length) return { ...base, status: 'safe', detail: t.uncovered ?? t.benign.detail, evidence: 0 };
    return { ...base, status: t.attack.status, detail: live.find((r) => r.finding)?.finding ?? t.attack.detail, evidence: t.evidence ?? 0 };
  });

  const staticVerdict = PRIORITY.find(([s]) => checks.some((c) => c.status === s))?.[1] ?? 'SAFE';

  // Only SAFE requests are sampled; SUSPICIOUS always goes to JEV; POLICY_VIOLATION never does.
  const { minN, overrideMinN, maxN, draw: draws } = demoModel.sampling;
  const floorN = rules.samplingFloor ? overrideMinN : minN;
  const draw = draws[scenario];
  const path =
    staticVerdict === 'POLICY_VIOLATION' ? 'violation' : staticVerdict === 'SUSPICIOUS' ? 'suspicious' : draw < floorN ? 'sampled' : 'skipped';
  const called = path === 'suspicious' || path === 'sampled';

  // Pattern matches reach JEV as hints, so they raise the attack probability a little.
  const base = attack ? demoModel.jev.attack : demoModel.jev.benign;
  const evidence = attack ? checks.reduce((sum, c) => sum + c.evidence, 0) : 0;
  const attackProbability = Math.min(0.99, Math.round((base.attackProbability + evidence) * 100) / 100);
  const severity = base.severity;
  // confidence is |2p - 1|, informational only
  const confidence = Math.round(Math.abs(2 * attackProbability - 1) * 100) / 100;
  // The tenant attack rate is 0 before this request, so the effective threshold equals T here.
  const jevVerdict = attackProbability > threshold ? 'ATTACK' : 'BENIGN';
  const tier = !attack ? 'low' : evidence > 0 ? 'high' : 'mid';

  const isAttack = called && jevVerdict === 'ATTACK';
  const verdict = path === 'violation' || isAttack ? 'block' : 'allow';
  const p = attackProbability.toFixed(2);
  const t = threshold.toFixed(2);
  const reason =
    path === 'violation'
      ? 'POLICY_VIOLATION · blocked by static analysis, JEV not needed'
      : path === 'skipped'
        ? `SAFE, not sampled (draw ${draw.toFixed(2)} ≥ N ${floorN.toFixed(2)})`
        : isAttack
          ? `JEV ATTACK · attack probability ${p} > T ${t}`
          : `JEV BENIGN · attack probability ${p} ≤ T ${t}`;

  // Asymmetric EWMA of the attack rate → N = minN + (maxN - minN)(1 - e^(-k·s)). Only JEV classifications feed it.
  // With one endpoint and a fresh tenant, the endpoint and tenant rates move together, so s equals the rate.
  const { up, down, quiet, sensitivity } = demoModel.ewma;
  const toN = (rate: number) => floorN + (maxN - floorN) * (1 - Math.exp(-sensitivity * rate));
  const feedback = feedbackRows.map(({ endpoint, seed }) => {
    const isTarget = endpoint === demoModel.endpoint;
    if (!isTarget) return { endpoint, series: [...seed, ...Array(quiet + 1).fill(seed[seed.length - 1])], target: false };
    const series = seed.map(() => toN(0));
    let rate = 0;
    for (let i = 0; i <= quiet; i++) {
      // this request's classification first, then quiet benign samples cooling it down
      if (called) {
        const x = i === 0 && jevVerdict === 'ATTACK' ? 1 : 0;
        rate += (x > rate ? up : down) * (x - rate);
      }
      series.push(toN(rate));
    }
    return { endpoint, series, target: true };
  });

  return {
    checks,
    staticVerdict,
    path,
    sampling: { n: floorN, draw },
    jev: { called, verdict: jevVerdict, attackProbability, severity, confidence, tier },
    verdict,
    reason,
    missed: attack && verdict === 'allow',
    feedback,
  };
}

/** The step as this visitor sees it: variants layered over the base view and copy. */
export function resolveStep(step: DemoStep, { scenario }: DemoSettings, result: DemoResult): StepView & { explain: string; why: string } {
  const keys: StepVariantKey[] = [];
  if (scenario === 'benign') keys.push('benign');
  if (!result.jev.called) keys.push('skipJev');
  if (result.path === 'sampled') keys.push('sampled');
  keys.push(result.verdict);
  if (result.path === 'violation') keys.push('violation');

  let view = { highlightNodes: step.highlightNodes, highlightEdges: step.highlightEdges, packet: step.packet, explain: step.explain, why: step.why };
  for (const key of keys) {
    const v = step.alt?.[key];
    if (v) view = { ...view, ...v };
  }
  return view;
}

/** Step a click on a node jumps to: the step it leads, else the first that shows it. */
export function stepForNode(id: DemoNodeId): number {
  const lead = demoSteps.findIndex((s) => s.highlightNodes[0] === id);
  return lead >= 0 ? lead : Math.max(0, demoSteps.findIndex((s) => s.highlightNodes.includes(id)));
}
