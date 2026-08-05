# Blur

Source of truth: `src/styles/global.css` `:root`. Never hardcode blur.

## Blur Scale (`--blur-*`)

| Token | Value |
|---|---|
| `--blur-none` | `0` |
| `--blur-xs` | `4px` |
| `--blur-sm` | `8px` |
| `--blur-md` | `16px` |
| `--blur-lg` | `24px` |
| `--blur-xl` | `40px` |
| `--blur-glass` | `60px` |
| `--blur-extreme` | `100px` |

## Usage

- Nav bar / glass panel: `--glass-medium` (`blur(24px) saturate(1.3)`)
- Pillars blurred backdrop: `--blur-extreme` (100px)
- Mega menu / modal: `--glass-heavy` (`blur(40px)`)

Prefer the `--glass-*` tokens (see `glass.md`) over raw `blur()` in components.
