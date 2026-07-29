# Components — Wugweb Design System

Reusable UI components used across the site. Import from `src/components/`.

## Card Components

| Component | File | Props | Used On |
|---|---|---|---|
| **WorkCard** | `WorkCard.astro` | `{ client?, category?, title, slug, media? }` | Homepage work grid, work listing, related work |
| **BlogCard** | `BlogCard.astro` | `{ title, slug, category?, excerpt? }` | Blog listing, related posts, blog teaser |
| **RelatedWorkGrid** | `RelatedWorkGrid.astro` | `{ items: { slug, client, title }[] }` | Service detail pages |

## Section Components

| Component | File | Props | Used On |
|---|---|---|---|
| **SectionTitle** | `SectionTitle.astro` | `{ title, subtitle? }` | Any section (standardizes heading style) |
| **StatsGrid** | `StatsGrid.astro` | `{ items: { n, label, copy? }[] }` | About page, services listing |
| **CapabilitiesGrid** | `CapabilitiesGrid.astro` | `{ sections: { n?, title, body?, items? }[] }` | Service detail pages |
| **ApproachSteps** | `ApproachSteps.astro` | `{ items: { n, title, body }[] }` | Service detail pages |
| **FAQList** | `FAQList.astro` | `{ items: { q, a }[] }` | Service detail pages, FAQ page |
| **FilterChips** | `FilterChips.astro` | `{ tags: string[] }` | Work listing, blog listing |

## Layout Components

| Component | File | Props | Used On |
|---|---|---|---|
| **BaseLayout** | `layouts/BaseLayout.astro` | `{ title, description, seoTitle? }` | Every page (wraps head/nav/footer) |
| **SiteHeader** | `components/SiteHeader.astro` | `{ companyEmail? }` | BaseLayout |
| **SiteFooter** | `components/SiteFooter.astro` | `{ copyright?, companyEmail? }` | BaseLayout |

## Global Sections (rendered in BaseLayout)

These appear on every page after the page content:
- Global Partners (`section.global-partners`)
- Global Industries (`section.global-industries`)
- Global Blog Teaser (`section.global-blog-teaser`)
- Final CTA (`section.global-final-cta`)
- Footer

## Design Tokens (in `src/styles/global.css`)

| Category | Prefix | Example |
|---|---|---|
| Font weight | `--font-weight-*` | `--font-weight-regular: 400` |
| Line height | `--core-line-height-*` | `--core-line-height-normal: 1.5` |
| Type scale | `--t-*` | `--t-display`, `--t-h2`, `--t-body` |
| Radius | `--r-*` / `--radius-*` | `--r-2: 8px`, `--radius-4: 16px` |
| Spacing | `--s-*` / `--p-*` / `--gap-*` | `--gap-4: 16px`, `--s-12: 48px` |
| Section spacing | `--space-section-*` | `--space-section-xl: 80px` |
| Breakpoints | `--breakpoint-*` | docs only — use literal `@media` values |
| Motion | `--duration-*` / `--easing-*` | `--duration-normal: 300ms` |
| Semantic colour | `--color-*` / `--neutral-*` | `--neutral-1: #F4F4F4` |

## Adding a new component

1. Create in `src/components/` with `.astro` extension
2. Define `interface Props` for type safety
3. Use design tokens (`var(--gap-*)`, `var(--r-*)`, `var(--duration-*)`)
4. Add to this table
5. Import and use inline without wrapping Astro fragment
