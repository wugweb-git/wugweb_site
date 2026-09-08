# Bento Block

**Status:** built, awaiting sign-off · **Live on:** `/about` ("Why Wugweb?") and all six `/services/[slug]` pages ("Why us?")
**Source:** `src/components/BentoBlock.astro` (~644 lines — the only true component of the four blocks)
**Layout data:** `src/pages/services/[slug].astro` (`BENTO_LAYOUTS`) · `src/pages/about.astro` (`bentoTiles`)
**Enter/exit:** `src/lib/scroll-animations.ts`, `data-scroll="bento"`
**Last verified:** 2026-09-09

A column-based bento: three columns of tiles at unequal heights, each tile
free to differ in weight, content kind, tone, media type and media treatment.
Tiles rise in a column-aware stagger on scroll and reverse on the way out.
Hovering the block dims every tile but the one under the pointer.

Rebuilt from the "Why Wugweb?" bento on the Framer reference, with the surface
treatment (bevel, inner light, elevation) taken from *Premium Bento*. No React,
no new dependency — Astro markup, scoped CSS, GSAP ScrollTrigger.

The defining constraint: **a bento must never resolve into an even grid.** That
is enforced in code, not by review — see §4.

---

## 1. Classification

| Question | Answer |
|---|---|
| Tier today | **Core Component** — `src/components/BentoBlock.astro`, used by 7 pages |
| Widget parts | Bento Tile · Bento Media · Bento Stat · Bento Stack · Bento Checklist · Bento CTA Strip · Bento Cursor |
| Animated? | **Yes** — include in the animated-block lint set |
| Siblings | [Service Spotlight Panel](service-spotlight-panel.md) · [Client Assembly Grid](client-assembly-grid.md) · [Service Tag Field](service-tag-field.md) |

It is the only one of the four that already reached component tier. The other
three still live inline in a page and want extracting.

---

## 2. Anatomy

```
section.wrap.bento-block
├─ h2[data-reveal]                     optional heading
├─ p.bento-lede[data-reveal]           optional lede
├─ span.bento-cursor[data-bento-cursor]  invert puck, mix-blend-mode: difference
└─ div.bento[data-bento][data-scroll="bento"]
   └─ div.bento-col × columns          flex column, min-height 39rem ≥1024
      └─ a|article.bento-tile          <a> when the tile has an href
         ├─ span.bento-n               01–06, gated by `showNumbers`
         ├─ span.bento-eyebrow         optional top-left label
         ├─ span.bento-mark            optional `+` glyph, top-right
         ├─ div.bento-media.is-cover   absolute, behind the copy, + scrim
         │  └─ img | video[preload=none][muted][playsinline]
         ├─ div.bento-media.is-inset   contained block, copy sits beneath
         └─ div.bento-body
            ├─ h3 / p                  reason
            ├─ .bento-value/.bento-label   stat
            ├─ ul.bento-list           checklist
            ├─ ul.bento-stack          stack, icon + name
            ├─ ul.bento-chips          floating chips over cover media
            ├─ .bento-caption          hover-revealed
            └─ .bento-link             CTA strip
```

---

## 3. Props

### `Props`

| Prop | Type | Default | Note |
|---|---|---|---|
| `heading` | `string?` | — | Section h2 |
| `lede` | `string?` | — | Standfirst under the heading |
| `tiles` | `BentoTile[]` | **required** | The whole layout — see below |
| `columns` | `number` | `3` | Collapses to 2 then 1 on smaller screens |
| `showNumbers` | `boolean` | `true` | 01–06 markers. **Pass `false` where the tiles are parallel claims rather than a sequence** — numbering non-sequential content is a generic tell. `/about` keeps them (they read as a list of four); the service pages do not |

### `BentoTile`

Every axis of variation is data, so a new arrangement is a reordered array —
never a CSS edit.

| Field | Values | Note |
|---|---|---|
| `col` | `0 \| 1 \| 2` | Column membership |
| `span` | `tall \| mid \| short \| slim \| strip` | Height weight — 519 / 343 / 250 / 172 / 90 |
| `kind` | `reason \| stat \| cta \| stack \| media \| checklist` | Content shape |
| `tone` | `dark \| light \| accent` | Default dark |
| `title` `body` | `string` | Reason copy |
| `eyebrow` `mark` `headline` `align` | | Chrome and copy placement |
| `list` | `string[]` | `kind: 'checklist'` |
| `chips` | `{ value, label? }[]` | Floating over cover media |
| `value` `label` | `string` | `kind: 'stat'` |
| `image` `video` `poster` | `string` | `poster` is **required** for a cover video, or the tile paints empty before play |
| `fit` | `cover \| inset` | Full-bleed behind the copy, or contained with copy beneath |
| `items` | `{ name, iconPath? }[]` | `kind: 'stack'` |
| `caption` | `string` | Held under the copy, revealed on hover |
| `href` `linkLabel` | `string` | Makes the whole tile an `<a>` |

---

## 4. The no-even-grid guard

Two ways a bento goes flat, both thrown at render rather than left for someone
to catch in a screenshot:

```ts
// 1 — every tile the same weight
if (new Set(weights).size < 2) throw new Error(…'renders as an even grid. Vary the weights.')

// 2 — every column an identical weight sequence, which lines the seams up into
//     rows even when the weights themselves differ
if (new Set(columnSignatures).size === 1) throw new Error(…'Stagger the columns.')
```

Guard 2 is the subtle one: `tall>short` × 3 columns passes guard 1 and still
reads as a two-row grid.

---

## 5. Sizing contract — why it cannot overflow

```css
.bento-tile { flex: 0 0 auto; }              /* basis auto, shrink 0 */
.bento-tile.is-tall { min-height: 15rem; flex-grow: 519; }
…
.bento-col { min-height: 39rem; }
```

- **`flex-basis: auto`** — a tile first takes the height its own content needs.
- **`flex-grow: <weight>`** — only the *leftover* space is shared out by weight.
- **`flex-shrink: 0`** is load-bearing: an explicit `min-height` overrides the
  automatic flex minimum, so with `shrink: 1` a tile could compress below its
  own content and clip.
- The grid stretches all columns to the tallest, so bottoms sit level.

The cost: **weights are a target, not a guarantee** — heavy content wins. That
is the correct trade. A tile that ran long would otherwise clip its own copy.

Verified 1024 → 1728 across all six pillars: columns level, no clipped text.

> **Auditing note.** `scrollHeight - clientHeight` reads 2–4px on media and
> scrim tiles even when nothing is clipped: the media is deliberately
> over-scaled (1.015) so the hover zoom has room, and the scrim is a
> pseudo-element. Both inflate the scroll overflow area and both are contained
> by `overflow: hidden`. Measure real element rects against `clientHeight`
> instead — this cost most of a session to work out twice.

---

## 6. Motion

| Moment | What happens |
|---|---|
| Enter | `data-scroll="bento"` → tiles `y: 48 → 0`, `scale: 0.96 → 1`, `opacity: 0 → 1`, `stagger 0.07` from start, `power3.out` |
| Exit | Same tween reversed — `toggleActions: 'play reverse play reverse'` |
| Hover, block | `.bento:hover .bento-tile { filter: brightness(.66) saturate(.8) }` |
| Hover, tile | `.bento .bento-tile:hover { filter: none }` — the hovered tile is the only lit one |
| Hover, media | `transform: scale(1.015) → 1.06`, `0.45s var(--easing-smooth)` |
| Cursor | `.bento-cursor`, `mix-blend-mode: difference`, rAF-throttled `pointermove` |
| Video | `IntersectionObserver` play/pause, `preload="none"` — **0 mp4 bytes on load**, poster only |

**Two rules learned the hard way, both live in the code as comments:**

1. **Dimming uses `filter`, never `opacity`** — GSAP owns `opacity` on these
   tiles for the enter/exit tween. Two owners on one property is the bug below.
2. **Never CSS-transition a property GSAP animates.** `transform` was in the
   tile's transition list while GSAP tweened it; GSAP captured a
   mid-transition baseline and the tiles settled at their from-state.

`ScrollTrigger` `start: 'top 82%'`, `end: 'bottom 35%'`. The end deliberately
stays inside the viewport: this section is shorter than a laptop screen, and a
ratio-based end would already be passed on entry — firing `onLeave` and
reversing instantly.

`@media (hover: none), (prefers-reduced-motion: reduce)` hides the cursor puck.

---

## 7. Surface treatment

```css
box-shadow:
  inset 0 1px 0 color-mix(in srgb, var(--neutral-0) 9%, transparent),   /* top light */
  inset 0 -1px 0 color-mix(in srgb, var(--neutral-10) 45%, transparent), /* bottom shade */
  var(--shadow-md);                                                      /* elevation */
```

Bevel by two inset hairlines rather than a border, so the tile reads as a
raised slab under a single light source. Radius `--radius-2xl` throughout.

Padding scales with weight, so a tall tile is not a small tile blown up:
`is-tall → --gap-8` · default `--gap-6` · `is-slim`/`is-short` → `--gap-5`.
Type scales with it too: `--t-h5` default, `--fluid-h4` on mid, `--fluid-h3` on
tall.

> `--shadow-lg` is aliased to `--shadow-md` at `global.css:397` (legacy alias),
> so elevation steps go `md → xl → 2xl` here. Logged as pending 9c; not changed
> globally.

---

## 8. Per-page layouts

`/about` and each of the six service pages get a different arrangement of the
same six slots. On the service pages this is a table, not six copies of the
markup — `BENTO_LAYOUTS` in `[slug].astro`, one row per slot as
`[column, weight, role]`:

| Pillar | Layout | col 0 | col 1 | col 2 |
|---|---|---|---|---|
| Strategy | A — weight front-left, CTA under it | `tall` `strip·cta` | `short` `mid` | `slim·media` `tall` |
| Brand | B — hero in the middle column | `short` `mid` | `tall` `strip·cta` | `mid` `slim·media` |
| Experience | C — opens on media, weight falls right | `slim·media` `tall` | `mid` `short` | `tall` `strip·cta` |
| Engineering | D — CTA leads the middle column | `mid` `short` | `strip·cta` `tall` | `tall` `slim·media` |
| Growth | E — tall left, media closing beneath | `tall` `slim·media` | `strip·cta` `mid` | `short` `tall` |
| Operations | F — staggered, heaviest tile last | `short` `tall` | `mid` `slim·media` | `tall` `strip·cta` |

Roles `0–3` are the service's own `why` entries; `cta` and `media` are the two
flexible slots. All six pass both guards.

**Media allocation.** Only three of six slots carry motion — the first `tall`
(which also takes the light tone and anchors the block), the `mid` reason, and
the media slot. Clips are handed out in layout order so no two tiles play the
same file, and a pillar with a single clip spends it on the anchor rather than
a filler. Pillars with no capability media fall back to a still, not an empty
frame — today only Brand has clips.

---

## 9. Tokens used

Radius `--radius-2xl`, `--r-pill` · Spacing `--gap-3/5/6/8` · Type `--t-h5`,
`--fluid-h3/h4`, `--fluid-body-sm`, `--lh-tight`,
`--core-line-height-relaxed`, `--font-weight-semibold` · Colour `--surface`,
`--line`, `--fg`, `--fg-muted`, `--neutral-0`, `--neutral-10` · Effects
`--shadow-md`, `--stroke-thin`, `--easing-smooth` · Layer `--layer-base`.

No hardcoded colour, spacing, radius, opacity or shadow.

---

## 10. Known gaps

1. **Composition unreviewed.** The Browser pane's screenshot capture returned
   black at every viewport for the whole session this was built in, so the
   arrangement, tone balance and media crop have only ever been *measured*,
   never looked at. Every claim above is a DOM measurement.
2. **Cursor invert is probably surplus.** Both references argue for
   chrome-free, interaction-led hierarchy, and the `filter` dimming already
   does that job. Recommend cutting it — see §11.
3. **Only Brand has clips.** The other five pillars render a still in the media
   slot. Either source clips or accept the still as the norm.
4. **`stat`, `checklist`, `stack` and `chips` kinds are unused** on live pages.
   Built and styled, never exercised — treat as unverified.
5. **`headline` and `align: start`** likewise unused.

---

## 11. Open decisions

| # | Decision | Note |
|---|---|---|
| 1 | Block name | **Bento Block** — the user's own name for it; class prefix `.bento-*` |
| 2 | Cursor invert | Recommend cutting. Kept for now pending a look at it |
| 3 | Layout selection | Table keyed by pillar order. Alternative: hash the slug, which survives reordering the pillars but makes the mapping unreadable |
| 4 | Stat tiles | Approved in principle, but every figure would have to be invented. Not used until there are real numbers to stand behind |
| 5 | 4-column variant | `columns` prop supports it; the weight table and `min-height` are tuned for 3 |
| 6 | Extracting the layout table | If a third surface wants a bento, `BENTO_LAYOUTS` should move out of `[slug].astro` |
