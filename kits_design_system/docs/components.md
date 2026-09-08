# Wugweb Kits — Component Library Specification

> Complete reference map for all components (`src/components/`, `src/pages/`, and `src/layouts/`). Each component lists its markup structure, consumed design-system tokens, props, state, and accessibility requirements.

---

## Core Components

### `SiteHeader` — `src/components/SiteHeader.astro`
- **Purpose**: Global sticky top navigation header with responsive mobile overlay menu.
- **Tokens Consumed**:
  - Background & Blur: `--neutral-7` bg, `--glass-medium` backdrop filter, `--shadow-nav`
  - Logo: `public/brand/logo-large.svg` (two-tone white + grey logo lockup)
  - WhatsApp CTA Button: `--color-yellow` background, `#000` text, `--radius-sm` (8px), 16px WhatsApp SVG icon
  - Navigation Links: `--neutral-6` background, hover/active `--color-surface-hover`, `--radius-sm`
  - Mobile Menu Panel: `max-height: 100dvh`, single `overflow-y: auto` scroll container, `--breakpoint-md` (768px) hamburger toggle
- **Accessibility**: Keyboard accessible focus states (`--focus-primary`), `aria-expanded` toggle for mobile drawer, screen-reader text for hamburger.

### `SiteFooter` — `src/components/SiteFooter.astro`
- **Purpose**: Global footer with sitemap links, 6 service pillar links, legal notices, and device-backdrop banner.
- **Tokens Consumed**:
  - Top Border: `--line` (`rgba(255, 255, 255, 0.05)`), `--color-border-subtle`
  - Typography: `--fluid-label` link labels, `--fg-muted` muted text
  - Spacing: `--space-section-lg` padding, `--gap-6` link columns

### `BaseLayout` — `src/layouts/BaseLayout.astro`
- **Purpose**: HTML shell wrapper for all pages (Head, SEO meta, PWA manifest, SiteHeader, SiteFooter, GSAP animations setup).
- **Tokens & Scripts**:
  - Fonts: Inter Tight & Fragment Mono via Google Fonts
  - Scripts: `src/lib/scroll-animations.ts` (GSAP scroll triggers)
  - PWA: `manifest.webmanifest`, service worker registration, theme color `#050505`

---

## Page Blocks & Layout Sections

### 1. Contact Form V2 Card — `src/pages/contact-us.astro`
- **Purpose**: Main lead generation enquiry form featuring a 4-step interactive flow.
- **Tokens & Elements**:
  - Card Container: `--surface-elevated` (#191919), `--stroke-thin` border, `--radius-2xl` (24px), `--gap-8` inner padding
  - Step Titles: `--font-mono`, `--fluid-label`, uppercase, `letter-spacing: 0.08em` (`--tracking-label`)
  - 6-Pillar Selector Grid: 2-column grid (`.pillar-grid`), custom checkable selector tiles (`.pillar-selector`), active `--surface-hover` + `--accent-warm` border + glow shadow
  - Inputs: `--surface-2` bg, `--stroke-thin` border, `--radius-sm` corners, `--fluid-body-md` text, focus `--accent-warm` border
  - Budget & Timeline Chips: Flex wrap row (`.chips-row`), `.radio-chip` pills with `--radius-full`, active accent border
  - Direct Channels Sidebar: `--surface-elevated` glass panels (`.glass-panel`), SLA badge (`.pulse-dot` green glow), office addresses (India & UAE)

### 2. Service Detail Bento Grid — `src/pages/services/[slug].astro`
- **Purpose**: Dynamic service pillar showcase with capability groups, toolkits, approach steps, and related work.
- **Tokens & Dynamic Engine**:
  - Pillar Theme Variables: `--theme-base`, `--theme-dark`, `--theme-light`, `--theme-glow` dynamically injected per service slug
  - Dynamic Hero: Glowing radial gradient background (`var(--theme-glow)`), 16:9 poster preview
  - ~~Capability Bento Tiles~~ — **superseded on `/services/brand` by the Service Spotlight Panel (block 7)**. Still live on the other five pillars as `.caps-grouped` / `.cap-group`.
  - Toolkit Icon Grid: 89 official brand/tech SVG icons (`/assets/tools/*.svg`), `--radius-full` container, `--ts-label-sm` labels

### 3. Footer Device Backdrop Banner — `src/components/FooterCTA.astro`
- **Purpose**: High-impact CTA banner positioned above the footer links.
- **Tokens & Graphics**:
  - Container: Elevated ash panel (`--color-surface-elevated`), `--radius-2xl` (24px), `--shadow-xl`
  - Backdrop Graphics: Layered laptop (`public/brand/cta/laptop-mockup.png`) and mobile phone mockups positioned behind text
  - Button: Yellow accent button (`--color-yellow`), `#000` text, `--radius-sm` (8px), hover translateY(-2px)

### 4. Work Portfolio Grid — `src/pages/work/index.astro`
- **Purpose**: Case study showcase with discipline/pillar filter bar and media cards.
- **Tokens & Cards**:
  - Filter Bar: Capped to 6 pillars + All (`--radius-full` chips, active `--color-yellow` accent)
  - Work Card: 16:10 aspect media container, `--radius-sm` corners, hover video playback (`data-video-src`), styled initials fallback placeholder for media-less projects (`findThumbFallback`)

### 5. Blog Detail & Editorial Reader — `src/pages/blog/[slug].astro`
- **Purpose**: Article reading interface with interactive Table of Contents, sticky share bar, author bio, and pagination.
- **Tokens & Features**:
  - Interactive ToC: Anchored H2/H3 headings, active scroll spy highlighting (`--accent-warm`)
  - Reading Metadata: Last Updated date, reading time badge, category chip (`--radius-full`)
  - Sticky Share Bar: Fixed position share actions (X/Twitter, LinkedIn, WhatsApp, Copy Link)
  - Prev/Next Articles: Dual navigation cards with thumbnail preview and category context

### 6. Trust Badges Strip — `src/components/TrustBadges.astro`
- **Purpose**: Client and industry trust recognition strip.
- **Tokens**: Monochrome logos (Clutch, DesignRush, GoodFirms, TopDevelopers), `--opacity-70`, `--gap-8` flex layout.

### 7. Service Spotlight Panel — `src/pages/services/[slug].astro` (brand only)
- **Purpose**: Vertical list in one glass panel where exactly one row is spotlit at a time — by hover, by scroll position on touch, or by an idle auto-advance. The spotlit row inverts to a light surface, reveals a supporting line, grows its thumbnail, plays its clip, and washes the section's full-bleed backdrop with its own poster.
- **Animated block** — include in the animated-block lint set.
- **Full spec, token inventory and motion inventory**: [`blocks/service-spotlight-panel.md`](blocks/service-spotlight-panel.md)
- **Status**: awaiting sign-off; gated by `showcaseEnabled`. The other five pillars still render block 2's grouped panels.
- **Headline tokens**: `--theme-base` (accent), `--neutral-1` / `--neutral-9` (the inverted active row — an explicit light pair, never `--neutral-1` inheriting `--fg`), `--fluid-h3` / `--fluid-body-md` / `--fluid-label` (type), `--duration-slow` + `--easing-editorial` (expansion), `--radius-2xl` (panel) / `--radius-lg` (rows). 45 tokens, 0 hardcoded colours.

### 8. Client Assembly Grid — `src/pages/index.astro` (homepage)
- **Purpose**: Full-viewport band of uniform logo tiles that scatter, converge into the grid, hold, then scatter back out on scroll. The section title occupies **two cells inside the grid** at exactly one tile's height — two logos either side — so the block reads as one grid rather than a heading above a logo strip.
- **Animated block** — include in the animated-block lint set. Uses `data-scroll="assemble"`.
- **Full spec, token inventory and motion inventory**: [`blocks/client-assembly-grid.md`](blocks/client-assembly-grid.md)
- **Status**: awaiting sign-off; mockup logo padding still on (19 distinct images in repo vs 28 on the live section).
- **Headline tokens**: `--fg` / `--fg-muted` (two-tone title, mirroring the wugweb lockup), `--line` + `--stroke-thin` (tile border), `--neutral-8` (tile surface via `color-mix`), `--fluid-h2` at `--font-weight-regular`, `--radius-lg`, `--opacity-soft` → `--opacity-100` on hover, `--duration-normal` + `--easing-smooth`. 19 tokens, 0 hardcoded colours.
- **Two rules it demonstrates**: tile `aspect-ratio: 16/9` fixed across every breakpoint (width from the column count, height follows), and one `gap` driving both axes — never `align-content: space-evenly`, which overrides the row gap.

### 9. Service Tag Field — `src/pages/index.astro` ("What we do")
- **Purpose**: Six pastel pill tags, one per service pillar, scattered across a field. They fly in from outside on scroll, drag freely with momentum and a fading trail, rise to the front when touched, and expand in place to media → title → copy → link. "Learn more" grows the card to fill the viewport, then navigates.
- **Animated block** — include in the animated-block lint set.
- **Full spec, reference parity, token and motion inventory**: [`blocks/service-tag-field.md`](blocks/service-tag-field.md)
- **Behaviour**: `src/lib/draggable-tags.ts` — GSAP **Draggable + InertiaPlugin + Flip + ScrollTrigger**, all already in `gsap` 3.15. No new dependency, no React.
- **Status**: awaiting sign-off. Clips have no posters yet; composition never visually reviewed (pane screenshots failed all session).
- **Headline tokens**: `--tag-hue` (per tag, set from `--svc-*`), `--neutral-9` label ink at 82%, `--fluid-h1` lowercase bold label, `--r-pill` collapsed → `--radius-2xl` open, elevation `--shadow-md` → `--shadow-xl` → `--shadow-2xl`, `--cursor-grab` / `--cursor-dragging` / `--cursor-loading`. 45 tokens, 0 hardcoded colours.
- **Two rules it demonstrates**: the card must set `overflow: hidden` so children clip to the *current* radius (a square-cornered media otherwise breaks a rounded card), and a ScrollTrigger `end` must stay inside the viewport when the trigger is shorter than the screen — at `bottom 15%` the range is already passed on entry and the intro reverses immediately.

### 10. Bento Block — `src/components/BentoBlock.astro`
- **Purpose**: Three columns of tiles at unequal heights, each free to differ in weight, content kind, tone, media type and media treatment. Tiles rise in a column-aware stagger on scroll and reverse on exit; hovering the block dims every tile but the one under the pointer. **The only one of the four new blocks that is a real component** — the other three are still inline in a page.
- **Animated block** — include in the animated-block lint set. Uses `data-scroll="bento"`.
- **Full spec, layout table, token and motion inventory**: [`blocks/bento-block.md`](blocks/bento-block.md)
- **Used by**: `/about` ("Why Wugweb?") and all six `/services/[slug]` pages ("Why us?"), each with a **different arrangement of the same six slots** — `BENTO_LAYOUTS` in `[slug].astro`, one row per slot as `[column, weight, role]`. A variation is a reordered array, never a CSS edit.
- **Status**: awaiting sign-off. Composition never visually reviewed (pane screenshots failed all session); `stat` / `checklist` / `stack` / `chips` kinds are built but unused on any live page.
- **Headline tokens**: `--radius-2xl` (tiles), bevel from two inset hairlines built on `--neutral-0` / `--neutral-10` via `color-mix` plus `--shadow-md`, type stepping `--t-h5` → `--fluid-h4` (mid) → `--fluid-h3` (tall), padding stepping `--gap-5` → `--gap-6` → `--gap-8` with weight, `--easing-smooth`, `--layer-base`. 0 hardcoded colours.
- **Three rules it demonstrates**: **(1)** a bento must never resolve into an even grid, and that is enforced at render — one guard rejects a single repeated weight, a second rejects identical column signatures, which line the seams into rows even when the weights differ. **(2)** `flex-basis: auto` + weighted `flex-grow` + `flex-shrink: 0` is the overflow-proof sizing contract: a tile takes the height its content needs and only the leftover is shared by weight, so weights are a target, not a guarantee — heavy content wins rather than clips. **(3)** GSAP owns `opacity` here, so the hover dimming uses `filter`; never give a property two owners, and never CSS-transition one GSAP animates.

### 11. Process Map — `src/components/ProcessMap.astro`
- **Purpose**: Full-viewport orbital process diagram in one block. Each phase is a hub; its steps orbit it as labelled satellites; the hub chain carries the sequence left to right. Replaces the five-card `.framework-flow` glass grid in the "How we work" section.
- **Animated block** — include in the animated-block lint set. Owns all of its own motion (see below); `data-scroll="processmap"` is deliberately a no-op.
- **Full spec, geometry, spring maths and token inventory**: [`blocks/process-map.md`](blocks/process-map.md)
- **Live on**: `/services/experience` only. `processMapEnabled` in `[slug].astro` gates it; the other five pillars keep the card grid, the same way the Service Spotlight Panel is gated to Brand. The gate is **load-bearing** — the component throws above three steps per phase and only Experience's data is trimmed.
- **Status**: awaiting sign-off. No imagery (the service clip library is third-party showreel footage — pending #6); `approach-section` still precedes it, so the page states its method twice. The `process-section` ("How we do it") was removed 2026-09-09 — it lived on Experience alone and restated this same framework.
- **Headline tokens**: brand ink for the whole field (`--fg`, `--fg-muted`, `--line`, `--neutral-0/8/10`) with `--accent` spent on exactly two things — the return loop and the lit phase's edges. **No `--theme-base`**: painting the structure in the pillar accent (`--svc-experience` is `#09E2C0`) broke the yellow-≤10% rule and read as cyan. Layering uses `--layer-base` → `--layer-card` → `--layer-popover`.
- **Three rules it demonstrates**: **(1)** collision control belongs in geometry, not hand-tuning — fans alternate up/down per hub so adjacent hubs never share a half-plane, and radii alternate within a fan; verified by pairwise chip-rect comparison, which is also how the three-step cap was set (at four, fans collide whatever the fan width). **(2)** Spring damping must be expressed relative to critical damping `2√k` — a flat 0–1 coefficient made every value overdamped at `k = 0.1`, so the curve never wobbled. **(3)** *Never give one property two owners* — an entrance timeline, an ambient drift and the phase-focus all reached for `opacity`/`transform` on the same elements and froze the map at 18% progress; the tween was removed rather than patched.

---

## Design Principles Checklist

- [x] **Tokens First**: All components consume tokens from `src/styles/global.css`.
- [x] **Radius Rules**: Buttons (`--radius-sm`), Chips (`--radius-full`), Cards (`--radius-lg`), Panels (`--radius-2xl`).
- [x] **Yellow Capping**: ≤10% visual surface per page (accent elements & CTA buttons only).
- [x] **Motion Standard**: All entry transitions use GSAP `[data-reveal]` or `[data-scroll]`.
