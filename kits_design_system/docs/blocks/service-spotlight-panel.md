# Service Spotlight Panel

**Status:** built, awaiting sign-off · **Live on:** `/services/brand` only
**Source:** `src/pages/services/[slug].astro` (inline — see [Recycling](#recycling))
**Data:** `src/lib/service-media.ts` · `src/lib/service-copy.ts`
**Last verified:** 2026-09-04

A vertical list inside one glass panel where exactly **one row is spotlit at a
time**. The spotlit row inverts to a light surface with dark text, reveals a
supporting line, grows its thumbnail, plays its clip, and washes the section's
full-bleed backdrop with its own poster.

Replaces the former "Capability Bento Tiles" in the capabilities slot. Reference
for the pattern was Framer's *Glass Showcase* marketplace component; the
implementation shares no code with it (that component is Framer-only React +
Framer Motion, and is not usable in this stack).

---

## 1. Classification

| Question | Answer |
|---|---|
| Tier today | **Page Block & Layout Section** — inline in one page, owns a full section including a viewport-wide backdrop |
| Tier it should reach | **Core Component**, the moment it is used on a second page |
| Widget parts it is built from | Spotlight Row · Ambient Backdrop Layer · Poster-First Video Thumb · Dwell Progress Hairline (see [`widgets.md`](../widgets.md)) |
| Animated? | **Yes** — include in the animated-block lint set |

Naming note: the block is named for where it lives today. If it is genuinely
recycled onto About / Work, rename to a content-neutral form (`Spotlight List`)
rather than carrying "Service" onto pages that have no services.

---

## 2. Anatomy

```
section.capabilities-section          overflow: clip  (contains the 100vw bleed)
└─ h2.eyebrow.caps-heading            section heading, styled as an eyebrow
└─ div.showcase[data-showcase]        JS root · carries .is-active / .is-cycling
   ├─ div.showcase-bg                 full-bleed, 100vw, aria-hidden
   │  ├─ img.showcase-bg-img × n      one per item WITH media · .is-visible
   │  └─ span.showcase-bg-scrim       gradient veil; lightens while .is-active
   └─ div.showcase-panel.glass-panel  the glass; its backdrop-filter does the blur
      └─ div.showcase-card[data-card] × n
         ├─ span.showcase-media       fixed aspect-ratio 11/8 box
         │  └─ video.showcase-video   OR span.showcase-placeholder
         ├─ span.showcase-meta        grid, rows: auto auto 0fr
         │  ├─ span.showcase-n        index, aria-hidden
         │  ├─ h3.showcase-title      real text, carries the id
         │  └─ span.showcase-blurb    supporting line, hidden until active
         ├─ button.showcase-toggle    full-card overlay; aria-labelledby the h3
         └─ span.showcase-progress    dwell countdown hairline
```

**Class prefix is still `showcase-*`.** Renaming to match the block name is an
open decision — do it before a second copy exists, not after.

---

## 3. States

| State | Trigger | What changes |
|---|---|---|
| Idle | default | transparent row, light text, subline hidden (`0fr` track), thumb 8.5rem, video paused on its poster |
| Active | `:hover`, `:focus-within`, or `.is-open` | row inverts to `--neutral-1` / `--neutral-9`, subline revealed, thumb 11.5rem, video plays, padding `--gap-2`→`--gap-4`, index turns `--theme-base`, backdrop crossfades to this item |
| Cycling | root has `.is-cycling` | progress hairline animates across the active row |
| Reduced motion | `prefers-reduced-motion: reduce` | all transitions off, backdrop crossfade off, no video playback, **auto-advance disabled entirely** |

**Zero layout shift is a hard requirement.** `.showcase-card { min-height: 10.5rem }`
is derived: expanded thumb (11.5rem × 8/11 = 8.36rem) + expanded padding
(2 × `--gap-4`). Verified — every row measures 168px before and after activating
one. If you change the thumb size or the active padding, **recompute it**.

---

## 4. Interaction model

| Input | Behaviour |
|---|---|
| Pointer (hover-capable) | hover spotlights; leaving restores the pinned row and restarts the idle timer |
| Keyboard | `Tab` to the row button, `Enter`/`Space` pins it; `:focus-visible` ring traces the whole card |
| Touch / no hover | **scroll-driven** — an IntersectionObserver with `rootMargin: '-48% 0px -48% 0px'` spotlights whichever row crosses the screen's centre. No scroll listener, no rAF |
| Idle | after `IDLE_MS` 2500 with no interaction, the panel advances one row per `DWELL_MS` 4000, looping. Hover / focus / click stops it |

Auto-advance runs **only** when: hover-capable device, panel intersecting the
viewport (`threshold: 0` — a ratio threshold can never be met when the panel is
taller than the viewport), not reduced-motion, and ≥2 items.

---

## 5. Motion inventory

For the animated-block lint. Every entry uses duration + easing tokens; there
are no bare timing values.

| Target | Property | Duration | Easing |
|---|---|---|---|
| `.showcase-bg-img` | `opacity` | `--duration-slow` | `--easing-smooth` |
| `.showcase-bg-scrim` | `background` | `--duration-slow` | `--easing-smooth` |
| `.showcase-card` | `background-color` | `--duration-normal` | `--easing-smooth` |
| `.showcase-card` | `padding` | `--duration-slow` | `--easing-editorial` |
| `.showcase-media` | `width` | `--duration-slow` | `--easing-editorial` |
| `.showcase-video` | `opacity` | `--duration-slow` | `--easing-smooth` |
| `.showcase-meta` | `grid-template-rows` | `--duration-normal` | `--easing-editorial` |
| `.showcase-blurb` | `opacity` | `--duration-normal` | `--easing-smooth` |
| `.showcase-n` | `color` | `--duration-normal` | `--easing-smooth` |
| `.showcase-progress` | `@keyframes showcase-dwell` (`scaleX` 0→1) | `--showcase-dwell` (4000ms, set from JS) | `linear` |

**Rules this block follows, worth linting for:**
- `aspect-ratio` is fixed and only `width` animates, so height follows
  proportionally — media is never stretched on one axis. See `governance.md` §8.
- Never animates `filter`, `backdrop-filter`, `box-shadow`, or `height`.
- `padding` and `grid-template-rows` are animated (both are layout properties).
  Permitted here only because the row reserves its height, so neither can shift
  a sibling. Any lint rule should allow these **only** alongside a reserved
  `min-height`.
- `linear` on the progress bar is deliberate — a countdown must read as uniform.

---

## 6. Token inventory

45 tokens. **Zero hardcoded colours.**

**Colour / surface** — `--bg` · `--fg` · `--fg-muted` · `--neutral-0` ·
`--neutral-1` · `--neutral-9` · `--theme-base` · `--color-surface-page` ·
`--color-surface-elevated` · `--noise-light`

**Type** — `--font-display` · `--font-mono` · `--font-weight-semibold` ·
`--font-weight-extrabold` · `--fluid-h3` (title) · `--fluid-body-md` (subline) ·
`--fluid-label` (index) · `--t-h5` · `--tracking-label` ·
`--core-line-height-none` · `--core-line-height-normal` · `--core-line-height-tight`

**Space** — `--gap-1` · `--gap-2` · `--gap-3` · `--gap-4` · `--gap-6` ·
`--gap-8` · `--gap-12`

**Shape** — `--radius-lg` · `--radius-2xl`

**Opacity** — `--opacity-0` · `--opacity-90` · `--opacity-100`

**Motion** — `--duration-normal` · `--duration-slow` · `--easing-smooth` ·
`--easing-editorial` · `--showcase-dwell` (block-local, set from JS)

**Layer** — `--layer-background` · `--layer-base` · `--layer-popover`

**Focus / cursor** — `--focus-brand` · `--focus-offset` · `--cursor-pointer`

### Non-token values, and why

| Value | Where | Justification |
|---|---|---|
| `1024px`, `640px` | media queries | breakpoints; no breakpoint tokens exist in `global.css` yet — **candidate for tokenising** |
| `1px` | scrim hairlines | sub-token hairline |
| `2px` | progress bar height | sub-token hairline |
| `8.5rem` / `11.5rem` / `10.5rem` / `6rem` / `7.5rem` / `48rem` / `76rem` | thumb, row, panel sizing | component dimensions; the scale tokens don't cover these. Kept in `rem` so they scale with root font size |
| `11 / 8` | `aspect-ratio` | matches the reference's 110×80 thumbnail |
| `2500` / `4000` ms | idle + dwell, in JS | **candidate for tokenising** as `--dwell-*` once a second animated block needs them |

---

## 7. Guardrails

**In place**
- Poster-first: `preload="none"`, `poster`, **no `autoplay`**; `.play()` only on
  activate. First paint ships ~48.5 KB of WebP posters and **0 bytes of video**.
- Media-less items render a gradient + `--noise-light` placeholder with the index,
  matching the work grid. Verified across pillars — Experience renders 10/10
  placeholders and fetches 0 bytes.
- Backdrop uses the same poster file as the `<video>`, so the crossfade costs no
  extra request; the panel's `backdrop-filter` does the blurring (the reference
  does the same — it carries 0 `filter: blur()`).
- Light-surface pair is explicit (`--neutral-1` bg **with** `--neutral-9` text),
  never `--neutral-1` left inheriting `--fg`. That pairing is the site's live
  1:1-contrast bug — see the frontend audit, finding 1.
- Auto-advance is gated on in-view + hover-capable + not reduced-motion + ≥2 items.
- On phones the subline is visually hidden but **kept in the accessibility tree**
  (`clip-path` pattern, not `display: none`), so screen-reader users get the same
  content as on desktop.

**Not yet in place** — see `pending.md` items 8–9
1. **Accent fallback.** `--theme-base` is injected only by `.service-page-wrapper`.
   Off that route it resolves to nothing. Should be
   `var(--theme-base, var(--color-accent-primary))` at every use.
2. **Media error fallback.** A 404'd clip renders an empty box. Needs `onerror`
   to swap in the placeholder — that code path already exists for item 06.
3. **Autoplay budget cap.** 4s × 10 rows means ~40s of idle dwell fetches the
   full ~11.5 MB. Cap at one lap, or preload only the next row.
4. **Bleed containment.** The `100vw` backdrop relies on `overflow: clip` on the
   section. Inside any ancestor with `transform` / `filter` / `contain`, that
   ancestor becomes the containing block and the bleed breaks silently.
5. **Empty / single-item states.** Guarded at the page level today
   (`showcaseEnabled`), which will not survive extraction.
6. **Item-count ceiling.** 10 rows = 1,882px. Engineering's 20 would be ~3,400px
   in one column. The two-column `data-dense` path (>12 items) is **untested
   against real content**.

---

## 8. Recycling

Three couplings must break before this moves to a second page:

1. **It is not a component.** ~73 lines of markup, ~335 lines of scoped CSS,
   ~110 lines of JS, inline in `[slug].astro`. Wants to be
   `src/components/ServiceSpotlightPanel.astro` taking
   `{ items, heading, accent, dwellMs }`.
2. **Route coupling** — `--theme-base`, per guardrail 1.
3. **Data coupling** — `MEDIA_BY_PILLAR` and `COPY_BY_PILLAR` are keyed by pillar
   slug. A recycled block has no pillar. Lookups should stay page-side; the
   component should take fully resolved items.

**Rollout switch:** `showcaseEnabled` in `[slug].astro`. Brand-only today; the
other five pillars still render the original `.caps-grouped` panels, verified
unchanged. Widen that one constant after sign-off.

---

## 9. Open decisions

| # | Decision | Note |
|---|---|---|
| 1 | Rename classes `showcase-*` → to match the block name | Cheapest now, while there is exactly one copy |
| 2 | `aria-expanded` on the row button | The subline never leaves the accessibility tree, so nothing genuinely "expands" for AT. Either drop the attribute or make it a real disclosure |
| 3 | Pause control for auto-advance | WCAG 2.2.2 covers anything auto-updating past 5s. Pausing on hover/focus is a partial mitigation; reduced-motion disables it outright |
| 4 | Display headline | The section has an eyebrow-styled `h2` only, while every sibling section has eyebrow + headline. Copy must come from the user |
| 5 | Dummy copy | 3 of 10 sublines (Brand Narrative, Employer Branding, Brand Activation) are placeholders — **user has chosen to keep them for now**. Fenced and labelled in `service-copy.ts` |
