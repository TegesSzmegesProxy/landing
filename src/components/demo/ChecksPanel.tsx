import { Check, Minus } from 'lucide-react';
import { demoModel, tools } from '../../data/demo';
import type { DemoCtx } from '../../types';
import { Badge } from '../ui/Badge';
import { ScoreMeter } from '../ui/ScoreMeter';
import { Rich } from './Rich';
import { StatusChip } from './StatusChip';

const row = 'grid grid-cols-[1fr_auto] gap-x-3 gap-y-0.5 items-center py-3 border-t border-(--border-subtle) first:border-t-0 first:pt-0';

/** Steps 9–11: which checks the Runner picked, what each found, and the merged suspicion. */
export function ChecksPanel({ mode, ctx }: { mode: 'runner' | 'tools' | 'aggregate'; ctx: DemoCtx }) {
  const { checks, suspicion, level } = ctx.result;

  if (mode === 'runner') {
    return (
      <ul className="m-0 p-0 list-none">
        {tools.map((t) => (
          <li key={t.id} className={row}>
            <span className="text-[14px] font-medium text-ink-900">{t.name}</span>
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
            <span className="text-[14px] font-medium text-ink-900">{c.name}</span>
            <StatusChip status={c.status} />
            <span className="col-span-2 text-[13px] text-muted">{c.status === 'na' ? c.detail : <Rich text={c.detail} />}</span>
          </li>
        ))}
      </ul>
    );
  }

  const adds = checks.filter((c) => c.signal > 0);
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-mono text-[11px] tracking-[.08em] uppercase text-muted">Suspicion</span>
          <span className="font-mono text-[28px] leading-none tabular-nums text-ink-900">{suspicion.toFixed(2)}</span>
        </div>
        <ScoreMeter score={suspicion} label={null} showValue={false} threshold={0.6} tiles={24} className="mt-3" />
        <p className="m-0 mt-2 font-mono text-[12px] text-muted">
          {level} · JEV gate at {demoModel.gate.toFixed(2)}
        </p>
      </div>
      {adds.length ? (
        <ul className="m-0 p-0 list-none">
          {adds.map((c) => (
            <li key={c.id} className={row}>
              <span className="text-[14px] text-ink-900">{c.name}</span>
              <span className="font-mono text-[13px] text-ink-900">+{c.signal.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="m-0 text-[14px] text-body">No check added any suspicion.</p>
      )}
    </div>
  );
}
