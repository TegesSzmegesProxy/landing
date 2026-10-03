import { Quote } from 'lucide-react';
import type { DemoCtx, StepData } from '../../types';
import { Eyebrow } from '../Eyebrow';
import { ScoreMeter } from '../ui/ScoreMeter';
import { StatTile } from '../ui/StatTile';
import { Rich } from './Rich';

/** Step 13: what goes into JEV, and the score, confidence and reasoning that come out. */
export function JevPanel({ data, ctx }: { data: Extract<StepData, { kind: 'jev' }>; ctx: DemoCtx }) {
  const { jev, suspicion, checks } = ctx.result;

  if (!jev.called) {
    return (
      <div className="rounded-md border border-(--border-default) bg-bone-50 p-4 text-[14px] text-body">
        JEV was not called for this request. No model call, no added latency, no AI cost.
      </div>
    );
  }

  const flagged = checks.filter((c) => c.status === 'fail' || c.status === 'warn').length;
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Eyebrow>In</Eyebrow>
        <ul className="m-0 mt-2 p-0 list-none text-[13px] text-body grid gap-1.5">
          <li>
            <span className="text-ink-900 font-medium">Request</span> · POST /adminer/, canonical form
          </li>
          <li>
            <span className="text-ink-900 font-medium">Static evidence</span> · suspicion {suspicion.toFixed(2)}, {flagged} flagged{' '}
            {flagged === 1 ? 'check' : 'checks'}
          </li>
          <li>
            <span className="text-ink-900 font-medium">Recent context</span>
            <ul className="m-0 mt-1 pl-4 font-mono text-[12px] text-muted">
              {data.context.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </li>
        </ul>
      </div>

      <div>
        <Eyebrow>Out</Eyebrow>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <StatTile label="Maliciousness" value={jev.score.toFixed(2)} className="p-4" />
          <StatTile label="Confidence" value={jev.confidence.toFixed(2)} className="p-4" />
        </div>
        <ScoreMeter score={jev.score} threshold={ctx.threshold} label={null} showValue={false} tiles={24} className="mt-3" />
      </div>

      <figure className="m-0 flex gap-3 rounded-md border border-(--border-default) bg-bone-50 p-4">
        <Quote size={16} strokeWidth={1.5} aria-hidden className="mt-0.5 shrink-0 text-blue-700" />
        <figcaption className="text-[14px] leading-[1.5] text-body">
          <Rich text={data.rationale[jev.tier]} />
        </figcaption>
      </figure>
    </div>
  );
}
