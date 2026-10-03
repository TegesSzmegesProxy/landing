import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'bone' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
  /** stretch to container width */
  full?: boolean;
  children?: ReactNode;
}

const VARIANT: Record<ButtonVariant, string> = {
  primary: 'border-transparent bg-accent text-accent-fg hover:enabled:bg-blue-300',
  secondary: 'border-transparent bg-ink-900 text-bone-100 hover:enabled:bg-stone-700',
  outline: 'bg-transparent text-strong border-(--border-strong) hover:enabled:border-(--text-strong)',
  ghost: 'border-transparent bg-transparent text-body hover:enabled:bg-(--border-subtle) hover:enabled:text-strong',
  bone: 'border-transparent bg-bone-50 text-ink-900 hover:enabled:bg-bone-200',
  danger: 'border-transparent bg-clay-500 text-bone-50 hover:enabled:bg-clay-600',
};

const SIZE: Record<ButtonSize, string> = {
  sm: 'h-8 px-3.5 text-[13px]',
  md: 'h-10 px-[18px] text-[14px]',
  lg: 'h-12 px-6 text-[15px]',
};

export function Button({
  variant = 'primary',
  size = 'md',
  iconLeft: IconLeft,
  iconRight: IconRight,
  full,
  type = 'button',
  className,
  children,
  ...rest
}: ButtonProps) {
  const is = size === 'lg' ? 16 : 15;
  return (
    <button
      type={type}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 border rounded-(--radius-pill)',
        'font-sans font-medium leading-[normal] tracking-[-0.005em] whitespace-nowrap cursor-pointer',
        'transition-[background-color,color,border-color,transform] duration-(--dur-fast) ease-out',
        'active:enabled:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus-ring)',
        'disabled:opacity-[.42] disabled:cursor-not-allowed',
        // ≥44px touch target without changing the visual size
        "before:absolute before:inset-x-0 before:top-1/2 before:h-[max(100%,44px)] before:-translate-y-1/2 before:content-['']",
        VARIANT[variant],
        SIZE[size],
        full && 'w-full',
        className,
      )}
      {...rest}
    >
      {IconLeft && <IconLeft size={is} strokeWidth={1.5} aria-hidden className="shrink-0" />}
      {children}
      {IconRight && <IconRight size={is} strokeWidth={1.5} aria-hidden className="shrink-0" />}
    </button>
  );
}
