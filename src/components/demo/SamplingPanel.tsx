import { Check, Minus, X } from 'lucide-react';
import { demoModel } from '../../data/demo';
import type { DemoCtx } from '../../types';
import { Badge } from '../ui/Badge';
import { ScenarioToggle } from './ScenarioToggle';

const pct = (v: number) => `${Math.round(v * 100)}%`;

/** Step 12: static verdict → route. Only SAFE requests are sampled, with probability N. */
export function SamplingPanel({ ctx }: { ctx: DemoCtx }) {
  const { path, staticVerdict, sampling } = ctx.result;
  const { maxN } = demoModel.sampling;

  const route = (
    {
      violation: { badge: 'blocked', Icon: X, label: 'Blocked before Sampling', text: 'POLICY_VIOLATION never reaches Sampling, and sampling can never bypass it.' },
      suspicious: { badge: 'jev', Icon: Check, label: 'Send to JEV', text: 'Every SUSPICIOUS request goes to JEV, whatever N is.' },
      sampled: { badge: 'jev', Icon: Check, label: 'Sampled → JEV', text: `Secure random draw ${sampling.draw.toFixed(2)} < N ${sampling.n.toFixed(2)}, so JEV checks it.` },
      skipped: { badge: 'passed', Icon: Minus, label: 'Not sampled → ALLOW', text: `Draw ${sampling.draw.toFixed(2)} ≥ N ${sampling.n.toFixed(2)}. Allowed with no AI call and no AI cost.` },
    } as const
  )[path];

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md border border-(--border-default) bg-bone-50 p-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <span className="font-mono text-[12px] text-muted">static {staticVerdict}</span>
          <Badge status={route.badge} dot={false}>
            <route.Icon size={12} strokeWidth={2} aria-hidden />
            {route.label}
          </Badge>
        </div>
        <p className="m-0 mt-3 text-[14px] text-body">{route.text}</p>
      </div>

      <dl className="m-0 grid grid-cols-3 gap-2 text-[13px]">
        {[
          ['N', pct(sampling.n)],
          ['minN – maxN', `${pct(sampling.n)} – ${pct(maxN)}`],
          ['Draw', path === 'sampled' || path === 'skipped' ? sampling.draw.toFixed(2) : 'not used'],
        ].map(([k, v]) => (
          <div key={k} className="rounded-md border border-(--border-subtle) p-3">
            <dt className="font-mono text-[11px] tracking-[.08em] uppercase text-muted">{k}</dt>
            <dd className="m-0 mt-1 font-mono text-ink-900">{v}</dd>
          </div>
        ))}
      </dl>

      <div>
        <ScenarioToggle ctx={ctx} />
      </div>
    </div>
  );
}
