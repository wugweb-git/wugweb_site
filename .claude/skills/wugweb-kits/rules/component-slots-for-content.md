---
title: Slots for Content, Variants for Role
impact: MEDIUM-HIGH
impactDescription: renderX props grow without bound; slots do not
tags: components, api, composition
---

## Slots for Content, Variants for Role

Two different axes get confused constantly. *Role* differences — primary versus
danger — are closed and belong in variants. *Content* differences — an icon
before the label, a badge after it, a footer — are open, unbounded, and belong in
slots. Modelling content as props produces `renderIcon`, `renderBadge`,
`renderTrailing`, `renderFooter`, forever.

**Incorrect:**

```tsx
type CardProps = {
  renderHeader?: () => ReactNode
  renderIcon?: () => ReactNode
  renderBadge?: () => ReactNode
  renderFooterLeft?: () => ReactNode
  renderFooterRight?: () => ReactNode
  showDivider?: boolean
}
```

**Correct:**

```tsx
<Card variant="raised">
  <Card.Header>
    <Icon name="folder" />
    <Card.Title>Assets</Card.Title>
    <Tag variant="info">Beta</Tag>
  </Card.Header>
  <Card.Body>…</Card.Body>
  <Card.Footer>
    <Button variant="ghost">Cancel</Button>
    <Button variant="primary">Save</Button>
  </Card.Footer>
</Card>
```

The compound form also documents itself: the anatomy section of the spec sheet is
just the list of subcomponents, in order.
