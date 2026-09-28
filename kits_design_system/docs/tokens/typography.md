# Typography

Source of truth: `src/styles/global.css` `:root`. Inter Tight only · weights via tokens · fluid clamp for viewport scale.

## Font Families

| Token | Value |
|---|---|
| `--core-font-family-base` | `'Inter Tight', system-ui, sans-serif` |
| `--core-font-family-mono` | `'Fragment Mono', ui-monospace, monospace` |
| `--font-display` | `var(--core-font-family-base)` |
| `--font-body` | `var(--core-font-family-base)` |
| `--font-mono` | `var(--core-font-family-mono)` |

## Font Weight Scale

| Token | Value | Usage |
|---|---|---|
| `--font-weight-regular` | `400` | Body copy, captions, placeholder |
| `--font-weight-medium` | `500` | Labels, menu items, nav links, ghost buttons |
| `--font-weight-semibold` | `600` | H3/H4, card titles, default button, active nav |
| `--font-weight-bold` | `700` | H1/H2, Display, metric numbers |
| `--font-weight-extrabold` | `800` | Display (marketing axis) |

## Static Type Scale (`--ts-*`)

| Role | Token | Value |
|---|---|---|
| Display | `--ts-display-size` | `4rem` (64px) |
| H1 | `--ts-h1-size` | `3rem` (48px) |
| H2 | `--ts-h2-size` | `2.25rem` (36px) |
| H3 | `--ts-h3-size` | `1.5rem` (24px) |
| H4 | `--ts-h4-size` | `1.25rem` (20px) |
| Body LG | `--ts-body-lg-size` | `1.25rem` (20px) |
| Body MD | `--ts-body-md-size` | `1rem` (16px) |
| Body SM | `--ts-body-sm-size` | `0.875rem` (14px) |
| Label MD | `--ts-label-md-size` | `0.875rem` (14px) |
| Label SM | `--ts-label-sm-size` | `0.75rem` (12px) |
| Caption | `--ts-caption-size` | `0.75rem` (12px) |
| Code | `--ts-code-size` | `0.875rem` (14px) |

## Fluid Type Scale (`--fluid-*`)

| Role | Token | clamp() | Mobile | Desktop | Weight |
|---|---|---|---|---|---|
| Display | `--fluid-display` | `clamp(2.5rem, 5.5vw + 0.5rem, 5rem)` | 40px | 80px | 800 |
| H1 | `--fluid-h1` | `clamp(2rem, 4vw + 0.5rem, 3rem)` | 32px | 48px | 700 |
| H2 | `--fluid-h2` | `clamp(1.5rem, 2.5vw + 0.5rem, 2.25rem)` | 24px | 36px | 600 |
| H3 | `--fluid-h3` | `clamp(1.25rem, 1.5vw + 0.5rem, 1.75rem)` | 20px | 28px | 600 |
| H4 | `--fluid-h4` | `clamp(1.06rem, 1vw + 0.5rem, 1.375rem)` | 17px | 22px | 600 |
| Body LG | `--fluid-body-lg` | `clamp(1rem, 0.5vw + 0.875rem, 1.25rem)` | 16px | 20px | 400 |
| Body MD | `--fluid-body-md` | `clamp(0.9375rem, 0.25vw + 0.875rem, 1rem)` | 15px | 16px | 400 |
| Body SM | `--fluid-body-sm` | `clamp(0.8125rem, 0.1vw + 0.8rem, 0.875rem)` | 13px | 14px | 400 |
| Label | `--fluid-label` | `clamp(0.75rem, 0.1vw + 0.73rem, 0.875rem)` | 12px | 14px | 500 |
| Caption | `--fluid-caption` | `clamp(0.625rem, 0.05vw + 0.62rem, 0.75rem)` | 10px | 12px | 400 |

## Type Tiers (legacy aliases → Kits)

| Token | Maps to |
|---|---|
| `--t-display` | `var(--fluid-display)` |
| `--t-h1` | `var(--fluid-h1)` |
| `--t-h2` | `var(--fluid-h2)` |
| `--t-h3` | `var(--fluid-h3)` |
| `--t-h4` | `var(--fluid-h4)` |
| `--t-h5` | `var(--ts-h4-size)` (no Kits H5; 20px) |
| `--t-h6` | `var(--ts-body-sm-size)` |
| `--t-xl` / `--t-l` / `--t-lead` | `var(--fluid-body-lg)` |
| `--t-body` | `var(--fluid-body-md)` |
| `--t-sm` | `var(--fluid-body-sm)` |
| `--t-micro` | `var(--fluid-caption)` |

## Line Height Scale (`--core-line-height-*`)

| Name | Value | Token |
|---|---|---|
| None | `1` | `--core-line-height-none` |
| Tight | `1.2` | `--core-line-height-tight` |
| Snug | `1.375` | `--core-line-height-snug` |
| Normal | `1.5` | `--core-line-height-normal` |
| Relaxed | `1.625` | `--core-line-height-relaxed` |
| Loose | `2` | `--core-line-height-loose` |

## Line Height Tiers (`--lh-*`)

| Token | Maps to |
|---|---|
| `--lh-display` / `--lh-h1` / `--lh-tight` | `var(--core-line-height-tight)` |
| `--lh-h2` / `--lh-h3` / `--lh-snug` | `var(--core-line-height-snug)` |
| `--lh-h4` / `--lh-h6` / `--lh-m` / `--lh-s` / `--lh-caption` / `--lh-body` | `var(--core-line-height-normal)` |
| `--lh-h5` | `var(--core-line-height-snug)` |
| `--lh-xl` / `--lh-l` | `var(--core-line-height-relaxed)` |

## Type Hierarchy (wired on frontend)

**Display 800 · H1 700 · H2–H4 600 · labels 500 · body 400**

## Fluid type scale — generated from `src/styles/global.css`

> **Regenerated 2026-09-29.** Every row below was wrong: the doc described a
> scale the code has never had. `--fluid-caption` was documented as 10→12px
> while the code renders 12→14px, `--fluid-label` as a 12→14px clamp while the
> code has a flat 1rem, and `--fluid-h3` as 20→28px against an actual 21→24px.
> All twelve diverged. The values here are now read out of `global.css`.

| Token | Declared value | Min | Max |
|---|---|---|---|
| `--fluid-display` | `clamp(3rem, 2.217rem + 3.478vw, 5rem)` | 48px | 80px |
| `--fluid-h1` | `clamp(2.25rem, 1.957rem + 1.304vw, 3rem)` | 36px | 48px |
| `--fluid-h2` | `clamp(1.875rem, 1.728rem + 0.652vw, 2.25rem)` | 30px | 36px |
| `--fluid-h3` | `clamp(1.3125rem, 1.239rem + 0.326vw, 1.5rem)` | 21px | 24px |
| `--fluid-h4` | `clamp(1.125rem, 1.076rem + 0.217vw, 1.25rem)` | 18px | 20px |
| `--fluid-h5` | `clamp(1rem, 0.902rem + 0.435vw, 1.25rem)` | 16px | 20px |
| `--fluid-body-lg` | `clamp(1rem, 0.951rem + 0.217vw, 1.125rem)` | 16px | 18px |
| `--fluid-body-md` | `clamp(0.875rem, 0.826rem + 0.217vw, 1rem)` | 14px | 16px |
| `--fluid-body-sm` | `clamp(0.8125rem, 0.788rem + 0.109vw, 0.875rem)` | 13px | 14px |
| `--fluid-label` | `1rem` | 16px | 16px |
| `--fluid-caption` | `clamp(0.75rem, 0.701rem + 0.217vw, 0.875rem)` | 12px | 14px |
| `--fluid-nano` | `0.625rem` | 10px | 10px |

`--t-*` are aliases onto these: `--t-h1`…`--t-h5`, `--t-lead`/`--t-l`/`--t-xl`
→ body-lg, `--t-body` → body-md, `--t-sm` → body-sm, `--t-micro` → caption,
`--t-nano` → nano.

`--fluid-nano` is **flat 10px, not a clamp** — it names the five uppercase mono
micro-labels that were hardcoded at 10px because the scale bottomed out at 12px.
A fluid step would have rendered them ~12px on desktop, which is the change the
token exists to prevent. `--fluid-label` is flat for the same reason.
