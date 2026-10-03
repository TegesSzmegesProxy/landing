import { useEffect, useId, useState } from 'react';
import { WORDMARK, header } from '../data/content';
import { cn } from '../lib/cn';
import { NavPill } from './ui/NavPill';

export function Header() {
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const sheetId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.matchMedia('(min-width: 768px)').matches && setOpen(false);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const select = (label: string) => {
    setActive(label);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-20 grid grid-cols-[1fr_auto_1fr] items-center py-3 px-10 max-md:px-6 bg-[rgba(241,235,224,.82)] backdrop-blur-[14px] saturate-110 border-b border-(--border-subtle)">
      <a href="#top" className="font-sans text-[15px] leading-[normal] font-medium tracking-[.18em] text-ink-900 no-underline hover:text-ink-900">
        {WORDMARK}
      </a>

      <NavPill aria-label="Main" items={header.nav} active={active} onSelect={setActive} className="max-md:hidden" />
      <span className="md:hidden" />

      <nav
        id={sheetId}
        aria-label="Main"
        hidden={!open}
        className={cn('md:hidden absolute inset-x-4 top-full p-2 rounded-lg bg-card border border-(--border-subtle) shadow-3', !open && 'hidden')}
      >
        <ul className="m-0 p-0 list-none">
          {header.nav.map((item) => {
            const on = item.label === active;
            const cls = cn(
              'flex items-center w-full h-11 px-4 rounded-sm text-[15px] text-left no-underline border-0 cursor-pointer',
              on ? 'bg-bone-200 text-ink-900 hover:text-ink-900' : 'bg-transparent text-stone-700 hover:text-stone-700',
            );
            return (
              <li key={item.label}>
                {item.href ? (
                  <a href={item.href} aria-current={on ? 'location' : undefined} className={cls} onClick={() => select(item.label)}>
                    {item.label}
                  </a>
                ) : (
                  <button type="button" aria-pressed={on} className={cls} onClick={() => select(item.label)}>
                    {item.label}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
