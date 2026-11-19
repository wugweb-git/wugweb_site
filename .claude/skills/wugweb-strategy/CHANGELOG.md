# Changelog

## 0.1.5 (2026-11-19)

- Packaging for use in any agent (owner, 2026-11-19): `LICENSE` (MIT), `LESSONS.md` (what the skill learns from use, and which rule each lesson changed), a link under `.agents/skills/` so Codex and the other agents that read the Agent Skills layout load this folder, and an entry in the plugin marketplace file. No rule of the skill changed in this release.
- `scripts/validate.mjs` added: a structure check of the package.
- Includes the review fixes listed in the entry below.

## 2026-11-19 (review fixes, no version change)

Fixes from the full read of 2026-11-19 (`docs/skills/wugweb-strategy/PLAN.md`). The version stays 0.1.4.

- `README.md` says 0.1.4 in both places. `scripts/test.mjs` now fails if the version in `README.md` or `metadata.json` differs from `SKILL.md`, and checks `README.md`, `CHANGELOG.md` and `examples/` for dashes too.
- `wugweb-engineer` named as the seventh skill: this skill rules on which fields a content type should have and whether stored values stay; engineer builds the schema change or leaves the field alone, as ruled, on the owner's go. Added to both tables in `SKILL.md`, the Model mode, `references/skill-map.md`, `references/brief-format.md`, `references/content-models.md`, `references/ops.md`, `metadata.json` and the ChatGPT instructions.
- The five blocks that were awaiting sign-off are recorded as signed off by the owner (2026-11-17), as `wugweb-kits` states. `references/topics-and-calendar.md`, `references/skill-map.md` and the two brief examples updated.
- Link targets read the same everywhere (decision 20): this skill sets the link structure; inside it `wugweb-seo` returns the link targets for a piece. `references/content-models.md` corrected.
- Brief examples follow the rulings on fields 9, 10 and 13: the seo keyword note and link targets are pasted unchanged, and field 13 records "we" or "I" as the owner's pick.
- "Differentiate" is a verdict: `references/refresh-retire.md` defines it with its own condition and next step, so it was added to `SKILL.md`, `references/content-models.md` and `README.md`.
- `examples/calendar-skeleton.md`: the open slot row now carries a proposed pillar, intent and account, as the slot rule requires, and the table has an audience column.
- `references/ops.md`: the skill lives on main at `.claude/skills/wugweb-strategy/`; backups go under `backups/`.
- `SKILL.md`: the pointer to a "Skills project" path that does not exist now names `AGENTS.md` and `export/wugweb-strategy.md`.

## 0.1.4 (2026-11-19)

Regenerated to track the home standing rules.

- Rebuilt `AGENTS.md` and the export after `docs/skills/STANDING-RULES.md` changed its API-keys rule (key rotation is now the owner's call, never done from a session). The skill's `test.mjs` was failing the standing-rules match until this rebuild. No change to the skill's authored content.

## 0.1.3 (2026-11-19)

Portability and a stale-file fix.

- Added `metadata.json` and `README.md`, matching the shape of `wugweb-voice`, `wugweb-seo` and `wugweb-work`.
- `scripts/build.mjs` now also generates `adapters/cursor/wugweb-strategy.mdc`, `adapters/chatgpt/instructions.md` and `agents/openai.yaml`, so the skill loads in Cursor, a custom GPT and Codex as well as Claude. Added a `--check` mode.
- Rebuilt `AGENTS.md` and the export: the standing-rules block was stale against `docs/skills/STANDING-RULES.md` (the skill's own `test.mjs` was failing that check). It now matches, and carries the new API-keys section.

## 0.1.2 (2026-11-17)

Owner answers applied.

- Brief field 9: pasted from `wugweb-seo` unchanged (option a).
- `wugweb-voice` may read the signal log directly, read only.
- Voice rulings (2026-11-17): the signal log is a read-only input to voice, its words vocabulary candidates labelled by source, never rules; brief field 13 records "we" or "I" as the owner's pick, never assumed; copy in other languages is out of scope until English is calibrated.
- `scripts/build.mjs` builds `AGENTS.md` and the export, with the standing-rules block copied from `docs/skills/STANDING-RULES.md`. `scripts/test.mjs` checks the block equals the home file, the body word count and no dashes.
- FAQ rules extended (owner, 2026-11-17): posts get a `faqs` field only when needed; `/kits` exempt; `/faq` is the one dedicated FAQ page; typed service page copy may stay live during review.
- Link structure: case studies link up to the service page only; sector pages are not a link-up target (owner, 2026-11-17).
- Pointers to `wugweb-brand-os` for the pillars and the claim order (no restatement). Proof map: metrics carry a date or window and match everywhere; pages backed only by text-only case studies are flagged. From the research docs of 2026-10-19.
- Calendar: a slot row still carries a proposed pillar and intent; a Medium row is a copy of a site post with canonical to it (fix from the eval run).
- `/faq` carries no FAQPage markup (owner, 2026-11-17).
- FAQ block rules added to `references/brief-format.md` (which pieces, who supplies questions and answers, where it sits in the brief). Agreed with `wugweb-seo`.

## 0.1.1 (2026-11-17)

Owner rulings applied. Brief field 9 unchanged, pending an owner call.

- Link targets (decision 20): `wugweb-seo` returns them inside the pillar and cluster structure this skill sets.
- Proof map wins on which case study backs a page (decision 23).
- Pointer to `docs/skills/STANDING-RULES.md` in `SKILL.md` and `references/strategy.md`.
- `evals/` exists, so the claim in `SKILL.md` holds.

## 0.1.0 (2026-11-16)

First build, from the plan approved by the owner on 2026-11-16 (Notion page "wugweb-strategy" under the Wugweb Skill Management System; repo copy `docs/skills/wugweb-strategy/PLAN.md`).

- `SKILL.md` with the ten modes, the owner's rules, accounts in scope, sources and handoffs.
- Twelve reference files, as in the plan.
- Examples: blog post brief, service page brief, refresh brief, calendar skeleton. Markers only; no invented topics.
- Test cases in `evals/`, one folder per case. The plan left the layout open (a folder per case, or one `evals.json`); the folder layout was chosen so the same cases run under `claude plugin eval`.
- `export/wugweb-strategy.md`: the skill in one file for other tools.
- Owner decisions 1 to 22 written in.
- Brief field 9 follows `wugweb-seo`'s own handoff: the brief copies the cluster and primary phrase from the site map; `wugweb-work` asks `wugweb-seo` for the per-brief notes.

Open, for other skills' plans: `wugweb-work` to state its Brief mode covers client work only (decision 4); `wugweb-seo` to state it decides what a retired URL does (decision 7). The internal-links split (decision 20) already reads the same in `wugweb-seo/references/handoffs.md`.
