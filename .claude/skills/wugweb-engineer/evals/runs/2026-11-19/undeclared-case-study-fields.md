# Eval: undeclared-case-study-fields

Prompt: which fields do our case study documents carry in sanity that the schema doesnt declare? dont change anything

Files read: `.claude/skills/wugweb-engineer/SKILL.md`, `references/schema-change.md`, `references/open-items.md`, `references/data-patch-runbook.md`, `references/tooling.md`, `docs/skills/STANDING-RULES.md`, `evals/undeclared-case-study-fields/prompt.md`. Run locally, read-only, no network: `scripts/schema-fields.mjs --schema sanity/schemaTypes --type caseStudy` (declared fields only).

## Response

Mode: Schema check. Nothing was changed, and nothing will be: this is a read.

Result first: I could do half of the check in this run. The declared side is fresh. The stored side was not read (no Sanity read was made), so for it I give the last recorded live read, dated, and not a new count.

**Declared today (read from `sanity/schemaTypes/caseStudy.ts`, 2026-11-19): 56 fields.**
title, shortTitle, subtitle, slug, summary, thumbnailPath, coverPath, coverImage, client, disciplines, industry, timeline, partner, team, tags, about, challenges, solutions, designPhilosophy, impact, galleryPaths, bodyContent, results, publishedAt, featured, language, seoTitle, seoDescription, ogImage, ogImagePath, ogTitle, ogDescription, noIndex, bodyMarkdown, extraMedia, mediaManifest, year, country, platform, projectType, engagementType, specialThanks, links, accent, focusKeyword, canonicalUrl, clientRef, industryRef, services, assets, relatedCaseStudies, relatedPosts, syndicatedTo, neonSynced, neonSyncedAt, owner.

**Stored but not declared: 15 fields, as recorded on 2026-11-19 from a live read of the 44 published case studies.** Not re-read in this run.

| Field | Documents holding it (of 44 published) |
|---|---|
| aiSummary | 44 |
| schemaType | 44 |
| status | 44 |
| visibility | 44 |
| aiKeywords | 38 |
| readTime | 37 |
| wordCount | 37 |
| industryRefs | 25 |
| sectorRefs | 25 |
| clientLogoAlt | 19 |
| clientLogoPath | 19 |
| coverAlt | 19 |
| thumbnailVideoPath | 19 |
| aboutVideoPath | 18 |
| designPhilosophyVideoPath | 16 |

What I checked today: none of those 15 names is in the 56 declared fields, so the list still holds against the current schema file. What I did not check today: the stored keys and their counts.

Limits of the recorded figures:

- They cover published documents only. Drafts were not in that read, so a draft could hold a key not listed here.
- Earlier counts were 22 (engineering page, 2026-11-17, which counted the helper-declared `owner`) and 21 (2026-11-18). The drop to 15 came after six fields were declared on main: year, country, platform, projectType, engagementType and specialThanks.
- The schema parse is textual. It reported no unresolved elements for this type today; if it ever does, those are checked by hand before a key is called undeclared.

To get a fresh answer, with your word, I would run two reads. Neither changes Sanity; the first writes one backup file in `backups/`:

```
node $S/backup.mjs --query '*[_type == "caseStudy"]' --label case-studies
node $S/schema-fields.mjs --schema sanity/schemaTypes --type caseStudy --data backups/case-studies-<timestamp>.json
```

With `SANITY_SYNC_TOKEN` the read includes drafts. The second command lists keys the documents hold that the schema does not declare, with how many documents hold each, and declared fields that no document fills.

These are findings only. Whether each field is declared, left alone or unset is not mine to decide: content fields go to `wugweb-strategy`, SEO fields to `wugweb-seo`, and then to you. One ruling already exists: stored `aiSummary` and `schemaType` stay (`wugweb-strategy`, 2026-11-17). Stored values that nothing reads stay unless you rule otherwise.

Question for you: do you want the fresh read, drafts included, so the counts are today's?

Not done in this run: no Sanity read, no backup, no patch, no schema edit.
