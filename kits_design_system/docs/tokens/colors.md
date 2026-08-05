# Colors

Source of truth: `src/styles/global.css` `:root`. Never hardcode colors — always use tokens.

## Neutral Scale (Framer S1 numbering)

| Token | Value |
|---|---|
| `--neutral-0` | `#FFFFFF` |
| `--neutral-1` | `#F4F4F4` |
| `--neutral-2` | `#DFDFDF` |
| `--neutral-3` | `#BABABA` |
| `--neutral-4` | `#A3A3A3` |
| `--neutral-5` | `#7D7D7D` |
| `--neutral-6` | `#444444` |
| `--neutral-7` | `#2B2B2B` |
| `--neutral-8` | `#1A1A1A` |
| `--neutral-9` | `#050505` |
| `--neutral-10` | `#000000` |

## Brand / Primary

| Token | Value |
|---|---|
| `--color-yellow` | `#FFBE1A` |
| `--color-grey` | `#C9C9C9` |
| `--color-ash` | `#191919` |

## Secondary

| Token | Value |
|---|---|
| `--color-peach` | `#E54F30` |
| `--color-green` | `#3ED219` |
| `--color-blue` | `#2368D7` |
| `--color-aqua` | `#09E2C0` |

## Semantic — Surface / Text / Border / Accent / Feedback

| Role | Token | Value |
|---|---|---|
| Page bg | `--color-surface-page` | `#050505` |
| Inverse | `--color-surface-inverse` | `#FFFFFF` |
| Elevated | `--color-surface-elevated` | `#191919` |
| Hover surface | `--color-surface-hover` | `#555` |
| Text primary | `--color-text-primary` | `#F4F4F4` |
| Text secondary | `--color-text-secondary` | `#BABABA` |
| Text muted | `--color-text-muted` | `#7D7D7D` |
| Border subtle | `--color-border-subtle` | `#2B2B2B` |
| Border strong | `--color-border-strong` | `var(--neutral-5)` |
| Accent primary | `--color-accent-primary` | `#FFBE1A` |
| Accent blue | `--color-accent-blue` | `#2368D7` |
| Accent lime | `--color-accent-lime` | `#ACF80B` |
| Success | `--color-feedback-success` | `#3ED219` |
| Error | `--color-feedback-error` | `#E54F30` |

## Legacy Color Aliases

| Token | Maps to |
|---|---|
| `--bg` | `var(--color-surface-page)` |
| `--surface` | `var(--color-surface-elevated)` |
| `--surface-2` | `var(--neutral-7)` |
| `--bg-elevated` | `var(--neutral-7)` |
| `--fg` | `var(--color-text-primary)` |
| `--fg-muted` | `var(--color-text-secondary)` |
| `--fg-subtle` | `var(--neutral-4)` |
| `--accent` / `--accent-warm` | `var(--color-accent-primary)` |
| `--line` | `rgba(255, 255, 255, 0.05)` |
| `--line-strong` | `rgba(255, 255, 255, 0.12)` |

## Hero overlay (shared home + about)

| Token | Value |
|---|---|
| `--hero-overlay` | `rgba(10, 10, 12, 0.75)` |
| `--hero-overlay-mid` | `rgba(10, 10, 12, 0.5)` |

## Yellow usage rule

Yellow (`--color-yellow` / `--color-accent-primary`) is a **brand accent, not a primary
UI color**. Maximum ~10% of any page. The primary interface stays grey / ash / black
(`--color-surface-elevated`, `--neutral-*`). Keep yellow to small surfaces: nav CTA,
eyebrows, stat numbers, small solid buttons.

See also: `service-colors.md` for the 6-service `--svc-*` palette.
