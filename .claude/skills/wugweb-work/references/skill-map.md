# Skill map

Which skills this one works with, what each may do, and what happens when one is missing. This file and `ops-cycle.md` are the only places that name tools and vendors. Every mode can be done by hand from the reference files; no helper is required.

## Permission levels

| Level | Allows | Examples |
|---|---|---|
| Read | Read and measure | The source, the CMS read API, media HEAD and range reads, live pages |
| Propose | Write a draft file or a report | Body proposals, visual-read records, audit reports |
| Write with approval | Done by `wugweb-engineer`, never by this skill: only after the owner approves the exact change, backup first | Source rows, the CMS sync, empty alt fields |
| Owner's go | Run only on the owner's go | Push, deploy, scheduling a post, making one new media file for a form |
| Never | Not allowed | Media upload, local copy, cropping a file, re-encoding; deleting without asking; sound |

Third-party helpers stay at Read and Propose. This skill writes draft and proposal files only. Stored data is changed only by `wugweb-engineer`, and only after the owner's approval. A helper that needs "write" or "go" stops and asks.

## Sibling skills (the Wugweb Skill System)

| Skill | Owns | Install state on 2026-11-19 |
|---|---|---|
| `wugweb-voice` | The one Wugweb voice | Installed; uncalibrated until the owner supplies writing samples |
| `wugweb-brand-os` | Identity, positioning, brand rules, Visual OS | Installed |
| `wugweb-kits` | Tokens, layout shell, components, blocks, adaptive UX, accessibility | Installed as `wugweb-kits`; `ui-system-mapper` is merged into it and retired (owner, 2026-11-17) |
| `wugweb-strategy` | Content strategy, calendar, briefs | Installed |
| `wugweb-seo` | Keywords, on-page rules, schema, AI search, reporting | Installed; one skill with plan, audit and report parts |
| `wugweb-engineer` | Changes to Sanity and Notion data, their backups and undo, Sanity schema edits, running the Notion to Sanity sync scripts, read-only R2 listing | Installed, 0.3.1 (the seventh skill, 2026-11-19) |

There are seven skills in the system: this one and six siblings, all installed. Each sibling owns its rules and wins. Call a sibling by the name that is installed. The links are in `handoffs.md`.

## Helpers: the owner's final list (2026-11-16)

Nothing is dropped. Where two helpers disagree, the lead wins. Where a helper disagrees with the owner's rules, the owner's rules win.

### Core: used on every case study (22)

| Function | Own procedure | Lead helpers |
|---|---|---|
| Building this skill | `scripts/validate.mjs`, `scripts/test.mjs`, `scripts/build.mjs` | `skill-creator`, `skill-development` |
| Audit | `scripts/case-audit.mjs`, `scripts/check-case-page.mjs` | `rampstack-seo:seo-content-audit`, `ux-ui-audit`, `searchfit-seo:broken-links` |
| Brief | The template in `copy-and-seo.md`, `handoffs.md` | `searchfit-seo:content-brief`, `rampstack-seo:seo-keyword`, `wugweb-seo` |
| Look | `visual-read.md`, `design-principles.md` | `design:design-critique`, `ui-ux-pro-max` |
| Body | `body-content-standard.md`, `copy-and-seo.md` | `rampstack-seo:content-and-copy`, `copywriting-kit:copy-proof-check`, `copywriting-kit:copy-edit`, `design:ux-copy`, `brand-voice:brand-voice-enforcement` |
| Layout and adaptive UX | `layout-grammar.md` | `frontend-design`, `design-taste-frontend`, `responsive-token-engine` |
| SEO and schema | `schema-jsonld.md` | `searchfit-seo:generate-schema`, `rampstack-seo:seo-onpage` |
| Ship | `qa-checklist.md` | `design-qa`, `design:accessibility-review` |

### Situational: only when the piece needs it (19)

| When | Helpers |
|---|---|
| MusicLinkd only | `musiclinkd-design-system` |
| Stats-led cases | `analytics-skills:metric-context-and-benchmarks`, `data:validate-data`, `dataviz` |
| Multi-workstream or campaign cases | `marketing:campaign-plan` |
| Exploring a new block or form | `superdesign`, `system-design` |
| Deck or PDF version | `slides`, `pptx`, `pdf` |
| LinkedIn and social versions | `social-media-skills:linkedin-post-writer`, `social-media-skills:carousel-writer`, `social-media-skills:platform-specs-and-validation`, `postiz` (each post needs the owner's yes) |
| After deploy | `aeotester:audit`, `aeo-brand-scan:scan`, `cloudflare:web-perf` |
| Site build work | `code-review`, `sanity:content-modeling-best-practices` |

### Second opinion: used to cross-check the lead (17)

| Cross-checks | Helpers |
|---|---|
| Schema | `searchfit-seo:schema-markup`, `seo-skills:seo-schema` |
| On-page SEO and AI search | `searchfit-seo:on-page-seo`, `seo-skills:seo-geo`, `rampstack-seo:seo-aeo-geo`, `sanity:seo-aeo-best-practices`, `searchfit-seo:seo-check`, `seo-skills:seo-images` |
| Brief and drafting | `searchfit-seo:content-strategy`, `searchfit-seo:create-topic`, `searchfit-seo:create-content`, `marketing:draft-content` |
| Copy and voice | `copywriting-kit:copy-diagnose`, `marketing:brand-review` |
| Accessibility and page review | `web-quality-accessibility`, `web-design-guidelines`, `website-design:review-page` |

Other helpers named in the plan stay and are used when their function comes up: `social-media-skills:before-after-and-transformation`, `social-media-skills:social-proof-and-testimonials`, `social-media-skills:data-and-original-research`, `data:create-viz`, `data:statistical-analysis`, `gsap-react`, `token-mapping-engine`, the Sanity helpers, `full-output-enforcement`.

Made images, one file on the owner's yes: `html-css-to-image:hcti-open-graph-images` (needs sign-in), `social-media-skills:image-prompt`.

## Decision for each helper read (2026-11-16)

The helpers were read so that their useful rules live in this skill in its own words. Nothing is dropped from the list above; this adds a decision. No text was copied. Some long reference folders were not read in full.

**Absorbed** (the rule is restated in this skill): `rampstack-seo`: seo-content-audit, seo-onpage, content-and-copy. `searchfit-seo`: broken-links, seo-audit (finding format only), content-brief (skeleton only), schema-markup and generate-schema (evidence rule only). `seo-skills`: seo-images (record fields only), seo-content-audit (hard stops only). `copywriting-kit`: copy-proof-check, copy-edit, copy-diagnose, landing-page-copy. `marketing`: brand-review (flag list), email-sequence (limits only). `analytics-skills`: metric-context-and-benchmarks. `data`: validate-data, create-viz, data-visualization, statistical-analysis. `design`: design-critique, design-handoff (one rule). `website-design`: landing-page, review-page. `sanity`: content-modeling-best-practices, portable-text-conversion, portable-text-serialization (check only). `social-media-skills`: linkedin-post-writer, carousel-writer, before-after-and-transformation, social-proof-and-testimonials, data-and-original-research, cross-platform-repurposing, caption-writer, infographic-and-data-viz, quote-cards-and-text-graphics, thumbnail-design, image-prompt (gate only), thread-writer, text-post-and-microblog, behind-the-scenes-and-founder, content-research-and-sourcing, educational-content-and-how-to, scheduling-and-queue; story-writer and pinterest-pin-design (specs only, parked). Claude app skills: full-output-enforcement, ui-system-mapper (two rules; merged into `wugweb-kits` and retired), frontend-design (one rule), design-taste-frontend (four rules), web-quality-accessibility (alt and caption), skill-creator, skill-development, pptx (content rules), deep-research (citation rule). `ux-ui-audit` (finding rules). `brightdata-plugin`: scrape (the read check only).

**Optional helper** (may speed a mode up; never required): `rampstack-seo`: seo-keyword, skill-creation-walkthrough. `searchfit-seo`: internal-linking. `seo-skills`: seo-schema, seo-geo, seo-content-brief, seo-sxo. `aeotester`: audit. `cloudflare`: web-perf, wrangler. `design`: accessibility-review, ux-copy. `brand-voice`: brand-voice-enforcement. `marketing`: content-creation. `website-design`: web-review. `ui-ux-pro-max`. `design-qa`. `code-review`. `sanity`: sanity-best-practices. `social-media-skills`: platform-specs-and-validation. `slides`. `banner-design`. `pdf`. `docx`. `xlsx`. `postiz`. `html-css-to-image`: both. Notion: find, database-query. `tinyfish`: tinyfish-web (fetch only).

**Ignored**: `rampstack-seo`: seo-aeo-geo, content-strategy. `searchfit-seo`: content-strategy, create-topic, create-content, on-page-seo, translate-content. `sanity`: seo-aeo-best-practices, content-experimentation-best-practices, typegen. `marketing`: campaign-plan, draft-content. `aeo-brand-scan`: scan. `copywriting-kit`: brand-voice. `brand-voice`: guideline-generation. `design`: design-system. `system-design`. `responsive-token-engine`. `gsap-react`. `web-design-guidelines`. `web-artifacts-builder`. `superdesign`. `simplify`. Notion: create-page. `social-media-skills`: hook-writer, storytelling-and-narrative, design-and-templates, linkedin-company-pages, canva, youtube-publishing-and-metadata. `musiclinkd-design-system` stays as the MusicLinkd-only helper.

**Ignored under the no-sound rule**: the audio and video-making helpers in `social-media-skills`. **Ignored under "existing media only"**: its image-editing and image-generation helpers.

**Never run**: `brightdata-plugin:design-mirror`. It scrapes other sites, restyles the codebase, and its scripts turn off certificate checking.

Not found on disk and not read: `dataviz`, `simplify`.

## Clashes with the owner's rules (the owner's rule wins in each)

| Helpers | What they suggest | Owner's rule that wins |
|---|---|---|
| Several SEO helpers, `website-design:landing-page`, `marketing:draft-content` | FAQ blocks written for search, HowTo schema, `llms.txt`, question headings | None of these; FAQPage only from the owner's `faqs` field with every answer visible |
| `searchfit-seo`: content-brief, create-content, on-page-seo | Keyword counts and a minimum number of links | No keyword counts |
| `searchfit-seo:seo-audit`, `seo-skills:seo-content-audit`, `copywriting-kit:copy-diagnose` | 0 to 100 or percentage scores | Every number is computed from something real |
| `rampstack-seo:seo-content-audit`, `searchfit-seo:broken-links` | Redirects as the fix | No redirects; fix the link |
| `seo-skills:seo-images`, `cloudflare:web-perf` | Convert or compress images | No re-encoding |
| `design-taste-frontend`, `superdesign`, `banner-design`, `canva`, image-prompt, the `html-css-to-image` helpers | Generated or placeholder images, third-party logos, uploads | Existing client media only; a made file needs a yes for that file |
| `design-qa` | Stored screenshot baselines | No stored screenshot files |
| The social writers, `marketing:content-creation` | Hashtag sets, comment-bait closers, curiosity-gap openers, hooks with made-up statistics | No hashtag stuffing, no bait, no invented numbers |
| story-writer, pinterest-pin-design, `canva` | Formats that need crops or new rasters | No cropping; existing media must already fit |
| `postiz`, `canva`, `docx` | Upload media or make local copies | No uploads, no local copies |
| Notion: create-page, `sanity:portable-text-conversion`, `code-review` | Write to the source or the CMS, or post comments | Nothing written without approval of that exact change |
| `tinyfish`, `brightdata-plugin`, paid data in `seo-skills`, `aeo-brand-scan` | Billed services, or data sent to a third party | Free tier only; private data stays private |
| `frontend-design` | Invents copy when the brief has none | Never invent; ask |
| scheduling-and-queue, platform-specs-and-validation | One approval per batch; uploading media | A yes per post; no uploads |

## Names on the list that were not found installed (checked 2026-11-16)

These are facts for the owner to settle, not changes to the list.

| Name on the list | Seen in the session | Used meanwhile |
|---|---|---|
| `slides` | Not listed as a skill | The slides tool of the agent in use, or `pptx` |
| `aeo-brand-scan:scan` | Listed as `aeo-brand-scan:aeo-brand-scan` | That name |
| `sanity:*` | Listed as `sanity-plugin:*` | That name |

Plugin helpers are listed in the session but have not each been run. Helpers that need the owner to sign in are limited until then.

## Do not use for this work

| Helper | Why |
|---|---|
| `brand-guidelines` (Anthropic) | Applies another company's brand |
| `algorithmic-art`, `theme-factory` | Adds invented visuals; evidence is real work only |
| `wp-dev-skills:*` | WordPress; this site is not WordPress. Kept installed for other work |
| `compliance-check`, `compliance-tracking` | Regulatory frameworks, not content or design |
| Web scraping helpers (Bright Data, TinyFish) | Kept out by the owner |
| Generated FAQ schema and `llms.txt` outputs of any SEO helper | Conflict with the owner's rules; other checks from the same helper may be used |

## Fallbacks

| Problem | What happens |
|---|---|
| A helper is missing or signed out, or a sibling cannot be reached in the tool in use | Skip it, name it in the output, use the own procedure or the held file. Without `wugweb-engineer`, no stored data changes |
| Scripts cannot run | Apply the same checks by reading; label the result a manual check |
| The source cannot be read (for example a rejected token) | Ask for no sync; audit from the CMS copy; tell the owner and `wugweb-engineer` |
| A page cannot be reached | Report the URL and status; audit from the body and manifest |
| A file cannot be opened for the visual read | Write no caption or alt for it; list it as "not seen" |
| A number has no source | Cut it or mark it "unvalidated" |
| An answer conflicts with the owner's rules | Record it and decline it (see `handoffs.md`) |

## What works only in some agents

- The Look mode needs a model that can open images and reach the media URLs. A text-only tool cannot do it.
- Stepping through video frames uses a browser the agent can drive.
- The eval loop and the helpers above are Claude tooling.
- Access to the source, the CMS and the scheduling tool runs through connectors; another tool needs its own access or a person to paste the content in.

## Gaps with no helper

- Stepping through video frame by frame: the procedure in `visual-read.md`.
- Comparing a Behance or Dribbble version against the case study: `forms/presence-compare.md`.
