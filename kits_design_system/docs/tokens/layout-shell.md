# Layout shell — canvas · section · content

**Authoritative spec, supplied 2026-10-03.** Captured verbatim from the Framer
canvas definitions. This is the page skeleton every section is built on.

## The rule in one line

**The section owns the gutter. The content owns the max-width.**

A section is always full-bleed (`width: 100%`) and carries the only horizontal
padding. Inside it sits one content box that is also `width: 100%` but capped at
`max-width: 1200px` with **zero padding of its own**. Nothing else sets a page
gutter.

```
┌─ canvas ──────────────────────────────────────────────┐  bg #050505, no padding
│ ┌─ section ───────────────────────────────────────┐   │  width 100%, padding = gutter
│ │        ┌─ content ─────────────────┐            │   │  width 100%, max-width 1200, padding 0
│ │        │                           │            │   │
│ │ ←48px→ └───────────────────────────┘ ←48px→     │   │
│ └─────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────┘
```

## Per breakpoint

| | canvas | section padding (T R B L) | content max-width | content gap |
|---|---|---|---|---|
| **small** (mobile) | 375 | `48px 16px 48px 16px` | 1200 | 24 |
| **medium** (tablet) | 768 | `70px 32px 70px 32px` | 1200 | 24 |
| **large** (desktop) | 1200 | `96px 48px 96px 48px` | 1200 | 0 |

## Exact declarations

### Canvas — the page root
```css
width: <breakpoint>;        /* 375 · 768 · 1200 */
height: min-content;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
background-color: var(--Black_Background, #050505);
overflow: visible;
padding: 0;
gap: 0;
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
padding: 96px 48px;         /* large · 70px 32px medium · 48px 16px small */
position: relative;
gap: 0;
```
`align-items`: `center` on small and large, **`flex-start` on medium (tablet)**.
`overflow`: `visible` on large, **`hidden` on small and medium**.

### Content — the inner box
```css
flex-shrink: 0;
width: 100%;
height: min-content;
max-width: 1200px;          /* the ONLY max-width in the shell */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0;                 /* never a gutter here */
position: relative;
gap: 0;                     /* large — 24 on small and medium */
```
`z-index: 1` on small and medium; unset on large.

### Top nav (sticky)
```css
box-sizing: border-box;
flex-shrink: 0;
width: 100%;
height: min-content;        /* 118px at large */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 20px;              /* uniform, all four sides */
position: sticky;
top: 0;
z-index: 10;
will-change: transform;
gap: 0;
```

## ✅ Implemented sitewide — 2026-10-03

All three deltas are resolved. The code now matches this spec.

| | spec | code before | code now |
|---|---|---|---|
| content max-width | 1200px | 1280px (`80rem`) | **1200px** |
| desktop gutter | 48px | 44px | **48px** |
| desktop breakpoint | 1200 | 1280 | **1200** (`--breakpoint-xl`) |

How it is built: `.wrap` is the section and carries the only horizontal padding,
via one stepped token `--shell-gutter` (16 / 32 / 48). Its max-width is
`calc(1200px + 2 × gutter)` so the **content** box is exactly 1200 —
`box-sizing: border-box` would otherwise make a flat 1200 give 1104. Vertical
rhythm rides on `--space-section-xl` (48 / 70 / 96), which carries 67 uses.

A second `.wrap` rule (68px gutter at ≥1280) was silently overriding the shell
and squeezing content to 1160; removed. That was the rule I had moved from
1200 to 1280 on 2026-09-29 — it was this spec's desktop step all along.

Measured on every `.wrap` at all three breakpoints: one content width and one
gutter per breakpoint — 343/16, 704/32, 1200/48 — with no page overflow.

**Not yet on the spec rhythm:** `--space-section-md` (25 uses), `-lg` (21),
`-sm` (4) are still flat. The nav is `var(--gap-5) var(--gap-6) 0` against the
spec's uniform 20px.

## Every section is labelled — mandatory

Each `<section>` carries **both** a scroll anchor and an accessible name:

```html
<section class="wrap services" id="services" aria-labelledby="services-title">
  <h2 id="services-title">…</h2>
```

Rules, each learned from a defect found while doing it:

- **`aria-labelledby` only points at a heading that always renders.** A
  heading inside `{cond && …}`, or a CMS fallback, leaves the reference
  dangling. Use a conditional attribute or `aria-label`.
- **Never label a section with a heading inside a `.map()`.** Every iteration
  repeats the id (invalid HTML) and the section ends up named after its first
  card. Use `aria-label="…"` and keep looped headings id-free.
- **Sections in `src/layouts/` count.** Two lived there and render on every
  page — the industries strip in `BaseLayout`, the legal hub in `LegalLayout`.
- IDs are kebab-case section names and unique per page.

Verified 2026-10-03 on rendered HTML: **215 of 215 sections across 27 pages**,
0 duplicate IDs, 0 broken references.
