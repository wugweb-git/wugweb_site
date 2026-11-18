# wugweb-strategy

Decides what Wugweb says, to whom and when, and hands `wugweb-work` a brief.
Version 0.1.3.

Content strategy only: topics, the pillar mix, the editorial and social
calendar, briefs, piece structures, editorial standards, content models, the
proof map, refresh or retire decisions, campaign and repurposing plans, and
reading post results for the next plan. It writes no piece, and it does not
cover brand strategy (positioning, values, audience, messaging), which belong to
`wugweb-brand-os`.

## What it does

| Mode | In | Out |
|---|---|---|
| Strategy | Brand-os positioning and audiences, owner goals | Goals, pillar mix, editorial stance, what Wugweb does not publish |
| Topics | Strategy, seo site map, inventory, signal log | A scored topic backlog |
| Calendar | Backlog, capacity, accounts | A dated plan, one row per piece |
| Brief | One calendar item | One 21-field brief for `wugweb-work` |
| Proof map | Case-study inventory, service pages | Which case studies back which page or post |
| Review | Inventory, seo audit data | Keep, refresh, merge, retire or insufficient-data per piece |
| Campaign | A goal and a date range | A campaign as a set of briefs |
| Repurpose | One approved piece | Which forms, which account, in what order |
| Report | Post results, search reports | What changes next, as scale, cut, test |
| Model | A gap found in any mode | A content-model change, current to proposed |

The fixed owner rules are always on: never invent a number, quote or fact; no
write to Notion, Sanity or R2 without the owner's go on that exact change, with a
backup first; British English, sentence case, no em or en dashes.

## What is in the package

| Path | Purpose | Edited by hand |
|---|---|---|
| `SKILL.md` | The ten modes, the rules, sources and handoffs | yes |
| `references/strategy.md` | Goals, pillars and mix, editorial stance | yes |
| `references/topics-and-calendar.md` | Intake, scoring, backlog fields, statuses, cadence, the signal log | yes |
| `references/brief-format.md` | The 21-field brief, its variants, the FAQ block | yes |
| `references/piece-structures.md` | The message shape per piece type | yes |
| `references/editorial-standards.md` | What makes a piece worth publishing | yes |
| `references/content-models.md` | Content types, planning fields, relations | yes |
| `references/proof-map.md` | Which case study may back what | yes |
| `references/refresh-retire.md` | Verdicts and the evidence each needs | yes |
| `references/campaigns-and-repurposing.md` | Campaigns, repurposing, co-posts, newsletter, Behance and Dribbble order | yes |
| `references/performance-review.md` | The Report mode | yes |
| `references/skill-map.md` | Optional helpers per mode and what each may not do | yes |
| `references/ops.md` | This workspace's wiring; the only file that names tools and vendors | yes |
| `scripts/build.mjs` | Generates the files marked "no" below | yes |
| `scripts/test.mjs` | Self-test on the skill's own files | yes |
| `examples/` | A blog post brief, a service page brief, a refresh brief, a calendar skeleton; markers only | yes |
| `evals/` | Test cases: three case folders | yes |
| `metadata.json`, `CHANGELOG.md` | Version, date, abstract, history | yes |
| `AGENTS.md` | The whole skill in one file, with the standing-rules block | no, generated |
| `adapters/cursor/wugweb-strategy.mdc` | Cursor rule | no, generated |
| `adapters/chatgpt/instructions.md` | Custom GPT instructions | no, generated |
| `agents/openai.yaml` | Display settings for Codex and the ChatGPT app | no, generated |
| `export/wugweb-strategy.md` | The single file under its own name | no, generated |

## Install

The folder follows the open Agent Skills format, so most agents load it as it
is. The agent reads the short description at start and loads the rest only when a
task needs it.

**Claude.** Install it in the app, or place it at
`.claude/skills/wugweb-strategy/` in the repository.

**Cursor.** Place the folder at `.cursor/skills/wugweb-strategy/` or
`.agents/skills/wugweb-strategy/`. Cursor also reads `.claude/skills/`. For a
rule that attaches by file path, copy `adapters/cursor/wugweb-strategy.mdc` into
`.cursor/rules/`.

**Codex and the ChatGPT desktop app.** Place the folder at
`.agents/skills/wugweb-strategy/` in the repository, or at
`~/.agents/skills/wugweb-strategy/` for every project.

**A custom GPT or a ChatGPT project.** Paste the block from
`adapters/chatgpt/instructions.md` into the instructions field and upload
`AGENTS.md` as a knowledge file.

**Agents with no skill support.** Give them `AGENTS.md`. It needs no tool.

The folder name must stay equal to the `name:` line in `SKILL.md`.

## Run

Node 18 or later. No packages. No network.

```bash
node scripts/build.mjs           # write the generated files
node scripts/build.mjs --check   # exit 1 if any generated file is stale
node scripts/test.mjs            # self-test
```

## Change the skill

1. Edit `SKILL.md`, a file under `references/`, or a script.
2. Run `node scripts/build.mjs`.
3. Run `node scripts/test.mjs`.
4. Raise the version in `SKILL.md` and `metadata.json` together and add a
   `CHANGELOG.md` entry.

## Status

Built, version 0.1.3. The structure, rules and handoffs are in place. The Notion
plan database (decision 1) is not built yet, so the calendar, backlog and signal
log have no home until the owner's go. Several defaults (cadence, promotional and
reactive shares, backlog size, refresh thresholds) are "owner to set" until a
baseline exists. The three eval cases have been run.

## Licence

MIT.
