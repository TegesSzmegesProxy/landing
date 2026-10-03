import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { demoCopy, demoEdges, demoGroups, demoNodes, diagram, phases } from '../../data/demo';
import { cn } from '../../lib/cn';
import { buildEdges, nodeById, packetPath } from '../../lib/demoGeometry';
import type { DemoNodeId, DemoPhase, StepView } from '../../types';

export interface ArchitectureCanvasProps {
  stepId: string;
  phase: DemoPhase;
  view: StepView;
  onSelect: (id: DemoNodeId) => void;
}

const MIN_STRETCH = 0.9;
const MAX_STRETCH = 1.8;
const MONO = 'font-mono text-[10px] tracking-[.08em] uppercase';

/** Hand-drawn architecture: nodes light up per step, a packet travels the highlighted path. */
export function ArchitectureCanvas({ stepId, phase, view, onSelect }: ArchitectureCanvasProps) {
  const reduced = useReducedMotion() ?? false;
  const lit = useMemo(() => new Set<string>(view.highlightNodes), [view.highlightNodes]);
  const litEdges = useMemo(() => new Set(view.highlightEdges), [view.highlightEdges]);

  // The canvas fills the inspector's height: the layout stretches vertically, boxes and text keep their size.
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const natural = size.w ? (size.w * diagram.height) / diagram.width : 0;
  const sy = natural ? Math.min(MAX_STRETCH, Math.max(MIN_STRETCH, size.h / natural)) : 1;
  const H = diagram.height * sy;
  const Y = (y: number) => y * sy;
  const edges = useMemo(() => buildEdges(sy), [sy]);
  const path = useMemo(() => (view.packet ? packetPath(view.packet, edges) : []), [view.packet, edges]);

  const onKey = (id: DemoNodeId) => (ev: KeyboardEvent) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      onSelect(id);
    }
  };

  return (
    <>
      <div ref={box} className="max-md:hidden relative max-lg:aspect-[1160/630] lg:h-full" style={{ minHeight: natural * MIN_STRETCH || undefined }}>
      <svg
        role="group"
        aria-label={demoCopy.diagramLabel}
        viewBox={`0 0 ${diagram.width} ${H}`}
        className="absolute inset-0 block w-full h-full"
      >
        <defs>
          {(['dim', 'on'] as const).map((k) => (
            <marker key={k} id={`demo-arrow-${k}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 1 L9 5 L0 9 Z" className={k === 'on' ? 'fill-blue-600' : 'fill-stone-500'} />
            </marker>
          ))}
        </defs>

        {demoGroups.map((g) => (
          <g key={g.id} aria-hidden className={cn('transition-opacity duration-(--dur-base) motion-reduce:transition-none', g.phase === phase ? 'opacity-100' : 'opacity-40')}>
            <rect x={g.x} y={Y(g.y)} width={g.w} height={Y(g.h)} rx={10} className="fill-bone-50/40 stroke-(--border-default)" strokeDasharray="4 4" />
            <text x={g.x + 12} y={Y(g.y) + 15} className={cn(MONO, 'fill-stone-600')}>
              {g.label}
            </text>
          </g>
        ))}

        {demoEdges.map((ed) => {
          const on = litEdges.has(ed.id);
          const inPhase = nodeById.get(ed.from)?.phase === phase || nodeById.get(ed.to)?.phase === phase;
          return (
            <path
              key={ed.id}
              d={edges.get(ed.id)?.d}
              fill="none"
              strokeWidth={on ? 2.25 : 1.25}
              strokeDasharray={ed.dashed ? '5 4' : undefined}
              markerEnd={ed.line ? undefined : `url(#demo-arrow-${on ? 'on' : 'dim'})`}
              className={cn('transition-[stroke,opacity] duration-(--dur-base) motion-reduce:transition-none', on ? 'stroke-blue-600' : 'stroke-stone-500')}
              opacity={on ? 1 : inPhase ? 0.55 : 0.2}
            />
          );
        })}

        {demoNodes.map((nd) => {
          const on = lit.has(nd.id);
          const h = diagram.nodeH;
          return (
            <g
              key={nd.id}
              role="button"
              tabIndex={0}
              aria-label={`${nd.label}: go to its step`}
              aria-current={on ? 'step' : undefined}
              onClick={() => onSelect(nd.id)}
              onKeyDown={onKey(nd.id)}
              className={cn(
                'cursor-pointer outline-none group transition-opacity duration-(--dur-base) motion-reduce:transition-none',
                on || nd.phase === phase ? 'opacity-100' : 'opacity-40',
              )}
            >
              <rect
                x={nd.x - nd.w / 2}
                y={Y(nd.y) - h / 2}
                width={nd.w}
                height={h}
                rx={6}
                strokeWidth={on ? 2 : 1}
                className={cn(
                  'transition-[fill,stroke] duration-(--dur-base) motion-reduce:transition-none group-focus-visible:stroke-(--focus-ring) group-focus-visible:stroke-[3px] group-hover:stroke-ink-900',
                  on ? 'fill-blue-100 stroke-blue-600' : 'fill-bone-50 stroke-(--border-strong)',
                )}
              />
              <text x={nd.x} y={Y(nd.y)} textAnchor="middle" dominantBaseline="central" className={cn('font-sans text-[13px] pointer-events-none', on ? 'fill-ink-900 font-medium' : 'fill-stone-700')}>
                {nd.label}
              </text>
            </g>
          );
        })}

        {!reduced && path.length > 1 && (
          <motion.g
            key={`${stepId}:${view.packet?.from}-${view.packet?.to}`}
            aria-hidden
            initial={{ x: path[0][0], y: path[0][1] }}
            animate={{ x: path.map((p) => p[0]), y: path.map((p) => p[1]), transition: { duration: Math.min(2.6, Math.max(0.9, pathLength(path) / 420)), ease: 'easeInOut', times: times(path) } }}
          >
            <circle r={11} className="fill-blue-500/25" />
            <circle r={5.5} className="fill-blue-600 stroke-bone-50" strokeWidth={1.5} />
          </motion.g>
        )}
      </svg>
      </div>

      <div className="md:hidden">
        <p className={cn(MONO, 'm-0 mb-3 text-muted')}>{demoCopy.nodesLabel}</p>
        <ol className="m-0 p-0 list-none flex flex-col items-stretch">
          {view.highlightNodes.map((id, i) => {
            const nd = nodeById.get(id);
            if (!nd) return null;
            return (
              <li key={id} className="flex flex-col items-center">
                {i > 0 && <ArrowDown size={14} strokeWidth={1.5} aria-hidden className="my-1 text-stone-500" />}
                <button
                  type="button"
                  onClick={() => onSelect(id)}
                  className="w-full flex items-center justify-between gap-3 min-h-11 px-4 py-2 rounded-md border border-blue-600 bg-blue-100 text-left cursor-pointer text-ink-900"
                >
                  <span className="text-[14px] font-medium">{nd.label}</span>
                  <span className={cn(MONO, 'text-blue-700')}>
                    {nd.group} · {phases[nd.phase].label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}

function pathLength(pts: ReadonlyArray<readonly [number, number]>) {
  return pts.slice(1).reduce((sum, p, i) => sum + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0);
}

/** Keyframe times proportional to distance, so the packet moves at one speed. */
function times(pts: ReadonlyArray<readonly [number, number]>) {
  const total = pathLength(pts) || 1;
  let run = 0;
  return pts.map((p, i) => {
    if (i) run += Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]);
    return Math.min(1, run / total);
  });
}
