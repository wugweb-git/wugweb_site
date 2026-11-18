# Open items this skill will carry out

Read from the Notion page "wugweb-web-engineering" on 2026-11-19 (page last edited 2026-11-17 18:35 UTC). That page holds the status of each item; this file only says how this skill runs the data ones. If the two disagree, Notion wins. Item letters are the page's.

## Data and schema items

| # | Change | Mode | How it runs here | Waiting for |
|---|---|---|---|---|
| A | `schemaType` TechArticle to BlogPosting on posts | Plan a change | Read, back up, `plan-patch.mjs --set '"BlogPosting"'`, show, wait, apply, check. The test run of 2026-11-18 read 19 published posts on TechArticle from the public read; drafts need a token read. No page reads the field, and the post schema does not declare it, so nothing visible changes. | Owner's go |
| B | Remove `FAQPage` from the `singletonPage.schemaType` options | Schema change | One line in `sanity/schemaTypes/singletonPage.ts`, by `references/schema-change.md`. Stored values stay. Studio deploy is the owner's step after the merge. | Owner's go, then the owner's Studio deploy |
| G | Fill `service.faqs` on the six service pages from the approved rows | Plan a change | Service pages show the Sanity `faqs` list instead of the typed list in `src/lib/services-data.ts` once a service holds any FAQs (`preferArr` in `src/pages/services/[slug].astro`). So loading only the kept rows takes the 5 "answer again" service rows (Strategy 6, Brand 3, Experience 9, Growth 3, Growth 6) off the live pages, against the ruling that they stay live. Ask the owner first: wait for all six, load the 5 as they stand now, or let them drop. Then `wugweb-work` turns the chosen rows of `docs/skills/wugweb-strategy/FAQ-REVIEW.md` into a values file (`q`, `a`; the dash removals are already in the typed copy on main), the owner approves the wording (Brand 2 still needs "always" softened), and `plan-patch.mjs --field faqs --values <file>` builds one plan for the six documents. Visible on all six service pages. | Owner's choice on the 5 rows; owner's facts; owner's go on the plan |
| H | A working Notion token | Sync | Stop rule in `references/sync-scripts.md`. | Owner |
| (none) | Footer copyright years in `siteSettings` | Plan a change | One field on one document. The new wording comes from the owner. | Owner's answer on the year |
| (none) | Em dash in the stored home page title | Plan a change | One field on one `singletonPage`. The new title comes from `wugweb-work` and `wugweb-seo` (title rules). | Owner's answer |

## Findings from building this skill (2026-11-19)

| Finding | Belongs to | State |
|---|---|---|
| The three Notion sync scripts read `NOTION_TOKEN`, and most Sanity scripts read `SANITY_TOKEN` or `SANITY_API_TOKEN`; `docs/skills/SECRETS.md` and `.env.example` name `NOTION_API_TOKEN` and `SANITY_SYNC_TOKEN`. | Site code, owner's go | Reported |
| `schemaType` is stored on posts and case studies but declared on neither type, so Studio does not show it. | `wugweb-strategy` (keep, ruled 2026-11-17) | Recorded |
| Undeclared case-study fields. The engineering page recorded 22 (it counted the helper-declared `owner`). A live read on 2026-11-18 found 21. After main `6e290b0` declared `year`, `country`, `platform`, `projectType`, `engagementType` and `specialThanks`, a live read on 2026-11-19 of the 44 published documents finds 15: aiSummary, schemaType, status, visibility (44 each), aiKeywords (38), readTime and wordCount (37), industryRefs and sectorRefs (25), clientLogoAlt, clientLogoPath, coverAlt and thumbnailVideoPath (19), aboutVideoPath (18), designPhilosophyVideoPath (16). | `wugweb-strategy`, `wugweb-seo` | Reported |
| Eight scripts write unless `DRY_RUN=1`; five write with no switch. | Site code, owner's go | Listed in `references/script-status.md` |
| `backups/` is tracked in a public repo. | Owner | `backup.mjs` refuses personal and secret types there |

## Not this skill's

M (an ignore line), N (escaping in `sync-asset-registry.mjs`), I (cache test), J (`pg` note), K (brand files), R (`npm audit`), S (docs clean-up) are site code or docs. They follow the site-code steps in the repo's `AGENTS.md`. O (dead links in bodies) is content for `wugweb-work`. P and Q are media findings: report only, by `references/media-read.md`.
