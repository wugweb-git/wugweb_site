# Wugweb Kits — Design System

The Wugweb design system. **Single source of truth for design documentation, component specifications, reusable UI widgets, tokens, and motion triggers.**

- **Interactive Showcase Page**: [`https://wugweb.pages.dev/kits`](https://wugweb.pages.dev/kits) (`src/pages/kits.astro`)

## Contents

| Path | Description |
|---|---|
| [`docs/design.md`](docs/design.md) | Design system overview, sources (S1–S5), decisions, rules, service theme engine |
| [`docs/components.md`](docs/components.md) | Component library — token consumption, structure, props & accessibility for core pages and components |
| [`docs/widgets.md`](docs/widgets.md) | **Reusable UI Widgets & Building Blocks** — 6-pillar selectors, radio chips, glass panels, device backdrops, ToC, sticky share, SLA badges |
| [`docs/motion.md`](docs/motion.md) | **Motion & Animation System** — GSAP scroll triggers (`[data-reveal]`, `[data-scroll]`), dynamic pillar color engine, spring easings, interaction states |
| [`docs/tokens/`](docs/tokens/) | **Complete Token Reference** — every token + value from `src/styles/global.css` (colors, typography, spacing, sizing, radius, borders, opacity, shadows, blur, elevation, gradients, glass, noise, motion, transitions, z-index, icons, layout, breakpoints, interaction, accessibility, service-colors) |
| [`docs/tokens/tokens.md`](docs/tokens/tokens.md) | Token index & rules |

## Sources

- **Implemented tokens**: `src/styles/global.css` `:root` (source of truth)
- **Animation engine**: `src/lib/scroll-animations.ts` (GSAP scroll triggers & observers)
- **Spec / rationale**: [`design.md`](design.md) → `docs/design.md`
- **Brand assets**: `assets/brand/` (SVG logos, favicons, references) → `public/brand/`
- **Interactive laboratory**: `src/pages/kits.astro` (`/kits`)

## Core Rules

1. **Always use tokens** — never hardcode color, typography, spacing, radius, opacity, shadow, blur, or z-index values.
2. **Breakpoints:** use literal pixel values in `@media` (custom properties in tokens are documentation-only).
3. **Buttons** = `--radius-sm` (8px) · **chips/tags/pills** = `--radius-full` (9999px).
4. **Yellow is a brand accent**, never a primary UI surface (≤10% per page). Primary interface stays grey / ash / dark surfaces.
5. **Secondary Colors:** Peach (`#E54F30`), Green (`#3ED219`), Blue (`#2368D7`), Aqua (`#09E2C0`).
6. **Animations go through GSAP** (`src/lib/scroll-animations.ts`) — `[data-reveal]` / `[data-scroll]` / `data-reveal-delay`. No `motion` library imports.
7. **Mobile-first** — design and build for mobile viewports, enhance up.
