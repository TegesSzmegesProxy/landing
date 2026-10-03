import type { Verdict } from '../../types';
import { cn } from '../../lib/cn';

export interface TicketProps {
  /** Roman numeral or short code on the stub, pixel font */
  numeral?: string;
  /** tiny label under the numeral, e.g. "row" or "gate" */
  label?: string;
  title: string;
  meta?: string;
  status?: Verdict;
  className?: string;
}

const DOT: Record<Verdict, string> = {
  passed: 'bg-verdigris-500',
  blocked: 'bg-clay-500',
  review: 'bg-ochre-500',
  jev: 'bg-blue-500',
};

/** The tessera: a notched entry ticket with a terracotta stub and pixel numeral. */
export function Ticket({ numeral = 'XII', label, title, meta, status = 'passed', className }: TicketProps) {
  return (
    <div className={cn('flex items-stretch w-fit min-w-[300px] bg-card rounded-sm ticket-notch shadow-1 font-sans', className)}>
      <div className="flex flex-col items-center justify-center gap-1 w-[76px] py-3.5 bg-terracotta-500 text-bone-50">
        <span className="font-pixel text-[20px] tracking-[0.04em] leading-none">{numeral}</span>
        {label && <span className="font-mono text-[9px] tracking-[0.12em] uppercase opacity-85">{label}</span>}
      </div>
      <div className="flex-1 pt-3.5 pr-[22px] pb-3.5 pl-4 border-l border-dashed border-(--border-strong)">
        <div className="flex items-center gap-2 text-[14px] font-medium text-strong">
          <span aria-hidden className={cn('size-1.5', DOT[status])} />
          {title}
        </div>
        {meta && <div className="mt-1 font-mono text-[11px] text-muted">{meta}</div>}
      </div>
    </div>
  );
}
