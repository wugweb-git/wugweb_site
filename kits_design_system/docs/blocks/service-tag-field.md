# Service Tag Field

**Status:** built, awaiting sign-off · **Live on:** `/` (homepage, "What we do")
**Source:** `src/pages/index.astro` (markup + ~190 lines scoped CSS)
**Behaviour:** `src/lib/draggable-tags.ts` (~323 lines)
**Last verified:** 2026-09-08

Six pastel pill "tags", one per service pillar, scattered across a field. They
fly in from outside on scroll, can be dragged freely with momentum and a fading
trail, always rise to the front when touched, and expand in place to reveal
media, copy and a link. "Learn more" grows the card to fill the viewport and
then navigates to the service page.

Rebuilt natively from the Framer *Draggable Tags* reference. Shares no code with
it: that component is Framer-only React + Framer Motion. This uses GSAP 3.15's
**Draggable + InertiaPlugin + Flip + ScrollTrigger**, all already installed —
**no new dependency, and no React**.

---

## 1. Classification

| Question | Answer |
|---|---|
| Tier today | **Page Block & Layout Section** — inline in one page |
| Tier it should reach | **Core Component**, once used on a second page |
| Widget parts | Service Tag · Tag Expand Panel · Tag Chip Toggle · Drag Echo Trail |
| Animated? | **Yes** — include in the animated-block lint set |
| Siblings | [Service Spotlight Panel](service-spotlight-panel.md) · [Client Assembly Grid](client-assembly-grid.md) |

---

## 2. Anatomy

```
div.tag-field[data-tag-field]     the stage; publishes --tag-chip / --tag-chip-glyph
└─ div.tag[data-tag] × 6          absolute, --tag-x / --tag-y / data-tag-rot
   ├─ span.tag-media              height 0 collapsed · video preload="none"
   ├─ button.tag-face             drag handle + expand toggle
   │  ├─ span.tag-n               pillar index, mono
   │  ├─ span.tag-label           lowercase, bold, 82% ink
   │  └─ span.tag-toggle          round + chip, rotates 45° to a cross
   └─ div.tag-body                height 0 collapsed
      └─ div.tag-body-inner
         ├─ p.tag-desc            service copy
         └─ a.tag-link            "Learn more" → full-bleed launch
span.tag-echo                      transient drag trail, self-removing
```

**Open order is media → title → copy → link.** The media is a sibling *above*
`.tag-face`, not inside `.tag-body` — that is the whole reason for two
independently collapsing panels rather than one.

---

## 3. Reference parity

Feature list from the reference, and where each landed:

| Reference feature | Status |
|---|---|
| Entry animation, spring physics, staggered | ✅ fly in from outside the field, `back.out(1.5)`, 0.08s random stagger |
| Freely draggable, mouse + touch | ✅ Draggable + InertiaPlugin; momentum verified |
| Smart layering — dragged tag to the front | ✅ running z counter; 1000 during drag vs siblings 11–15 |
| Click to expand, accordion | ✅ height tween + staggered content rise |
| Full per-tag customisation | ✅ position, rotation, colour, number, copy, media, link — all per tag in `serviceTags` |
| Instant prop updates (Framer canvas) | ➖ N/A — Framer-editor feature, no equivalent |
| Touch support | ✅ pointer events; `touch-action: none` scoped to the tag |

Component-level props: tag count, background, drag scale, animate-on-load are all
expressed in data/CSS. **Ambient glow** and the **Fade Up / Instant** entry
variants are not built — see [Open decisions](#9-open-decisions).

**Two corrections to the reference's own description**, both measured:
- Its page is exactly one viewport tall (document 718px = viewport 718px) and
  **cannot scroll**, so it has **no exit animation**. Ours reverses on scroll-out
  because our page scrolls — that is our addition, not parity.
- Its entry could not be captured frame-by-frame (it completes during page load).
  Only the settle tail was measured: still drifting at ~650ms, static by ~1.2s,
  with no opacity or scale change in that window. The spring is matched in
  character, not frame-for-frame.

---

## 4. States

| State | Trigger | What changes |
|---|---|---|
| Resting | default | `--shadow-md`, fully round (`--r-pill`), media + body at height 0 |
| Hover | pointer | `--shadow-xl` |
| Dragging | pointer down + move | `--shadow-2xl`, scale 1.05, `--cursor-dragging`, z → front, echo trail |
| Open | tap / Enter / Space | `--shadow-xl`, radius → `--radius-2xl`, panels open, `+` rotates 45°, video plays |
| Launching | "Learn more" | `position: fixed`, fills viewport, siblings fade, rotation → 0, then navigate |
| Reduced motion | `prefers-reduced-motion` | no fly-in, no trail, no drag scale, instant expand, video never plays, link navigates normally |

---

## 5. Motion inventory

| Target | Property | Timing |
|---|---|---|
| `.tag` (entry/exit) | `x, y, rotation, scale, opacity` | 1.1s `back.out(1.5)`, stagger 0.08 random |
| `.tag-media`, `.tag-body` | `height` | 0.45s `power3.out` |
| panel children | `y, opacity` | 0.4s `power2.out`, stagger 0.07, delay 0.1 |
| `.tag` (drag) | `scale` 1 → 1.05 | 0.2s / 0.35s `power2.out` |
| `.tag-echo` | `opacity, scale` | 0.5s `power2.out`, spawned every 55ms |
| `.tag` (launch) | FLIP position + `rotation` → 0 | 0.55s `power3.inOut` |
| `.tag` | `box-shadow`, `border-radius` | `--duration-normal` `--easing-smooth` |
| `.tag-toggle` | `transform` (45°), `background` | `--duration-normal` / `--duration-fast` |

Entry/exit is a `toggleActions: 'play reverse play reverse'` ScrollTrigger over
`top 85%` → `bottom 40%`. **The end must stay well inside the viewport**: the
field is shorter than the screen, so at `bottom 15%` the range was already
passed on entry, firing `onLeave` and reversing immediately.

`ScrollTrigger.refresh()` runs on load — the homepage keeps growing as lazy
media arrives, and stale cached positions stopped the intro firing at all.

Height and `position` are animated here (both layout properties). Permitted
because the tag is absolutely positioned and cannot reflow a sibling.

---

## 6. Token inventory

45 tokens. **Zero hardcoded colours.**

**Colour** — `--neutral-0` · `--neutral-9` (label ink at 82%) · `--neutral-10` ·
`--tag-hue` (per-tag, set to the pillar's `--svc-*`)

**Type** — `--font-display` · `--font-mono` · `--font-weight-bold` ·
`--font-weight-semibold` · `--fluid-h1` (label, 32→48) · `--fluid-body-md` ·
`--fluid-label` · `--tracking-label` · three `--core-line-height-*`

**Space** — `--gap-1` `--gap-2` `--gap-3` `--gap-4` `--gap-5` `--gap-6` `--gap-8` `--gap-10`

**Shape** — `--r-pill` (collapsed) · `--radius-2xl` (open) · `--radius-full` (chip)

**Elevation** — `--shadow-md` → `--shadow-xl` → `--shadow-2xl`

**Motion** — `--duration-fast` · `--duration-normal` · `--easing-out` · `--easing-smooth`

**Layer** — `--layer-background` (echoes) · `--layer-modal` (launch)

**Cursor** — `--cursor-grab` · `--cursor-dragging` · `--cursor-loading`

**Focus** — `--focus-brand` · `--focus-offset` · `--opacity-0`

**Block-local** — `--tag-x` / `--tag-y` / `data-tag-rot` (per tag) ·
`--tag-chip` / `--tag-chip-glyph` (per breakpoint)

### `+` chip size map

| Tier | Chip | Glyph | Fill |
|---|---|---|---|
| Phone `<640` | 36px | 16px | 44% |
| Tablet `640–1023` | 40px | 20px | 50% |
| Desktop `≥1024` | 44px | 24px | 55% |

Both values are set on `.tag-field`, so chip and glyph can never drift apart.

### ⚠ `--shadow-lg` is unusable

`global.css:397` ("Legacy shadow aliases") redefines `--shadow-lg: var(--shadow-md)`,
overriding the real scale value at `:385`. Same `:root`, later wins — so **`lg`
and `md` are identical site-wide**, verified by dumping resolved tokens. This
block steps `md → xl → 2xl` to get three genuinely distinct levels. Deleting
that one line would restore `lg` everywhere but visibly change shadows across
the site — **user decision, not taken**.

---

## 7. Guardrails

**In place**
- Clips are `preload="none"` and only download when a tag is opened — verified
  9 mp4 requests before opening, 12 after.
- Resting positions are **clamped into the field** once real widths are known
  (after fonts settle, and on resize). Authored `%` positions are art-directed
  for a wide field; at 375px three tags overflowed and **the page scrolled
  horizontally**. Now `docW == viewport`.
- Drag echoes self-remove — max ~6 alive, 0 after release.
- Intro stops replaying once the visitor has dragged anything (`tagdragged`).
- Launch respects modified clicks (⌘/ctrl/shift/middle) and reduced motion.
- Copy is the service's own text from `hardcodedServices`, not written for the
  component.

**Not yet in place**
1. **No posters on the clips** — there is a blank box for a beat after opening.
   Same `qlmanage` + `cwebp` recipe used for the Brand spotlight posters applies
   (ffmpeg is not installed on this machine).
2. **Launch shows the collapsed card scaled up** — the media stays small in a
   corner rather than growing to fill, so it reads as a rectangle expanding
   rather than opening into the page's hero.
3. **Drag is pointer-only** — a keyboard user can focus and expand a tag but
   cannot move one. Arrow-key nudging would close this.
4. **Dead markup** — the old `<ol class="service-cards">` is still in the DOM
   with `hidden`, and its CSS is unused.
5. **Composition unreviewed** — the Browser pane's screenshot capture returned
   black at every size for this entire session, so positions, rotations and
   colour balance have never been looked at, only measured.

---

## 8. Recycling

1. **Not a component.** Markup + ~190 lines of scoped CSS in `index.astro`;
   behaviour is already extracted to `src/lib/draggable-tags.ts` and is generic
   (it drives any `[data-tag-field]`). Wants a
   `src/components/ServiceTagField.astro` taking `{ tags }`.
2. **Colour coupling.** `--tag-hue` is set inline from `--svc-<slug>`, so a
   recycled field needs its own hue source.
3. **Data coupling.** Built from `pillars` + `hardcodedServices`; a component
   should take resolved items.

---

## 9. Open decisions

| # | Decision | Note |
|---|---|---|
| 1 | Block name | **Service Tag Field** proposed. Alternatives: *Draggable Tag Field* (mechanic-led), *Pillar Tag Scatter*. Class prefix is already `.tag-*` |
| 2 | Ambient glow prop | Reference has a component-level glow + opacity; not built. The page already has `.card-glow` / `.hero-glow` patterns to reuse |
| 3 | Entry variants | Reference offers Fly In / Fade Up / Instant. Only Fly In is built |
| 4 | Exit on scroll-out | Our addition — the reference cannot scroll. Drop it if the reverse reads as fussy |
| 5 | Tag count | Fixed at 6 (one per pillar). Reference supports 1–10 |
