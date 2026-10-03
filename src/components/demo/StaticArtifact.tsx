import { Check, TriangleAlert } from 'lucide-react';
import type { DemoCtx, StepData } from '../../types';
import { policyRules } from '../../data/demo';
import { Badge } from '../ui/Badge';
import { Tag } from '../ui/Tag';
import { Terminal } from '../ui/Terminal';
import { Rich } from './Rich';
import { ScenarioToggle } from './ScenarioToggle';

type Kind = 'tree' | 'deps' | 'env' | 'cve' | 'api' | 'request' | 'normalize';
type Data<K extends Kind> = Extract<StepData, { kind: K }>;

const row = 'grid grid-cols-[1fr_auto] gap-x-3 gap-y-0.5 items-baseline py-3 border-t border-(--border-subtle) first:border-t-0 first:pt-0';
const label = 'font-mono text-[11px] tracking-[.08em] uppercase text-muted';

function Flag({ children = 'Relevant' }: { children?: string }) {
  return (
    <Badge status="review" dot={false}>
      <TriangleAlert size={12} strokeWidth={2} aria-hidden />
      {children}
    </Badge>
  );
}

/** Read-only artefacts: the repo tree, dependency list, environment, CVE card, API surface, raw and canonical request. */
export function StaticArtifact({ data, ctx }: { data: Extract<StepData, { kind: Kind }>; ctx: DemoCtx }) {
  switch (data.kind) {
    case 'tree':
      return <Terminal title={data.title} lines={data.lines} highlight={false} />;

    case 'deps':
      return (
        <div>
          <p className={`${label} m-0 mb-3`}>{data.source}</p>
          <ul className="m-0 p-0 list-none">
            {data.rows.map((r) => (
              <li key={r.name} className={row}>
                <span className="font-mono text-[13px] text-ink-900">
                  {r.name} <span className="text-muted">{r.version}</span>
                </span>
                {r.flagged ? <Flag /> : <span />}
                <span className="col-span-2 text-[13px] text-muted">{r.note}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case 'env':
      return (
        <ul className="m-0 p-0 list-none">
          {data.rows.map((r) => (
            <li key={r.label} className={row}>
              <span className="text-[14px] text-ink-900">{r.label}</span>
              {r.flagged ? <Flag /> : <span />}
              <span className="col-span-2 font-mono text-[12px] text-muted">{r.value}</span>
            </li>
          ))}
        </ul>
      );

    case 'cve':
      return <CveCard data={data} />;

    case 'api':
      return (
        <ul className="m-0 p-0 list-none">
          {data.endpoints.map((ep) => (
            <li key={ep.method + ep.path} className="py-3 border-t border-(--border-subtle) first:border-t-0 first:pt-0">
              <div className="font-mono text-[14px] text-ink-900">
                <span className="text-muted">{ep.method}</span> {ep.path}
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {ep.fields.length ? ep.fields.map((f) => <Tag key={f}>{f}</Tag>) : <span className="text-[13px] text-muted">no fields</span>}
              </div>
              {ep.note && (
                <p className="mt-2 mb-0 text-[13px] text-muted">
                  <Rich text={ep.note} />
                </p>
              )}
            </li>
          ))}
        </ul>
      );

    case 'request': {
      const r = data.requests[ctx.scenario];
      return (
        <div className="flex flex-col gap-3">
          <Terminal title={r.title} lines={r.lines} highlight={false} />
          <p className="m-0 text-[13px] text-muted">{r.note}</p>
          <div>
            <ScenarioToggle ctx={ctx} />
          </div>
        </div>
      );
    }

    case 'normalize': {
      const v = data.variants[ctx.scenario];
      const on = policyRules.filter((r) => ctx.rules[r.id]).length;
      const rules = `${on} of ${policyRules.length} rules on`;
      return (
        <div className="flex flex-col gap-3">
          <Terminal title="before" lines={v.before.map((text) => ({ kind: 'comment' as const, text }))} highlight={false} />
          <Terminal title="after · canonical" lines={v.after.map((text) => ({ kind: 'out' as const, text }))} highlight={false} />
          <p className="m-0 flex items-start gap-2 text-[14px] text-ink-900">
            <Check size={16} strokeWidth={2} aria-hidden className="mt-0.5 shrink-0 text-verdigris-600" />
            <span>
              Policy for <span className="font-mono text-[13px]">{v.policy}</span> attached · {rules}
            </span>
          </p>
        </div>
      );
    }
  }
}

function CveCard({ data }: { data: Data<'cve'> }) {
  return (
    <div className="rounded-md border border-(--border-default) bg-bone-50 p-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span className="font-mono text-[15px] font-medium text-ink-900">{data.id}</span>
        <Badge status="blocked">No official patch</Badge>
      </div>
      <p className="mt-2 mb-0 text-[14px] text-body">{data.title}</p>
      <dl className="m-0 mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-[13px]">
        {data.facts.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className={label}>{k}</dt>
            <dd className="m-0 text-body">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {data.matches.map((m) => (
          <Tag key={m} className="gap-1">
            <Check size={12} strokeWidth={2} aria-hidden className="text-verdigris-600" />
            {m}
          </Tag>
        ))}
      </div>
      <p className="mt-4 mb-0 text-[13px] text-muted">{data.mitigation}</p>
    </div>
  );
}
