# Wugweb Kits — Component Library

> Map of the site's components (`src/components/` + `src/pages/`) to their
> design-system tokens. Each component lists the tokens it consumes.

## Core Components

### `SiteHeader` — `src/components/SiteHeader.astro`
- Nav bar: `--neutral-1` / `--color-ash` bg, `--gap-*` spacing
- **Yellow CTA** (Let's Talk): `--color-accent-primary` (`#FFBE1A`)
- Mobile panel: expanding 698px, `--breakpoint-md` for hamburger
- Typography: `--t-micro` labels, `--font-weight-medium` nav links

### `SiteFooter` — `src/components/SiteFooter.astro`
- Border top: `--line` / `--color-border-subtle`
- Link labels: `--fluid-label`, `--fg-muted`
- Section spacing: `--space-section-*`

### `BlogCard` — `src/components/BlogCard.astro`
- Card: border-top `--line`, padding `--gap-5`
- Category: `--t-micro`, `--color-accent-primary`
- Title: `--t-h5`, `--font-weight-semibold`, `--lh-h5`
- Excerpt: `--fluid-label`, `--fg-muted`

### `WorkCard` — `src/components/WorkCard.astro`
- Media: 16/10 `object-fit: cover`, `--r-2` radius
- Client: `--t-micro`, `--fg-muted`
- Title: `--t-h5`, `--font-weight-semibold`

### `SectionTitle` — `src/components/SectionTitle.astro`
- Eyebrow: `--font-mono`, `--t-micro`, `--color-accent-primary`
- Heading: `--t-h2` / `--t-h3`, `--font-weight-bold`

## Page Blocks (from `src/pages/`)

| Block | File | Tokens |
|---|---|---|
| Hero | `index.astro` | `--fluid-display` headline, `--space-section-xl` |
| Service cards | `index.astro` | `--neutral-1` bg, `--r-4`, `--gap-*`, hover `--surface-2` |
| Pillars glass | `index.astro` | `backdrop-filter blur(26px)`, `--r-6`, `--shadow` |
| Work grid | `work/index.astro` | `--r-2` media, placeholder `--surface-2` |
| Blog grid | `blog/index.astro` | `--r-2` thumbs, `--t-h5` titles |
| Stats | `about.astro` | `--font-weight-bold` numbers, `--t-h2` |
| Bento | `about.astro` | `--r-*`, `--gap-*`, accent gradients |
| Legal | `privacy-policy.astro` | `--t-h4` headings, `--core-line-height-relaxed` |

## Global Layout (`src/layouts/BaseLayout.astro`)
- Partners / Industries / Blog teaser / Final CTA sections
- Industries chips: `--t-sm`, `--r-full` pill, `--line` border
- Blog teaser thumbnails: 16/10 `--r-2`
- Final CTA: `--color-accent-warm` (`#FFBE1A` family), `#000` text

## Design Principles
- **Type hierarchy**: Display 800 / H1 700 / H2–H4 600 / labels 500 / body 400
- **Spacing**: `--gap-*` scale + `--space-section-*` for sections
- **Surfaces**: `#050505` page / `#191919` elevated / `#2B2B2B` borders
- **Accent**: yellow `#FFBE1A` for CTAs, blue `#2368D7` / peach `#E54F30` / green `#3ED219` / aqua `#09E2C0` / lime `#7A4DFF` for categories
- **Motion**: `--duration-*` + `--easing-*` tokens via `motion` (vanilla)
