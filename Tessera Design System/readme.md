# Tessera Design System

Tessera is an adaptive security layer that sits between a web application and the rest of the world. It runs as a transparent reverse proxy, checks every request with a static-analysis toolchain (injection shapes, schema violations, magic-byte validation), and routes only suspicious requests to **JEV**, its AI decision layer, which returns a maliciousness score. EWMA-based feedback raises analysis depth on endpoints under attack and lowers it again afterwards. Policies are generated from the application's own code and environment.

The name: a *tessera* was the Roman entry token — a clay or bone shard stamped with a row number, exchanged for a seat at the theatre or a grain ration. The same word means a single mosaic tile. Both readings drive the visual system: **the ticket** (admission, receipts, gates) and **the tile** (square dots, segmented meters).

## Sources
- `uploads/design.md` — brief / spec (product context, palette, section structure for the landing page).
- `uploads/inspiration 2.jpg` — "Aethera" landing: centred thin headline, capsule nav with dot separators, single white pill CTA, grainy dark photo. Used for layout and nav pattern only.
- `uploads/inspiration_figma_1.avif` — "Serendale" landing: centred hero, outlined pill buttons. Layout reference only; its purple/magenta gradients are explicitly rejected.
- User notes: Roman pixel art for the hero; smooth and minimal; **bone instead of white**; no AI-slop colours.
- No codebase, Figma file, logo or product screenshots were provided.

### Deviations from `design.md` (intentional, per user notes)
- Base is **bone** (`#F1EBE0`) not `#1f1f1f`. `#1f1f1f` is kept as **ink** for text, terminals, toasts and full-bleed dark sections (`.theme-ink`).
- `#F43F5E` / `#10B981` (Tailwind rose/emerald) replaced by earth pigments: **clay** `#B4492F` (blocked), **verdigris** `#4F7F5E` (passed), plus **ochre** `#B8862C` (review).
- Typeface: Geist (not Inter), JetBrains Mono as specified, plus Silkscreen as a tiny pixel accent.

## Index
- `styles.css` — entry; `@import`s only.
- `tokens/` — `fonts.css`, `colors.css` (+ `.theme-ink`, `.theme-bone` scopes), `typography.css`, `spacing.css`, `effects.css` (radii, shadows, blur, motion), `base.css`.
- `fonts/` — Geist, JetBrains Mono, Silkscreen (woff2, latin).
- `assets/pixel/` — `hero-amphitheatre-day.png`, `hero-amphitheatre-night.png` (384×216 + `-4x`), `tessera-token.png`, `column.png` (+ upscales).
- `assets/icons/` — Lucide SVG subset (46 icons).
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand).
- `components/` — React primitives (below).
- `ui_kits/website/` — marketing landing. `ui_kits/console/` — operator console.
- `thumbnail.html`, `SKILL.md`.

## Components
`window.TesseraDesignSystem_992529.<Name>`
- **core/** — Icon, Button, IconButton, Badge, Tag, Card
- **forms/** — Field, Input, Select, Checkbox, Radio, Switch
- **navigation/** — Tabs, NavPill
- **feedback/** — Dialog, Toast, Tooltip
- **data/** — Terminal, Sparkline, StatTile, ScoreMeter, Ticket

No source component inventory existed, so this is a standard set sized to the product. Domain additions: Terminal (policy/payload display required by the brief), StatTile/Sparkline/ScoreMeter (dashboard widgets from the brief), Ticket (the tessera brand motif), NavPill (header pattern from inspiration 2), Field (shared label wrapper).

## UI kits
- **Website** (`ui_kits/website/index.html`) — Header, Hero, Flow (I–IV), PolicySection, Bento, Footer. Built from brief sections A–D.
- **Console** (`ui_kits/console/index.html`) — Login, Overview, Traffic + detail, Policies. Original design (no product UI supplied).

---

## CONTENT FUNDAMENTALS
- **Voice:** plain, technical, calm. Say what happens to a request. No hype words ("revolutionary", "next-gen", "AI-powered"), no fear-selling.
- **Person:** "you / your app" for the reader; "Tessera" (not "we") as the subject of product sentences. "Tessera writes its policy from your code."
- **Casing:** sentence case for headings, buttons and nav ("Deploy Tessera", "Read the docs"). UPPERCASE only for mono eyebrow labels (`HOW IT WORKS`, `BLOCKED · 24H`).
- **Length:** headlines one sentence, ending with a full stop ("How a request gets in."). Body paragraphs 1–3 sentences.
- **Numbers:** concrete, with units in mono: `0.8 ms p95`, `score 0.94`, `rate 12/min`. Don't round away precision; don't invent vanity stats.
- **Roman flavour:** light touch only — numerals I–IV for steps, "gate", "admitted", "Admit one." in the footer. Never pastiche Latin in body copy.
- **Verdict vocabulary:** passed · blocked/dropped · review · JEV. "Entry refused", "Held at the gate", "Request admitted" on Tickets.
- **Emoji:** never. Unicode glyphs only inside terminals (`✓ ✕ →`) and `·` as a separator.
- Examples: "Application-specific protection without the runtime overhead." · "Your code already knows what a valid request looks like." · "Analysis goes where the attacks are." · "Put a gate in front of your app this afternoon."

## VISUAL FOUNDATIONS
- **Colour vibe:** stone and paper. Bone surfaces (`--bone-50/100/200`), warm stone greys for text, ink `#1F1F1F` for the dark. One accent: Tessera blue `#43A4C4` — fills and data streams; `--blue-700` for text/links on bone (contrast). Verdicts use fired earth pigments (clay, verdigris, ochre). Terracotta is reserved for the tessera token/ticket stub. No gradients as decoration, no purple, no neon.
- **Type:** Geist Light 300 for display (64–88px, −0.035em, lh 1.04), Geist 400 for headings, 16/1.5 body. JetBrains Mono for code, data, numbers-with-units and uppercase eyebrows (11px, +0.08em). Silkscreen pixel font only for Roman numerals and ≤3-word stamps.
- **Wordmark:** no logo was supplied. The name is set as `TESSERA` in Geist 500, +0.18em tracking. Do not draw a mark.
- **Imagery:** Roman pixel art — the dithered amphitheatre with a glowing blue gateway and data grid on the ground. Always rendered `image-rendering: pixelated`, never smoothed or blurred. Day version on bone, night version in ink sections. Its sky colour equals `--bone-100`, so it bleeds into the page with no frame. No photos, no 3D renders, no stock.
- **Backgrounds:** flat bone. Full-bleed only for the pixel art and ink sections. No textures beyond the art's own Bayer dithering.
- **Mosaic motif:** status dots are **squares**, never circles. ScoreMeter is a row of square tiles with 2px grout. Terminal window "traffic lights" are three square stone tiles.
- **Spacing:** 4px base (`--space-*`). Sections 128px apart; 1200 container; 12-col grid, 24 gutter. Split layouts leave one empty column between copy and visual (5 / 1 / 6).
- **Corner radii:** xs 3 (badges), sm 6 (inputs), md 10 (toasts, small cards), lg 16 (cards, terminals, dialogs), pill for buttons/nav/tags. Square for tiles and dots.
- **Cards:** paper = `--bone-50` + 1px `rgba(31,31,31,.08)` hairline + `--shadow-1`. No coloured left borders, no heavy drop shadows.
- **Borders:** hairlines first (`--border-subtle/default/strong` are ink at 8/14/28%). Dividers between list rows instead of boxed rows.
- **Shadows:** warm, low, negative-spread (`--shadow-1/2/3`). `--shadow-3` only for dialogs, toasts, floating glass and terminals.
- **Transparency & blur:** only for glass over pixel art (`--surface-glass` bone 72% / `--surface-glass-dark` ink 70%, 18px blur, white/bone hairline) and the floating NavPill. Dialog scrim ink 32% + 3px blur. Never blur plain bone.
- **Hover:** buttons shift one step on their ramp (primary → blue-300, secondary ink → stone-700, outline border → ink). Rows hover to `--bone-200`. Links go ink. No glows.
- **Press:** `translateY(1px)`; no scale.
- **Focus:** 2px `--blue-500` outline, 2px offset; inputs get a 3px blue 22% ring.
- **Motion:** `--ease-out` (.22,.8,.24,1), 120/220/480ms. Scroll reveals: fade-up 12px, 700ms, 80ms stagger. ScoreMeter tiles fill left→right, 12ms stagger. Anything pixel-art animates with `steps()` (no tweening pixels). No bounces, no parallax beyond a slow 40s pan on hero art if used.
- **Layout:** sticky header with bone fade; centred hero; long scroll. Console: 232px sidebar, 64px topbar, right detail panel 380px.

## ICONOGRAPHY
- **Set:** Lucide (ISC), outline, **1.5px stroke**, round caps, `currentColor`. 46 icons copied as SVG into `assets/icons/` and inlined into `components/core/icons.js`; use `<Icon name="…">`. Substitution flag: no icon set was supplied — Lucide was chosen as the closest neutral line set.
- Sizes: 16 default, 14/15 inside small controls, 18 in toasts.
- Icons are functional only (nav, actions, verdict in Toast). No decorative icon grids or icon-in-circle feature cards.
- **Pixel ornaments** (`assets/pixel/`) are illustrations, not icons — use the token and column as section ornaments at integer scales (×4, ×6, ×8).
- No emoji. Unicode `✓ ✕ →` only inside Terminal output; `·` as separator.
