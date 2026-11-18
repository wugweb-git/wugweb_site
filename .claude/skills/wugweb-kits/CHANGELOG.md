# Changelog

## 2.1.3, 2026-11-18

- Sibling file alignment: `CHANGELOG.md`, `adapters/cursor/wugweb-kits.mdc`, `adapters/chatgpt/instructions.md`, `agents/openai.yaml` and `export/wugweb-kits.md` added so the skill matches the shape of `wugweb-seo`, `wugweb-voice`, `wugweb-work`, `wugweb-brand-os` and `wugweb-strategy`.
- No change to rules, references or scripts; the 59 rules and 19 evals still pass.

## 2.1.2, 2026-11-18

- `SKILL.md` frontmatter rewritten to the agentskills.io spec and Anthropic's skill-development guidance: description opens `This skill should be used when the user asks to…` with nine quoted user phrases; `name` unquoted; `compatibility` field restored.
- Phases note added above "Work in this order": only an audit runs every phase; a value lookup reads the shell table; a block doc runs phase 4.
- Stale "does not yet read `.astro` files" claim corrected: the inventory does scan `.astro`.
- `metadata.json` abstract rewritten for Wugweb; date and references current.
- `AGENTS.md` rebuilt (59 rules, 8 sections).
- Two regression evals added to `evals/run.mjs`: no retired shell values in `global.css`; `SKILL.md` version matches `metadata.json`. Latent ESM bug fixed (`readFileSync` import, not `require`). 19 of 19 pass.

## 2.1.1, 2026-11-18

- Motion rule defines the hero reveal groups (`830a0e55`): h1 and eyebrow at 0.4s, the rest at 0.9s. Home headline blur tween removed.
- `label-every-section-has-an-id-and-a-name` now extends to the case-study page; the eval expects every section labelled (fails until the case-study tokens pass is live).
- `kits-logo-size-and-space` added with logo values from the `wugweb-brand-os` rulings in `component-sizes.md`.

## 2.1.0, 2026-11-17

- Eight new rules added: `kits-case-media-layout`, `kits-media-viewer`, `kits-panel-order-warm-cool`, `kits-heading-never-smaller`, `kits-icons-currentcolor`, `kits-media-poster-first`, `kits-widget-guards`, `shell-media-literals`.
- Two new references added: `references/media-and-widgets.md`, `references/consolidation-targets.md`.
- Stale Kits design docs corrected (breakpoints, section rhythm, reveal and scroll values, header layer, grey focus and accent, `--t-h5`, work card radius, README pillar colours). Five block docs signed off.

## 2.0.0, 2026-11-16

- Renamed from `ui-system-mapper` and absorbed into the Wugweb Skill System.
- Mapper method and 21 rules kept; added the Wugweb parts on top: the layout shell (`shell-*`), the labelling rules (`label-*`) and the Kits component rules (`kits-*`), each read from a design-system doc.
- References added: `layout-shell.md`, `component-sizes.md`, `six-layers.md`, `spec-templates.md`, `known-doc-clashes.md`, `storybook.md`, `standing-rules.md`.
- `scripts/kits-doc-drift.mjs` added: fails when the skill and the three design-system docs disagree, or when the docs and `global.css` disagree.
- `scripts/kits-inventory.mjs` replaces `scripts/audit.mjs`.
- `scripts/kits-check-page.mjs` added: ids, names, headings, alt, skip link and main on rendered HTML.

## 1.0.0, 2026-10-19

- First build as `ui-system-mapper`: 21 rules in five groups (token, map, component, reuse, spec); `rules/` + `AGENTS.md` layout; `scripts/validate.mjs` and `scripts/build.mjs`; no Wugweb-specific rules.
