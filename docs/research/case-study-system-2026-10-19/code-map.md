> Research for the wugweb-work skill plan, run 2026-10-19 (read-only). The plan itself is on Notion: https://app.notion.com/p/415bb710b9ab818b8057cc9b2c2ed922

# Codebase map

I finished the read-only exploration and wrote nothing to disk. Everything below comes from the repo plus read-only queries against the public Sanity CDN and HEAD/range requests on R2.

# Case-study template and skill: codebase map

## 0. Read these first

1. **The body parser breaks 18 of the 37 live bodies.** I ran `parseCaseBody()` in memory on every published `bodyMarkdown`.
   - **15 short-format bodies** put a tab before their later headings (`\t### **Solutions**`). `sections()` matches `/^###\s+(.*)$/` against the untrimmed line, so it misses them (`case-body.ts:102`). Solutions, Impact and Insights all fold into one "Challenges" section. Literal `### **Solutions**` text then shows up as paragraphs in the `.b-head` tile, 3 per page. Affected: labelly, linkedin, stayweb, eekenlife, global-trade-finance, ikan, itc, nsl, rak-sme, unified-hrms, wave-group, witty-vegan, woodkraft, wugweb-kits, wugweb-revamp.
   - **3 more** (adtech-and-imedia, sbs-transit, suzlon) use two-line list items: `- **Title**`, then a tab-indented description on the next line. These become 17 tiles holding only a bold title, plus 17 descriptions that land in the head tile as separate paragraphs.
2. **The content falls into three groups (44 published, all self-canonical).**
   - **7 have no body.** All are `noIndex` and render the legacy fallback: bodyshop, eastman, hyatt, musiclinkd, pharmadropper, spark-logistics, thebizgift.
   - **19 are rich** (body 9k to 15k characters).
     - Media: 20 to 59 media lines, 2 to 6 videos, extraMedia 0 to 43.
     - Sections: they carry `## Media`, `## Sanity site copy` and `## Gallery (site assets)`.
     - Images: body media is almost all landscape (140 of 144 sampled). extraMedia is mixed (144 landscape, 72 portrait phone screens, 17 square).
     - Phone-heavy cases: indusninja (14/14 portrait), inkompass (13/14), cartier (10/14), ntuc (9/14), rideev (8/14).
   - **18 are short and text-only** (1.8k to 2.8k characters): no media, no extraMedia, no logo.
   - **22 of 44 have no hero image at all.**
3. **The global section rule stacks padding on every bento section.** `global.css:1222`:
   ```css
   section:not(section section):not(.global-final-cta) { padding-block: var(--section-y) !important; ... }
   ```
   Each `<section class="bento">` sits in a `<div>`, so it counts as top-level. With `.bento-body`'s `gap: var(--space-section-sm)` added, sections end up about 288px apart on desktop (144px on mobile).
4. **Media is heavy and has no responsive variants.**
   - The page loads raw R2 originals with no srcset or width/height. Common sizes are 4500x3000 and 6000x4500.
   - Inkompass references 68.7 MB of images and 19.1 MB of video. The largest single image is 5.3 MB.
   - Body-path videos never get a `poster`. Only 56 of 78 case-study videos have a `-poster.webp` sibling on R2.
5. **No project skill exists.** There is no `.claude/skills/` or `.claude/commands/`. The new skill would live at `/Users/abcom/Documents/GitHub/wugweb_site/.claude/skills/<name>/SKILL.md`. `.claude/` is tracked (`.claude/launch.json` is committed). Only `settings.local.json` and `worktrees/` are ignored.
6. **Owner rules in project memory limit the plan** (§8.3): body-only case studies, Notion is the source, media only in R2 with no uploads or derivatives, no em or en dashes in visible copy, and a Wugweb commit trailer.
7. **The design docs have drifted from the code.** `src/styles/global.css` and `scroll-animations.ts` are the authority. The drift is listed in §4.3.

---

## 1. `src/pages/work/[slug].astro` (913 lines)

### 1.1 Frontmatter (lines 1–151)
- **Imports (2–8):** `BaseLayout`, `PortableTextRenderer`, `sanityClient`/`urlFor`/`getPreviewClient`, `caseStudyBySlugQuery`, `assetUrl`/`posterFor`, `loadAssetAlts`/`altFor`, `parseCaseBody`/`inline`.
- **Preview (15–17):** `Astro.locals.previewToken` selects `getPreviewClient(token)`.
- **404 (19–23):** a missing doc returns `Astro.rewrite('/404')`. The comment says one slug per case study, with no legacy slugs or redirects.
- **Stub redirect (27–29):** if `work.canonicalUrl !== /work/${slug}`, the page returns a 301 to it.
- **SEO (40–41):**
  - `pageTitle = work.seoTitle || work.title`
  - `pageDescription = (seoDescription || summary || about).slice(0,160)`
- **og:image (56–68):** checked in this order:
  1. `ogImagePath` through `assetUrl`
  2. a string `ogImage`
  3. an `ogImage.asset` object through `urlFor(...).width(1200).height(630)`
  4. `coverPath`, only if it matches `IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i`
- **JSON-LD (72–93):**
  - `breadcrumbNode`: Home, then Work, then `shortTitle: title`.
  - `caseStudyNode` (`@type: 'CreativeWork'`) sets:
    - text: `name`, `headline`, `description` (first 300 characters), `image`, `keywords` (`work.tags`)
    - people: `author` (`#founder`), `creator` and `publisher` (`#organization`)
    - other: `about` (the `work.industry` string), `datePublished` (raw `publishedAt`), `mainEntityOfPage`
  - The node has no `@id`, `dateModified`, `inLanguage` or `isPartOf`.
- **Client and brand (94–97):**
  - `clientLogoSrc` comes from `clientRef.logoPath`.
  - `brandLabel = shortTitle || clientRef.name || client`.
- **Body (101–108):**
  - `body = parseCaseBody(work.bodyMarkdown)`
  - `heroSubtitle = body?.subtitle || work.subtitle`
  - `heroTags`: body tags, else `work.tags`
  - `heroCover = body?.cover?.url || coverSrc`
  - `heroCoverIsVideo`
  - `extraMedia: string[]`
- **Dead code:** `cols` (109) is unused. `accentMap` (131–136) and `approachMedia*` (119–121) serve only the fallback.
- **Related work (138–150):** an unordered query fetches all slugs, keeps the first 2 that are not the current page, then fetches each one separately (two extra round trips, uncached). In practice nearly every page shows the same two: Kia (accelerating-loyalty) and adtech-and-imedia.

### 1.2 Render order
1. **BaseLayout call (153):**
   - `title={`${work.title} — Wugweb Work`}`. This only feeds `<main aria-label>` and contains an em dash.
   - Also passed: `seoTitle={pageTitle}`, `ogImage`, `ogTitle`, `ogDescription`, `noIndex`, `jsonLd=[caseStudyNode, breadcrumbNode]`.
   - No `canonicalPath`, so the canonical is self. No `hideGlobal*` props.
2. **Hero, `section.work-detail-hero#work-detail-hero` (154–193):**
   - `p.eyebrow` holds the brand, then `h1#work-detail-hero-title`, `p.work-subtitle` and `.work-tags` (`span.u-tag`).
   - With a body: `dl.work-meta` repeats `body.meta`. The `Client` row prepends `img.work-client-logo` (`alt=""`, eager).
   - Without a body: a hardcoded `div.work-meta` (Client/Brand, Partnered by, Timeline, Disciplines, Industry, Team; `'—'` fallback).
3. **Cover, `section.wrap.section.work-cover#work-cover[data-reveal]` (195–203):**
   - A video renders as `<video src autoplay muted loop playsinline preload="metadata">` with no poster.
   - An image renders as `<img loading="eager" decoding="async">`, without `fetchpriority` or width/height.
4. **Body path, `div.bento-body.wrap#case-study` (205–272):** detailed in §1.3.
5. **Fallback, `{!body && …}` (288–405):** `section.case-shell.wrap#case-study` then `.case-content` (720px column).
   - **Nested sections:** `#about`, `#problem` (`.case-list`, `--rule-color` orange), `#approach` (`.case-bento` text tiles with gallery image #1 after the second tile), `#outcome` (`.case-stat-row` from `results` plus `.case-list` green), `#thesis` (`designPhilosophy` split on `:` into blockquotes), `#details` (`PortableTextRenderer` for `bodyContent`, only when no structured fields exist).
   - **Gallery:** `section#gallery.case-gallery-section`, with `posterFor()` on videos and `altFor()` on images.
6. **More cases, `section.more-cases-section#more-cases-section` (407–435):**
   - Header: `h2` "More Case Studies" and `a.btn.btn-ghost` to `/work`.
   - `.more-grid` holds `a.more-card` items with a cover or thumbnail (video uses `data-src` plus `posterFor`).
7. **After the page:** BaseLayout renders the global `SectorShowcase`, `InsightsBlock` and yellow `FooterCTA`.
8. **Missing:** there is no next-project link and no in-page CTA.

### 1.3 Body path detail (205–272)
- **Per section** (`body.sections.map`): `<section class="bento" aria-labelledby="b-h-{si}">`.
- **Interleaving:**
  - Images come from `s.media` filtered to non-video.
  - For each tile, if its index is even and images remain, an image goes in before the point.
  - Leftover images go at the end. Videos go last as `.b-video`.
- **`.b-head`:** gets `.b-head--solo` when there are no items. It holds an `h2` plus lead and paragraphs through `set:html={inline(...)}`.
- **`.b-styles`:** images with alt `${brandLabel}: ${label}`.
- **Media:** `figure.b-media[data-shape="landscape"] > img` (lazy), alt `${brandLabel}: ${label}` or `${brandLabel} case study image`.
- **Points:** `.b-point` adds `.b-point--long` when the text is over 170 characters. It holds `span.b-group`, `h3` and `p`.
- **Videos:** `figure.b-media.b-video > video[aria-hidden][data-src][muted loop playsinline preload="none"]`, with no poster.
- **Closing:** `section.bento[aria-label="More from the project"]` holds `body.closing` media.
- **Carousel:** `section.b-carousel-wrap[aria-label="{brand} screens"] > div.b-carousel[tabindex=0] > figure`, built from `extraMedia`. Images have alt `${brandLabel} screen`. Videos use `data-src`.
- **Gaps:** no `data-reveal` anywhere in the body. Bento, closing and carousel sections have no `id`, so they miss the `layout-shell.md` rule ("every section: id + accessible name") and are skipped by the scroll-flow script.

### 1.4 Inline script (273–286)
- This is a bundled module script, not `is:inline`.
- It sets `figure.b-media[data-shape]` from the image's natural ratio: `r < 0.8` is portrait, `r < 1.25` is square, otherwise landscape. It runs on load or when the image is already complete.
- It does not touch carousel or style images.

### 1.5 CSS (438–913)
- **Hero:**
  - `h1`: `--t-display`, `--font-weight-extrabold`, `--core-line-height-tight`, `max-width: 22ch`.
  - `.work-subtitle`: `--fluid-h5`.
  - `.work-meta`: 1 column, 4 columns at 768px or wider.
  - `.meta-label`: mono, `--t-micro`, uppercase.
  - `.work-client-logo`: `height:20px; max-width:88px; filter: grayscale(1) brightness(1.9)`, all hardcoded.
- **Cover:** `.work-cover-media`: `max-height:720px; object-fit:cover; border-radius:var(--radius-xl)`.
- **Body path, mobile first:**
  - `.bento-body` (739): flex column, `gap: --space-section-sm`, padding-block `--space-section-sm` / `--space-section-md`.
  - `.bento` (740): one column, `gap: --gap-3`.
  - `.b-head h2` (747): `--t-display`, the same size as the H1.
  - `.b-head p`: `--fluid-body-lg`, line-height `1.55`, max 52ch.
  - `.b-point`: `--gap-5` padding, `--radius-lg`, `--color-surface-elevated`.
  - `.b-media`: edge to edge on mobile through `margin: 0 calc(-1 * var(--shell-gutter))`. Portrait media keeps its margin and gets `--radius-lg`.
  - `.b-video video`: `aspect-ratio:16/9; object-fit:cover`.
  - `.b-carousel`: flex with `overflow-x:auto`, `scroll-snap-type:x mandatory`, hidden scrollbar and `:focus-visible` outline. Items are `height:min(62svh,560px); width:auto`.
  - `.b-styles`: always `1fr 1fr`, full row, never cropped.
- **At `min-width: 600px` (800):** two columns plus `grid-auto-flow: dense`. Head, video and non-portrait media span the full row.
  - **600px is not on the breakpoint scale.**
- **At `min-width: 1024px` (808):** a 6-column grid with `grid-auto-rows: minmax(140px,auto)`.
  - `.b-head`: span 3 by 2 rows, elevated, `--radius-xl`, `--gap-8` padding.
  - `.b-point`: span 2, transparent, `--stroke-thin` border in `--line-strong`. `--long` spans 3.
  - `.b-media`: span 4 by 2 rows, image `height:100%` with cover. Square spans 2. Portrait spans 2 by 3 rows with `object-fit: contain`.
  - `.b-video`: full row.
- **Fallback breakpoints:** 768 (meta), 640 (`.case-bento` 2 columns), 1024 (gallery 2 columns with each `3n+1` item full width), 768 (`.more-grid` 2 columns).
- **Hardcoded values to tokenise:**
  - Line heights: `1.4`, `1.55`, `1.6`, `1.45`.
  - `letter-spacing: 0.05em`. The token `--tracking-label` is 0.08em.
  - Sizes: `clamp(220px,32vw,380px)`, `clamp(2rem,1.7rem+1.2vw,3rem)`, `240px`, `720px`.
  - Motion: `0.6s cubic-bezier(0.16,1,0.3,1)`, which equals `--easing-editorial`. Several transitions use `ease`.
  - Strokes: `2px solid` and `1px solid`.
- Each top-level section's own padding-block is overridden by the global `!important` rule.

---

## 2. `src/lib/case-body.ts` (191 lines) and `src/lib/queries.ts`

### 2.1 Body grammar
- **Types:** `Tile {group?, title?, text}`, `Media {label, url, video}`, `Section {title, lead?, paras[], tiles[], media[], styles[]}`, `CaseBody {meta, subtitle, tags, cover?, sections, closing}`.
- **H2 split (116):** `/^##\s+(?!#)(.*)$/` divides the text into parts.
  - Parts named `media`, `gallery` and `(sanity|framer) site copy` are special.
  - All other parts are intro. The first `## <title>` is ignored.
- **Meta (126–143):** applies before the first `###`.
  - Each line goes through `plainB` (removes `**`), then `META = /^([A-Z][A-Za-z ()/&]{1,30}):\s+(.+)$/`.
  - `Subtitle` and `Tags` (comma-split) are handled specially. Values matching `none|n/a|-` are dropped.
  - Kept keys: `META_KEYS = ['Category','Client','Partner','Industry','Disciplines','Team','Timeline','Platform','Year','Country','Special Thanks']`.
- **Copy source (145–146):** sections come from "Sanity site copy" when present, otherwise from the short `###` copy.
- **`build()` per line:**
  - `*text*` sets a group label.
  - A list item (`1.`, `-`, `*`, `•`) becomes a tile. `Title: text` splits into title and text.
  - A short unpunctuated line (70 characters or fewer) followed by a longer line becomes a titled tile.
  - Otherwise the line becomes the lead, or a paragraph once tiles exist.
- **`### (context)`** is stripped from section titles.
- **Media lines (58–67):**
  - `![label](url)`, `- Label: url` or a bare URL.
  - `VIDEO = /\.(mp4|webm|mov)(\?|$)/i`.
- **Media routing:**
  - `mediaKey(label)`:
    - `style(s)` goes to styles.
    - `challenge` to challenges, `solution` to solutions.
    - `design philosophy|dp` to philosophy.
    - `conclusion|filler|impact` to outcome.
    - `about|thumbnail` to about.
  - `sectionKey(title)` maps style, challenge/problem, solution/approach/what we built, philosoph/insight/thesis, conclusion/impact/outcome/result, and about/context.
  - Styles always go to the Styles or About section, or else the first section.
  - Outcome media falls back to the last section. Anything unmatched goes to `closing`.
  - `Client logo` is dropped. The first non-video `Cover…` becomes `cover`.
  - "Borrowed stock" filter (148–157): images outside the case study's main `/assets/work/<folder>/` are dropped. Videos are always kept.
- **`inline()` (186–190):** escapes HTML, then renders `**bold**` and `[text](https://…)` (as `rel="noopener" target="_blank"`).
- **Not supported:** FAQ question and answer pairs (the draft format in `docs/drafts/ntuc-u-care-case-study.md` would land as lead and paragraphs). Also no blockquotes, no images inside sections, and no other media labels (anything like a "Brand asset" label goes to `closing`).

### 2.2 Live parse results (in-memory run over all 37 bodies)
- **Rich bodies:**
  - 5 sections: About, Challenges, Solutions, Design Philosophy, Conclusion.
  - 16 or 17 tiles each.
  - 4 to 12 images and 2 or 3 videos placed into sections, 0 to 2 style images.
  - Closing grids of 0 to 24 (inkompass and plufo have 24, bankco 11).
- **Broken bodies:** see §0 item 1.
- **Heading vocabulary:** `Challenges` 47, `About (Context)` 31, `Solutions` 28, `About` 21, `Design Philosophy` 19, `Conclusion` 19, `Impact` 9, `Strategic Insights & Design Philosophy` 9.
- **Media labels:**

  | Label | Count |
  |---|---|
  | Gallery | 191 |
  | Design Philosophy Image | 62 |
  | Solution Image | 57 |
  | Challenge Image | 38 |
  | Styles Image | 38 |
  | Filler Image | 38 |
  | Conclusion Image | 36 |
  | Client logo | 19 |
  | Cover Image | 19 |
  | Challenges Image | 19 |
  | Thumbnail Video | 19 |
  | About Video URL | 18 |
  | Design Philosophy Video URL | 16 |

- **Data quirks:** `Team: Vedanshu Srivastava,` keeps its trailing comma. Rich bodies list everything twice (short copy plus site copy).

### 2.3 `queries.ts` (119 lines)
- **`caseStudyBySlugQuery` (40–49):**
  - Selection: `*[_type=="caseStudy" && slug.current==$slug && !(_id in path("drafts.**"))] | order(_updatedAt desc)[0]`.
  - Body and copy: `title, shortTitle, bodyMarkdown, extraMedia, subtitle, client, summary, about, challenges, solutions, designPhilosophy, impact, galleryPaths, bodyContent`.
  - Meta: `tags, disciplines, industry, timeline, team, partner, results, canonicalUrl`.
  - Media: `coverImage, coverPath, thumbnailPath`.
  - SEO: `seoTitle, seoDescription, ogImage, ogImagePath, ogTitle, ogDescription, noIndex`.
  - Other: `publishedAt, featured, "clientRef": clientRef->{name, logo, logoPath, website}, "services": services[]->{title, "slug": slug.current}`.
- **`caseStudiesListQuery` (32–38),** used by `/work` and `/services/[slug]`: `order(featured desc, publishedAt desc)`, with `title, slug, client, summary, coverImage, coverPath, thumbnailPath, tags, disciplines, industry, timeline, publishedAt, featured, services[]->slug`.
- **Also defined:** `singletonPageQuery` (the `/work` index uses `pageId:'work'`), `postBySlugQuery`/`postsListQuery`, `siteSettingsQuery`, and `NEON.*` SQL equivalents (unused).
- **Schema fields not queried:**
  - `industryRef` (on 44/44), `focusKeyword` (44/44) and `language`.
  - `relatedCaseStudies` and `relatedPosts`. These and `services` are filled on 0 of 44, while `disciplines` is on 44 of 44.
  - Results are filled on 1 of 44 (gratify).
- **`extraMedia` is not declared** in `sanity/schemaTypes/caseStudy.ts`. The sync writes it anyway, so Studio shows an unknown field.
- **The schema comment at about line 190** says `aiSummary`, `keyTakeaways`, `faqs` and `schemaType` were left out on purpose until a renderer exists.

---

## 3. Layouts, SEO and schema

### 3.1 `src/layouts/BaseLayout.astro` (1102 lines)
- **Props (18–48):** `title, description?, seoTitle?, ogImage?, ogImagePath?, noIndex?, ogTitle?, ogDescription?, canonicalPath?, jsonLd?, language?, hideGlobalSections?, hideGlobalBlog?, hideGlobalSectors?, hideGlobalIndustries?` (the last is deprecated).
- **Title rule (134–136):**
  ```ts
  const TITLE_SUFFIX = ' | Wugweb';
  const pageTitle = (seoTitle || title).trim();
  const fullTitle = /wugweb/i.test(pageTitle) || pageTitle.length + TITLE_SUFFIX.length > 60 ? pageTitle : pageTitle + TITLE_SUFFIX;
  ```
  - So the suffix is added only when the title is 51 characters or fewer and does not mention Wugweb.
  - Live case-study seoTitles are 36 to 51 characters, so all of them get the suffix.
  - Descriptions are 143 to 160 characters.
- **Robots (168–169):** `robotsNoIndex = noIndex || !isCanonicalHost(hostname)`. Canonical hosts are `['wugweb.com','www.wugweb.com']` (`src/lib/hosts.ts`). The tag emitted is `noindex, follow`.
- **Canonical (181–182, 345):**
  - `new URL(canonicalPath || Astro.url.pathname, settings.siteUrl || 'https://www.wugweb.com')`.
  - It is omitted when the `noIndex` prop is set (not when only the staging host triggers noindex).
- **Open Graph and Twitter (337–355):**
  - `og:type` is always `website`.
  - `og:title = ogTitle || fullTitle` and `og:description = ogDescription || metaDesc`.
  - `og:image` is made absolute against `Astro.url.origin` (186–190).
  - `twitter:card = summary_large_image`. `twitter:title` and `twitter:description` use `fullTitle` and `metaDesc`, ignoring the og overrides.
- **JSON-LD (199–243):**
  - Sitewide nodes: `Organization` (`#organization`, logo `/assets/brand/small.jpg`, sameAs from live `platformProfile` with filtering), `Person` (`#founder`) and `WebSite` (`#website`), plus the page's `jsonLd` nodes.
  - `graphNodes = robotsNoIndex ? [] : [...]`, so **no JSON-LD is emitted on staging, pages.dev or localhost.** To verify it, use `wrangler pages dev` with a `Host: www.wugweb.com` header, as the blog audit did.
- **`src/components/JsonLd.astro`:** a single `@graph` script that prunes undefined, null and empty values. Nodes must not carry `@context`.
- **Other `<head>` work:**
  - The `js-reveal` gate and a 5-second watchdog (383–394).
  - Self-hosted Inter Tight and Fragment Mono `@font-face`.
- **`<main id="main" tabindex="-1" aria-label={title} data-scroll-flow>` (491).**
- **Module script (899–926):** `initScrollAnimations()`, `initLazyVideo()`, then scroll flow. That last step sets `data-scroll-index` on top-level sections that have an `id` and writes the id list to `main[data-scroll-flow]`.
- **Per-page JSON-LD patterns to reuse:**
  - Blog (`blog/[slug].astro:43-103`): `isoDate()` normaliser, `BlogPosting` with an author `@id` mapping, `dateModified = datePublished`, `BreadcrumbList`, a `SITE` constant.
  - Industries (`footer/industries.astro:39-76`): `CollectionPage` plus a nested `ItemList` plus `BreadcrumbList`, each with an `@id`.
- **No `FAQPage` anywhere.** `FaqAccordion` emits none.
- **`src/pages/sitemap.xml.ts`:** includes a case study when it is not `noIndex` and its canonical is self; `lastmod = _updatedAt`; no image entries.
- **`src/lib/indexnow.ts` with `POST /api/indexnow`:** a Sanity-webhook route that maps `caseStudy` to `/work/<slug>`. It is dormant until the public domain serves this build. Mention that in one line at most (see §8.3).

---

## 4. Tokens and design rules

### 4.1 `src/styles/global.css` (1394 lines) inventory
- **Fonts (15–20):**
  - `--core-font-family-base` (Inter Tight) and `--core-font-family-mono` (Fragment Mono).
  - `--font-display/body/mono` alias these.
- **Weights:** `--font-weight-regular|medium|semibold|bold|extrabold` = 400, 500, 600, 700, 800.
- **Static type scale:** `--ts-*-size`.
- **Fluid type scale (59–80):**

  | Token | Range |
  |---|---|
  | `--fluid-display` | 40 to 80px |
  | `--fluid-h1` | 32 to 48px |
  | `--fluid-h2` | 24 to 36px |
  | `--fluid-h3` | 20 to 28px |
  | `--fluid-h4` | about 17 to 22px |
  | `--fluid-h5` | 16 to 19px |
  | `--fluid-body-lg` | 16 to 18px |
  | `--fluid-body-md` | 15 to 16px |
  | `--fluid-body-sm` | 13 to 14px |
  | `--fluid-label` | 12 to 14px |
  | `--fluid-caption` | 10 to 12px |

  - Graphic type that sizes to its container: `--type-graphic-l|m|s`. The parent needs `container-type: inline-size`.
  - Aliases: `--t-display`, `--t-h1…h6`, `--t-xl|l|lead|body|sm|micro`.
- **Line heights:** `--core-line-height-none|tight|snug|normal|relaxed|loose` (1, 1.2, 1.375, 1.5, 1.625, 2) and `--lh-*` aliases. `--tracking-label: 0.08em`.
- **Neutrals and brand colours:**
  - `--neutral-0…10` runs from #FFF to #000.
  - Brand: `--color-yellow #FFBE1A`, `--color-grey`, `--color-ash`.
  - Secondary: `--color-peach`, `--color-green`, `--color-blue`, `--color-aqua`.
- **Semantic colours:**
  - Surfaces: `--color-surface-page #050505`, `--color-surface-elevated #191919`, `--color-surface-inverse`, `--color-surface-hover #555`.
  - Text: `--color-text-primary #F4F4F4`, `--color-text-secondary #BABABA`, `--color-text-muted #858585`.
  - Borders: `--color-border-subtle`, `--color-border-strong`.
  - Accent: **`--color-accent-primary: var(--neutral-2)` (grey, a decision dated 2026-09-23).** Also `--color-accent-blue` and `--color-accent-lime`.
  - Feedback: `--color-feedback-success|error`.
- **Service colours:** `--svc-{strategy|brand|experience|engineering|growth|operations}`, each with `-dark` and `-light` variants.
- **Legacy colour aliases:**
  - Surfaces: `--bg`, `--surface`, `--surface-2`, `--bg-elevated`.
  - Text: `--fg`, `--fg-muted`, `--fg-subtle`.
  - Accent: `--accent`, `--accent-warm`.
  - Lines: `--line` (white at 5%) and `--line-strong` (white at 12%).
- **Spacing:**
  - Pair ramp: `--p-0…12` and `--gap-0…12` (0 to 3rem, 0.25rem steps).
  - Aliases: `--gap-xs|sm||md|lg|xl`.
  - Section spacing: `--space-section-xs…xl` are all 48px, stepping to 70px at 768 and 96px at 1200 (1146–1160). `--section-y` follows them.
  - Page spacing: `--space-page-head: clamp(4rem,12vw,11rem)` and `--space-page-xs…xl` (1 to 3rem).
  - Chips: `--chip-size: 2.25rem`, `--chip-glyph`.
- **Radius:** `--r-0…8`, `--r-full`.
  - Aliases: `--radius-none|xs|sm|md|lg|xl|2xl|3xl|full` = 0, 4, 8, 12, 16, 20, 24, 32px and 9999px.
  - Numbered and legacy aliases: `--radius-0…8`, `--r-sm|r|md|lg|xl|pill`.
- **Opacity:**
  - Ramp: `--opacity-0…100`.
  - Semantic: `--opacity-disabled|overlay|scrim|hover|active|loading|drag|backdrop|soft|strong|muted|subtle`.
- **Stroke:** `--stroke-hairline|thin|regular|medium|thick|heavy`, plus `--stroke-card|button|input|focus|divider|hero`.
- **Blur:** `--blur-none|xs|sm|md|lg|xl|glass|extreme`, from 0 to 100px.
- **Shadow and elevation:**
  - `--shadow-none|xs|sm|md|lg|xl|2xl|inner` and `--shadow-glow-blue|pink|teal`.
  - `--shadow-nav` and `--shadow`.
  - `--elevation-0…5`.
- **Glass:** `--glass-light|medium|heavy|dark`. These are `backdrop-filter` values that need a tint and a border alongside.
- **Noise:** `--noise-light|medium|heavy|editorial`.
- **Gradients:** `--gradient-brand|strategy|experience|engineering|growth|operations`. There is no brand pillar gradient.
- **Motion:**
  - Durations: `--duration-instant|fast|normal|slow|xslow` (100 to 500ms) and `--duration-ms-150|500|700|1000`.
  - Easings: `--easing-in|out|in-out|linear|standard|accelerate|decelerate|spring|bounce|smooth|editorial`. `--ease-spring` is a `linear()` curve paired with `--duration-spring: 400ms`.
  - Transitions: `--transition-page|overlay|fast`.
  - Interaction presets: `--hover-*` and `--focus-*`. `--focus-primary` is `2px solid var(--neutral-3)`.
  - Also `--selection-*` and `--cursor-*`.
- **Layers:**
  - `--layer-background|base|card|popover|dropdown|modal|toast|tooltip|overlay` = 0, 1, 10, 50, 60, 100, 120, 130, 140.
  - `--layer-nav: 10`, `--layer-cursor` and `--layer-skip-link: 9999`.
- **Layout sizes:**
  - Shell: `--shell-inset`, `--shell-gutter` (16, 32, 48) and `--grid-gap` (16, 24, 32).
  - Header: `--header-height: 100px`, `--nav-height`, `--control-size: 44px`.
  - Components: `--bento-min`, `--share-btn`, `--author-photo`, `--thumb-min`.
  - Root font size: `clamp(16px, 100vw/90, 24px)` (690).
- **Breakpoints:**
  - Documentation tokens: `--breakpoint-xs|sm|md|lg|xl|2xl` = 480, 640, 768, 1024, **1200**, 1440.
  - Convention (1162–1201): use literal `min-width` values from that list. When going down, use `max-width: 639.98px`, `767.98px` or `1023.98px`. No step below 480. Mobile first.
- **Utilities:**
  - Section shell: `.wrap` (1128) and the section rhythm rule (1221–1233).
  - Grid and tones: `.tone-recessed` and `.tone-elevated` (full-bleed tone through a pseudo-element), `.grid` (4, 8 or 12 columns at 768 and 1200), `.page`.
  - Small parts: `.u-index`, `.u-chip`, `.u-tag` (uses `--radius-sm`), `.page-title`, `.eyebrow`, `.meta-row`/`.meta-item`/`.meta-icon`.
  - Buttons: `.btn`, `.btn-solid|ghost|sm|lg|block|block-mobile`. An `a.btn[href]` gets an arrow; external links get ↗ (opt out with `.no-external-icon`).
  - Accessibility: `.sr-only`, `.skip-link`.
  - Reveal: the `[data-reveal]` gate (1301–1307).

### 4.2 Rules to put in the skill (with sources)
- **Tokens only.** Never hardcode colour, type, spacing, radius, opacity, shadow, blur or z-index (`kits_design_system/README.md`, `docs/design.md`, `src/components/README.md`).
- **Radius:** buttons `--radius-sm`, chips/tags/pills `--radius-full`, cards `--radius-lg`, hero and elevated panels `--radius-2xl` (design.md §Core Rules 3; components.md checklist).
- **Yellow at 10% or less.** `.btn-solid` is the only button that may be yellow at rest, and it is reserved for the page's single conversion action. `FooterCTA` stays full-bleed yellow (memory `design-decisions`).
- **Motion:** GSAP only, through `[data-reveal]`, `[data-scroll]` and `data-reveal-delay`. Never import `motion`. Never give one property two owners: hover uses `filter` or `box-shadow` when GSAP owns transform or opacity (components.md, BentoBlock).
- **Service panel order alternates warm and cool:** Strategy, Engineering, Brand, Growth, Operations, Experience (`tokens/service-colors.md`).
- **Layout shell** (`tokens/layout-shell.md`):
  - The section owns the gutter (`<section class="wrap …">`). Content is capped at 1200px. Rhythm is 48/70/96px.
  - Every section needs an `id` and an accessible name.
  - `aria-labelledby` may only point at a heading that always renders. Never label a section with a heading inside `.map()`.
  - Filters are `role="toolbar"`, not sections.
  - One `h1` per page and no skipped heading levels.
  - Muted decorative loops get `aria-hidden`. Media with a caption uses `figure`/`figcaption`.
  - The industries page renders its rows as `<article>`, not `<section>`, so 17 rows don't become landmarks.
- **Governance §8:** never change a media item's aspect ratio. Never change the live text colours to pure white.
- **Mobile is the PWA.** `vh`, `dvh` and `svh` are welcome (memory `design-decisions`).
- **Accessibility:** contrast must be composited over translucent stacks. Touch targets are 44px or larger (`tokens/accessibility.md`).

### 4.3 Doc vs code drift (cite the code)
| Topic | Docs say | Code says |
|---|---|---|
| `--space-section-*` | 32/40/48/64/80 (`layout.md`, `spacing.md`) | all five 48/70/96 stepped |
| Desktop breakpoint | 1280 (`design.md`, `tokens.md`) | 1200 |
| `[data-reveal]` | rise 30px, start top 85% (`motion.md`) | y 16, top 88%, 0.6s `power2.out` |
| `data-scroll` rise/scale/fade-up | 80 / 0.92 / 40 | 50 / 0.95 / 30 |
| `--focus-primary`, `--color-accent-primary` | yellow | `--neutral-3` / `--neutral-2` (grey) |
| `--t-h5` | `--ts-h4-size` | `--fluid-h5` |
| `--theme-glow` | documented | not defined. Services set only `--theme-base|dark|light|gradient` |
| Work card | `--radius-sm`, `data-video-src`, yellow active chip | `--radius-lg`, `data-src`, grey active chip |
| `.u-tag` | chips/tags use `--radius-full` | `--radius-sm` |
| `CLAUDE.md` | "3 components"; `motion` dependency | 41 component files; `motion` removed |

### 4.4 Design-system docs
- **Token docs** in `kits_design_system/docs/tokens/`: accessibility, blur, borders, breakpoints, colors, elevation, glass, gradients, icons, interaction, layout-shell (408 lines, authoritative), layout, motion, noise, opacity, radius, service-colors, shadows, sizing, spacing, tokens (index), transitions, typography, z-index.
- **Block docs** in `docs/blocks/`: bento-block, client-assembly-grid, industries-directory, process-map, sector-showcase, service-spotlight-panel, service-tag-field. There is **no case-study block doc**. `sector-showcase.md` and `industries-directory.md` are the newest templates (Status, Source, Sections, Anatomy, Tiers with ranges written as inequalities, States, Where it renders).

---

## 5. Motion and lazy video

### 5.1 `src/lib/scroll-animations.ts`: `initScrollAnimations(): () => void`
- **`[data-reveal]`:**
  - Animation: `fromTo` opacity 0 and y 16 to opacity 1 and y 0. Duration 0.6, `power2.out`, trigger `start:'top 88%'`, `once`.
  - `data-reveal-delay` is in seconds.
  - Under reduced motion, or if the head watchdog has already removed `.js-reveal`, it only sets `opacity: 1`.
- **`[data-scroll="kind"]`** (`data-scroll-delay` applies to the default kinds):

  | Kind | Behaviour |
  |---|---|
  | `fade-up` (default) | y 30 |
  | `rise` | y 50 |
  | `scale` | 0.95 to 1 |
  | `bento` | staggers `.bento-tile` children, reverses on exit |
  | `cardstack` | `[data-stack-card]` children, scrubbed |
  | `banner` | FooterCTA |
  | `processmap` | no-op |
  | `assemble` | children scatter; `data-assemble-static` items are skipped; parent must clip |
  | `parallax` | `yPercent: -12`, scrubbed |

  The default kinds run 0.85s `power3.out`, `start:'top 85%'`, `once`.
- **Refresh:** `ScrollTrigger.refresh()` runs at init and after `window` load.
- **Limits:**
  - Only elements present at init are bound.
  - BaseLayout calls it once. There are no View Transitions (no `ClientRouter`), so `astro:page-load` listeners never fire.
  - The class names `.bento` and `.bento-tile` overlap with `BentoBlock`. The case-study page uses `.bento` without `data-scroll`, so they don't collide today.

### 5.2 `src/lib/lazy-video.ts`: `initLazyVideo(): () => void`
- **Selection:** `video[data-src]` present at init.
- **Observer:** IntersectionObserver with `rootMargin:'600px 0px'` and `threshold:0.01`.
  - On first entry it sets `src = data-src` and `preload='auto'`, then plays after `loadeddata`.
  - It pauses the video when it leaves the viewport.
- **Fallbacks:**
  - `saveData`: load on click only.
  - No IntersectionObserver: attach everything.
  - `visibilitychange` sweep.
  - After 3 seconds, if the observer has never fired, a sweep plus a throttled scroll and resize fallback.
- **Markup contract:** no `autoplay` (it defeats `preload`), use `data-src`, and include `muted loop playsinline`. A `poster` is strongly advised, otherwise the box is blank until it nears the viewport. Above-the-fold heroes keep plain `autoplay` and `src`.
- `BentoBlock` has its own video observer in `src/lib/bento-block.ts` (`[data-bento-video]`, 15% visibility).
- **Caveat from project memory:** the built-in browser pane reports `document.visibilityState === 'hidden'`, so the observer never fires there.

---

## 6. Templates and components to reuse

- **`src/pages/services/[slug].astro`:**
  - Page-level theme variables on `.service-page-wrapper` (290): `--theme-base: var(--svc-${pillar})`, plus `-dark`, `-light` and `--theme-gradient`.
  - `.glass-panel` is scoped per page (562): `color-mix(--neutral-8 60%)`, a 12% white border, `--glass-medium`, `--radius-lg`. It is redefined separately in ServiceSpotlightPanel, contact-us and reviews, with no global version.
  - Also: `BentoBlock` with `BENTO_LAYOUTS` (layouts as data), `FaqAccordion`, `InsightsBlock`, a mouse-follow `.card-glow`, and `hideGlobalBlog`.
  - It passes **no JSON-LD**.
- **`src/pages/work/index.astro`:**
  - Pillar filter chips: `PILLARS` and `PILLAR_KEYWORDS` with `mapToPillar()`, rendered as a `role="toolbar"` inside the grid section.
  - Cards are `<li data-reveal data-categories>` holding a lazy thumbnail video (`data-src` plus `posterFor`) or an initials placeholder with a yellow gradient.
  - `findThumbFallback()` queries assets with `usage=="Thumbnail"`.
- **`src/pages/blog/[slug].astro`:**
  - Layout: title block at 1200px, cover at 1200px, then a 720px reading column carved by padding (`.article { padding-inline: max(var(--shell-gutter), calc((100% - 720px)/2)) }`).
  - Article furniture: a table of contents built from h2/h3, share links (X, LinkedIn, WhatsApp, copy), newsletter, previous and next (by `publishedAt`).
  - Related items: posts (editor picks, then same category, then latest) and two "Featured case studies" (unordered, first two). Reading progress bar.
  - The cover uses `fetchpriority="high"`.
- **`src/pages/footer/industries.astro`:** a static showcase.
  - It returns 503 with `Retry-After` and `noIndex` when there is no data.
  - It sets `hideGlobalSections`, uses `IndustriesHero` and `SectorRow` (an `article` with alternating `tone="tint"|"plain"`), and emits `CollectionPage` JSON-LD.
- **Components:**

  | Component | Notes |
  |---|---|
  | `BentoBlock.astro` | 589 lines. `BentoTile` covers col, span (tall/mid/short/slim/strip), kind (reason/stat/cta/stack/media/checklist), tone, image/video/poster, fit (cover/inset), chips, caption, href. Build-time guards against an even grid. |
  | `PortableTextRenderer.astro` | 1073 lines. `figure.pt-media` with `figcaption`; `mediaUrl` blocks carry width/height and `.pt-media--small`; video gets `posterFor`. |
  | `FaqAccordion.astro` | Props `{items:{q,a}[], heading?, lede?, openFirst?}`. No JSON-LD. |
  | Other cards and blocks | `InsightsBlock`, `PostCard`, `SectorShowcase` (single source of truth plus a prebuild guard), `ServiceSpotlightPanel`, `ProcessMap`, `ClientAssemblyGrid`, `ServiceTagField`, `TeamGrid`, `TrustBadges` (unused), `FooterCTA` |

  Most components have a `*.stories.ts` file.
- **`src/lib/work-mapping.ts`:** `pillarsFor()` and `relatedWorkFor(all, pillar, limit)` use a `DISCIPLINE_TO_PILLARS` map and de-duplicate on title. They can rank related case studies, since disciplines are on 44/44 and `industryRef` on 44/44.
- **Not in the codebase:** a lightbox, dialog, swiper or slider library, a device frame, or a marquee component. The only exceptions are `.b-carousel` here and a CSS marquee on `/footer/subscription`. FooterCTA's laptop and mobile device art is in the markup but `display:none`.

---

## 7. Image handling

- **URLs:** `assetUrl()` (`src/lib/assets.ts:55-65`) builds `ASSETS_BASE` (build-time `PUBLIC_ASSETS_BASE`, else `https://pub-39ad1d03baec440faf48303be95c3782.r2.dev`) plus `/assets/<path>`. Absolute URLs pass through unchanged.
  - The path map is `public/assets/<p>` ↔ `/assets/<p>` ↔ R2 key `assets/<p>`.
  - Body and extraMedia URLs are already absolute r2.dev URLs.
- **No optimisation anywhere:** no `srcset`/`sizes`, no `<picture>`, no `/cdn-cgi/image`, and Astro is set to `imageService: 'passthrough'`.
  - Case-study images have no width/height. The blog sync measures dimensions with `sharp` and stores them; the case-study sync does not.
  - `fetchpriority` appears only on the blog cover.
- **Caching:** r2.dev responses carry only an ETag, no `Cache-Control`. The `/assets/*` rule in `public/_headers` covers same-origin paths only. `public/sw.js` caches R2 and `cdn.sanity.io` images cache-first, with a cap.
- **Posters:** `posterFor()` (94–102):
  - `.mp4` maps to a `-poster.webp` sibling.
  - Service clips use `site/services/<pillar>/posters/<file>.webp`, plus a 40w `.blur.webp` (commit b47be4ee, `service-media.ts`).
  - Case-study coverage is **56 of 78**. Posters are missing for the Airtel Xsafe and Xstream clips, Aditya Birla Credit, IndusNinja `06_…`, Inkompass Design-Philosophy and others.
- **Alt text:** `loadAssetAlts()`/`altFor()` read asset documents (cached 60 seconds). The body path ignores them and builds alts from labels, such as "NTUC U Care: Solution Image 2".
- **Aspect ratio:** handled only by the runtime `data-shape` script and fixed ratios (16:9 video, 16:10 cards). There are no reserved boxes.
- **Owner constraint:** media stays only in R2. No uploads, copies or derivatives (crop, resize, trim). Responsive variants or new posters therefore need the owner's decision. On-the-fly transformation would need a Cloudflare zone, and none is set up (r2.dev and pages.dev only).

---

## 8. AI tooling, docs and governance

### 8.1 Repo files
- **`.claude/launch.json`** (tracked): `wugweb-dev` runs `npm run dev` on port 4321.
- **`.claude/settings.local.json`:** ignored through the global git ignore. It is an allowlist, but some allowed commands embed plaintext credentials (a Cloudflare token and a Neon connection string). Don't copy them into a skill.
- **`.claude/worktrees/sectors`:** a git worktree on `feat/sector-showcase` with stale copies of the files. Exclude it when grepping.
- **No skills or commands** in the repo. User-level `~/.claude/skills` holds only generic design skills. The plugin skill `anthropic-skills:wugweb-seo` exists and is worth referencing.
- **`.cursor/rules/governance.mdc` and `free-tier-limits.mdc`** (`alwaysApply`): Rule 1 (free tier), Rule 2 (R2 at or under 9.5 GiB, Standard class, `assets/` prefix only), ownership, Notion as seed.
- **`.commandcode/`** is ignored (another tool; it contained live tokens).
- **`AGENTS.md` and `CLAUDE.md` are identical** except the H1. Update both together.
- **Relevant `CLAUDE.md` rules:**
  - "Exception: case-study SEO (2026-10-13)": Notion is the source for SEO Title, SEO Description, Focus Keyword and Canonical URL.
  - "never store a site suffix: BaseLayout adds ' | Wugweb' only when the title fits in 60 chars."
  - "Canonicals that don't resolve to a published `/work/<slug>` are skipped."
  - "One slug per case study: no Legacy Slugs, no old-URL redirects."
  - Session checklist: read `pending.md` and `governance.md` at the start; update `pending.md` (and governance, AGENTS and CLAUDE when facts change) at the end.
- **`governance.md`:**
  - §8: "Never change the aspect ratio of any media."
  - §9.11: "Every commit MUST update CHANGELOG.md" (Keep a Changelog format, under `## [Unreleased]`).
  - §5: owner-approved Notion exceptions (blogs, case-study SEO, sectors).
- **`pending.md`:**
  - Line 47: the body template shipped 2026-10-19 (37 with a body, 7 on the old layout); `scripts/.tmp-cands.mjs` is one-off scratch.
  - Line 49: the 7 `noIndex` pages stay hidden "until real copy exists… Unset noIndex once Notion Body Content is written". Results are filled on only 7 of 44, the main answer-engine gap.
  - Line 71: case-study checks failing: description length 35, title length 10, alt text 5. No `coverAlt` field exists.
  - Lines 1552–1554: the `wip/case-study-body` branch is now superseded.

### 8.2 Docs
- **`docs/drafts/ntuc-u-care-case-study.md`:** a proposed body pattern.
  - Meta lines, then `### About / The challenge / What we built / How we approached it / The outcome / FAQ`.
  - `*For members*` group labels and bullets with no fixed counts.
  - Brief table: focus keyword, intent, reader, goal, about 750 words.
  - Voice: "plain, confident, specific; no superlatives… British spelling". Each section should open with a one-sentence answer.
- **`docs/schema-template-section-component-level.md`:** proposed, not deployed: `aiSummary`, `keyTakeaways`, `faqs` (for FAQPage), `schemaType`, `lastReviewedAt`, `breadcrumbLabel`, `searchIntent`, `secondaryKeywords`.
- **`docs/content-assets.md`** is archived and partly stale. **`docs/r2-assets.md`** covers Rule 2. **`docs/seo/*.csv`** is blog only.

### 8.3 Project memory (`~/.claude/projects/-Users-abcom-Documents-GitHub-wugweb-site/memory/`)
- **`case-study-body-only`:** "Case-study content = Notion Body Content only… `about`, `challenges`, `solutions`, `impact`, `designPhilosophy`… are not real content… never derive copy, Results, SEO text or keywords from those structured fields."
- **`no-dashes-visible-copy`:** no em or en dashes in visible strings or in `kits_design_system/docs/blocks/*.md`. Write ranges as inequalities.
- **`media-r2-only-no-uploads`:** "no new uploads anywhere, R2 included… Never plan a copy/upload/derivative (crop, resize, trim) step."
- **`notion-is-source-dont-author`:** sync from Notion. Propose current versus proposed, and write to Notion only on approval.
- **`zero-framer-dependency`:** no Framer URLs, redirects or assets.
- **`git-workflow`:**
  - Trailer `Co-Authored-By: Wugweb <admin@wugweb.com>` only. This conflicts with the harness attribution reminder; the owner's rule takes precedence.
  - Commit by path in a shared checkout and push `.md` files.
  - Back up to `backups/` before any Sanity or Notion write.
- **`working-style`:** do exactly what is asked and reply in plain short English. **`dont-mention`:** don't raise DNS cutover unprompted; one line only when a task is blocked by it.

---

## 9. Scripts related to case studies

| Script | What it does | Safety |
|---|---|---|
| `sync-notion-case-studies.mjs` | Notion Case Studies (data source `3a3bb710-b9ab-80d6-b520-000bfeabe514`) to Sanity. Sets title, shortTitle, bodyMarkdown (rich text to markdown, old hosts rewritten through `data/case-study-media-map.json`, 514 entries), extraMedia (unused files in the case study's own `work/<folder>` per the asset registry, minus posters, logos and same-size duplicates), slug, seoTitle, seoDescription, focusKeyword, canonicalUrl (guarded). Does not sync noIndex, Results, cover, logo or alt. | Dry run by default; `WRITE=1` backs up touched fields to `backups/caseStudy-seo-before-<ts>.json`, then one transaction. Never writes Notion. Empty values never clear. Never deletes. |
| `fix-notion-case-study-media.mjs` | Writes Notion OG Image, Cover Image and Canonical URL only | Dry run; `WRITE=1` plus backup |
| `notion-publish-six-case-studies.mjs` | One-off: Notion Status set to Published for 6 slugs | Dry run; `WRITE=1` plus backup |
| `set-casestudy-og-paths.mjs` | One-off: `ogImagePath` from the image cover after a 200 check | Dry run; `WRITE=1`, backup, `ifRevisionId` |
| `fix-case-studies.mjs` | Legacy: reads `~/Downloads` CSV, deletes and enriches docs | **No dry run.** Obsolete; don't run. |
| `migrate-caseStudy-bodyContent.mjs` | Legacy: structured fields to `bodyContent` | Dry run; `--apply`. Superseded by body-only. |
| `generate-video-posters.mjs` (`npm run posters`) | ffmpeg frame at 1s to `-poster.webp` (1280w, q72) beside local `public/…mp4` | No dry run. Local only. Conflicts with the no-derivatives rule. |
| `populate-missing-covers.mjs`, `map-assets-to-content.mjs` | Write path fields from assets | **Writes by default**; `DRY_RUN=1` is opt-in |
| `upload-assets-to-r2.mjs`, `sync-asset-registry.mjs` | Upload to R2 and maintain the registry | `DRY_RUN=1` opt-in; free-tier guards. Uploads are now banned. |
| `scan-asset-usage.mjs` | Usage report | Read-only by default; `WRITE=1` sets `usedBy` |
| `verify-site-media.mjs` | HEAD-checks `site-media.json` entries | Read-only |
| `plan-asset-reorg.mjs` | Writes a CSV and MD plan to `backups/` | Plan only |
| `lib/asset-fields.mjs` | Editorial fields use `setIfMissing`; file facts use `set` | Rule module |
| `check-sector-css.mjs` (`prebuild`) | Fails the build if `.sector-*` is styled outside `SectorShowcase.astro` | Good pattern for a case-study CSS ownership guard |
| `scripts/.tmp-cands.mjs` | Untracked scratch: Notion body links matched to R2 candidates | `.gitignore` covers `scripts/tmp-*`, not `.tmp-*` |

---

## 10. `package.json`, tests and verification

- **Scripts:**
  - Core: `dev` (`wrangler types && astro dev`), `build`, `prebuild` (sector CSS guard), `preview` (build, then `wrangler pages dev ./dist`), `deploy`.
  - Sanity: `sanity:*`.
  - Storybook: `storybook`, `storybook:build`.
  - Media: `posters`.
  - Tests: `test:redirects|integrations|forms|bearer`, which run `node --test` on `.ts` files under Node 24.18 with type stripping.
- **Missing tooling:** no `@astrojs/check` (so `astro check` is unavailable without installing it), no Playwright, no ESLint, Prettier or Stylelint, and no CI (`.github` is absent).
  - `tsc` is available (TypeScript 5.5, strict Astro tsconfig). `pending.md` notes pre-existing tsc errors.
  - `vitest` is installed but unused.
- **Obvious new test:** `src/lib/case-body.test.ts` using the `node:test` and `assert/strict` pattern from `redirects.test.ts`, with the failing short-format sample as a fixture.
- **Storybook 10** runs on `@storybook-astro/framework` (Container API) with `addon-a11y`.
  - Component scripts don't run in stories without a decorator.
  - Inline component `<script>` must be plain JS with no TS annotations (gotcha recorded in components.md).
- **Live checks:** the dev server runs on port 4321.
  - For JSON-LD, serve with `Host: www.wugweb.com`; it is suppressed on other hosts.
  - For lazy video and reveals, check `document.visibilityState` first, since the built-in pane reports hidden.
