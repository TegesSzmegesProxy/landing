import { motion } from 'motion/react';
import { Info } from 'lucide-react';
import { demoCopy, phases } from '../../data/demo';
import type { DemoCtx, DemoStep } from '../../types';
import { DUR, EASE_OUT } from '../../lib/motion';
import { Card } from '../ui/Card';
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
      return <SamplingPanel data={d} ctx={ctx} />;
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

/** Inspector: what this step does, why it matters, and the artefact Tessera is looking at. */
export function StepPanel({ step, index, total, explain, why, ctx }: StepPanelProps) {
  return (
    <Card padding={24} className="min-w-0 shadow-2">
      <div aria-live="polite" aria-atomic="true">
        <Eyebrow>
          {demoCopy.stepOf(index + 1, total)} · {phases[step.phase].label}
        </Eyebrow>
        <h3 className="mt-3 mb-0 font-sans text-[24px] font-light leading-[1.15] tracking-[-0.02em] text-ink-900 text-balance">{step.title}</h3>
        <p className="mt-3 mb-0 text-[15px] leading-[1.55] text-body text-pretty">
          <Rich text={explain} />
        </p>
        <p className="mt-3 mb-0 flex items-start gap-2 text-[13px] leading-[1.5] text-muted">
          <Info size={14} strokeWidth={1.5} aria-hidden className="mt-[3px] shrink-0 text-blue-700" />
          <span>
            <span className="sr-only">{demoCopy.why}: </span>
            {why}
          </span>
        </p>
      </div>

      <motion.div
        key={step.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DUR.base, ease: EASE_OUT }}
        className="mt-6 pt-6 border-t border-(--border-subtle)"
      >
        <Artifact step={step} ctx={ctx} />
      </motion.div>
    </Card>
  );
}
