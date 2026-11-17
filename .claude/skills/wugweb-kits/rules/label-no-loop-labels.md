---
title: Never Label a Section From a Heading Inside a Loop
impact: HIGH
impactDescription: repeated ids and labels from a loop break references
tags: label, a11y
---

## Never Label a Section From a Heading Inside a Loop

A heading rendered once per item repeats its id. Label the section with its own heading, not an item heading.

**Incorrect:**

```html
{items.map(i => <h3 id="item-h">{i.title}</h3>)}
<section aria-labelledby="item-h">
```

**Correct:**

```html
<h2 id="list-h">Posts</h2>
<section aria-labelledby="list-h">
```

Source: layout-shell.md, labelling.
