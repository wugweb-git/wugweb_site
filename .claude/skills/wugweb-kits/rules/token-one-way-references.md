---
title: References Flow One Layer Down
impact: CRITICAL
impactDescription: layer skips make the map unreadable in both directions
tags: tokens, architecture
---

## References Flow One Layer Down

Six layers, and each may reference only the one directly beneath it:

1. Primitive token — raw value, zero meaning (`color.blue.600`, `size.4`)
2. Semantic token — role (`color.action.primary`, `space.inset.md`)
3. Component token — scoped binding (`button.primary.bg`)
4. Primitive component — structure, no domain meaning (`Box`, `Text`, `Icon`)
5. Component — a named UI role (`Button`, `Field`, `Toast`)
6. Composition — assembled components (`LoginForm`, `EmptyState`)

A component reaching past its semantic layer to grab `--color-blue-600` looks
harmless and costs the same as a hardcoded value: the intent is gone, so nobody
can tell whether that blue is the action color, the link color, or a coincidence.
Reading the map upward — *what breaks if I change this* — stops working too.

**Incorrect:**

```css
/* Button skips layer 2 and binds to a raw scale step */
.button--primary {
  background: var(--color-blue-600);
  color: var(--color-white);
}
```

**Correct:**

```css
/* tokens: semantic layer names the intent */
:root {
  --color-action-primary: var(--color-blue-600);
  --color-on-action: var(--color-white);
}

.button--primary {
  background: var(--color-action-primary);
  color: var(--color-on-action);
}
```

Now a rebrand touches one line, and `color.action.primary` tells the next person
what the value is for.
