# Ops cycle

Commands, gates and output formats for each mode, then this site's wiring. This is the only reference file that names the CMS, the media store and the host. Moving to another stack means rewriting the "This site's wiring" section and the sync script; nothing else changes.

## Contents

1. Gates
2. Output formats per mode
3. The neutral contract
4. This site's wiring
5. Never-do list for operations

## 1. Gates

| After | Show the owner | Next step waits for |
|---|---|---|
| Audit | Findings table | Nothing; continue to Brief |
| Brief | One-page brief + questions (after handoff 1 in `handoffs.md`, when search input is needed) | Answers, or "unvalidated" |
| Media | Manifest report | Decisions on heavy, wrong-client and dead files |
| Look | One review page per case study | Approval of hero, flags and captions |
| Body | Draft proposal, current → proposed | Approval of that exact text |
| Layout | Block plan | Approval |
| Ship | Gate table + previews at 375, 768, 1200 (after handoffs 2 and 4) | Owner's go to sync, commit, deploy |
| Forms | Each form, and each proposed new file | Owner's yes per form and per file |

A specialist's answer never passes a gate by itself: it enters the next proposal, and the owner approves the proposal.

## 2. Output formats per mode

**Audit.**
```
# Audit: <client> (<slug>), <date>
Sources read: body (<words> words), folder (<n> files), live page (<url>)
| Area | Found | Count | Note |
Unbacked claims: <list, quoted>
Owner questions: <numbered>
```

**Media.**
```
# Media report: <slug>
Own folder: <path> (decided by <rule>)
Files: <n> (<own> own, <borrowed> borrowed), <MB> MB total (summed)
Dead: <list>  Duplicates: <list>  Suspects: <list>
Over 4 MB images: <list>  Over 10 MB videos: <list>
moov at end: <list>  No poster: <list>
Rendered bytes for the proposed page: <MB> MB (budget 25 MB)
```

**Look.** JSON per asset (schema in `visual-read.md`) plus the sorted summary.

**Body.** A draft file `docs/drafts/<slug>-body-v2.md` with: what changes (current → proposed → why), the proposed body in the v2 grammar, claims left out, screen selection, flagged screens and the call on each, every own-folder file accounted for, owner questions.

**Layout.** Block plan as JSON: `[{ "type": "...", "chapter": "...", "items": [...] }]` using only the catalogue types.

**Ship.** Gate table:
```
| Check | 375 | 768 | 1200 | Note |
Result: <passed>/<applicable>
```

## 3. The neutral contract

source (one Body Content document + one media folder) → parsed body → media manifest → block plan → rendered page and other forms.

`scripts/case-audit.mjs` takes a plain `.md` file or a CMS slug. `scripts/check-case-page.mjs` takes any URL.

## 4. This site's wiring

- **Registry and plan**: Notion page "Wugweb Skill Management System" under Wugweb HQ, and the `wugweb-work` page under it. Notion wins over any file. The repo keeps one copy of the plan at `docs/skills/wugweb-work/PLAN.md`.
- **Source, track 1**: Notion, Case Studies data source, property Body Content (one per case study).
- **Source, track 2**: blog posts in Notion Blogs, synced by the site repository's blog sync script (`sync-notion-blogs.mjs`); service pages in Sanity `service` documents (6 pillars). Site and landing copy: the page's own records (taken from the repository's `CLAUDE.md`, not from the owner directly; to be corrected if wrong).
- **Scheduling tool for posts**: none connected (owner, 2026-11-17). Posts are handed to the owner as approved drafts; Postiz is installed as a helper but not connected to any account.
- **Layout values**: `kits_design_system/docs/tokens/layout-shell.md`, with `tokens/sizing.md` and `docs/components.md`, owned by `wugweb-kits`.
- **Listing a media folder**: the site repository's `media-manifest-dry-run.mjs` (in its own `scripts/` folder) does it read-only, taking the folder listing from the Sanity asset registry and measuring the public R2 URLs (R2 has no read-only list command here). Other R2 reads are `wugweb-engineer`'s media read. Commands that write, delete or download are forbidden.
- **CMS**: Sanity, document type `caseStudy`, field `bodyMarkdown`, synced from Notion. Public read: `https://splvhmk1.apicdn.sanity.io/v2024-01-01/data/query/production`.
- **v1 duplicate copy**: older bodies hold a second, longer copy under the heading `## Sanity site copy` or `## Framer site copy` (both are read the same way). The long copy wins; proposals collapse both into one.
- **Media**: Cloudflare R2, `assets/work/<slug>/`, public base `https://pub-39ad1d03baec440faf48303be95c3782.r2.dev/`.
- **Site**: Astro on Cloudflare Pages, repo `wugweb-git/wugweb_site`. Push to `main` deploys. Preview host `wugweb.pages.dev`; canonical host `www.wugweb.com`.
- **Page**: `src/pages/work/[slug].astro`; parser `src/lib/case-body.ts`; layout `src/lib/case-layout.ts`; components `src/components/work/Case*.astro`.

Sync, handed to `wugweb-engineer` (handoff 8 in `handoffs.md`): this skill runs neither the dry run nor the write. It gives the piece and the owner's approval of its content. `wugweb-engineer` runs the matching Notion to Sanity sync script (`sync-notion-case-studies.mjs` or `sync-notion-blogs.mjs` in the site repository) with its backup, dry run and check, on the owner's go, and never edits the content; a fault in the content comes back here. Its side of the link reads "sync this approved piece from Notion to Sanity". Checking the Notion token is its step; the standard name is `NOTION_API_TOKEN` (`docs/skills/SECRETS.md`), and the site sync scripts still read the old name `NOTION_TOKEN`.

Audit and gate (read-only, run here):
```
node .claude/skills/wugweb-work/scripts/case-audit.mjs <slug|file.md> [--measure] [--json]
node .claude/skills/wugweb-work/scripts/case-audit.mjs --all
node .claude/skills/wugweb-work/scripts/check-case-page.mjs http://localhost:4321/work/<slug>
node .claude/skills/wugweb-work/scripts/check-case-page.mjs http://localhost:8788/work/<slug> --host www.wugweb.com
```

Previews: dev server `wugweb-dev` on port 4321. JSON-LD is checked through `npm run preview` (port 8788) with the canonical Host header, because the dev server rejects unknown hosts. In Claude's browser pane the page reports as hidden, so reveals never fire there: inject `[data-reveal]{opacity:1!important}` and prefer DOM checks over screenshots.

Git rules are in `references/standing-rules.md`. Studio deploy and pushes are the owner's go. Sync runs, Sanity schema edits and data patches are `wugweb-engineer`'s, each on the owner's go.

Writes, handed to `wugweb-engineer`: this skill writes nothing to Notion or Sanity. After the owner approves the exact change, hand over the approved content and, for a field patch, the values file. Alt text is one value per `asset` document for the `alt` field, only for documents where it is empty. `wugweb-engineer` backs up, plans, shows the change report and applies on the owner's go to that plan.

## 5. Never-do list for operations

- Never write Notion or Sanity from this skill. An approved change goes to `wugweb-engineer`, never before approval of the exact change.
- Never touch R2 objects: no upload, delete, rename, copy or re-encode.
- Never delete a row, document, key or code path that holds content.
- Never push or deploy Studio without the owner's go. Never run a sync, dry run or write: it is `wugweb-engineer`'s.
- Never send or schedule a post in Postiz without the owner's yes for that exact post.
- Never raise DNS cutover, asset clean-up or cookie policy as side quests.
