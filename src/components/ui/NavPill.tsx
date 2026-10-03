import { Fragment } from 'react';
import type { NavItem } from '../../types';
import { cn } from '../../lib/cn';

export interface NavPillProps {
  items: Array<string | NavItem>;
  active?: string;
  onSelect?: (item: string) => void;
  /** light = bone glass, dark = ink glass */
  tone?: 'light' | 'dark';
  className?: string;
  'aria-label'?: string;
}

/** Floating capsule nav with square dot separators — the marketing-site header centrepiece. */
export function NavPill({ items, active, onSelect, tone = 'light', className, 'aria-label': ariaLabel }: NavPillProps) {
  const dark = tone === 'dark';
  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-center gap-1 p-1 rounded-(--radius-pill) backdrop-blur-[14px] font-sans',
        dark ? 'bg-[rgba(31,31,31,.62)] border border-(--border-glass)' : 'bg-[rgba(247,243,235,.7)] border border-[rgba(31,31,31,.08)]',
        className,
      )}
    >
      {items.map((raw, i) => {
        const item = typeof raw === 'string' ? { label: raw } : raw;
        const on = item.label === active;
        const cls = cn(
          'inline-flex items-center h-[34px] px-4 border-0 rounded-(--radius-pill) cursor-pointer font-[inherit] text-[14px] leading-[normal] tracking-normal font-[450] no-underline',
          'transition-all duration-(--dur-fast) ease-out',
          dark
            ? on ? 'bg-[rgba(241,235,224,.12)] text-bone-50' : 'bg-transparent text-bone-300 hover:text-bone-300'
            : on ? 'bg-bone-50 text-ink-900 hover:text-ink-900' : 'bg-transparent text-stone-700 hover:text-stone-700',
        );
        return (
          <Fragment key={item.label}>
            {i > 0 && <span aria-hidden className={cn('size-[3px]', dark ? 'bg-bone-500' : 'bg-stone-500')} />}
            {item.href ? (
              <a href={item.href} aria-current={on ? 'location' : undefined} className={cls} onClick={() => onSelect?.(item.label)}>
                {item.label}
              </a>
            ) : (
              <button type="button" aria-pressed={on} className={cls} onClick={() => onSelect?.(item.label)}>
                {item.label}
              </button>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
