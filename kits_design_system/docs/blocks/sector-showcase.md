# Sector Showcase

**Status:** built, awaiting sign-off · **Live on:** every BaseLayout page except the excluded ones (below), plus `/` with its own copy
**Source:** `src/components/SectorShowcase.astro` (single source of truth) · data `src/lib/sectors.ts` · story `Blocks/Sector Showcase`
**Data:** Notion Table 25: Sector + Table 3: Industry → `scripts/sync-notion-sectors.mjs` → Sanity `sector` / `industry`
**Guard:** `scripts/check-sector-css.mjs` (runs as `prebuild`)
**Last verified:** 2026-10-19

Shows Wugweb's breadth: 6–8 sector cards, each an icon, the sector name and up
to two industries. Not a filter and not a case-study index: no counts, no
descriptions, no arrows. Replaces the old global industry-pill strip and the
homepage marquee.

---

## 1. Single source of truth

- All markup, styles, states and motion live **only** in `SectorShowcase.astro`
  (scoped `<style>`, design tokens only).
- No page, layout or `global.css` may style `.sectors-section`, `.sector-card`
  or any `.sector-*` / `.sectors-*` class. `npm run build` fails if one does.
- Pages pass copy only: `heading`, `intro`, `ctaLabel`, `ctaHref` (plus the
  `sectors` data from `getShowcaseSectors()`). No layout, colour, size or
  variant props, so a change in the component reaches every page.

## 2. Anatomy

```
section.sectors-section#sectors  (aria-labelledby="sectors-title")
└ .wrap
  ├ .sectors-head  → h2#sectors-title (copy) · p.sectors-intro (copy)
  ├ ul.sectors-grid
  │ └ li.sectors-item [data-reveal, stagger 0.05s]
  │   └ a.sector-card  href=/footer/industries   ← one link, one tab stop
  │     ├ .sector-icon-tile → inline Lucide SVG (currentColor, stroke 1.75, aria-hidden)
  │     └ .sector-text → h3.sector-name · p.sector-industries ("A · B")
  └ .sectors-cta → a.btn.btn-ghost (copy)
```

Server-rendered: sector and industry names are in the raw HTML. No schema markup.

## 3. Data

```groq
*[_type=="sector" && showcase==true] | order(showcaseOrder asc){
  _id, name, "slug": slug.current, icon,
  "industries": *[_type=="industry" && references(^._id) && showOnSectorCard==true] | order(order asc)[0...2].name
}
```

| Notion | Sanity |
|---|---|
| Table 25 "Show in Sectors Section" | `sector.showcase` |
| Table 25 "Sectors Section Order" | `sector.showcaseOrder` |
| Table 25 "Icon" (Lucide name) | `sector.icon` |
| Table 3 "Show on Sector Card" | `industry.showOnSectorCard` |

Legacy `industry-<slug>` docs have no `sectorRef`, so they can never appear.

## 4. Section states

| State | Behaviour |
|---|---|
| Normal | Heading, intro, card grid, CTA |
| No copy from CMS | Component defaults (as InsightsBlock) |
| pageSection `industries` switched off | Not rendered |
| 0 featured sectors | Not rendered (no fallback list) |
| 1–3 sectors | Column count kept; cards left-aligned, no stretching |
| Odd count | Partial last row left-aligned |
| Missing / unknown icon | No icon tile; `console.warn` at render |
| No industries ticked | No industries line; card still renders |
| More than 2 ticked | First 2 by industry `order` |
| Long name | Wraps (tablet: clamps to 2 lines) |
| Reduced motion, forced colours, no JS | Fully readable; nothing depends on JS |

## 5. Tiers

| Tier | Range | Grid | Card | Icon / tile |
|---|---|---|---|---|
| Stack | < 480 | 1 col | Horizontal: tile left, text right | 32 / 48 |
| Mobile | 480–767.98 | 2 col | Vertical, min-height so rows align | 32 / 48 |
| Tablet | 768–1023.98 | 4 col | Vertical, compact; name and industries clamp to 2 lines | 36 / 56 |
| Desktop | ≥ 1024 (1200 shell) | 4 col | Vertical, full padding, text pinned to bottom | 40 / 64 |

Gaps use `--grid-gap`; sizes derive from `--gap-*`.

## 6. Card states

Pseudo-classes and media queries only — no per-page classes, no JS state.

| State | Behaviour |
|---|---|
| Default | `--surface` + `--elevation-2`, no border; icon full contrast |
| Hover (`hover:hover` + `pointer:fine`) | `--surface-2`, `--elevation-3`, lift ≤ 4px, icon `--color-yellow` |
| Focus-visible | `--focus-primary` ring on the whole card + same lift |
| Active / pressed | Steps down to page surface, `--elevation-1`, `scale(0.98)`, icon yellow |
| Touch | No hover styles; press only |
| Reduced motion | No transforms or transitions |
| Forced colours | Outline in CanvasText; focus in Highlight; icon CanvasText |

Yellow only appears as the hover/press accent, never at rest.

## 7. Where it renders

| Route | Copy |
|---|---|
| `/` | Homepage's own copy (props) |
| `/about`, `/faq`, `/kits`, `/services`, `/services/[slug]`, `/work`, `/work/[slug]`, `/blog`, `/blog/[slug]`, `/footer/impact`, `/footer/reviews` | pageSection `industries` |

Hidden (`hideGlobalSectors`): `/404`, `/404-2`, `/offline`, `/thank-you`,
`/contact-error`, `/contact-us`, `/footer/sitemap`, `/footer/subscription`.
Already hidden: `/footer/industries` (hub), redirects, LegalLayout pages.

## 8. Links

Every card links to `/footer/industries` with **no hash**. Switch to
`/footer/industries#<sector-slug>` only once the hub has an element with that
id for every featured sector.

## 9. Open (owner)

- Fill the Notion fields, then `WRITE=1 node scripts/sync-notion-sectors.mjs`.
- Rename the pageSection key `industries` → `sectors` only after the Notion
  Site Sections row is renamed (Notion first, then Sanity).
