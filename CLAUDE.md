# CLAUDE.md — Tessera landing (React + TypeScript + Tailwind v4 + Framer Motion)

Rebuild the marketing site in `Tessera Design System/ui_kits/website/` as a real Vite app. The result must look and behave **identically** to that reference (open `ui_kits/website/index.html` in a browser to compare), but be written in TypeScript, styled with Tailwind v4 + CSS variables, and animated with Framer Motion.

The reference is a bone (light) site with one ink (dark) section. There is no dark-theme variant of the page — do not add one.

## Sources of truth (in priority order)

1. `Tessera Design System/ui_kits/website/*.jsx` — layout, copy, every pixel value, every interaction.
2. `Tessera Design System/components/**/*.jsx` — exact styling of each primitive (Button, Card, Badge, Tag, NavPill, Terminal, ScoreMeter, StatTile, Sparkline, Ticket, Dialog, IconButton, Field, Input, Select). The `.d.ts` and `.prompt.md` next to each file describe props and usage.
3. `Tessera Design System/tokens/*.css` — every colour, size, radius, shadow, duration and easing.
4. `Tessera Design System/readme.md` — voice, visual rules, anti-patterns.

If this file and the source disagree, the source wins. Never invent a value that exists in the tokens.

**Not used:** `_ds_bundle.js`, `window.TesseraDesignSystem_992529`, Babel standalone, the unpkg React scripts, `ui_kits/console/`, `uploads/`, `guidelines/`, `thumbnail.html`. Everything is imported as ES modules.

---

## Stack

| Concern | Choice |
|---|---|
| Build | Vite + `@vitejs/plugin-react` |
| Language | TypeScript, `strict: true`, no `any`, `import type` for type-only imports |
| UI | React 19 |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite`, CSS-first config in `src/styles/globals.css` — **no `tailwind.config.js`, no `@tailwind base/components/utilities`** |
| Animation | Framer Motion — the `motion` package, imported from `motion/react` |
| Icons | `lucide-react` (the DS icons are a Lucide copy) — always `strokeWidth={1.5}` unless the source says 2 |

```bash
npm create vite@latest . -- --template react-ts
npm i motion lucide-react
npm i -D tailwindcss @tailwindcss/vite
```

`vite.config.ts`:
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({ plugins: [react(), tailwindcss()] });
```

## Assets

```bash
mkdir -p public/fonts public/pixel
cp "Tessera Design System/fonts/"*.woff2 public/fonts/
cp "Tessera Design System/assets/pixel/"*.png public/pixel/
```

| File | Size | Used in |
|---|---|---|
| `Geist-300/400/500/600.woff2` | — | sans |
| `JetBrainsMono-400/500/600.woff2` | — | mono |
| `Silkscreen-400.woff2` | — | Roman numerals only |
| `pixel/hero-amphitheatre-day.png` | 384×216 | Hero |
| `pixel/hero-amphitheatre-night.png` | 384×216 | Bento background |
| `pixel/cloud.png` | 30×9 | Hero, three instances |
| `pixel/bird-a.png`, `bird-b.png` | 7×4 | Hero flock |

All pixel art is upscaled by CSS with `image-rendering: pixelated` (utility class `.pixelated`). Never smooth, blur or use `object-fit` cropping on it.

---

## File structure

```
index.html
src/
  main.tsx
  App.tsx                       # Header, Hero, Flow, PolicySection, Bento, Footer + Deploy dialog state
  styles/
    globals.css                 # @import "tailwindcss"; fonts; tokens; @theme; base; .pixelated
  lib/
    cn.ts                       # tiny class joiner (no clsx dependency needed)
    motion.ts                   # EASE_OUT, durations, reveal preset
  data/
    content.ts                  # every string, request list, step, panel row, footer column
  types/
    index.ts                    # Verdict, TerminalLine, Step, RequestSample, …
  components/
    ui/                         # 1:1 ports of DS primitives
      Button.tsx  IconButton.tsx  Card.tsx  Badge.tsx  Tag.tsx  NavPill.tsx
      Terminal.tsx  ScoreMeter.tsx  StatTile.tsx  Sparkline.tsx  Ticket.tsx
      Dialog.tsx  Field.tsx  Input.tsx  Select.tsx
    Header.tsx
    Hero.tsx
    Flow.tsx
    PolicySection.tsx
    Bento.tsx
    Footer.tsx
    DeployDialog.tsx
```

---

## Tokens → `src/styles/globals.css`

Copy `tokens/colors.css`, `typography.css`, `spacing.css`, `effects.css` **verbatim** into `globals.css` (including the `.theme-ink` block and the semantic aliases). Rewrite `tokens/fonts.css` with `url('/fonts/…')` paths. Then expose them to Tailwind with `@theme inline` so utilities resolve to the live CSS variables (this is what makes `.theme-ink` re-skin children):

```css
@import "tailwindcss";

/* @font-face × 8 (from tokens/fonts.css, paths → /fonts/) */
/* :root { …colors… …typography… …spacing… …effects… } */
/* .theme-ink { …from colors.css… } */

@theme inline {
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-pixel: var(--font-pixel);

  --color-bone-50: var(--bone-50);   --color-bone-100: var(--bone-100); --color-bone-200: var(--bone-200);
  --color-bone-300: var(--bone-300); --color-bone-400: var(--bone-400); --color-bone-500: var(--bone-500);
  --color-stone-500: var(--stone-500); --color-stone-600: var(--stone-600);
  --color-stone-700: var(--stone-700); --color-stone-800: var(--stone-800);
  --color-ink-900: var(--ink-900); --color-ink-950: var(--ink-950);
  --color-blue-100: var(--blue-100); --color-blue-300: var(--blue-300); --color-blue-500: var(--blue-500);
  --color-blue-600: var(--blue-600); --color-blue-700: var(--blue-700);
  --color-clay-100: var(--clay-100); --color-clay-500: var(--clay-500); --color-clay-600: var(--clay-600);
  --color-verdigris-100: var(--verdigris-100); --color-verdigris-500: var(--verdigris-500); --color-verdigris-600: var(--verdigris-600);
  --color-ochre-100: var(--ochre-100); --color-ochre-500: var(--ochre-500); --color-ochre-600: var(--ochre-600);
  --color-terracotta-400: var(--terracotta-400); --color-terracotta-500: var(--terracotta-500);

  --color-page: var(--surface-page);   --color-sunken: var(--surface-sunken);  --color-card: var(--surface-card);
  --color-strong: var(--text-strong);  --color-body: var(--text-body);
  --color-muted: var(--text-muted);    --color-faint: var(--text-faint);
  --color-accent: var(--accent);       --color-accent-fg: var(--accent-fg);

  --radius-xs: var(--radius-xs); --radius-sm: var(--radius-sm); --radius-md: var(--radius-md);
  --radius-lg: var(--radius-lg); --radius-xl: var(--radius-xl);

  --shadow-1: var(--shadow-1); --shadow-2: var(--shadow-2); --shadow-3: var(--shadow-3);

  --ease-out: var(--ease-out);
}
```

Then paste `tokens/base.css` (body background `--surface-page`, text `--text-body`, Geist 16/1.5, `::selection`, `.pixelated`) under `@layer base`.

Key values (for orientation — copy from the file, don't retype):

| Token | Value | Role |
|---|---|---|
| `--bone-100` | `#F1EBE0` | page background |
| `--bone-50` | `#F7F3EB` | cards, NavPill active |
| `--ink-900` | `#1F1F1F` | headings, terminal, Bento section, secondary button |
| `--stone-800` | `#33302C` | body text |
| `--stone-600` | `#6E655A` | muted text, eyebrows |
| `--blue-500` | `#43A4C4` | primary button fill, accent |
| `--blue-700` | `#226680` | links / check icons on bone |
| `--clay-500` | `#B4492F` | blocked |
| `--verdigris-500` | `#4F7F5E` | passed |
| `--ochre-500` | `#B8862C` | review |
| `--terracotta-500` | `#B26F48` | Roman numerals, Ticket stub |
| `--ease-out` | `cubic-bezier(.22,.8,.24,1)` | all motion |
| `--dur-fast/base/slow/reveal` | 120/220/480/700 ms | |

Primary button text is **ink on blue** (`--accent-fg: var(--ink-900)`), not white.

---

## Primitives (`src/components/ui/`)

Port each DS component 1:1 to a typed TSX component with the **same props and defaults** (read its `.d.ts`). Replace inline `style` objects with Tailwind classes where a class exists; keep arbitrary values (`h-[34px]`, `bg-[rgba(247,243,235,.7)]`) rather than rounding to the nearest Tailwind step. Replace `injectCss` with Tailwind classes (hover/active/focus-visible variants). Replace `<Icon name>` with the matching `lucide-react` component.

Must-keep details:

- **Button** — variants `primary | secondary | outline | ghost | bone | danger`, sizes sm 32px/13px/px-14, md 40/14/18, lg 48/15/24; pill radius; Geist 500; hover per source (`primary → blue-300`, `secondary → stone-700`, `outline` border → strong text colour, `ghost → border-subtle` bg); press `translate-y-px` (no scale); focus `outline-2 outline-blue-500 outline-offset-2`; `iconLeft`/`iconRight` at 15px (16px on lg).
- **Card** — variants `paper | sunken | glass | glass-dark | ink`, default padding 24, radius lg. `glass` = `--surface-glass`, `1px rgba(255,255,255,.5)` border, `shadow-3 + shadow-inset`, `backdrop-blur-[18px] saturate-110`.
- **Badge** — 22px tall, radius-xs, mono 11/500 uppercase, `0.04em`; **6×6 square dot** (never a circle); statuses `blocked | passed | review | jev | neutral` with the bg/fg/dot triplets from `Badge.jsx`.
- **Tag** — 26px, pill, 1px `border-default`, mono 12 (sans when `mono={false}`).
- **NavPill** — 4px padding pill, `rgba(247,243,235,.7)` + 14px blur, 3×3 square separators, 34px items, active item `bone-50` bg + ink text, inactive `stone-700`. Render as `<nav>` with `<button>`s (or `<a href>` for anchors).
- **Terminal** — ink body, `#2c2a28` border, header 38px with three 8×8 `stone-700` squares + title; `<pre>` 13/1.65; line kinds `cmd` (prefixed `$ ` in blue-500), `out`, `comment`, `code`, `pass`, `block`, `jev`, `key`, `warn` with the colours in `Terminal.jsx`; the `hl()` highlighter for `code`/`out` (strings → ochre-100, `key:` → blue-300, numbers → terracotta-400).
- **ScoreMeter** — grid of square tiles, 2px gap, 14px tall; tile colour by position: > threshold → clay, > 0.6×threshold → ochre, else verdigris, unlit bone-300 (dark: `rgba(241,235,224,.1)`); each tile transitions `background` with `i * 12ms` delay.
- **StatTile**, **Sparkline**, **Ticket** (notched mask, terracotta stub, Silkscreen numeral, dashed divider), **Dialog** (ink 32% scrim + 3px blur, card radius lg, 460px), **IconButton**, **Field / Input / Select** — exactly per source.

---

## Page sections

Container everywhere: `max-w-[1200px] mx-auto px-6`. Eyebrow style (reused): mono 11px/500, `tracking-[.08em]`, uppercase, `text-muted`. Section ids for anchors: `#top` (hero), `#how-it-works` (Flow), `#policies`, `#dashboard` (Bento).

All copy below is verbatim. Keep it in `src/data/content.ts`.

### Header — `Header.jsx`
- `sticky top-0 z-20`, `grid grid-cols-[1fr_auto_1fr] items-center px-10 py-4`, background `linear-gradient(var(--bone-100) 60%, rgba(241,235,224,0))`.
- Left: wordmark link `TESSERA` — Geist 500 15px, `tracking-[.18em]`, ink, no underline.
- Centre: NavPill `Product · How it works · Policies · Docs · Pricing`, active state in React state (default `Product`). Product/How it works/Policies scroll to `#top`/`#how-it-works`/`#policies`.
- Right: `Sign in` (ghost, sm), `Deploy` (secondary, sm → opens DeployDialog).
- Below `md`: hide NavPill and Sign in; show an IconButton (lucide `Menu`, 44×44 touch target) that opens a bone sheet with the five items as 44px-tall rows.

### Hero — `Hero.jsx`
- `<section id="top" class="relative overflow-hidden">`.
- Copy block: `relative z-[5] max-w-[980px] mx-auto px-6 pt-[72px] pb-14 text-center`.
  - Eyebrow: `Adaptive security layer · reverse proxy`
  - `<h1>` (the only h1): `Application-specific protection without the runtime overhead.` — Geist 300, 76px/1.04, `-0.035em`, ink-900, `text-balance`.
  - `<p>` max 600px, 19px/1.5, `text-body`, `text-pretty`, mt-6: `Tessera sits between your application and the rest of the world. It writes its policy from your code, checks every request, and asks JEV only when something looks wrong.`
  - Buttons (gap 10, mt-8, centred): `Deploy Tessera` (primary, lg, `ArrowRight` right → opens DeployDialog), `Read the docs` (outline, lg).
- Art block `relative z-[1]`, layers bottom→top:
  1. **glow** — 560×560 circle at `left:50%; top:14%`, `radial-gradient(closest-side, rgba(247,243,235,.95), rgba(247,243,235,0))`, z-0.
  2. **amphitheatre** — `hero-amphitheatre-day.png`, `block w-full pixelated`, `transform-origin: 50% 100%`, z-1.
  3. **clouds** — three `cloud.png`: c2 top 4% w-240 opacity .85 z-2; c1 top 16% w-360 z-2; c3 top 30% w-180 opacity .9 z-3.
  4. **birds** — flex row gap 22 at top 10%, z-3: `bird-a` w-28, `bird-b` w-28 mt-14, `bird-a` w-20 mt-4.
  5. **gate card** — absolute `right-[6%] top-[22%] w-[300px]` z-4, `Card variant="glass" padding={18}`:
     eyebrow `Gate · live` (stone-600) + Badge on the right; request line mono 15px (`method` in stone-600, then path) with margins 14/16; `ScoreMeter tiles={16}` (default label `Maliciousness`, value shown).
     Samples cycle every **2200 ms**: `GET /api/orders` passed 0.03 · `POST /api/login` blocked 0.94 · `PUT /api/avatar` jev 0.58. Badge text is the status, except `jev` → `JEV`.
- Motion — drive with Framer Motion `useScroll()` (`scrollY`, clamp to 1400) plus `useTime()` for drift, combining with `useTransform`. Reproduce these formulas exactly (`y` = clamped scrollY px, `t` = seconds):
  | layer | transform |
  |---|---|
  | amphitheatre | `translateY(y*0.1)`, `scale(1 + y*0.00015)` |
  | cloud c1 | `translateX(-y*0.35 + ((t*6) % 1600) - 200)` |
  | cloud c2 | `translateX(-y*0.2 + ((t*3.5 + 600) % 1800) - 300)`, `translateY(y*0.05)` |
  | cloud c3 | `translateX(-y*0.5 + ((t*9 + 1000) % 1700) - 250)` |
  | birds | `translateX(y*0.9 + ((t*40) % 1800) - 200)`, `translateY(-y*0.25 + sin(t*1.2)*6)` |
  | gate card | `translateY(-y*0.14)` |
  | glow | `opacity: max(0, 0.9 - y/700)` |
  All layers `will-change-transform pointer-events-none` except the card.
- Below `lg`: headline 44px, gate card moves into normal flow under the art (full width, max 360px, centred, no parallax).

### Flow — `Flow.jsx`
- `<section id="how-it-works" class="relative h-[420vh]">` with a sticky child `sticky top-0 h-screen flex items-center`.
- Progress `p` = `useScroll({ target: ref, offset: ['start start', 'end end'] }).scrollYProgress`. Derive `on = clamp(floor(p*4 - 0.0001), 0, 3)` and `local = clamp(p*4 - on, 0, 1)` (via `useMotionValueEvent` into state, or `useTransform`).
- Inner grid `grid-cols-2 gap-16 items-center` in the container.
- **Left:** eyebrow `How it works`; a 300px-tall stack (mt-6) where every step is absolutely positioned and only `on` is visible — use `motion.div` animating `opacity` 1/0 and `y` 0 / −16 (past) / +16 (future) with `duration 0.48, ease EASE_OUT`. Each step:
  - numeral in Silkscreen 56px/1, terracotta-500;
  - `<h2>` mt-6, Geist 300 56px/1.05, `-0.035em`, ink: `{title}.`;
  - `<p>` mt-[18px] max 480px 18px/1.5 body;
  - `Tag` mt-5 with the metric.
  Steps:
  | # | title | body | metric |
  |---|---|---|---|
  | I | Intercept | A transparent reverse proxy receives every HTTP request before your application does. No SDK, no code changes. | Listening on :443 → upstream app.internal:8080 |
  | II | Check | A static-analysis toolchain validates magic bytes, schemas and known injection shapes against the policy for that route. | Median cost 0.4 ms per request |
  | III | Decide | Clean traffic passes straight through. Suspicious requests are routed to JEV, which returns a maliciousness score with context. | About 1% of traffic reaches JEV |
  | IV | Adapt | EWMA-based feedback tracks attacks per endpoint and raises analysis depth where it is needed, then lowers it again. | α 0.3 · window 5 min |
  - Progress bar (mt-2, gap 3px): four 3px bars, track bone-300, fill ink-900; width 100% for done, `local*100%` for current, 0 for future.
- **Right:** card `bg-card border border-[--border-subtle] rounded-lg shadow-2 p-7`.
  - Node strip (pb-[22px], gap 6, wraps): `Request · Proxy · Static analysis · JEV · Your app`. Lit sets per step: `[0,1]`, `[1,2]`, `[2,3,4]`, `[2,3,4]`. Node: `px-[9px] py-[5px] rounded-xs` mono 11px; lit → blue-500 border + blue-100 bg, else `border-default`. Connector 12×1px, blue-500 when both neighbours lit, else `border-strong`. Transitions 220ms ease-out.
  - Panel area `min-h-[250px]` showing panel `on`; small label style = mono 10px/500 `.08em` uppercase `text-faint`; rows separated by `border-t border-subtle`, mono 13px.
    0. `Incoming · last second` — rows (48px | 1fr | auto): `GET /api/orders 10.4.12.88`, `POST /api/login 185.220.101.4`, `GET /api/search?q= 77.88.21.3`, `PUT /api/avatar 91.198.4.17`. Row `i` opacity 1 when `local*4 > i`, else 0.15.
    1. `Checks · POST /api/login` — verdigris `Check` icon (strokeWidth 2), name in sans 14/500 (w-[130px]), detail mono 12 muted: `Schema / email ≤ 254, password ≤ 128`, `Magic bytes / n/a`, `Injection shapes / sqli, xss, path traversal`, `Rate / 12 / min / IP`. Same `local*4 > i` reveal.
    2. `Verdicts` (gap 18) — `GET /api/orders` 0.03 passed `Passed`; `PUT /api/avatar` 0.58 jev `Routed to JEV`; `POST /api/login` `min(0.94, 0.1 + local*0.9)` blocked `Blocked`. Each: path + Badge, then `ScoreMeter label={null} showValue={false} tiles={28}`.
    3. `Analysis depth · EWMA` — rows (110px | 1fr | 40px) mono 12: `/api/login 92`, `/api/search 61`, `/api/avatar 44`, `/api/orders 12`, `/health 2`. Bar 8px, track bone-300, width `v*min(1, local*1.6)%`, colour clay > 70, ochre > 40, else blue-500, transition 480ms; right column rounded percent.
  - Footer row: `Step` / `{on+1} / 4`.
- Below `lg`: drop the 420vh sticky scroller. Render the four steps as a normal vertical list, each step followed by its panel in its own card at full reveal (`local = 1`), each wrapped in the reveal preset.

### PolicySection — `PolicySection.jsx`
- `<section id="policies">` container with `pb-40`, `grid grid-cols-[5fr_1fr_6fr] items-center`.
- **Left:** eyebrow `Policies`; `<h2>` mt-4 Geist 300 48px/1.08 `-0.03em` balance: `Your code already knows what a valid request looks like.`; `<p>` mt-5 mb-2 17px/1.55 body: `Tessera reads your routes, types and environment and writes a policy for each endpoint.`; three rows (grid 24px | 1fr, gap 8, py-3.5, `border-t border-default`), blue-700 `Check` (strokeWidth 2), title sans 15/500 ink, description 14/1.5 muted:
  - `Read from your code` — `Routes, types and environment become per-endpoint rules.`
  - `Reviewed like a diff` — `Policies are plain files in your repository.`
  - `No traffic training` — `Nothing is learned from your users.`
  then (mt-7) `Policy reference` outline button with `ArrowUpRight`.
- **Middle:** empty column.
- **Right:** relative wrapper; offset backplate `absolute inset-[24px_-16px_-16px_24px] bg-bone-200 rounded-xl border border-subtle`; above it tags (gap 8, mb-3, wrap): `src/routes/auth.ts` (mono), `38 routes`, `0.8 ms p95` (sans); then `Terminal title="policy.tessera.yml"` `min-h-[430px]`.
  - Static lines: `cmd tessera policy generate ./src` · `comment # 38 routes · 4 upload handlers · 2 GraphQL operations` · `code route: "POST /api/login"` · `code body:` · `code   email: { type: "email", max: 254 }` · `code   password: { type: "string", max: 128 }` · `code rate: 12` · `comment` (empty) · `cmd tessera tail --route /api/login`.
  - Live lines, revealed one more every **1400 ms**, wrapping back to 1 after all 5:
    `pass ✓ passed   schema ok                    0.02` · `block ✕ dropped  sqli.union  ' OR 1=1 --       0.94` · `pass ✓ passed   schema ok                    0.01` · `jev → jev      anomaly.len  4.2kB password   0.61` · `block ✕ dropped  schema.extra  "role":"admin" 0.88` (keep the internal spacing exactly).
  - Each newly appended line enters with `motion` `opacity 0→1, x −4→0`, 220 ms.
- Below `lg`: single column; backplate hidden.

### Bento — `Bento.jsx`
- `<section id="dashboard" class="theme-ink relative overflow-hidden bg-ink-900">` — `.theme-ink` re-skins all semantic tokens inside.
- Background: `hero-amphitheatre-night.png` `absolute left-0 bottom-0 w-full pixelated opacity-55`.
- Content container `relative pt-32 pb-[200px]`. Eyebrow `Dashboard` in bone-500; `<h2>` mt-4 mb-12 max 640px Geist 300 48px/1.08 `-0.03em` bone-50: `Analysis goes where the attacks are.`
- Grid `grid-cols-6 gap-3`. Glass-dark tiles = `Card variant="glass-dark"`; StatTiles get the same glass (`--surface-glass-dark`, `1px --border-glass`, 18px blur). Mini label = eyebrow in bone-500.
  | cell | span | content |
  |---|---|---|
  | Score card | col 3, row 2 | label `Maliciousness score · JEV`; mt-[22px], gap 18: `POST /api/login`, `GET /api/search?q=`, `PUT /api/avatar`, `GET /api/orders` — each mono 13 bone-100 then `ScoreMeter tone="dark" label={null} showValue={false} tiles={24}` |
  | StatTile | col 3 | `variant="ink"` label `Latency overhead`, value `0.8`, unit `ms p95`, delta `−0.1 vs last week` good, trend `[1.2,1.1,1,1,0.9,0.9,0.8]` |
  | StatTile | col 2 | `variant="ink"` label `Blocked · 24h`, value `1,284`, delta `+12% on /api/login` bad |
  | Mode | col 1, padding 20, column space-between | label `Mode`, Badge `jev` `Enforce+JEV` |
  | Depth | col 4 | header row: `Analysis depth by endpoint` / `EWMA · α 0.3` (bone-300); rows (120px \| 1fr \| 40px) mono 12 bone-300, 8px bar on `rgba(241,235,224,.08)`, same five endpoints and colour rule as Flow panel 3, gap 10, mt-5 |
  | Receipt | col 2, padding 20, centred column gap 12 | label `Last receipt`; `<div class="theme-bone">` wrapping `Ticket numeral="XII" label="gate" title="Request admitted" meta="req_7f3a · 0.6ms"` with `min-w-0 bg-bone-50` |
- Scores start `[0.94, 0.12, 0.61, 0.03]` and random-walk every **1600 ms** by `±0.06` (`(Math.random()-0.5)*0.12`), clamped to `[0.01, 0.99]`.
- Below `lg`: 2 columns, every cell spans 2. Below `md`: 1 column.

### Footer — `Footer.jsx`
- `<footer class="bg-bone-100">`, container `pt-32 pb-12`.
- Top row: flex between, items-end, gap 6, `pb-20 border-b border-default`. `<h2>` max 640px Geist 300 56px/1.04 `-0.035em` ink: `Put a gate in front of your app this afternoon.`; `Deploy Tessera` primary lg + `ArrowRight` → DeployDialog.
- Columns `grid grid-cols-[2fr_repeat(3,1fr)] gap-6 pt-10`:
  - `TESSERA` (Geist 500 14px `.18em`) + mt-2.5 mono 13 muted `© 2026 · Admit one.`
  - `Product`: How it works, Policies, JEV, Pricing
  - `Developers`: Docs, CLI, Changelog, Status
  - `Company`: About, Security, Contact
  Column heading = eyebrow, mb-3.5; links block sans 14px/2 `text-body`, no underline, hover ink.
- Below `md`: CTA row stacks; columns become 2×2.

### DeployDialog — from `index.html`
- `Dialog` title `Deploy Tessera`, description `Point Tessera at your origin. It starts in observe mode and blocks nothing until you switch.`
- Body (flex column gap 14): `Input label="Upstream origin" mono icon=Server placeholder="https://app.internal:8080"`; `Select label="Source" mono options={['github.com/acme/storefront','Upload a directory']}`.
- Actions: `Cancel` (ghost) and `Generate policy` (primary, `ArrowRight`); both close.
- Add what the source lacks: `Escape` closes, focus moves into the dialog on open and returns to the trigger on close, body scroll locked while open, scrim fades in/out via `AnimatePresence` (opacity 0→1, card `y 8→0`, 220 ms).

---

## Motion (`src/lib/motion.ts`)

```ts
export const EASE_OUT = [0.22, 0.8, 0.24, 1] as const;
export const DUR = { fast: 0.12, base: 0.22, slow: 0.48, reveal: 0.7 } as const;

export const reveal = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: DUR.reveal, ease: EASE_OUT },
} as const;
```

- Apply `reveal` to: PolicySection columns, the Bento heading and each Bento cell (stagger 80 ms via `delay: i * 0.08`), the Footer CTA row. Not to the hero copy (visible on load) or the Flow sticky stage.
- Wrap the app in `<MotionConfig reducedMotion="user">`. With `useReducedMotion()` true: no parallax or drift (static art), no interval cycling (hero shows its first sample, terminal shows all live lines, Bento scores fixed), Flow falls back to the stacked list layout. Content must stay fully visible.
- Never animate pixel art with smooth tweening other than position; no bounces, no scale on press, no glows.

---

## Rules

- Square dots and tiles everywhere (Badge, ScoreMeter, Terminal lights, NavPill separators, Ticket). No `rounded-full` on status marks.
- Colours only from the tokens. No Tailwind default palette (`slate-*`, `gray-*`, `white`, `black`, `emerald-*`, `rose-*`), no purple/pink/neon, no decorative gradients (only the header fade, hero glow and Ticket notch mask from the source).
- No emoji. `✓ ✕ →` only inside the Terminal; `·` as separator.
- Sentence case everywhere except mono eyebrows and the `TESSERA` wordmark.
- Accessibility: exactly one `<h1>`; one `<h2>` per section (in Flow only the visible step's h2 is exposed — hide the others with `aria-hidden`); skip link to `#main`; decorative images `alt=""`; `:focus-visible` outline on every interactive element; touch targets ≥ 44px on mobile; text contrast ≥ 4.5:1 (use `--blue-700` for text on bone, never `--blue-500`); the hero gate card region gets `aria-live="polite"`.
- Responsive: no horizontal scroll at 375px. Breakpoints `md` 768 / `lg` 1024; behaviour per section above.

---

## Done when

```bash
npm run build   # tsc + vite build, zero errors
npm run dev     # no console errors or warnings
```

- [ ] Side-by-side with `ui_kits/website/index.html` at 1440×900 the page is visually indistinguishable (fonts, sizes, spacing, colours, art, cards).
- [ ] Every string matches the reference character for character.
- [ ] Header sticky with bone fade; NavPill active state; Deploy opens the dialog from all three buttons.
- [ ] Hero: amphitheatre zoom/parallax, three drifting clouds, bobbing flock, glow fade, gate card cycling every 2.2 s.
- [ ] Flow: 420vh sticky stage, numerals in Silkscreen terracotta, step transitions, progress bars, lit node strip, four panels with per-row reveals.
- [ ] Policy: terminal syntax colours, live tail every 1.4 s, offset backplate.
- [ ] Bento: ink theme, night art at 55%, six cells with correct spans, scores random-walk every 1.6 s, Ticket rendered on bone.
- [ ] Footer CTA and four columns.
- [ ] Reduced motion, keyboard, 375px and accessibility rules above all pass.
- [ ] No `any`, no `tailwind.config.js`, no hardcoded hex outside `globals.css` (except the literal rgba values copied from source components).
