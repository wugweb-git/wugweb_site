---
title: Measure Accessibility, Never Assert It
impact: MEDIUM
impactDescription: unverified compliance claims fail audits and mislead teams
tags: spec, accessibility, honesty
---

## Measure Accessibility, Never Assert It

"WCAG AA compliant" in a spec sheet is a claim about a number nobody computed. It
survives until a real audit, where it fails and takes the credibility of every
other line with it. Compute the ratio, print it, and say which state it applies
to — disabled and hover states are where systems quietly fall below threshold.

**Incorrect:**

```markdown
## Accessibility
- WCAG 2.1 AA compliant
- Keyboard accessible
- Screen reader friendly
```

**Correct:**

```markdown
## Accessibility
- Contrast, measured:
  | State | Foreground | Background | Ratio | AA (4.5:1) |
  |---|---|---|---|---|
  | default | #ffffff | #2563eb | 5.17:1 | pass |
  | hover | #ffffff | #1d4ed8 | 6.70:1 | pass |
  | disabled | #a1a1aa | #f4f4f5 | 2.33:1 | FAIL, exempt as inactive control (1.4.3), but unreadable in sunlight |
- Keyboard: Enter and Space activate; `:focus-visible` ring at 2px offset 2px.
- Target: 40×40 CSS px (AA 2.5.8 requires 24×24; AAA requires 44×44).
- Announced: "Save, button" · loading adds `aria-busy="true"` · disabled uses
  `aria-disabled` so it stays focusable and discoverable.
```

```bash
node scripts/contrast.mjs "#ffffff" "#2563eb"
```

Run the check in CI, so a token change that breaks contrast fails
the build rather than a design review six weeks later.
