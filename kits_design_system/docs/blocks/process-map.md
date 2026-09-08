# Process Map

**Status:** built, awaiting sign-off · **Live on:** `/services/experience` ("How we work")
**Source:** `src/components/ProcessMap.astro` (~560 lines — component, geometry, behaviour)
**Config:** `src/pages/services/[slug].astro` (`MAP_BY_PILLAR`)
**Last verified:** 2026-09-09

An orbital process diagram, full-viewport, held in one block. Each phase is a
hub; its steps orbit it as labelled satellites. Hubs chain left to right, so the
sequence stays unmistakable — the one thing a force-directed graph cannot tell
you, and a process is nothing without it. The richness sits in the orbits.

Replaces the five-card `.framework-flow` glass grid on `/services/[slug]`.

Built from three Framer references — *contextgraph* (hub-and-satellite nodes,
thin labelled edges), *xorbit* (satellites on rings around a core), *gravi*
(a live, breathing field) — plus the original `lucky-subtasks` "How we do it"
diagram this section used to have. **None of the three is a process map**; all
three are relationship or ambient visualisations. Only their visual language was
taken. The process semantics are ours.

---

## 1. Classification

| Question | Answer |
|---|---|
| Tier today | **Core Component** — `src/components/ProcessMap.astro` |
| Widget parts | Phase Hub · Step Satellite · Elastic Edge · Orbit Ring · Return Loop |
| Animated? | **Yes** — include in the animated-block lint set |
| Siblings | [Bento Block](bento-block.md) · [Service Spotlight Panel](service-spotlight-panel.md) · [Client Assembly Grid](client-assembly-grid.md) · [Service Tag Field](service-tag-field.md) |

---

## 2. Anatomy

```
section.process-map-section[data-scroll="processmap"]   100vw × (100vh − header)
└─ figure.pm-panel[data-process-map]                    the block
   ├─ header.pm-title                eyebrow · h2 · lede — inside the block
   └─ div.pm-scroll                  overflow-x on narrow
      └─ div.pm-figure               fit-box, aspect-ratio 1280/720
         ├─ svg.pm-svg               the field
         │  ├─ circle.pm-ring ×2n    orbit rings, inner + outer
         │  ├─ path.pm-edge          hub→hub chain, spring-driven
         │  ├─ line.pm-spoke         hub → satellite
         │  ├─ g.pm-hub              halo · disc · 01–05 · phase name
         │  ├─ circle.pm-dot         satellite point
         │  └─ path.pm-loop-path     return arc + arrowhead + label
         └─ ul.pm-sats               HTML step blocks in % coordinates
            └─ li.pm-sat > span.pm-chip > svg.pm-icon + text
```

**Why the split.** SVG paints the field; the step blocks are real HTML
positioned over it in percentage coordinates, so each can carry an icon, hover,
and take focus like any other component. This is also why `.pm-figure` must hold
the field's exact ratio — any letterboxing between it and the SVG would desync
every label from its dot.

---

## 3. Props

| Prop | Type | Default | Note |
|---|---|---|---|
| `eyebrow` `heading` `lede` | `string?` | — | Rendered **inside** the block |
| `phases` | `ProcessPhase[]` | **required** | `{ name, steps[], outcome?, media? }` |
| `shape` | `MapShape` | `'wave'` | Hub-row profile — see §5 |
| `loopTo` | `number?` | — | Phase index the return arc points back to |
| `loopLabel` | `string` | `'Iterate'` | Label on the arc |
| `note` | `string?` | — | Caption under the block |
| `lineWidth` | `number` | `1.25` | Connecting-line thickness, clamped 0.5–8 |
| `sensitivity` | `number` | `0.55` | How far the curve bends to the pointer; `0` disables |
| `returnSpeed` | `number` | `0.1` | Spring constant `k` — higher settles sooner |
| `oscillation` | `number` | `0.78` | `0` = critical damping (no wobble), `1` = rings a long time |
| `hideCursor` | `boolean` | `false` | Hides the pointer over the map |

**Colour is deliberately not a prop.** The line takes brand ink at rest and the
accent when its phase is lit. That is a token decision, not a per-instance one —
the reference component exposes `strokeColor`; here it would be a route around
the tokens-only rule.

---

## 4. The three-step ceiling

```ts
const overfull = phases.filter((p) => p.steps.length > LABEL_CAP);   // LABEL_CAP = 3
if (overfull.length > 0) throw new Error(…'Trim the phase data — do not raise the cap
  without re-measuring chip collisions.')
```

The map is the only place the steps appear, so a phase carrying more than the
field can label would lose content silently. It fails the render instead — same
contract as the BentoBlock's even-grid guards.

**Three is measured, not judged.** Chip rects were compared pairwise at 1024 →
1728:

| Steps/phase | Chips | Collisions |
|---|---|---|
| 3 | 15 | **0** |
| 4–5 (`FAN` 170, `PAD` 215) | 22 | 7 — fans meeting each other *and* the neighbouring hub's |

Experience's `framework[].includes` was trimmed 22 → 15 to suit. Every dropped
item was a near-duplicate of one kept, or belonged to a different phase
(*Usability reviews* → Validation; *Accessibility* → Validation; *Persona
development* ⊂ *User interviews*; *Interactive prototypes* ⊂ *Wireframes*;
*Behaviour analysis* ⊂ *Analytics reviews*; *Experience principles*;
*Prototype validation*).

---

## 5. Geometry

All solved at build time; hub, satellite and edge coordinates come from the same
functions, so nothing can drift apart.

```
W 1280 · H 720 · PAD 190 · MID 356 · HUB_R 30 · ORBIT [112, 152] · FAN 110°
```

**Collision control is geometric, not hand-tuned.** Two rules, and they hold for
any realistic phase/step count:

1. **Fans alternate up/down per hub** — adjacent hubs never share a half-plane.
2. **Radii alternate within a fan** — neighbouring satellites are staggered
   outward as well as around.

**`shape` — the hub-row profile.** Not decoration: the silhouette says something
true about how the discipline runs, and it is what keeps the six service pages
from rendering the same picture.

| Shape | Profile | Used by |
|---|---|---|
| `descending` | opens broad, narrows to a decision | Strategy |
| `arc` | one crest — a long exploration that resolves | Brand |
| `wave` | rises and falls; exploration answered by consolidation | **Experience** |
| `line` | flat — a pipeline, not an exploration | Engineering |
| `zigzag` | alternating, discrete self-contained stages | Growth |
| `ascending` | climbs; each phase builds on the last | Operations |

`MAP_BY_PILLAR` in `[slug].astro` also sets each pillar's loop target and label
(*Re-test* · *Refine* · *Iterate* · *Ship again* · *Compound* · *Improve*).

---

## 6. Elastic connecting lines

Each edge is one quadratic; **only its control point moves**, so a frame costs
one string write per edge and no layout at all.

```
a = (target − x)·k − v·c        integrated on rAF
```

- `target` is the pointer's vertical offset from the edge's resting midpoint,
  falling off with the square of horizontal distance over `REACH = 260` field
  units — so a curve reacts to a pointer passing over it and ignores one at the
  far end of the chain.
- **Damping is expressed relative to critical damping, `2√k`.** This matters:
  the first cut used a flat `0..1` coefficient, and at `k = 0.1` critical is
  0.63, so every value above that was overdamped and the curve never wobbled at
  all. Measured decay at the shipped defaults: `+40 → −14 → +4.6 → −1.8 → +0.6
  → 0` — five zero crossings, clean exponential envelope.
- The rAF loop **stops itself** after 30 idle frames with the pointer away, so
  an off-screen map costs nothing.
- Integrated rather than tweened, because the target changes every time the
  pointer moves and a tween would have to be rebuilt each frame.

Zero dependencies — the spring is ~40 lines of vanilla; GSAP is not involved.

---

## 7. Phase focus, and the z-index

Two sources drive the same state and must not fight:

- **pointer / keyboard** on a hub or chip — wins while engaged;
- **scroll position** through the section — walks the phases in order, so the
  map reads itself to someone who never touches it. Verified: `0 → 1 → 2 → 3 →
  4`, clearing outside the range.

The pointer takes precedence; scroll resumes on leave.

Lit phase gets: hub at full brightness, rings/spokes/dots to `opacity 1`, chips
un-dimmed, **its two edges to `--accent`** (an edge joins two hubs, so it lights
for either). Everything else drops to `brightness(0.62)` / `opacity 0.42`.

**z-index, on the documented scale:**

| Layer | Token | What |
|---|---|---|
| rest | `--layer-base` | every chip |
| lit phase | `--layer-card` | so an overlapping label is never read half-under a neighbour's |
| under the pointer | `--layer-popover` | over its own siblings |

Dimming is `filter`, never `opacity` — see §9.

---

## 8. Tokens used

Colour `--fg`, `--fg-muted`, `--bg`, `--line`, `--neutral-0/8/10`, `--accent` ·
Radius `--radius-2xl`, `--radius-lg` · Spacing `--gap-2/3/5/6/8` · Type
`--fluid-label`, `--fluid-body-md`, `--t-micro`, `--font-mono`,
`--font-weight-semibold`, `--core-line-height-tight` · Effects `--shadow-md`,
`--stroke-thin`, `--duration-normal`, `--easing-smooth` · Layer `--layer-base`,
`--layer-card`, `--layer-popover` · Focus `--focus-primary`.

**No cyan, and no `--theme-base`.** The field is brand ink; the brand yellow is
spent on one thing only — the loop that marks where the work cycles, plus the
lit phase's two edges. Painting the structure in the pillar accent
(`--svc-experience` is `#09E2C0`) put a saturated colour across most of the
section and broke the yellow-≤10% rule twice over. The original Framer diagram
made the same choice: everything grey, one `#FFBE1A` ring.

---

## 9. The rule this block re-learned

**Never give one property two owners.**

The first build had a GSAP entrance timeline (`data-scroll="processmap"`)
animating `opacity` on hubs and chips, an ambient drift animating their `x`/`y`,
*and* the phase-focus toggling `opacity` — while the chips position themselves
with a CSS `translateY`, which a GSAP `x`/`y` tween silently clobbers. Three
owners on `opacity`, two on `transform`. Result: a timeline frozen at 18%
progress with most of the map invisible, measured as
`hubs=[1.00, 0.28, 0.01, 0.00, 0.00]` static across 2.5s of sampling.

The entrance tween was removed, not patched. `scroll-animations.ts` keeps the
`processmap` branch as an explicit `return` with that note, so nobody adds one
back. The section is far from static without it: scroll walks the phases, the
lines spring, hover focuses.

Same class of bug as the BentoBlock's transform conflict — third time this
session.

---

## 10. Layout notes

- **Full-bleed stage**: `100vw` with `margin-left: calc(50% - 50vw)`; needs
  `overflow: clip` on an ancestor and breaks inside any ancestor carrying
  `transform` / `filter` / `contain`.
- **Height** is `calc(100vh - var(--site-header-h, 6.125rem))`, so a stage
  scrolled to the top still shows its own eyebrow instead of parking it under
  the sticky header (measured at 98px).
- **`min-height: 0` on `.pm-scroll` is load-bearing** — without it a flex item
  refuses to shrink below its content, and the map overflows the stage instead
  of fitting inside it. That was the first full-bleed attempt's bug: chips cut
  off below the fold.
- **Fit-box**: `.pm-figure` takes the height the stage has left and derives
  width from `aspect-ratio: 1280/720`, clamping back by width on narrow screens.
- Below its natural width the map scrolls inside `.pm-scroll`; the page body
  must never scroll sideways (verified `scrollWidth - clientWidth === 0`).

---

## 11. Known gaps

1. **Only Experience is live.** `processMapEnabled = pillarSlug === 'experience'`
   in `[slug].astro`; the other five keep the `.framework-flow` card grid, the
   same way the Service Spotlight Panel is gated to Brand.

   **The gate is load-bearing, not just a rollout flag.** Only Experience's
   phase data has been trimmed to three steps per phase, and the component
   throws above its cap. Ungated, five of six service pages rendered no
   framework section at all — Astro had already streamed the head, so they
   still returned 200 with the CSS present and the markup missing, which is a
   failure mode worth remembering: **a 200 is not proof a section rendered.**

   Rolling the map to another pillar means trimming that pillar's
   `framework[].includes` first. Current counts: strategy `5,5,5,4,4` · brand
   `5,5,6,5,5` · growth `4,4,5,4,4` · engineering `5,5,5,5,5` · operations
   `4,3,4,3,3`.
2. **No imagery.** `ProcessPhase.media` is supported and unused: the
   `services/<pillar>` clip library is third-party showreel footage (a
   birthday-card UI, a product-marketplace mockup) and labelling it as a phase
   of our process would misrepresent it. See pending #6.
3. **One redundant sibling remains.** `approach-section` ("Our Approach") still
   precedes this one, so the page states its method twice.

   `process-section` ("How we do it") was **removed on 2026-09-09**: it existed
   on Experience alone — 1 of 6 pillars, the only one with a `process` key — and
   its four phases (Discovery · Ideation · Prototyping & Testing · UI Design)
   restated the framework this map already draws. Markup, scoped CSS, the
   `ServiceProcess` type, the `preferArr` merge and the Experience data all
   went; a `process` field may still exist in Sanity but nothing reads it.
4. **The satellite `<title>` fallback is dead code** — with the cap enforced at
   build time, no satellite is ever unlabelled.

---

## 12. Open decisions

| # | Decision | Note |
|---|---|---|
| 1 | Block name | **Process Map** — the user's name for it; class prefix `.pm-*` |
| 2 | Absorbing Approach + How-we-do-it | Recommended. Three method sections is the actual problem the map was meant to solve |
| 3 | Spring on the spokes and loop too | Currently only the hub→hub chain is elastic. Extending it is cheap; may be noise |
| 4 | `hideCursor` | Prop exists, off. Turn on only if a custom cursor lands |
| 5 | Phase count | Tuned for 4–6 hubs. One hub centres; more than six needs `PAD`/`FAN` re-measuring |
| 6 | Reduced motion | Spring and scroll-walk both disabled; hover focus still works. Confirm that is the right floor |
