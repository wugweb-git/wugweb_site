---
title: Deprecation Is a Pointer, Not a Tombstone
impact: HIGH
impactDescription: unpointed deprecations get ignored and never removed
tags: map, migration
---

## Deprecation Is a Pointer, Not a Tombstone

Marking something deprecated without naming the replacement asks every consumer
to independently rediscover what to use instead. Most will not; they will keep
using the deprecated thing, and the deprecation becomes decoration.

Deprecation is a three-part commitment: the pointer, the codemod or migration
note, and the removal. Skip the third and the team learns that the map has no
teeth.

**Incorrect:**

```json
{ "Chip": { "status": "deprecated" } }
```

```css
/* @deprecated — do not use */
.chip { }
```

**Correct:**

```json
{
  "Chip": {
    "status": "deprecated:Tag",
    "deprecatedIn": "2.4.0",
    "removeIn": "3.0.0",
    "migration": "Chip.tone='info' → Tag.variant='info'; Chip.onClose → Tag.onDismiss",
    "usedBy": ["FilterBar", "SearchResults"]
  }
}
```

`usedBy` on a deprecated record is the migration checklist. When it empties, the
component is deletable — and that is the moment to actually delete it, not the
release after next.
