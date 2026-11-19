# wugweb-work

One of the seven skills in the Wugweb Skill System. It answers "how is each piece
made?" and produces every piece in two tracks, plus their other forms.
Version 0.6.0. Part 1 only: the skill, its references, two read-only
working scripts and the evals. Site code is not part of it.

The registry is the Notion page "Wugweb Skill Management System". If this
folder and Notion disagree, Notion wins.

## What it does

| # | Function | Mode | Output |
|---|---|---|---|
| 1 | Audit a piece: body, media, live page | Audit | Findings with computed counts |
| 2 | Write the brief (client work) or check it (own content) | Brief | Claim, tension, proof, outcome, owner questions |
| 3 | Measure media files | Media | Manifest: size, bytes, shape, duplicates, dead links, weight |
| 4 | Look at every image and video | Look | Visual read: kind, audience, flow, state, flags, alt, caption |
| 5 | Propose the body | Body | Current → proposed |
| 6 | Resolve the layout from the content shape and media | Layout | Block plan from the 23-block catalogue and the layout grammar |
| 7 | Apply search and schema rules | SEO and schema | Limits check and JSON-LD graph |
| 8 | Run the publish gate, then sync, commit and deploy on the owner's go | Ship | Pass or fail table at 375, 768 and 1200 |
| 9 | Make the other forms | Forms | Fact pack, LinkedIn post and carousel, Behance, Dribbble, deck, PDF, charts, share image, newsletter, advocacy copy |
| 10 | Approve before posting | Forms | Eight approval steps; a yes per made file and per post |
| 11 | Ask a sibling for a check or an input | All | Written requests to the sibling skills |

Tracks: (1) client work: case studies, portfolio, showcase; (2) Wugweb's own
content: blog posts, service pages, site and landing copy. Track 2's body
standards are a first draft for the owner's review.

One matter is open with the owner: the newsletter's tool, list and cadence.
One more is shared with `wugweb-kits`. Both are listed, with every settled
decision, in `references/open-items.md`.

## What it does not own

| Matter | Owner |
|---|---|
| Voice | `wugweb-voice` |
| Brand and art direction | `wugweb-brand-os` |
| Tokens, the layout shell document, components | `wugweb-kits` |
| Keyword research, site-wide SEO, search reports | `wugweb-seo` |
| Topics, calendar, briefs for own content | `wugweb-strategy` |

This skill works alone. It holds every rule a mode needs and does every step
itself: the block catalogue, the layout grammar, the media, copy and on-page
SEO rules, the schema graph, the publish gate and the sync, preview, approval,
commit and deploy cycle are in this folder in full. A sibling may check the
result or supply an input; it never replaces a step.

## What is in the package

| Path | Purpose | Edited by hand |
|---|---|---|
| `SKILL.md` | The procedure, rules and index | yes |
| `references/` | 18 files, one topic each; a rule lives in one file | yes |
| `references/forms/` | 13 files, one per form, plus the approval steps | yes |
| `scripts/case-audit.mjs` | Parse a body; print chapters, block plan, flags; measure media | yes |
| `scripts/check-case-page.mjs` | Run the static publish gate on a page | yes |
| `scripts/validate.mjs` | Check this skill against its own rules | yes |
| `scripts/test.mjs` | Self-test of the scripts on the fixtures | yes |
| `scripts/build.mjs` | Generate the five outputs below | yes |
| `examples/` | One full proposal, two skeletons, three forms examples, four test fixtures | yes |
| `evals/evals.json` | 24 test prompts with expectations; 1 to 14 run and graded 2026-11-17, 15 to 24 added 2026-11-19 and not yet run | no |
| `metadata.json`, `CHANGELOG.md` | Version, date, abstract, history | yes |
| `AGENTS.md` | Whole skill in one file | no, generated |
| `export/<name>.md` | The same single file, for pasting into another tool | no, generated |
| `agents/openai.yaml` | Display settings for Codex and the ChatGPT desktop app | no, generated |
| `adapters/cursor/<name>.mdc` | Cursor rule | no, generated |
| `adapters/chatgpt/instructions.md` | Custom GPT instructions | no, generated |

## Install

**Claude.** Add the folder as a skill, or place it at `.claude/skills/<name>/` in
the repository.

**Cursor.** Copy `adapters/cursor/<name>.mdc` into `.cursor/rules/`. Copy
`references/`, `scripts/` and `examples/` beside the repository's skill folder so
the rule's file pointers resolve.

**ChatGPT.** Create a custom GPT or a project. Paste the block from
`adapters/chatgpt/instructions.md` into the instructions field and upload
`AGENTS.md` as a knowledge file.

**Codex.** In this repository the skill is already installed for Codex: `.agents/skills/<name>` is a link to `.claude/skills/<name>`, so Codex loads the same `SKILL.md`, `references/`, `scripts/` and `examples/` with nothing copied and nothing to keep in step. In another repository, copy the whole folder to `.agents/skills/<name>/`, or to `~/.agents/skills/<name>/` for every project. `agents/openai.yaml` holds its display settings.

**Copilot and other agents that read `AGENTS.md`.** Place `AGENTS.md` at
the repository root, or append it to the one already there.

**Any other model.** Paste `AGENTS.md` into the conversation. The Look mode needs
a model that can open images and video.

## Run

Node 18 or later. No packages.

```bash
node scripts/case-audit.mjs <body.md | slug> [--measure] [--json]
node scripts/check-case-page.mjs <url | file.html> [--host <canonical host>] [--no-body]
node scripts/validate.mjs
node scripts/test.mjs
node scripts/build.mjs --check
```

`case-audit.mjs` with a slug, and `--all`, read this site's CMS; with a `.md`
file it needs no network.

## Change the skill

1. Check the registry first. A rule that another skill owns is changed there.
2. Edit `SKILL.md`, a file under `references/`, or a script.
3. Run `node scripts/validate.mjs` and `node scripts/test.mjs`.
4. Run `node scripts/build.mjs`.
5. Raise the version in `SKILL.md` and `metadata.json` together and add a
   `CHANGELOG.md` entry.

## Name

The registry names this skill `wugweb-work`. The name is read from the `name:`
line of `SKILL.md`; a rename needs that line, the folder name, then
`node scripts/build.mjs` and `node scripts/validate.mjs`.

## Licence

MIT.
