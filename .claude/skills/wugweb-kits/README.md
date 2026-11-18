# wugweb-kits

Renamed from ui-system-mapper on 2026-11-16; SKILL.md reconciled 2026-11-17. The Wugweb rule groups (shell, label, kits), references and scripts were added the same day.

Map a UI to its design system, audit the code against the map, and generate
component spec sheets from it.

Structure follows [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills):
individually addressable rule files, a section manifest, a validator, and
single-file exports compiled by `scripts/build.mjs`.

```
wugweb-kits/
├── SKILL.md            workflow and rule index (authored)
├── README.md           this folder map
├── CHANGELOG.md        history
├── metadata.json       version, date, abstract, references
├── AGENTS.md           generated: skill body, layout shell reference, standing rules, every rule expanded
├── export/
│   └── wugweb-kits.md  generated: AGENTS.md under a three-line header
├── adapters/
│   ├── cursor/wugweb-kits.mdc      generated: Cursor rule
│   └── chatgpt/instructions.md     generated: instructions for a custom GPT or project
├── agents/
│   └── openai.yaml     generated: display settings
├── rules/              59 rules
│   ├── _sections.md    section ids, order, impact
│   ├── _template.md    copy this to add a rule
│   ├── token-*.md      5 rules · CRITICAL
│   ├── map-*.md        4 rules · HIGH
│   ├── component-*.md  4 rules · HIGH
│   ├── reuse-*.md      4 rules · MEDIUM-HIGH
│   ├── spec-*.md       4 rules · MEDIUM
│   ├── shell-*.md      12 rules · HIGH
│   ├── label-*.md      8 rules · HIGH
│   └── kits-*.md       18 rules · HIGH
├── references/         layout-shell, component-sizes, six-layers, spec-templates, known-doc-clashes, media-and-widgets, consolidation-targets, storybook, standing-rules (marked copy)
├── evals/run.mjs       19 eval cases (pass, fail, blocked)
└── scripts/
    ├── lib.mjs         shared frontmatter and rule parsing
    ├── validate.mjs    lint the rules and the whole skill
    ├── build.mjs       writes the five generated files (--check fails on any stale one)
    ├── kits-inventory.mjs  Phase 0 inventory and heuristic shell findings
    ├── kits-check-page.mjs rendered HTML label checks
    ├── kits-doc-drift.mjs  doc against global.css
    ├── contrast.mjs        computed contrast ratio
    └── test.mjs            self test
```

## Use

```bash
node scripts/kits-inventory.mjs src/ --findings   # what is actually in the codebase
node scripts/validate.mjs                # lint rules (0 deps, node ≥18)
node scripts/build.mjs                   # regenerate AGENTS.md, the export, both adapters and openai.yaml
node scripts/build.mjs --check           # CI: fail if any generated file is stale
```

## Add a rule

Copy `rules/_template.md`, prefix the filename with a section id from
`rules/_sections.md`, include one Incorrect and one Correct fenced example, then
run `validate.mjs` and `build.mjs`. Both examples are required: a rule nobody
can pattern-match against does not get applied.
