# wugweb-kits

Renamed from ui-system-mapper on 2026-11-16; enhancements are planned and not yet made.

Map a UI to its design system, audit the code against the map, and generate
component spec sheets from it.

Structure follows [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills):
individually addressable rule files, a section manifest, a validator, and a
compiled `AGENTS.md`.

```
wugweb-kits/
├── SKILL.md            workflow + rule index
├── AGENTS.md           generated — every rule expanded
├── metadata.json
├── rules/
│   ├── _sections.md    section ids, order, impact
│   ├── _template.md    copy this to add a rule
│   ├── token-*.md      5 rules · CRITICAL
│   ├── map-*.md        4 rules · HIGH
│   ├── component-*.md  4 rules · HIGH
│   ├── reuse-*.md      4 rules · MEDIUM-HIGH
│   └── spec-*.md       4 rules · MEDIUM
└── scripts/
    ├── lib.mjs         shared frontmatter + rule parsing
    ├── validate.mjs    lint the rule files
    ├── build.mjs       rules/ → AGENTS.md  (--check fails on stale)
    └── audit.mjs       Phase 0 inventory over a codebase
```

## Use

```bash
node scripts/audit.mjs src/ --findings   # what is actually in the codebase
node scripts/validate.mjs                # lint rules (0 deps, node ≥18)
node scripts/build.mjs                   # regenerate AGENTS.md
node scripts/build.mjs --check           # CI: fail if AGENTS.md is stale
```

## Add a rule

Copy `rules/_template.md`, prefix the filename with a section id from
`rules/_sections.md`, include one Incorrect and one Correct fenced example, then
run `validate.mjs` and `build.mjs`. Both examples are required — a rule nobody
can pattern-match against does not get applied.
