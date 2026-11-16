---
title: No Alias Chains
impact: MEDIUM
impactDescription: chains hide the real value and multiply resolution bugs
tags: tokens, architecture
---

## No Alias Chains

A semantic token resolves to a primitive token. Not to another semantic token,
which resolves to another, which resolves to a primitive. Each hop is a place the
value can be overridden in one theme and not another, and a place a reader gives
up.

Chains usually appear during migration, when the old name is kept pointing at the
new one "for now". That is a deprecation, and it belongs in the map with a
pointer and a delete date, not as permanent indirection.

**Incorrect:**

```json
{
  "color.brand": "{color.blue.600}",
  "color.action": "{color.brand}",
  "color.action.primary": "{color.action}",
  "button.primary.bg": "{color.action.primary}"
}
```

Four hops to learn the button is blue. Change `color.brand` and you cannot
predict what moves.

**Correct:**

```json
{
  "color.action.primary": "{color.blue.600}",
  "color.action.danger": "{color.red.600}"
}
```

One hop, one meaning. If an old name must keep working during a migration, record
it as `"status": "deprecated:color.action.primary"` in the system map so the
build can report it and eventually fail on it.
