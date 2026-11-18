# Changelog

## 2026-11-19 (review fixes, no version change)

Fixes from the full read of 2026-11-19 (the review section at the end of `docs/skills/wugweb-brand-os/PLAN.md`). No rule changed; the version stays 0.3.2.

- The client under NDA is no longer named anywhere in the skill.
- `wugweb-engineer` is named as a sibling: it owns changes to Sanity and Notion data, schema edits, the sync scripts and backups. This skill gives it nothing and takes nothing. Added to `SKILL.md`, `README.md`, `metadata.json` and eval 36.
- Counts brought in line with the content: seven positioning lines found, two of them in use; four legal name forms (the fourth is on the site's terms of use page); four blank core items and five open facts; a six-part description frame; 31 files in the full zip.
- `source-map.md`: the values are marked approved; questions 1 and 3 are marked open, as in the plan.
- Black canvas: the pitch deck and deck lines in `visual-os/formats-and-campaigns.md` no longer allow a light field.
- Colour: the two overruled source lines (magenta as brand energy; avoid purple, green and orange) are removed from `visual-os/colour-type-photo-motion.md`, so only the ruling remains.
- Logo: the leftover copy in `visual-os/colour-type-photo-motion.md` is now a pointer; its two extra checks moved to the Logo section of `visual-os/art-direction.md`.
- `messaging.md`: the pass test says three seconds, matching the three-second test in the same file and in `identity-and-positioning.md`.
- `tooling.md` is described as the only reference file that names helper skills; other files name Notion as a source.

## 0.3.2, 2026-11-19

- The standing rules travel with the skill: `scripts/build.mjs` writes `references/standing-rules.md`, a marked copy of `docs/skills/STANDING-RULES.md` (as `wugweb-seo`, `wugweb-voice`, `wugweb-kits` and `wugweb-work` carry; `wugweb-strategy` and `wugweb-engineer` do not carry that file). In the Claude app and the `.skill` file, `docs/skills/` is not present, so the pointers in `SKILL.md` and the reference files now name the copy; the home file still wins.
- `scripts/test.mjs` checks the copy is a byte copy of the home file and that no hand-written file points only to `docs/skills/`.
- No rule changed.
- Routing check on 0.3.1, a stand-in for eval 36: 20 of 20 prompts routed to the right skill (10 brand prompts, 10 near misses). Not the real trigger rate; that needs a run in the app, where 0.3.1 is installed.
- PLAN.md, the Notion page and the registry record 0.3.2 (78eb6e4); backup of the changed Notion blocks first.
- Full zip `wugweb-brand-os-0.3.2.zip` (31 files, the whole folder including `evals/`) delivered alongside the `.skill` upload file, which leaves `evals/` out by design.

## 0.3.1, 2026-11-19

- One home for the colour rules: `visual-os/colour-type-photo-motion.md`. The yellow, brand ink, pillar colour and pure white rules are removed from `visual-os/art-direction.md`, which points there (eval 3 cited both files).
- One home for the logo rules: the Logo section of `visual-os/art-direction.md`, which now states the two-tone rule; the copy in `colour-type-photo-motion.md` is removed.
- `scripts/test.mjs` checks both homes.
- Rerun of evals 3, 20 and 25 on 0.3.1, graded by a separate agent: 3 of 3 pass; eval 3 now cites one file.
- PLAN.md, the Notion page and the registry record 0.3.1 (3f06039).

## 0.3.0, 2026-11-19

- Same shape as the other Wugweb skills: `README.md`, `metadata.json`, `AGENTS.md`, `adapters/cursor/wugweb-brand-os.mdc`, `adapters/chatgpt/instructions.md` and `agents/openai.yaml`, so the skill works in the Claude app, Claude Code, Cursor, Codex, ChatGPT and agents with no skill support.
- `scripts/build-export.mjs` renamed `scripts/build.mjs`; it now generates the five portable files and has `--check`. New `scripts/test.mjs` holds the self-test: frontmatter against the Agent Skills format, body length, no second person, named files present, no dashes, no token values, helpers named only in `tooling.md`, media rules not restated, generated files fresh, standing rules carried unchanged, versions in step, evals complete.
- Open items are filled through use, by the owner's approval: an answer that turns up in any session comes back here as a Change proposal; other skills read these items from here and never hold them.
- Media rules: `SKILL.md`, `art-direction.md`, `colour-type-photo-motion.md`, `formats-and-campaigns.md`, `review-gates.md` and `judging-a-visual.md` point to `docs/skills/STANDING-RULES.md` instead of restating them (eval 38).
- `art-direction.md`: the logo minimum size names no pixel value; `wugweb-kits` holds it. The unused logo PNG is recorded as removed (2026-11-18).
- Description: a client's brand is named as out of scope.
- Evals: 6 passes a clean brief on the brief only; 22 allows brand rules beside visual direction; 36 waits on the app upload, where triggering can be measured.
- Eval rerun 2026-11-19 on 0.3.0, 11 tests touched by this change (1, 2, 3, 6, 8, 14, 20, 22, 23, 25, 38), answered by one agent and graded by another: 9 pass, no invented facts. Open: 3 cites two reference files where Answer mode asks for one; 38 finds nine brand-os rules restated in `wugweb-kits` and `wugweb-work` (their sessions own the fix; brand-os itself holds the media rules only as pointers).
- PLAN.md, the Notion page and the registry record 0.3.0: status, commits table, skill card type line, folder tree; the crop wording item is ticked as settled on 2026-11-17.

## 0.2.0, 2026-11-19

- `SKILL.md` status, version and file index now match the reference files: values approved, five facts plus the pillars approved, two core items blank, 21 owner questions.
- `vocabulary.md`: spelling "Wugweb" approved; no longer "not decided".
- `audience.md` dated to the 2026-11-17 answer; `identity-and-positioning.md` points to it, so the audience rule has one home.
- Evals 2, 8, 13 and 27 expect the 2026-11-17 rulings.
- Eval run 2026-11-19: three agents answered the 36 runnable tests from the skill, a separate grader scored them. 32 of 36 pass, no invented facts. Open: 6 (a clean brief got a provisional pass), 22 (offers the messaging rule as well as visual direction), 36 (triggering cannot be measured inside a session), 38 (the media rule text is repeated in `SKILL.md` and `art-direction.md`).
- Export rebuilt with the current standing rules, including the API keys and secrets section of 2026-11-19.
- Owner approved the Notion answers for questions 4, 19 and 20 (2026-11-17): approved facts, the 2023 five as values, seven positioning lines kept as candidates, audience blank, logo rules, brand identity archetype without naming the client under NDA.

## 0.1.0, 2026-11-16

First build, from the plan on the Notion page "wugweb-brand-os" and `docs/skills/wugweb-brand-os/PLAN.md`.

- Built: `SKILL.md`, ten reference files, seven Visual OS files, the export script, the evals and the single-file export.
- Rules with a source are written in. Rules restated from `brand_guidelines/` are labelled "source"; rules restated from the kits docs and the owner's decisions are labelled "confirmed".
- Blank on purpose, waiting on the owner: the positioning line, values, audience, brand strategy, differentiation, campaign systems, lighting, examples.
- Facts about Wugweb: only the six pillars are approved. Every other fact is unverified.
- Owner answers recorded on 2026-11-16: questions 1, 2, 3 (owner will supply), 4 (in progress), 11 (confirmed). Questions 5 to 10 and 12 to 18 are open.
- Not absorbed: `04_AI_PROMPT_ENGINE` (question 7).
- Not run yet: the with and without skill comparison, and the export test in a second tool.
- `brand_guidelines/` was read and not edited.
