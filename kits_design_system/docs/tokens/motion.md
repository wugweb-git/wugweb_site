# Motion

Source of truth: `src/styles/global.css` `:root`. Motion should be purposeful, calm, and premium — not flashy. Animations go through GSAP (`src/lib/scroll-animations.ts`) for entrances/scroll; CSS tokens drive transitions/hovers.

## Duration (`--duration-*`)

| Token | Value |
|---|---|
| `--duration-instant` | `100ms` |
| `--duration-ms-150` | `150ms` |
| `--duration-fast` | `200ms` |
| `--duration-normal` | `300ms` |
| `--duration-slow` | `400ms` |
| `--duration-xslow` | `500ms` |
| `--duration-ms-500` | `500ms` |
| `--duration-ms-700` | `700ms` |
| `--duration-ms-1000` | `1000ms` |

## Easing (`--easing-*`)

| Token | Value |
|---|---|
| `--easing-in` | `cubic-bezier(0.4, 0, 1, 1)` |
| `--easing-out` | `cubic-bezier(0, 0, 0.2, 1)` |
| `--easing-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--easing-linear` | `linear` |
| `--easing-standard` | `var(--easing-in-out)` |
| `--easing-accelerate` | `var(--easing-in)` |
| `--easing-decelerate` | `var(--easing-out)` |
| `--easing-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| `--easing-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| `--easing-smooth` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--easing-editorial` | `cubic-bezier(0.16, 1, 0.3, 1)` |

## Transitions (`--transition-*`)

| Token | Value |
|---|---|
| `--transition-page` | `opacity 300ms smooth, transform 300ms smooth` |
| `--transition-overlay` | `opacity 400ms smooth` |

## GSAP System (`src/lib/scroll-animations.ts`)

Single animation system. Attributes:

- `[data-reveal]` — fade + rise on scroll into view (600ms, `power2.out`).
- `data-reveal-delay="0.1"` — stagger for card grids.
- `[data-scroll="rise"]` — rise 80px.
- `[data-scroll="scale"]` — scale 0.92 → 1.
- `[data-scroll="fade-up"]` — fade + 40px rise.
- `[data-scroll="parallax"]` — parallax scrub.

Reduced motion is respected (elements just appear).

## Hover Presets (CSS)

| Token | Effect |
|---|---|
| `--hover-button` | scale 1.02 + `--shadow-xs` |
| `--hover-card` | translateY(-4px) + `--shadow-md` |
| `--hover-image` | scale 1.03 |
| `--hover-link` | color → `--color-accent-primary` |
| `--hover-icon` | opacity → 1 |
| `--hover-input` | border-color → `--fg` |

## Focus (`--focus-*`)

| Token | Value |
|---|---|
| `--focus-primary` | `2px solid var(--color-accent-primary)` |
| `--focus-secondary` | `2px solid var(--color-accent-blue)` |
| `--focus-brand` | `2px solid var(--color-accent-primary)` |
| `--focus-input` | `2px solid var(--color-accent-blue)` |
| `--focus-button` | `2px solid var(--color-accent-primary)` |

## Selection

```css
::selection { background: var(--selection-brand); color: var(--color-ash); }
```

| Token | Value |
|---|---|
| `--selection-brand` | `var(--color-accent-primary)` |
| `--selection-inverse` | `var(--neutral-10)` |
| `--selection-dark` | `var(--neutral-8)` |
| `--selection-light` | `var(--neutral-1)` |

## Cursor

| Token | Value |
|---|---|
| `--cursor-pointer` | `pointer` |
| `--cursor-grab` | `grab` |
| `--cursor-dragging` | `grabbing` |
| `--cursor-disabled` | `not-allowed` |
| `--cursor-loading` | `progress` |
