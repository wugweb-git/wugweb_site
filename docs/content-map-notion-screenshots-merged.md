# Content Map — merged from the 5 Notion screenshots

Transcribed directly from the 5 screenshots you sent (Home/Marketing, Footer/Legal,
System, Global chrome ×2). Not from the codebase-generated `site-content-map.csv` —
that's a separate, broader file. Cells that were cut off at the screenshot's column
edge are marked `[cut off]` rather than guessed.

Status legend (from the Global chrome screenshot): ✅ live · 🔁 redirect · ⏸ held for
review, do not delete.

## Routes — Home, Marketing, Footer, Legal, System

| Group | Status | Route | Component / Layout | Sections | Source | Notes |
|---|---|---|---|---|---|---|
| Home | ✅ | `/` | InsightsBlock · ClientAssembl[cut off] | 5 | Sanity | |
| Marketing | ✅ | `/faq` | FaqAccordion | 1 | Sanity | |
| Marketing | ✅ | `/contact-us` | — | form | Sanity | |
| Marketing | ✅ | `/blog/[slug]` | PortableTextRenderer | 3 | Sanity | |
| Marketing | ✅ | `/blog` | — | 4 | Sanity | |
| Marketing | ✅ | `/work/[slug]` | PortableTextRenderer | 10 | Sanity | |
| Marketing | ✅ | `/work` | — | 3 | Sanity | |
| Marketing | ✅ | `/services/[slug]` | FaqAccordion · InsightsBlock [cut off] | 9 | Sanity | |
| Marketing | ✅ | `/services` | — | 5 | Sanity | |
| Marketing | ✅ | `/about` | TeamGrid | 5 | Sanity | |
| Footer | 🔁 | `/footer/refund-policy` | 301 → `/refund-policy` — ve[cut off] | — | redirect | |
| Footer | ✅ | `/footer/cookie-policy` | LegalLayout | 1 | Sanity | |
| Footer | ✅ | `/footer/sitemap` | BaseLayout | 1 | Sanity | |
| Footer | ✅ | `/footer/subscription` | BaseLayout | 12 | Sanity | |
| Footer | ✅ | `/footer/reviews` | BaseLayout | 4 | Sanity | |
| Footer | ✅ | `/footer/industries` | BaseLayout | 6 | Sanity | |
| Footer | ✅ | `/footer/impact` | BaseLayout | 9 | Sanity | |
| Legal | ✅ | `/refund-policy` | LegalLayout | — | Sanity | |
| Legal | ✅ | `/termsofuse` | LegalLayout | — | Sanity | |
| Legal | ✅ | `/privacy-policy` | LegalLayout | — | Sanity | |
| System | ✅ | `/thank-you` | — | — | — | post-submit |
| System | ✅ | `/offline` | — | — | — | PWA offline shell |
| System | ✅ | `/kits` | — | — | — | design-system showcase, unli[cut off] |
| System | 🔁 | `/contact-v2` | — | — | — | 301 → `/contact-us` |
| System | ⏸ | `/contact-error` | — | — | — | Hold — kept alongside `/404-2` [cut off] |
| System | ⏸ | `/404-2` | — | — | — | Hold — Vedanshu comparing [cut off] |
| System | ✅ | `/404` | — | — | — | tic-tac-toe page; redesign flag[cut off] |

## Global chrome — every page via BaseLayout

Order of rendering, top to bottom on every page:

| Order | Slot | Component | Opt out |
|---|---|---|---|
| 1 | Nav | SiteHeader | — |
| — | *page sections* | *see Content Map* | — |
| 2 | Partners strip | inline | hideGlobalSections |
| 3 | Industries | inline | hideGlobalSections |
| 4 | Insights teaser | InsightsBlock | hideGlobalSections |
| 5 | Final CTA | FooterCTA | hideGlobalSections |
| 6 | Footer | SiteFooter | — |
| 7 | Cookie banner | inline | — |

*"Every route in `src/pages`, generated from the code."*

## Which routes opt out — verified live

`hideGlobalSections` is declared in four files, and the effect is real: these routes
render no Final CTA. Nav and Footer stay everywhere.

| Route | Nav | Final CTA | Footer |
|---|---|---|---|
| `/footer/industries` | ✅ | ❌ | ✅ |
| `/privacy-policy` · `/termsofuse` · `/refund-policy` · `/footer/cookie-policy` | ✅ | ❌ | ✅ |
| every other route | ✅ | ✅ | ✅ |

Declared in: `pages/footer/industries.astro`, `pages/footer/refund-policy.astro`,
`layouts/BaseLayout.astro`, `layouts/LegalLayout.astro` — LegalLayout is why all four
legal routes opt out together.

## Field-level map — `/work/[slug]` (`caseStudy`)

Six `case-section` blocks. Only one is the body field — the other five are distinct
schema fields.

| # | Heading | Sanity field | Shape |
|---|---|---|---|
| 1 | hero | `title` `subtitle` `client` `di[cut off]` | strings |
| 2 | cover | `coverPath` / `coverImage` | asset path |
| 3 | About | `about` | text |
| 4 | The problem | `challenges[]` | array — `title` · `body` per ite[m, cut off] |
| 5 | The approach | `solutions[]` | array — `title` · `body` per ite[m, cut off] |
| 6 | The outcome | `results[]` | array — `metric` · `label` per[cut off] |
| 7 | Design thesis | `designPhilosophy` | text, split on sentences |
| 8 | In depth | `bodyContent` | portable text — the only body[-field section, cut off] |
| 9 | Gallery | `galleryPaths[]` | asset paths |
| 10 | More Case Studies | `relatedCaseStudies[]` | refs |

Also on the type but not rendered by this template: `impact[]` (title + body), `partner`,
`team`, `tags`, `canonicalUrl`, `syndicatedTo`, `seoTitle`, `seoDescription`, `ogImage`,
`clientRef`, `industryRef`, `services[]`, `assets[]`, `relatedPosts[]`.

> ⚠️ `impact[]` exists in the schema with `title` + `body` and is fetched by the query,
> but no section renders it. Either wire it up or drop it — right now editors can fill a
> field that never appears.

## Per-route section tables

### `/` (Home)

| # | Section | Title | Subtitle | Buttons | Eyebrow |
|---|---|---|---|---|---|
| 1 | `hero` | … | — | Explore Wugweb · Get in Touc[h, cut off] | A world-class digital experien[ce..., cut off] |
| 3 | `services` | Crafting UI, UX, and Brand Sy[stems, cut off] | In a world where the unexpect[ed..., cut off] | View Services | What we do |
| 4 | `work` (grid) | Work that Leads with Clarity a[nd Delivers with Impact, cut off] | … | View case studies | — |
| 5 | `industries-section` | We understand the context be[hind..., cut off] | From regulated sectors to fas[t..., cut off] | Explore All Industries | Industries We Empower |

*Row #2 (`intro`) wasn't visible in this screenshot — not transcribed rather than guessed.*

### `/services`

| # | Section | Title | Subtitle | Buttons | Eyebrow |
|---|---|---|---|---|---|
| 1 | `services-hero` | Services | At Wugweb, we design with fu[cut off] | — | — |
| 2 | `stats` | — | … | — | — |
| 3 | `services-intro` | Bringing intuitive and beautif[ul..., cut off] | We create at the intersection [cut off] | — | — |
| 4 | `why-wugweb` | Why Wugweb? | … | — | — |
| 5 | `svc-panel` ×6 | … *(one panel per pillar)* | … | Learn More · Get in Touch · Co[cut off] | — |

### `/services/[slug]`

| # | Section | Title | Subtitle | Buttons | Eyebrow |
|---|---|---|---|---|---|
| 1 | `detail-hero` | … | … | Get in Touch | Services |
| 2 | `detail-body` | — | … | — | — |
| 3 | `svc-stats` | — | … | — | — |
| 4 | `capabilities-section` | … | — | — | What we can do |
| 5 | `approach-section` | From first conversation to han[dover, cut off] | — | Start a project | — |
| 6 | `framework-section` | Our … Framework | — | — | How we work |
| 7 | `toolkit-section` (grid) | Wugweb leverages a diverse t[oolkit, cut off] | — | — | Our Design Toolkit |
| 8 | `svc-work` (grid) | Work that leads with clarity ar[..., cut off] | — | View all case studies | — |
