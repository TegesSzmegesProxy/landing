import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import type { Billing, PricingTier } from '../types';
import { pricing } from '../data/content';
import { DUR, EASE_OUT, reveal, revealAt } from '../lib/motion';
import { cn } from '../lib/cn';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Tag } from './ui/Tag';
import { Eyebrow } from './Eyebrow';

const PERIODS: Billing[] = ['monthly', 'yearly'];

const usd = (n: number) => `$${n % 1 ? n.toFixed(2) : n}`;

const paid = pricing.tiers.find((t) => t.price && t.price.monthly > 0)?.price;
const yearlySaving = paid ? Math.round((1 - paid.yearly / paid.monthly) * 100) : 0;

function billingNote(t: PricingTier, billing: Billing): string {
  if (t.note || !t.price) return t.note ?? '';
  return billing === 'yearly' ? `${usd(t.price.yearly * 12)} ${pricing.billedYearly}` : pricing.billedMonthly;
}

export function Pricing({ onDeploy }: { onDeploy: () => void }) {
  const [billing, setBilling] = useState<Billing>('monthly');

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="max-w-[1200px] mx-auto px-6 pt-32 scroll-mt-20">
      <motion.div {...reveal} className="flex justify-between items-end gap-8 max-md:flex-col max-md:items-start">
        <div className="max-w-[640px]">
          <Eyebrow>{pricing.eyebrow}</Eyebrow>
          <h2
            id="pricing-heading"
            className="mt-4 font-sans text-[48px] max-md:text-[36px] font-light leading-[1.08] tracking-[-0.03em] text-ink-900 text-balance"
          >
            {pricing.title}
          </h2>
          <p className="mt-5 text-[17px] leading-[1.55] text-body text-pretty">{pricing.body}</p>
        </div>

        <div
          role="group"
          aria-label={pricing.billingLabel}
          className="inline-flex shrink-0 gap-1 p-1 rounded-(--radius-pill) bg-bone-200 border border-(--border-subtle)"
        >
          {PERIODS.map((b) => {
            const on = billing === b;
            return (
              <button
                key={b}
                type="button"
                aria-pressed={on}
                onClick={() => setBilling(b)}
                className={cn(
                  'inline-flex items-center gap-2 h-[34px] max-md:h-11 px-4 border-0 rounded-(--radius-pill) cursor-pointer font-sans text-[14px] font-[450]',
                  'transition-[background-color,color,box-shadow] duration-(--dur-fast) ease-out',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus-ring)',
                  on ? 'bg-bone-50 text-ink-900 shadow-1' : 'bg-transparent text-stone-700 hover:text-ink-900',
                )}
              >
                {pricing.billing[b]}
                {b === 'yearly' && yearlySaving > 0 && (
                  <span className="font-mono text-[11px] font-medium text-blue-700">−{yearlySaving}%</span>
                )}
              </button>
            );
          })}
        </div>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {pricing.tiers.map((t, i) => (
          <motion.div key={t.name} {...revealAt(i)} className="min-w-0">
            <Card
              variant={t.featured ? 'ink' : 'paper'}
              padding={28}
              className={cn('h-full flex flex-col', t.featured && 'theme-ink shadow-3')}
            >
              <div className="flex items-center justify-between gap-3 min-h-[26px]">
                <h3 className="m-0 font-sans text-[18px] leading-[normal] font-medium text-strong">{t.name}</h3>
                {t.featured && <Tag mono={false}>{pricing.featuredLabel}</Tag>}
              </div>
              <p className="mt-2 font-sans text-[14px] leading-[1.5] text-muted">{t.blurb}</p>

              <div className="mt-7 flex items-baseline gap-2 h-12">
                <motion.span
                  key={t.price ? t.price[billing] : 'custom'}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: DUR.base, ease: EASE_OUT }}
                  className="font-sans text-[48px] leading-none font-light tracking-[-0.03em] text-strong tabular-nums"
                >
                  {t.price ? usd(t.price[billing]) : pricing.custom}
                </motion.span>
                {t.price && <span className="font-mono text-[13px] text-muted">{pricing.perMonth}</span>}
              </div>
              <p className="mt-2 font-mono text-[12px] leading-[normal] text-muted tabular-nums">{billingNote(t, billing)}</p>

              <Button
                full
                size="lg"
                variant={t.featured ? 'primary' : 'outline'}
                iconRight={t.deploy ? ArrowRight : undefined}
                onClick={t.deploy ? onDeploy : undefined}
                className="mt-7"
              >
                {t.cta}
              </Button>

              <ul className="m-0 mt-7 pt-5 list-none flex flex-col gap-3 border-t border-(--border-subtle)">
                {t.features.map((f) => (
                  <li key={f} className="grid grid-cols-[20px_1fr] gap-2 font-sans text-[14px] leading-[1.5] text-body">
                    <Check size={16} strokeWidth={2} aria-hidden className="mt-0.5 text-(--text-link)" />
                    {f}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
