# wugweb-seo

Plans, audits and reports on how Wugweb pages are found in search engines and
AI answers. Version 2.5.0.

It returns constraints, checks and reports. It never writes copy and changes
no file, page or record itself.

## What it does

| Part | When | Output |
|---|---|---|
| Plan | Before a page is written | A site keyword and intent map; or for one page the phrases with sources, intent, an outline and limits; or a platform keyword note |
| Audit | After a page is built | Scripted checks on the HTML and robots.txt, manual checks, a citability score, an on-page keyphrase score, and a fix list split three ways |
| Report | After a page is live | Period comparison, risers and fallers, quick wins, AI answer presence, and the cause of a drop |

## What is in the package

| Path | Purpose | Edited by hand |
|---|---|---|
| `SKILL.md` | The method, the fixed rules and the three parts | yes |
| `references/plan.md` | Intent classes and the brief shape | yes |
| `references/audit.md` | Every check id, the manual checks, crawler groups and the citability score | yes |
| `references/report.md` | Data sources, the monthly report shape and drop diagnosis | yes |
| `references/handoffs.md` | Questions answered for and sent to other skills, helper skills, declined findings | yes |
| `references/standing-rules.md` | The owner's standing rules, a marked copy of `docs/skills/STANDING-RULES.md` in the repository; the home file wins | no, copied |
| `scripts/check-page.mjs` | 18 checks on rendered HTML | yes |
| `scripts/score-page.mjs` | On-page keyphrase score, Rank Math model | yes |
| `scripts/check-robots.mjs` | Bot access for one path in robots.txt | yes |
| `scripts/validate.mjs` | Checks this skill against its own format | yes |
| `scripts/test.mjs` | Self-test on the fixtures | yes |
| `scripts/build.mjs` | Generates the five files at the end of this table | yes |
| `scripts/lib.mjs` | Shared helpers | yes |
| `examples/` | A passing page (`page-pass.html`), a failing page (`page-fail.html`), a page for the keyphrase score (`score-good.html`) and a `robots.txt` | yes |
| `evals/evals.json` | Eight test prompts with expectations | yes |
| `metadata.json`, `CHANGELOG.md` | Version, date, abstract, history | yes |
| `AGENTS.md` | The whole skill in one file | no, generated |
| `export/wugweb-seo.md` | Single-file export: `AGENTS.md` under a short header | no, generated |
| `adapters/cursor/wugweb-seo.mdc` | Cursor rule | no, generated |
| `adapters/chatgpt/instructions.md` | Custom GPT instructions | no, generated |
| `agents/openai.yaml` | Display settings for Codex and the ChatGPT desktop app | no, generated |

## Install

The folder follows the open Agent Skills format, so most agents load it as it
is. Prefer that route: the agent reads the short description at start and
loads the rest only when a task needs it.

**Claude.** Add the folder as a skill, or place it at
`.claude/skills/wugweb-seo/` in the repository.

**Cursor.** Place the folder at `.cursor/skills/wugweb-seo/` or
`.agents/skills/wugweb-seo/`. Cursor also reads `.claude/skills/`. For a rule
that attaches by file path, copy `adapters/cursor/wugweb-seo.mdc` into
`.cursor/rules/`.

**Codex and the ChatGPT desktop app.** Place the folder at
`.agents/skills/wugweb-seo/` in the repository, or at
`~/.agents/skills/wugweb-seo/` for every project.

**A custom GPT or a ChatGPT project.** Paste the block from
`adapters/chatgpt/instructions.md` into the instructions field and upload
`AGENTS.md` as a knowledge file. The scripts run only where the model can run
code.

**Many agents at once.** From the folder that holds `wugweb-seo/`:

```bash
npx skills add ./wugweb-seo -a cursor codex claude-code
```

**Agents with no skill support.** Give them `AGENTS.md`. It needs no tool.

The folder name must stay equal to the `name:` line in `SKILL.md`.

## Run

Node 18 or later. No packages. No network.

```bash
node scripts/check-page.mjs examples/page-pass.html --kind work --host wugweb.com
node scripts/check-page.mjs examples/page-fail.html --kind work --host wugweb.com
node scripts/check-page.mjs examples/page-fail.html --kind blog
node scripts/score-page.mjs examples/score-good.html --keyword "care booking" --host wugweb.com
node scripts/check-robots.mjs examples/robots.txt --path /work/care-booking
node scripts/validate.mjs
node scripts/test.mjs
node scripts/build.mjs --check
```

## Know the limits

- `check-page.mjs` matches text patterns in the HTML. It does not render the
  page or run its scripts. Save the server response, not the browser's DOM.
- `check-robots.mjs` reads the file only. A firewall can still block a bot the
  file allows.
- The report part needs a Search Console export or a connected data tool. It
  has no script.
- Title and description limits for client sites, Kits and Wugweb X are not
  decided. On wugweb.com they are: see the fixed rules in `SKILL.md`.
- The skill ships no eval harness. The evals were run once, on 2026-11-17, by
  two agents: one answered from the skill, one graded.

## Change the skill

1. Edit `SKILL.md`, a file under `references/`, or a script.
2. Run `node scripts/build.mjs`.
3. Run `node scripts/validate.mjs` and `node scripts/test.mjs`.
4. Raise the version in `SKILL.md` and `metadata.json` together and add a
   `CHANGELOG.md` entry.

## Licence

MIT.
