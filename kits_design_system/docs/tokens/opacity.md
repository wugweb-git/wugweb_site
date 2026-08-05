# Opacity

Source of truth: `src/styles/global.css` `:root`. Never hardcode opacity.

## Opacity Scale (`--opacity-*`)

| Token | Value |
|---|---|
| `--opacity-0` | `0` |
| `--opacity-5` | `.05` |
| `--opacity-10` | `.10` |
| `--opacity-20` | `.20` |
| `--opacity-30` | `.30` |
| `--opacity-40` | `.40` |
| `--opacity-50` | `.50` |
| `--opacity-60` | `.60` |
| `--opacity-70` | `.70` |
| `--opacity-80` | `.80` |
| `--opacity-90` | `.90` |
| `--opacity-100` | `1` |

## Semantic Opacity

| Token | Maps to |
|---|---|
| `--opacity-disabled` | `var(--opacity-40)` |
| `--opacity-overlay` | `var(--opacity-70)` |
| `--opacity-scrim` | `var(--opacity-50)` |
| `--opacity-hover` | `var(--opacity-90)` |
| `--opacity-active` | `var(--opacity-100)` |
| `--opacity-loading` | `var(--opacity-60)` |
| `--opacity-drag` | `var(--opacity-80)` |
| `--opacity-backdrop` | `var(--opacity-50)` |

## Usage

- `.svc-num`, logo grids → `var(--opacity-soft)` (`.7`)
- `.svc-tab` default → `var(--opacity-subtle)` (`.5`), hover → `var(--opacity-hover)`
- `.post-thumb-initials`, work placeholder initials → `var(--opacity-strong)` (`.92`)
