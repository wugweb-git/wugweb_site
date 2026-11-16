---
title: No Outside-In Restyling
impact: HIGH
impactDescription: every style passthrough is an undocumented variant
tags: components, api, audit
---

## No Outside-In Restyling

When a composition reaches in and overrides a component's styling, the
component's spec becomes fiction: the real appearance lives at 30 call sites the
docs know nothing about. `className` and `style` passthrough feel pragmatic and
are the single most reliable way a design system stops describing its own product.

The rule is not "never accept a class". It is: an escape hatch used twice is a
missing variant, and the fix is to add the variant, not to widen the hatch.

**Incorrect:**

```tsx
<Button className="bg-red-600 px-8 rounded-none" />
<Button style={{ background: '#dc2626', padding: '0 32px' }} />
```

The audit cannot see these as `danger` buttons, the token map cannot see the red,
and the next rebrand misses both.

**Correct:**

```tsx
<Button variant="danger" size="lg" />
```

```tsx
// If layout positioning is genuinely the caller's business, scope the hatch
// to layout only and keep appearance closed:
type ButtonProps = {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger'
  /** Layout-only: margin, grid placement, width. Never color/type/radius. */
  layoutClassName?: string
}
```

Audit check: grep for `className=` and `style=` on system components, group by
component, and report any component with more than two distinct override
patterns — that is the variant it is missing.
