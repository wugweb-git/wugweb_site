---
title: Component Tokens Must Earn Their Place
impact: MEDIUM
impactDescription: pass-through component tokens double the map for nothing
tags: tokens, architecture
---

## Component Tokens Must Earn Their Place

Layer 3 — `button.primary.bg`, `card.padding` — is optional, and most systems
have far too much of it. A component token is worth its cost only when consumers
will genuinely theme that specific part independently of the semantic role. A
one-line alias with a single consumer is not an override point; it is a second
name for the same thing, and now a reader has to check both.

The test: can you name someone who would set this token to something other than
what the semantic token already says? If not, delete it and let the component
read layer 2 directly.

**Incorrect:**

```json
{
  "button.primary.bg": "{color.action.primary}",
  "button.primary.text": "{color.on-action}",
  "button.primary.radius": "{radius.control}",
  "card.padding": "{space.inset.md}"
}
```

Every one of these is a pass-through with one consumer.

**Correct:**

```json
{
  "button.primary.bg": "{color.action.primary}"
}
```

```css
/* Component reads layer 2 directly where no override point exists */
.button--primary {
  background: var(--button-primary-bg);   /* themed per brand — earned */
  color: var(--color-on-action);          /* never themed alone */
  border-radius: var(--radius-control);
  padding: var(--space-inset-md);
}
```

Report every layer-3 entry with a single consumer as a Low finding and offer the
delete.
