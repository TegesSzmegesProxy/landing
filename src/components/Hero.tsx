import { useState } from 'react';
import { motion, useReducedMotion, useScroll, useTime, useTransform } from 'motion/react';
import type { MotionValue } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { hero } from '../data/content';
import { cn } from '../lib/cn';
import { useInterval } from '../lib/useInterval';
import { LG, useMediaQuery } from '../lib/useMediaQuery';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { ScoreMeter } from './ui/ScoreMeter';
import { Eyebrow } from './Eyebrow';

/** Frame used for the static art when motion is reduced. */
const STATIC_T = 10;

type Pair = [y: number, t: number];

/** Layer transforms — y = clamped scrollY (px), t = seconds. Mirrors Hero.jsx. */
const F = {
  imgY: (y: number) => y * 0.1,
  imgScale: (y: number) => 1 + y * 0.00015,
  c1X: ([y, t]: Pair) => -y * 0.35 + ((t * 6) % 1600) - 200,
  c2X: ([y, t]: Pair) => -y * 0.2 + ((t * 3.5 + 600) % 1800) - 300,
  c2Y: (y: number) => y * 0.05,
  c3X: ([y, t]: Pair) => -y * 0.5 + ((t * 9 + 1000) % 1700) - 250,
  birdsX: ([y, t]: Pair) => y * 0.9 + ((t * 40) % 1800) - 200,
  birdsY: ([y, t]: Pair) => -y * 0.25 + Math.sin(t * 1.2) * 6,
  cardY: (y: number) => -y * 0.14,
  glow: (y: number) => Math.max(0, 0.9 - y / 700),
};

function useHeroMotion() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => Math.min(v, 1400));
  const time = useTime();
  const t = useTransform(time, (ms) => ms / 1000);
  const pair = (fn: (p: Pair) => number) => useTransform([y, t] as MotionValue<number>[], (v: number[]) => fn([v[0], v[1]]));
  return {
    img: { y: useTransform(y, F.imgY), scale: useTransform(y, F.imgScale) },
    c1: { x: pair(F.c1X) },
    c2: { x: pair(F.c2X), y: useTransform(y, F.c2Y) },
    c3: { x: pair(F.c3X) },
    birds: { x: pair(F.birdsX), y: pair(F.birdsY) },
    card: { y: useTransform(y, F.cardY) },
    glow: { opacity: useTransform(y, F.glow) },
  };
}

const STATIC = {
  img: {},
  c1: { x: F.c1X([0, STATIC_T]) },
  c2: { x: F.c2X([0, STATIC_T]) },
  c3: { x: F.c3X([0, STATIC_T]) },
  birds: { x: F.birdsX([0, STATIC_T]), y: F.birdsY([0, STATIC_T]) },
  card: {},
  glow: { opacity: F.glow(0) },
};

const layer = 'absolute left-0 pixelated will-change-transform pointer-events-none';

export function Hero({ onDeploy }: { onDeploy: () => void }) {
  const reduced = useReducedMotion() ?? false;
  const isLg = useMediaQuery(LG);
  const live = useHeroMotion();
  const m = reduced ? STATIC : live;

  const [i, setI] = useState(0);
  useInterval(() => setI((x) => (x + 1) % hero.samples.length), reduced ? null : 2200);
  const r = hero.samples[i];

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="relative z-[5] max-w-[980px] mx-auto px-6 pt-[72px] pb-14 text-center">
        <Eyebrow>{hero.eyebrow}</Eyebrow>
        <h1 className="mt-5 font-sans text-[44px] lg:text-[76px] font-light leading-[1.04] tracking-[-0.035em] text-ink-900 text-balance">
          {hero.title}
        </h1>
        <p className="mt-6 mx-auto max-w-[600px] text-[19px] leading-[1.5] text-body text-pretty">{hero.body}</p>
        <div className="flex flex-wrap gap-2.5 justify-center mt-8">
          <Button size="lg" iconRight={ArrowRight} onClick={onDeploy}>
            {hero.primary}
          </Button>
        </div>
      </div>

      <div className="relative z-[1]">
        <div className="relative">
          <motion.div
            aria-hidden
            style={m.glow}
            className="absolute left-1/2 top-[14%] size-[560px] -ml-[280px] rounded-full z-0 pointer-events-none bg-[radial-gradient(closest-side,rgba(247,243,235,.95),rgba(247,243,235,0))]"
          />
          <motion.img
            src={`${import.meta.env.BASE_URL}pixel/hero-amphitheatre-day.png`}
            alt=""
            width={384}
            height={216}
            style={m.img}
            className="relative z-[1] block w-full pixelated will-change-transform pointer-events-none origin-[50%_100%]"
          />
          <motion.img src={`${import.meta.env.BASE_URL}pixel/cloud.png`} alt="" style={m.c2} className={cn(layer, 'top-[4%] w-[240px] max-w-none opacity-85 z-[2]')} />
          <motion.img src={`${import.meta.env.BASE_URL}pixel/cloud.png`} alt="" style={m.c1} className={cn(layer, 'top-[16%] w-[360px] max-w-none z-[2]')} />
          <motion.img src={`${import.meta.env.BASE_URL}pixel/cloud.png`} alt="" style={m.c3} className={cn(layer, 'top-[30%] w-[180px] max-w-none opacity-90 z-[3]')} />
          <motion.div aria-hidden style={m.birds} className={cn(layer, 'top-[10%] w-[84px] z-[3] flex gap-[22px] items-start')}>
            <img src={`${import.meta.env.BASE_URL}pixel/bird-a.png`} alt="" className="w-7 max-w-none pixelated" />
            <img src={`${import.meta.env.BASE_URL}pixel/bird-b.png`} alt="" className="w-7 max-w-none mt-3.5 pixelated" />
            <img src={`${import.meta.env.BASE_URL}pixel/bird-a.png`} alt="" className="w-5 max-w-none mt-1 pixelated" />
          </motion.div>
        </div>

        <motion.div
          style={isLg ? m.card : undefined}
          className="z-[4] lg:absolute lg:right-[6%] lg:top-[22%] lg:w-[300px] max-lg:relative max-lg:mx-auto max-lg:max-w-[360px] max-lg:px-6 max-lg:pt-6 max-lg:pb-14 max-lg:box-content"
        >
          <Card variant="glass" padding={18} aria-live="polite" aria-atomic="true">
            <div className="flex justify-between items-center">
              <span className="font-mono text-[11px] leading-[normal] font-medium tracking-[.08em] uppercase text-stone-600">{hero.gateLabel}</span>
              <Badge status={r.status}>{r.status === 'jev' ? 'JEV' : r.status}</Badge>
            </div>
            <div className="mt-3.5 mb-4 font-mono text-[15px] leading-[normal] text-ink-900">
              <span className="text-stone-600">{r.method}</span> {r.path}
            </div>
            <ScoreMeter score={r.score} tiles={16} />
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
