---
title: Block Specs Live in docs/blocks
impact: MEDIUM
impactDescription: specs scattered elsewhere go stale
tags: kits, docs
---

## Block Specs Live in docs/blocks

A section level block is specified once in kits_design_system/docs/blocks/ using the block doc template. Five blocks await sign-off and are drafts until the owner signs each off.

**Incorrect:**

```text
Block spec pasted into a pull request description.
```

**Correct:**

```text
kits_design_system/docs/blocks/<block>.md
```

Source: components.md, blocks.
