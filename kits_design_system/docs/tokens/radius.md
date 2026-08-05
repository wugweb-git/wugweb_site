# Radius

Source of truth: `src/styles/global.css` `:root`. Never hardcode border radius.

## Radius Scale

| Token | Value | Alias |
|---|---|---|
| `--r-0` | `0px` | `--radius-none` |
| `--r-1` | `4px` | `--radius-xs` |
| `--r-2` | `8px` | `--radius-sm` |
| `--r-3` | `12px` | `--radius-md` |
| `--r-4` | `16px` | `--radius-lg` |
| `--r-5` | `20px` | `--radius-xl` |
| `--r-6` | `24px` | `--radius-2xl` |
| `--r-8` | `32px` | `--radius-3xl` |
| `--r-full` | `9999px` | `--radius-full` |

## Legacy Radius Aliases

| Token | Maps to |
|---|---|
| `--r-sm` | `var(--r-1)` |
| `--r` | `var(--r-2)` |
| `--r-md` | `var(--r-3)` |
| `--r-lg` | `var(--r-4)` |
| `--r-xl` | `var(--r-6)` |
| `--r-pill` | `var(--r-full)` |

## Usage Rules

- **Buttons** = `--radius-sm` (8px): `.btn` + variants, `.nav-cta`, `.svc-btn`, form submit, subscribe.
- **Chips / tags / pills** = `--radius-full`: filter chips, industry tags, toolkit chips, service tags, bento-stack chips.
- Cards / media = `--radius-md` → `--radius-lg` (12–16px) depending on size.
