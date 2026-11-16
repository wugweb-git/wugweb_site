---
title: One Map, Everything Else Generated
impact: HIGH
impactDescription: hand-maintained parallel copies drift within weeks
tags: map, architecture, build
---

## One Map, Everything Else Generated

`system-map.json` holds the tokens and the component records. CSS custom
properties, the Tailwind theme, the iOS asset catalog, the Figma variables and
the spec sheets are all *emitted* from it. The moment any of those is edited by
hand, there are two truths and no way to tell which is current.

This is also what makes the skill framework-agnostic: choose the emission target
last, and switching targets is a build change rather than a migration.

**Incorrect:**

```
tokens.json          ← designers edit this
theme.css            ← someone hand-syncs this
tailwind.config.ts   ← nobody remembers who owns this
docs/Button.md       ← last updated 8 months ago
```

**Correct:**

```
system-map.json      ← the only file a human edits
  └─ build
       ├─ theme.css
       ├─ tailwind.theme.ts
       ├─ tokens.figma.json
       └─ docs/Button.md
```

```jsonc
// package.json
{
  "scripts": {
    "tokens:build": "node scripts/build.mjs",
    "tokens:check": "node scripts/build.mjs --check"  // fails CI on drift
  }
}
```

`--check` regenerates into a temp dir and diffs. A generated file edited by hand
fails the build, which is the only thing that actually stops it happening twice.
