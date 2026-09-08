# Governance — Vedanshu × Wugweb

Canonical standing rules for this repo. Agents: read before ownership changes, Neon sync, media/R2 work, Sanity Studio changes, or Notion imports.

Also enforced as Cursor rules:

- [`.cursor/rules/free-tier-limits.mdc`](.cursor/rules/free-tier-limits.mdc) — Rule 1 + Rule 2
- [`.cursor/rules/governance.mdc`](.cursor/rules/governance.mdc) — ownership / Notion seed

---

## Rule 1 — Never exceed any free-tier limit (incl. Sanity credits)

Never exceed any free-tier quota, plan, or feature ceiling for services used by this repo.

**Applies to:** Sanity (API / CDN / Studio credits & rate limits), Cloudflare Pages/Workers/R2/KV, Neon, Notion, GitHub, and any other third-party tool.

### Do

- Prefer static schema/UI patterns over live Studio widgets, expensive GROQ, custom plugins, or realtime subscriptions
- Prefer CDN/local assets and existing bindings over new paid add-ons
- Check plan limits before plugins, cron, high-frequency sync, large media uploads, or new cloud products
- If a feature would push past free tier, **stop** and propose a free-tier-safe alternative
- Sanity: path fields for media (no bulk Sanity CDN asset uploads); Tables tool = one-shot GROQ; no live dashboard widgets

### Do not

- Install paid-only plugins or force upgrades
- Add dashboard live queries, graph traversals, or polling that risks API/credit burn
- Provision Hyperdrive, extra KV, or other billable bindings unless explicitly requested
- Assume “temporary” free-tier overages are acceptable

Full detail: [`.cursor/rules/free-tier-limits.mdc`](.cursor/rules/free-tier-limits.mdc).

---

## Rule 2 — R2 MUST NOT EXCEED FREE TIER

Hard stop for Cloudflare R2 credits/usage. Media lives in bucket `wugweb-assets` (**Standard class only**).

| Metric | Free | Repo soft ceiling |
|---|---|---|
| Storage | 10 GB | Abort uploads above **9.5 GiB** planned usage |
| Class A (writes) | 1M / mo | Soft-abort bulk jobs above **100k** puts |
| Class B (reads) | 10M / mo | No listing storms; prefer cache |
| Egress | Free | — |

### Path map (do not invent new prefixes)

- Local: `public/assets/<path>`
- Site: `/assets/<path>`
- R2 key: `assets/<path>`
- Public: `https://pub-39ad1d03baec440faf48303be95c3782.r2.dev/assets/<path>`

### Do not

- Use Infrequent Access (no free tier)
- Create extra R2 buckets without an explicit user request + free-tier check
- Re-upload the full tree repeatedly
- Delete `public/assets` before R2 cutover is verified
- Assume overages or “temporary” paid R2 usage are OK

Details: [`docs/r2-assets.md`](docs/r2-assets.md). Upload: `scripts/upload-assets-to-r2.mjs` / `scripts/sync-asset-registry.mjs`.

---

## 1. Who is who

| Entity id | Name | Type | Role |
|---|---|---|---|
| `vedanshu` | Vedanshu Srivastava | person | Individual. Owns Wugweb as a company. Also has **personal** work that is **not** Wugweb. |
| `wugweb` | Wugweb | company | Studio / agency brand. Peer entity in Neon — not a child row of Vedanshu. |
| `both` | Vedanshu + Wugweb (shared) | shared | Synthetic Neon entity for dual-brand ownership rows. |

**Relationship (plain language):**

- Vedanshu **owns** Wugweb (business ownership).
- Neon is a **shared central DB** between Vedanshu and Wugweb.
- Content is **not** all Vedanshu-owned by default.
- For agency case work, Vedanshu may appear as a **client under Wugweb** (client record), while still being the person entity `vedanshu`.
- Personal portfolio / writing / presence that is not agency work stays under owner `vedanshu` only.

---

## 2. Owner ≠ Author (two different schemas)

| Concept | Schema / field | Meaning |
|---|---|---|
| **Owner** | Governance field: `owner` (Sanity string / Neon `content_items.owner`) | Who **owns** the content for IP, filtering, and multi-brand surfaces: `vedanshu` \| `wugweb` \| `both` \| `none` |
| **Author** | Editorial field: `author` → reference to `person` | Who **wrote / bylined** the piece (blog post, etc.) |

Rules:

- Never overload `author` to mean ownership.
- Never assume `author.name === owner`.
- A post can be authored by Vedanshu (`person`) while owned by `wugweb`, `vedanshu`, or `both`.
- Presence / assets / clients / case studies get **owner**; posts get **owner + author**.

| Value | Use when |
|---|---|
| `vedanshu` | Personal work only (not under the Wugweb brand) |
| `wugweb` | Agency / studio work only |
| `both` | Shared / dual-brand content (appears in both contexts) |

---

## 3. Masters vs content usage

### Industry (important)

| Layer | Where | Role |
|---|---|---|
| **Industry master** | Global Settings → `industry` docs (from Wugweb Master Taxonomy Table 3) | Controlled vocabulary — name, slug, description, optional `iconPath` |
| **Content industries** | `caseStudy.industryRef`, `client.industry` | **References** to the industry master — do not invent free-text industries when a master exists |

Legacy `caseStudy.industry` (string) is fallback only; prefer `industryRef`.

Same pattern for other masters:

| Master (Global Settings) | Content usage |
|---|---|
| Platforms (`taxonomy` vocabulary `platform`) | Presence `platformRef`; publishing surfaces |
| Tools / tech-stack | Service toolkits, About stack, writeups |
| Tags, asset-type, content-type, dept, country | Content fields / filters as wired |
| Industry (`industry` docs) | Case studies, clients |

### Reference / component enrichment (not fully extracted yet)

`reference/` holds offline HTML/media for the remaining service-page assets (icons, hero images) and `component/` was **fully consumed** (nav → SiteHeader, style JSON → tokens — safe to delete):

- Tool names, usage copy, writeups, and icons
- Additional platforms + media
- Industry / page media, images, videos
- Design tokens / nav states in `component/`

**Rule:** extract by identity (HTML alt/src, page section, writeup adjacency) → upsert masters + assets + path fields. Do **not** blind-dump all hashed Framer files. Prefer enriching existing Global Settings masters and mapping content to them.

---

## 4. What gets an owner

Apply ownership to (at least):

- case studies, posts, clients, assets, presence (`platformProfile`), engagements, pages, services
- taxonomy / masters when brand-specific (most Global Settings masters are shared → prefer `both`)

Clients especially: each client row should declare Wugweb book-of-business, Vedanshu personal, or both.

---

## 5. Data sources — Notion is seed only

**Notion Master Taxonomy / Notion exports are a starting base, not the SSOT.**

Current state (2026-08-04): Sanity ≫ Notion seed. Asset registry + R2 path map live. Presence + Global Settings masters live. Engagement **70** (not empty). Taxonomy **257**. Reference enrichment mostly pending.


1. **Do not wipe or “reset to Notion”** Sanity or Neon.
2. Notion re-fetch = **gap-fill / enrichment**, upsert by stable id — never blind `create()` dumps.
3. Prefer existing Sanity + local `public/assets` + R2; enrich from `reference/` / `component/` when identity is clear.
4. When Notion and Sanity conflict on volume, **Sanity (+ Neon after sync) wins** unless a human says otherwise.

---

## 6. System of record (stack)

| Layer | Role |
|---|---|
| **Neon** | Shared SSOT for structured content (Vedanshu + Wugweb). Every `content_items` row has `owner`. |
| **Sanity** | Admin / editorial CMS. Presence credentials stay Studio-only. Respect Rule 1 (credits). |
| **R2 `wugweb-assets`** | Media bytes (path-mapped). Rule 2 hard ceiling. |
| **Notion** | Historical / operational workspace. Seed + optional enrichment only. |
| **`reference/` + `component/`** | Design/content capture — extract identified tools/platforms/industries/page media into masters + assets. |

Frontend today may still read Sanity CDN; intended end state is Neon reads with ownership filters.

---

## 7. Presence & platforms

- **Platform** = Global Settings master (`taxonomy` vocabulary `platform`).
- **Presence** = owned URL row (`platformProfile`) with `owner` ∈ {vedanshu, wugweb, both, none}.
- Credentials (DP2) may live on Presence in Studio — never on the public site API.

Canonical examples:

- Behance personal: `https://www.behance.net/vedanshu` → owner `vedanshu`
- Dribbble studio: `https://dribbble.com/wugweb` → owner `wugweb`

---

## 8. Other standing rules (from prior sessions)

These live primarily in [`CLAUDE.md`](CLAUDE.md) “Things AI Must Never Change” / Working Agreements — listed here so they are not lost:

| Rule | Source |
|---|---|
| Do not change live colours to pure white (`#f4f4f4` / `#bababa` / `#191919` / `#2b2b2b`) | CLAUDE.md |
| **Never change the aspect ratio of any media.** Images, video and thumbnails scale proportionally only. Never stretch, squash, or grow one axis on hover/expand; if a container must change size, reserve the space and keep `aspect-ratio` fixed. Applies to `object-fit`, hover/expand states, and responsive breakpoints alike. | user, 2026-09-04 |
| Do not lower `.node-version` below 22 | CLAUDE.md |
| Do not remove `blockContent` from Sanity schema types array | CLAUDE.md |
| Keep Cloudflare **Pages** deploy model (`pages_build_output_dir: ./dist`); never switch to Workers-style `main`/`assets` | CLAUDE.md / wrangler |
| Deploy command: `npx wrangler pages deploy dist` (not bare `wrangler deploy`) | CLAUDE.md |
| Keep ownership model (`entities` + `owner`; allow `vedanshu` \| `wugweb` \| `both` \| `none`) | CLAUDE.md + this file |
| Content from hardcoded frontend / user sources — not scraped Framer reference or third-party review sites as SSOT | CLAUDE.md |
| No Hyperdrive / SESSION KV / paid bindings unless user asks | free-tier + deferred list |
| DNS cutover to wugweb.com — out of scope unless asked | pending.md |
| Contact form production 500 — deferred to end | pending.md |
| Sanity credential rotation — only if user asks | pending.md |
| No live Studio dashboard widgets / custom Structure filters that crash Studio | pending.md / admindesign |
| Dual-serve `public/assets` until R2 cutover verified; then `PUBLIC_USE_R2_ASSETS` | docs/r2-assets.md |
| Presence passwords/API keys — Studio only, never public queries | this file |
| Industry master lives in Global Settings; content maps via refs | this file |

---

## 9. Agent / process rules

1. Read `governance.md` + `pending.md` + `CLAUDE.md` at session start when touching content, sync, Neon, R2, or Studio.
2. Obey **Rule 1** and **Rule 2** before any Sanity-heavy or R2-heavy work.
3. Do not change live colour tokens or Wrangler Pages deploy model.
4. Do not lower `.node-version` below 22.
5. Do not import Notion as a full replace of richer Sanity data.
6. When adding Neon-backed content, set `owner` explicitly — defaulting everything to `vedanshu` is **wrong**.
7. Keep Author (`person` ref) and Owner (`vedanshu` \| `wugweb` \| `both` \| `none`) separate.
8. Enrich masters from `reference/` / `component/` by identity — never blind-dump hashed files.
9. Update `pending.md` after significant work; update this file when governance facts change.
10. Never commit secrets (`.env`, tokens, Presence passwords).
11. **Maintain `CHANGELOG.md`**: Every commit MUST update [`CHANGELOG.md`](CHANGELOG.md) to document additions, modifications, and fixes.

---

## 10. Related files

- Tracker: [`pending.md`](pending.md)
- Changelog: [`CHANGELOG.md`](CHANGELOG.md)
- Architecture memory: [`CLAUDE.md`](CLAUDE.md)
- Neon DDL: [`neon/schema.sql`](neon/schema.sql)
- Assets: [`docs/content-assets.md`](docs/content-assets.md), [`docs/r2-assets.md`](docs/r2-assets.md)
- Free-tier Cursor rule: [`.cursor/rules/free-tier-limits.mdc`](.cursor/rules/free-tier-limits.mdc)
- Governance Cursor rule: [`.cursor/rules/governance.mdc`](.cursor/rules/governance.mdc)
