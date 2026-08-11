# Wugweb — Design System Specification

**Status:** Single source of truth for design tokens, component specifications, and UI architecture in this repo.  
**Last updated:** 2026-08-10 (Kits architecture update: Contact V2 hierarchy, dynamic service theme engine, device backdrop CTA, GSAP animation system).

The full token reference lives in [`tokens/tokens.md`](tokens/tokens.md). The UI component map lives in [`components.md`](components.md), and reusable building blocks live in [`widgets.md`](widgets.md).

---

## Sources, Ranked by Authority

| # | Source | What it is | Authority |
|---|---|---|---|
| **S1** | `component/Framer-style-manager-styles.json` | Direct export from Framer Style Manager — 66 colors, 15 text styles. | **Highest** for locked colors & baseline neutral values. |
| **S2** | `src/styles/global.css` | `:root` design token architecture (`--ts-*`, `--fluid-*`, `--svc-*`, effects tokens). | **Highest** for implemented runtime rules. |
| **S3** | `src/lib/scroll-animations.ts` | GSAP scroll trigger engine & animation curves. | **Highest** for motion & scroll behaviors. |
| **S4** | "Wugweb Kits" design system | Token architecture (`--ts-*`, `--fluid-*`, `--core-*`, weights hierarchy). | **Adopted** — supersedes Framer's all-400 type. |
| **S5** | `reference/*.html` saved page captures | Saved copies of live pages (archive only). | **Lower.** Known offline archive. |

---

## Brand Assets & Lockups

| Asset | File Path | Use Case |
|---|---|---|
| **Logo Lockup SVG** (149×54, two-tone "wugweb") | `public/brand/logo-large.svg` | Header navigation, footer CTA, bento brand tiles |
| **Logo Mark SVG** (54×54 W icon) | `public/brand/logo-small.svg` | Favicon, apple-touch-icon, mobile header, PWA manifest |
| **Favicons** (16×16, 32×32) | `public/brand/favicon-16x16.png`, `public/brand/favicon-32x32.png` | Browser tab icons |
| **OG Default Image** | `public/brand/og-default.png` | Social preview / OpenGraph meta |
| **Device Backdrops** | `public/brand/cta/laptop-mockup.png`, `public/brand/cta/mobile-mockup.png` | Footer device-backdrop CTA banner |

---

## Core Rules

1. **Always Use Tokens**: Never hardcode hex colors, typography sizes, spacing rems, border radius, opacity, shadows, blur, or z-index in CSS.
2. **Breakpoints**: Use literal pixel values in `@media` queries (`768px`, `1024px`, `1280px`). Tokens in `breakpoints.md` are documentation constants.
3. **Border Radius Consistency**: Buttons = `--radius-sm` (8px), chips/tags/pills = `--radius-full` (9999px), cards = `--radius-lg` (16px), hero/elevated panels = `--radius-2xl` (24px).
4. **Yellow Accent Rule**: Yellow (`--color-yellow`: `#FFBE1A`) is a brand accent, **never a primary background surface**. Capped at ≤10% visual area per page.
5. **GSAP Motion Engine**: Animations run through GSAP (`src/lib/scroll-animations.ts`) using `[data-reveal]` and `[data-scroll]` attributes. No `motion` framework imports.
6. **Mobile-First Layout**: Mobile viewports are built first and enhanced upward. Mobile nav menu caps at `100dvh` with a single scroll container.

---

## 6-Service Color System & Theme Engine

The site utilizes a 6-pillar service color system. Panels alternate warm and cool hues so adjacent cards never clash:

| Service | HEX Base | Token | Dark BG | Light Accent | Theme Glow |
|---|---|---|---|---|---|
| **01 Strategy** | `#FA4108` | `--svc-strategy` | `#A22A05` | `#FF8F66` | `rgba(250, 65, 8, 0.25)` |
| **02 Engineering** | `#2167E9` | `--svc-engineering` | `#143F8F` | `#7FA8F3` | `rgba(33, 103, 233, 0.25)` |
| **03 Brand** | `#E6309F` | `--svc-brand` | `#951F67` | `#F17CC3` | `rgba(230, 48, 159, 0.25)` |
| **04 Growth** | `#3ED219` | `--svc-growth` | `#21870F` | `#9BE97F` | `rgba(62, 210, 25, 0.25)` |
| **05 Operations** | `#7A4DFF` | `--svc-operations` | `#4F32A5` | `#B49CFF` | `rgba(122, 77, 255, 0.25)` |
| **06 Experience** | `#09E2C0` | `--svc-experience` | `#05927C` | `#6EF0DC` | `rgba(9, 226, 192, 0.25)` |

Detailed service mapping & geometry: [`tokens/service-colors.md`](tokens/service-colors.md).

---

## Key System Decisions

- **Typography Weight Hierarchy (S4)**: Display 800 (ExtraBold), H1 700 (Bold), H2–H4 600 (SemiBold), Labels/Chips 500 (Medium), Body 400 (Regular).
- **Fluid Type Scaling**: All headline and body tokens scale dynamically via `clamp()` between mobile and desktop viewports (`--fluid-display`, `--fluid-h1`…`--fluid-caption`).
- **Contact V2 Hierarchy**: Shifted to a 6-pillar multi-select grid with budget/timeline radio chips, direct channel SLA badges, and responsive glass sidebar.
- **Footer Device Backdrop**: Footer final CTA styled as an elevated ash (`--color-surface-elevated`) panel with layered laptop + mobile device graphics positioned behind copy.
