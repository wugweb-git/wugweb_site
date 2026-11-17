# Changelog

## 0.1.2 (2026-11-17)

Owner answers applied.

- Brief field 9: pasted from `wugweb-seo` unchanged (option a).
- `wugweb-voice` may read the signal log directly, read only.
- Voice rulings (2026-11-17): the signal log is a read-only input to voice, its words vocabulary candidates labelled by source, never rules; brief field 13 records "we" or "I" as the owner's pick, never assumed; copy in other languages is out of scope until English is calibrated.
- `scripts/build.mjs` builds `AGENTS.md` and the export, with the standing-rules block copied from `docs/skills/STANDING-RULES.md`. `scripts/test.mjs` checks the block equals the home file, the body word count and no dashes.
- FAQ rules extended (owner, 2026-11-17): posts get a `faqs` field only when needed; `/kits` exempt; `/faq` is the one dedicated FAQ page; typed service page copy may stay live during review.
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
