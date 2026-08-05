# Wugweb Kits — Component Library

> Map of the site's components (`src/components/` + `src/pages/`) to their
> design-system tokens. Each component lists the tokens it consumes.

## Core Components

### `SiteHeader` — `src/components/SiteHeader.astro`
- Nav bar: `--neutral-7` bg, `--glass-medium` backdrop blur, `--shadow-nav`
- **Logo**: `public/brand/logo-large.svg` (white "wug" + grey "web" baked in)
- **WhatsApp CTA** (Let's Talk): `--color-yellow` bg, `--color-ash` text, `--radius-sm`, `wa-icon` 16px
- Nav links: `--neutral-6` bg, hover/active `--color-surface-hover`, `--radius-sm`
- Mobile panel: `max-height: 100dvh` + single `overflow-y: auto` (no nested scroll), `--breakpoint-md` for hamburger
- Typography: `--t-micro` labels, `--font-weight-medium` nav links

### `SiteFooter` — `src/components/SiteFooter.astro`
- Border top: `--line` / `--color-border-subtle`
- Link labels: `--fluid-label`, `--fg-muted`
- Section spacing: `--space-section-*`

## Page Blocks (from `src/pages/`)

| Block | File | Tokens |
|---|---|---|
| Hero | `index.astro` | `--fluid-display` headline, `--hero-overlay` gradient, `--space-section-xl` |
| Service cards | `index.astro` | `--neutral-1` bg, `--radius-lg`, `--gap-*`, hover `--surface-2`, `--opacity-*` toggles |
| Pillars glass | `index.astro` | `--glass-medium`, `--radius-2xl`, `--shadow-xl`, `--blur-extreme` backdrop, `--svc-*` order |
| Work grid | `work/index.astro` | `--radius-sm` media, placeholder gradient `--color-surface-elevated → page`, `color-mix(yellow)` |
| Blog grid | `blog/index.astro` | `--radius-sm` thumbs, `--radius-full` chips, `color-mix` placeholder, `--opacity-*` |
| Services panels | `services/index.astro` | `--svc-*` per panel, `--radius-2xl`, `--shadow-xl`, `--opacity-*` tabs, `.svc-sub` |
| Stats | `about.astro` | `--font-weight-bold` numbers, `--t-h2`, `--hero-overlay` |
| Bento | `about.astro` | `--radius-lg`, `--gap-*`, `logo-large.svg` CTA, `--opacity-soft` |
| Legal | `privacy-policy.astro` | `--t-h4` headings, `--core-line-height-relaxed` |

## Global Layout (`src/layouts/BaseLayout.astro`)
- Partners / Industries / Blog teaser / Final CTA sections
- Industries chips: `--t-sm`, `--radius-full`, `--line` border
- Blog teaser thumbnails: 16/10 `--radius-sm`
- Final CTA: **ash** (`--color-surface-elevated`) band, yellow button (accent rule), `--radius-sm`

## Design Principles
- **Type hierarchy**: Display 800 / H1 700 / H2–H4 600 / labels 500 / body 400
- **Spacing**: `--gap-*` scale + `--space-section-*` for sections
- **Surfaces**: `#050505` page / `#191919` elevated / `#2B2B2B` borders / `#555` hover
- **Accent**: yellow `#FFBE1A` **≤10%** (small surfaces only); service colors `--svc-*`
- **Radius**: buttons `--radius-sm`, chips `--radius-full`, cards `--radius-lg`
- **Motion**: GSAP `[data-reveal]` / `[data-scroll]` + `--duration-*` / `--easing-*` tokens
