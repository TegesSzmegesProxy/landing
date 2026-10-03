import { useId } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/cn';
import { Field } from './Field';
import { FIELD_CONTROL, FIELD_SHELL } from './fieldStyles';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  options: Array<string | { value: string; label: string }>;
  mono?: boolean;
}

export function Select({ label, hint, error, options, mono, id, className, ...rest }: SelectProps) {
  const auto = useId();
  const selectId = id ?? auto;
  return (
    <Field label={label} hint={hint} error={error} htmlFor={selectId}>
      <span className={cn(FIELD_SHELL, 'relative pr-2', mono ? 'font-mono' : 'font-sans', className)} data-error={!!error}>
        <select id={selectId} className={cn(FIELD_CONTROL, 'cursor-pointer')} {...rest}>
          {options.map((o) =>
            typeof o === 'string' ? (
              <option key={o} value={o}>
                {o}
              </option>
            ) : (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ),
          )}
        </select>
        <span className="text-muted pointer-events-none">
          <ChevronDown size={15} strokeWidth={1.5} aria-hidden />
        </span>
      </span>
    </Field>
  );
}
