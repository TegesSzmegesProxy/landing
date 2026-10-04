import { demoModel } from '../../data/demo';
import type { DemoCtx, StepData } from '../../types';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Sparkline } from '../ui/Sparkline';
import { Eyebrow } from '../Eyebrow';
import { ArrowRight } from 'lucide-react';

const pct = (v: number) => `${Math.round(v * 100)}%`;

/** Step 15: EWMA moves the sampling rate for the endpoint that was hit; recap and CTA. */
export function FeedbackPanel({ data, ctx }: { data: Extract<StepData, { kind: 'feedback' }>; ctx: DemoCtx }) {
  const { feedback, verdict, jev, path } = ctx.result;
  const hit = feedback.find((f) => f.target);
  const before = hit ? hit.series[data.rows[0].seed.length - 1] : 0;
  const after = hit ? hit.series[data.rows[0].seed.length] : 0;
  const { up, down } = demoModel.ewma;
  const fed = jev.called ? `JEV ${jev.verdict} fed` : path === 'violation' ? 'static block · not fed' : 'not sampled · not fed';

  return (
    <div className="flex flex-col gap-5">
      <div>
        <Eyebrow>
          Sampling N · EWMA α↑ {up} α↓ {down}
        </Eyebrow>
        <ul className="m-0 mt-3 p-0 list-none">
          {feedback.map((f) => (
            <li
              key={f.endpoint}
              className={cn('grid grid-cols-[1fr_auto] items-center gap-x-4 py-3 border-t border-(--border-subtle) first:border-t-0 first:pt-0')}
            >
              <div className="min-w-0">
                <div className={cn('font-mono text-[13px] truncate', f.target ? 'text-ink-900 font-medium' : 'text-muted')}>{f.endpoint}</div>
                <div className="font-mono text-[12px] text-muted">
                  {f.target ? (after === before ? `${pct(after)} · unchanged` : `${pct(before)} → ${pct(after)}`) : `${pct(f.series[f.series.length - 1])} · unchanged`}
                </div>
              </div>
              <Sparkline data={f.series} width={120} height={30} color={f.target ? 'var(--blue-600)' : 'var(--text-faint)'} />
            </li>
          ))}
        </ul>
      </div>

      <dl className="m-0 grid gap-2 sm:grid-cols-3 text-[13px]">
        {[
          ['Sampler', `${demoModel.endpoint} N = ${pct(after)}`],
          ['Metrics', `${verdict.toUpperCase()} · ${fed}`],
          ['Threshold', `T ${ctx.threshold.toFixed(2)} · floor ${demoModel.thresholdFloor.toFixed(2)} · tighten-only`],
        ].map(([k, v]) => (
          <div key={k} className="rounded-md border border-(--border-subtle) p-3">
            <dt className="font-mono text-[11px] tracking-[.08em] uppercase text-muted">{k}</dt>
            <dd className="m-0 mt-1 text-body">{v}</dd>
          </div>
        ))}
      </dl>

      <Card variant="ink" padding={20}>
        <Eyebrow color="text-bone-500">{data.recapTitle}</Eyebrow>
        <ol className="m-0 mt-3 p-0 list-none grid gap-2.5">
          {data.recap.map((t, i) => (
            <li key={t} className="grid grid-cols-[22px_1fr] text-[14px] leading-[1.45] text-bone-300">
              <span className="font-mono text-[11px] pt-0.5 text-bone-500">{i + 1}</span>
              {t}
            </li>
          ))}
        </ol>
        <Button variant="primary" iconRight={ArrowRight} className="mt-5" onClick={ctx.onDeploy}>
          {data.cta}
        </Button>
      </Card>
    </div>
  );
}
