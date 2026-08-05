# Spacing

Source of truth: `src/styles/global.css` `:root`. Never hardcode spacing.

## Numeric Ramp (`--s-*` / `--p-*` / `--gap-*`)

| n | `--s-n` | `--p-n` | `--gap-n` |
|---|---|---|---|
| 0 | `0` | `0` | `0` |
| 1 | `4px` | `4px` | `4px` |
| 2 | `8px` | `8px` | `8px` |
| 3 | `12px` | `12px` | `12px` |
| 4 | `16px` | `16px` | `16px` |
| 5 | `20px` | `20px` | `20px` |
| 6 | `24px` | `24px` | `24px` |
| 7 | `28px` | `28px` | `28px` |
| 8 | `32px` | `32px` | `32px` |
| 9 | `36px` | `36px` | `36px` |
| 10 | `40px` | `40px` | `40px` |
| 11 | `44px` | `44px` | `44px` |
| 12 | `48px` | `48px` | `48px` |

## Gap Aliases

| Token | Value |
|---|---|
| `--gap-xs` | `var(--gap-2)` (8px) |
| `--gap-sm` | `var(--gap-3)` (12px) |
| `--gap` | `var(--gap-4)` (16px) |
| `--gap-md` | `var(--gap-6)` (24px) |
| `--gap-lg` | `var(--gap-8)` (32px) |
| `--gap-xl` | `var(--gap-9)` (36px) |

## Responsive Section Spacing (`--space-section-*`)

| Token | Value |
|---|---|
| `--space-section-xs` | `32px` |
| `--space-section-sm` | `40px` |
| `--space-section-md` | `48px` |
| `--space-section-lg` | `64px` |
| `--space-section-xl` | `80px` |

## Page Gutter (`--space-page-*`)

| Token | Value |
|---|---|
| `--space-page-xs` | `16px` |
| `--space-page-sm` | `20px` |
| `--space-page-md` | `32px` |
| `--space-page-lg` | `40px` |
| `--space-page-xl` | `48px` |
