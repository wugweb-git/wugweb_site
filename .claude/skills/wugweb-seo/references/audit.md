# Audit: checks on a rendered page

Check the page as a crawler receives it: a local preview served with the
canonical host, or the live address. The source document is not enough.

## Contents

- Scripted checks
- Absorbed rules
- Manual checks
- Crawler access
- Citability score
- Fix list

## Scripted checks

`scripts/check-page.mjs` reads one HTML file. Each check has an id that appears
on every finding.

| Check id | Passes when | Severity on fail |
|---|---|---|
| `title-present` | One non-empty `<title>` | BLOCKER |
| `title-length` | Case study: source title, before " \| Wugweb", is 51 characters or fewer | BLOCKER for a case study; reported only for other types |
| `title-rendered` | Rendered title is 60 characters or fewer | HIGH |
| `description-length` | `meta name="description"` is 140 to 160 characters | HIGH |
| `h1-single` | Exactly one `<h1>` | HIGH |
| `canonical` | One absolute https canonical, on the expected host when `--host` is given | BLOCKER |
| `robots-meta` | No `noindex` | BLOCKER |
| `schema-parses` | Every JSON-LD block parses | BLOCKER |
| `schema-banned-type` | No `HowTo`, `Review` or `AggregateRating` | BLOCKER |
| `schema-faq-content` | Any `FAQPage` has at least one question in `mainEntity`. Whether each question shows on the page is a manual check | HIGH |
| `schema-required-types` | Case study: `WebPage`, `CreativeWork` and `BreadcrumbList` | HIGH |
| `schema-no-author` | Case study: `CreativeWork` has `creator` and `publisher` and no `author` | HIGH |
| `img-alt` | Every `<img>` has an `alt` attribute, empty for decoration | HIGH |
| `img-dimensions` | Every `<img>` has `width` and `height` | MEDIUM |
| `server-html-text` | At least 150 words of text in the server HTML | MEDIUM |
| `share-tags` | All 12 share tags present: `og:title`, `og:type`, `og:description`, `og:url`, `og:site_name`, `og:image`, `og:image:alt`, `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:image:alt` | MEDIUM |
| `share-url` | `og:url` equals the canonical | MEDIUM |
| `schema-context` | Every JSON-LD block uses `@context` exactly `https://schema.org`. House style: schema.org accepts the http form too | LOW |

The title, description and alt text lengths are house limits. Google
publishes no character limit for a title or a description and cuts titles to
the device width (Google title links page, updated 2025-12-10; snippets page,
updated 2026-04-20).

The script matches patterns in text. It does not run JavaScript or render the
page. It prints what it did not check under "Not checked".

## Manual checks

| Check | How |
|---|---|
| Firewall and bot settings | A bot setting can return 403 to crawlers while robots.txt allows them. Check the host's bot settings for every property. Cloudflare has blocked AI crawlers by default for new sign-ups since 2025-07-01. |
| Redirects | At most one hop, a house rule: Googlebot follows up to 10 (Google redirects page, updated 2026-02-04). The http, https, www and bare forms all reach one address. No redirects for old or Framer addresses. |
| Sitemap | Present, listed in robots.txt, and holding only canonical addresses that return 200. |
| Rendering | Compare the server HTML with the rendered page. Content that appears only after scripts run was invisible to the main AI crawlers in one third-party test (Vercel, 2024-12-17); no AI vendor has stated it. Google does render scripts, with a possible delay. |
| Core Web Vitals | Field data: LCP 2.5 seconds or less, INP 200 milliseconds or less, CLS 0.1 or less. |
| Schema against the page | Every value in JSON-LD is visible on the page, every `FAQPage` question included. Validate in the search engine's rich results test. Breadcrumbs have shown on desktop results only since 2025-01-23. |
| Dates | A blog post shows its date; a case study shows none. A shown date matches the schema date. |
| Images | A fault on every page using a block goes to `wugweb-kits`, which answers with its check result. |

## Crawler access

`scripts/check-robots.mjs` resolves each bot against robots.txt for one path,
using the longest matching rule.

| Group | Bots | Rule |
|---|---|---|
| Search and citation | Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, Claude-SearchBot, Claude-User | Must be allowed on every page that should be found |
| Training | GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot, Bytespider, meta-externalagent | The owner's choice. Report what the file says; ask once per property |

Read the table with these facts, each from the operator's own bot page as
read on 2026-11-16:

- Blocking Google-Extended does not affect Google Search. AI Overviews and AI
  Mode follow Googlebot and the snippet controls.
- A site that blocks OAI-SearchBot is not shown in ChatGPT search answers.
- ChatGPT-User and Perplexity-User fetch a page when a person asks, and may
  not follow robots.txt.

The script also flags a robots.txt with no Sitemap line, under `sitemap-listed` at HIGH.

Bot names change. Check the operator's own documentation before reporting a
bot missing.

## Citability score

Score each section of the page from 0 to 100, then weight the scores by section
length.

| Criterion | Weight | High score |
|---|---|---|
| Answer first | 30% | The first one or two sentences answer the heading |
| Self-contained | 25% | The section names its subject and reads on its own, 50 to 200 words |
| Structure | 20% | Clear heading order, short paragraphs, a table for any comparison of three or more |
| Specific facts | 15% | Numbers and names with their source and date |
| Original | 10% | First-party work, data or process no other page holds |

Report the page score, the three weakest sections with what each lacks, and any
site-level blocker that caps the score, such as a blocked crawler or content
that needs scripts to appear. Name what a section lacks; never write the fix.

## Absorbed rules

Taken from the helper skills on 2026-11-16 and restated here, so the audit part
works without them. Figures marked "source's figure" are that helper's claim.
The owner's rules win in any clash.

| Rule | Source |
|---|---|
| Never optimise a page that is not indexable; report the indexing fault first | rampstack seo-content-audit, seo-onpage |
| Title and description are unique across the site. The title and the H1 say the same thing; the title may be shorter or carry the brand, because Google suggests putting the title text in the first `<h1>`. The description does not repeat the title | rampstack seo-onpage, brightdata seo-audit |
| Compare raw HTML with the rendered page: title, H1, description, canonical and robots must match. Never report a tag missing from a Markdown fetch; confirm in raw HTML or write "not checked" | seo-skills seo-technical-audit, seo-firecrawl |
| Key facts are text in server HTML, not held in images, PDFs or iframes. A 200 page with almost no body text is a soft 404 | rampstack seo-aeo-geo, seo-skills seo-technical-audit, aeotester audit |
| Check the `X-Robots-Tag` header as well as the meta tag. Flag a page that is noindex and canonicalised elsewhere. An unknown address returns 404 or 410, not 200. Staging hosts are noindexed | searchfit technical-seo, aeotester audit, rampstack seo-technical |
| Sitemap: report indexable pages missing from it, entries with no internal links, entries that are not 200, and lastmod identical everywhere or stale. No noindexed address in it. Canonical, sitemap and internal links agree | seo-skills seo-sitemap, rampstack seo-technical, sanity seo-aeo-best-practices |
| Internal links: every target returns 200; fragment links point at an id that exists; case and trailing slash match the route. Flag dead-end pages, pages four or more clicks from home (a house rule; Google sets no click depth), generic anchors, and hubs their spokes do not link back to. A page reachable only through the sitemap is an orphan. Fix the link itself, not with a redirect | searchfit broken-links, internal-linking, rampstack programmatic-seo |
| JSON-LD: parses; `@context` exactly `https://schema.org`; absolute addresses; ISO 8601 dates; no empty values; breadcrumb items carry position, name and item; several types share one graph; present in server HTML, because Google reads JSON-LD added by scripts but other search engines and AI crawlers may not; rechecked live after deploy | seo-skills seo-schema, searchfit schema-markup, sanity seo-aeo-best-practices |
| Share tags in server HTML: the twelve in `share-tags`. `og:url` equals the canonical | searchfit seo-audit, sanity seo-aeo-best-practices, aeotester audit |
| Images: alt present, 10 to 125 characters (a house limit; Google sets no alt length), not a file name, not repeated, not a repeated keyword; the largest image not lazy and given high fetch priority; width and height set; below-fold images lazy. Weight is reported as a fact, never fixed by re-encoding. A fault on every page using a block goes to `wugweb-kits` | seo-skills seo-images |
| Favicon, title, description and share image are present | website-design web-review |
| Slug lowercase and hyphenated; excerpt and description match the piece; decorative images take empty alt | rampstack content-and-copy, marketing content-creation |
| Citability blockers: no answer in the first 300 words; no visible date on time-sensitive content; the entity not named in full at first mention; a statistic without a primary source and data date. Visible dates match schema dates. No date change without a real edit | seo-skills seo-content-audit, rampstack seo-aeo-geo, sanity seo-aeo-best-practices |
| Cannibalisation: flag any phrase where two of the site's own pages rank or swap. Skip pages under three months old (source's figure). The owner decides which page keeps it | rampstack seo-content-audit, seo-skills seo-page |
| One verdict per page: keep, refresh, or raise with the owner. Under five ranking queries, say the data is insufficient (source's figure) | seo-skills seo-page |
| Before and after a deploy, snapshot title, description, H1, canonical, robots, lang, JSON-LD types, word count and internal links. A change to canonical, robots, lang or H1 is red; to title, description or schema is amber | seo-skills seo-drift |
| Rank each fix by the page's traffic, whether it touches indexing, crawling, rendering or vitals, and effort. Group issues with one template cause into one fix. Name the proof metric before the fix ships. Label a fix mechanical or needing the owner's facts | rampstack seo-site-health-audit, aeotester fix |
| Every finding carries its evidence. Unmeasured items are listed as out of scope with the tool that would measure them | brightdata seo-audit |
| Judge Core Web Vitals on field data at the 75th percentile, not lab runs. A declared canonical that differs from the one the search engine chose is critical | seo-skills seo-google |
| A page that already passes is a valid result | cloudflare web-perf |
| For multi-language sites only: each page lists itself, alternates link back, one x-default, tags only on the canonical address | seo-skills seo-hreflang, searchfit content-translation |

Set aside: FAQPage for questions the page does not show, HowTo, review stars, aggregate ratings, `llms.txt`,
question headings, author bylines, word-count floors, title limits of 50 to 60
and description limits of 150 to 160, redirects as a default fix, image
re-encoding.

## Fix list

```
One page (to wugweb-work, as current → proposed)
1. <section>: <what is missing>. Check: <how to confirm>

Every page using a block (to wugweb-kits)
1. <block>: <finding>, on <pages>

Code (to a developer)
1. BLOCKER <change>. Check: <how to confirm>
```

Decline and record any helper finding that asks for a banned schema type,
`llms.txt`, a keyword density, a question heading in place of a claim, or a
rewrite of approved copy.
