# Full Audit & Remaining Work — 2026-07-29

## Data State

### Sanity Document Counts
| Type | Count | Expected | Gap |
|---|---|---|---|
| caseStudy | **90** (duplicates) | ~37 unique | ~50 duplicates need cleanup |
| post | 65 | ~52 from Notion + ~13 original | 15/65 have body content — 50 need content |
| person | 11 | ~13 (team + authors) | Missing Wugweb Design author |
| client | 106 | ~109 in Notion | Close enough |
| industry | 66 | 66 in Notion | ✅ |
| service | 6 | 6 (but wrong taxonomy) | Needs 6-pillar framework |
| syncStatus | 9 | 9 | ✅ |

### Case Study Data Quality
- 90 total but many duplicates (same slug, different IDs)
- ~56 have challenges/solutions/impact populated (from CSV+writeup)
- ~34 are empty short-slug copies from failed migration runs

### Blog Data Quality
- 65 total, but only 15 have body content
- 50 from Notion have SEO metadata but no body (Notion stores body in a separate "content" database we don't have access to)
- Authors from Notion: Vedanshu Srivastava (AUTH-001), Wugweb Design (AUTH-002)

### Assets (Notion Asset Sheet)
- 128 rows total, 69 active work assets with paths
- 0 currently exist in public/assets/ matching Notion paths
- Notion paths use pattern: `work/clientname/filename.mp4`
- Local assets use same pattern but in `public/assets/work/clientname/file.mp4`

### Schema Gaps
- caseStudy is missing: `subtitle`, `partner`, `designPhilosophy` fields → ✅ added now
- service schema has old 8-service taxonomy — needs 6-pillar framework
- No engagement or taxonomy documents in Sanity (schema exists but empty)
- contactSubmission is read-only — no data needed

---

## Pending Work

### 🔴 Critical
1. **Clean up 90→37 case studies** — delete empty duplicates so unique count matches 37
2. **Enrich 50 Notion blogs with body content** — Notion stores body externally, need to create structured content
3. **Wire work/[slug].astro to Sanity** — currently hardcoded 8, needs dynamic routing
4. **Wire blog pages to Sanity** — currently hardcoded 13
5. **Wire services pages to Sanity** — currently hardcoded 6
6. **Wire about.astro team section** — currently hardcoded 11 members

### 🟡 Medium
7. **Map Notion assets to public/assets/** — 69 work assets with paths, need actual files
8. **Update service schema to 6-pillar framework** — Strategy, Brand, Experience, Growth, Engineering, Operations
9. **Sync all to Neon** — final sync

### 🟢 Low / Nice-to-have
10. **Add engagement+taxonomy docs** — schema exists, data in Notion
11. **Wire faq.astro to Sanity**
12. **Sync status dashboard mismatch UI** — already have syncStatus docs in Sanity

### ❌ Blocked / Failed / Cancelled
- **Notion blog body content** — Notion's blog Content field stores as "Rich Text" but the actual content appears to be in a different table not accessible via the API. Blog bodies would need to be written manually or fetched from a different source.
- **Asset file mapping** — Asset sheet has paths but files don't exist in repo. These exist on the old Framer CDN or wugweb.online server. Need to be downloaded.
- **NEON connection at runtime** — deferred per instruction (Workers doesn't support pg TCP).
- **Draft/preview mode** — deferred.
- **footer/sitemap** — excluded intentionally.
- **footer/subscription** — needs payment-gateway scoping conversation.

### Task Categories Summary
| Category | Status |
|---|---|
| ✅ Completed fully | Design tokens, Nav bar, Contact form + confirmation, Sanity schema enrichment, Notion data fetched (15 DBs), Neon schema applied, Sync API built, Content helpers built |
| 🔄 In progress | Case study data cleanup, Frontend wiring to Sanity, Service framework update |
| ⏳ Pending | Blog body enrichment, Asset mapping, final Neon sync |
| ❌ Blocked | Blog body content (Notion external), Runtime Neon connection (Workers), Assets (files on external server) |
