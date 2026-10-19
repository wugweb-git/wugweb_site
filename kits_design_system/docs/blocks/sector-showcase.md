# Sector Showcase

**Status:** built, awaiting sign-off · **Last verified:** 2026-10-19
**Source:** `src/components/SectorShowcase.astro` · story `Blocks/Sector Showcase`

A showcase of the sectors Wugweb works in. 8 cards, each with an icon, the
sector name and two industries. Nothing else: no counts, descriptions, arrows,
filters or case studies.

---

## 1. Content

| # | Sector | Icon (Lucide) | Industries on card | Links to |
|---|---|---|---|---|
| 1 | Fintech | `wallet` | Digital Finance · NeoBanking | `/footer/industries#fintech` |
| 2 | BFSI | `landmark` | Banking · Insurance | `/footer/industries#bfsi` |
| 3 | Technology | `cpu` | SaaS · AI/ML | `/footer/industries#technology` |
| 4 | Consumer & Retail | `shopping-bag` | eCommerce · Fashion & Lifestyle | `/footer/industries#consumer-retail` |
| 5 | Travel & Hospitality | `plane` | Hotels & Restaurants · Tourism | `/footer/industries#travel-hospitality` |
| 6 | Automotive & Mobility | `car` | Automotive · Electric Vehicles | `/footer/industries#automotive-mobility` |
| 7 | Healthcare | `heart-pulse` | Mental Health · Pharmacy | `/footer/industries#healthcare` |
| 8 | Energy & Industrial | `zap` | Renewable Energy · Manufacturing | `/footer/industries#energy-industrial` |

Static content. The 8 cards are the same on every page.

| Page type | Heading, intro, CTA |
|---|---|
| Homepage `/` | Homepage copy |
| All other pages where it renders | Shared copy |

CTA links to `/footer/industries`.

## 2. Anatomy

```
section.sectors-section#sectors
└ .wrap
  ├ h2 (copy) · p.sectors-intro (copy)
  ├ ul.sectors-grid
  │ └ li → a.sector-card  href=/footer/industries#<sector-slug>
  │        ├ icon tile (inline Lucide SVG, aria-hidden)
  │        └ h3 sector name · p "Industry A · Industry B"
  └ a.btn.btn-ghost (CTA copy)
```

Server-rendered. All styles live only in `SectorShowcase.astro`.

## 3. Tiers

| Tier | Range | Grid | Card |
|---|---|---|---|
| Stack | x < 480 | 1 col | Horizontal: icon left, text right |
| Mobile | 480 ≤ x < 768 | 2 col | Vertical |
| Tablet | 768 ≤ x < 1024 | 4 col | Vertical, compact |
| Desktop | x ≥ 1024 | 4 col | Vertical, full padding |

## 4. Card states

| State | Behaviour |
|---|---|
| Default | Tinted surface + shadow, no border |
| Hover | Slight lift, icon turns yellow |
| Focus-visible | Focus ring + same lift |
| Pressed | `scale(0.98)` |
| Reduced motion | No movement |

Yellow appears only on hover/press, never at rest.

## 5. Section states

| State | Behaviour |
|---|---|
| Long sector name | Wraps |

## 6. Where it renders

`/` (with its own copy) and the other main pages. Hidden on `/footer/industries`,
`/404`, `/404-2`, `/offline`, `/thank-you`, `/contact-error`, `/contact-us`,
`/footer/sitemap`, `/footer/subscription`, redirects and legal pages.
