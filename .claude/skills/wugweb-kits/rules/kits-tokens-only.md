---
title: Tokens Only, No Hardcoded Values
impact: CRITICAL
impactDescription: hardcoded values split the system and cannot be themed
tags: kits, tokens
---

## Tokens Only, No Hardcoded Values

No hardcoded colour, spacing, radius, opacity, shadow, blur, z index or easing in components or pages. Use the token. About 369 px literals exist today, so this is reported, not yet a merge block.

**Incorrect:**

```css
.chip { border-radius: 999px; box-shadow: 0 4px 12px rgba(0,0,0,.3); }
```

**Correct:**

```css
.chip { border-radius: var(--radius-full); box-shadow: var(--shadow-sm); }
```

Source: components.md, rules.
