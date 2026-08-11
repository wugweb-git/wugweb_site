# Wugweb Kits — Motion & Animation System

> Single source of truth for motion, animations, scroll triggers, dynamic theme transitions, and micro-interactions across Wugweb.

---

## 1. Core Principles

- **Purposeful & Editorial**: Motion enhances hierarchy and storytelling — never distracting or gratuitous.
- **GSAP Driven**: All scroll-triggered entrances and scroll progress effects run through GreenSock (`src/lib/scroll-animations.ts`). No heavy runtime libraries (`motion` is excluded).
- **CSS Token Transitions**: Micro-interactions (hovers, focus states, active states, drawer transitions) use standard CSS transition tokens.
- **Accessibility First**: Respects `prefers-reduced-motion: reduce`. When reduced motion is requested, scroll triggers display elements immediately without translation or opacity fades.

---

## 2. GSAP Scroll Engine (`src/lib/scroll-animations.ts`)

The animation script automatically initializes on page load and watches elements matching specific HTML data-attributes:

### `[data-reveal]`
- **Effect**: Element fades in from `opacity: 0` and rises `30px` as it enters the viewport.
- **GSAP Config**: `duration: 0.6s`, `ease: "power2.out"`, `scrollTrigger: { trigger, start: "top 85%" }`.
- **Usage**:
  ```html
  <h2 data-reveal>Engineered for High-Scale Digital Products</h2>
  ```

### `data-reveal-delay`
- **Effect**: Staggers entrance animations for grid items (cards, bento tiles, logos).
- **Usage**:
  ```html
  <div class="card-grid">
    <div class="card" data-reveal data-reveal-delay="0.1">...</div>
    <div class="card" data-reveal data-reveal-delay="0.2">...</div>
    <div class="card" data-reveal data-reveal-delay="0.3">...</div>
  </div>
  ```

### `[data-scroll="rise"]`
- **Effect**: Elements rise `80px` smoothly as the user scrolls.

### `[data-scroll="scale"]`
- **Effect**: Smoothly scales element from `0.92` up to `1.0` as it reaches center viewport.

### `[data-scroll="fade-up"]`
- **Effect**: Clean 40px fade-up transition.

### `[data-scroll="parallax"]`
- **Effect**: Continuous vertical parallax scrub synced to scroll progress.

---

## 3. Dynamic Pillar Theme Engine

On service detail pages (`src/pages/services/[slug].astro`), dynamic theme color tokens are injected into CSS variables at runtime based on the active service pillar slug:

```css
:root {
  --theme-base: var(--svc-strategy);        /* e.g. #FA4108 */
  --theme-dark: var(--svc-strategy-dark);   /* e.g. #A22A05 */
  --theme-light: var(--svc-strategy-light); /* e.g. #FF8F66 */
  --theme-glow: rgba(250, 65, 8, 0.25);
}
```

Components (such as hero headers, bento cards, toolkit chips, and CTA buttons) reference `var(--theme-base)` and `var(--theme-glow)`, creating an immersive, theme-aligned visual atmosphere per pillar.

---

## 4. Duration & Easing Scale

### Duration Tokens
- `--duration-instant`: `100ms` (Micro-feedback, click active state)
- `--duration-fast`: `200ms` (Hover color shifts, chip toggles)
- `--duration-normal`: `300ms` (Card hovers, nav menu toggle)
- `--duration-slow`: `400ms` (Overlay fades, drawer slides)
- `--duration-xslow`: `500ms` (Page transitions, modal entrances)

### Easing Tokens
- `--easing-smooth`: `cubic-bezier(0.22, 1, 0.36, 1)` (Primary smooth curve)
- `--easing-editorial`: `cubic-bezier(0.16, 1, 0.3, 1)` (High-end editorial curve)
- `--easing-spring`: `cubic-bezier(0.34, 1.56, 0.64, 1)` (Snappy spring pop)
- `--easing-in-out`: `cubic-bezier(0.4, 0, 0.2, 1)` (Standard deceleration)

---

## 5. Micro-Interaction Presets

| State | CSS Property / Token | Visual Result |
|---|---|---|
| **Button Hover** | `transform: translateY(-2px)`, `box-shadow: 0 4px 16px rgba(...)` | Subtle lift & shadow glow |
| **Card Hover** | `transform: translateY(-4px)`, `--surface-hover` bg | Card elevation lift |
| **Pillar Chip Check** | `border-color: var(--accent-warm)`, `box-shadow: 0 0 12px rgba(...)` | Accent border & glow |
| **Image Hover** | `transform: scale(1.03)`, `transition: var(--duration-normal) var(--easing-smooth)` | Smooth image zoom |
| **Link Hover** | `color: var(--color-accent-primary)` | Color transition to yellow accent |
| **Focus State** | `outline: none`, `border-color: var(--accent-warm)` | Warm accent focus ring |
