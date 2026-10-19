# Components — Wugweb Design System

Reusable UI components used across the site. Import from `src/components/`.

## Layout Components

| Component | File | Props | Used On |
|---|---|---|---|
| **BaseLayout** | `layouts/BaseLayout.astro` | `{ title, description, seoTitle? }` | Every page (wraps head/nav/footer) |
| **SiteHeader** | `components/SiteHeader.astro` | `{ companyEmail? }` | BaseLayout — nav, WhatsApp CTA, mobile menu |
| **SiteFooter** | `components/SiteFooter.astro` | `{ copyright?, companyEmail? }` | BaseLayout |

## Global Sections (rendered in BaseLayout)

These appear on every page after the page content:
- Global Partners (`section.global-partners`)
- Sectors showcase (`SectorShowcase.astro`, `section.sectors-section`)
- Global Blog Teaser (`section.global-blog-teaser`)
- Final CTA (`section.global-final-cta`)
- Footer

## Design Tokens (in `src/styles/global.css`)

Full token reference: `kits_design_system/docs/tokens/` (colors, typography, spacing,
radius, borders, opacity, shadows, blur, elevation, gradients, glass, noise, motion,
transitions, z-index, icons, layout, breakpoints, interaction, accessibility,
service-colors).

| Category | Prefix | Example |
|---|---|---|
| Font weight | `--font-weight-*` | `--font-weight-regular: 400` |
| Line height | `--core-line-height-*` | `--core-line-height-normal: 1.5` |
| Type scale | `--t-*` | `--t-display`, `--t-h2`, `--t-body` |
| Radius | `--r-*` / `--radius-*` | `--radius-sm: 8px`, `--radius-full: 9999px` |
| Spacing | `--s-*` / `--p-*` / `--gap-*` | `--gap-4: 16px`, `--s-12: 48px` |
| Section spacing | `--space-section-*` | `--space-section-xl: 80px` |
| Opacity | `--opacity-*` | `--opacity-soft: .7`, `--opacity-overlay: .7` |
| Shadows | `--shadow-*` | `--shadow-md: 0 8px 24px rgba(0,0,0,.12)` |
| Blur / glass | `--blur-*` / `--glass-*` | `--blur-xl: 40px`, `--glass-medium` |
| Breakpoints | `--breakpoint-*` | docs only — use literal `@media` values |
| Motion | `--duration-*` / `--easing-*` | `--duration-normal: 300ms` |
| Semantic colour | `--color-*` / `--neutral-*` | `--neutral-1: #F4F4F4` |
| Service colours | `--svc-*` | `--svc-strategy: #FA4108` |

## Rules

1. Always use tokens — never hardcode color/font/spacing/radius/opacity/shadow/blur.
2. Buttons = `--radius-sm` (8px) · chips/tags/pills = `--radius-full`.
3. Yellow (`--color-yellow`) is a brand accent, never a primary UI surface (≤10%/page).
4. Animations go through GSAP (`src/lib/scroll-animations.ts`) — `[data-reveal]` /
   `[data-scroll]` / `data-reveal-delay`. No `motion` imports.

## Adding a new component

1. Create in `src/components/` with `.astro` extension
2. Define `interface Props` for type safety
3. Use design tokens (`var(--gap-*)`, `var(--radius-*)`, `var(--duration-*)`)
4. Add to this table
5. Import and use inline without wrapping Astro fragment
