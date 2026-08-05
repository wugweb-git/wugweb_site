# Accessibility

## Focus

- All interactive elements show a visible focus ring via `:focus-visible`:
  `outline: var(--focus-button) / var(--focus-primary); outline-offset: 2–3px`.
- Inputs use `--focus-input` (`2px solid var(--color-accent-blue)`).

## Motion

- `prefers-reduced-motion: reduce` is respected globally:
  - `scroll-behavior: auto`
  - all animations/transitions collapse to ~0ms
  - GSAP (`src/lib/scroll-animations.ts`) shows elements instantly instead of animating.

## Color / Contrast

- Text primary `#F4F4F4` on page `#050505` — high contrast (never change to pure white, per design decision).
- Muted `#BABABA` / subtle `#7D7D7D` on dark surfaces — keep for secondary text only.
- Yellow is an accent; large yellow surfaces use `--neutral-10` text for contrast.

## Touch Targets

- Mobile nav links / CTAs use `--gap-4` (16px) vertical padding — ≥44px effective targets.
- Mobile menu: single `100dvh` scroll container, no nested scroll; hamburger toggle 44×44px.

## Semantics

- Landmarks: `<header>`, `<nav aria-label>`, `<main>` (via BaseLayout slot), `<footer>`.
- `aria-expanded` / `aria-controls` on the mobile nav toggle.
- `role="tablist"` / `role="tab"` / `role="tabpanel"` on service tier tabs.
- Buttons are real `<button>`; links are real `<a>`.

## Text

- Fluid type uses `clamp()` — respects user zoom without breaking layout.
- `lang` set from `siteSettings.language` (default `en-GB`).
