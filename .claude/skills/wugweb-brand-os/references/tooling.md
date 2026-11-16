# Tooling

The only file that names Claude helpers, Notion or any vendor. Every mode can be done by hand from the other files; nothing here is required.

## Where the skill and its plan live

- Plan: the Notion page "wugweb-brand-os" under "Wugweb Skill Management System", and `docs/skills/wugweb-brand-os/PLAN.md` in `wugweb-git/wugweb_site`, branch main. If they disagree, Notion wins.
- Skill: `.claude/skills/wugweb-brand-os/`.

## Helpers

Helpers return proposals or reports only. The owner's rules win over anything a helper says. A helper that is missing or signed out is skipped and reported.

| Helper | Use | When |
| --- | --- | --- |
| `brand-voice:discover-brand` | Search connected platforms for brand material | At build time, or when the owner asks |
| `brand-voice:guideline-generation` | Draft non-voice guidelines from approved sources | Only from approved sources |
| `marketing:brand-review` | Second opinion on brand fit | Optional, after the Visual check |
| `marketing:competitive-brief`, `brightdata:competitive-intel` | Live competitor research | Only on the owner's yes, each time |
| `skill-creator`, `skill-development` | Building and testing this skill | Development only |

## Do not use

| Skill | Why |
| --- | --- |
| `anthropic-skills:brand-guidelines` | It is Anthropic's own brand |
| `theme-factory` | Preset palettes clash with fixed Wugweb colours |
| `brightdata:brand-listening` | Scrapes by default; uses review sites as a source |
| `brightdata:design-mirror` | Scrapes other sites and restyles the codebase; risk of copying another brand |
| `algorithmic-art`, `canva` | Make new media by default |

## Writes

This skill writes nothing to Notion, Sanity, R2 or `brand_guidelines/`. A Change proposal is shown in chat or saved as a draft file. Any write to Notion needs the owner's approval of the exact change, with a backup first.

## Outside Claude

Attach `export/wugweb-brand-os.md` and ask directly. Rebuild it with `node scripts/build-export.mjs` whenever a rule changes. The Visual check needs a model that can see images.
