# Tokens — Index

> **Source of truth:** `src/styles/global.css` `:root`. Tokens are the only way to
> style — never hardcode values. This directory mirrors every token and value.

## Token Categories

| Category | File | Key tokens |
|---|---|---|
| Colors | [colors.md](colors.md) | `--neutral-*`, `--color-*`, `--hero-overlay*`, yellow rule |
| Typography | [typography.md](typography.md) | `--ts-*`, `--fluid-*`, `--t-*`, `--core-line-height-*`, `--lh-*`, weights |
| Spacing | [spacing.md](spacing.md) | `--s-*`, `--p-*`, `--gap-*`, `--space-section-*`, `--space-page-*` |
| Sizing | [sizing.md](sizing.md) | Component sizes, icon sizes |
| Radius | [radius.md](radius.md) | `--r-*`, `--radius-*` (buttons = `--radius-sm`, chips = `--radius-full`) |
| Borders | [borders.md](borders.md) | `--stroke-*`, `--line`, `--line-strong`, border colors |
| Opacity | [opacity.md](opacity.md) | `--opacity-*` scale + semantic |
| Shadows | [shadows.md](shadows.md) | `--shadow-*` scale + glows |
| Blur | [blur.md](blur.md) | `--blur-*` scale |
| Elevation | [elevation.md](elevation.md) | `--elevation-0..5`, `--layer-*`, `--z-*` |
| Gradients | [gradients.md](gradients.md) | `--gradient-*` per service + brand |
| Glass | [glass.md](glass.md) | `--glass-*` (blur + tint + border combos) |
| Noise | [noise.md](noise.md) | `--noise-*` SVG grain data-URIs |
| Motion | [motion.md](motion.md) | `--duration-*`, `--easing-*`, GSAP system, hover/focus/selection/cursor |
| Transitions | [transitions.md](transitions.md) | `--transition-page`, `--transition-overlay` |
| Z-index | [z-index.md](z-index.md) | `--z-*`, `--layer-*` |
| Icons | [icons.md](icons.md) | Brand assets, 89 toolkit icons |
| Layout | [layout.md](layout.md) | `.wrap` 1280, `.page` 1440, `.grid`, gutters |
| Breakpoints | [breakpoints.md](breakpoints.md) | Documentation-only — use literals in `@media` |
| Interaction | [interaction.md](interaction.md) | Hover, focus, selection, cursor presets |
| Accessibility | [accessibility.md](accessibility.md) | Focus rings, reduced-motion, contrast, touch targets |
| Service colors | [service-colors.md](service-colors.md) | `--svc-*` final user-confirmed mapping + panel order |

## Rules

1. Always use tokens — never hardcode color/font/spacing/radius/opacity/shadow/blur/z-index.
2. Breakpoints: use literal pixel values in `@media` (tokens are documentation-only).
3. Buttons = `--radius-sm` · chips/tags/pills = `--radius-full`.
4. Yellow = brand accent ≤10% per page; interface stays grey/ash/black.
5. Animations go through GSAP (`src/lib/scroll-animations.ts`).
