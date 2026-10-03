import { Quote } from 'lucide-react';
import { demoModel } from '../../data/demo';
import type { DemoCtx, StepData } from '../../types';
import { Button } from '../ui/Button';
import { Eyebrow } from '../Eyebrow';
import { ScoreMeter } from '../ui/ScoreMeter';
import { StatTile } from '../ui/StatTile';
import { Rich } from './Rich';

/** Step 13: what goes into JEV, and the classification, score and confidence that come out. */
export function JevPanel({ data, ctx }: { data: Extract<StepData, { kind: 'jev' }>; ctx: DemoCtx }) {
  const { jev, path, staticVerdict, checks } = ctx.result;

  if (!jev.called) {
    const violation = path === 'violation';
    return (
      <div className="flex flex-col gap-3 rounded-md border border-(--border-default) bg-bone-50 p-4 text-[14px] text-body">
        <p className="m-0">
          {violation
            ? 'JEV was not called: the request was already blocked as a POLICY_VIOLATION.'
            : 'JEV was not called for this request. No model call, no added latency, no AI cost.'}
        </p>
        {violation && (
          <div>
            <p className="m-0 mb-3 text-[13px] text-muted">Switch off the two deny rules to see how JEV judges the same payload.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                ctx.setRule('serializedObject', false);
                ctx.setRule('classAllowList', false);
              }}
            >
              Turn off deny rules
            </Button>
          </div>
        )}
      </div>
    );
  }

  const flagged = checks.filter((c) => c.status === 'suspicious').map((c) => c.name);
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Eyebrow>JevInput</Eyebrow>
        <ul className="m-0 mt-2 p-0 list-none text-[13px] text-body grid gap-1.5">
          <li>
            <span className="text-ink-900 font-medium">requestContext</span> · {demoModel.endpoint}, canonical fields
          </li>
          <li>
            <span className="text-ink-900 font-medium">staticEvidence</span> · {staticVerdict}
            {flagged.length ? ` (${flagged.join(', ')})` : ''}
          </li>
          <li>
            <span className="text-ink-900 font-medium">policyVersion</span> · 7f3c2a1
          </li>
          <li>
            <span className="text-ink-900 font-medium">recentRequests</span>
            <ul className="m-0 mt-1 pl-4 font-mono text-[12px] text-muted">
              {data.context[ctx.scenario].map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </li>
        </ul>
      </div>

      <div>
        <Eyebrow>JevResult</Eyebrow>
        <div className="mt-2 grid grid-cols-3 gap-3">
          <StatTile label="Verdict" value={jev.verdict} className="p-4" />
          <StatTile label="Score" value={`${jev.score}/6`} className="p-4" />
          <StatTile label="Confidence" value={jev.confidence.toFixed(2)} className="p-4" />
        </div>
        <ScoreMeter score={jev.score / 6} threshold={demoModel.scoreThreshold / 6} label={null} showValue={false} tiles={24} className="mt-3" />
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
