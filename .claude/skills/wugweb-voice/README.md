# wugweb-voice

Holds the one Wugweb voice, which is also the owner's voice, and runs the voice
check on visible Wugweb copy. Version 0.3.0.

Structure, check method and sample ledger only. No voice rule exists until the
owner supplies writing samples; until then the skill applies the fixed owner
rules, says the voice is not calibrated, and keeps confidence low.

## What it does

| Part | When | Output |
|---|---|---|
| Fixed rules | Always | British English, sentence case, no em or en dashes, no invented facts, no filler words |
| Voice check | On any draft before it is posted | Facts to trace, mechanical flags, mode and voice-rule findings, a result and a confidence level, each change as current then proposed |
| Sample ledger | When the owner supplies a sample | A row that records the sample without copying private text, with other people's words removed |
| Blind test | Once a mode has held-back samples | A design and scoring method to test whether drafts can be told from the owner's real writing |

## What is in the package

| Path | Purpose | Edited by hand |
|---|---|---|
| `SKILL.md` | The method, the fixed rules and the voice check | yes |
| `references/voice.md` | Voice rules with labels; slots waiting on samples | yes |
| `references/modes.md` | One section per mode; all waiting on samples | yes |
| `references/words.md` | Word lists, spelling list, proper nouns the check reads | yes |
| `references/corpus.md` | The calibration ledger; empty | yes |
| `references/handoff.md` | The contract with the other skills | yes |
| `references/blind-test.md` | How to run and score the blind test | yes |
| `references/standing-rules.md` | Marked copy of the owner's standing rules, so the single-file build works outside the repo; the home is `docs/skills/STANDING-RULES.md` | copy only, test-checked |
| `references/tooling.md` | The only file that names tools and helper skills | yes |
| `scripts/check.mjs` | Mechanical voice check | yes |
| `scripts/test.mjs` | Self-test on the fixtures and the skill's own files | yes |
| `scripts/build.mjs` | Generates the files below | yes |
| `examples/` | Before and after pairs; empty until samples exist | yes |
| `evals/` | Test cases: four case folders and the older `evals.json` | yes |
| `metadata.json`, `CHANGELOG.md` | Version, date, abstract, history | yes |
| `AGENTS.md` | The whole skill in one file | no, generated |
| `adapters/cursor/wugweb-voice.mdc` | Cursor rule | no, generated |
| `adapters/chatgpt/instructions.md` | Custom GPT instructions | no, generated |
| `agents/openai.yaml` | Display settings for Codex and the ChatGPT app | no, generated |
| `export/wugweb-voice.md` | The single file under its old name | no, generated |

The corpus ledger is left out of every generated file, because it points at
the owner's private writing.

## Install

The folder follows the open Agent Skills format, so most agents load it as it
is. The agent reads the short description at start and loads the rest only when
a task needs it.

**Claude.** Install it in the app, or place it at `.claude/skills/wugweb-voice/`
in the repository.

**Cursor.** Place the folder at `.cursor/skills/wugweb-voice/` or
`.agents/skills/wugweb-voice/`. Cursor also reads `.claude/skills/`. For a rule
that attaches by file path, copy `adapters/cursor/wugweb-voice.mdc` into
`.cursor/rules/`.

**Codex and the ChatGPT desktop app.** Place the folder at
`.agents/skills/wugweb-voice/` in the repository, or at
`~/.agents/skills/wugweb-voice/` for every project.

**A custom GPT or a ChatGPT project.** Paste the block from
`adapters/chatgpt/instructions.md` into the instructions field and upload
`AGENTS.md` as a knowledge file. The check script runs only where the model can
run code.

**Agents with no skill support.** Give them `AGENTS.md`. It needs no tool.

The folder name must stay equal to the `name:` line in `SKILL.md`.

## Run

Node 18 or later. No packages. No network.

```bash
node scripts/check.mjs <file.md> [--mode <mode>] [--sources] [--json]
node scripts/test.mjs
node scripts/build.mjs --check
```

## Change the skill

1. Edit `SKILL.md`, a file under `references/`, or a script.
2. Run `node scripts/build.mjs`.
3. Run `node scripts/test.mjs`.
4. The version is locked at 0.3.0 (owner, 2026-11-17): do not raise it, not
   even to 0.3.1, without the owner's say. When the owner lifts the lock, raise
   the version in `SKILL.md` and `metadata.json` together and add a
   `CHANGELOG.md` entry.

## Status

Structure and method only. Every voice and mode rule is waiting on the owner's
writing samples. The evals are written; the four case folders have been run
once, the older `evals.json` set has not.

## Licence

MIT.
