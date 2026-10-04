import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { motion } from 'motion/react';
import { defaultRules, demoCopy, demoModel, demoSteps } from '../../data/demo';
import { evaluate, resolveStep, stepForNode } from '../../lib/demoEval';
import { reveal } from '../../lib/motion';
import { useInterval } from '../../lib/useInterval';
import type { DemoCtx, DemoNodeId, DemoSettings, RuleId, Scenario } from '../../types';
import { Card } from '../ui/Card';
import { Eyebrow } from '../Eyebrow';
import { ArchitectureCanvas } from './ArchitectureCanvas';
import { StepPanel } from './StepPanel';
import { Stepper } from './Stepper';

interface State extends DemoSettings {
  step: number;
  playing: boolean;
}

type Action =
  | { type: 'go'; step: number }
  | { type: 'advance' }
  | { type: 'toggle' }
  | { type: 'reset' }
  | { type: 'rule'; id: RuleId; on: boolean }
  | { type: 'scenario'; scenario: Scenario }
  | { type: 'threshold'; threshold: number };

const LAST = demoSteps.length - 1;
const REPLAY_FROM = demoSteps.findIndex((s) => s.id === 'ingress');
const AUTOPLAY_MS = 5200;

const feedbackRows = demoSteps.flatMap((s) => (s.data.kind === 'feedback' ? s.data.rows : []));
const clamp = (i: number) => Math.min(LAST, Math.max(0, i));

function initial(step = 0): State {
  return { step: clamp(step), playing: false, scenario: 'attack', rules: defaultRules, threshold: demoModel.defaultThreshold };
}

function reduce(s: State, a: Action): State {
  switch (a.type) {
    case 'go':
      return { ...s, step: clamp(a.step), playing: false };
    case 'advance':
      return s.step >= LAST ? { ...s, playing: false } : { ...s, step: s.step + 1, playing: s.step + 1 < LAST };
    case 'toggle':
      return s.playing ? { ...s, playing: false } : s.step >= LAST ? { ...s, step: 0, playing: true } : { ...s, playing: true };
    case 'reset':
      return initial();
    case 'rule':
      return { ...s, rules: { ...s.rules, [a.id]: a.on } };
    case 'scenario':
      // replay the runtime trace down the new path
      return { ...s, scenario: a.scenario, step: REPLAY_FROM, playing: s.step !== REPLAY_FROM };
    case 'threshold':
      return { ...s, threshold: a.threshold };
  }
}

/** `#step=7` → index 6, or null. */
function stepFromHash(): number | null {
  const m = /step=(\d+)/.exec(window.location.hash);
  return m ? clamp(Number(m[1]) - 1) : null;
}

const isField = (el: EventTarget) => el instanceof HTMLElement && !!el.closest('input, select, textarea');
const isControl = (el: EventTarget) => el instanceof HTMLElement && !!el.closest('input, select, textarea, button, a, [role="button"]');

export function DemoPage({ onDeploy }: { onDeploy: () => void }) {
  const [state, dispatch] = useReducer(reduce, undefined, () => initial(stepFromHash() ?? 0));
  const { step: index, playing, scenario, rules, threshold } = state;

  useInterval(() => dispatch({ type: 'advance' }), playing ? AUTOPLAY_MS : null);

  // The hash follows the step; a pasted or edited `#step=N` moves the demo.
  const written = useRef(index);
  useEffect(() => {
    if (written.current === index) return;
    written.current = index;
    window.history.replaceState(null, '', `#step=${index + 1}`);
  }, [index]);
  useEffect(() => {
    if (stepFromHash() !== null) document.getElementById(demoCopy.id)?.scrollIntoView();
    const onHash = () => {
      const s = stepFromHash();
      if (s !== null) dispatch({ type: 'go', step: s });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const result = useMemo(() => evaluate({ scenario, rules, threshold }, feedbackRows), [scenario, rules, threshold]);
  const step = demoSteps[index];
  const view = resolveStep(step, { scenario, rules, threshold }, result);

  const go = useCallback((i: number) => dispatch({ type: 'go', step: i }), []);
  const ctx: DemoCtx = {
    scenario,
    rules,
    threshold,
    result,
    onDeploy,
    setRule: (id, on) => dispatch({ type: 'rule', id, on }),
    setScenario: (s) => dispatch({ type: 'scenario', scenario: s }),
    setThreshold: (t) => dispatch({ type: 'threshold', threshold: t }),
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && !isField(e.target)) {
      e.preventDefault();
      go(index + (e.key === 'ArrowRight' ? 1 : -1));
    } else if (e.key === ' ' && !isControl(e.target)) {
      e.preventDefault();
      dispatch({ type: 'toggle' });
    }
  };

  return (
    <section
      id={demoCopy.id}
      aria-labelledby="demo-heading"
      tabIndex={-1}
      onKeyDown={onKeyDown}
      className="max-w-[1360px] mx-auto px-6 pb-40 pt-8 scroll-mt-20 outline-none"
    >
      <motion.div {...reveal} className="max-w-[760px]">
        <Eyebrow>{demoCopy.eyebrow}</Eyebrow>
        <h2 id="demo-heading" className="mt-4 mb-0 font-sans text-[48px] max-md:text-[36px] font-light leading-[1.08] tracking-[-0.03em] text-ink-900 text-balance">
          {demoCopy.title}
        </h2>
        <p className="mt-5 mb-0 text-[17px] leading-[1.55] text-body text-pretty">{demoCopy.body}</p>
        <p className="mt-3 mb-0 font-mono text-[12px] text-muted">{demoCopy.note}</p>
      </motion.div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_440px] items-stretch">
        <Card padding={16} className="min-w-0 max-md:p-0 max-md:border-0 max-md:bg-transparent max-md:shadow-none">
          <ArchitectureCanvas
            stepId={step.id}
            phase={step.phase}
            view={view}
            onSelect={(id: DemoNodeId) => go(stepForNode(id))}
          />
        </Card>
        <StepPanel step={step} index={index} total={demoSteps.length} explain={view.explain} why={view.why} ctx={ctx} />
      </div>

      <Stepper steps={demoSteps} index={index} playing={playing} onGo={go} onToggle={() => dispatch({ type: 'toggle' })} onReset={() => dispatch({ type: 'reset' })} />
    </section>
  );
}
