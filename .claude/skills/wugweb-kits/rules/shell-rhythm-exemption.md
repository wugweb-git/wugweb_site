---
title: Only the Final CTA Is Exempt From Section Rhythm
impact: MEDIUM
impactDescription: extra exemptions erode the one rhythm 48, 70, 96
tags: shell, layout
---

## Only the Final CTA Is Exempt From Section Rhythm

Every section follows the shared rhythm. The only exemption is .global-final-cta. A new exemption needs the owner, not a local override.

**Incorrect:**

```css
.service-strip { padding-block: 120px; }
```

**Correct:**

```css
.service-strip { padding-block: var(--section-y); }
```

Source: layout-shell.md, rhythm.
