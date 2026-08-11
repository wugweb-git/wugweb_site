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
  - Capability Bento Tiles: Glass tiles (`.bento-card`) with `--stroke-thin` border, `--radius-lg` corners, hover translation
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

---

## Design Principles Checklist

- [x] **Tokens First**: All components consume tokens from `src/styles/global.css`.
- [x] **Radius Rules**: Buttons (`--radius-sm`), Chips (`--radius-full`), Cards (`--radius-lg`), Panels (`--radius-2xl`).
- [x] **Yellow Capping**: ≤10% visual surface per page (accent elements & CTA buttons only).
- [x] **Motion Standard**: All entry transitions use GSAP `[data-reveal]` or `[data-scroll]`.
