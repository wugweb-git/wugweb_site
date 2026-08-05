# Wugweb Kits — Design System

The Wugweb design system. **Single source of truth for design documentation.**

## Contents

| Path | Description |
|---|---|
| [`docs/design.md`](docs/design.md) | Design system overview, sources (S1–S5), decisions, conflicts, yellow-usage rule |
| [`docs/components.md`](docs/components.md) | Component library — each component's token usage |
| [`docs/tokens/`](docs/tokens/) | **Complete token reference** — every token + value from `src/styles/global.css` (colors, typography, spacing, sizing, radius, borders, opacity, shadows, blur, elevation, gradients, glass, noise, motion, transitions, z-index, icons, layout, breakpoints, interaction, accessibility, service-colors) |
| [`docs/tokens/tokens.md`](docs/tokens/tokens.md) | Token index + rules |

## Sources

- **Implemented tokens**: `src/styles/global.css` `:root` (source of truth)
- **Spec / rationale**: [`design.md`](../design.md) (slim pointer) → `docs/design.md`
- **Brand assets**: `assets/brand/` (SVG logos, favicons, references) → `public/brand/`

## Rules

1. Always use tokens — never hardcode color/font/spacing/radius/opacity/shadow/blur/z-index values.
2. Breakpoints: use literal pixel values in `@media` (tokens are documentation-only).
3. Buttons = `--radius-sm` (8px) · chips/tags/pills = `--radius-full`.
4. Yellow is a brand accent, never a primary UI surface (≤10% per page).
5. Animations go through GSAP (`src/lib/scroll-animations.ts`) — `[data-reveal]` / `[data-scroll]`.
