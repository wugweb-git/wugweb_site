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

## Fluid type scale — code and doc reconciled *2026-09-29*

**The code now implements this scale.** It previously did not: `--fluid-h2` was
30→36px against the documented 24→36, `--fluid-h3` was 21→24 against 20→28, and
`--fluid-caption` was 12→14 against 10→12. The implemented ramp was malformed —
`h2→h3` was the largest jump in the body range at 1.50x, and `--fluid-h4` and
`--fluid-h5` shared a 20px maximum, so two steps rendered identically on desktop.

| Token | Value | Min | Max |
|---|---|---|---|
| `--fluid-display` | `clamp(2.5rem, 5.5vw + 0.5rem, 5rem)` | 40px | 80px |
| `--fluid-h1` | `clamp(2rem, 4vw + 0.5rem, 3rem)` | 32px | 48px |
| `--fluid-h2` | `clamp(1.5rem, 2.5vw + 0.5rem, 2.25rem)` | 24px | 36px |
| `--fluid-h3` | `clamp(1.25rem, 1.5vw + 0.5rem, 1.75rem)` | 20px | 28px |
| `--fluid-h4` | `clamp(1.06rem, 1vw + 0.5rem, 1.375rem)` | 16.96px | 22px |
| `--fluid-h5` | `clamp(1rem, 0.6vw + 0.7rem, 1.1875rem)` | 16px | 19px |
| `--fluid-body-lg` | `clamp(1rem, 0.25vw + 0.9rem, 1.125rem)` | 16px | 18px |
| `--fluid-body-md` | `clamp(0.9375rem, 0.25vw + 0.875rem, 1rem)` | 15px | 16px |
| `--fluid-body-sm` | `clamp(0.8125rem, 0.1vw + 0.8rem, 0.875rem)` | 13px | 14px |
| `--fluid-label` | `clamp(0.75rem, 0.1vw + 0.73rem, 0.875rem)` | 12px | 14px |
| `--fluid-caption` | `clamp(0.625rem, 0.05vw + 0.62rem, 0.75rem)` | 10px | 12px |

Heading ratios between consecutive maxima: **1.67 · 1.33 · 1.29 · 1.27** — and
`h3 > h4 > h5` now holds at 375, 480, 768, 1024, 1280, 1440 and 1920px.

### `--fluid-h5` is not in the original scale

This doc ran display → h4 then straight to body. But `--t-h5` has **14 uses**,
more than `--t-h4`, so the step is real. Its curve was chosen to stay below h4
at every width; the old code value crossed it (18.89 vs 18.24 at 1024px), which
is the same defect that made the previous scale wrong.

### `--fluid-nano` was removed

It was added to name five 10px uppercase mono micro-labels, because the
implemented `--fluid-caption` bottomed out at 12px. The **documented** caption
is 10→12px, which is exactly that role — so restoring the documented value made
the extra token redundant. Those labels now use `--t-micro` and render ~10.4px.

### `--fluid-body-lg` is 16 → 18px, not the documented 16 → 20px

The documented curve crossed `--fluid-h4` between roughly 590 and 1250px: at
1024 lead body text rendered **19.1px against an h4 at 18.2px**. A heading must
never be smaller than the body text beneath it, and that invariant outranks
either specific curve — so the lead size gave way and the heading scale is
untouched.

Verified at 320, 375, 480, 592, 768, 900, 1024, 1152, 1280, 1440 and 1920px:
`display > h1 > h2 > h3 > h4 > h5` holds strictly, and `h4 > body-lg ≥ body-md`
holds at every one.

`--fluid-h5` sits at or just under `--fluid-body-lg` in the 768–1024 band. That
is deliberate and not chased further: h5 is the smallest heading and body-lg is
the largest body size, so they are meant to be close — weight and colour
separate them. Forcing `h5 > body-lg` squeezes h5 into a sub-pixel window
between it and h4.
