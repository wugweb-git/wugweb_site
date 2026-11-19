# Skill map

Which skills this one works with, what each may do, and what happens when one is missing. This file and `ops-cycle.md` are the only places that name tools and vendors. Every mode can be done by hand from the reference files; no helper is required.

## Permission levels

| Level | Allows | Examples |
|---|---|---|
| Read | Read and measure | The source, the CMS read API, media HEAD and range reads, live pages |
| Propose | Write a draft file or a report | Body proposals, visual-read records, audit reports |
| Write with approval | Write only after the owner approves the exact change, backup first | Source rows, the CMS sync, empty alt fields |
| Owner's go | Run only on the owner's go | Push, deploy, scheduling a post, making one new media file for a form |
| Never | Not allowed | Media upload, local copy, cropping a file, re-encoding; deleting without asking; sound |

Third-party helpers stay at Read and Propose. Only a Wugweb skill writes, and only after the owner's approval. A helper that needs "write" or "go" stops and asks.

## Sibling skills (the Wugweb Skill System)

| Skill | Owns | Install state (checked 2026-11-16; a later change carries its own date) |
|---|---|---|
| `wugweb-voice` | The one Wugweb voice | Installed; uncalibrated until the owner supplies writing samples |
| `wugweb-brand-os` | Identity, positioning, brand rules, Visual OS | Installed |
| `wugweb-kits` | Tokens, the layout shell document, components and the token scan. The block catalogue, the layout grammar and adaptive UX for a piece are held in this skill (`layout-grammar.md`); kits may check the result | Installed as `wugweb-kits`; `ui-system-mapper` is merged into it and retired (owner, 2026-11-17) |
| `wugweb-strategy` | Content strategy, calendar, briefs | Installed |
| `wugweb-seo` | Keyword research, site-wide SEO, AI search, reporting. The on-page limits and the case-study graph are held in this skill (`copy-and-seo.md`, `schema-jsonld.md`); seo may check the page | Installed; one skill with plan, audit and report parts |

Call a sibling by the name that is installed. The links are in `handoffs.md`.

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

Other helpers named in the plan stay and are used when their function comes up: `social-media-skills:before-after-and-transformation`, `social-media-skills:social-proof-and-testimonials`, `social-media-skills:data-and-original-research`, `data:create-viz`, `data:statistical-analysis`, `gsap-react`, `token-mapping-engine`, the Sanity helpers, `full-output-enforcement`, `rampstack-seo:skill-creation-walkthrough`.

Newsletter edition: `social-media-skills:email-and-newsletter` (not yet read) and `marketing:email-sequence`. Advocacy copy: `social-media-skills:linkedin-company-pages`.

Made images, one file on the owner's yes: `html-css-to-image:hcti-open-graph-images` (needs sign-in), `banner-design`, `social-media-skills:image-prompt`. Each is used only in Forms (share image, social cards, Behance and Dribbble covers), never as evidence inside a case study; each file is proposed first (what, size, where it would live), made only after the owner's yes for that file, and kept out of the repository.

Brand.dev (client logo and colours), gated the same way: its values arrive as current → proposed and are never written without approval.

Needs the owner's sign-in before use (2026-11-16): the Sanity plugin, the Cloudflare plugin, Figma, Canva, HTML/CSS to Image, SE Ranking, TinyFish and Website Design. Until then the helpers that depend on them are limited; skip and say so.

## Decision for each helper read (2026-11-16)

The helpers were read so that their useful rules live in this skill in its own words. Nothing is dropped from the list above; this adds a decision. No text was copied. Some long reference folders were not read in full.

**Absorbed** (the rule is restated in this skill): `rampstack-seo`: seo-content-audit, seo-onpage, content-and-copy. `searchfit-seo`: broken-links, seo-audit (finding format only), content-brief (skeleton only), schema-markup and generate-schema (evidence rule only). `seo-skills`: seo-images (record fields only), seo-content-audit (hard stops only). `copywriting-kit`: copy-proof-check, copy-edit, copy-diagnose, landing-page-copy. `marketing`: brand-review (flag list), email-sequence (limits only). `analytics-skills`: metric-context-and-benchmarks. `data`: validate-data, create-viz, data-visualization, statistical-analysis. `design`: design-critique, design-handoff (one rule). `website-design`: landing-page, review-page. `sanity`: content-modeling-best-practices, portable-text-conversion, portable-text-serialization (check only). `social-media-skills`: linkedin-post-writer, carousel-writer, before-after-and-transformation, social-proof-and-testimonials, data-and-original-research, cross-platform-repurposing, caption-writer, infographic-and-data-viz, quote-cards-and-text-graphics, thumbnail-design, image-prompt (gate only), thread-writer, text-post-and-microblog, behind-the-scenes-and-founder, content-research-and-sourcing, educational-content-and-how-to, scheduling-and-queue; story-writer and pinterest-pin-design (specs only, parked). Claude app skills: full-output-enforcement, ui-system-mapper (two rules; merged into `wugweb-kits` and retired), frontend-design (one rule), design-taste-frontend (four rules), web-quality-accessibility (alt and caption), skill-creator, skill-development, pptx (content rules), deep-research (citation rule). `ux-ui-audit` (finding rules). `brightdata-plugin`: scrape (the read check only).

**Optional helper** (may speed a mode up; never required): `rampstack-seo`: seo-keyword, skill-creation-walkthrough. `searchfit-seo`: internal-linking. `seo-skills`: seo-schema, seo-geo, seo-content-brief, seo-sxo. `aeotester`: audit. `cloudflare`: web-perf, wrangler. `design`: accessibility-review, ux-copy. `brand-voice`: brand-voice-enforcement. `marketing`: content-creation. `website-design`: web-review. `ui-ux-pro-max`. `design-qa`. `code-review`. `sanity`: sanity-best-practices. `social-media-skills`: platform-specs-and-validation. `slides`. `banner-design`. `pdf`. `docx`. `xlsx`. `postiz`. `html-css-to-image`: both. Notion: find, database-query. `tinyfish`: tinyfish-web (fetch only).

**No rule absorbed, still used when the function comes up.** The read of 2026-11-16 took no rule from these, and an earlier line here called them ignored. That was wrong: the owner's final list and his own naming keep each one, so none is ignored. Their outputs stay proposals, and anything in the clash table below is declined.

| Helper | Used when |
|---|---|
| `rampstack-seo:seo-aeo-geo`, `searchfit-seo:on-page-seo`, `sanity:seo-aeo-best-practices` | Second opinion on on-page SEO and AI search |
| `rampstack-seo:content-strategy`, `searchfit-seo:content-strategy`, `searchfit-seo:create-topic`, `searchfit-seo:create-content`, `marketing:draft-content` | Second opinion on a brief or a draft. Planning itself stays with `wugweb-strategy` |
| `marketing:campaign-plan` | Multi-workstream and campaign cases |
| `sanity:content-experimentation-best-practices`, `sanity:typegen` | The CMS side of this site, in site build work; advice only |
| `aeo-brand-scan:scan` | After deploy; report only, on the owner's yes |
| `design:design-system` | Look mode, when a client's design system is among the assets |
| `system-design`, `superdesign` | Exploring a new block or form |
| `responsive-token-engine` | Layout and adaptive UX |
| `gsap-react` | Motion reference |
| `web-design-guidelines` | Second opinion at the Ship gate |
| `simplify` | Ship, in site build work |
| `social-media-skills:linkedin-company-pages` | Advocacy copy |
| `musiclinkd-design-system` | MusicLinkd only |

**Ignored** (no function in this skill): `searchfit-seo`: translate-content. `copywriting-kit`: brand-voice. `brand-voice`: guideline-generation. `web-artifacts-builder`. Notion: create-page. `social-media-skills`: hook-writer, storytelling-and-narrative, design-and-templates, canva, youtube-publishing-and-metadata.

**Ignored under the no-sound rule**: the audio and video-making helpers in `social-media-skills`. **Ignored under "existing media only"**: its image-editing and image-generation helpers.

**Never run**: `brightdata-plugin:design-mirror`. It scrapes other sites, restyles the codebase, and its scripts turn off certificate checking.

Not found on disk and not read: `dataviz`, `simplify`.

## Helper register by area

`wugweb-work` is the controlling skill. It owns the workflow and calls a specialist only when the task needs one. It never copies a helper's instructions, and no helper is a fixed step. A helper that can change a site, publish a post, update the CMS or deploy code gets no permission to do so by being listed here: the approval gates in `SKILL.md` stay the rule.

Standing: **dependency** means a mode cannot run without it; **installed capability** means it is on this machine and may be called; **optional integration** means it needs the owner to connect or sign in first. There is no dependency in this register: every mode can be done by hand.

| Area | Helper and source | Used for | Called when | Goes in, comes out | Reads or writes | Sign-in or connection | Overlaps with | Approval | If unavailable |
|---|---|---|---|---|---|---|---|---|---|
| Source of truth | Notion connector | Read the Body Content and the case-study record | Audit, Brief, Body | In: the case-study id. Out: the source text and properties | Reads. Can write | Connected | None | A write only after the owner approves that exact change | The owner pastes the content in |
| Source of truth | Sanity connector and Sanity helpers | Read the CMS copy to compare; modelling advice | Audit; site build work | In: a query. Out: documents | Reads. Can write | Needs sign-in | None | No write from a helper; the sync is the only route, on the owner's go | The public read API |
| Development | Cloudflare helpers | Deploy, performance and platform questions for this site's own host | Ship; after deploy | In: the page URL. Out: findings | Reads. Can deploy | Needs sign-in | None | Deploy only on the owner's go | Checks by hand in the browser |
| Development | `frontend-design` | Building or reshaping a block or a form | Layout, when a new block is needed | In: the block plan and tokens. Out: a proposal | Proposes | None | Website Design (this one supports the build) | The owner approves the proposal | The rules in `layout-grammar.md` |
| Development | Website Design (`website-design`) | Overall page direction and page review | Layout; Ship | In: the page. Out: a review or a direction | Proposes | Its connector needs sign-in; the skills do not | `frontend-design` (this one guides direction) | The owner approves | `design-principles.md` and `qa-checklist.md` |
| Visual review | `ux-ui-audit` | Measured contrast, targets, focus, names, Hick and Fitts indices | Ship | In: the rendered page. Out: measured findings | Reads | None | `design:accessibility-review` | None to run; findings go to the gate table | The manual checks in `qa-checklist.md` |
| Visual review | `superdesign` | Exploring options before a new block or form is built | Layout, on request | In: the brief and tokens. Out: options | Proposes | Not checked | `frontend-design` | The owner picks | Sketch the options by hand |
| Visual review | HTML/CSS to Image (`html-css-to-image`) | A visual preview, or one made file such as a share image | Forms, per file | In: markup. Out: one image | Makes a file | Needs sign-in | `social-media-skills:image-prompt` | A yes for that one file | Propose an existing file |
| Brand and content | Brand Voice (`brand-voice`) | Cross-check of a draft against brand material | Body | In: the draft. Out: voice breaks | Reads | None | `wugweb-voice`, which wins | None to run | The voice check through `wugweb-voice` |
| Brand and content | Website Copywriting and Positioning (`copywriting-kit`) | Claims ledger, diagnosis, edit suggestions | Body | In: the draft and the evidence. Out: a ledger and suggestions | Proposes | None | `rampstack-seo:content-and-copy` | The owner approves the text | `evidence.md` and `copy-and-seo.md` |
| SEO and AEO | `rampstack-seo` | Keyword research, on-page and content audit | Brief, SEO and schema | In: the page or topic. Out: notes and findings | Reads | None | SE Ranking (do not call both for one task) | None to run | `wugweb-seo`, then the rules held here |
| SEO and AEO | SE Ranking (`seo-skills`) | Keyword and ranking data, technical audit | Brief; after deploy | In: the domain or phrase. Out: data | Reads; billed data | Needs sign-in | `rampstack-seo` | The owner's yes before any billed call | Mark search figures "unvalidated" |
| SEO and AEO | AEOTester (`aeotester`) | Audit of how a page reads to AI answers | After deploy | In: the URL. Out: an audit | Reads | None | SearchFit (use one per audit) | None to run | The citability checks by hand |
| SEO and AEO | SearchFit (`searchfit-seo`) | Broken links, schema evidence, brief skeleton | Audit, SEO and schema | In: the page. Out: findings | Reads | None | AEOTester | None to run | `scripts/check-case-page.mjs` |
| SEO and AEO | AEO Brand Scan (`aeo-brand-scan`) | How Wugweb and the client work show up in AI answers | After deploy, report only | In: the brand. Out: a report | Reads; sends data out | None | AEOTester | The owner's yes; private data stays private | Skip and say so |
| Research | TinyFish (`tinyfish`), primary | Website research, extraction and browser workflows | Brief, when outside evidence is needed | In: a URL or question. Out: extracted facts with sources | Reads; billed | Needs sign-in | Bright Data | The owner's yes for each run | Read the page directly; ask the owner |
| Research | Bright Data (`brightdata-plugin`), secondary | Only a capability TinyFish lacks | Brief, rarely | In: a URL or query. Out: data | Reads; billed | Needs its own key | TinyFish | The owner's yes for each run. Never `design-mirror` | Skip and say so |
| Analytics | `analytics-skills` | Framing a baseline or benchmark on a results line; traffic diagnosis | Body, for stats-led cases; after deploy | In: the owner's numbers. Out: framing advice | Reads | None | Data | None; it never supplies a number | The metric rule in `copy-and-seo.md` |
| Analytics | Data (`data`) | Checking the owner's numbers; a chart from them | Body and Forms, for stats-led cases | In: the numbers. Out: a check or a chart spec | Proposes | Warehouse connectors need sign-in | `analytics-skills` | A chart file needs a yes for that file | `forms/charts.md` by hand |
| Social publishing | Social Media Skills (`social-media-skills`) | Platform specs; post and carousel cross-check | Forms | In: the fact pack. Out: a draft or dated specs | Proposes | None | The form files here, which win | The owner's yes per post | The form files in `forms/` |
| Social publishing | Postiz (`postiz`) | Scheduling an approved post | Forms, after approval | In: the approved post. Out: a scheduled draft | Can publish | Installed, not connected to any account | None | A yes for that exact post; nothing is sent alone | Hand the approved draft to the owner |
| Marketing operations | Marketing (`marketing`) | Campaign plan and brand review as a cross-check | Multi-workstream and campaign cases | In: the piece. Out: a review or plan | Proposes | Some connectors need sign-in | `wugweb-strategy`, which owns planning | The owner approves | Skip; planning belongs to `wugweb-strategy` |
| Marketing operations | ActiveCampaign (`activecampaign`) | Sending an approved newsletter; lists | Forms, newsletter, once the tool is decided | In: the approved edition. Out: a draft campaign | Can send | Not configured | None | A yes for that send | Hand the edition to the owner |
| Marketing operations | Leadfeeder (`leadfeeder`) | Which companies read a published piece | After deploy, on request | In: the page. Out: visitor companies | Reads; shows people's details | Needs sign-in | None | The owner's yes; personal data stays private | Skip and say so |
| Hosting | Hostinger connector (`hostinger`) | Hosting and WordPress work for a client on Hostinger | Only when a client environment needs it | In: the client site. Out: changes or an audit | Can change a site | Needs sign-in | None | The owner's yes for each change | Not used for this site |
| Productivity | Productivity (`productivity`) | Task lists and coordination for a piece | Any mode, on request | In: the steps. Out: tasks | Writes its own task file | None | None | None | The owner questions list in the proposal |

Rules for the register:

- **No duplicate calls.** TinyFish and Bright Data overlap: TinyFish is the primary research tool and Bright Data is used only for a capability it lacks. `rampstack-seo` and SE Ranking overlap: one per task. AEOTester and SearchFit overlap in audits: one per audit. Website Design guides direction; `frontend-design` supports the build.
- **Platform helpers are conditional.** Cloudflare is for this site's own host. Hostinger is only for a client on Hostinger. Neither is needed for a piece.
- **Research, recommendation and execution stay apart.** A helper returns facts or a proposal. Only this skill acts, and only after the owner's approval.
- **Not a giant orchestrator.** This skill owns the workflow and hands a specialist one defined job; it never restates a specialist's method.

## Handoff contracts for third-party helpers

Every helper returns a proposal or a report. Only this skill, after the owner's approval, writes anything.

| Helper | Called in mode | Goes in | Comes out | May not do |
|---|---|---|---|---|
| `wugweb-seo` | Brief, SEO and schema, after deploy | Topic, client, audience; later the rendered page URL | Keyword and intent notes for the brief; an issue list for the page; a traffic note after launch | Write case-study copy; add FAQPage on a case study, HowTo or `llms.txt`; change titles in Notion |
| Copy helpers (`content-and-copy`, `copy-proof-check`, `copy-edit`, `ux-copy`) | Body | Draft text plus the owner's evidence | Claims ledger, edit suggestions, caption and alt drafts | Add a fact or number; write to Notion |
| Voice helpers (`brand-voice-enforcement`, `brand-review`) | Body | Draft text and the brand guidelines | A list of voice breaks with fixes | Change the meaning; override the writing rules in `copy-and-seo.md` |
| Design review (`design-critique`, `ux-ui-audit`, `design-qa`, the accessibility helpers) | Look, Ship | Asset URLs or the rendered page | Findings with measured values | Change code; store screenshots as files |
| Layout helpers (`frontend-design`, `design-taste-frontend`, `superdesign`, `responsive-token-engine`) | Layout | The block plan, the tokens, the layout shell | Layout options, as proposals | Add hardcoded values; add a block type outside the catalogue |
| `wugweb-kits` (includes ui-system-mapper) | Ship, on request | The case-study components and tokens | Findings by rule id | Delete tokens or refactor without the owner's yes |
| Schema helpers (`generate-schema`, `schema-markup`, `seo-schema`) | SEO and schema | Approved body, page facts | A JSON-LD draft | Emit `author`, FAQPage on a case study, HowTo or Review stars |
| Sanity helpers | Site build work only | The schema file | Modelling advice | Deploy the Studio; write documents |
| Forms helpers (`slides`, `pptx`, `pdf`, the social writers, `postiz`, `dataviz`) | Forms | Approved body and media URLs | The other form, as a draft | Publish or schedule without the owner's yes; invent facts |
| Media-making helpers (share image, banner, image prompt) | Forms | A request approved for that one file | One file, proposed first | Run without a yes for that file; place a file in the repository |

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
| `design` (the owner's own skill; not read by this session, reported by `wugweb-voice`) | Slide copy formulas with empty number slots | No number without a source |

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
| Generated FAQ schema and `llms.txt` outputs of any SEO helper | Conflict with the owner's rules; other checks from the same helper may be used |

## Fallbacks

| Problem | What happens |
|---|---|
| A helper or sibling is missing or signed out | Skip it, name it in the output, use the own procedure or the held file |
| Scripts cannot run | Apply the same checks by reading; label the result a manual check |
| The source cannot be read (for example a rejected token) | Stop any sync; audit from the CMS copy; ask the owner |
| A page cannot be reached | Report the URL and status; audit from the body and manifest |
| A file cannot be opened for the visual read | Write no caption or alt for it; list it as "not seen" |
| A number has no source | Cut it or mark it "unvalidated" |
| An answer conflicts with the owner's rules | Record it and decline it (see `handoffs.md`) |

## What works only in some agents

- The Look mode needs a model that can open images and reach the media URLs. A text-only tool cannot do it.
- Stepping through video frames uses a browser the agent can drive.
- The eval loop and the helpers above are Claude tooling.
- Access to the source, the CMS and the scheduling tool runs through connectors; another tool needs its own access or a person to paste the content in.

## Libraries this skill runs itself (this site)

Free, no account, development dependencies only; the live site does not load them.

| Library | Used for | By |
|---|---|---|
| Playwright | Rendering a page at every gate width, the states with JavaScript off and reduced motion, reading a client's stylesheet, rendering made graphics | The render review, the brand read and the graphics command in `ops-cycle.md` |
| axe-core | Measured contrast and the other machine-checkable accessibility rules | The render review |

With these the skill needs no outside helper and no sign-in to look at a page, read a brand or draw a graphic. An image model is never used to make a graphic.

## Gaps with no helper

- Stepping through video frame by frame: the procedure in `visual-read.md`.
- Comparing a Behance or Dribbble version against the case study: `forms/presence-compare.md`.
