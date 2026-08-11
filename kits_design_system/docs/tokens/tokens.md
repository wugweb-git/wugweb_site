# Tokens — Index

> **Source of truth:** `src/styles/global.css` `:root`. Tokens are the only way to style — never hardcode values. This directory mirrors every token and value.

---

## Token Categories & References

| Category | Documentation File | Key Tokens & Scope |
|---|---|---|
| **Colors** | [colors.md](colors.md) | `--neutral-*` (0..10 scale), `--color-*` (surface, text, border, feedback), yellow rule |
| **Service Colors** | [service-colors.md](service-colors.md) | `--svc-*` (Strategy, Engineering, Brand, Growth, Operations, Experience base, dark & light variants) |
| **Typography** | [typography.md](typography.md) | Weights (400, 500, 600, 700, 800), `--ts-*` static scale, `--fluid-*` responsive clamp scale |
| **Spacing** | [spacing.md](spacing.md) | Ramp `--s-*`, `--p-*`, `--gap-*` (0..12), `--space-section-*` (xs..xl), `--space-page-*` |
| **Sizing** | [sizing.md](sizing.md) | `--nav-height`, `--control-size`, `--pillar-thumb`, `--bento-min`, `--culture-visual` |
| **Radius** | [radius.md](radius.md) | Scale `--r-*` (0..8, full), `--radius-*` (buttons = `--radius-sm`, chips = `--radius-full`) |
| **Borders & Strokes** | [borders.md](borders.md) | Stroke width `--stroke-*` (hairline..heavy), `--line`, `--line-strong`, border colors |
| **Opacity** | [opacity.md](opacity.md) | Ramp `--opacity-0..100`, semantic `--opacity-overlay`, `--opacity-disabled`, `--opacity-hover` |
| **Shadows** | [shadows.md](shadows.md) | Scale `--shadow-xs..2xl`, glows `--shadow-glow-*`, `--shadow-nav`, `--shadow-inner` |
| **Blur** | [blur.md](blur.md) | Scale `--blur-xs..extreme` (4px to 100px), backdrop filter scale |
| **Elevation & Layers** | [elevation.md](elevation.md) & [z-index.md](z-index.md) | `--elevation-0..5`, layer order `--layer-background..cursor` (0 to 9999) |
| **Gradients** | [gradients.md](gradients.md) | Brand `--gradient-brand`, per-service pillar linear gradients `--gradient-*` |
| **Glass** | [glass.md](glass.md) | Combos `--glass-light..dark` (blur + saturate backdrop filter effects) |
| **Noise** | [noise.md](noise.md) | Texture `--noise-light..heavy`, `--noise-editorial` SVG grain data-URIs |
| **Motion & Easings** | [motion.md](motion.md) & [transitions.md](transitions.md) | Durations `--duration-*`, easings `--easing-*` (smooth, editorial, spring), GSAP triggers |
| **Interaction** | [interaction.md](interaction.md) | Hover presets (`--hover-button`, `--hover-card`), focus ring (`--focus-primary`), selection, cursor |
| **Breakpoints** | [breakpoints.md](breakpoints.md) | Documentation constants (`--breakpoint-xs..2xl`) — use pixel literals in `@media` |
| **Accessibility** | [accessibility.md](accessibility.md) | Contrast compliance, reduced motion overrides, focus indicators, minimum touch targets |
| **Icons & Assets** | [icons.md](icons.md) | Brand lockups, 89 official service toolkit brand/tech SVG icons |

---

## Mandated Token Rules

1. **Always Use Tokens**: Never hardcode hex values, pixel font sizes, or rem paddings in new CSS.
2. **Breakpoints in Media Queries**: Custom CSS properties cannot be used in `@media` queries; use literal pixel constants (`768px`, `1024px`, `1280px`).
3. **Radius Consistency**: Buttons = `--radius-sm` (8px), Chips = `--radius-full` (9999px), Cards = `--radius-lg` (16px), Hero panels = `--radius-2xl` (24px).
4. **Yellow Capping**: Yellow (`--color-yellow`) is reserved for primary CTAs and active focus indicators (≤10% per page).
5. **GSAP Motion Engine**: Animations run through GSAP (`src/lib/scroll-animations.ts`) using `[data-reveal]` and `[data-scroll]` attributes.
