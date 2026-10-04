import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { demoCopy, phases } from '../../data/demo';
import type { DemoCtx, DemoStep } from '../../types';
import { DUR, EASE_OUT } from '../../lib/motion';
import { cn } from '../../lib/cn';
import { Card } from '../ui/Card';
import { IconButton } from '../ui/IconButton';
import { Eyebrow } from '../Eyebrow';
import { ChecksPanel } from './ChecksPanel';
import { DecisionPanel } from './DecisionPanel';
import { FeedbackPanel } from './FeedbackPanel';
import { JevPanel } from './JevPanel';
import { PolicyPanel } from './PolicyPanel';
import { Rich } from './Rich';
import { SamplingPanel } from './SamplingPanel';
import { StaticArtifact } from './StaticArtifact';

export interface StepPanelProps {
  step: DemoStep;
  index: number;
  total: number;
  /** step copy after variants (benign path, skipped JEV, …) */
  explain: string;
  why: string;
  ctx: DemoCtx;
}

function Artifact({ step, ctx }: { step: DemoStep; ctx: DemoCtx }) {
  const d = step.data;
  switch (d.kind) {
    case 'policy':
      return <PolicyPanel data={d} ctx={ctx} />;
    case 'runner':
    case 'tools':
    case 'aggregate':
      return <ChecksPanel mode={d.kind} ctx={ctx} />;
    case 'sampling':
      return <SamplingPanel ctx={ctx} />;
    case 'jev':
      return <JevPanel data={d} ctx={ctx} />;
    case 'decision':
      return <DecisionPanel ctx={ctx} />;
    case 'feedback':
      return <FeedbackPanel data={d} ctx={ctx} />;
    default:
      return <StaticArtifact data={d} ctx={ctx} />;
  }
}

const GAP = 48;

/**
 * Inspector: what this step does, why it matters, and the artefact Tessera is looking at.
 * Fixed height; overflow flows into extra CSS columns that are shown one page at a time.
 */
export function StepPanel({ step, index, total, explain, why, ctx }: StepPanelProps) {
  const reduced = useReducedMotion() ?? false;
  const box = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  const measure = () => {
    const el = box.current;
    if (el) setPages(Math.max(1, Math.round((el.scrollWidth + GAP) / (el.clientWidth + GAP))));
  };
  // content changes with the step and with ctx (rule toggles, scenario), so re-measure every render
  useLayoutEffect(measure);
  useLayoutEffect(() => {
    box.current?.scrollTo({ left: 0 });
    setPage(0);
  }, [step.id]);
  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const goPage = (p: number) => {
    const el = box.current;
    if (el) el.scrollTo({ left: p * (el.clientWidth + GAP), behavior: reduced ? 'auto' : 'smooth' });
  };
  // scroll is the source of truth: focus moving into a hidden page scrolls the box too
  const onScroll = () => {
    const el = box.current;
    if (el) setPage(Math.round(el.scrollLeft / (el.clientWidth + GAP)));
  };

  return (
    <Card padding={24} className="min-w-0 shadow-2 h-[680px] flex flex-col">
      <div aria-live="polite" aria-atomic="true" className="shrink-0">
        <Eyebrow>
          {demoCopy.stepOf(index + 1, total)} · {phases[step.phase].label}
        </Eyebrow>
        <h3 className="mt-3 mb-0 font-sans text-[24px] font-light leading-[1.15] tracking-[-0.02em] text-ink-900 text-balance">{step.title}</h3>
      </div>

      <div className="relative flex-1 min-h-0 mt-3">
        <div
          ref={box}
          onScroll={onScroll}
          className="absolute inset-0 overflow-hidden columns-1 [column-fill:auto] [&_li,&_p,&_pre,&_fieldset,&_label]:break-inside-avoid"
          style={{ columnGap: GAP }}
        >
          <p className="m-0 text-[15px] leading-[1.55] text-body text-pretty">
            <Rich text={explain} />
          </p>
          <p className="mt-3 mb-0 flex items-start gap-2 text-[13px] leading-[1.5] text-muted">
            <Info size={14} strokeWidth={1.5} aria-hidden className="mt-[3px] shrink-0 text-blue-700" />
            <span>
              <span className="sr-only">{demoCopy.why}: </span>
              {why}
            </span>
          </p>

          <motion.div
            key={step.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DUR.base, ease: EASE_OUT }}
            className="mt-6 pt-6 border-t border-(--border-subtle)"
          >
            <Artifact step={step} ctx={ctx} />
          </motion.div>
        </div>
      </div>

      {pages > 1 && (
        <nav aria-label={demoCopy.pageOf(page + 1, pages)} className="shrink-0 mt-4 pt-3 flex items-center gap-3 border-t border-(--border-subtle)">
          <IconButton icon={ChevronLeft} label={demoCopy.prevPage} variant="outline" size="md" disabled={page === 0} onClick={() => goPage(page - 1)} />
          <ol className="m-0 p-0 list-none flex gap-1.5">
            {Array.from({ length: pages }, (_, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => goPage(i)}
                  aria-label={demoCopy.pageOf(i + 1, pages)}
                  aria-current={i === page ? 'page' : undefined}
                  className="grid place-items-center size-6 border-0 bg-transparent cursor-pointer"
                >
                  <span className={cn('size-2 transition-colors duration-(--dur-fast)', i === page ? 'bg-ink-900' : 'bg-bone-400 hover:bg-stone-500')} />
                </button>
              </li>
            ))}
          </ol>
          <span className="ml-auto font-mono text-[11px] text-muted" aria-hidden>
            {demoCopy.pageOf(page + 1, pages)}
          </span>
          <IconButton icon={ChevronRight} label={demoCopy.nextPage} variant="outline" size="md" disabled={page === pages - 1} onClick={() => goPage(page + 1)} />
        </nav>
      )}
    </Card>
  );
}
