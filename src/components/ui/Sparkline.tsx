import type { CSSProperties } from 'react';

export interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  /** any CSS colour, e.g. a token var */
  color?: string;
  fill?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function Sparkline({ data, width = 120, height = 32, color = 'var(--text-strong)', fill = true, className, style }: SparklineProps) {
  if (!data.length) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const r = max - min || 1;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * width, height - 2 - ((v - min) / r) * (height - 4)] as const);
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  return (
    <svg
      aria-hidden
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
      style={{ display: 'block', overflow: 'visible', ...style }}
    >
      {fill && <path d={`${d} L${width} ${height} L0 ${height} Z`} style={{ fill: color }} opacity=".08" />}
      <path d={d} fill="none" style={{ stroke: color }} strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
