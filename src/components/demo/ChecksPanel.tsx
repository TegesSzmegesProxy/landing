import { Check, Minus } from 'lucide-react';
import { tools } from '../../data/demo';
import type { DemoCtx, StaticVerdict } from '../../types';
import { cn } from '../../lib/cn';
import { Badge } from '../ui/Badge';
import { Rich } from './Rich';
import { StatusChip } from './StatusChip';

const row = 'grid grid-cols-[1fr_auto] gap-x-3 gap-y-0.5 items-center py-3 border-t border-(--border-subtle) first:border-t-0 first:pt-0';

const NEXT: Record<StaticVerdict, string> = {
  POLICY_VIOLATION: 'BLOCK now. JEV is not called.',
  SUSPICIOUS: 'Always sent to JEV.',
  SAFE: 'On to Sampling.',
  ERROR: 'Tenant-configured failure behaviour.',
};

const TONE: Record<StaticVerdict, string> = {
  POLICY_VIOLATION: 'border-clay-500 bg-clay-100',
  ERROR: 'border-clay-500 bg-clay-100',
  SUSPICIOUS: 'border-ochre-500 bg-ochre-100',
  SAFE: 'border-verdigris-500 bg-verdigris-100',
};

/** Steps 9–11: which tools the Runner picked, what each found, and the aggregated static verdict. */
export function ChecksPanel({ mode, ctx }: { mode: 'runner' | 'tools' | 'aggregate'; ctx: DemoCtx }) {
  const { checks, staticVerdict } = ctx.result;

  if (mode === 'runner') {
    return (
      <ul className="m-0 p-0 list-none">
        {tools.map((t) => (
          <li key={t.id} className={row}>
            <span className="font-mono text-[14px] text-ink-900">{t.name}</span>
            <Badge status={t.runs ? 'jev' : 'neutral'} dot={false}>
              {t.runs ? <Check size={12} strokeWidth={2} aria-hidden /> : <Minus size={12} strokeWidth={2} aria-hidden />}
              {t.runs ? 'Selected' : 'Skipped'}
            </Badge>
            <span className="col-span-2 text-[13px] text-muted">{t.runs ? t.hint : t.skipReason}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (mode === 'tools') {
    return (
      <ul className="m-0 p-0 list-none">
        {checks.map((c) => (
          <li key={c.id} className={row}>
            <span className="font-mono text-[14px] text-ink-900">{c.name}</span>
            <StatusChip status={c.status} />
            <span className="col-span-2 text-[13px] text-muted">{c.status === 'na' ? c.detail : <Rich text={c.detail} />}</span>
          </li>
        ))}
      </ul>
    );
  }

  const flagged = checks.filter((c) => c.status === 'violation' || c.status === 'suspicious' || c.status === 'error');
  return (
    <div className="flex flex-col gap-4">
      <div className={cn('rounded-md border p-4', TONE[staticVerdict])}>
        <span className="font-mono text-[11px] tracking-[.08em] uppercase text-muted">StaticVerdict</span>
        <div className="mt-1 font-mono text-[22px] leading-tight text-ink-900">{staticVerdict}</div>
        <p className="m-0 mt-2 text-[14px] text-ink-900">{NEXT[staticVerdict]}</p>
      </div>
      <p className="m-0 font-mono text-[12px] text-muted">priority: ERROR &gt; POLICY_VIOLATION &gt; SUSPICIOUS &gt; SAFE</p>
      {flagged.length ? (
        <ul className="m-0 p-0 list-none">
          {flagged.map((c) => (
            <li key={c.id} className={row}>
              <span className="font-mono text-[14px] text-ink-900">{c.name}</span>
              <StatusChip status={c.status} />
              <span className="col-span-2 text-[13px] text-muted">
                <Rich text={c.detail} />
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="m-0 text-[14px] text-body">Every tool returned SAFE.</p>
      )}
    </div>
  );
}
