import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Check } from 'lucide-react';
import { policy } from '../data/content';
import { revealAt } from '../lib/motion';
import { useInterval } from '../lib/useInterval';
import { Button } from './ui/Button';
import { Tag } from './ui/Tag';
import { Terminal } from './ui/Terminal';
import { Eyebrow } from './Eyebrow';

export function PolicySection() {
  const reduced = useReducedMotion() ?? false;
  const total = policy.live.length;
  const [n, setN] = useState(1);
  useInterval(() => setN((x) => (x >= total ? 1 : x + 1)), reduced ? null : 1400);
  const shown = reduced ? total : n;

  return (
    <section
      id="policies"
      aria-labelledby="policies-heading"
      className="max-w-[1200px] mx-auto px-6 pb-40 scroll-mt-20 grid grid-cols-1 gap-12 lg:grid-cols-[5fr_1fr_6fr] lg:gap-0 items-center"
    >
      <motion.div {...revealAt(0)} className="min-w-0">
        <Eyebrow>{policy.eyebrow}</Eyebrow>
        <h2
          id="policies-heading"
          className="mt-4 font-sans text-[48px] font-light leading-[1.08] tracking-[-0.03em] text-ink-900 text-balance"
        >
          {policy.title}
        </h2>
        <p className="mt-5 mb-2 text-[17px] leading-[1.55] text-body text-pretty">{policy.body}</p>
        <ul className="m-0 mb-7 p-0 list-none">
          {policy.points.map((pt) => (
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
        <Button variant="outline" iconRight={ArrowUpRight}>
          {policy.reference}
        </Button>
      </motion.div>

      <div className="max-lg:hidden" />

      <motion.div {...revealAt(1)} className="relative min-w-0">
        <div
          aria-hidden
          className="max-lg:hidden absolute inset-[24px_-16px_-16px_24px] bg-bone-200 rounded-xl border border-(--border-subtle)"
        />
        <div className="relative">
          <div className="flex gap-2 mb-3 flex-wrap">
            <Tag>{policy.tags.file}</Tag>
            <Tag mono={false}>{policy.tags.routes}</Tag>
            <Tag mono={false}>{policy.tags.latency}</Tag>
          </div>
          <Terminal
            title={policy.terminalTitle}
            lines={[...policy.base, ...policy.live.slice(0, shown)]}
            animateNewLines
            className="min-h-[430px]"
          />
        </div>
      </motion.div>
    </section>
  );
}
