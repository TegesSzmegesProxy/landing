import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from 'lucide-react';
import { demoCopy, phases } from '../../data/demo';
import type { DemoPhase, DemoStep } from '../../types';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';

export interface StepperProps {
  steps: DemoStep[];
  index: number;
  playing: boolean;
  onGo: (i: number) => void;
  onToggle: () => void;
  onReset: () => void;
}

const PHASES: DemoPhase[] = ['learn', 'trace', 'adapt'];

/** Prev / Next / Auto-play / Reset plus one dot per step, grouped by phase. */
export function Stepper({ steps, index, playing, onGo, onToggle, onReset }: StepperProps) {
  return (
    <nav
      aria-label="Demo steps"
      className="sticky bottom-3 z-10 mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 p-3 rounded-lg bg-[rgba(247,243,235,.88)] backdrop-blur-[14px] border border-(--border-default) shadow-2"
    >
      <div className="flex items-center gap-2">
        <IconButton icon={ChevronLeft} label={demoCopy.prev} variant="outline" size="lg" disabled={index === 0} onClick={() => onGo(index - 1)} />
        <Button variant="secondary" size="md" iconRight={ChevronRight} disabled={index === steps.length - 1} onClick={() => onGo(index + 1)}>
          {demoCopy.next}
        </Button>
        <Button variant="outline" size="md" iconLeft={playing ? Pause : Play} aria-pressed={playing} onClick={onToggle}>
          {playing ? demoCopy.pause : demoCopy.play}
        </Button>
        <IconButton icon={RotateCcw} label={demoCopy.reset} variant="outline" size="lg" onClick={onReset} />
      </div>

      <ol className="m-0 p-0 list-none flex flex-wrap items-end gap-x-5 gap-y-2 min-w-0">
        {PHASES.map((p) => (
          <li key={p} className="min-w-0">
            <div className={cn('font-mono text-[10px] tracking-[.08em] uppercase', steps[index].phase === p ? 'text-ink-900' : 'text-muted')}>
              {phases[p].label}
            </div>
            <ol className="m-0 mt-1 p-0 list-none flex">
              {steps.map((s, i) =>
                s.phase !== p ? null : (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => onGo(i)}
                      aria-label={`Step ${i + 1}: ${s.title}`}
                      aria-current={i === index ? 'step' : undefined}
                      className="group relative grid place-items-center h-6 w-[22px] border-0 bg-transparent cursor-pointer before:absolute before:left-1/2 before:top-1/2 before:size-11 before:-translate-1/2 before:content-['']"
                    >
                      <span
                        className={cn(
                          'size-2.5 transition-[background-color,transform] duration-(--dur-fast) motion-reduce:transition-none',
                          i === index ? 'bg-ink-900 scale-125' : i < index ? 'bg-blue-600' : 'bg-bone-400 group-hover:bg-stone-500',
                        )}
                      />
                    </button>
                  </li>
                ),
              )}
            </ol>
          </li>
        ))}
      </ol>

      <span className="max-lg:hidden ml-auto font-mono text-[11px] text-muted">{demoCopy.keys}</span>
    </nav>
  );
}
