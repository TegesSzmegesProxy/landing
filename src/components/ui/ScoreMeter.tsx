import type { CSSProperties } from 'react';
import { cn } from '../../lib/cn';

export interface ScoreMeterProps {
  /** 0–1 */
  score: number;
  tiles?: number;
  label?: string | null;
  showValue?: boolean;
  /** block threshold 0–1, default 0.7 */
  threshold?: number;
  tone?: 'light' | 'dark';
  className?: string;
  style?: CSSProperties;
}

/** JEV attack probability as a row of mosaic tiles (tesserae). Verdigris → ochre → clay past threshold. */
export function ScoreMeter({
  score,
  tiles = 20,
  label = 'Attack probability',
  showValue = true,
  threshold = 0.7,
  tone = 'light',
  className,
  style,
}: ScoreMeterProps) {
  const dark = tone === 'dark';
  const lit = Math.round(score * tiles);
  const col = (i: number) => {
    const p = (i + 1) / tiles;
    if (i >= lit) return dark ? 'bg-[rgba(241,235,224,.1)]' : 'bg-bone-300';
    return p > threshold ? 'bg-clay-500' : p > threshold * 0.6 ? 'bg-ochre-500' : 'bg-verdigris-500';
  };
  const verdict = score >= threshold ? 'block' : score >= threshold * 0.6 ? 'review' : 'pass';

  return (
    <div className={cn('flex flex-col gap-2 font-mono', className)} style={style}>
      {(label || showValue) && (
        <div className={cn('flex justify-between text-[11px] tracking-[0.08em] uppercase', dark ? 'text-bone-500' : 'text-muted')}>
          <span>{label}</span>
          {showValue && (
            <span className={dark ? 'text-bone-100' : 'text-strong'}>
              {score.toFixed(2)} · {verdict}
            </span>
          )}
        </div>
      )}
      <div aria-hidden className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${tiles}, 1fr)` }}>
        {Array.from({ length: tiles }, (_, i) => (
          <span
            key={i}
            className={cn('h-3.5 transition-[background-color] duration-(--dur-base) ease-out', col(i))}
            style={{ transitionDelay: `${i * 12}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
