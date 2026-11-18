# Schema: the JSON-LD graph

> **Owner: `wugweb-seo`.** The schema and JSON-LD rules belong to `wugweb-seo`; this skill applies them. `wugweb-seo` is installed and wins wherever it holds a rule. It has no JSON-LD graph file yet, so this file is held here until the owner skill carries it. Do not copy these rules into another file.

One `@graph` per case study page, emitted only on the canonical host. Every value comes from the approved body, the record or the manifest; nothing is invented to fill a field.

## The graph

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "<url>",
      "url": "<url>",
      "name": "<SEO title>",
      "description": "<meta description>",
      "isPartOf": { "@id": "<origin>/#website" },
      "primaryImageOfPage": { "@id": "<url>#cover" },
      "breadcrumb": { "@id": "<url>#breadcrumb" },
      "inLanguage": "en-GB"
    },
    {
      "@type": "CreativeWork",
      "@id": "<url>#work",
      "headline": "<H1>",
      "name": "<title>",
      "abstract": "<summary>",
      "creator": { "@id": "<origin>/#organization" },
      "publisher": { "@id": "<origin>/#organization" },
      "datePublished": "<publishedAt>",
      "dateModified": "<last real content edit>",
      "inLanguage": "en-GB",
      "image": [
        { "@type": "ImageObject", "@id": "<url>#cover", "url": "<cover url>", "width": 0, "height": 0 }
      ],
      "about": { "@type": "Organization", "name": "<client>", "url": "<client website>", "sameAs": [] },
      "genre": "<industry>",
      "keywords": "<tags, comma separated>",
      "mentions": [ { "@type": "Organization", "name": "<partner>" } ],
      "video": [
        {
          "@type": "VideoObject",
          "name": "<label>",
          "description": "<caption>",
          "thumbnailUrl": "<poster url>",
          "contentUrl": "<mp4 url>",
          "uploadDate": "<file last-modified, else publishedAt>",
          "duration": "PT<n>S"
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "<url>#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "<origin>/" },
        { "@type": "ListItem", "position": 2, "name": "Work", "item": "<origin>/work" },
        { "@type": "ListItem", "position": 3, "name": "<title>" }
      ]
    }
  ]
}
```

`CreativeWork` earns no search rich result; it is used because it describes the page truthfully. Do not switch type to chase a result without the owner's decision.

## Field rules

- URLs come from the same canonical origin the page layout uses. Never hardcode the host.
- `image`: the cover plus any images already in the manifest at 1:1, 4:3 or 16:9. Width and height from the manifest. No new image files.
- `video`: one `VideoObject` per labelled video that has a poster or a usable start frame. `duration` from the manifest, as ISO 8601.
- `about`: the client as an `Organization` with its website and known profiles. Only links the owner supplied.
- `mentions`: partners and platforms named in the body.
- `contributor`: optional; people credited on the page, as `Person` nodes with a name only.
- `abstract`: the summary, only when the page shows one.
- `dateModified`: the date of the last real content edit, never the record's every-save update time; no date change without a real edit. The rule lives in `wugweb-seo` (`.claude/skills/wugweb-seo/references/audit.md`). With no real-edit date on record, `dateModified` equals `datePublished`.
- Testimonials: `blockquote` markup on the page, and at most an optional `Quotation` node.

## Never emit

- `HowTo`, `Review`, `AggregateRating` or star markup. The owner has ruled these out, and self-serving review stars are ineligible.
- `FAQPage` only on service pages and blog posts (never a case study), only from the `faqs` field, and only where every question and answer is visibly on the rendered page and comes from the owner's source (owner, 2026-11-17). No question is written for search; the gate script checks that each one is visible.
- `author`. The work is credited through `creator` and `publisher` as the Wugweb organisation.
- AI-specific markup or `llms.txt`.
- JSON-LD on any non-canonical host (previews and mirrors).
- A field whose value would have to be guessed.

## Checks

- The graph has exactly `WebPage`, `CreativeWork` and `BreadcrumbList`, linked by `@id`.
- Every fact in the graph matches the visible page.
- `og:type` stays as the site layout sets it.
- `scripts/check-case-page.mjs` verifies the three types on the canonical host and reports n/a elsewhere.
