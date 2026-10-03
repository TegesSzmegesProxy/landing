import { useEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { motion } from 'motion/react';
import type { TerminalLine, TerminalLineKind } from '../../types';
import { cn } from '../../lib/cn';
import { DUR, EASE_OUT } from '../../lib/motion';

export interface TerminalProps {
  title?: string;
  lines: Array<TerminalLine | string>;
  highlight?: boolean;
  /** lines mounted after the first render fade/slide in */
  animateNewLines?: boolean;
  className?: string;
  style?: CSSProperties;
}

const C: Partial<Record<TerminalLineKind, string>> = {
  cmd: 'text-bone-50',
  out: 'text-bone-400',
  comment: 'text-stone-500',
  block: 'text-clay-500',
  pass: 'text-verdigris-500',
  jev: 'text-blue-300',
  key: 'text-blue-300',
  warn: 'text-ochre-500',
};

const TOKEN = /("[^"]*"|'[^']*'|\b\d+(?:\.\d+)?\b|^\s*[\w.-]+:)/g;

/** Strings → ochre-100, `key:` → blue-300, numbers → terracotta-400. */
function hl(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let last = 0;
  let k = 0;
  for (const m of text.matchAll(TOKEN)) {
    const s = m[0];
    const at = m.index;
    if (at > last) parts.push(text.slice(last, at));
    const col = /^["']/.test(s) ? 'text-ochre-100' : /:$/.test(s) ? 'text-blue-300' : 'text-terracotta-400';
    parts.push(
      <span key={k++} className={col}>
        {s}
      </span>,
    );
    last = at + s.length;
  }
  parts.push(text.slice(last));
  return parts;
}

/** Ink terminal window for policies, payloads and CLI output. Square window dots, mono 13/1.65. */
export function Terminal({ title = 'tessera', lines, highlight = true, animateNewLines = false, className, style }: TerminalProps) {
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
  }, []);
  const enter = animateNewLines && mounted.current;

  return (
    <div
      className={cn('rounded-lg bg-ink-900 border border-(--terminal-border) shadow-3 overflow-hidden font-mono', className)}
      style={style}
    >
      <div className="flex items-center gap-2.5 h-[38px] px-3.5 border-b border-[rgba(241,235,224,.08)]">
        <span aria-hidden className="flex gap-[5px]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2 bg-stone-700" />
          ))}
        </span>
        <span className="text-[12px] text-stone-500">{title}</span>
      </div>
      <pre className="m-0 pt-4 px-[18px] pb-[18px] font-mono text-[13px] leading-[1.65] text-bone-300 overflow-x-auto whitespace-pre">
        {lines.map((l, i) => {
          const ln: TerminalLine = typeof l === 'string' ? { kind: 'out', text: l } : l;
          const plain = ln.kind === 'out' || ln.kind === 'code';
          return (
            <motion.div
              key={i}
              className={(ln.kind && C[ln.kind]) || 'text-bone-300'}
              initial={enter ? { opacity: 0, x: -4 } : false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: DUR.base, ease: EASE_OUT }}
            >
              {ln.kind === 'cmd' && <span className="text-blue-500">$ </span>}
              {highlight && plain ? hl(ln.text) : ln.text}
            </motion.div>
          );
        })}
      </pre>
    </div>
  );
}
