# Wugweb Kits — Design Tokens (Complete Reference)

> **Source of truth:** `src/styles/global.css` `:root` — this file mirrors every
> token and value. Tokens are the only way to style; never hardcode values.

---

## 1. Typography

### 1.1 Font Families
| Token | Value |
|---|---|
| `--core-font-family-base` | `'Inter Tight', system-ui, sans-serif` |
| `--core-font-family-mono` | `'Fragment Mono', ui-monospace, monospace` |
| `--font-display` | `var(--core-font-family-base)` |
| `--font-body` | `var(--core-font-family-base)` |
| `--font-mono` | `var(--core-font-family-mono)` |

### 1.2 Font Weight Scale
| Token | Value | Usage |
|---|---|---|
| `--font-weight-regular` | `400` | Body copy, captions, placeholder |
| `--font-weight-medium` | `500` | Labels, menu items, nav links, ghost buttons |
| `--font-weight-semibold` | `600` | H3/H4, card titles, default button, active nav |
| `--font-weight-bold` | `700` | H1/H2, Display, metric numbers |
| `--font-weight-extrabold` | `800` | Display (marketing axis) |

### 1.3 Static Type Scale (`--ts-*`)
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

### 1.4 Fluid Type Scale (`--fluid-*`)
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

### 1.5 Type Tiers (legacy aliases → Kits)
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

### 1.6 Line Height Scale (`--core-line-height-*`)
| Name | Value | Token |
|---|---|---|
| None | `1` | `--core-line-height-none` |
| Tight | `1.2` | `--core-line-height-tight` |
| Snug | `1.375` | `--core-line-height-snug` |
| Normal | `1.5` | `--core-line-height-normal` |
| Relaxed | `1.625` | `--core-line-height-relaxed` |
| Loose | `2` | `--core-line-height-loose` |

### 1.7 Line Height Tiers (`--lh-*`)
| Token | Maps to |
|---|---|
| `--lh-display` / `--lh-h1` / `--lh-tight` | `var(--core-line-height-tight)` |
| `--lh-h2` / `--lh-h3` / `--lh-snug` | `var(--core-line-height-snug)` |
| `--lh-h4` / `--lh-h6` / `--lh-m` / `--lh-s` / `--lh-caption` / `--lh-body` | `var(--core-line-height-normal)` |
| `--lh-h5` | `var(--core-line-height-snug)` |
| `--lh-xl` / `--lh-l` | `var(--core-line-height-relaxed)` |

---

## 2. Color

### 2.1 Neutral Scale (Framer S1 numbering)
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

### 2.2 Brand / Primary
| Token | Value |
|---|---|
| `--color-yellow` | `#FFBE1A` |
| `--color-grey` | `#C9C9C9` |
| `--color-ash` | `#191919` |

### 2.3 Secondary
| Token | Value |
|---|---|
| `--color-peach` | `#E54F30` |
| `--color-green` | `#3ED219` |
| `--color-blue` | `#2368D7` |
| `--color-aqua` | `#09E2C0` |

### 2.4 Semantic (Surface / Text / Border / Accent / Feedback)
| Role | Token | Value |
|---|---|---|
| Page bg | `--color-surface-page` | `#050505` |
| Inverse | `--color-surface-inverse` | `#FFFFFF` |
| Elevated | `--color-surface-elevated` | `#191919` |
| Text primary | `--color-text-primary` | `#F4F4F4` |
| Text secondary | `--color-text-secondary` | `#BABABA` |
| Text muted | `--color-text-muted` | `#7D7D7D` |
| Border subtle | `--color-border-subtle` | `#2B2B2B` |
| Accent primary | `--color-accent-primary` | `#FFBE1A` |
| Accent blue | `--color-accent-blue` | `#2368D7` |
| Accent lime | `--color-accent-lime` | `#ACF80B` |
| Success | `--color-feedback-success` | `#3ED219` |
| Error | `--color-feedback-error` | `#E54F30` |

### 2.5 Service Panel Accents (`--svc-*`)
Final user-confirmed mapping (6 services):

| Service | Base | Dark (panel bg) | Light (accent) | Color name |
|---|---|---|---|---|
| Strategy | `--svc-strategy` `#FA4108` | `--svc-strategy-dark` `#A22A05` | `--svc-strategy-light` `#FF8F66` | Signal Orange |
| Brand | `--svc-brand` `#E6309F` | `--svc-brand-dark` `#951F67` | `--svc-brand-light` `#F17CC3` | Vibrant Magenta |
| Experience | `--svc-experience` `#09E2C0` | `--svc-experience-dark` `#05927C` | `--svc-experience-light` `#6EF0DC` | Digital Teal |
| Engineering | `--svc-engineering` `#2167E9` | `--svc-engineering-dark` `#143F8F` | `--svc-engineering-light` `#7FA8F3` | Royal Blue |
| Growth | `--svc-growth` `#3ED219` | `--svc-growth-dark` `#21870F` | `--svc-growth-light` `#9BE97F` | Growth Green |
| Operations | `--svc-operations` `#7A4DFF` | `--svc-operations-dark` `#4F32A5` | `--svc-operations-light` `#B49CFF` | Intelligence Purple |

### 2.6 System Color Roles
| Hex | Service | Role |
|---|---|---|
| `#09E2C0` | Experience | Digital systems, interaction, UX, technology |
| `#2167E9` | Engineering | Structure, engineering, trust, platforms |
| `#3ED219` | Growth | Growth, success, optimization, momentum |
| `#E6309F` | Brand | Brand, creativity, human connection, storytelling |
| `#7A4DFF` | Operations | Intelligence, automation, operations, AI |
| `#FA4108` | Strategy | Strategy, leadership, action, transformation |

### 2.7 Service Color System (full — final, user-confirmed)

| Service | HEX | Color Name | Hero Object | Geometry | Visual Feel | Meaning |
|---|---|---|---|---|---|---|
| **Strategy** | `#FA4108` | Signal Orange | Blueprint, Strategy Canvas, Chess Piece, Compass | Large rounded rectangle with cropped circle | Bold, decisive, directional, editorial | Vision, planning, clarity, transformation, decision-making |
| **Brand** | `#E6309F` | Vibrant Magenta | Brand Card, Packaging, Identity Sheet, Typography Block | Oversized circle with layered cards | Expressive, memorable, creative, premium | Identity, storytelling, emotion, recognition, differentiation |
| **Experience** | `#09E2C0` | Digital Teal | Mobile Device, Interface Screen, Journey Map | Soft circle + rounded UI panels | Human-centered, fluid, intuitive, approachable | User experience, interaction, accessibility, usability |
| **Engineering** | `#2167E9` | Royal Blue | Code Editor, API Block, Browser Window, Architecture Diagram | Structured grids & stacked rounded blocks | Precise, technical, scalable, trustworthy | Engineering excellence, platforms, systems, reliability |
| **Growth** | `#3ED219` | Growth Green | Analytics Chart, Growth Graph, Target, Search Panel | Expanding arcs & upward geometry | Energetic, measurable, optimistic, performance-driven | Growth, optimization, experimentation, acquisition |
| **Operations** | `#7A4DFF` | Intelligence Purple | Gear, Dashboard Panel, Shield, Workflow Board | Layered rounded rectangles with modular blocks | Stable, intelligent, controlled, operational | Automation, optimization, governance, continuous improvement |

### 2.6 Legacy Color Aliases
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

---

## 3. Spacing

### 3.1 Numeric Ramp (`--s-*` / `--p-*` / `--gap-*`)
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

### 3.2 Gap Aliases
| Token | Value |
|---|---|
| `--gap-xs` | `var(--gap-2)` (8px) |
| `--gap-sm` | `var(--gap-3)` (12px) |
| `--gap` | `var(--gap-4)` (16px) |
| `--gap-md` | `var(--gap-6)` (24px) |
| `--gap-lg` | `var(--gap-8)` (32px) |
| `--gap-xl` | `var(--gap-9)` (36px) |

### 3.3 Responsive Section Spacing (`--space-section-*`)
| Token | Value |
|---|---|
| `--space-section-xs` | `32px` |
| `--space-section-sm` | `40px` |
| `--space-section-md` | `48px` |
| `--space-section-lg` | `64px` |
| `--space-section-xl` | `80px` |

### 3.4 Page Gutter (`--space-page-*`)
| Token | Value |
|---|---|
| `--space-page-xs` | `16px` |
| `--space-page-sm` | `20px` |
| `--space-page-md` | `32px` |
| `--space-page-lg` | `40px` |
| `--space-page-xl` | `48px` |

---

## 4. Radius

### 4.1 Radius Scale
| Token | Value | Alias |
|---|---|---|
| `--r-0` | `0px` | `--radius-0` |
| `--r-1` | `4px` | `--radius-1` / `--r-sm` |
| `--r-2` | `8px` | `--radius-2` / `--r` |
| `--r-3` | `12px` | `--radius-3` / `--r-md` |
| `--r-4` | `16px` | `--radius-4` / `--r-lg` |
| `--r-5` | `20px` | `--radius-5` |
| `--r-6` | `24px` | `--radius-6` / `--r-xl` |
| `--r-8` | `32px` | `--radius-8` |
| `--r-full` | `9999px` | `--radius-full` / `--r-pill` |

---

## 5. Shadow
| Token | Value |
|---|---|
| `--shadow` | `rgba(0, 0, 0, 0.25) 0 1.07px 5px 0` |
| `--shadow-lg` | `rgba(0, 0, 0, 0.25) 0 5px 10px 0` |
| `--shadow-nav` | `0px 5px 10px 0px rgba(0, 0, 0, 0.25)` |

---

## 6. Motion

### 6.1 Duration
| Token | Value |
|---|---|
| `--duration-instant` | `100ms` |
| `--duration-fast` | `200ms` |
| `--duration-normal` | `300ms` |
| `--duration-slow` | `400ms` |
| `--duration-xslow` | `500ms` |

### 6.2 Easing
| Token | Value |
|---|---|
| `--easing-in` | `cubic-bezier(0.4, 0, 1, 1)` |
| `--easing-out` | `cubic-bezier(0, 0, 0.2, 1)` |
| `--easing-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--easing-linear` | `linear` |

---

## 7. Breakpoints (documentation only — use literals in @media)
| Name | Token | Value | Cols |
|---|---|---|---|
| Mobile S | `--breakpoint-xs` | `480px` | 4 |
| Mobile L | `--breakpoint-sm` | `640px` | 4 |
| Tablet | `--breakpoint-md` | `768px` | 8 |
| Desktop S | `--breakpoint-lg` | `1024px` | 12 |
| Desktop M | `--breakpoint-xl` | `1280px` | 12 |
| Desktop L | `--breakpoint-2xl` | `1440px` | 12 |

> CSS custom properties CANNOT be used inside `@media` queries — use the literal pixel values.

---

## 8. Grid
| Token | Value |
|---|---|
| `--grid-*` | Grid gutters (4 tokens in global.css) |

---

## 9. Missing / Not Yet Tokenized
- **Opacity**: hardcoded inline values exist (e.g. `opacity: .7`, `.85`, `.92`) — no `--opacity-*` tokens yet
- **Stroke / border-width**: `1px` borders used inline via `--line`/`--line-strong` color tokens, width not tokenized
- **Z-index**: no `--z-*` tokens
