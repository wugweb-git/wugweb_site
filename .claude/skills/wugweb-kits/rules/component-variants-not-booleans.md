---
title: Closed Variants, Not Boolean Flags
impact: HIGH
impactDescription: each boolean doubles the state space and the test matrix
tags: components, api, composition
---

## Closed Variants, Not Boolean Flags

Booleans multiply. Four of them is sixteen combinations, most of which are
nonsense (`isPrimary` and `isDanger` together), none of which are documented, and
all of which someone will eventually pass. A closed variant enumeration makes the
invalid states unrepresentable and gives the spec sheet something finite to list.

The tell that a boolean should have been a variant: two booleans that must never
be true at once.

**Incorrect:**

```tsx
<Button isPrimary isLarge isDanger isLoading isGhost />
// 5 booleans = 32 combinations, ~6 of which are meaningful
```

**Correct:**

```tsx
type ButtonProps = {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger'
  size: 'sm' | 'md' | 'lg'
  state?: 'loading'
}

<Button variant="danger" size="lg" state="loading" />
```

Variants are for role differences and stay closed. Content differences are a
different problem — see `component-slots-for-content`.

Related: `vercel-composition-patterns/architecture-avoid-boolean-props` covers
the React refactor in depth.
