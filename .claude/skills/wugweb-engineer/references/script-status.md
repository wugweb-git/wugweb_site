# Script status: the site's scripts folder

Checked 2026-11-19 against main `6e290b0`: 55 scripts. "Scan says" comes from `scripts/scan-scripts.mjs`, a word scan. "Status for this skill" was set by reading each script's header and switch; a script called finished or one-off is judged so from its header date and purpose. Read a script's code before running it, whatever this table says, and re-run the scan when the folder has changed.

A script that is not in the table is treated as "do not run" until it has been scanned and read. That covers untracked files too: on 2026-11-19 nine untracked `scripts/tmp-*.mjs` files sat on disk beside the 55 tracked scripts.

## How to read the statuses

- **Read allowed:** reads only, or writes a local report file. Run it.
- **Dry run allowed:** dry runs by default. Run the dry run; run the write only on the owner's go to the plan it printed, following `references/data-patch-runbook.md` for the backup and check.
- **Do not run as is:** writes unless told not to, or its switch is unclear. Propose a fix (dry run by default) as a site-code change, or use this skill's own scripts instead.
- **Do not run:** breaks a standing rule (uploads, new media files, redirects), is on hold, or is a finished one-off.
- **Owner only:** deletes. The owner runs it himself. Never run it from this skill, not even the dry run, unless the owner asks for the dry run.
- **Never:** destructive and unsafe. Do not run in any form.

## The table

| Script | Scan says | Switch | Status for this skill |
|---|---|---|---|
| `apply-schema.cjs` | writes with no switch | none | Never. Drops and recreates a Neon table; holds a connection string with a password. |
| `apply-service-pillar-meta.mjs` | dry run by default | WRITE=1 writes | Dry run allowed. Write only on the owner’s go; titles are wugweb-seo’s rule. |
| `audit-dup-stubs.mjs` | local files only | none | Read allowed. |
| `check-case-page.mjs` | read only | none | Read allowed. The case-study page check from `wugweb-work`'s publish gate; it reads pages and writes nothing. |
| `check-case-css.mjs` | read only | none | Read allowed. A build guard for the case-study styles; it runs before every build. |
| `check-sector-css.mjs` | read only | none | Read allowed. |
| `cleanup-blogs.mjs` | dry run by default | --apply writes | Owner only. Deletes documents. |
| `cleanup-dup-stubs.mjs` | dry run by default | --apply writes | Owner only. Deletes documents. |
| `cutover-redirects.mjs` | dry run by default | WRITE=1 writes | Do not run. Creates redirects; one slug per page and no redirects for old URLs. |
| `find-duplicate-singletons.mjs` | read only | none | Read allowed. |
| `find-duplicate-slugs.mjs` | read only | none | Read allowed. |
| `finish-airtel-logos.mjs` | dry run by default | WRITE=1 writes | Do not run. A finished one-off fix. |
| `fix-airtel-logos.mjs` | dry run by default | WRITE=1 writes | Do not run. A finished one-off fix. |
| `fix-case-studies.mjs` | writes with no switch | none | Do not run. Replaces whole documents with no switch; reads files from a Downloads folder. |
| `fix-notion-case-study-media.mjs` | dry run by default | WRITE=1 writes | Do not run. A finished one-off Notion write. |
| `generate-video-posters.mjs` | local files only; makes media files | none | Do not run. Makes new media files. |
| `ingest-brand-assets.mjs` | writes by default | DRY_RUN=1 reads; default writes | Do not run as is. Writes unless DRY_RUN=1. |
| `inspect-hash-refs.mjs` | read only | none | Read allowed. |
| `lib-logo-band.mjs` | read only | none | Read allowed. |
| `link-platform-tech-icons.mjs` | writes by default | DRY_RUN=1 reads; default writes | Do not run as is. Writes unless DRY_RUN=1 and copies files. |
| `map-assets-to-content.mjs` | writes by default | DRY_RUN=1 reads; default writes | Do not run as is. Writes unless DRY_RUN=1. |
| `media-manifest-dry-run.mjs` | local files only | none | Read allowed. |
| `merge-duplicate-records.mjs` | writes by default | DRY_RUN=1 reads; default writes | Do not run as is. Writes unless DRY_RUN=1 and unpublishes documents. |
| `migrate-caseStudy-bodyContent.mjs` | dry run by default | --apply writes | Do not run. A finished one-off migration. |
| `notion-publish-six-case-studies.mjs` | dry run by default | WRITE=1 writes | Do not run. A finished one-off Notion write. |
| `openrouter-audit-case.mjs` | read only | none | Not this skill’s. A wugweb-work helper that sends content to OpenRouter; data work never goes through a model (`docs/skills/AI-MODELS.md`). Never run from this skill. |
| `openrouter-chat.mjs` | read only | none | Not this skill’s. A wugweb-work helper that sends content to OpenRouter; data work never goes through a model (`docs/skills/AI-MODELS.md`). Never run from this skill. |
| `openrouter-vision.mjs` | read only | none | Not this skill’s. A wugweb-work helper that sends content to OpenRouter; data work never goes through a model (`docs/skills/AI-MODELS.md`). Never run from this skill. |
| `owner-archive-sanity-batch34.mjs` | dry run by default | APPLY=1 writes | Owner only. A finished delete batch. |
| `owner-delete-blog-alt-spares.sh` | owner only | none | Owner only. Deletes; never run from this skill. |
| `owner-delete-blog-body22.mjs` | owner only | APPLY=1 writes | Owner only. Deletes; never run from this skill. |
| `owner-delete-blog-unsorted.mjs` | owner only | APPLY=1 writes | Owner only. Deletes; never run from this skill. |
| `owner-delete-clip-originals.mjs` | owner only | APPLY=1 writes | Owner only. Deletes; never run from this skill. |
| `owner-delete-notion-blog-sync.mjs` | owner only | APPLY=1 writes | Owner only. Deletes; never run from this skill. |
| `owner-delete-r2-validated-duplicates.mjs` | owner only | APPLY=1 writes | Owner only. Deletes; never run from this skill. |
| `owner-delete-unsorted-blog1-blog3.sh` | owner only | none | Owner only. Deletes; never run from this skill. |
| `plan-asset-reorg.mjs` | local files only | none | Read allowed. |
| `populate-missing-covers.mjs` | writes by default | DRY_RUN=1 reads; default writes | Do not run as is. Its switch reads the wrong way round. |
| `qa-sanity-benchmark.mjs` | read only | none | Read allowed. |
| `scan-asset-usage.mjs` | dry run by default | WRITE=1 writes | Read allowed. WRITE=1 only on the owner’s go. |
| `seed-asset-alt.mjs` | dry run by default | WRITE=1 writes | Dry run allowed. Alt text is visible copy: wording goes through wugweb-work first. |
| `seed-site-media-cms.mjs` | dry run by default | WRITE=1 writes | Do not run. A finished one-off seed. |
| `set-casestudy-og-paths.mjs` | dry run by default | WRITE=1 writes | Dry run allowed. Write only on the owner’s go to the shown plan. |
| `set-site-url.mjs` | dry run by default | WRITE=1 writes | Do not run. A cutover step; not raised unless the owner asks. |
| `sync-asset-registry.mjs` | writes by default | DRY_RUN=1 reads; default writes | Do not run as is. Writes unless DRY_RUN=1 and can upload; item N (hash sign) is open. |
| `sync-logo-band.mjs` | dry run by default | APPLY=1 writes | Dry run allowed. Write only on the owner’s go; it can create client documents. |
| `sync-notion-blogs.mjs` | dry run by default | WRITE=1 writes | Dry run allowed. Write on the owner’s go: see sync-scripts.md. |
| `sync-notion-case-studies.mjs` | dry run by default | WRITE=1 writes | Dry run allowed. Write on the owner’s go: see sync-scripts.md. |
| `sync-notion-sectors.mjs` | dry run by default | WRITE=1 writes | Dry run allowed. Write on the owner’s go: see sync-scripts.md. |
| `sync-sanity-to-neon.mjs` | writes with no switch | none | Do not run. Neon sync is on hold until the owner asks. |
| `upload-assets-to-r2.mjs` | writes by default | DRY_RUN=1 reads; default writes | Do not run. Uploads to R2, and writes unless DRY_RUN=1. |
| `upload-blog-manifest.mjs` | writes with no switch | none | Do not run. Uploads to R2. |
| `upload-missing-local-originals.sh` | writes with no switch | none | Do not run. Uploads to R2. |
| `upload-tools-gap-to-r2.mjs` | writes by default | DRY_RUN=1 reads; default writes | Do not run. Uploads to R2, and writes unless DRY_RUN=1. |
| `verify-site-media.mjs` | read only | none | Read allowed. |

## Patterns worth knowing

- Three switch styles exist: `WRITE=1` or `APPLY=1` or `--apply` to write (safe default), and `DRY_RUN=1` to read (unsafe default: forgetting it writes). Never assume one from another script.
- Five scripts write with no switch at all.
- The scan flags `delete` on any `.delete(` call, which also matches a JavaScript map; `seed-asset-alt.mjs` is such a false flag.
- `scripts/apply-schema.cjs` holds a Neon connection string with a password, in a public repo. What happens to it is the owner's call; no key rotation, ever (owner, 2026-11-19). Never copy, print or send the string.

## Proposed, not made

Changing the "writes by default" scripts to dry run by default is a site-code change for the owner's go. Until then, this skill's own `backup.mjs`, `plan-patch.mjs` and `apply-plan.mjs` cover any one-field patch those scripts would have made.
