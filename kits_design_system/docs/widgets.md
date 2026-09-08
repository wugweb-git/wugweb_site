# Wugweb Kits — Reusable UI Widgets & Building Blocks

> Master specification for reusable UI widgets, controls, input components, cards, indicators, and layout building blocks used across Wugweb.

---

## 1. Input Controls & Selectors

### 6-Pillar Scope Selector Card
- **Description**: Interactive checkbox grid item used in enquiry forms to select target service pillars.
- **Markup Structure**:
  ```html
  <label class="pillar-selector">
    <input type="checkbox" name="interests" value="Strategy" />
    <div class="selector-content">
      <span class="pillar-name">Strategy</span>
      <span class="pillar-desc">Product, Brand & Growth Architecture</span>
    </div>
  </label>
  ```
- **Styling & Tokens**:
  - Container: `--surface-2` bg, `--stroke-thin` border (`--line`), `--radius-sm` (8px)
  - Checked State: `--surface-hover` bg, border `--accent-warm` (`#FFBE1A`), `box-shadow: 0 0 12px rgba(255, 180, 0, 0.15)`
  - Typography: `.pillar-name` (600 weight, `--fg`), `.pillar-desc` (0.82rem, `--fg-muted`)

### Radio Budget & Timeline Chips
- **Description**: Pill-shaped single-select radio button chips for quick budget and timeline selection.
- **Markup Structure**:
  ```html
  <label class="radio-chip">
    <input type="radio" name="budget" value="$15K - $35K" />
    <span>$15K - $35K</span>
  </label>
  ```
- **Styling & Tokens**:
  - Pill Shape: `--radius-full` (9999px), `--surface-2` bg, `--stroke-thin` border
  - Checked State: `--surface-hover` bg, `--accent-warm` text & border color

### Custom Text Field & Textarea
- **Description**: Styled text inputs, email inputs, phone fields, and textareas.
- **Markup Structure**:
  ```html
  <div class="field-group">
    <label for="email">Work Email *</label>
    <input type="email" id="email" name="email" required placeholder="name@company.com" />
  </div>
  ```
- **Styling & Tokens**:
  - Label: `--font-mono`, `--fluid-label`, `--fg-muted`
  - Input: `--surface-2` bg, `--stroke-thin` border, `--radius-sm` (8px), padding `--gap-3` `--gap-4`
  - Focus State: `--stroke-focus`, border `--accent-warm`, `--surface-hover` bg

### Spam Honeypot Protection Field
- **Description**: Invisible field designed to catch automated spam bots.
- **Markup Structure**:
  ```html
  <label class="hp-field" aria-hidden="true">
    <input type="text" name="website" tabindex="-1" autocomplete="off" />
  </label>
  ```
- **CSS Rule**: `.hp-field { position: absolute; left: -9999px; opacity: 0; pointer-events: none; }`

---

## 2. Badges & Status Indicators

### Status Pulse Badge & Dot
- **Description**: Live availability / status indicator badge with animated pulsing green dot.
- **Markup Structure**:
  ```html
  <div class="hero-badge">
    <span class="pulse-dot"></span>
    <span>Accepting Select Projects for Q3/Q4</span>
  </div>
  ```
- **Styling & Tokens**:
  - Badge: `--surface-elevated` bg, `--stroke-thin` border, `--radius-full`, `--font-mono`, `--fluid-label`
  - Dot: 8×8px circle, background `#10b981`, `box-shadow: 0 0 8px #10b981`

### SLA Guaranteed Response Chip
- **Description**: Quick response SLA guarantee indicator with clock SVG icon.
- **Markup Structure**:
  ```html
  <span class="quick-sla">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    Guaranteed 24h Response
  </span>
  ```

### Quick Action Chips (Email & WhatsApp)
- **Description**: Direct contact action chips for immediate communication.
- **Markup Structure**:
  ```html
  <a href="https://wa.me/919205996219" target="_blank" rel="noopener noreferrer" class="quick-chip">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    WhatsApp Us
  </a>
  ```

---

## 3. Cards & Bento Layouts

### Glassmorphic Elevated Panel (`.glass-panel`)
- **Description**: Standard elevated card for sidebars, details, and feature highlights.
- **Tokens**: Background `--surface-elevated` (#191919), `--stroke-thin` border, `--radius-lg` (16px), padding `--gap-6`

### Bento Grid Tile (`.bento-card`)
- **Description**: Modular bento tile for service capabilities, case study highlights, and value propositions.
- **Tokens**: Background `--surface-2`, `--stroke-thin` border, `--radius-lg` (16px), transition `--transition-fast`, hover `translateY(-4px)`

### Spotlight Row (`.showcase-card`)
- **Description**: List row that inverts when spotlit — light surface, dark text, revealed supporting line. Parts of the [Service Spotlight Panel](blocks/service-spotlight-panel.md).
- **Tokens**: Idle transparent on `--fg`; active `--neutral-1` background with `--neutral-9` text (explicit light pair — never `--neutral-1` inheriting `--fg`), `--radius-lg`, padding `--gap-2`→`--gap-4` on activate, `--duration-normal` / `--easing-smooth`
- **Rule**: reserves `min-height` for its own active state so activating a row never shifts its siblings.

### Poster-First Video Thumb (`.showcase-media`)
- **Description**: Media box that ships a WebP poster and downloads the clip only when activated.
- **Tokens**: `--radius-lg`, `--duration-slow` / `--easing-editorial` on `width`
- **Rule**: `aspect-ratio` is fixed (`11 / 8`) and only `width` animates, so height follows proportionally — media is never stretched on one axis (`governance.md` §8). `preload="none"`, `poster`, **no `autoplay`**.

### Ambient Backdrop Layer (`.showcase-bg`)
- **Description**: Full-bleed image layer that crossfades to the spotlit item. Sharp, not pre-blurred — the glass panel's own `backdrop-filter` supplies the blur.
- **Tokens**: `--opacity-0` ↔ `--opacity-100`, `--duration-slow` / `--easing-smooth`, veil built from `--bg` via `color-mix`
- **Rule**: `100vw` bleed requires `overflow: clip` on the section, and breaks inside any ancestor with `transform` / `filter` / `contain`.

### Logo Tile (`.logo-tile`)
- **Description**: Fixed-ratio cell holding a client logo. Part of the [Client Assembly Grid](blocks/client-assembly-grid.md).
- **Tokens**: `--neutral-8` surface via `color-mix`, `--line` + `--stroke-thin` border, `--radius-lg`, logo at `--opacity-soft` + `grayscale(1)` resolving to `--opacity-100` + full colour on hover, `--duration-normal` / `--easing-smooth`
- **Rules**: `aspect-ratio: 16 / 9` — width from the column count, height follows, identical shape at every breakpoint (`governance.md` §8). The parent **must** set `align-items: flex-start`; flex's default `stretch` silently overrides the ratio. Size the logo as a share of the tile (`62%` × `44%`), never a px cap — a px cap plus padding can force the box out of ratio.

### Inline Grid Title Cell (`.logo-grid-title`)
- **Description**: Section heading occupying cells *inside* a grid rather than a band above it.
- **Tokens**: `--fg` / `--fg-muted` two-tone split, `--fluid-h2`, `--font-weight-regular`, `--core-line-height-tight`
- **Rule**: width `calc(var(--logo-col) * 2 + gap)`, height `calc(var(--logo-col) * 9 / 16)` — both derived from the same published column width so the cell can never drift from tile height. Requires `container-type: inline-size` on the grid and `cqw` units; a `%` height would resolve against the container's height and fail silently.

### Assemble Scatter Field (`data-scroll="assemble"`)
- **Description**: Scroll-scrubbed scatter → assemble → hold → scatter for a container's children. Each child gets its own origin, derived from its position pushed outward from the grid centre plus deterministic seeded jitter.
- **Tokens**: none — GSAP timeline, scrubbed on scroll position.
- **Rules**: `transform` only (no per-frame layout, cannot alter a child's aspect ratio). Parent must clip. Children marked `data-assemble-static` are excluded so a heading can sit still inside the moving grid. Disabled wholesale under `prefers-reduced-motion`.

### Service Tag (`.tag`)
- **Description**: Draggable pastel pill that expands in place. Part of the [Service Tag Field](blocks/service-tag-field.md).
- **Tokens**: `--tag-hue` pastel-ised via `color-mix` against `--neutral-0`, label `--fluid-h1` lowercase `--font-weight-bold` at 82% `--neutral-9`, index in `--font-mono`, elevation `--shadow-md` → `--shadow-xl` (hover/open) → `--shadow-2xl` (dragging), `--cursor-grab` / `--cursor-dragging`
- **Rules**: `--r-pill` while collapsed, `--radius-2xl` once open — and it **must** carry `overflow: hidden`, or a square-cornered child (the media) pokes outside the rounded card. `touch-action: none` stays scoped to the tag so the page still scrolls around it. Resting `%` positions must be clamped into their container once real widths are known, or narrow screens overflow horizontally.

### Tag Expand Panel (`.tag-media` + `.tag-body`)
- **Description**: Two independently collapsing panels either side of the title row, so an open card reads media → title → copy → link.
- **Tokens**: `--radius-lg`, `--fluid-body-md`, copy at 62–78% `--neutral-9`
- **Rules**: each panel animates `height` to its measured `scrollHeight`, then releases to `auto` so reflowing text stays correct. Contents rise in behind the height (stagger 0.07, delay 0.1) rather than appearing fully formed. Media is `preload="none"` and only downloads on open.

### Phase Hub (`.pm-hub`)
- **Description**: One phase in a [Process Map](blocks/process-map.md) — a halo, a filled disc carrying the phase index, and the phase name set outside it. Focusable, and the hover target that lights its whole orbit.
- **Tokens**: disc `--fg` with `--neutral-10` numeral in `--font-mono`, halo `--neutral-0` at 8%, name `--fg` at 15px semibold, `--focus-primary` on `:focus-visible`
- **Rules**: the phase name is a **single word** — it sits under a 60px disc, and a wrapped label breaks the chain's reading order (the six pillars' framework phases were renamed for this: "Experience Strategy" → "Strategy", "Launch, Measure & Scale" → "Scale"). Fans alternate up/down by index, so the name flips to the opposite side to stay clear of the satellites.

### Step Satellite (`.pm-sat` + `.pm-chip`)
- **Description**: One step orbiting its phase — a point on the ring, a spoke, and an HTML chip with a stroked icon. HTML rather than SVG so it can hover, focus and carry an icon like any other component.
- **Tokens**: chip `--neutral-8` at 92% with `--line` border and `--radius-lg`, inset hairline over `--shadow-md`, `--fluid-label` text, icon stroked in `--fg-muted` → `--accent` on hover
- **Rules**: positioned in **percentages of the figure**, so the figure must hold the SVG field's exact ratio or every label desyncs from its dot. Max three per hub — measured by pairwise rect comparison, and enforced by a build-time throw rather than a silent trim. Dimming is `filter: brightness()`, never `opacity`. z-index steps `--layer-base` → `--layer-card` (lit phase) → `--layer-popover` (under the pointer).

### Elastic Edge (`.pm-edge`)
- **Description**: The hub→hub chain link. A single quadratic whose control point is a damped spring, bending toward the pointer and ringing back to rest.
- **Tokens**: `--fg-muted` at 48% at rest, `--accent` when either of its two phases is lit, width from `--pm-line-w` (0.5–8)
- **Rules**: only the control point moves — one attribute write per frame, no layout. **Damping must be expressed relative to critical damping `2√k`**; a flat 0–1 coefficient is overdamped at every useful `k` and the curve never wobbles. The rAF loop halts after 30 idle frames so an off-screen map costs nothing. An edge belongs to the two phases it joins, so it lights for either.

### Bento Tile (`.bento-tile`)
- **Description**: One slab in a [Bento Block](blocks/bento-block.md). Renders as `<article>`, or `<a>` when the tile has an `href`. Weight (`is-tall` … `is-strip`), content kind, tone and media treatment are all data.
- **Tokens**: `--radius-2xl`, `--surface` / `--line` / `--stroke-thin`, `--fg` / `--fg-muted`, bevel from two inset hairlines (`--neutral-0` 9% top light, `--neutral-10` 45% bottom shade) over `--shadow-md`, `--easing-smooth`
- **Rules**: `flex: 0 0 auto` — **`shrink: 0` is load-bearing**, because an explicit `min-height` overrides the automatic flex minimum, so with `shrink: 1` a tile compresses below its own content and clips. Padding and type both step with weight (`--gap-5/6/8`; `--t-h5` → `--fluid-h4` → `--fluid-h3`) so a tall tile is not a small one blown up. Dimming is `filter: brightness()`, never `opacity` — GSAP owns `opacity` for the enter/exit tween.

### Bento Media (`.bento-media.is-cover` / `.is-inset`)
- **Description**: The same media in two roles — full-bleed behind the copy with a scrim, or a contained block with the copy beneath it.
- **Tokens**: `--radius-2xl` (cover, inherits the tile) / `--radius-lg` (inset), `--easing-smooth`, scrim from `--bg` via `color-mix`
- **Rules**: resting `transform: scale(1.015)` → `1.06` on tile hover, so the zoom has room and never reveals an edge. `preload="none"` + `IntersectionObserver` play/pause — **0 mp4 bytes on load**; a cover video **must** carry a `poster` or the tile paints empty before play. Scale is uniform, so aspect ratio never changes (`governance.md` §8). Note that the over-scale and the scrim pseudo-element both inflate `scrollHeight` by a few px without anything being clipped — audit with real element rects, not `scrollHeight - clientHeight`.

### Bento CTA Strip (`.bento-tile.is-strip.kind-cta`)
- **Description**: The lightest weight in the set (90), used as a one-line link tucked under a heavier tile so a column closes on an action rather than more prose.
- **Tokens**: `--gap-5` / `--gap-6` padding pair, `--radius-2xl`, `--r-pill` on the glyph
- **Rule**: it is a whole-tile `<a>`, so it must not nest another interactive element.

### Tag Chip Toggle (`.tag-toggle`)
- **Description**: Round `+` affordance that rotates 45° into a cross when its card opens. Same language as `.service-card-toggle`.
- **Tokens**: `--radius-full`, `--neutral-10` tint, `--duration-fast` / `--duration-normal` with `--easing-out`
- **Rule**: chip and glyph are both driven from `--tag-chip` / `--tag-chip-glyph` on the parent, mapped per breakpoint (36/16, 40/20, 44/24 — a constant ~50% fill), so the two can never drift apart.

### Drag Echo Trail (`.tag-echo`)
- **Description**: Fading silhouette dropped behind a dragged element.
- **Tokens**: `--layer-background`, `--r-pill`
- **Rules**: cloned from the source's *unrotated* box plus its live transform, so the echo carries the same tilt instead of an axis-aligned rectangle. Throttled to 55ms with a 0.5s life, and each removes itself — never more than ~6 in the DOM. Skipped entirely under `prefers-reduced-motion`.

### Dwell Progress Hairline (`.showcase-progress`)
- **Description**: 2px countdown bar showing time remaining before an auto-advancing block moves on.
- **Tokens**: `--theme-base`, duration from `--showcase-dwell` (block-local, set from JS)
- **Rule**: `linear` easing is deliberate — a countdown must read as uniform. Animates `transform: scaleX` only.

---

## 4. Editorial & Navigation Building Blocks

### Interactive Table of Contents (ToC)
- **Description**: Auto-generated article outline with active heading tracking.
- **Tokens**: Border-left `--stroke-thin` (`--line`), link text `--fg-muted`, active link `--accent-warm` + bold weight.

### Sticky Social Share Bar
- **Description**: Floating or sticky bar for sharing articles across X, LinkedIn, WhatsApp, and Clipboard.
- **Tokens**: Button size 40×40px (`--share-btn`), `--radius-full`, background `--surface-2`, hover `--surface-hover`.

### Accordion FAQ Card
- **Description**: Expandable question and answer accordion tile.
- **Markup Structure**:
  ```html
  <details class="faq-card">
    <summary class="faq-trigger">
      <span>What is the typical timeline for an engagement?</span>
      <svg class="faq-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    </summary>
    <div class="faq-content">
      <p>Most strategic engagements range from 4 to 12 weeks depending on scope...</p>
    </div>
  </details>
  ```
