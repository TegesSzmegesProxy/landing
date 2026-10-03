import { Check, Minus } from 'lucide-react';
import { demoModel, scenarioLabels } from '../../data/demo';
import type { DemoCtx, Scenario, StepData } from '../../types';
import { cn } from '../../lib/cn';
import { Badge } from '../ui/Badge';
import { ScenarioToggle } from './ScenarioToggle';

const REASON = {
  suspicious: 'Suspicious, so JEV is always called.',
  sampled: 'Quiet on static checks, but the endpoint is risk: high, so this request was sampled.',
  skipped: 'Below the gate and not sampled. No AI call, no AI cost.',
} as const;

/** Step 12: the gate, the live verdict, and the attack/benign contrast. */
export function SamplingPanel({ data, ctx }: { data: Extract<StepData, { kind: 'sampling' }>; ctx: DemoCtx }) {
  const { jev, suspicion } = ctx.result;
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md border border-(--border-default) bg-bone-50 p-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <span className="font-mono text-[12px] text-muted">
            suspicion {suspicion.toFixed(2)} · gate {demoModel.gate.toFixed(2)}
          </span>
          <Badge status={jev.called ? 'jev' : 'passed'} dot={false}>
            {jev.called ? <Check size={12} strokeWidth={2} aria-hidden /> : <Minus size={12} strokeWidth={2} aria-hidden />}
            {jev.called ? 'Send to JEV' : 'Skip JEV'}
          </Badge>
        </div>
        <p className="m-0 mt-3 text-[14px] text-body">{REASON[jev.reason]}</p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {(['attack', 'benign'] as Scenario[]).map((s) => (
          <div
            key={s}
            className={cn('rounded-md border p-3', s === ctx.scenario ? 'border-ink-900 bg-bone-50' : 'border-(--border-subtle) opacity-70')}
          >
            <div className="font-mono text-[11px] tracking-[.08em] uppercase text-muted">
              {scenarioLabels[s]}
              {s === ctx.scenario && ' · now'}
            </div>
            <div className="mt-1.5 font-mono text-[12px] text-ink-900 break-words">{data.contrast[s].request}</div>
            <div className="mt-1.5 text-[13px] text-body">{data.contrast[s].path}</div>
          </div>
        ))}
      </div>

      <div>
        <ScenarioToggle ctx={ctx} />
      </div>
    </div>
  );
}
