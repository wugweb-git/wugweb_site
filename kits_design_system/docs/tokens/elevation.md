# Elevation

Source of truth: `src/styles/global.css` `:root`. Choose elevation instead of composing shadows manually.

Each elevation bundles a shadow and (where relevant) a z-index.

## Elevation Scale (`--elevation-*`)

| Token | Shadow | Use |
|---|---|---|
| `--elevation-0` | `none` | Base / flat surfaces |
| `--elevation-1` | `--shadow-xs` | Hover buttons |
| `--elevation-2` | `--shadow-sm` | Cards, inputs |
| `--elevation-3` | `--shadow-md` | Cards on hover, popovers |
| `--elevation-4` | `--shadow-lg` | Dropdowns, sticky panels |
| `--elevation-5` | `--shadow-xl` | Modals, glass panel |

## Layers (`--layer-*`)

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

## Z-Index

Removed 2026-09-29 — the `--z-*` scale is gone and `--layer-*` is the only one.
See [`z-index.md`](z-index.md), which is the single source for layering.
