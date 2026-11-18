# Tooling

The only file that names Claude helpers, Notion or any vendor. Every mode can be done by hand from the other files; nothing here is required.

## Where the skill and its plan live

- Plan: the Notion page "wugweb-brand-os" under "Wugweb Skill Management System", and `docs/skills/wugweb-brand-os/PLAN.md` in `wugweb-git/wugweb_site`, branch main. If they disagree, Notion wins.
- Skill: `.claude/skills/wugweb-brand-os/`.

## Helpers

Helpers return proposals or reports only, and their output is never treated as approved. The owner's rules, and `docs/skills/STANDING-RULES.md`, win over anything a helper says. A helper that is missing or signed out is skipped and reported, never a blocker. Live research on other companies' sites, or anything that sends Wugweb's or a competitor's name to an outside service, needs the owner's yes each time. No helper may generate, crop, re-encode or upload media as part of this skill's work.

| Helper | Use | When |
| --- | --- | --- |
| `brand-voice:discover-brand` | Search connected platforms for brand material | At build time, or when the owner asks. It recommends which source to adopt; the owner decides |
| `brand-voice:guideline-generation` | Draft non-voice guidelines from approved sources | Only from approved sources. It is mostly a voice tool; take only the identity and messaging blocks |
| `marketing:brand-review` | Second opinion on brand fit or a fact check | Optional, after the Visual check. It treats sentence case and dashes as open choices; the standing rules settle them |
| `marketing:competitive-brief`, `brightdata:competitive-intel` | Live competitor research | Only on the owner's yes, each time. The brief leans on third-party review sites, which are not a source here |
| `skill-creator`, `skill-development` | Building and testing this skill | Development only |

## Do not use

| Skill | Why |
| --- | --- |
| `anthropic-skills:brand-guidelines` | It is Anthropic's own brand |
| `theme-factory` | Preset palettes clash with fixed Wugweb colours |
| `brightdata:brand-listening` | Scrapes by default; uses review sites as a source |
| `brightdata:design-mirror` | Scrapes other sites and restyles the codebase; risk of copying another brand |
| `algorithmic-art`, `canva`, any image generator as a default step | Make new media by default. New media is made only per file, on the owner's yes, and never by this skill |

## Writes

This skill writes nothing to Notion, Sanity, R2 or `brand_guidelines/`. A Change proposal is shown in chat or saved as a draft file. Any write to Notion needs the owner's approval of the exact change, with a backup first.

## Where the sources live

| Source | Place |
| --- | --- |
| The owner's standing rules | `docs/skills/STANDING-RULES.md` in the repo |
| The visual guidelines | `brand_guidelines/` in the repo |
| Design system rules and values | `kits_design_system/docs/` in the repo, owned by `wugweb-kits` |
| The stale 2023 profile | Notion |

## Outside Claude

Attach `export/wugweb-brand-os.md` and ask directly. Rebuild it with `node scripts/build.mjs` whenever a rule changes, then run `node scripts/test.mjs`. Install routes for Cursor, Codex, ChatGPT and agents with no skill support are in `README.md`.

The export joins `SKILL.md` and every reference file. It is plain Node with no dependencies. Never edit it by hand.

## What works only in Claude

- Automatic triggering from the description in `SKILL.md`.
- Loading a reference file only when needed.
- The helpers above.

The Visual check needs any model that can see images. A text-only model can check a written brief but not the artwork.
