---
title: Generate Specs From the Map
impact: MEDIUM
impactDescription: hand-written specs drift silently and are trusted anyway
tags: spec, build, automation
---

## Generate Specs From the Map

A spec typed beside the code is correct for about one sprint. Nothing tells the
author when a variant is added, so the doc quietly becomes a description of last
quarter's component — and it is still trusted, which is worse than having no doc.

Everything mechanical comes from `system-map.json`: tokens consumed, variants,
states, API table, used-by. Only Role, Do/Don't and the accessibility narrative
are hand-written, and those are the parts a human is actually needed for.

**Incorrect:**

```
docs/Button.md   ← hand-written, last touched 8 months ago
                    lists 2 variants; the code now has 4
```

**Correct:**

```js
// scripts/build-specs.mjs
const map = JSON.parse(await readFile('system-map.json', 'utf8'))

for (const [name, c] of Object.entries(map.components)) {
  const prose = await readProse(`docs/prose/${name}.md`)   // Role, Do/Don't, a11y
  await writeFile(`docs/${name}.md`, renderSpec(name, c, prose))
}
```

```jsonc
{
  "scripts": {
    "docs:build": "node scripts/build-specs.mjs",
    "docs:check": "node scripts/build-specs.mjs --check"
  }
}
```

`docs:check` in CI fails when generated docs are stale. A component whose prose
file is missing gets a spec with `Role: TODO` — visible, countable, and fixable,
rather than silently absent.
