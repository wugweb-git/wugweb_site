---
title: Tokens Only, No Hardcoded Values
impact: CRITICAL
impactDescription: hardcoded values split the system and cannot be themed
tags: kits, tokens
---

## Tokens Only, No Hardcoded Values

No hardcoded colour, spacing, radius, opacity, shadow, blur, z index or easing in components or pages. Use the token. About 369 px literals exist today. Owner ruling 2026-11-17: the token check for case-study components reports only at first (warn, does not block) and flips to blocking once the case-study components are clean. A finding states the file and line, the literal value (for example `color: #FFFFFF` or `padding: 24px`) and the token it should use; `scripts/kits-inventory.mjs --findings` names tokens with the same value, and the role decides the right one. The CI wiring is site development and waits for the owner.

**Incorrect:**

```css
.chip { border-radius: 999px; box-shadow: 0 4px 12px rgba(0,0,0,.3); }
```

**Correct:**

```css
.chip { border-radius: var(--radius-full); box-shadow: var(--shadow-sm); }
```

Source: components.md, rules.
