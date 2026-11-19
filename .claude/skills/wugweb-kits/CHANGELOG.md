# Changelog

## 2.1.4, 2026-11-19

- Packaging for use in any agent (owner, 2026-11-19): `LICENSE` (MIT), `LESSONS.md` (what the skill learns from use, and which rule each lesson changed), a link under `.agents/skills/` so Codex and the other agents that read the Agent Skills layout load this folder, and an entry in the plugin marketplace file. No rule of the skill changed in this release.
- `README.md` gains What it does, What is in the package, Install, Run and Licence sections.
- `examples/inventory-run.md` added: a real inventory run on the site source.
- Includes the review fixes listed in the entry below.

## 2.1.3, 2026-11-19 (review fixes, no version change)

- `AGENTS.md` and `export/wugweb-kits.md` rebuilt for the "API keys and secrets" section of the standing rules (`ab96770e`); the eval "AGENTS.md export is current" holds again.
- Counts corrected: 38 Wugweb rule files (12 shell, 8 label, 18 kits) in `SKILL.md`; 19 evals in `README.md`. The README folder map now lists `CHANGELOG.md`, `adapters/`, `agents/`, `export/` and `references/storybook.md`, and describes the build as it is.
- `SKILL.md` names every file the build generates, not `AGENTS.md` alone.
- Stale statements corrected after reading the site code on 2026-11-19: the nested `main` on `/contact-us` is gone, every section in `work/[slug].astro` has an id, the Service Spotlight Panel has a pause control, `.btn-partners-cta` and `.global-blog-list` are no longer in `src`.
- `references/component-sizes.md` no longer says the four confirmed sizes are missing from `sizing.md`. `rules/kits-tokens-only.md` points to the inventory run for the count of raw literals. `references/layout-shell.md` says what `validate.mjs` checks.
- Skill links: data and schema changes go to `wugweb-engineer` (no link from kits); build, deploy and git follow the repo root `AGENTS.md`. `wugweb-voice` routes "where wording sits in the interface" to kits. The ChatGPT adapter text names `wugweb-engineer`.
- Brand rules are pointed to, not restated: `wugweb-brand-os` owns the brand rules and the logo checks; kits keeps the sizes, token values and checks (`SKILL.md`, `rules/kits-yellow-budget.md`, `rules/kits-logo-size-and-space.md`, `references/component-sizes.md`).
- Name of the rule in the 2.1.1 entry below corrected to `label-id-and-name`.

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
- `label-id-and-name` now extends to the case-study page; the eval expects every section labelled (fails until the case-study tokens pass is live).
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
