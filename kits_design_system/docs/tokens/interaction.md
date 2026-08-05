# Interaction

Hover, focus, selection, and cursor presets. Source of truth: `src/styles/global.css` `:root`.

## Hover Presets

| Token | Effect |
|---|---|
| `--hover-button` | scale 1.02 + `--shadow-xs` |
| `--hover-card` | translateY(-4px) + `--shadow-md` |
| `--hover-image` | scale 1.03 |
| `--hover-link` | color → `--color-accent-primary` |
| `--hover-icon` | opacity → 1 |
| `--hover-input` | border-color → `--fg` |

Apply in components:

```css
.card { transition: transform var(--duration-normal) var(--easing-smooth), box-shadow var(--duration-normal) var(--easing-smooth); }
.card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
```

## Focus

| Token | Value |
|---|---|
| `--focus-primary` | `2px solid var(--color-accent-primary)` |
| `--focus-secondary` | `2px solid var(--color-accent-blue)` |
| `--focus-brand` | `2px solid var(--color-accent-primary)` |
| `--focus-input` | `2px solid var(--color-accent-blue)` |
| `--focus-button` | `2px solid var(--color-accent-primary)` |

```css
.btn:focus-visible { outline: var(--focus-button); outline-offset: 3px; }
```

## Selection

| Token | Value |
|---|---|
| `--selection-brand` | `var(--color-accent-primary)` |
| `--selection-inverse` | `var(--neutral-10)` |
| `--selection-dark` | `var(--neutral-8)` |
| `--selection-light` | `var(--neutral-1)` |

```css
::selection { background: var(--selection-brand); color: var(--color-ash); }
```

## Cursor

| Token | Value |
|---|---|
| `--cursor-pointer` | `pointer` |
| `--cursor-grab` | `grab` |
| `--cursor-dragging` | `grabbing` |
| `--cursor-disabled` | `not-allowed` |
| `--cursor-loading` | `progress` |

## Accessibility

- Focus-visible rings on all interactive elements.
- `prefers-reduced-motion: reduce` — animations disabled, elements shown instantly (handled by `scroll-animations.ts` + global CSS).
- Touch targets ≥ 44px on mobile (mobile menu uses `--gap-4` padding).
