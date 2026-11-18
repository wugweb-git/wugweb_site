# wugweb-brand-os

Says who Wugweb is and what its visuals must mean, and checks visuals and claims
against that. Version 0.3.2.

It holds brand strategy (identity, positioning, values, audience, differentiation,
messaging framework), approved facts about Wugweb, brand rules and Visual OS (art
direction). It is reference only: it answers, checks and proposes. It writes no
copy, makes no media and writes to nothing. Voice belongs to `wugweb-voice`,
content strategy to `wugweb-strategy`, token values to `wugweb-kits`, SEO to
`wugweb-seo`, making any piece to `wugweb-work`, and changes to Sanity and Notion
data, schema edits, the sync scripts and backups to `wugweb-engineer`.

## What it does

| Mode | In | Out |
|---|---|---|
| Answer | A brand question | The rule, its label and the reference file that holds it; a gap reported as a gap |
| Visual check | An artwork or an artwork brief | The mode chosen, banned motifs found, pass or fail, what to fix |
| Fact check | Copy that makes claims about Wugweb | Each claim marked approved or not approved, with status and source |
| Change | A proposed brand rule or fact | Current to proposed, with evidence, for the owner's approval |

The owner's standing rules in `docs/skills/STANDING-RULES.md` (copied to
`references/standing-rules.md`) are always on and win over anything here. Open items (the positioning line, the audience, five
facts, the Visual OS and Brand Strategy documents) are filled through use, by the
owner's approval: an answer that turns up in any session comes back here as a
Change proposal.

## What is in the package

| Path | Purpose | Edited by hand |
|---|---|---|
| `SKILL.md` | Status, the four modes, fixed rules, boundaries, the file index | yes |
| `references/identity-and-positioning.md` | What Wugweb is and is not, the promise, pillars, positioning tests | yes |
| `references/brand-strategy.md` | Blank until the owner's document arrives; the method for a competitor read | yes |
| `references/values-and-principles.md` | The five values and the ten principles | yes |
| `references/audience.md` | Blank; the shape to fill | yes |
| `references/messaging.md` | The messaging rule and message tests | yes |
| `references/vocabulary.md` | The name, pillar names, system terms | yes |
| `references/brand-facts.md` | Every fact with source and status | yes |
| `references/review-gates.md` | Visual and fact check lists, scoring, rights labels | yes |
| `references/source-map.md` | Sources, conflicts, the owner questions and their status | yes |
| `references/tooling.md` | The only reference file that names helper skills | yes |
| `references/visual-os/` | Art direction: modes, colour, type, photography, motion, metaphors, components, formats, patterns, judging a visual | yes |
| `examples/` | Approved and rejected visuals, once the owner supplies them | yes |
| `evals/evals.json` | Per-task tests | yes |
| `scripts/build.mjs` | Generates the files marked "no" below | yes |
| `scripts/test.mjs` | Self-test on the skill's own files | yes |
| `metadata.json`, `CHANGELOG.md` | Version, date, abstract, history | yes |
| `references/standing-rules.md` | Marked copy of the standing rules | no, generated |
| `AGENTS.md` | The whole skill in one file, with the standing-rules block | no, generated |
| `export/wugweb-brand-os.md` | The same single file under its own name | no, generated |
| `adapters/cursor/wugweb-brand-os.mdc` | Cursor rule | no, generated |
| `adapters/chatgpt/instructions.md` | Custom GPT instructions | no, generated |
| `agents/openai.yaml` | Display settings for Codex and the ChatGPT app | no, generated |

## Install

The folder follows the open Agent Skills format, so most agents load it as it is.
The agent reads the short description at start and loads the rest only when a
task needs it. The folder name must stay equal to the `name:` line in `SKILL.md`.

**Claude app, Claude Code and Cowork.** Upload `wugweb-brand-os.skill` in the
app, or place the folder at `.claude/skills/wugweb-brand-os/` in the repository.

**Cursor.** Place the folder at `.cursor/skills/wugweb-brand-os/` or
`.agents/skills/wugweb-brand-os/`. Cursor also reads `.claude/skills/`. For a rule
that attaches by file path, copy `adapters/cursor/wugweb-brand-os.mdc` into
`.cursor/rules/`.

**Codex and the ChatGPT desktop app.** Place the folder at
`.agents/skills/wugweb-brand-os/` in the repository, or at
`~/.agents/skills/wugweb-brand-os/` for every project.

**A custom GPT or a ChatGPT project.** Paste the block from
`adapters/chatgpt/instructions.md` into the instructions field and upload
`AGENTS.md` as a knowledge file.

**Agents with no skill support.** Give them `AGENTS.md`. It needs no tool.

The Visual check needs a model that can see images; a text-only model checks the
written brief only.

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
4. Raise the version in `SKILL.md`, `metadata.json` and this file together and add
   a `CHANGELOG.md` entry.

A brand rule or fact changes only on the owner's yes to that exact change. The
plan lives on the Notion page "wugweb-brand-os" under the Wugweb Skill Management
System, mirrored in `docs/skills/wugweb-brand-os/PLAN.md`; if they differ, Notion
wins.

## Status

Built, version 0.3.2. Structure, sourced rules and the owner's rulings of
2026-11-16 and 17 are in. Four items are blank until supplied: the positioning line, the
audience, differentiation and brand strategy. Four facts are open (team
size, projects, markets, profile links). Examples are empty. Triggering is tested only
after the upload to the Claude app.

## Licence

MIT.
