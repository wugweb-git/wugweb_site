# Changelog

## [0.3.1] 2026-11-19

Raised from the locked 0.3.0 on the owner's word of 2026-11-19 ("Version numbers are unchanged ... fix").

- Packaging for use in any agent (owner, 2026-11-19): `LICENSE` (MIT), `LESSONS.md` (what the skill learns from use, and which rule each lesson changed), a link under `.agents/skills/` so Codex and the other agents that read the Agent Skills layout load this folder, and an entry in the plugin marketplace file. No rule of the skill changed in this release.
- `scripts/validate.mjs` added: a structure check of the package.
- Includes the two same-day entries listed under 0.3.0 below: the review fixes, and the digital-twin plan document recorded as a source of candidates.
- The skill is still structure only: no voice rule drawn from samples exists until the owner supplies samples.

## [0.3.0] 2026-11-17

### 2026-11-19 (owner: "add this in wugweb-voice skill", under the locked 0.3.0, no version change)

- New `references/digital-twin-source.md`: a record of the plan document "Wugweb Digital-Twin Skill: wugweb-work" the owner supplied. It was written by an AI model, so it is a source of candidates and never a sample.
- `references/voice.md`: candidates C-07 to C-15 from that document's persona and voice section. C-15 (a separate studio persona, with the owner's voice only on request) conflicts with the one-voice ruling of 2026-11-16 and is held, not applied.
- `references/words.md`: "state-of-the-art" and "game-changing" added to the candidate word list on that source.
- Nothing confirmed or observed was changed. The parts of the document that are not voice are listed in the new file with the skill each belongs to.

### 2026-11-19 (review fixes, under the locked 0.3.0, no version change)

- `scripts/check.mjs` now exits 1 whenever the result is fail, including an untraced number or quote with no other flag; before, it exited by flag count only. Its note names steps 3 to 8 as the ones that need a reader. `SKILL.md` and the script header say the same. New test for the exit code.
- `scripts/test.mjs` is read-only: it compares the built files in memory against the files on disk and no longer rewrites them. `scripts/build.mjs` exports its outputs for that.
- `evals/evals.json` says 0.3.0, and eval 9 uses the observed bar from `SKILL.md` (three unedited samples in the mode).
- The Notion page "Wugweb Profile (Master) - 2023" is recorded as an approved voice source (owner, 2026-11-17) in `SKILL.md` and `references/corpus.md`: a source to read, not yet a calibrated sample set.
- `wugweb-engineer` named as the seventh skill, no link, in the same words as its own handoff file: `SKILL.md` table, `references/handoff.md`, `metadata.json`.
- `references/corpus.md` R-002: the real copy is the repo folder; the claim of a copy in the user skills folder is removed.
- `SKILL.md` lists `agents/openai.yaml` among the generated files; the README usage line shows `--sources`; the 0.2.1 entry below now says `README.md` and `metadata.json` are edited by hand.

### 2026-11-19 (eval graders folded, owner request)

- Folded the 26 per-assertion grader files into each case's `case.yaml` under `expected_outcome`. Each test case is now `prompt.md` plus `case.yaml`; `.md` count dropped from 47 to 21. Note: this diverges from the sibling eval layout (siblings keep one grader per assertion) and the cases are no longer in the `claude plugin eval` grader format. The skill's own `test.mjs` and `evals/evals.json` are unaffected and pass. No version change.

### 2026-11-19 (sibling conformance, under the locked 0.3.0)

- Listed `references/standing-rules.md` in the SKILL.md Files table, matching wugweb-seo, wugweb-kits and wugweb-work.
- Removed the per-reference `Version` stamps from the reference files; siblings carry none, and the version lives once in SKILL.md and metadata.json. No version change.

### 2026-11-19 (under the locked 0.3.0, no version change)

- Fixed the export test: it now looks for the standing-rules marker in the file's own case (`marked copy`), matching the file and the wugweb-seo convention. Regenerated `AGENTS.md` and `export/wugweb-voice.md`, which were stale on main.
- Recorded sample provenance (R-006): samples are shared while using the skills, pieces the owner supplies or approves as work is made.

- Two candidates recorded in `references/voice.md` (C-05 not decorative or hype-driven, C-06 outcomes over hype), from `brand_guidelines/`. Candidates only; not applied, not flagged. No version change.

- Eval run, 2026-11-17: fixes only, no version change. `scripts/check.mjs` now returns fail when a number or quote has no source supplied (new `--sources` flag for when the caller has given them); `SKILL.md` and `references/words.md` say to raise unruled filler candidates and never drop them in a rewrite. `scripts/test.mjs` updated.

- Fix, no version change: `references/modes.md` linkedin-post row said "First person plural", which clashed with the owner's we or I ruling. It now says the pronoun is his pick per piece.

- Owner answered "all yes" on the pending list, 2026-11-17. Version stays 0.3.0 (his lock). Applied: `references/handoff.md` names the `wugweb-strategy` signal log (`references/topics-and-calendar.md`) as a read-only input, its words vocabulary candidates only; a 40 to 60 word `summary` field in the response; translated copy and working preferences recorded as out of scope; the "we" or "I" choice is the owner's per piece, not a fixed rule (`SKILL.md`, `references/modes.md`); helper list confirmed, kept in `references/tooling.md` only; `references/standing-rules.md` is a marked copy of the standing rules, built into the export and checked against `docs/skills/STANDING-RULES.md` by `scripts/test.mjs`. Writing samples: the owner will supply source material; none received yet, so the voice is still uncalibrated.
- Version locked at 0.3.0 by the owner. Do not bump, not even to 0.3.1, without the owner's say.
- No change to the method, the rules or the files; the version number is set and pinned only. The 0.2.1 portability package carries forward.


## [0.2.1] 2026-11-17

- Portability package, matching the other Wugweb skills: `AGENTS.md`, `adapters/cursor/wugweb-voice.mdc`, `adapters/chatgpt/instructions.md`, `agents/openai.yaml`, all generated by `scripts/build.mjs`, plus `README.md` and `metadata.json`, which are edited by hand. Every generated file leaves out the corpus ledger.
- `scripts/build.mjs` now compiles the whole package, not just the export.
- No change to the method or to any rule.

## [0.2.0] 2026-11-16 (draft)

Method only, from the research report "Voice calibration method". No voice rule added.

- Observed bar: three unedited samples in the mode, stable features, more than one topic for word rules; never sentence length alone.
- Confidence: evidence stated with the level; high needs confirmed rules and a blind test.
- Voice check: new failure checks (overuse, caricature, flattening); AI judges run in both orders; a pass means "not detected".
- Ledger: word count, edit status, others' words removed, held back, used in.
- New `references/blind-test.md`.
- Four test cases as folders under `evals/`.

## [0.1.0] 2026-11-16 (draft, not installed)

- Structure only, from the plan on the wugweb-voice Notion page and `docs/skills/wugweb-voice/PLAN.md`.
- Fixed owner rules confirmed; every voice and mode rule waiting on samples.
- Voice check method in `SKILL.md`; mechanical part in `scripts/check.mjs`.
- Calibration ledger in `references/corpus.md`, empty.
- Candidate words and rules listed, not applied.
- Export build and tests.
- Owner rulings recorded (R-002 to R-005): lives in repo and personal folder, eight helpers plus extras, working preferences stay in project instructions, translated copy out of scope for now.
