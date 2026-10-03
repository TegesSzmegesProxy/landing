import type { ReactNode } from 'react';
import type { BadgeStatus } from '../../types';
import { cn } from '../../lib/cn';

export interface BadgeProps {
  status?: BadgeStatus;
  /** show the square status tile, default true */
  dot?: boolean;
  children?: ReactNode;
  className?: string;
}

/** [background, foreground, dot] */
const MAP: Record<BadgeStatus, readonly [string, string, string]> = {
  blocked: ['bg-(--status-blocked-bg)', 'text-clay-600', 'bg-(--status-blocked)'],
  passed: ['bg-(--status-passed-bg)', 'text-verdigris-600', 'bg-(--status-passed)'],
  review: ['bg-(--status-review-bg)', 'text-ochre-600', 'bg-(--status-review)'],
  jev: ['bg-(--status-jev-bg)', 'text-blue-700', 'bg-(--status-jev)'],
  neutral: ['bg-(--border-subtle)', 'text-body', 'bg-faint'],
};

/** Verdict badge — square dot (a mosaic tile), mono uppercase label. */
export function Badge({ status = 'neutral', dot = true, children, className }: BadgeProps) {
  const [bg, fg, d] = MAP[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 h-[22px] px-2 rounded-xs font-mono text-[11px] font-medium tracking-[0.04em] uppercase whitespace-nowrap',
        bg,
        fg,
        className,
      )}
    >
      {dot && <span aria-hidden className={cn('size-1.5 flex-none', d)} />}
      {children}
    </span>
  );
}
