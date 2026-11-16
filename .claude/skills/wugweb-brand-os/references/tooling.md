# Tooling

This is the only file in the skill that names a tool, a vendor or a Claude helper. Everything here is optional. Every mode in `SKILL.md` can be done by hand without any of it.

## Rules for every helper

- A helper returns a proposal or a report. It never writes anything and its output is never treated as approved.
- Where a helper disagrees with this skill or with `docs/skills/STANDING-RULES.md`, the helper loses.
- A helper that is missing or signed out is skipped and reported. It is never a blocker.
- Live research on other companies' sites, and anything that sends Wugweb's or a competitor's name to an outside service, needs the owner's yes each time.
- No helper may generate, crop, re-encode or upload media as part of this skill's work.

## Optional helpers (Claude)

| Helper | Use | Watch for |
|---|---|---|
| `brand-voice:discover-brand` | Searching connected workspaces for brand documents | It recommends which source to adopt; the owner decides |
| `brand-voice:guideline-generation` | Drafting a non-voice guideline from approved sources | It is mostly a voice tool; take only the identity and messaging blocks |
| `marketing:brand-review` | A second opinion on a fact check | It treats sentence case and dashes as open choices; they are not |
| `marketing:competitive-brief` | Structuring a positioning comparison | It leans on third-party review sites, which are not a source here |
| `anthropic-skills:skill-creator` | Running the test prompts in `evals/` | Its tooling is Claude-only; the prompts can be run by hand |

## Not to be used

| Tool | Why |
|---|---|
| `brightdata:design-mirror` | It scrapes other sites and restyles the codebase to match. Do not run it. |
| `anthropic-skills:brand-guidelines` | It applies another company's brand |
| Any image generator, as a default step | New media is made only per file, on the owner's yes, and never by this skill |

## Where the sources live

| Source | Place |
|---|---|
| The owner's standing rules | `docs/skills/STANDING-RULES.md` in the repo |
| The plan and its open items | `docs/skills/wugweb-brand-os/PLAN.md` in the repo, and the skill's one Notion page |
| The visual guidelines | `brand_guidelines/` in the repo |
| Design system rules and values | `kits_design_system/docs/` in the repo, owned by `wugweb-kits` |
| The stale 2023 profile | Notion; background only |

Outside Claude, the owner pastes or attaches the source the question needs.

## The export

`scripts/build-export.mjs` joins `SKILL.md` and every reference file into `export/wugweb-brand-os.md`. It is plain Node with no dependencies.

```bash
node .claude/skills/wugweb-brand-os/scripts/build-export.mjs
```

Rebuild after any change to a rule. Never edit the export by hand.

## What works only in Claude

- Automatic triggering from the description in `SKILL.md`.
- Loading a reference file only when needed.
- The optional helpers above.

The visual check needs any model that can see images. A text-only model can check a written brief but not the artwork.
