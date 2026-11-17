---
title: Logo Minimum Size And Clear Space
impact: MEDIUM
impactDescription: a logo below the floor or crowded by other elements loses its mark
tags: kits, brand, logo
---

## Logo Minimum Size And Clear Space

The logo is never shown below 40px high, the nav logo size and the floor. It keeps clear space on every side equal to the rendered height of the mark, sits on black only, and uses the real files: lockup `logo-large.svg`, mark `logo-small.svg`. Values in `references/component-sizes.md`. The rule is owned by `wugweb-brand-os`; kits holds the value and the check.

**Incorrect:**

```css
.footer-logo { height: 28px; margin: 4px; background: var(--neutral-1); }
```

**Correct:**

```css
.footer-logo { height: var(--nav-logo-height); margin: var(--nav-logo-height); }
```

Source: wugweb-brand-os art-direction.md (owner, 2026-11-17).
