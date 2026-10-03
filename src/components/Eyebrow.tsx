import type { ReactNode } from 'react';
import { cn } from '../lib/cn';

/** Mono 11/500, +0.08em, uppercase — the reused section label. `color` replaces the default text colour class. */
export function Eyebrow({ children, color = 'text-muted', className }: { children: ReactNode; color?: string; className?: string }) {
  return <div className={cn('font-mono text-[11px] leading-[normal] font-medium tracking-[.08em] uppercase', color, className)}>{children}</div>;
}
