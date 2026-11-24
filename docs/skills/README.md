# The Wugweb skill system

Seven skills, one job each. Every skill is a complete package that works alone, in Claude and in the other mainstream coding agents.

| Skill | Its job | Version |
|---|---|---|
| `wugweb-work` | Makes the piece: client work and Wugweb's own content, with its composition, layout, media, copy, schema, gate and other forms | 0.6.1 |
| `wugweb-voice` | The one Wugweb voice, and the voice check | 0.3.1 |
| `wugweb-brand-os` | Brand strategy and the visual system rules | 0.3.3 |
| `wugweb-kits` | The design system: tokens, components, block docs, audits | 2.1.4 |
| `wugweb-strategy` | What to publish, to whom and when | 0.1.5 |
| `wugweb-seo` | How pages are found: plan, audit, report | 2.5.1 |
| `wugweb-engineer` | Stored data: CMS and source changes, schema, sync scripts | 0.3.2 |

The versions above are checked by `node scripts/skills.mjs check`; if this table and that command disagree, the command is right.

## Where things live

| What | Where | Note |
|---|---|---|
| The master copy of each skill | `.claude/skills/<name>/` | The only place a skill is edited |
| The link other agents read | `.agents/skills/<name>` | A link to the master folder, never a copy |
| The marketplace file | `.claude-plugin/marketplace.json` | Generated; lists each skill as an installable plugin |
| Each skill's plan | `docs/skills/<name>/PLAN.md` | The owner's intent and decisions |
| Rules every skill follows | `docs/skills/STANDING-RULES.md` | Each skill carries a marked copy |
| Which model to use | `docs/skills/AI-MODELS.md` | |
| How secrets are handled | `docs/skills/SECRETS.md` | No skill holds or prints a secret |
| Packaged files | `dist-skills/` | One zip and one Claude app file per skill, built from git and committed, with an index of versions and checksums |

The web engineering session's status note, which used to sit in a folder of its own with no matching skill, is now `docs/skills/wugweb-engineer/WEB-ENGINEERING-SESSION.md`, beside the plan of the skill that does that work.

## What every skill contains

| Part | What it is |
|---|---|
| `SKILL.md` | The skill: when to use it and how. 1,500 to 2,000 words; detail lives in `references/` |
| `README.md` | What it does, what is in the package, install, run, licence |
| `CHANGELOG.md` | What changed, by version |
| `LESSONS.md` | What the skill has learned from use, and which rule each lesson changed |
| `LICENSE` | MIT |
| `metadata.json` | Version, abstract, status, related skills |
| `references/` | One topic per file, read only when the task needs it. These are the skill's sub-skills: its modes, forms and standards |
| `scripts/` | `build.mjs` (generates the files below), `test.mjs`, and where present `validate.mjs` and the working scripts |
| `evals/` | Test prompts with what a correct answer must contain |
| `examples/` | Worked examples, where the skill has them |
| `AGENTS.md` | Generated: the whole skill in one file, for any agent |
| `export/<name>.md` | Generated: the same, for pasting into any model |
| `adapters/cursor/<name>.mdc` | Generated: a Cursor rule |
| `adapters/chatgpt/instructions.md` | Generated: instructions for a custom GPT or a project |
| `agents/openai.yaml` | Generated: display settings for Codex |

Generated files are never edited by hand. Edit the source and run the skill's build.

## Install

The same folders serve every agent below. The folder paths were read from each vendor's documentation on 2026-11-19.

| Agent | How it finds the skills in this repository | To use a skill somewhere else |
|---|---|---|
| Claude Code | Reads `.claude/skills/` in the repository. Nothing to do | `claude plugin marketplace add <owner>/<repo>`, then `claude plugin install <skill>@wugweb-skills` |
| Claude app | Upload `dist-skills/<name>.skill` under Settings, Plugins | The same file |
| OpenAI Codex | Reads `.agents/skills/` from the working folder up to the repository root, and follows links | Copy the folder to `.agents/skills/<name>/` in the repository, or `~/.agents/skills/<name>/` for every project |
| Cursor | Reads `.agents/skills/` and `.claude/skills/` | Copy the folder to `.cursor/skills/<name>/`, or use the rule in `adapters/cursor/` |
| GitHub Copilot | Reads `.claude/skills/` and `.agents/skills/` (also `.github/skills/`) | Copy the folder to `.github/skills/<name>/` |
| Gemini CLI | Reads `.agents/skills/` (also `.gemini/skills/`) | Copy the folder to `.gemini/skills/<name>/` |
| Windsurf | Reads `.agents/skills/` | Copy the folder to `.agents/skills/<name>/` |
| Roo Code | Reads `.agents/skills/` and follows links | Copy the folder to `.roo/skills/<name>/` |
| Cline | Reads `.claude/skills/` | Copy the folder to `.cline/skills/<name>/` |
| ChatGPT (custom GPT or project) | Not a folder reader | Paste `adapters/chatgpt/instructions.md` and upload `AGENTS.md` |
| Any other model | Not a folder reader | Paste `export/<name>.md` |

What is confirmed and what is not:

- Codex and Roo Code document that a linked skill folder is followed. Cursor, Copilot, Gemini CLI and Windsurf do not say. Cursor and Copilot also read `.claude/skills/`, which is a real folder, so they do not depend on the link. If Gemini CLI or Windsurf does not follow the link, copy the folder as in the right-hand column.
- The marketplace file passes `claude plugin validate`. Installing from it has not been tried from a second machine.
- The repository is private. Another person needs access to it before any of the above works for them.
- The skill names follow the Agent Skills naming rule: lowercase letters, digits and hyphens, the same as the folder name.

## Eval results

Each skill's `evals/` folder holds its cases, the answers from the last run (`evals/runs/<date>/`), and the grades (`evals/RESULTS.md` and a results file). Answers are written by one set of model runs and graded by another, so nothing marks its own work.

Run of 2026-11-19, dry (no live source, no web, no writes) unless noted:

| Skill | Cases run | Expectations met | Failed | Not gradable | Not run |
|---|---|---|---|---|---|
| `wugweb-work` (0.6.0) | 24 | 125 of 130 | 3 | 2 | 0 |
| `wugweb-brand-os` | 35 | 91 of 93 | 2 | 0 | 4, waiting on the owner or an app upload |
| `wugweb-engineer` | 7 | 47 of 47 | 0 | 0 | 0 |
| `wugweb-voice` | 9 | 28 of 30 | 0 | 2 | 5, waiting on writing samples |
| `wugweb-seo` | 8 | 23 of 25 | 0 | 2 | 0 |
| `wugweb-strategy` | 3 | 14 of 14 | 0 | 0 | 0 |
| `wugweb-kits` | 19 scripted | 19 of 19 | 0 | 0 | 0 |

How to read these: five `wugweb-work` cases were run with read-only access to the published copy and the public media; everything else had no live source, so some answers are a correct plan with no real rows in it. Twenty of the engineer skill's passes come from a routing file that could not be answered blind. The `wugweb-work` gaps found were fixed in 0.6.1, which has not been re-run. The kits cases are programmatic checks, not model answers.

## Commands

```
node scripts/skills.mjs sync       pull main when safe, report skill edits stranded in other worktrees or branches, then build, link, list and check
node scripts/skills.mjs check      every skill: its parts, versions, build, tests, link and marketplace entry
node scripts/skills.mjs build      regenerate each skill's AGENTS.md, export and adapters
node scripts/skills.mjs link       make or repair the .agents/skills links
node scripts/skills.mjs manifest   rewrite the marketplace file from each skill's metadata
node scripts/skills.mjs package    zip each skill from the last commit into dist-skills/ and write its index; commit the result
node scripts/skills.mjs all        all of the above, in order
```

Each skill also has its own `node .claude/skills/<name>/scripts/build.mjs`, `test.mjs` and, where present, `validate.mjs`.

## How a skill learns

A skill does not improve by being used. It improves when a correction is written where the next session reads it, and is then moved into the rule it changes.

1. When the owner corrects an output, or a rule gives a wrong result, add an entry to that skill's `LESSONS.md`: what happened, the owner's words quoted with the date, why it happened.
2. Change the rule, check or example that would have prevented it, and name the file and commit in the entry.
3. Add or update an eval so the same mistake fails a test.
4. Add the change to `CHANGELOG.md`, and raise the version when the owner says to.

A lesson whose entry still reads "not yet changed" is open work. Every session with a skill starts by reading its `LESSONS.md`.

## Keeping sessions in step

Several sessions work on this repository at once, each in its own worktree, and a session often learns something about a skill in the middle of other work. Two rules keep one copy of each skill:

- **A skill edit goes to `main` at once, by path.** Do not carry it in a worktree or a feature branch with site code. Commit only the skill's files, push, and say what changed in that skill's `CHANGELOG.md` and, when it came from a correction, its `LESSONS.md`.
- **Run `node scripts/skills.mjs sync` at the start of a session and before finishing one.** It pulls `main` when that is safe, and reports any skill edit that exists only in another worktree or branch, any unpushed or uncommitted skill change here, and any copy where a link should be. It never merges or overwrites: where two versions of a rule exist, it names both places and stops, because choosing between them is the owner's call.

`sync --home` also links the skills into `~/.agents/skills`, so agents that read that folder see them in every project on the machine.

## Changing a skill

- Edit only the master folder. Never edit `.agents/skills/`, a generated file or a packaged zip.
- One skill does not change what another owns, and no content is moved between skills without the owner's word for that change.
- A skill's own content goes straight to `main`. Tooling that spans every skill is built on a short branch, merged and deleted.
- A release is a tag: `<name>-<version>` for one skill, `skills-<date>` for the set.
