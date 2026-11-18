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
- [x] Skill folder and this file committed (2026-11-19). Push to GitHub waits for the owner's go.
- [ ] Upload `wugweb-engineer.skill` to the Claude app and remove the old `wugweb-data` skill there.
- [ ] Item A, B and G plans: a go on each, once shown.
- [ ] A working Notion token in `.env` (the sync scripts read `NOTION_TOKEN`; the standard name is `NOTION_API_TOKEN`).
- [ ] Whether the site's scripts move to the standard key names (`SANITY_SYNC_TOKEN`, `NOTION_API_TOKEN`): a site-code change.
- [ ] The sibling skills list their side of each link (rule 8), each in its own session.
