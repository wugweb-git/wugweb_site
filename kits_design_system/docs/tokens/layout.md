# Layout

Layout primitives implemented in `src/styles/global.css`.

## Page Containers

| Class | Max-width | Use |
|---|---|---|
| `.wrap` | `1280px` | Content container (auto margins + page gutter padding) |
| `.page` | `1440px` | Full-viewport page container with 1440px cap |

## Grid

| Class | Behavior |
|---|---|
| `.grid` | 12-column responsive grid — 4 cols mobile → 8 tablet (768px) → 12 desktop (1024px); gap `--grid-gap` (default `--gap-4`) |

## Page Gutter (`--space-page-*`)

| Token | Value |
|---|---|
| `--space-page-xs` | `16px` |
| `--space-page-sm` | `20px` |
| `--space-page-md` | `32px` |
| `--space-page-lg` | `40px` |
| `--space-page-xl` | `48px` |

## Section Spacing (`--space-section-*`)

| Token | Value |
|---|---|
| `--space-section-xs` | `32px` |
| `--space-section-sm` | `40px` |
| `--space-section-md` | `48px` |
| `--space-section-lg` | `64px` |
| `--space-section-xl` | `80px` |
