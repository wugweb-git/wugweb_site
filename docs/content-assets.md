# Content ↔ asset mapping

Media stays in R2 / `public/assets` (Rule 2). Sanity stores **path fields**, not Sanity CDN uploads.

Governance (ownership / author / Notion-as-seed): see [`governance.md`](../governance.md).

## Layers

| Layer | Sanity | Role |
|---|---|---|
| Global Settings (masters) | `taxonomy` by `vocabulary` | platform, tech-stack, tag, asset-type, content-type, team-department, country (+ `industry` docs) |
| Presence | `platformProfile` | Owned profile URLs + credentials; `owner` ∈ {vedanshu, wugweb, both} |
| Assets | `asset` | Every local file path ↔ R2 key; **ownership backfill done** (vedanshu \| wugweb \| both) |
| Content | caseStudy / post / client / … | `*Path` fields + `linked*` on assets; **Author** (`person`) ≠ **Owner** |

## Notion is seed only

Notion Asset Sheet / Master Taxonomy were a starting base. Sanity + local assets already exceed Notion (e.g. ~472 asset docs vs ~128 sheet rows). Do not reset mappings from Notion alone.

## Path convention

| Field | Example |
|---|---|
| `relativePath` | `work/axis-bank/axis-thumb.mp4` |
| `sitePath` / `*Path` on content | `/assets/work/axis-bank/axis-thumb.mp4` |
| `r2Key` | `assets/work/axis-bank/axis-thumb.mp4` |
| `publicUrl` | `https://pub-….r2.dev/assets/work/axis-bank/axis-thumb.mp4` |

## Content fields

| Type | Fields | Source |
|---|---|---|
| `caseStudy` | `thumbnailPath`, `coverPath`, `galleryPaths[]` | `work/<client>/*-thumb.mp4`, `framer/<slug>/cover-*`, framer gallery |
| `client` | `logoPath` | `logos/client-logo-*.png` (+ framer client-logo) |
| `singletonPage` | `heroPath`, `mediaPaths[]` | `more/home/*`, `more/about/*`, `services/**` |
| `service` | `coverPath`, `galleryPaths[]` | `services/<folder>/*` |
| `post` | `coverPath`, `author` | `blog/<slug>.png` (partial); author = person byline |
| `taxonomy` | `iconPath`, `linkedAsset` | `tools/`, `platforms/` |
| `asset` | `sitePath`, `r2Key`, `publicUrl`, `r2Synced`, `linked*` | All local files |

## Scripts

```bash
# Masters + Presence (Notion → Sanity) — gap-fill upsert only
node scripts/fetch-digital-presence.mjs
node scripts/sync-global-config.mjs

# Icons from reference HTML alts
node scripts/link-platform-tech-icons.mjs

# Framer service/about pages → audit + Sanity extract
node scripts/audit-framer-service-pages.mjs
SANITY_API_TOKEN=… node scripts/extract-framer-service-pages.mjs
# Toolkit icons (pairs empty-alt img + title) — preferred for masters
SANITY_API_TOKEN=… node scripts/salvage-framer-toolkits.mjs
# SKIP_R2=1 to skip tool-icon R2 put

# Full audit matrix (Framer sitemap vs reference vs Astro vs pages.dev)
# See docs/framer-full-audit.md — keep reference/ + component/; do not delete yet.

# Full asset registry + R2 missing-only
node scripts/sync-asset-registry.mjs

# Content *Path fields
node scripts/map-assets-to-content.mjs
```

Manifests: `docs/r2-asset-map.json`, `docs/asset-registry-report.json`, `docs/platform-tech-icon-map.json`, `docs/content-asset-map.json`, `docs/framer-service-audit.json`, `docs/framer-service-extract-report.json`, `docs/framer-toolkit-salvage-report.json`, `docs/framer-full-audit.md`.

## DP3 field remap

Notion DP3 columns are mislabeled. Import uses:

- **Platform name** = `Slug`
- **Profile ID hint** = `Platform Name` (PF-…)
- **Credential ID** = `Platform ID` (CRD-…)
- Enrichment (website, SEO, API flags) → taxonomy `vocabulary: "platform"`

## Frontend

- Prefer `*Path` / `iconPath` via `assetUrl()` in `src/lib/assets.ts`
- **R2 cutover live** — `PUBLIC_USE_R2_ASSETS=1`; paths resolve to R2 public URLs
- About stack chips + service toolkit chips read tech-stack `iconPath` when present
- Service detail pages merge Sanity `why` / `tools` / `approach` over hardcoded fallbacks; Framer slugs (e.g. `experience-design`) are routable

## Current gaps

- **Reference enrichment incomplete** — `reference/` still holds ~96 unextracted service-page assets (icons, hero images); **89** toolkit icons already salvaged. `component/` is consumed (safe to delete). See `docs/framer-toolkit-salvage-report.json` + pending #42.
- Most **platforms** still lack icons; tech-stack ~89 with `iconPath`
- 53 posts without `coverPath`; 43 case studies without `thumbnailPath` (work grid shows styled placeholders)
- ~40 CSV-only case studies lack extracted work/Framer media (user will supply)
- Presence credentials are Studio-only — never query on the public site
- Industry master has `iconPath` field ready; media not backfilled yet
- Approach graphs remain canvas (no single export graphic)
- 8 stale Neon caseStudy rows + `[object Object]` slug bug in older Neon rows (Neon sync is user-controlled)

See also: `docs/r2-assets.md`, `.cursor/rules/free-tier-limits.mdc` Rule 1+2, `governance.md`.
