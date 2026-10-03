import { useId } from 'react';
import { policyRules } from '../../data/demo';
import type { DemoCtx, StepData, TemplateLine, TerminalLine } from '../../types';
import { Terminal } from '../ui/Terminal';

/** Expands the template; a rule that is off keeps its lines as comments, so the diff is visible. */
function build(template: TemplateLine[], rules: DemoCtx['rules'], lines: 'policy' | 'compiled'): TerminalLine[] {
  return template.flatMap((t): TerminalLine[] => {
    if (typeof t === 'string') return [{ kind: 'code', text: t }];
    const rule = policyRules.find((r) => r.id === t.rule);
    if (!rule) return [];
    return rule[lines].map((text) =>
      rules[t.rule] ? { kind: 'code', text } : { kind: 'comment', text: text.replace(/^(\s*)/, '$1# ') },
    );
  });
}

/** Step 6: the generated policy, the toolchain it compiles to, and the admin's switches. */
export function PolicyPanel({ data, ctx }: { data: Extract<StepData, { kind: 'policy' }>; ctx: DemoCtx }) {
  const group = useId();
  return (
    <div className="flex flex-col gap-4">
      <ol className="m-0 p-0 list-none grid gap-1.5">
        {data.beats.map((b, i) => (
          <li key={b} className="grid grid-cols-[22px_1fr] items-baseline text-[13px] text-body">
            <span className="font-mono text-[11px] text-muted">{i + 1}</span>
            {b}
          </li>
        ))}
      </ol>

      <Terminal title={data.title} lines={build(data.template, ctx.rules, 'policy')} />

      <fieldset className="m-0 p-4 rounded-md border border-(--border-default) bg-bone-50 min-w-0">
        <legend className="px-1 font-mono text-[11px] tracking-[.08em] uppercase text-muted">Policy API · editable</legend>
        <p className="m-0 mb-3 text-[13px] text-muted">{data.editNote}</p>
        <ul className="m-0 p-0 list-none grid gap-1">
          {policyRules.map((r) => {
            const id = `${group}-${r.id}`;
            return (
              <li key={r.id}>
                <label htmlFor={id} className="flex items-start gap-3 min-h-11 py-2 cursor-pointer">
                  <input
                    id={id}
                    type="checkbox"
                    checked={ctx.rules[r.id]}
                    onChange={(ev) => ctx.setRule(r.id, ev.target.checked)}
                    className="mt-0.5 size-4 shrink-0 cursor-pointer accent-(--accent)"
                  />
                  <span className="min-w-0">
                    <span className="block text-[14px] font-medium text-ink-900">{r.label}</span>
                    <span className="block text-[13px] text-muted">{r.plain}</span>
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <Terminal title={data.toolchainTitle} lines={build(data.toolchain, ctx.rules, 'compiled')} />
    </div>
  );
}
