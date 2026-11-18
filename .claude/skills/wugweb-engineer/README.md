# wugweb-engineer

The seventh skill in the Wugweb Skill System. It answers "how does the
data behind the site change safely?" and governs Sanity documents, the Sanity
schema, the Notion to Sanity sync scripts, backups and undo.
Version 0.3.1. Named by the owner on 2026-11-19; earlier versions were called `wugweb-data`. Built 2026-11-19 on the owner's word, as option b of the
2026-11-18 audit. Registered 2026-11-19 as row 7 in the registry, with its own Notion page.

The registry is the Notion page "Wugweb Skill Management System". If this
folder and Notion disagree, Notion wins. The owner's standing rules live in
`docs/skills/STANDING-RULES.md`; key handling lives in `docs/skills/SECRETS.md`.

## What it does

| # | Function | Mode | Output |
|---|---|---|---|
| 1 | Read documents and count them | Read | Counts, published and drafts |
| 2 | Plan a change to one field | Plan a change | Backup with hash, plan file, current → proposed table, undo |
| 3 | Apply a plan on the owner's go | Apply | Guarded patches, result log |
| 4 | Put a field back | Undo | Undo plan from a backup, applied on the owner's go |
| 5 | Edit the Sanity schema | Schema change | One-file change on a branch; Studio deploy stays with the owner |
| 6 | Run a Notion to Sanity sync | Sync | Dry run, flags, write on the owner's go |
| 7 | Compare schema and stored data | Schema check | Undeclared and unfilled fields with counts |
| 8 | Say whether a site script is safe | Script check | Status from the script table |
| 9 | Read media facts | Media read | Registry counts, file status, page weight |

## What it does not own

| Matter | Owner |
|---|---|
| What a page says, field wording, alt text | `wugweb-work` (voice through `wugweb-voice`) |
| Which value a search field holds, schema types and markup | `wugweb-seo` |
| Which fields a content type has, which stored values stay | `wugweb-strategy` |
| Tokens, layout, blocks | `wugweb-kits` |
| Deploy, build, previews, git | The repo's `AGENTS.md` |
| Making, moving or removing media | The owner |

## What is in the package

| Path | Purpose | Edited by hand |
|---|---|---|
| `SKILL.md` | The procedure, rules and index | yes |
| `references/` | 8 files, one topic each; a rule lives in one file | yes |
| `scripts/backup.mjs` | Query Sanity and write a hashed backup | yes |
| `scripts/plan-patch.mjs` | Build a one-field plan, a per-document plan or an undo plan | yes |
| `scripts/apply-plan.mjs` | Apply a plan on `--go`, patches only, with revision guards | yes |
| `scripts/schema-fields.mjs` | Declared fields per type; with `--data`, undeclared stored keys | yes |
| `scripts/scan-scripts.mjs` | Classify the site's scripts by their write switch | yes |
| `scripts/lib.mjs` | Shared helpers | yes |
| `scripts/validate.mjs` | Check this skill against its own rules | yes |
| `scripts/test.mjs` | Offline self-test of the scripts | yes |
| `scripts/build.mjs` | Generate the five files below | yes |
| `examples/` | Invented backups, plans and a change report | yes |
| `evals/` | Six test cases, one folder each, and the routing check | yes |
| `metadata.json`, `CHANGELOG.md` | Version, date, abstract, history | yes |
| `AGENTS.md` | Whole skill in one file, with the standing rules | no, generated |
| `export/wugweb-engineer.md` | The same, for pasting or attaching elsewhere | no, generated |
| `adapters/cursor/wugweb-engineer.mdc` | Cursor rule | no, generated |
| `adapters/chatgpt/instructions.md` | Custom GPT instructions | no, generated |
| `agents/openai.yaml` | Display settings for Codex and the ChatGPT app | no, generated |

## Size against the siblings

73 files, of which 40 are the tests (six cases and the routing check) (one folder each, one file per check, the format skill-creator and `claude plugin eval` read). Without the tests the package is 33 files. The siblings, counted on main on 2026-11-19: brand-os 31, seo 26, strategy 47, work 54, voice 32, kits 88.

## Install

The skill ships as three files named after it: `wugweb-engineer.skill` to install in the Claude app (tests left out), `wugweb-engineer.md` (this skill's `SKILL.md`, named after the skill) and `wugweb-engineer.zip` with everything else (the whole folder with its tests, the plan, the audit, the test review pages and the single-file export). Inside any package the file stays `SKILL.md`, because the Claude app and other tools look for that exact name.

**Claude.** Upload `wugweb-engineer.skill`, or add the folder as a skill, or place it at `.claude/skills/wugweb-engineer/`
in the site repository. The scripts find the repo root on their own.

**Cursor.** Copy `adapters/cursor/wugweb-engineer.mdc` into `.cursor/rules/`. Keep
the skill folder at `.claude/skills/wugweb-engineer/` so the rule's file pointers
resolve.

**ChatGPT.** Create a custom GPT or a project. Paste the block from
`adapters/chatgpt/instructions.md` into the instructions field and upload
`AGENTS.md` as a knowledge file. Without a shell, it follows the runbook by
hand and labels the result a manual check.

**Codex, Copilot and other agents that read `AGENTS.md`.** Use this folder's
`AGENTS.md`, or append it to the one at the repository root.

**Any other model.** Paste `export/wugweb-engineer.md` into the conversation.

## Run

Node 18 or later. No packages. Run from the site repository root.

```bash
S=.claude/skills/wugweb-engineer/scripts
node $S/backup.mjs --query '<groq>' --label <name> [--print] [--public] [--out <dir>]
node $S/plan-patch.mjs --backup <file> --field <name> --set '<json>' | --unset | --values <file> | --restore <older backup>
node $S/apply-plan.mjs --plan <file> [--go]
node $S/schema-fields.mjs --schema sanity/schemaTypes [--type <type>] [--data <backup>]
node $S/scan-scripts.mjs --dir scripts
node $S/validate.mjs
node $S/test.mjs
node $S/build.mjs --check
```

Reads with `SANITY_SYNC_TOKEN` see drafts. Without the token a read stops with
exit code 2; `backup.mjs --public` opts in to the public read, which sees
published documents only. Writes need the token and `--go`. Inside the repo,
`backup.mjs` refuses `contactSubmission`, `platformProfile` and `person` by the
query text and by the `_type` of what it fetched, and `--print` shows only
their ids, types and counts.

## Change the skill

1. Check the registry first. A rule that another skill owns is changed there.
2. Edit `SKILL.md`, a file under `references/`, or a script.
3. Run `node scripts/validate.mjs` and `node scripts/test.mjs`.
4. Run `node scripts/build.mjs`.
5. Raise the version in `SKILL.md` and `metadata.json` together and add a
   `CHANGELOG.md` entry.

## Licence

MIT.
