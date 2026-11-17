# Layout

Layout primitives implemented in `src/styles/global.css`.

> **See [`layout-shell.md`](layout-shell.md) first.** It holds the authoritative
> canvas → section → content skeleton (supplied 2026-10-03) and the rule that
> governs this whole file: **the section owns the gutter, the content owns the
> max-width.** The `.wrap` delta it once recorded is closed: `.wrap` is 1200px
> content, as specified.

## Page Containers

| Class | Max-width | Use |
|---|---|---|
| `.wrap` | `1200px` content (+ gutters) | The section — owns the only page gutter. See layout-shell.md |
| `.page` | `90rem` (1440px) | Legacy page container. Nothing on the site may be wider than the nav (1280); prefer `.wrap` |

## Grid

| Class | Behavior |
|---|---|
| `.grid` | 4 cols mobile → 8 tablet (768) → 12 desktop (**1200**); gap `--grid-gap` 16 / 24 / 32 |

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
| `--space-section-xs` … `--space-section-xl` | `48px` mobile, `70px` at 768, `96px` at 1200 |

All five names carry the same value: there is one section rhythm, 48 / 70 / 96, set in
`global.css` and specified in `layout-shell.md`. The old 32 / 40 / 48 / 64 / 80 ladder is
retired.
