# Shadows

Source of truth: `src/styles/global.css` `:root`. Never hardcode box-shadows.

## Shadow Scale (`--shadow-*`)

| Token | Value |
|---|---|
| `--shadow-none` | `none` |
| `--shadow-xs` | `0 1px 2px rgba(0,0,0,.08)` |
| `--shadow-sm` | `0 2px 6px rgba(0,0,0,.10)` |
| `--shadow-md` | `0 8px 24px rgba(0,0,0,.12)` |
| `--shadow-lg` | `0 16px 48px rgba(0,0,0,.16)` |
| `--shadow-xl` | `0 24px 64px rgba(0,0,0,.20)` |
| `--shadow-2xl` | `0 32px 80px rgba(0,0,0,.24)` |
| `--shadow-inner` | `inset 0 1px 4px rgba(0,0,0,.12)` |

## Glow Shadows

| Token | Value |
|---|---|
| `--shadow-glow-blue` | `0 0 40px rgba(33,103,233,.35)` |
| `--shadow-glow-pink` | `0 0 40px rgba(230,48,159,.35)` |
| `--shadow-glow-teal` | `0 0 40px rgba(9,226,192,.35)` |

## Legacy Aliases

| Token | Maps to |
|---|---|
| `--shadow` | `var(--shadow-sm)` |
| `--shadow-lg` | `var(--shadow-md)` |
| `--shadow-nav` | `0px 5px 10px 0px rgba(0,0,0,.25)` |

## Elevation Mapping

| Elevation | Shadow | Use |
|---|---|---|
| `--elevation-0` | none | base |
| `--elevation-1` | `--shadow-xs` | hover buttons |
| `--elevation-2` | `--shadow-sm` | cards |
| `--elevation-3` | `--shadow-md` | cards on hover, popovers |
| `--elevation-4` | `--shadow-lg` | dropdowns, sticky panels |
| `--elevation-5` | `--shadow-xl` | modals, glass panel |

See `elevation.md`.
