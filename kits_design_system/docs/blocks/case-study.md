# Case Study

**Status:** built (resolver, components, preview route), awaiting owner review on previews · **Last verified:** 2026-11-19
**Source:** `src/components/work/*.astro`, `src/lib/case-layout.ts` · story none (Storybook does not read Sanity)

The case-study page system: a resolver that turns the parsed body and the media manifest into a block plan, 18 components that render the plan, and a thin page template that fetches, parses, resolves and renders. The live `/work/<slug>` route keeps the legacy template until the owner approves previews.

---

## 1. Content

Case-study content is the Notion Body Content (owner decision 2026-11-14). Media is in R2 under `assets/work/<slug>/`. The page reads:

| Source | What it carries |
|---|---|
| Sanity `caseStudy` doc | title, shortTitle, subtitle, summary, seoTitle, seoDescription, coverPath, thumbnailPath, industry, services, tags, timeline, team |
| Parsed body (`src/lib/case-body.ts`) | sections (chapter, lead, paras, tiles, media, styles, quotes, tables, milestones, layoutHint), closing media, results, links, accent |
| Media manifest (optional) | status, dupOf, audience, flow, step, posterAt, heroScore, alt, caption per URL |
| Related | the 3 most recent other case studies in the same industry (interim: no `relatedCaseStudies` field yet; step 4 adds it) |

The resolver never invents fact or media. Missing fields render as missing.

## 2. Anatomy

```
section.case-page[aria-label="Case study"]
├ CaseHero                        header.case-hero
├ CaseSummary (inline)            p.case-summary
├ CaseStats (stats variant)       section.case-stats
├ article.case-chapter-wrap#<slug>
│  ├ CaseChapter                  article.case-chapter
│  ├ CasePoints                   ul.case-points
│  ├ CaseQuote                    figure.case-quote
│  ├ CaseTable                    div.case-table-wrap
│  ├ CaseTimeline                 ol.case-timeline
│  ├ CaseLoop                     figure.case-loop
│  ├ CaseVideo                    figure.case-video
│  ├ CaseFigure (scrollshot)      figure.case-figure--tall
│  ├ CaseSplit                    div.case-split
│  ├ CaseMosaic                   div.case-mosaic
│  ├ CaseWall                     div.case-wall
│  ├ CaseFigure                   figure.case-figure
│  ├ CaseRail                     section.case-rail
│  └ CasePair                     div.case-pair
├ section.case-screens            (All screens: set chips with counts, one set of thumbnails at a time, viewer on a thumbnail)
├ CaseStats (results variant)     section.case-stats
├ CaseCredits                     section.case-credits
├ CasePresence                    section.case-presence
├ CaseRelated (related)           section.case-related
└ CaseRelated (next)              section.case-related--next
```

Chapter blocks group under an `<article>` with the chapter's slug id. Non-chapter blocks sit as siblings outside any chapter. Chapters use `scroll-margin-top: var(--header-height)` so a jump link lands clear of the sticky header.

## 3. Block catalogue (23 types, resolved by `src/lib/case-layout.ts`)

`hero`, `summary`, `stats`, `chapter`, `points`, `figure`, `split`, `pair`, `rail`, `mosaic`, `wall`, `scrollshot`, `loop`, `video`, `quote`, `table`, `timeline`, `results`, `screens`, `credits`, `presence`, `related`, `next`.

Component mapping:

| Block | Component |
|---|---|
| hero | `CaseHero` |
| summary | inline `<p class="case-summary">` in `CaseBlocks` |
| stats, results | `CaseStats` |
| chapter | `CaseChapter` |
| points | `CasePoints` |
| figure, scrollshot | `CaseFigure` |
| split | `CaseSplit` |
| pair | `CasePair` |
| rail | `CaseRail` |
| screens | `CaseScreens` |
| mosaic | `CaseMosaic` |
| wall | `CaseWall` |
| loop | `CaseLoop` |
| video | `CaseVideo` |
| quote | `CaseQuote` |
| table | `CaseTable` |
| timeline | `CaseTimeline` |
| credits | `CaseCredits` |
| presence | `CasePresence` |
| related, next | `CaseRelated` |

## 4. Rules

- Deterministic resolver. Same body + manifest + doc, same block plan.
- Skip manifest entries with `status != 200` or `dupOf` set.
- Rail caps at 8 items per flow.
- Styles pair is 50:50. A file shown above its natural size is flagged, not banned (owner decision, 2026-11-16).
- A video over 15 s never loops in a rail: it is a muted click-to-play video in its own chapter.
- No sound anywhere. Every `<video>` renders `muted`; a long video gets a play or pause button only (owner decision, 2026-11-11).
- No em or en dashes in text output (owner rule).
- Tokens only. Every CSS selector in `src/components/work/*.astro` starts `.case-*`; the `scripts/check-case-css.mjs` guard enforces this.
- Alt text precedence: `altFor(altMap, url, generatedAlt)`. An owner-edited `asset.alt` always wins.

## 5. Tiers and states

| Tier | Description |
|---|---|
| Full body | Hero, summary, stats, body chapters, All screens, results, credits, presence, related. The common shape. |
| No body (noIndex) | Hero (title, brand, SEO description only) + related. The 7 stubs without a body stay `noIndex`. |
| Legacy (v1 body) | The parser keeps the v1 branch; bodies that have not been converted to v2 still render. |

States handled by the resolver, not by markup:

- Dead URLs and duplicates: dropped before rendering.
- Audiences and flows: the All screens block groups by `audience` then `flow`, ordered by `step`.
- All screens (`CaseScreens`): one chip per set with its count, one set shown at a time. A set is named by the manifest's `set` when it has one, else by its flow when the audience has more than one, else by its audience; with no manifest, by the kind the body label gives. Sets keep the order in which the body first shows them. Thumbnails keep their own ratio: phone sets 3, 5 and 8 across at 375, 768 and 1200; wide sets 1 (2 from 480), 3 and 4.
- With JavaScript off, every set is stacked under its own heading and each thumbnail is a plain link to the full image.
- The viewer shows one screen with its caption and its position as "3 of 8, Member". Previous and next stay inside the set. The back action closes it, focus returns to the thumbnail, and each thumbnail's id is a deep link that opens the viewer at that screen.
- Accent: body's `accent:` or the doc's `accent` field, applied through `style="--case-accent: ..."` at render.

## 6. Accessibility

- Exactly one `<h1>` per page (hero title).
- Heading levels never skip. H2s are chapter titles, H3s are inside blocks (rail flow name, section heads).
- Every `<section>` has an id and an accessible name.
- Every chapter `<article>` has a unique id and an h2; `scroll-margin-top: var(--header-height)` on each.
- Every `<img>` has alt, width and height. Covers decode without layout shift.
- Rails are `role="region"` with `aria-roledescription="carousel"`, prev / next buttons, a live counter, keyboard support (ArrowLeft / ArrowRight / Home / End). No auto-advance.
- Long videos: `controls`, `muted`, not `aria-hidden`.
- Loops: `muted`, `playsinline`, `autoplay`, `loop`, `aria-hidden="true"`.
- Lightbox is a `<dialog>` opened with `showModal()`: Esc and focus trap are native.

## 7. Gate (preview)

`scripts/check-case-page.mjs <url>` runs the page gate. Checks: one h1; heading levels; section id + accessible name; chapter article id uniqueness + h2; img alt + width + height; no em or en dashes in text; rails aria and buttons; loops muted + playsinline + aria-hidden; long videos muted + controls + not aria-hidden; every media URL returns 200 (HEAD); total media bytes under 25 MB; title ≤ 60; meta description 140 to 160; canonical self; JSON-LD WebPage + CreativeWork + BreadcrumbList (only when `--host` is passed, for the canonical origin).

JSON-LD check is reported `n/a` on hosts other than the canonical; use `npm run preview` on port 8788 with `--host www.wugweb.com` for the full gate. The CSS guard `scripts/check-case-css.mjs` runs in `prebuild` and keeps `.case-*` selectors inside `src/components/work/*.astro`.

## 8. Not in scope here

Body parsing: `src/lib/case-body.ts` and its tests. Media manifest: `scripts/lib/media-manifest.mjs` (read-only dry run, step 3 of Part 2). Sanity schema fields for the manifest and extended results: step 4 of Part 2, blocked on a new `NOTION_TOKEN`.
