import { motion } from 'motion/react';
import { ArrowUpRight, Check } from 'lucide-react';
import { jev } from '../data/content';
import { EASE_OUT, revealAt } from '../lib/motion';
import { cn } from '../lib/cn';
import { Card } from './ui/Card';
import { Eyebrow } from './Eyebrow';

const TILES = Array.from({ length: 100 }, (_, i) => i);
const SWATCH = ['bg-bone-300', 'bg-blue-500'] as const;

export function Jev() {
  return (
    <section
      id="jev"
      aria-labelledby="jev-heading"
      className="max-w-[1200px] mx-auto px-6 pb-40 scroll-mt-20 grid grid-cols-1 gap-12 lg:grid-cols-[6fr_1fr_5fr] lg:gap-0 items-center"
    >
      <motion.div {...revealAt(1)} className="min-w-0 max-lg:order-2">
        <Card padding={28} className="shadow-2">
          <div className="flex items-baseline justify-between gap-4">
            <Eyebrow>{jev.sampleLabel}</Eyebrow>
            <span className="font-mono text-[12px] text-muted">{jev.sampleMeta}</span>
          </div>

          <motion.div
            aria-hidden
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: '-80px' }}
            className="mt-5 grid grid-cols-[repeat(20,minmax(0,1fr))] gap-[2px]"
          >
            {TILES.map((i) => {
              const hit = i === jev.jevTile;
              return (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0 },
                    shown: { opacity: 1, transition: { duration: 0.22, ease: EASE_OUT, delay: hit ? 0.9 : i * 0.006 } },
                  }}
                  className={cn('aspect-square', SWATCH[hit ? 1 : 0])}
                />
              );
            })}
          </motion.div>

          <ul className="m-0 mt-6 p-0 list-none">
            {jev.legend.map((row, i) => (
              <li
                key={row.label}
                className="grid grid-cols-[10px_1fr_auto] items-baseline gap-x-3 py-3 border-t border-(--border-subtle) font-mono text-[13px]"
              >
                <span aria-hidden className={cn('size-2.5 self-center', SWATCH[i])} />
                <span className="text-ink-900">
                  {row.label} <span className="text-muted">· {row.detail}</span>
                </span>
                <span className="text-ink-900 tabular-nums">{row.count}</span>
              </li>
            ))}
          </ul>
        </Card>
      </motion.div>

      <div className="max-lg:hidden" />

      <motion.div {...revealAt(0)} className="min-w-0 max-lg:order-1">
        <Eyebrow>{jev.eyebrow}</Eyebrow>
        <h2
          id="jev-heading"
          className="mt-4 font-sans text-[48px] max-md:text-[36px] font-light leading-[1.08] tracking-[-0.03em] text-ink-900 text-balance"
        >
          {jev.title}
        </h2>
        <p className="mt-5 mb-2 text-[17px] leading-[1.55] text-body text-pretty">{jev.body}</p>
        <ul className="m-0 p-0 list-none">
          {jev.points.map((pt) => (
            <li key={pt.title} className="grid grid-cols-[24px_1fr] gap-2 py-3.5 border-t border-(--border-default)">
              <span className="text-blue-700 pt-0.5">
                <Check size={16} strokeWidth={2} aria-hidden className="block" />
              </span>
              <div>
                <div className="font-sans text-[15px] leading-[normal] font-medium text-ink-900">{pt.title}</div>
                <div className="mt-0.5 font-sans text-[14px] leading-[1.5] text-muted">{pt.description}</div>
              </div>
            </li>
          ))}
        </ul>
        <a
          href={jev.more.href}
          target="_blank"
          className="mt-4 inline-flex items-center gap-1.5 min-h-11 font-sans text-[15px] font-medium text-blue-700 underline decoration-1 underline-offset-4 hover:text-ink-900 rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus-ring)"
        >
          {jev.more.label}
          <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden />
        </a>
      </motion.div>
    </section>
  );
}
