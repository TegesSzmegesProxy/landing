import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type CardVariant = 'paper' | 'sunken' | 'glass' | 'glass-dark' | 'ink';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  /** px or CSS value, default 24 */
  padding?: number | string;
  radius?: string;
  children?: ReactNode;
}

const VARIANT: Record<CardVariant, string> = {
  paper: 'bg-card border border-(--border-subtle) shadow-1 text-body',
  sunken: 'bg-sunken border border-(--border-subtle) text-body',
  glass:
    'bg-(--surface-glass) border border-[rgba(255,255,255,.5)] shadow-[var(--shadow-3),var(--shadow-inset)] backdrop-blur-(--blur-glass) backdrop-saturate-110 text-stone-800',
  'glass-dark': 'bg-(--surface-glass-dark) border border-(--border-glass) shadow-3 backdrop-blur-(--blur-glass) text-bone-300',
  ink: 'bg-ink-900 border border-ink-900 text-bone-300',
};

export function Card({ variant = 'paper', padding = 24, radius, className, style, children, ...rest }: CardProps) {
  return (
    <div
      className={cn('rounded-lg', VARIANT[variant], className)}
      style={{ padding, ...(radius ? { borderRadius: radius } : null), ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
