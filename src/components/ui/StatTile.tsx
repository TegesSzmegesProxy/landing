import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Sparkline } from './Sparkline';

export interface StatTileProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  label: string;
  value: ReactNode;
  unit?: string;
  delta?: string;
  deltaTone?: 'good' | 'bad' | 'neutral';
  trend?: number[];
  trendColor?: string;
  variant?: 'paper' | 'ink';
}

/** Single metric: mono uppercase label, large light numeral, optional delta + sparkline. */
export function StatTile({ label, value, unit, delta, deltaTone = 'neutral', trend, trendColor, variant = 'paper', className, ...rest }: StatTileProps) {
  const ink = variant === 'ink';
  const dc = { good: 'text-verdigris-500', bad: 'text-clay-500', neutral: ink ? 'text-bone-500' : 'text-muted' }[deltaTone];
  return (
    <div
      className={cn(
        'flex flex-col gap-3.5 p-5 rounded-lg font-sans min-w-0',
        ink ? 'bg-ink-900 border border-ink-900' : 'bg-card border border-(--border-subtle) shadow-1',
        className,
      )}
      {...rest}
    >
      <div className={cn('font-mono text-[11px] tracking-[0.08em] uppercase', ink ? 'text-bone-500' : 'text-muted')}>{label}</div>
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-1">
            <span className={cn('text-[40px] font-normal leading-none tracking-[-0.04em] tabular-nums', ink ? 'text-bone-50' : 'text-strong')}>
              {value}
            </span>
            {unit && <span className={cn('font-mono text-[13px]', ink ? 'text-bone-500' : 'text-muted')}>{unit}</span>}
          </div>
          {delta && <div className={cn('mt-2 font-mono text-[12px]', dc)}>{delta}</div>}
        </div>
        {trend && <Sparkline data={trend} width={96} height={36} color={trendColor ?? (ink ? 'var(--blue-300)' : 'var(--ink-900)')} />}
      </div>
    </div>
  );
}
