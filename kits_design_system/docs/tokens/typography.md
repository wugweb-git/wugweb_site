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
