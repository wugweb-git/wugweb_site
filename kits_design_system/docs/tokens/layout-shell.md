# Layout shell — page · section · content

**Authoritative spec**, supplied 2026-10-03 from the Framer source that built
wugweb.com. This is the skeleton every page is built on. Code that disagrees
with this file is wrong, not the file.

## The rule

**The section owns the gutter. The content owns the max-width.**

- A **section** is always full-bleed (`width: 100%`). It carries the only
  horizontal padding on the page, plus the vertical rhythm.
- Inside it sits one **content** box, also `width: 100%`, capped at
  `max-width: 1200px`, with **zero padding of its own**.
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
| nav padding | `16` | `20 32` | `20` |
| nav height | 110 | 118 | 118 |

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
height: min-content;        /* 110 mobile · 118 tablet and desktop */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 16px;              /* mobile */
padding: 20px 32px;         /* tablet */
padding: 20px;              /* desktop */
position: sticky;
top: 0;
z-index: 10;
will-change: transform;
gap: 0;
```

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

## How it is implemented

| spec | code |
|---|---|
| section = full-bleed, owns gutter | `.wrap` is the section — `<section class="wrap …">` |
| gutter 16 / 32 / 48 | `--shell-gutter`, stepped in `:root` |
| content max 1200 | `.wrap { max-width: calc(1200px + 2 × --shell-gutter) }` |
| section rhythm 48 / 70 / 96 | `--section-y` and every `--space-section-*` |
| column gap 16 / 24 / 32 | `--grid-gap` |
| columns 4 / 8 / 12 | `.grid`, switching at 768 and 1200 |
| nav 16 / 20·32 / 20 | `.site-header` in `SiteHeader.astro` |
| desktop breakpoint 1200 | `--breakpoint-xl: 1200px` |

Notes that are easy to get wrong:

- **max-width is 1200 plus the gutters, not a flat 1200.** `box-sizing:
  border-box` is global, so a flat 1200 would make the *content* box 1104. The
  spec's 1200 is the content box.
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

Section labels, rendered HTML: **159 of 159 sections**, 0 duplicate IDs,
0 broken references.

**Measuring note:** the measuring iframe needs `border: 0`. The site's
`* { box-sizing: border-box }` applies to it, so a 768px iframe with its default
2px border has a 764px viewport and misses `min-width: 768px` — every section
then reads at the mobile value.
