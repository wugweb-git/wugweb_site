---
title: Record Both Directions of Every Edge
impact: HIGH
impactDescription: without usedBy, nothing can ever be safely deleted
tags: map, traceability
---

## Record Both Directions of Every Edge

Each component record stores what it consumes (tokens, primitive components) and
what consumes it. `consumes` answers *what breaks if I change this token*.
`usedBy` answers *who do I have to tell before I delete this component* — and
without that answer, deletion never happens. A system that cannot delete only
accretes, which is how a library ends up with three buttons.

Generate both from the code rather than typing them; a hand-maintained edge list
is wrong by the second sprint.

**Incorrect:**

```json
{
  "components": {
    "Button": { "variants": ["primary", "secondary"] }
  }
}
```

Nothing traceable. Changing `color.action.primary` is a guess, and deleting
`Chip` is a leap of faith.

**Correct:**

```json
{
  "components": {
    "Button": {
      "layer": 5,
      "builtFrom": ["Box", "Text", "Icon"],
      "consumes": ["button.primary.bg", "space.inset.md", "radius.control"],
      "variants": ["primary", "secondary", "ghost", "danger"],
      "states": ["default", "hover", "active", "focus-visible", "disabled", "loading"],
      "usedBy": ["LoginForm", "Toolbar", "EmptyState"],
      "status": "stable"
    }
  }
}
```

A component with `"usedBy": []` and `status: stable` is a finding, not a feature:
either it is dead, or the extractor is not seeing real usage. Both are worth
knowing.
