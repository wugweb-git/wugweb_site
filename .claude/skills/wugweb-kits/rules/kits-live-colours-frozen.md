---
title: Live Colours Are Frozen
impact: CRITICAL
impactDescription: changing live colours changes the whole look and contrast
tags: kits, tokens, brand
---

## Live Colours Are Frozen

Text #f4f4f4, muted #bababa and surfaces #191919 and #2b2b2b are deliberate and never changed. Do not set text to pure white.

**Incorrect:**

```css
:root { --color-text-primary: #ffffff; }
```

**Correct:**

```css
:root { --color-text-primary: #f4f4f4; }
```

Source: CLAUDE.md, working agreements.
