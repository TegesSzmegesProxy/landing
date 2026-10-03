import { Fragment, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { Check } from 'lucide-react';
import { endpoints, flow } from '../data/content';
import { cn } from '../lib/cn';
import { DUR, EASE_OUT, reveal } from '../lib/motion';
import { LG, useMediaQuery } from '../lib/useMediaQuery';
import type { Step } from '../types';
import { Badge } from './ui/Badge';
import { ScoreMeter } from './ui/ScoreMeter';
import { Tag } from './ui/Tag';
import { Eyebrow } from './Eyebrow';

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

const panelLabel = 'font-mono text-[10px] leading-[normal] font-medium tracking-[.08em] uppercase text-faint';
const rowFade = 'transition-opacity duration-(--dur-base) ease-out';

export const depthColour = (v: number) => (v > 70 ? 'bg-clay-500' : v > 40 ? 'bg-ochre-500' : 'bg-blue-500');

function Panel({ on, local }: { on: number; local: number }) {
  const shown = (i: number) => (local * 4 > i ? 'opacity-100' : 'opacity-15');

  switch (on) {
    case 0:
      return (
        <div>
          <div className={panelLabel}>{flow.incomingLabel}</div>
          {flow.incoming.map((r, i) => (
            <div
              key={i}
              className={cn(
                'grid grid-cols-[48px_1fr_auto] gap-3 py-2.5 border-t border-(--border-subtle) font-mono text-[13px] leading-[normal]',
                rowFade,
                shown(i),
              )}
            >
              <span className="text-muted">{r.method}</span>
              <span className="text-ink-900 min-w-0">{r.path}</span>
              <span className="text-faint">{r.ip}</span>
            </div>
          ))}
        </div>
      );
    case 1:
      return (
        <div>
          <div className={panelLabel}>{flow.checksLabel}</div>
          {flow.checks.map((r, i) => (
            <div key={i} className={cn('flex gap-3 items-center py-3 border-t border-(--border-subtle)', rowFade, shown(i))}>
              <span className="text-verdigris-500">
                <Check size={16} strokeWidth={2} aria-hidden className="block" />
              </span>
              <span className="w-[130px] shrink-0 font-sans text-[14px] leading-[normal] font-medium text-ink-900">{r.name}</span>
              <span className="min-w-0 font-mono text-[12px] leading-[normal] text-muted">{r.detail}</span>
            </div>
          ))}
        </div>
      );
    case 2:
      return (
        <div className="flex flex-col gap-[18px]">
          <div className={panelLabel}>{flow.verdictsLabel}</div>
          {flow.verdicts.map((v) => {
            const s = v.status === 'blocked' ? Math.min(v.score, 0.1 + local * 0.9) : v.score;
            return (
              <div key={v.route}>
                <div className="flex justify-between gap-3 mb-2">
                  <span className="font-mono text-[13px] leading-[normal] text-ink-900">{v.route}</span>
                  <Badge status={v.status}>{v.label}</Badge>
                </div>
                <ScoreMeter score={s} label={null} showValue={false} tiles={28} />
              </div>
            );
          })}
        </div>
      );
    default: {
      const k = Math.min(1, local * 1.6);
      return (
        <div>
          <div className={panelLabel}>{flow.depthLabel}</div>
          {endpoints.map(([e, v]) => (
            <div
              key={e}
              className="grid grid-cols-[110px_1fr_40px] gap-3 items-center py-2.5 border-t border-(--border-subtle) font-mono text-[12px] leading-[normal] text-body"
            >
              <span>{e}</span>
              <span className="h-2 bg-bone-300">
                <span
                  className={cn('block h-full transition-[width] duration-(--dur-slow) ease-out', depthColour(v))}
                  style={{ width: `${v * k}%` }}
                />
              </span>
              <span className="text-right">{Math.round(v * k)}%</span>
            </div>
          ))}
        </div>
      );
    }
  }
}

function NodeStrip({ on }: { on: number }) {
  const l: readonly number[] = flow.lit[on] ?? flow.lit[0];
  return (
    <div aria-hidden className="flex items-center gap-1.5 flex-wrap pb-[22px]">
      {flow.nodes.map((n, i) => (
        <Fragment key={n}>
          {i > 0 && (
            <span
              className={cn(
                'w-3 h-px transition-colors duration-(--dur-base) ease-out',
                l.includes(i) && l.includes(i - 1) ? 'bg-blue-500' : 'bg-(--border-strong)',
              )}
            />
          )}
          <span
            className={cn(
              'py-[5px] px-[9px] border rounded-xs font-mono text-[11px] leading-[normal] text-ink-900 transition-all duration-(--dur-base) ease-out',
              l.includes(i) ? 'border-blue-500 bg-blue-100' : 'border-(--border-default) bg-transparent',
            )}
          >
            {n}
          </span>
        </Fragment>
      ))}
    </div>
  );
}

function PanelCard({ on, local, className }: { on: number; local: number; className?: string }) {
  return (
    <div className={cn('bg-card border border-(--border-subtle) rounded-lg shadow-2 p-7 max-md:p-5 min-w-0', className)}>
      <NodeStrip on={on} />
      <div className="min-h-[250px]">
        <Panel on={on} local={local} />
      </div>
      <div className="flex justify-between py-2.5 border-t border-(--border-subtle) font-mono text-[13px] leading-[normal]">
        <span className="text-muted">{flow.stepLabel}</span>
        <span className="text-ink-900">
          {on + 1} / {flow.steps.length}
        </span>
      </div>
    </div>
  );
}

function StepCopy({ step, as: Heading = 'h2' }: { step: Step; as?: 'h2' | 'h3' }) {
  return (
    <>
      <div className="font-pixel text-[56px] leading-none text-terracotta-500">{step.numeral}</div>
      <Heading className="mt-6 font-sans text-[56px] font-light leading-[1.05] tracking-[-0.035em] text-ink-900">{step.title}.</Heading>
      <p className="mt-[18px] max-w-[480px] text-[18px] leading-[1.5] text-body text-pretty">{step.body}</p>
      <div className="mt-5">
        <Tag className="max-md:whitespace-normal max-md:h-auto max-md:min-h-[26px] max-md:py-1">{step.metric}</Tag>
      </div>
    </>
  );
}

/** Desktop: 420vh scroller with a sticky stage. */
function FlowStage() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [p, setP] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => setP(Number.isFinite(v) ? clamp(v, 0, 1) : 0));

  const on = clamp(Math.floor(p * 4 - 0.0001), 0, 3);
  const local = clamp(p * 4 - on, 0, 1);

  return (
    <section ref={ref} id="how-it-works" aria-label={flow.eyebrow} className="relative h-[420vh]">
      <div className="sticky top-0 h-screen flex items-center">
        <div className="w-full max-w-[1200px] mx-auto px-6 grid grid-cols-2 gap-16 items-center">
          <div>
            <Eyebrow>{flow.eyebrow}</Eyebrow>
            <div className="relative h-[300px] mt-6">
              {flow.steps.map((s, i) => (
                <motion.div
                  key={s.numeral}
                  aria-hidden={on !== i}
                  initial={false}
                  animate={{ opacity: on === i ? 1 : 0, y: on === i ? 0 : on > i ? -16 : 16 }}
                  transition={{ duration: DUR.slow, ease: EASE_OUT }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <StepCopy step={s} />
                </motion.div>
              ))}
            </div>
            <div aria-hidden className="flex gap-[3px] mt-2">
              {flow.steps.map((s, i) => (
                <div key={s.numeral} className="flex-1 h-[3px] bg-bone-300">
                  <div className="h-full bg-ink-900" style={{ width: `${i < on ? 100 : i === on ? local * 100 : 0}%` }} />
                </div>
              ))}
            </div>
          </div>
          <PanelCard on={on} local={local} />
        </div>
      </div>
    </section>
  );
}

/** Below lg, or with reduced motion: every step followed by its fully revealed panel. */
function FlowList() {
  return (
    <section id="how-it-works" aria-labelledby="flow-heading" className="max-w-[1200px] mx-auto px-6 pt-16 pb-32">
      <Eyebrow>{flow.eyebrow}</Eyebrow>
      <h2 id="flow-heading" className="sr-only">
        {flow.eyebrow}
      </h2>
      <ol className="m-0 p-0 list-none flex flex-col gap-20">
        {flow.steps.map((s, i) => (
          <motion.li key={s.numeral} {...reveal} className="grid gap-8 lg:grid-cols-2 lg:gap-16 lg:items-center min-w-0">
            <div className={i === 0 ? 'mt-6' : undefined}>
              <StepCopy step={s} as="h3" />
            </div>
            <PanelCard on={i} local={1} />
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

export function Flow() {
  const reduced = useReducedMotion() ?? false;
  const isLg = useMediaQuery(LG);
  return isLg && !reduced ? <FlowStage /> : <FlowList />;
}
