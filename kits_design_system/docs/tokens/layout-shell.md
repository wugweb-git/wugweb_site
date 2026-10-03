# Layout shell — canvas · section · content

**Authoritative spec, supplied 2026-10-03.** Captured verbatim from the Framer
canvas definitions. This is the page skeleton every section is built on.

## The rule in one line

**The section owns the gutter. The content owns the max-width.**

A section is always full-bleed (`width: 100%`) and carries the only horizontal
padding. Inside it sits one content box that is also `width: 100%` but capped at
`max-width: 1200px` with **zero padding of its own**. Nothing else sets a page
gutter.

```
┌─ canvas ──────────────────────────────────────────────┐  bg #050505, no padding
│ ┌─ section ───────────────────────────────────────┐   │  width 100%, padding = gutter
│ │        ┌─ content ─────────────────┐            │   │  width 100%, max-width 1200, padding 0
│ │        │                           │            │   │
│ │ ←48px→ └───────────────────────────┘ ←48px→     │   │
│ └─────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────┘
```

## Per breakpoint

| | canvas | section padding (T R B L) | content max-width | content gap |
|---|---|---|---|---|
| **small** (mobile) | 375 | `48px 16px 48px 16px` | 1200 | 24 |
| **medium** (tablet) | 768 | `70px 32px 70px 32px` | 1200 | 24 |
| **large** (desktop) | 1200 | `96px 48px 96px 48px` | 1200 | 0 |

## Exact declarations

### Canvas — the page root
```css
width: <breakpoint>;        /* 375 · 768 · 1200 */
height: min-content;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
background-color: var(--Black_Background, #050505);
overflow: visible;
padding: 0;
gap: 0;
```

### Section
```css
box-sizing: border-box;
flex-shrink: 0;
width: 100%;
height: min-content;
display: flex;
flex-direction: column;
justify-content: center;
padding: 96px 48px;         /* large · 70px 32px medium · 48px 16px small */
position: relative;
gap: 0;
```
`align-items`: `center` on small and large, **`flex-start` on medium (tablet)**.
`overflow`: `visible` on large, **`hidden` on small and medium**.

### Content — the inner box
```css
flex-shrink: 0;
width: 100%;
height: min-content;
max-width: 1200px;          /* the ONLY max-width in the shell */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0;                 /* never a gutter here */
position: relative;
gap: 0;                     /* large — 24 on small and medium */
```
`z-index: 1` on small and medium; unset on large.

### Top nav (sticky)
```css
box-sizing: border-box;
flex-shrink: 0;
width: 100%;
height: min-content;        /* 118px at large */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 20px;              /* uniform, all four sides */
position: sticky;
top: 0;
z-index: 10;
will-change: transform;
gap: 0;
```

## ⚠️ Three deltas against the current implementation

Recorded, not reconciled — changing any of these is a design decision.

| | this spec | code today | where |
|---|---|---|---|
| content max-width | **1200px** | `1280px` (`80rem`) | `.wrap`, `global.css:1088` |
| desktop gutter | **48px** | `44px` (`--gap-6 + --gap-5`) | `global.css:1093` |
| desktop breakpoint | **1200** | `1280` (`--breakpoint-xl`) | breakpoint scale |

> **On that last row — I changed it, and this spec says I was wrong.** The code
> used `1200px` in two rules; on 2026-09-29 I "reconciled" them to `1280` to
> match `--breakpoint-xl`, on the reasoning that 1200 matched no declared token.
> It matched *this*. The two rules were `.wrap` padding and `.site-header`
> padding — both gutter bumps, which is exactly what this spec governs.

Also note the nav: this spec says uniform `padding: 20px`; the code has
`var(--gap-5) var(--gap-6) 0` — asymmetric, with no bottom padding.
