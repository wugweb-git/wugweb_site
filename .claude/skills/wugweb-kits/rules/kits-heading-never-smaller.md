---
title: A Heading Is Never Smaller Than Its Body
impact: HIGH
impactDescription: a heading that renders smaller than the text under it inverts the hierarchy at some widths
tags: kits, type
---

## A Heading Is Never Smaller Than Its Body

At every width, display > h1 > h2 > h3 > h4 > h5 strictly, and h4 > body-lg >= body-md. When a fluid curve would cross, the body size gives way and the heading scale stays. Type is Inter Tight only and weights come from the `--font-weight-*` tokens. Check at 375, 768, 1024 and 1200, not at one width.

**Incorrect:**

```css
.lead { font-size: clamp(1rem, 1vw + 0.8rem, 1.25rem); } /* 19.1px beside an h4 at 18.2px at 1024 */
.title { font-weight: 650; }
```

**Correct:**

```css
.lead { font-size: var(--fluid-body-lg); } /* 16 to 18, below h4 at every width */
.title { font-weight: var(--font-weight-semibold); }
```

Source: typography.md, the body-lg note and Font Weight Scale.
