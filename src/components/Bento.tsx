import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { bento, endpoints } from '../data/content';
import { cn } from '../lib/cn';
import { reveal, revealAt } from '../lib/motion';
import { useInterval } from '../lib/useInterval';
import { Badge } from './ui/Badge';
import { Card } from './ui/Card';
import { ScoreMeter } from './ui/ScoreMeter';
import { StatTile } from './ui/StatTile';
import { Ticket } from './ui/Ticket';
import { Eyebrow } from './Eyebrow';
import { depthColour } from './Flow';

const cell = 'md:col-span-2 min-w-0';
const glassTile = 'bg-(--surface-glass-dark)! border-(--border-glass)! backdrop-blur-(--blur-glass)';

/** Glass tiles reveal themselves (not via a wrapper) so their backdrop blur keeps working mid-fade. */
const RevealCard = motion.create(Card);
const RevealStatTile = motion.create(StatTile);

const walk = (s: number[]) => s.map((v) => Math.max(0.01, Math.min(0.99, v + (Math.random() - 0.5) * 0.12)));

export function Bento() {
  const reduced = useReducedMotion() ?? false;
  const [scores, setScores] = useState(bento.initialScores);
  useInterval(() => setScores(walk), reduced ? null : 1600);

  return (
    <section id="dashboard" aria-labelledby="dashboard-heading" className="theme-ink relative overflow-hidden bg-ink-900">
      <img
        src={`${import.meta.env.BASE_URL}pixel/hero-amphitheatre-night.png`}
        alt=""
        width={384}
        height={216}
        className="absolute left-0 bottom-0 w-full pixelated opacity-55"
      />
      <div className="relative max-w-[1200px] mx-auto px-6 pt-32 pb-[200px]">
        <motion.div {...reveal}>
          <Eyebrow color="text-bone-500">{bento.eyebrow}</Eyebrow>
          <h2
            id="dashboard-heading"
            className="mt-4 mb-12 max-w-[640px] font-sans text-[48px] font-light leading-[1.08] tracking-[-0.03em] text-bone-50"
          >
            {bento.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
          <RevealCard {...revealAt(0)} variant="glass-dark" className={cn(cell, 'lg:col-span-3 lg:row-span-2')}>
            <Eyebrow color="text-bone-500">{bento.scoreLabel}</Eyebrow>
            <div className="flex flex-col gap-[18px] mt-[22px]">
              {bento.routes.map((r, i) => (
                <div key={r}>
                  <div className="font-mono text-[13px] leading-[normal] text-bone-100 mb-2">{r}</div>
                  <ScoreMeter score={scores[i]} tone="dark" label={null} showValue={false} tiles={24} />
                </div>
              ))}
            </div>
          </RevealCard>

          <RevealStatTile
            {...revealAt(1)}
            variant="ink"
            label={bento.latency.label}
            value={bento.latency.value}
            unit={bento.latency.unit}
            delta={bento.latency.delta}
            deltaTone="good"
            trend={bento.latency.trend}
            className={cn(cell, glassTile, 'lg:col-span-3')}
          />

          <RevealStatTile
            {...revealAt(2)}
            variant="ink"
            label={bento.blocked.label}
            value={bento.blocked.value}
            delta={bento.blocked.delta}
            deltaTone="bad"
            className={cn(cell, glassTile, 'lg:col-span-2')}
          />

          <RevealCard
            {...revealAt(3)}
            variant="glass-dark"
            padding={20}
            className={cn(cell, 'lg:col-span-1 flex flex-col justify-between max-lg:items-start max-lg:gap-3')}
          >
            <Eyebrow color="text-bone-500">{bento.modeLabel}</Eyebrow>
            <Badge status="jev">{bento.mode}</Badge>
          </RevealCard>

          <RevealCard {...revealAt(4)} variant="glass-dark" className={cn(cell, 'lg:col-span-4')}>
            <div className="flex justify-between gap-3">
              <Eyebrow color="text-bone-500">{bento.depthLabel}</Eyebrow>
              <Eyebrow color="text-bone-300" className="shrink-0">
                {bento.depthMeta}
              </Eyebrow>
            </div>
            <div className="flex flex-col gap-2.5 mt-5">
              {endpoints.map(([e, v]) => (
                <div key={e} className="grid grid-cols-[120px_1fr_40px] gap-3 items-center font-mono text-[12px] leading-[normal] text-bone-300">
                  <span>{e}</span>
                  <span className="h-2 bg-[rgba(241,235,224,.08)]">
                    <span className={cn('block h-full', depthColour(v))} style={{ width: `${v}%` }} />
                  </span>
                  <span className="text-right">{v}%</span>
                </div>
              ))}
            </div>
          </RevealCard>

          <RevealCard
            {...revealAt(5)}
            variant="glass-dark"
            padding={20}
            className={cn(cell, 'lg:col-span-2 flex flex-col justify-center items-start gap-3')}
          >
            <Eyebrow color="text-bone-500">{bento.receiptLabel}</Eyebrow>
            <div className="theme-bone max-w-full">
              <Ticket {...bento.ticket} className="min-w-0! bg-bone-50!" />
            </div>
          </RevealCard>
        </div>
      </div>
    </section>
  );
}
