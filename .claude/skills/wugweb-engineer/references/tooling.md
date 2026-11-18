# Tooling: ids, variables and connectors

The one file in this skill that names vendors and wiring. Every other file says what to do; this one says how to reach each system.

## Sanity

| Item | Value |
|---|---|
| Project id | `splvhmk1` |
| Dataset | `production` |
| API version used by these scripts | `v2025-02-19` |
| Query endpoint | `https://splvhmk1.api.sanity.io/v2025-02-19/data/query/production` |
| Mutate endpoint | `https://splvhmk1.api.sanity.io/v2025-02-19/data/mutate/production` |
| Public CDN read (published only, no token) | `https://splvhmk1.apicdn.sanity.io/v2025-02-19/data/query/production`. Used only on the explicit opt-in `backup.mjs --public`, never as a silent fall back. |
| Token variable | `SANITY_SYNC_TOKEN`, from the environment or the repo's `.env`. One name per use, as `docs/skills/SECRETS.md` sets; the scripts read no other name. |
| Token role | Editor. No key rotation, ever (owner, 2026-11-19). |
| Schema files | `sanity/schemaTypes/*.ts`, registered in `sanity/schemaTypes/index.ts` |
| Studio | Embedded at `/admin` on the site; also `cd sanity && npx sanity dev` on port 3333 |

The scripts call the HTTP API with `fetch`, so they need no packages. Drafts are documents whose `_id` starts with `drafts.`; reads with a token return them, CDN reads do not.

Connector: the Sanity MCP server can query and patch. It needs the owner's sign-in. When it is used, the same procedure applies: back up first with `scripts/backup.mjs` (or the connector's query saved to the same backup shape), show the plan, wait for the go, then patch one field. Never use its create, publish, discard or delete actions from this skill.

## Notion

| Item | Value |
|---|---|
| Token variable | `NOTION_API_TOKEN` in the repo's local `.env`, the name `docs/skills/SECRETS.md` and `.env.example` set |
| Name the site's sync scripts read today | `NOTION_TOKEN` (and `SANITY_TOKEN` or `SANITY_API_TOKEN` for Sanity). The names disagree with the standard; renaming them in the scripts is a site-code change on the owner's go. Until then, a sync only works if `.env` also holds the old names. |
| State on 2026-11-17 | Rejected with 401. No sync can run until the owner supplies a working token. |
| API version used by the sync scripts | `2025-09-03` |

Connector: the Notion MCP server can read pages and databases. Reads are fine. Writes follow the standing rules: the owner approves the exact change and a backup is made first. When writing to Notion, follow the working caution at the end of `docs/skills/STANDING-RULES.md`.

## R2

| Item | Value |
|---|---|
| Bucket | `wugweb-assets`, Standard class |
| Key shape | `assets/<path>`, served at `/assets/<path>` |
| Public base variable | `PUBLIC_R2_ASSETS_BASE` |
| Read route without credentials | The Sanity `asset` registry (one document per file) and HTTP `HEAD` on the public URL |

No write route is listed here on purpose. See `references/media-read.md`.

## Neon

`DATABASE_URL` holds the connection string. The Sanity to Neon sync is on hold: run nothing against Neon unless the owner asks. `scripts/apply-schema.cjs` in the site repo drops and recreates a table: never run it.

## Backups

- Folder: `backups/` at the repo root. The sync scripts already write there.
- The site repo is public and `backups/` is tracked. Never back up personal or secret data into it: `contactSubmission` (enquiries), `person` (emails) and `platformProfile` (its schema has password, API key and backup code fields). `scripts/backup.mjs` refuses those types inside the repo, by the query text and by the `_type` of every fetched document, and `--print` shows only their ids, types and counts, never content. Write their backups outside the repo (for example `~/wugweb-backups/`) and say where.
- Do not commit a backup unless the owner asks. Commit by path, as the standing rules say.
- Never delete a backup.

## Secrets and models

- Key and secret handling follows `docs/skills/SECRETS.md`, the one home for it. A key pasted into a session is not echoed, written or sent on; ask the owner to set it in the environment the script reads.
- A script that finds no `SANITY_SYNC_TOKEN` exits with code 2 and names the variable, never a value. That holds for reads and writes alike. The one way to read without the token is `backup.mjs --public`, which says it is a published-only read and marks the backup `publicRead`.
- This skill calls no AI model. Data writes never go through a model (`docs/skills/AI-MODELS.md`, "What never calls an AI model").

## Environment

- Node 18 or later. The site itself pins Node 22 in `.node-version`; do not lower it.
- Never print a token. The scripts read it and send it only in the `Authorization` header.
