import { useId } from 'react';
import { ShieldCheck, ShieldX, TriangleAlert } from 'lucide-react';
import { demoModel } from '../../data/demo';
import type { DemoCtx } from '../../types';
import { cn } from '../../lib/cn';
import { Badge } from '../ui/Badge';
import { ScoreMeter } from '../ui/ScoreMeter';

/** Step 14: JEV attack probability against a threshold the visitor can move; the decision follows. */
export function DecisionPanel({ ctx }: { ctx: DemoCtx }) {
  const id = useId();
  const { jev, verdict, missed, reason, path } = ctx.result;
  const [min, max, step] = demoModel.thresholdRange;
  const block = verdict === 'block';

  return (
    <div className="flex flex-col gap-4">
      <p className="m-0 font-mono text-[12px] text-muted">ATTACK ⇔ attack probability &gt; T</p>

      {jev.called ? (
        <ScoreMeter score={jev.attackProbability} threshold={ctx.threshold} label="Attack probability" tiles={24} />
      ) : (
        <p className="m-0 text-[14px] text-body">
          {path === 'violation' ? 'Blocked by static analysis, so the threshold is not consulted.' : 'No JEV result on the cheap path, so the threshold is not consulted.'}
        </p>
      )}

      <div className={cn(!jev.called && 'opacity-50')}>
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor={id} className="font-mono text-[11px] tracking-[.08em] uppercase text-muted">
            Attack probability threshold T
          </label>
          <output htmlFor={id} className="font-mono text-[15px] text-ink-900 tabular-nums">
            {ctx.threshold.toFixed(2)}
          </output>
        </div>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={ctx.threshold}
          disabled={!jev.called}
          onChange={(ev) => ctx.setThreshold(Number(ev.target.value))}
          className="mt-2 w-full h-11 cursor-pointer accent-(--accent) disabled:cursor-not-allowed"
        />
      </div>

      <div role="status" className={cn('rounded-md border p-4', block ? 'border-clay-500 bg-clay-100' : 'border-verdigris-500 bg-verdigris-100')}>
        <div className="flex items-center gap-2 flex-wrap">
          {block ? <ShieldX size={18} strokeWidth={1.5} aria-hidden className="text-clay-600" /> : <ShieldCheck size={18} strokeWidth={1.5} aria-hidden className="text-verdigris-600" />}
          <span className="font-mono text-[15px] font-medium tracking-[.04em] text-ink-900">{block ? 'BLOCK' : 'ALLOW'}</span>
          <Badge status={block ? 'blocked' : 'passed'} dot={false}>
            {block ? 'HTTP 403' : 'forwarded'}
          </Badge>
        </div>
        <p className="m-0 mt-2 font-mono text-[12px] text-ink-900">{reason}</p>
        <p className="m-0 mt-2 text-[14px] text-ink-900">
          {block ? 'Rejected at the proxy. The request never reaches Upstream.' : 'Forwarded unchanged to Upstream. Adminer handles it as usual.'}
        </p>
      </div>

      {missed && (
        <p className="m-0 flex items-start gap-2 text-[13px] text-body">
          <TriangleAlert size={16} strokeWidth={1.5} aria-hidden className="mt-0.5 shrink-0 text-ochre-600" />
          <span>
            <strong className="font-medium text-ink-900">The attack got through.</strong>{' '}
            {jev.called ? 'Its attack probability did not exceed T. Lower T, or' : 'It was SAFE statically and not sampled. Go back to'} step 6 and turn the
            policy rules back on.
          </span>
        </p>
      )}
    </div>
  );
}
