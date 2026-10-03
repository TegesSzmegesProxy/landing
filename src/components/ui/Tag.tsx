import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/cn';

export interface TagProps {
  children?: ReactNode;
  /** mono (default) for routes, rules, IPs; sans for plain words */
  mono?: boolean;
  onRemove?: () => void;
  className?: string;
}

export function Tag({ children, mono = true, onRemove, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 h-[26px] rounded-(--radius-pill) border border-(--border-default) text-body text-[12px] whitespace-nowrap',
        onRemove ? 'pl-2.5 pr-1.5' : 'px-2.5',
        mono ? 'font-mono' : 'font-sans',
        className,
      )}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove"
          className="inline-flex border-0 bg-transparent p-0.5 cursor-pointer text-muted"
        >
          <X size={12} strokeWidth={1.5} aria-hidden />
        </button>
      )}
    </span>
  );
}
