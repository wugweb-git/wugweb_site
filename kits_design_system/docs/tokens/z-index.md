# Z-Index / Layers

Source of truth: `src/styles/global.css` `:root`. Never hardcode z-index.

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
| `--layer-skip-link` | `9999` | Skip link — first thing a keyboard user reaches |

## Usage

```css
.site-header  { z-index: 50; }                      /* see the note below */
.hero-overlay { z-index: var(--layer-base); }
.modal        { z-index: var(--layer-modal); }
.skip-link    { z-index: var(--layer-skip-link); }
```

> **The `--z-*` scale was removed on 2026-09-29.** It had two uses against
> `--layer-*`'s 39, both `--z-overlay` (1), which is exactly `--layer-base`. A third
> reference, `var(--z-skip-link, 9999)`, pointed at a token that **was never defined
> anywhere** — the fallback was doing all the work. It is now `--layer-skip-link`.
>
> **Nine ad-hoc values remain outside this scale** and are deliberately not
> renumbered: `.site-header` 50, `.explorer-drawer-overlay` 1000,
> `.preview-drawer-overlay` / `.checkout-modal-overlay` 2000,
> `.install-banner-wrap` 9998, `.cookie-banner-wrap` / `.reading-progress-bar` 9999,
> `.cookie-modal-overlay` 10000. This scale tops out at `--layer-overlay` 140, so
> pulling them onto it would reorder them against other hardcoded values. The one
> hazard — the two 9999s tying in different stylesheets — was measured: they do not
> overlap (0–3px vs 769–935px), so it is latent, not live.
