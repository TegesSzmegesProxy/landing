import { useEffect, useId, useState } from 'react';
import { glossary } from '../../data/demo';
import { cn } from '../../lib/cn';

/** Jargon with a plain-English definition: hover, focus or tap to read it. */
export function Term({ term, children }: { term: string; children?: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <span className="group relative inline">
      <button
        type="button"
        aria-expanded={open}
        aria-describedby={id}
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setOpen(false)}
        className="inline p-0 border-0 bg-transparent font-[inherit] text-[inherit] text-ink-900 cursor-help underline decoration-dotted decoration-1 underline-offset-[3px] decoration-(--text-faint)"
      >
        {children ?? term}
      </button>
      <span
        id={id}
        role="tooltip"
        className={cn(
          'absolute left-0 top-full z-30 mt-1.5 w-[260px] max-w-[70vw] p-3 rounded-md bg-ink-900 text-bone-300 text-[13px] leading-[1.5] shadow-3 font-sans normal-case tracking-normal',
          'hidden group-hover:block group-focus-within:block',
          open && 'block',
        )}
      >
        {glossary[term] ?? term}
      </span>
    </span>
  );
}
