# Layout shell — page · section · content

**Authoritative spec**, supplied 2026-10-03 from the Framer source that built
wugweb.com. This is the skeleton every page is built on. Code that disagrees
with this file is wrong, not the file.

## The rule

**The section owns the gutter. The content owns the max-width.**

- A **section** is always full-bleed and relative (`width: 100%`,
  `position: relative`). It carries the page gutter plus the vertical rhythm.
- Inside it sits one **content** box, also `width: 100%`, capped at
  `max-width: 1200px` and **distributed centre** in the section.
- **Section padding is for sections only.** Content and blocks may add their
  own extra padding inside (a card's inset, a reading column's measure) — that
  is not a gutter, and it never replaces the section's.
- Blocks live inside content. Nothing below the section sets a page gutter.

## Structure

The layer tree is always **page → section → content → blocks**:

```
Large (page / canvas)                         Primary
├── Hero        (section)   # anchor   ✧ a11y
│   └── content
│       ├── space
│       ├── head
│       └── body
├── Message     (section)   # anchor
│   └── content
│       └── Message Card
├── Bento       (section)   # anchor
│   └── content
│       └── About
└── Culture     (section)   # anchor   ✧ a11y
```

```
┌─ canvas ─────────────────────────────────────────────┐  bg #050505, padding 0, gap 0
│ ┌─ section ──────────────────────────────────────┐   │  width 100%, padding = rhythm + gutter
│ │        ┌─ content ─────────────────┐           │   │  width 100%, max-width 1200, padding 0
│ │ ←gutter→  blocks …                 ←gutter→    │   │
│ │        └───────────────────────────┘           │   │
│ └────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────┘
```

**Filters are part of the CMS body, always** — never a section of their own.
A filter chip row lives inside the content of the grid it filters.

## Breakpoints

| | small · mobile | medium · tablet | large · desktop |
|---|---|---|---|
| canvas width | **375** | **768** | **1200** |
| section padding (T R B L) | `48 16 48 16` | `70 32 70 32` | `96 48 96 48` |
| content max-width | 1200 | 1200 | 1200 |
| layout grid columns | **4** | **8** | **12** |
| column gap | **16** | **24** | **32** |
| grid margin (= gutter) | **16** | **32** | **48** |
| nav padding | `20 16` | `20 32` | `20` |
| nav height | **100** | **100** | **100** |
| nav position | sticky, top 0 | sticky, top 0 | sticky, top 0 |
| bar height | 60 | 60 | 60 |
| logo height | 40 | 40 | 40 |

Layout guides: type columns, align **stretch**, width auto, colour `#0099FF`.

> **Gap correction.** The pasted content boxes showed `gap: 24 / 24 / 0`. That
> was wrong, and the first version of this file copied it. The guides are
> authoritative: **16 / 24 / 32**.

## Exact declarations

### Canvas — the page root
```css
width: 375 | 768 | 1200;
height: min-content;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
background-color: var(--Black_Background, #050505);
overflow: visible;
padding: 0;
gap: 0;                     /* sections stack on padding only, never margin */
```

### Section
```css
box-sizing: border-box;
flex-shrink: 0;
width: 100%;
height: min-content;
display: flex;
flex-direction: column;
justify-content: center;
padding: 48px 16px;         /* mobile */
padding: 70px 32px;         /* tablet */
padding: 96px 48px;         /* desktop */
position: relative;
gap: 0;
```

| | mobile | tablet | desktop |
|---|---|---|---|
| `align-items` | center | **flex-start** | center |
| `align-content` | center | **flex-start** | center |
| `overflow` | **hidden** | **hidden** | visible |

### Content — inside every section
```css
flex-shrink: 0;
width: 100%;
height: min-content;
max-width: 1200px;          /* the only max-width in the shell */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0;                 /* never a gutter here */
position: relative;
gap: 16px | 24px | 32px;    /* the column gap */
```
`z-index: 1` on mobile and tablet.

### Top nav — sticky
```css
box-sizing: border-box;
flex-shrink: 0;
width: 100%;
height: 100px;              /* all three breakpoints — bar 60 + 20px top/bottom everywhere */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 20px 16px;         /* mobile */
padding: 20px 32px;         /* tablet */
padding: 20px;              /* desktop */
position: sticky;
top: 0;
z-index: 10;
will-change: transform;
cursor: grab;               /* links and buttons inside keep cursor: pointer */
gap: 0;
```

### Transition — Spring
Framer: **Spring · time-based · Time 0.4 · Bounce 0.2 · Delay 0.**
```css
--duration-spring: 400ms;
--ease-spring: linear(0, 0.0544, 0.1785, …, 1.0150, …, 1);  /* damped spring, ~1.5% overshoot */
transition: <property> var(--duration-spring) var(--ease-spring);
```
CSS has no spring, so `--ease-spring` is the sampled curve via `linear()`.
Every nav transition uses it. GSAP remains the engine for scroll animation.

## Canvas — every page is indexed

Each canvas (page) carries, on every route:

| | how |
|---|---|
| language | `<html lang>` |
| skip link | first focusable element, targets `#main` |
| main landmark | `<main id="main" tabindex="-1" aria-label={page title}>` |
| header / footer landmarks | `<header>` (sticky nav), `<footer id="site-footer" aria-label="Site footer">` |
| one `h1` | exactly one per page, inside `main` |
| **page scroll flow** | `main[data-scroll-flow]` lists the section ids in order; every top-level section gets `data-scroll-index` 1…n (set in `BaseLayout`) |
| scroll offset | `scroll-margin-top: var(--header-height)` on sections, so anchors land below the sticky nav |

## Every section is labelled — mandatory

Each section carries a **scroll anchor** (`#` in the Framer tree) and an
**accessible name** (✧). Both, on every section, on every page.

```html
<section class="wrap services" id="services" aria-labelledby="services-title">
  <h2 id="services-title">…</h2>
```

Rules, each learned from a defect found while doing it:

- **`aria-labelledby` only points at a heading that always renders.** A heading
  inside `{cond && …}`, or a CMS fallback, leaves the reference dangling — use a
  conditional attribute or `aria-label`.
- **Never label a section with a heading inside a `.map()`.** Every iteration
  repeats the id (invalid HTML) and the section is named after its first card.
  Use `aria-label` and keep looped headings id-free.
- **Sections in `src/layouts/` count** — the industries strip in `BaseLayout`
  and the legal hub in `LegalLayout` render on every page.
- **Filters are not sections.** They are `role="toolbar"` divs with an
  `aria-label`, inside the grid section they filter.
- IDs are kebab-case section names, unique per page.
- **A section without a visible heading** gets an `.sr-only` `h2` and
  `aria-labelledby` to it — so its card headings don't skip a level.

## Content and everything below it — labelled too

Bare `div`s cannot take an `aria-label` (it is ignored without a role), so
content is named **semantically**, not by sprinkling attributes:

| content | rule |
|---|---|
| headings | one `h1`; levels never skip (`h1 → h3` is a defect) |
| lists of cards | `ul` / `ol` + `li` |
| images | `alt` always — empty `alt=""` only when decorative |
| video | decorative muted loops: `aria-hidden="true"`; videos with controls: `aria-label` |
| links, buttons | visible text, or `aria-label` / `aria-labelledby` |
| form fields | `<label for>`, or `aria-label` |
| filter rows | `role="toolbar"` + `aria-label` |
| media + caption | `figure` + `figcaption` |

## Carried from the 2026-09-22 UI audit — current parts only

Source: [`Claude outputs/ui-spec-2026-09-22/wugweb-site-ui-spec.md`](../../../Claude%20outputs/ui-spec-2026-09-22/wugweb-site-ui-spec.md),
measured on the Framer site. Only what still holds is carried; each item was
re-checked against the code on 2026-10-03.

### Width rule — nothing wider than the nav

| | value |
|---|---|
| nav inner container | max **1280** (`80rem`), centred |
| section content | max **1200**, centred |
| rule | no non-full-bleed block may be wider than the nav |

`.global-final-cta` is a band with a rounded card inside it; the card must not
opt out of the shell with its own width or gutter.

### Mobile menu — required behaviour

| rule | status |
|---|---|
| covers the screen: `100dvh` with `100svh` fallback, minus safe areas | ✅ |
| scrolls internally on short screens, `overscroll-behavior: contain` | ✅ |
| scroll lock via `position: fixed` on body, scroll position restored (iOS ignores `overflow: hidden`) | ✅ `src/lib/site-header.ts` |
| toggle keeps the exact coordinates it has when closed | rule |
| one left edge for logo, links, contact and legal | rule |
| links at the top; contact and legal pinned to the bottom | rule |
| open/close animates with the nav spring (0.4 s, bounce 0.2); links fade + rise, ~40 ms stagger; toggle morphs by transform | rule |
| WhatsApp / phone: +91 92059 96219 | ✅ decided |

### Motion

- **Nav and hover:** the Spring token above (0.4 s, bounce 0.2, delay 0).
- **Load / scroll-in:** opacity + translateY via GSAP (`[data-reveal]`),
  first group at 0.4 s, second at 0.9 s — Framer used spring stiffness 200 /
  damping 60 for these.
- Transform-based only; everything behind `prefers-reduced-motion`.

### PWA / safe areas — all in place

`viewport-fit=cover` · `env(safe-area-inset-*)` via `--safe-*` on the nav ·
dedicated maskable icon (`pwa-maskable-512.png`) · `dvh` with `svh` fallback.

### Hero — first screen

On a 390 × 844 phone the headline, subhead and primary action sit on the first
screen, not under the cookie banner. (Rule; not re-measured in this pass.)

### Open

- Framer's media aspect ratios — 1, 3.75, 2.857, 1.76, 1.75, 1.71, 1.206 —
  are not yet mapped to sections; the site currently uses 16:9, 16:10, 4:3,
  3:2, 3:4, 2:1, 1:1.

### Not carried — superseded

| audit section | superseded by |
|---|---|
| §2 breakpoints "delete 1024" | 5-threshold scale (`breakpoints.md`); the **shell** steps only at 768 and 1200 |
| §3 nav-inset decision | decided: 16 / 20·32 / 20 (this file) |
| §4.1 type scale, §4.3 fluid spacing | `typography.md`; stepped 48 / 70 / 96 rhythm (this file) |
| §5 token counts, §6 component counts | stale measurements, re-audited in Phase C |
| §7 nav card values (inset, logo, link sizes) | nav padding and 100 px height in this file |
| §12 Storybook, §14 content flags | out of layout scope (logos: user mapping) |

## CMS fields per level — page · section · component

Source: [`docs/schema-template-section-component-level.md`](../../../docs/schema-template-section-component-level.md).
**Status: proposal — no schema field below is deployed yet.** The layout shell
says *where* accessibility and SEO live; this says which of it an editor
controls in Sanity and which the template owns.

### Page level — `caseStudy` and `post` lack what `singletonPage` has

`singletonPage` already carries the SEO / AI-answers group. `caseStudy` (82)
and `post` (124) still have only `seoTitle`, `seoDescription`, `ogImage`.
Proposed for both:

| field | type | group | purpose |
|---|---|---|---|
| `ogImagePath` | string | seo | R2 path, same convention as `coverPath` |
| `ogTitle` / `ogDescription` | string / text | seo | overrides, fall back to `seoTitle` / `seoDescription` |
| `noIndex` | boolean | seo | Framer's "Search engines" toggle, default `false` |
| `seoCanonicalUrl` | url | seo | distinct name — `caseStudy.canonicalUrl` already means stub-redirect |
| `focusKeyword` / `secondaryKeywords` | string / string[] | seo | target keywords |
| `searchIntent` | list | seo | informational · commercial · navigational · transactional |
| `breadcrumbLabel` | string | seo | falls back to title |
| `aiSummary` | text | ai-answers | 40–60 words, rendered visibly |
| `keyTakeaways` | string[] | ai-answers | 3–5 bullets |
| `faqs` | {question, answer}[] | ai-answers | FAQPage JSON-LD |
| `schemaType` | list | ai-answers | caseStudy: CreativeWork / Article · post: Article / BlogPosting |
| `lastReviewedAt` | datetime | ai-answers | feeds `dateModified` |

### Component level — three small fields

| field | on | purpose |
|---|---|---|
| `ariaLabel` | link / button object | only when the visible label doesn't describe the action (icon-only, repeated "Learn more") |
| `relNofollow` | link / button with external `href` | only once outbound or sponsored links exist |
| `imageContext` | image object | editor-facing note on the copy an image supports; never rendered |

Alt text is **not** a new field: where image objects already have `alt`, the
fix is `validation: (r) => r.required()`.

### Section level — owned by the template, not the CMS

| item | why no field |
|---|---|
| landmarks (`section` / `article` / `nav`) | template markup |
| section id (scroll anchor) + aria name | hardcoded per template — this file's labelling rules |
| page scroll flow / scroll index | generated in `BaseLayout` |
| heading levels | Portable Text `style` (H2–H4) already editor-controlled |
| no skipped levels | editorial discipline, or a future `blockContent` validation rule |
| native `href`, lazy loading, DOM order | template implementation |
| descriptive anchor text, answer-first copy | copy guidance for existing fields |
| image optimisation | Asset Registry / R2 pipeline |

## How it is implemented

| spec | code |
|---|---|
| section = full-bleed, owns gutter | `.wrap` is the section — `<section class="wrap …">` |
| gutter 16 / 32 / 48 | `--shell-gutter`, stepped in `:root` |
| content max 1200, centred | `.wrap { width: 100%; padding-inline: max(var(--shell-gutter), calc((100% - 1200px) / 2)) }` |
| section rhythm 48 / 70 / 96 | `--section-y` and every `--space-section-*` |
| column gap 16 / 24 / 32 | `--grid-gap` |
| columns 4 / 8 / 12 | `.grid`, switching at 768 and 1200 |
| nav 16 / 20·32 / 20, 100 tall | `.site-header` in `SiteHeader.astro`, `--header-height: 100px` |
| nav sticky, z 10, grab | `position: sticky; top: 0; z-index: var(--layer-nav)` (10), `cursor: grab` |
| spring 0.4 / 0.2 / 0 | `--ease-spring`, `--duration-spring` |
| section relative, isolated | global rule: `width: 100%; isolation: isolate; scroll-margin-top` |
| page scroll flow | `BaseLayout.astro` script → `data-scroll-index`, `main[data-scroll-flow]` |
| desktop breakpoint 1200 | `--breakpoint-xl: 1200px` |

Notes that are easy to get wrong:

- **The section is full width; the 1200 box is carved by padding.** The
  gutter is `max(gutter, (100% − 1200) / 2)`, so the section background spans
  the viewport while content stays 1200 and centred. A `max-width` on the
  section would stop its background short of the edges.
- **One rule enforces the rhythm.** Every top-level section gets
  `padding-block: var(--section-y)`, `margin-block: 0`, and an inner `.wrap`
  gets no vertical padding so the two never stack. It uses `!important`
  narrowly, because per-section rules compile to scoped selectors that would
  otherwise outrank it.
- **Exempt: `.global-final-cta` only.** It is a rounded card inside its own
  band, not a page section.
- **Grid gaps never borrow a section token.** Four did (`work/[slug]`,
  `ButtonShowcase`, `LegalLayout` ×2); they now use `--grid-gap`.
- The nav values supersede an earlier audit note in `SiteHeader.astro` that
  had rejected these stepped values as "non-monotonic".

## History

| | before | after |
|---|---|---|
| content max-width | 1280 (`80rem`) | **1200** |
| desktop gutter | 44 | **48** |
| desktop breakpoint | 1280 | **1200** |
| top-level sections on the rhythm | 98 of 156 | **all** |
| section tokens | flat 40 / 48 / 64 / 80 | **one rhythm, 48 / 70 / 96** |
| column gap | flat 16 | **16 / 24 / 32** |
| 12-column switch | 1024 | **1200** |
| nav padding | fluid 16→32, no bottom | **16 / 20·32 / 20** |
| sections with id + aria | 0 of 113 | **all** |
| nav height | 110 / 118 / 118 | **100 everywhere** |
| nav z-index | 50 | **10** |
| content heading skips · unnamed fields · unlabelled videos | 5 · 4 · 74 | **0 · 0 · 0** |

A stray `.wrap` rule (68px gutter at ≥1280) was overriding the shell and
squeezing content to 1160; removed. I had moved that rule from 1200 to 1280 on
2026-09-29 because 1200 "matched no token" — it was this spec's desktop step.

## Verified — 2026-10-03

Rendered pages, 22 routes, at 375, 768 and 1440:

| | mobile | tablet | desktop |
|---|---|---|---|
| top-level sections on spec | 137 / 137 | 137 / 137 | 137 / 137 |
| nav on spec | 22 / 22 | 22 / 22 | 22 / 22 |
| gutter · gap · columns | 16 · 16 · 4 | 32 · 24 · 8 | 48 · 32 · 12 |
| horizontal overflow | none | none | none |

Section labels, rendered HTML: **162 of 162 sections**, 0 duplicate IDs,
0 broken references. Content: 0 heading skips, 0 unnamed controls or fields,
0 unlabelled videos, 0 images without `alt`, one `h1` per page, scroll flow on
22 of 22. Blog post: title, meta and body share one left edge (360 at 1440).

**Measuring note:** the measuring iframe needs `border: 0`. The site's
`* { box-sizing: border-box }` applies to it, so a 768px iframe with its default
2px border has a 764px viewport and misses `min-width: 768px` — every section
then reads at the mobile value.
