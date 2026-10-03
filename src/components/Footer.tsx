import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { WORDMARK, footer, hero } from '../data/content';
import { cn } from '../lib/cn';
import { DUR, EASE_OUT, reveal } from '../lib/motion';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { ScoreMeter } from './ui/ScoreMeter';
import { Ticket } from './ui/Ticket';
import { Eyebrow } from './Eyebrow';

const ANCHORS: Record<string, string> = { 'How it works': '#how-it-works', Policies: '#policies', JEV: '#jev', Pricing: '#pricing' };
const NUMERALS = ['I', 'II', 'III'];

/** Pick a request, watch the gate stamp a ticket for it. Reuses the hero's samples. */
function GateDemo() {
  const [i, setI] = useState(0);
  const r = hero.samples[i];

  return (
    <Card padding={0} className="min-w-0 overflow-hidden shadow-2">
      <div className="relative">
        <img src="/pixel/hero-amphitheatre-day.png" alt="" width={384} height={216} className="block w-full pixelated" />
        <div aria-live="polite" className="absolute inset-x-3 top-[6%] flex justify-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE_OUT } }}
              exit={{ opacity: 0, y: -6, transition: { duration: DUR.fast, ease: EASE_OUT } }}
            >
              <Ticket
                numeral={NUMERALS[i]}
                label="gate"
                title={footer.verdicts[r.status]}
                meta={`${r.method} ${r.path} · ${r.score.toFixed(2)}`}
                status={r.status}
                className="shadow-2"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="p-5 border-t border-(--border-subtle)">
        <Eyebrow>{footer.playLabel}</Eyebrow>
        <div role="group" aria-label={footer.playLabel} className="mt-3 flex flex-wrap gap-2">
          {hero.samples.map((s, j) => (
            <button
              key={s.path}
              type="button"
              aria-pressed={i === j}
              onClick={() => setI(j)}
              className={cn(
                'inline-flex items-center gap-1.5 h-9 max-md:h-11 px-3.5 rounded-(--radius-pill) border cursor-pointer font-mono text-[12px]',
                'transition-[background-color,color,border-color] duration-(--dur-fast) ease-out active:translate-y-px',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus-ring)',
                i === j
                  ? 'bg-ink-900 border-ink-900 text-bone-50'
                  : 'bg-transparent border-(--border-default) text-stone-700 hover:border-(--border-strong) hover:text-ink-900',
              )}
            >
              <span className={i === j ? 'text-bone-400' : 'text-muted'}>{s.method}</span>
              {s.path}
            </button>
          ))}
        </div>
        <ScoreMeter score={r.score} tiles={28} className="mt-5" />
      </div>
    </Card>
  );
}

export function Footer({ onDeploy }: { onDeploy: () => void }) {
  return (
    <footer aria-labelledby="footer-heading" className="bg-bone-100">
      <div className="max-w-[1200px] mx-auto px-6 pt-32 pb-12">
        <motion.div
          {...reveal}
          className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] items-center gap-12 lg:gap-16 pb-20 border-b border-(--border-default)"
        >
          <div className="min-w-0">
            <Eyebrow>{footer.eyebrow}</Eyebrow>
            <h2
              id="footer-heading"
              className="mt-4 font-sans text-[56px] max-md:text-[40px] font-light leading-[1.04] tracking-[-0.035em] text-ink-900 text-balance"
            >
              {footer.title}
            </h2>
            <p className="mt-5 max-w-[440px] text-[17px] leading-[1.55] text-body text-pretty">{footer.body}</p>
            <Button size="lg" iconRight={ArrowRight} onClick={onDeploy} className="mt-8">
              {footer.cta}
            </Button>
          </div>
          <GateDemo />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-[2fr_repeat(3,1fr)] gap-6 pt-10">
          <div>
            <div className="font-sans text-[14px] leading-[normal] font-medium tracking-[.18em] text-ink-900">{WORDMARK}</div>
            <div className="mt-2.5 font-mono text-[13px] leading-[normal] text-muted">{footer.tagline}</div>
          </div>
          {footer.columns.map((c) => (
            <nav key={c.heading} aria-label={c.heading}>
              <Eyebrow className="mb-3.5">{c.heading}</Eyebrow>
              {c.links.map((l) => (
                <a
                  key={l}
                  href={ANCHORS[l] ?? '#'}
                  className="block font-sans text-[14px] leading-[2] max-md:leading-[44px] text-body no-underline hover:text-ink-900"
                >
                  {l}
                </a>
              ))}
            </nav>
          ))}
        </div>
      </div>
    </footer>
  );
}
