# R2 assets: path map, path fields and free-tier Rule 2

Checked against the code on 2026-11-19. This file replaces `docs/content-assets.md`, which was removed that day.

## Bucket

| Field | Value |
|---|---|
| Name | `wugweb-assets` |
| Storage class | **Standard only** (Infrequent Access has no free tier) |
| Jurisdiction | default |
| Location | APAC |
| Public URL | `https://pub-39ad1d03baec440faf48303be95c3782.r2.dev` (r2.dev enabled) |
| Binding | `ASSETS_BUCKET` in `wrangler.jsonc` |

## Where media lives

Media is only in R2. The repo has no `public/assets/` folder. The owner's standing rule (`docs/skills/STANDING-RULES.md`) is: media only in R2, no local copies, no new uploads from a session. Content points at keys that already exist.

## Path mapping (canonical)

| Layer | Pattern | Example |
|---|---|---|
| Path stored on content | `/assets/<path>` | `/assets/work/axis-bank/axis-thumb.mp4` |
| R2 object key | `assets/<path>` | `assets/work/axis-bank/axis-thumb.mp4` |
| Public URL the site renders | `<ASSETS_BASE>/assets/<path>` | `https://pub-….r2.dev/assets/work/axis-bank/axis-thumb.mp4` |

Keys mirror the stored path without the leading slash. Do not invent a second prefix (`media/`, `static/` and the like) without an explicit migration.

`assetUrl()` in `src/lib/assets.ts` builds the public URL. `ASSETS_BASE` defaults to the r2.dev URL above; a build can override it with `PUBLIC_ASSETS_BASE`. The `PUBLIC_R2_ASSETS_BASE`, `PUBLIC_USE_R2_ASSETS` and `PUBLIC_LEGACY_ASSETS_BASE` values in `wrangler.jsonc` are not read by any code.

## Path fields on content

Sanity stores path fields, not Sanity CDN uploads.

| Type | Fields |
|---|---|
| `caseStudy` | `thumbnailPath`, `coverPath`, `galleryPaths[]`, `ogImagePath` |
| `client` | `logoPath` |
| `singletonPage` | `heroPath`, `mediaPaths[]`, `ogImagePath` |
| `service` | `coverPath`, `galleryPaths[]`, `ogImagePath` |
| `post` | `coverPath`, `ogImagePath` |
| `person` | `photoPath` |
| `testimonial` | `photoPath` |
| `industry` | `iconPath` |
| `taxonomy` | `iconPath`, `linkedAsset` |
| `siteSettings` | `ogImagePath` |
| `asset` | `sitePath`, `r2Key`, `publicUrl`, `r2Synced`, `linked*` |

Case-study media is also read from the Notion Body Content; the media manifest report is `docs/research/media-manifest-2026-11-17.md`.

Manifest of mapped objects: `docs/r2-asset-map.json`.

## Scripts

The upload scripts (`scripts/upload-assets-to-r2.mjs`, `scripts/upload-tools-gap-to-r2.mjs`) break the no-uploads rule and must not be run from a session. `scripts/sync-asset-registry.mjs` and `scripts/map-assets-to-content.mjs` write to Sanity; run them only on the owner's go, dry run first.

## Rule 2: R2 must not exceed the free tier

Hard stop. Never implement or run anything that would push R2 past the free allowances.

| Metric | Free monthly | Soft ceiling (this repo) |
|---|---|---|
| Storage | 10 GB | Stay under **9.5 GiB** used |
| Class A (writes) | 1M ops | Soft abort above **100k** puts in one job |
| Class B (reads) | 10M ops | Prefer Cache or a custom domain later; avoid listing storms |
| Egress | Free | |
| Storage class | Standard | **Never** Infrequent Access on free |

Also:

- One media bucket (`wugweb-assets`) unless the owner explicitly asks for another.
- `r2.dev` is for development and public read; a production custom domain is optional and must stay free-tier-safe.
- Prefer Cloudflare Cache in front of a custom domain before burning Class B quota.

See also: `.cursor/rules/free-tier-limits.mdc` (Rule 1 and Rule 2), `governance.md`.
