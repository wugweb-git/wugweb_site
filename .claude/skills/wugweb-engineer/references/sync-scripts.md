# Notion to Sanity sync scripts

Three scripts in the site repo carry Notion data into Sanity. Each dry runs by default, writes with `WRITE=1`, and backs up to `backups/` before writing. None writes to Notion. Read from their headers on 2026-11-19; re-read a header before each run in case it changed.

| Script | Notion source | Writes in Sanity | Never touches |
|---|---|---|---|
| `scripts/sync-notion-blogs.mjs` | Blogs database | `post`: title, slug, excerpt, SEO title and description, canonical, featured, reading time, published date, cover and og image paths, body, topic, category, author, tags, related posts. Creates new posts as `post-<slug>`. | Deletes nothing. Posts only in Sanity are listed, not removed. Empty Notion values never clear Sanity. |
| `scripts/sync-notion-case-studies.mjs` | Case Studies database | `caseStudy`: SEO title, SEO description, focus keyword, canonical URL | Notion. Canonicals that do not resolve to a published `/work/<slug>` are skipped. |
| `scripts/sync-notion-sectors.mjs` | Sector and Industry tables | `sector` showcase, order and icon; `industry.showOnSectorCard` | Creates and deletes nothing; patches existing `sector-SEC-n` and `industry-IND-n` documents only. |

## Procedure

1. **Check the token.** The Notion token was rejected (401) on 2026-11-17. A 401 or "unauthorized" in the first lines means stop: tell the owner the sync needs a working token in `.env`. Do not try another token. The scripts read `NOTION_TOKEN`, while the standard name is `NOTION_API_TOKEN` (see `references/tooling.md`); name both when asking.
2. **Dry run.** `node scripts/sync-notion-<name>.mjs`. Save its output to `backups/<name>-dry-run-<ts>.txt`.
3. **Read the plan.** Count changes by field. Flag:
   - any change to a field that `wugweb-seo` owns the rule for (titles, descriptions, canonicals): name the rule it meets or breaks;
   - any post that would be created;
   - any body change on a published case study or post, which a visitor will see.
4. **Show.** Counts, flags, the saved dry run path, and the backup the write will make.
5. **Write on go.** `WRITE=1 node scripts/sync-notion-<name>.mjs`. Note the backup path it prints.
6. **Check.** Re-run the dry run; it should report no changes for the synced fields. Request two changed pages twice on staging.

## The blog sync and creates

The blog sync can create documents. That is the one create this skill allows, because the script owns it and the owner approved the sync design on 2026-10-13. Every create is listed in step 3, and the owner's go covers the creates shown, nothing more.

## Undo

The sync scripts' own backups hold the touched documents before the write. To undo one field, use the undo in `references/data-patch-runbook.md` with that backup. To undo a created post, the route is an owner-run delete script with its own backup; propose it, never run a delete.

## Packages

The sync scripts import `@sanity/client` (and the blog sync `sharp`), so they need `npm install` at the repo root first. A missing package stops the dry run before any network call; report it and ask for the install, do not install packages on the owner's machine unasked.

## Automation

Automating the blog sync was offered, not decided (engineering page, leftover 1). Do not schedule it.
