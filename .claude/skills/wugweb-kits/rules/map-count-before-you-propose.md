---
title: Count Before You Propose
impact: HIGH
impactDescription: a guessed inventory discredits the entire report
tags: map, audit, process
---

## Count Before You Propose

Never propose a token scale before measuring what is in the codebase. The
measurement is also the argument: "47 distinct colors collapse to 12" persuades a
team in a way that "we should adopt design tokens" never has.

Run the counts, show the gap, then design the scale to fit what survives.

**Incorrect:**

```text
The codebase has a lot of inconsistent colors and spacing. I recommend a
standard 8pt spacing scale and a 10-step neutral ramp.
```

Plausible, unverified, and unfalsifiable — so nobody can act on it with
confidence.

**Correct:**

```bash
# Distinct raw colors, ranked by frequency
grep -rhoE '#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)' src/ \
  | tr 'A-F' 'a-f' | sort | uniq -c | sort -rn

# Distinct spacing and size literals
grep -rhoE '\b[0-9]+(\.[0-9]+)?(px|rem|em)\b' src/ | sort | uniq -c | sort -rn

# Declared tokens and their real usage counts (orphans surface as count 1)
grep -rhoE '\-\-[a-z0-9-]+' src/ | sort | uniq -c | sort -rn
```

| Dimension | Distinct found | Survive | Top 5 cover |
|---|---|---|---|
| Color | 47 | 12 | 71% of uses |
| Spacing | 23 | 7 | 84% of uses |
| Radius | 9 | 3 | 96% of uses |

The "top 5 cover" column is what decides scale length: if five values cover 84%
of spacing uses, a 12-step scale is invention, not observation.

When the codebase is unreachable and you are working from a screenshot or pasted
CSS, say so and label every number inferred. Presenting a guess as a measurement
is the one failure that costs the whole report its credibility.
