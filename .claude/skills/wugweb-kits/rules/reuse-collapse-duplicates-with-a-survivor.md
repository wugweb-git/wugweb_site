---
title: Every Duplicate Cluster Gets a Named Survivor
impact: MEDIUM
impactDescription: unmerged duplicates keep diverging and double the maintenance
tags: reuse, migration
---

## Every Duplicate Cluster Gets a Named Survivor

Finding duplicates is easy; the audit stalls at the point where somebody has to
choose. Choose explicitly and on stated criteria, in this order: most consumers,
best accessibility, closest to the token map. Recency is not a criterion — the
newest is often the one written by someone who could not find the other two.

**Incorrect:**

```text
There appear to be three button implementations. Consider consolidating them.
```

Nobody owns this sentence, so nothing happens.

**Correct:**

```
DUPLICATE CLUSTER: button
  src/ui/Button.tsx        18 consumers  focus-visible ✓  tokens ✓   → SURVIVOR
  src/ui/ActionButton.tsx   4 consumers  focus-visible ✗  tokens ~   → deprecated:Button
  src/legacy/Btn.jsx        2 consumers  focus-visible ✗  tokens ✗   → deprecated:Button

  API map:  ActionButton kind="cta"      → Button variant="primary"
            ActionButton kind="warn"     → Button variant="danger"
            Btn.large                    → Button size="lg"

  Plan:     2.5.0 mark deprecated + codemod · 3.0.0 delete
```

```json
{
  "ActionButton": {
    "status": "deprecated:Button",
    "removeIn": "3.0.0",
    "migration": "kind='cta' → variant='primary'; kind='warn' → variant='danger'"
  }
}
```

The API map is what makes this actionable rather than aspirational: without it
the migration is a research task every consumer repeats.
