# Client Assembly Grid

**Status:** built, awaiting sign-off · **Live on:** `/` (homepage)
**Source:** `src/pages/index.astro` (inline — see [Recycling](#8-recycling))
**Animation:** `data-scroll="assemble"` in `src/lib/scroll-animations.ts`
**Last verified:** 2026-09-08

A full-viewport band of uniform logo tiles that **scatter, converge into the grid,
hold, and scatter back out** as the page scrolls through it. The section title is
not stacked above the grid — it occupies **two cells inside it**, at exactly one
tile's height, so the whole block reads as a single grid rather than a heading
plus a logo strip.

Rebuilt from the live Framer homepage's "Trusted by leading brands" section.

---

## 1. Classification

| Question | Answer |
|---|---|
| Tier today | **Page Block & Layout Section** — inline in one page, owns a full-viewport band |
| Tier it should reach | **Core Component**, once used on a second page |
| Widget parts | Logo Tile · Inline Grid Title Cell · Assemble Scatter Field (see [`widgets.md`](../widgets.md)) |
| Animated? | **Yes** — include in the animated-block lint set |
| Sibling block | [Service Spotlight Panel](service-spotlight-panel.md) — shares the token discipline and the "reserve, don't reflow" rule |

Name is content-neutral on purpose: it describes the mechanic (a grid that
assembles), not the copy, so it survives being reused for partners, press,
certifications or tools.

---

## 2. Anatomy

```
section.logos-band              min-height:100dvh · overflow:hidden · centres content
└─ div.wrap.logos               flex column
   └─ ul.logo-grid              flex-wrap · container-type:inline-size
      │                         publishes --logo-col (one column's width)
      ├─ li.logo-tile × N       aspect-ratio 16/9 · img at 62% × 44%
      ├─ li.logo-grid-title     2 columns + 1 gap wide · exactly one tile tall
      │  └─ h2.logos-heading    two-tone; two lines ≥640px, one line below
      └─ li.logo-tile × M
```

**Cell arithmetic.** The title is a grid cell, not a band, so the counts have to
divide cleanly:

| | Columns | Logos | Title cells | Total cells | Rows |
|---|---|---|---|---|---|
| ≥1024px | 6 | 34 | 2 | 36 | 6 |
| 640–1023px | 6 | 34 | 2 | 36 | 6 |
| <640px | 4 | 32 | full row | — | 8 + title row |

`logoSplit = 14` puts the title in the middle of row 3 with **two logos either
side**. On phones the first group drops to 12 (`nth-child(13)`/`(14)` hidden) so
both halves stay full rows of 4.

---

## 3. The two rules this block exists to demonstrate

**Fixed box ratio across breakpoints.** The tile is `aspect-ratio: 16 / 9`.
Width comes from the column count; height follows proportionally. An earlier
version set width from `flex-basis` and height from `min-height`, which made the
box 2.16 at 1440, 1.22 at 768 and 1.38 at 375 — a direct breach of
`governance.md` §8. Two things silently defeat `aspect-ratio` and are guarded:

- `align-items` must be `flex-start`. The flex default (`stretch`) grows items to
  the tallest in their row and overrides the ratio.
- The logo is sized as a **share of the tile** (`62%` × `44%`), never a px cap.
  A px cap plus padding can exceed the ratio height and force the box taller.

**Equal row and column gaps.** One `gap` drives both axes. Do not add
`align-content: space-evenly` to spread rows — it overrides the row gap and the
grid stops reading as a grid. Vertical slack is handled by centring the band.

---

## 4. Measured behaviour

| | 1440×900 | 768×1024 | 375×812 |
|---|---|---|---|
| Tile | 190 × 107 | 107 × 60 | 77 × 43 |
| Ratio | 1.78 | 1.78 | 1.79¹ |
| Title cell | 392 × 107 | 227 × 60 | 343 × 43 |
| Heights match | yes | yes | yes |
| Column gap | 12px | 12px | 8px |
| Row gaps | 12, 11¹ | 13, 12¹ | 8, 9¹ |
| Band height | 900 (1 vh) | 1024 (1 vh) | 812 (1 vh) |
| Top / bottom slack | 35 / 34 | 88 / 87 | 182 / 178 |
| Horizontal overflow | none | none | none |

¹ integer rounding on `offsetWidth`/`offsetHeight`, not a real difference.
Measure the **untransformed layout box** — `getBoundingClientRect` returns the
*rotated* bounding box mid-animation and will show false ratio drift.

Title width is exactly `2 columns + 1 gap` (392 = 190×2 + 12).

---

## 5. Motion inventory

For the animated-block lint.

| Target | Property | Timing |
|---|---|---|
| `.logo-tile` | `background-color`, `border-color` | `--duration-normal` / `--easing-smooth` |
| `.logo-tile img` | `filter`, `opacity` | `--duration-normal` / `--easing-smooth` |
| `.logo-grid` children | `x`, `y`, `rotate`, `scale` | GSAP, scroll-scrubbed |

**`data-scroll="assemble"`** — scrubbed timeline over `top bottom` → `bottom top`,
`scrub: 0.5`:

| Progress | State |
|---|---|
| 0 → 0.42 | scattered → grid (`scale` 0.45 → 1, `rotate` → 0) |
| 0.42 → 0.58 | assembled, holding |
| 0.58 → 1 | grid → scattered, same offsets |

Each child's scatter offset is its own position pushed outward from the grid
centre by `1.1–2.6×`, plus jitter of ±130px / ±110px and ±15° rotation, seeded
deterministically from its index so the layout is identical on every load.

Children carrying `data-assemble-static` are excluded — that is how the title
cell stays put while the logos move around it.

**Rules this block follows:**
- All motion is `transform` — no per-frame layout, and it cannot alter a child's
  aspect ratio. *(The reference animates `width`/`height` on ~27 images instead.)*
- The parent must clip (`overflow: hidden` on `.logos-band`); scattered tiles sit
  well outside the grid box.
- `prefers-reduced-motion: reduce` disables it entirely — `initScrollAnimations`
  returns before any `[data-scroll]` handling.

---

## 6. Token inventory

19 tokens. **Zero hardcoded colours.**

**Colour / surface** — `--fg` (bright half of the title) · `--fg-muted` (muted
half, and the idle logo) · `--neutral-0` · `--neutral-8` (tile surface via
`color-mix`) · `--line` (tile border, band top rule)

**Type** — `--fluid-h2` (title, 36 → 24px) · `--font-weight-regular` ·
`--core-line-height-tight`

**Space** — `--gap-2` (phone gap) · `--gap-3` (grid gap) · `--gap-8` (band padding)

**Shape** — `--radius-lg` · `--stroke-thin`

**Opacity** — `--opacity-soft` (idle logo) · `--opacity-100` (hover)

**Motion** — `--duration-normal` · `--easing-smooth`

**Block-local** — `--logo-cols` (column count per breakpoint) · `--logo-col`
(one column's width, published for the title cell to consume)

### Non-token values, and why

| Value | Where | Justification |
|---|---|---|
| `640px` | media queries | breakpoint; `global.css` still has no breakpoint tokens — **candidate for tokenising** (same finding as the Spotlight Panel) |
| `62%` / `44%` | logo max-width / max-height | proportional inset; must stay relative so content can never break the tile ratio |
| `100%` / `100dvh` | band, title flex-basis | viewport and container relative by design |
| `16 / 9` | tile `aspect-ratio` | the block's fixed box ratio |
| `0.45`, `0.42`, `0.5`, `30`, `260`, `220` | assemble tuning, in JS | **candidates for tokenising** alongside the Spotlight Panel's dwell values |

---

## 7. Guardrails

**In place**
- `container-type: inline-size` on the grid so `--logo-col` can be consumed for
  *height*. A `%` would resolve against the container's height and fail silently.
- Title cell height is derived from the same `--logo-col` as the tiles, so the
  two can never drift apart.
- Mockup repeats carry `aria-hidden="true"` and an empty `alt` — each brand is
  announced and indexed exactly once regardless of how many tiles are drawn.
- Band uses `min-height`, not `height`, so it grows rather than clipping if the
  logo set outruns the screen.
- `overflow: hidden` on the band clips scattered tiles.

**Not yet in place**
1. **Mockup padding is still on.** 19 distinct logo images exist in the repo
   (38 files, 19 unique by content hash); the live Framer section has 28. The set
   is repeated up to 34. Fenced with a `MOCKUP PADDING — REMOVE ONCE THE REAL
   LOGO SET IS COMPLETE` comment. **User has chosen to retain it for now.**
2. **Duplicate `logoPath` values.** Airtel Xstream / Airtel XSafe point at the
   same file, so the same logo renders twice even before padding. Dedupe by
   `logoPath` when the real set lands.
3. **Phone slack.** 182 / 178px top and bottom — balanced, but generous. It is
   arithmetic: 16:9 tiles at 4 columns on a 375px screen are 43px tall, so 9 rows
   only reach ~450px inside an 812px band. Three columns would fill it (tiles
   109 × 61) but 32 does not divide by 3.
4. **Logos are not links.** Neither is the reference. 15 of 20 clients have a
   linked case study, so the click-through exists in the data if wanted.
5. **`nth-child` ranges are hardcoded** to the 34-logo count with the title as
   child 15. They move if `LOGO_TOTAL` or `logoSplit` changes.

---

## 8. Recycling

Same three couplings as the Spotlight Panel:

1. **Not a component.** ~136 lines of scoped CSS plus markup inline in
   `index.astro`. Wants to be `src/components/ClientAssemblyGrid.astro` taking
   `{ items, heading, columns, split }`.
2. **Count coupling.** Column counts, `logoSplit` and the phone `nth-child`
   ranges are interdependent. A component should derive them from one prop.
3. **Data coupling.** Reads `client.logoPath` from Sanity with a curated
   fallback; a recycled block should take resolved items.

The animation is already reusable — `data-scroll="assemble"` works on any
flex/grid container of children and is documented in `motion.md`.

---

## 9. Open decisions

| # | Decision | Note |
|---|---|---|
| 1 | Block name | **Client Assembly Grid** proposed. Alternatives: *Trusted Brands Grid* (content-led), *Logo Assembly Band* (form-led). One rename touches this doc, `components.md`, `widgets.md` and the `.logo-*` class prefix |
| 2 | Class prefix | Still `.logo-*` / `.logos-*`. Align to the block name before a second copy exists |
| 3 | Phone: 32 logos vs a filled screen | Can have one, not both, at 16:9. User chose 32 |
| 4 | Real logo set | 9 images still only on the Framer CDN; importing them takes the count to 28 and removes most padding |
