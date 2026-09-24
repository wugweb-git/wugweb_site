# Prompt — Glass Showcase for `/services/brand` "What we can do"

Paste everything below the line into Claude Code, from the repo root.

---

/design-taste-frontend

Rebuild the **"What we can do"** section on `/services/brand` as an expanding glass showcase, in the spirit of Framer's "Glass Showcase" component (expand-on-hover cards, glassmorphic surfaces, a background that blurs and crossfades to match the active card). Build it natively — do **not** install a component, a React library, or Framer Motion.

## Read first

- `CLAUDE.md` — architecture, the "Things AI Must Never Change" list, Rule 1 (free tier) and Rule 2 (R2).
- `kits_design_system/docs/design.md` and `kits_design_system/docs/tokens/` — the design system is the single source of truth.
- `src/styles/global.css` — all tokens live here.
- `src/pages/services/[slug].astro` — the file you're editing.
- `pending.md` §1g (frontend audit, 2026-09-04) — **read the P0 and P1 findings before you write CSS.** This site currently has a 1.31 s TTFB and ships 9.85 MB of autoplay video on the homepage. Do not make it worse.

## Exactly what to replace

`src/pages/services/[slug].astro`, the `capabilities-section` block (currently lines 138–151):

```astro
<section class="wrap capabilities-section">
  <p class="eyebrow" data-reveal>What we can do</p>
  <div class="caps-grouped">
    {(safeArr(service.capabilities, [])).map((c) => (
      <div class="glass-panel cap-group" data-reveal>
        ...
```

It currently renders 3 static glass cards (Strategy / Identity / Activation), each holding a bulleted list. Replace it with a showcase of the **10 individual sub-services** as its own interactive cards.

This is a **shared dynamic route** — `[slug].astro` renders all six pillars. Whatever you build must work for every pillar and degrade cleanly when a pillar has no media. Do not special-case `brand` with an `if`.

## The 10 sub-services (live content, verified)

| # | Group | Sub-service | Media in `public/assets/services/brand/` |
|---|---|---|---|
| 01 | Strategy | Brand Strategy | `Brand Position Strategy.mp4` (0.22 MB) |
| 02 | Strategy | Brand Positioning | `Brand Experience.mp4` (0.69 MB) |
| 03 | Strategy | Brand Narrative | `Narrative Architecture.mp4` (1.05 MB) |
| 04 | Identity | Brand Identity Systems | `Brand Identity Systems.mp4` (1.34 MB) |
| 05 | Identity | Naming & Nomenclature | `Naming Nomenclature.mp4` (1.68 MB) |
| 06 | Identity | Messaging Framework | **none — needs fallback** |
| 07 | Identity | Voice & Tone | `Voice Tone.mp4` (1.52 MB) |
| 08 | Activation | Employer Branding | `Brand Audit Analysis.mp4` (0.81 MB) |
| 09 | Activation | Brand Guidelines | `Brand Evolution Management.mp4` (2.12 MB) |
| 10 | Activation | Brand Activation | `Brand activation.mp4` (2.03 MB) |

Nine videos exist, ten items. Rows 08 and 09 are **loose matches I assigned** — flag them to me rather than pretending they're right, and give item 06 a graceful media-less state (gradient + noise + the group's number, no broken `<video>` — the existing work grid already does this; match that pattern).

Source the items from Sanity where possible: flatten `service.capabilities[].items` into a single list and keep `c.n` + `c.title` as the group label. Filenames contain spaces — `encodeURI()` them, and route every media URL through `assetUrl()` from `src/lib/assets.ts` (the homepage currently bypasses R2 by hardcoding `/assets/...`; don't repeat that).

## Layout decision I want you to take

Ten cards in a single expand-on-hover strip gives ~100 px collapsed slivers on a 1440 px viewport — unusable. Build **two rows of five**, each row an independent expanding strip. If you have a better idea after looking at the page, say so before you build it.

- Desktop (≥1024 px): 2 rows × 5, active card grows via `grid-template-columns` transition, siblings shrink.
- Tablet (768–1023 px): 2 rows × 3 + 2 rows × 2, or a horizontal scroll-snap strip.
- Mobile (<768 px): no hover model at all — a vertical stack or scroll-snap carousel with the first card open.

## Hard constraints

**Performance — this is the part that matters most.**
- Poster-first. Render a `<video>` with `preload="none"`, a `poster`, and **no `autoplay`**. `autoplay` silently overrides `preload="none"` and is why the homepage ships 9.85 MB — do not reintroduce it here. Call `.play()` on hover/focus/expand, `.pause()` on leave.
- No poster frames exist yet. Generate them with ffmpeg into `public/assets/services/brand/posters/*.webp` (≤40 KB each, first frame, 2× the collapsed card width). If ffmpeg isn't available, say so and use a `--theme-base` gradient placeholder instead of shipping video-on-load.
- `backdrop-filter` is the single most expensive thing on a mobile GPU. Use it on the cards, but the crossfading background layer must be a **pre-blurred poster image** with `opacity` crossfade — not a live `filter: blur()` on a playing video. Animate `opacity` and `transform` only; never animate `filter`, `backdrop-filter`, `width`, or `box-shadow`.
- Total net JS added: under 3 KB. GSAP + ScrollTrigger are already bundled (`src/lib/scroll-animations.ts`) — use them or plain CSS transitions. **Do not add a dependency.** No React: there are zero React components in `src/` today and the 141 KB React bundle is already dead weight.

**Tokens only.** No hardcoded colour, spacing, radius, opacity, blur, shadow, or z-index. Use:
- Pillar colour: `var(--theme-base)` — already injected on `.service-page-wrapper` (brand resolves to `--svc-brand: #E6309F`).
- Glass: `var(--glass-medium)`, `var(--neutral-8)`, `color-mix(in srgb, ... , transparent)` — match the existing `.glass-panel` rule at line ~408 of the same file.
- Radius `--radius-lg` / `--radius-2xl`, spacing `--gap-*`, text `--t-*` / `--fluid-*`, noise `--noise-light`.
- Motion: `--duration-normal` / `--duration-slow` with `--easing-editorial` (`cubic-bezier(0.16, 1, 0.3, 1)`) or `--easing-smooth`.

**Do not use `--neutral-1` as a background.** It is `#F4F4F4` and so is `--fg` — that pairing is a live 1:1-contrast bug on this site (see audit finding 1). If you need a light surface, define a proper token pair.

**Accessibility.**
- Hover is not the only way in. Cards must be reachable and expandable by keyboard (`Tab` + `Enter`/`Space`), with a visible `:focus-visible` ring — the site has only three focus-visible rules total, so add a real one.
- On touch, first tap expands, second tap follows the link. No hover-only content.
- `prefers-reduced-motion: reduce` → no crossfade, no scale, no video autoplay; show all ten cards in a static grid.
- Videos are decorative: `aria-hidden="true"`, `muted`, `playsinline`. Titles stay real text in the DOM, never inside a canvas or a background image.
- Keep exactly one `<h2>`/`<h3>` level per the current heading order.

**No-JS.** `[data-reveal] { opacity: 0 }` is global. If you use it, make sure the section is not blank without JS — the audit's finding 2 covers this.

**Free tier.** Rule 1 and Rule 2 in `CLAUDE.md`. No new services, no paid plans, no new R2 buckets, no new key prefixes.

## Deliverables

1. The rewritten `capabilities-section` markup + scoped `<style>` + minimal `<script>` in `src/pages/services/[slug].astro`.
2. The ffmpeg command you used to generate posters, and the posters committed under `public/assets/services/brand/posters/`.
3. `npm install` first (`wrangler` is in `devDependencies` but missing from `node_modules`), then `npm run build` must pass with 0 errors.
4. Before/after numbers for the section: bytes transferred on load, and bytes on full interaction.
5. A one-paragraph note on the two media mappings I guessed wrong (items 08, 09) and what item 06 should get.

## Out of scope

Don't touch: `wrangler.jsonc`, `.node-version`, the Sanity schema, the live colour values in `global.css`, or any other page. Don't run the Neon sync. Don't rotate any token.
