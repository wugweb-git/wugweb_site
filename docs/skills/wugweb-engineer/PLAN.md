# wugweb-engineer

> STATUS, 2026-11-19. Registered on the owner's word "update notion and commit": row 7 in the registry, a row in the responsibility matrix, and this text as the skill's own Notion page under the registry (rule 9: one page per skill, the repo keeps this copy). If this file and Notion disagree, Notion wins.

## Card

| Field | Value |
| --- | --- |
| Name | `wugweb-engineer` |
| Type | Agent skill: `SKILL.md` plus `references/`, `scripts/`, `examples/`, `evals/`, and generated exports |
| Version | 0.3.1 |
| Status | Built 2026-11-19 on the owner's word "create skill"; registered and committed to the repo 2026-11-19 on the owner's word "update notion and commit". |
| Owner | Vedanshu, Wugweb |
| Lives at | `.claude/skills/wugweb-engineer/` in `wugweb-git/wugweb_site` |
| Answers | How does the data behind the site change safely? |
| Owns | Patches to Sanity and Notion data, their backups and undo; edits to the Sanity schema files; running and checking the Notion to Sanity syncs; the schema against data check; the script status list; read-only media facts |
| Does not own | What a page says (`wugweb-work`); search values and schema types (`wugweb-seo`); which fields exist (`wugweb-strategy`); tokens and layout (`wugweb-kits`); deploy, build and git (repo `AGENTS.md`); making or removing media (the owner) |
| Calls an AI model | No |

## Why it exists

Option b of the 2026-11-18 audit. It passes registry rule 2: none of the six skills owned Sanity schema or data changes, the sync scripts or backups. The engineering page's working rules (dry run, backup, patch one field, never replace, never delete) lived only in session notes; this skill writes them down once and gives them scripts.

## Registry row

| # | Skill | The question it answers | Owns | Does not own | Page |
| --- | --- | --- | --- | --- | --- |
| 7 | `wugweb-engineer` | How does the data behind the site change safely? | Sanity and Notion data patches with backup and undo, Sanity schema edits, the sync scripts, the schema against data check, the script status list, read-only media facts | What a page says, search values, which fields exist, tokens, deploy and git, media files | wugweb-engineer |

## Responsibility matrix row

| Skill | Owns | Reads (sources) | Gives to | Takes from | Never does |
| --- | --- | --- | --- | --- | --- |
| wugweb-engineer | Data patches with backup and undo; schema edits; sync runs; schema check; script status; media read | Sanity (`splvhmk1`, `production`), `sanity/schemaTypes/`, the three sync scripts, `scripts/`, the asset registry, the standing rules and `SECRETS.md` | All: change reports, backups, result logs, check results. wugweb-strategy and wugweb-seo: schema check findings. wugweb-work: media read reports | wugweb-seo: values and schema rules. wugweb-strategy: field rulings. wugweb-work: approved content and wording to sync or write | Deletes, creates or replaces documents; touches media files; writes without the owner's go on that exact plan; deploys schema or Studio; runs a Neon sync; echoes a key |

Each link must also be listed by the other skill (rule 8). Proposed lines for the siblings, for their own sessions to add:

- `wugweb-seo` gives `wugweb-engineer` field values and schema rules (for example posts: `schemaType` BlogPosting).
- `wugweb-strategy` gives `wugweb-engineer` field rulings (for example no `faqs` on posts until an approved list).
- `wugweb-work` gives `wugweb-engineer` approved content and the values file for item G.

## Line in `docs/skills/AI-MODELS.md`

| Skill | Text use | Vision use | Env vars read | Status |
| --- | --- | --- | --- | --- |
| wugweb-engineer | None | None | `SANITY_SYNC_TOKEN` only, for token reads and writes | No AI model, by design: data writes never go through a model |

## What is built

| Part | State |
| --- | --- |
| `SKILL.md` | 1,704 words, third-person description with 12 quoted trigger phrases, imperative body, nine modes, change report format, worked example |
| References | 8: data-patch runbook, schema change, sync scripts, script status (55 scripts, main `6e290b0`), media read, handoffs, tooling, open items |
| Scripts | backup, plan-patch (one value, per-document values, undo), apply-plan (patches only, revision guards, `--go`), schema-fields, scan-scripts, build, validate, test |
| Checks | `test.mjs` all pass; `validate.mjs` 91 checks, 0 errors; `build.mjs --check` fresh; skill-creator's validator passes |
| Exports | `AGENTS.md`, `export/wugweb-engineer.md`, Cursor rule, custom GPT instructions, `agents/openai.yaml`; each export carries the standing rules, drift fails the test |
| Tests | Six cases. Round 1: with the skill 22 of 22 checks, without 20 of 22. Round 2 (six cases, first five baselines reused): with the skill 27 of 27, without 24 of 27. Routing check (stand-in for the app trigger test, as brand-os did): 19 of 20, every data prompt routed here, no near miss routed here |

## Decisions on record

| Date | Decision | By |
| --- | --- | --- |
| 2026-11-16 | Engineering is not a skill for now | Owner |
| 2026-11-18 | Audit lays out options a, b and c; recommends a | Engineering session |
| 2026-11-19 | "create skill": option b built, first as `wugweb-data` | Owner |
| 2026-11-19 | Skill named `wugweb-engineer` | Owner |
| 2026-11-19 | Registered in the Notion registry; skill, plan and AI-MODELS line committed: "update notion and commit" | Owner |
| 2026-11-19 | Key names follow `docs/skills/SECRETS.md`; no key rotation, ever | Owner (standing rules) |

## Waiting on the owner

- [x] Notion page, registry row and matrix row (2026-11-19).
- [x] `AI-MODELS.md` line (2026-11-19, committed).
- [x] Skill folder and this file committed (2026-11-19).
- [x] Push to GitHub: done, the skill is on main since `4f18f079`.
- [ ] Upload `wugweb-engineer.skill` to the Claude app and remove the old `wugweb-data` skill there.
- [ ] Item A, B and G plans: a go on each, once shown.
- [ ] A working Notion token in `.env` (the sync scripts read `NOTION_TOKEN`; the standard name is `NOTION_API_TOKEN`).
- [ ] Whether the site's scripts move to the standard key names (`SANITY_SYNC_TOKEN`, `NOTION_API_TOKEN`): a site-code change.
- [ ] The sibling skills list their side of each link (rule 8), each in its own session.

## Full read, 2026-11-19: the md files and what needs changing

Every file of the skill (73) was read on 2026-11-19 from main (`4fbf334c`) by a read-only reviewer for the coordinator, with this plan, the standing rules, `SECRETS.md` and `AI-MODELS.md`. Nothing in the skill folder was changed and no script that touches Sanity or Notion was run. The skill's own checks pass (`build.mjs --check` 5 fresh, `validate.mjs` 91 checks with 0 errors, `test.mjs` all passed). No stale generated file, no version disagreement (0.3.1 everywhere), no wrong key name, no secret value in the skill and no remote write without `--go` was found. The list below is for the engineer session to act on; line numbers are as of that commit.

### The md files the skill carries

| File | What it is | Kind |
| --- | --- | --- |
| `SKILL.md` | Procedure, nine modes, the change report format | Authored |
| `README.md` | Package overview, install, run | Authored |
| `CHANGELOG.md` | History, 0.1.0 to 0.3.1 | Authored |
| `references/data-patch-runbook.md` | Steps with commands, undo | Authored |
| `references/schema-change.md` | Schema edits and the schema check | Authored |
| `references/sync-scripts.md` | The three Notion sync scripts | Authored |
| `references/script-status.md` | Status table for 55 site scripts | Authored |
| `references/media-read.md` | Reading R2 and the asset registry | Authored |
| `references/handoffs.md` | Contracts with sibling skills | Authored |
| `references/tooling.md` | Ids, variable names, connectors | Authored |
| `references/open-items.md` | Pending items A, B, G, H | Authored |
| `examples/README.md`, `examples/change-report.md` | Invented examples | Authored |
| `evals/` (6 cases) | A prompt plus 4 to 6 grader files each | Authored |
| `AGENTS.md`, `export/wugweb-engineer.md`, `adapters/cursor/wugweb-engineer.mdc`, `adapters/chatgpt/instructions.md` | Built by `scripts/build.mjs` | Generated |

### Needs changing in the skill: scripts (fix these before the first real data change)

1. `scripts/backup.mjs` lines 24 and 39: `--print` skips the personal-data guard and prints the first 200 characters of each document. For `platformProfile` documents, which hold credential fields, that would echo credentials into the session, against `SECRETS.md`.
2. `scripts/backup.mjs` line 22 with `scripts/lib.mjs` lines 72 to 77: the guard reads the query text only. A query by id list (the runbook's own check and undo query), `*[]` or `_type match` gets past it and would write those document types into the tracked `backups/` folder. It should check the `_type` of what was fetched.
3. `scripts/lib.mjs` lines 80 to 81: with no token, `query()` silently falls back to the public CDN, so a backup misses drafts with no warning. `references/tooling.md` line 60 says a script without the token exits with code 2; that is true only for writes.
4. `scripts/apply-plan.mjs` lines 72 to 73: the result log is written after the changes are sent, in a mode that fails if the file exists. If it exists, the writes land and the log is lost. Check before sending.
5. `scripts/test.mjs` line 92: the temp prefix `wd-schema-` is a leftover of the old name `wugweb-data`.

### Needs changing in the skill: docs

6. `references/data-patch-runbook.md` lines 71, 78 and 94 say `<plan>.result.json`; the script writes `<backup>.json.result.json`.
7. `SKILL.md` line 68, `metadata.json` line 5 and `build.mjs` line 89 say the skill never creates a document; `references/sync-scripts.md` line 25 allows the blog sync's creates.
8. `references/schema-change.md` line 19 names a `test` script and a type-check script that the two `package.json` files do not have.
9. `references/script-status.md` covers the 55 tracked scripts. Nine untracked `scripts/tmp-*.mjs` files sit on disk and there is no rule for a script missing from the table.
10. The eval `service-faqs-from-review` disagrees with `references/open-items.md` line 11 (what to load, and the dashes are already removed); it counts 10 "answer again" rows where 5 are service rows and 5 are on `/faq`.
11. `examples/change-report.md` line 9: the Backup line lacks the `sha256` the skill file requires at line 94.
12. `README.md` line 64: sibling file counts are out of date (now brand-os 31, seo 26, voice 32, kits 88).
13. `evals/routing-check.json` line 2 says "seven skill descriptions plus this skill's"; there are six siblings.
14. `CHANGELOG.md` line 5 says the web engineering page points here and its rotation lines are fixed; the repo copy of that plan had not been updated when this was read.

### Needs changing in this plan

- Line 74 says "Push to GitHub waits"; the skill is on main since `4f18f079`.

### Fixed

Fixed 2026-11-19: items 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 and 14, and the plan line on the push. Not fixed: none. The version stays 0.3.1; the changes are listed in the skill's `CHANGELOG.md` under "2026-11-19 (review fixes, no version change)". The line numbers in the list above are as of `4fbf334c` and have moved.

### Worth knowing

- No sibling skill names `wugweb-engineer`, so every handoff is one-sided. Each sibling page now lists that as a change to make.
- One clash marks the whole batch of 50 as clashed and unwritten; "which documents clashed" is not exact.
- The `notion-sync-401` eval passes only while the Notion token stays rejected.
- `scripts/apply-schema.cjs` line 5 in the site repo holds a connection string with a password, as the skill says.
