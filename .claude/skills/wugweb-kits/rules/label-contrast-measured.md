---
title: Contrast Is Measured and Stated
impact: HIGH
impactDescription: unmeasured contrast claims fail audits
tags: label, a11y
---

## Contrast Is Measured and Stated

State a computed ratio for each text and background pair and each state. Use scripts/contrast.mjs. Muted text #bababa on #191919 and #f4f4f4 on #191919 are live colours and are not changed to pass.

**Incorrect:**

```text
Contrast: passes AA
```

**Correct:**

```text
node scripts/contrast.mjs "#f4f4f4" "#191919"
```

Source: spec-measure-dont-claim.
