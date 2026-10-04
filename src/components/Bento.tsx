import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  Activity,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  Gauge,
  KeyRound,
  Layers,
  Lock,
  Plus,
  ScanLine,
  Settings,
  Shield,
  SlidersHorizontal,
  type LucideIcon,
} from 'lucide-react';
import { bento } from '../data/content';
import type { BadgeStatus } from '../types';
import { cn } from '../lib/cn';
import { DUR, EASE_OUT, reveal } from '../lib/motion';
import { useInterval } from '../lib/useInterval';
import { Badge } from './ui/Badge';
import { Sparkline } from './ui/Sparkline';
import { Eyebrow } from './Eyebrow';

const TAB_ICONS: LucideIcon[] = [Layers, Activity, FileText, ScanLine, SlidersHorizontal, Settings];
const SETTINGS_ICONS: LucideIcon[] = [Settings, KeyRound];

const panel = 'rounded-md border border-(--border-subtle) bg-card p-5 min-w-0';
const label = 'font-mono text-[10px] tracking-[0.12em] uppercase text-muted';
/** Looks like a control in the real dashboard, but this is a picture of one: not focusable. */
const fakeLink = 'text-[13px] text-(--text-link) underline underline-offset-2';

function NavItem({ icon: Icon, children, active, sub }: { icon: LucideIcon; children: ReactNode; active?: boolean; sub?: boolean }) {
  return (
    <li
      className={cn(
        'flex items-center gap-2.5 h-8 rounded-sm text-[13px]',
        sub ? 'pl-7 pr-2' : 'px-2.5',
        active ? 'bg-card text-strong shadow-1' : 'text-body',
      )}
    >
      <Icon size={14} strokeWidth={1.5} aria-hidden className="shrink-0 text-muted" />
      {children}
    </li>
  );
}

function PanelHead({ title, badge, status }: { title: string; badge: string; status: BadgeStatus }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <h3 className="m-0 text-[17px] font-normal text-strong">{title}</h3>
      <Badge status={status}>{badge}</Badge>
    </div>
  );
}

function Overview({ reduced }: { reduced: boolean }) {
  const { slides } = bento.overview;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useInterval(() => setI((n) => (n + 1) % slides.length), reduced || paused ? null : 3200);
  const go = (d: number) => setI((n) => (n + d + slides.length) % slides.length);
  const s = slides[i];

  return (
    <div className={panel} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <PanelHead title={bento.overview.title} badge={bento.overview.status} status="passed" />
      <p className="m-0 mt-1 text-[13px] text-muted">{bento.overview.body}</p>
      <div className="mt-4 grid grid-cols-[28px_1fr_28px] items-center gap-2">
        <button type="button" onClick={() => go(-1)} aria-label="Previous metric" className="grid place-items-center size-7 rounded-sm text-muted hover:bg-(--border-subtle) cursor-pointer">
          <ChevronLeft size={16} strokeWidth={1.5} aria-hidden />
        </button>
        <div className="relative h-[120px] overflow-hidden rounded-md bg-sunken" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={i}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: DUR.base, ease: EASE_OUT }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-3"
            >
              <span className="text-[34px] font-light leading-none tracking-[-0.03em] text-strong tabular-nums">{s.value}</span>
              <span className="mt-2 text-[14px] text-strong">{s.label}</span>
              <span className="mt-0.5 text-[12px] text-muted">{s.meta}</span>
            </motion.div>
          </AnimatePresence>
        </div>
        <button type="button" onClick={() => go(1)} aria-label="Next metric" className="grid place-items-center size-7 rounded-sm text-muted hover:bg-(--border-subtle) cursor-pointer">
          <ChevronRight size={16} strokeWidth={1.5} aria-hidden />
        </button>
      </div>
      <div className="mt-3 flex items-center justify-center gap-1.5 font-mono text-[11px] text-muted">
        {slides.map((sl, n) => (
          <span key={sl.label} aria-hidden className={cn('size-1.5 transition-colors', n === i ? 'bg-accent' : 'bg-(--border-default)')} />
        ))}
        <span className="ml-2 tabular-nums">
          {i + 1} / {slides.length}
        </span>
      </div>
    </div>
  );
}

export function Bento() {
  const reduced = useReducedMotion() ?? false;
  const { nav } = bento;

  return (
    <section id="dashboard" aria-labelledby="dashboard-heading" className="theme-ink relative overflow-hidden bg-ink-900">
      <img
        src={`${import.meta.env.BASE_URL}pixel/hero-amphitheatre-night.png`}
        alt=""
        width={384}
        height={216}
        className="absolute left-0 bottom-0 w-full pixelated opacity-55"
      />
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 pt-32 pb-[200px]">
        <motion.div {...reveal}>
          <Eyebrow color="text-bone-500">{bento.eyebrow}</Eyebrow>
          <h2
            id="dashboard-heading"
            className="mt-4 mb-4 max-w-[640px] font-sans text-[40px] sm:text-[48px] font-light leading-[1.08] tracking-[-0.03em] text-bone-50"
          >
            {bento.title}
          </h2>
          <p className="m-0 mb-12 max-w-[560px] text-[17px] leading-[1.55] text-bone-300 text-pretty">{bento.body}</p>
        </motion.div>

        <motion.figure {...reveal} className="theme-bone m-0 overflow-hidden rounded-lg border border-(--border-glass) shadow-3 bg-(--surface-page) text-body">
          <figcaption className="sr-only">Preview of the Tessera dashboard with sample data.</figcaption>

          {/* window chrome */}
          <div aria-hidden className="flex items-center gap-3 h-10 px-4 bg-ink-950 border-b border-(--border-glass)">
            <span className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-clay-500" />
              <span className="size-2.5 rounded-full bg-ochre-500" />
              <span className="size-2.5 rounded-full bg-verdigris-500" />
            </span>
            <span className="flex items-center gap-1.5 h-6 px-3 min-w-0 rounded-sm bg-[rgba(241,235,224,.08)] font-mono text-[11px] text-bone-500 truncate">
              <Lock size={10} strokeWidth={1.5} className="shrink-0" />
              {bento.url}
            </span>
          </div>

          <div className="grid md:grid-cols-[188px_1fr]">
            {/* sidebar */}
            <aside aria-hidden className="hidden md:flex flex-col justify-between border-r border-(--border-subtle) p-3 pt-5">
              <div>
                <div className="px-2.5 font-mono text-[12px] tracking-[0.2em] text-strong">TESSERA</div>
                <ul className="m-0 mt-5 p-0 list-none">
                  <NavItem icon={Gauge} active>
                    {nav.dashboard}
                  </NavItem>
                </ul>
                <div className={cn(label, 'mt-5 mb-1.5 px-2.5')}>{nav.settingsLabel}</div>
                <ul className="m-0 p-0 list-none">
                  {nav.settings.map((s, i) => (
                    <NavItem key={s} icon={SETTINGS_ICONS[i]}>
                      {s}
                    </NavItem>
                  ))}
                </ul>
                <div className={cn(label, 'mt-5 mb-1.5 px-2.5')}>{nav.projectsLabel}</div>
                <ul className="m-0 p-0 list-none">
                  <li className="flex items-center justify-between h-8 px-2.5 text-[13px] text-strong">
                    <span className="flex items-center gap-2.5">
                      <Shield size={14} strokeWidth={1.5} className="text-muted" />
                      {nav.project}
                    </span>
                    <ChevronDown size={14} strokeWidth={1.5} className="text-muted" />
                  </li>
                  {nav.projectTabs.map((t, i) => (
                    <NavItem key={t} icon={TAB_ICONS[i]} sub>
                      {t}
                    </NavItem>
                  ))}
                </ul>
              </div>
              <div className="mt-8 px-2.5 text-[12px] text-muted truncate">{bento.user}</div>
            </aside>

            {/* main */}
            <div className="min-w-0">
              <div aria-hidden className="h-10 flex items-center px-5 border-b border-(--border-subtle) text-[12px] text-strong">
                {bento.org}
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-[26px] font-normal leading-tight text-strong">{bento.heading}</div>
                    <p className="m-0 mt-1 text-[13px] text-muted">
                      {bento.subheading} <strong className="font-medium text-strong">{bento.org}</strong>.
                    </p>
                  </div>
                  <div aria-hidden className="flex items-center gap-2">
                    <Badge status="passed" className="max-sm:hidden">
                      {bento.reachable}
                    </Badge>
                    <span className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full bg-accent text-accent-fg text-[13px]">
                      <Plus size={14} strokeWidth={1.5} />
                      {bento.newProject}
                    </span>
                  </div>
                </div>

                <dl className="m-0 mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {bento.stats.map((s) => (
                    <div key={s.label} className={cn(panel, 'p-4')}>
                      <dt className={label}>{s.label}</dt>
                      <dd className="m-0 mt-2 text-[30px] font-light leading-none tracking-[-0.03em] text-strong tabular-nums">{s.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-3 grid lg:grid-cols-[1.45fr_1fr] gap-3 items-start">
                  <div className="grid gap-3 min-w-0">
                    <Overview reduced={reduced} />

                    <div className={panel}>
                      <PanelHead title={bento.projects.title} badge={bento.projects.total} status="neutral" />
                      <p className="m-0 mt-1 text-[13px] text-muted">{bento.projects.body}</p>
                      <ul className="m-0 mt-3 p-0 list-none">
                        {bento.projects.rows.map((p) => (
                          <li key={p.name} className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto] items-center gap-x-3 gap-y-1.5 py-3 border-t border-(--border-subtle) first:border-t-0">
                            <div className="min-w-0">
                              <div className="text-[14px] text-strong">{p.name}</div>
                              <div className="font-mono text-[11px] text-muted truncate">{p.meta}</div>
                            </div>
                            <Sparkline data={p.trend} width={64} height={22} color="var(--blue-600)" className="max-sm:hidden" />
                            <Badge status={p.status as BadgeStatus}>{p.statusLabel}</Badge>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid gap-3 min-w-0">
                    <div className={panel}>
                      <PanelHead title={bento.jev.title} badge={bento.jev.status} status="passed" />
                      <p className="m-0 mt-1 text-[13px] text-muted">{bento.jev.body}</p>
                      <div className="mt-3 text-[12px] text-strong">{bento.jev.keyLabel}</div>
                      <div aria-hidden className="mt-1.5 flex gap-2">
                        <span className="flex-1 min-w-0 h-9 px-3 flex items-center rounded-sm border border-(--border-default) bg-(--surface-page) font-mono text-[12px] text-body truncate">
                          {bento.jev.key}
                        </span>
                        <span className="h-9 px-3.5 flex items-center rounded-full border border-(--border-strong) text-[13px] text-strong">{bento.jev.rotate}</span>
                      </div>
                    </div>

                    <div className={panel}>
                      <PanelHead title={bento.repos.title} badge={bento.repos.status} status="passed" />
                      <p className="m-0 mt-1 text-[13px] text-muted">{bento.repos.body}</p>
                      <ul className="m-0 mt-3 p-0 list-none flex flex-wrap gap-1.5">
                        {bento.repos.rows.map((r) => (
                          <li key={r}>
                            <Badge status="neutral" dot={false} className="normal-case tracking-normal">
                              {r}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                      <span aria-hidden className={cn(fakeLink, 'mt-3 inline-block')}>
                        {bento.repos.manage}
                      </span>
                    </div>

                    <div className={panel}>
                      <h3 className="m-0 text-[17px] font-normal text-strong">{bento.credentials.title}</h3>
                      <p className="m-0 mt-1 text-[13px] text-muted">{bento.credentials.body}</p>
                      <dl className="m-0 mt-2">
                        {bento.credentials.rows.map((r) => (
                          <div key={r.label} className="flex justify-between py-2.5 border-t border-(--border-subtle) first:border-t-0 text-[13px]">
                            <dt className="text-strong">{r.label}</dt>
                            <dd className="m-0 font-mono text-[12px] text-body">{r.value}</dd>
                          </div>
                        ))}
                      </dl>
                      <span aria-hidden className={cn(fakeLink, 'mt-2 inline-block')}>
                        {bento.credentials.manage}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.figure>
      </div>
    </section>
  );
}
