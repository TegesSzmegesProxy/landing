import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/cn';
import { Field } from './Field';
import { FIELD_CONTROL, FIELD_SHELL } from './fieldStyles';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: string;
  hint?: string;
  error?: string;
  icon?: LucideIcon;
  /** monospace value — use for hosts, routes, regexes */
  mono?: boolean;
  /** trailing unit text, e.g. "ms" */
  suffix?: string;
}

export function Input({ label, hint, error, icon: Icon, mono, suffix, disabled, id, className, ...rest }: InputProps) {
  const auto = useId();
  const inputId = id ?? auto;
  return (
    <Field label={label} hint={hint} error={error} htmlFor={inputId}>
      <span className={cn(FIELD_SHELL, mono ? 'font-mono' : 'font-sans', className)} data-error={!!error} data-disabled={!!disabled}>
        {Icon && (
          <span className="text-muted">
            <Icon size={15} strokeWidth={1.5} aria-hidden />
          </span>
        )}
        <input id={inputId} disabled={disabled} aria-invalid={error ? true : undefined} className={FIELD_CONTROL} {...rest} />
        {suffix && <span className="font-mono text-[12px] text-muted">{suffix}</span>}
      </span>
    </Field>
  );
}
