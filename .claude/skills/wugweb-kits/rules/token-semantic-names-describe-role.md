---
title: Semantic Names Describe Role, Never Value
impact: HIGH
impactDescription: value-shaped names go stale the first time a value changes
tags: tokens, naming
---

## Semantic Names Describe Role, Never Value

A semantic token exists to survive its own value changing. `color.text.gray`
becomes a lie the moment the muted text turns slate, and `space.16` becomes a lie
the moment the scale shifts to 15. Both then get worked around rather than fixed,
because renaming a token used in 200 places is a bigger job than adding
`color.text.gray2`.

Use one grammar everywhere: `category.role.variant.state`. Roles beat
appearances. If you cannot name the role, the token is probably a primitive that
escaped its layer.

**Incorrect:**

```json
{
  "color.text.gray": "#71717a",
  "color.text.gray2": "#a1a1aa",
  "space.16": "16px",
  "radius.6": "6px",
  "shadow.subtle-blue": "0 1px 3px rgba(37,99,235,.1)"
}
```

**Correct:**

```json
{
  "color.text.muted": "{color.slate.500}",
  "color.text.subtle": "{color.slate.400}",
  "space.inset.md": "{size.4}",
  "radius.control": "{size.1-5}",
  "shadow.raised": "{shadow.sm}"
}
```

Two names to reject on sight: a number in a semantic token (`space.16` — that is
layer 1) and a component in a semantic token (`space.card` — that is layer 3).
