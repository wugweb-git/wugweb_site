# Ops

This workspace's wiring. The only file that names tools and vendors. Moving to another tool means rewriting this file alone.

## Notion

| Database | Use here | Access |
| --- | --- | --- |
| Plan database | The calendar and backlog, one row per piece (decision 1). Not built yet: its schema is in `content-models.md` and needs the owner's yes | Read; writes only on the owner's yes per change, with a backup first |
| Blogs | Published and draft posts. Never used for planning | Read only |
| Case Studies | Proof inventory and relations (Services, Related Case Studies, Related Posts) | Read only |
| Publications | One row per place a post or case study is published. Status: Planned, Scheduled, Published, Removed | Read only; repurposing rows proposed for the owner's yes |
| Skill registry | "Wugweb Skill Management System" under Wugweb HQ | Read only |

The old "Content calendar" under the owner's personal area holds Notion's starter template rows only (read 2026-11-16). Not used.

### The Blogs sync

`scripts/sync-notion-blogs.mjs` in the site repo reads every Blogs row that is not in the trash, whatever its Status, and creates a Sanity post for any row it cannot match. A planned row in Blogs would become a post on the next write. This is why the plan has its own database.

## Sanity

`service` documents hold the six service pages; `post` and `caseStudy` are written by sync from Notion. Read only. No schema change from this skill (decision 22).

## R2

All media. Briefs name existing files by key. No uploads, copies, crops, re-encoding or sound.

## Before backup and write

Before any approved Notion change: fetch the page or rows, save the backup (for this project, under `claude/backups/` named with the source and date), show current → proposed, apply only what was approved.

## Connectors and tools in Claude

- Notion connector: search, fetch, query data sources.
- `wugweb-seo` reads Search Console and AI answer data; this skill takes its reports, not the raw tools.
- Platform numbers (LinkedIn, Medium, Behance, Dribbble, newsletter) come from the owner or `wugweb-work`. There is no connector for them here.
- The newsletter sending tool is "owner to set".

## Outside Claude

| Thing | Instead |
| --- | --- |
| Reading Notion through the connector | Paste or attach an export of the rows, or use the Notion API with a valid token |
| Helper skills | Skipped; use the by-hand procedure in each reference |
| Automatic triggering | Attach `export/wugweb-strategy.md` by hand, or add it as a project rule |
| Running the `evals/` test cases | Run the same prompts and check the same assertions by hand |

## Repo copy

The plan lives at `docs/skills/wugweb-strategy/PLAN.md` in `wugweb-git/wugweb_site`. The skill is planned to live at `.claude/skills/wugweb-strategy/`. Putting it in the repo needs the owner's word.
