---
title: Yellow Is Accent Only, At Most 10%
impact: HIGH
impactDescription: yellow overuse removes its signal
tags: kits, brand
---

## Yellow Is Accent Only, At Most 10%

Kits checks the yellow budget: yellow is an accent, at most 10% of a page, and rests only on the one conversion action per page and the footer banner. The final CTA stays yellow by owner decision. The colour rules behind the budget (the brand colour, pillar colours, the pillar glow exception, the canvas) are owned by `wugweb-brand-os` and are not restated here: read `.claude/skills/wugweb-brand-os/SKILL.md` before reporting a pillar colour or a pillar glow as a finding.

**Incorrect:**

```css
.section-bg { background: var(--color-yellow); }
```

**Correct:**

```css
.btn-solid { background: var(--color-yellow); }
```

Source: components.md, colour. The rule is owned by `wugweb-brand-os`; kits holds the value and the check.
