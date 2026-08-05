# Z-Index / Layers

Source of truth: `src/styles/global.css` `:root`. Never hardcode z-index.

## Z-Index Scale (`--z-*`)

| Token | Value |
|---|---|
| `--z-base` | `0` |
| `--z-overlay` | `1` |
| `--z-sticky` | `50` |
| `--z-modal` | `100` |
| `--z-toast` | `200` |

## Layer Tokens (`--layer-*`)

| Token | Value | Use |
|---|---|---|
| `--layer-background` | `0` | Page background |
| `--layer-base` | `1` | Base content |
| `--layer-card` | `10` | Cards |
| `--layer-popover` | `50` | Popovers |
| `--layer-dropdown` | `60` | Dropdowns / mega menu |
| `--layer-modal` | `100` | Modals |
| `--layer-toast` | `120` | Toasts |
| `--layer-tooltip` | `130` | Tooltips |
| `--layer-overlay` | `140` | Overlays / scrims |
| `--layer-cursor` | `9999` | Custom cursor |

## Usage

```css
.site-header { z-index: var(--z-sticky); }
.hero-overlay { z-index: var(--z-overlay); }
.modal { z-index: var(--z-modal); }
```
