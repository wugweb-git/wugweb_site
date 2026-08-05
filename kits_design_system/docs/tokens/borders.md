# Borders / Stroke

Source of truth: `src/styles/global.css` `:root`. Never hardcode border widths or colors.

## Stroke Width Scale

| Token | Value |
|---|---|
| `--stroke-hairline` | `0.5px` |
| `--stroke-thin` | `1px` |
| `--stroke-regular` | `2px` |
| `--stroke-medium` | `3px` |
| `--stroke-thick` | `4px` |
| `--stroke-heavy` | `6px` |

## Semantic Stroke

| Token | Value |
|---|---|
| `--stroke-card` | `var(--stroke-thin)` |
| `--stroke-button` | `var(--stroke-thin)` |
| `--stroke-input` | `var(--stroke-thin)` |
| `--stroke-focus` | `var(--stroke-regular)` |
| `--stroke-divider` | `var(--stroke-thin)` |
| `--stroke-hero` | `var(--stroke-thin)` |

## Border Colors

| Token | Value |
|---|---|
| `--line` | `rgba(255, 255, 255, 0.05)` |
| `--line-strong` | `rgba(255, 255, 255, 0.12)` |
| `--color-border-subtle` | `#2B2B2B` |
| `--color-border-strong` | `var(--neutral-5)` |

## Usage

```css
border: var(--stroke-thin) solid var(--line);
outline: var(--focus-primary); /* = 2px solid var(--color-accent-primary) */
```
