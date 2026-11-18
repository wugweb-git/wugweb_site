# Reading media and the asset registry

This skill reads media facts. It never makes, copies, moves, uploads, crops, re-encodes or removes a file. The media rules themselves live in `docs/skills/STANDING-RULES.md`; this file says only how to read.

## Where the facts come from

| Question | Read from |
|---|---|
| Which files exist under a folder | The Sanity `asset` registry: `*[_type == "asset" && relativePath match "work/<slug>/*"]{relativePath, r2Key, usedBy, usedByCount, alt}` |
| Does a file answer | HTTP `HEAD` on `PUBLIC_R2_ASSETS_BASE` + `/assets/<path>`; report status, `content-length` and `content-type` |
| Which documents use a file | `usedBy` on the asset document; refreshed by `scripts/scan-asset-usage.mjs` (read-only without `WRITE=1`) |
| Page media weight | Sum of `content-length` over the files a page loads; compare with the 25 MB page budget used in the media manifest |
| Case-study media per page | `scripts/media-manifest-dry-run.mjs` in the site repo, read-only |

The registry can lag the bucket. When it matters, say the count came from the registry and when the registry was last scanned.

## Report shape

```
Folder: work/<slug>/
Files in registry: <n>   Answering 200: <n>   Missing: <n>
Largest: <path> (<size>)
Used by: <n> documents   Unused: <n> files
```

Unused files are findings only. Removing any is a delete: it goes to the owner, never into a plan here.

## Known open points (engineering page, 2026-11-18)

- N: `scripts/sync-asset-registry.mjs` builds the address without escaping the key, so a file name with `#` breaks. Fix proposed, not made.
- P: five R2 folders that no case study claims. Report only.
- Q: four pages over the 25 MB budget. The files stay as they are; the page handles the weight.
