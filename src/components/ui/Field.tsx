import type { ReactNode } from 'react';

export interface FieldProps {
  label?: string;
  hint?: string;
  error?: string;
  htmlFor?: string;
  children?: ReactNode;
}

export function Field({ label, hint, error, htmlFor, children }: FieldProps) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-1.5 font-sans">
      {label && <span className="text-[13px] font-medium text-strong">{label}</span>}
      {children}
      {(error || hint) && <span className={error ? 'text-[12px] text-clay-600' : 'text-[12px] text-muted'}>{error || hint}</span>}
    </label>
  );
}
