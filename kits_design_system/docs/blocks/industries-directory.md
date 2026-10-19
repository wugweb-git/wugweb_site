# Industries Directory

**Status:** built, awaiting sign-off · **Last verified:** 2026-10-19
**Source:** `src/pages/footer/industries.astro`, `src/components/industries/IndustriesHero.astro`, `src/components/industries/SectorRow.astro` · stories `Blocks/Industries/Hero`, `Blocks/Industries/Sector Row`

A static showcase of every sector Wugweb works in and the industries inside each.
Nothing else: no search, filters, panels, case studies or capabilities.

---

## 1. Sections

| # | Section | Content |
|---|---|---|
| 1 | Hero | Owner H1 and lead; decorative diagram with Wugweb at the centre and the showcase sectors around it |
| 2 | Sector directory | h2 and lede (owner copy), then one row per sector |
| 3 | Cross-industry | Owner copy; small diagram fed by the first three showcase sectors |
| 4 | Don't see your industry? | Owner copy, contact button, "View our services" (open question: links to `/about`) |
| 5 | Final CTA | Unchanged |

## 2. Anatomy

```
IndustriesHero  section.ind-hero#hero-section
├ h1 · p.ind-hero-lead
└ .ind-hero-visual (aria-hidden)
  └ .ind-diagram (3 by 3 grid)
    ├ svg.ind-diagram-lines (dashed lines from the centre)
    ├ .ind-node-centre "Wugweb"
    └ .ind-node × showcase sectors (Lucide icon + name)

section.directory-section#industries
└ SectorRow  section.dir-row#<sector-slug>  (one per sector)
  ├ .dir-row-meta: span.dir-row-num (aria-hidden) · h3 name · p sector line
  └ ul.dir-row-labels > li.dir-row-label × industries (plain text)
```

Server-rendered; no client script. Every sector and industry is in the HTML.
Row classes use `dir-row`, because `.sector-*` is reserved for SectorShowcase
(`scripts/check-sector-css.mjs`).

## 3. Data

`getDirectorySectors()` in `src/lib/sectors.ts`, one cached query:

| Field | Source |
|---|---|
| Row order | `sector.order` |
| Anchor id | `sector.slug` |
| Number | Position in that order, two digits |
| Name, sector line | `sector.name`, `sector.description` |
| Industries | Every `industry` with `sectorRef` to the sector, by `industry.order` |
| Hero nodes | Sectors with `showcase`, by `showcaseOrder` |
| Icons | `sector.icon` (Lucide name) through `src/lib/lucide.ts` |

Legacy industry docs without `sectorRef` never appear. The page hardcodes no
sector or industry name. SEO title and description come from the `industries`
singletonPage.

Data status: Notion filled, Sanity synced 2026-10-19 (Cowork).

## 4. Tiers

| Range | Hero | Rows |
|---|---|---|
| x < 480 | Diagram hidden | Stacked: number, name, line, labels |
| 480 ≤ x < 768 | Text, then diagram with the first 4 nodes (cross), larger labels | Stacked |
| 768 ≤ x < 1024 | Text, then the full diagram | Stacked |
| x ≥ 1024 | Split: text left, diagram right | Details about one third left, labels about two thirds right |

No horizontal overflow at 320, 375, 479, 480, 767, 768, 1023, 1024, 1200, 1440.
Labels wrap inside themselves.

## 5. Visual rules

| Element | Rule |
|---|---|
| Row separation | Spacing plus alternating tint (`--color-surface-elevated` on even rows); no borders |
| Number | Muted grey (`--fg-subtle`) |
| Labels | `--surface-2` tint, `--radius-full`, not interactive |
| Yellow | None on this page except the permitted buttons and the final CTA |
| Forced colours | Labels and diagram nodes get a `CanvasText` outline |

## 6. Links in

SectorShowcase cards link to `/footer/industries#<sector-slug>`. Rows set
`scroll-margin-top` to clear the sticky header, so a card lands with its row
just below the nav.

## 7. JSON-LD

Passed to BaseLayout: `CollectionPage`, an `ItemList` of sectors (each a nested
`ItemList` of its industries) and a `BreadcrumbList` (Home, Industries).
BaseLayout emits the graph only on the canonical host.
