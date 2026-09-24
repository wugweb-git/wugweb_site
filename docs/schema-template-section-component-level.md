# Schema template — section/component-level fields

Same pattern as the `singletonPage` SEO/AI-Answers work: field name, type, group,
label, purpose. Nothing in this file is deployed yet — review first, then I add
the actual `defineField()` entries to the Sanity schema files.

## 1. Real gap found while compiling this: `caseStudy` and `post` never got the
   SEO/AI-Answers group that `singletonPage` already has

`singletonPage` has: `ogImagePath`, `ogTitle`, `ogDescription`, `noIndex`,
`canonicalUrl`, `focusKeyword`, `secondaryKeywords`, `searchIntent`,
`breadcrumbLabel`, `aiSummary`, `keyTakeaways`, `faqs`, `schemaType`,
`lastReviewedAt`.

`caseStudy.ts` and `post.ts` still only have the original 3 fields
(`seoTitle`, `seoDescription`, `ogImage`). Every case study and every blog post
is missing: no-index control, canonical URL override, focus keyword tracking,
AI-answer summary, key takeaways, FAQ blocks, schema.org type, and a
last-reviewed date. Since these are the two content types with the most pages
(82 case studies, 124 posts), this is a bigger gap than anything on
`singletonPage` was.

| Field | Type | Group | Label | Purpose |
|---|---|---|---|---|
| `ogImagePath` | string | seo | OG Image (R2 path) | Matches the path-field convention already used for `coverPath`/`thumbnailPath` instead of a second Sanity CDN image |
| `ogTitle` | string | seo | OG Title override | Falls back to `seoTitle` / `title` if empty |
| `ogDescription` | text (2 rows) | seo | OG Description override | Falls back to `seoDescription` / `excerpt`/`summary` if empty |
| `noIndex` | boolean | seo | Hide from search engines | Framer's "Search engines" toggle equivalent. Default `false` |
| `canonicalUrl` | url | seo | Canonical URL override | `caseStudy` already has a `canonicalUrl` field for stub-redirect duplicates - this would be a *different*, SEO-purpose field on the canonical doc itself. Needs a distinct name to avoid clashing, e.g. `seoCanonicalUrl` |
| `focusKeyword` | string | seo | Focus keyword | Primary keyword this piece targets |
| `secondaryKeywords` | array of strings | seo | Secondary keywords | Supporting keywords |
| `searchIntent` | string (list) | seo | Search intent | Options: informational / commercial / navigational / transactional |
| `breadcrumbLabel` | string | seo | Breadcrumb label | Short label for breadcrumb trail, falls back to title |
| `aiSummary` | text (2-3 rows) | ai-answers | AI answer summary | 40-60 word extractive summary, rendered visibly on the page (not hidden meta) so answer engines can quote it |
| `keyTakeaways` | array of strings | ai-answers | Key takeaways | 3-5 bullet points |
| `faqs` | array of {question, answer} objects | ai-answers | FAQs | Feeds FAQPage JSON-LD, same pattern as the existing `service.faqs` field |
| `schemaType` | string (list) | ai-answers | Schema.org type | Options for caseStudy: CreativeWork / Article. For post: Article / BlogPosting |
| `lastReviewedAt` | datetime | ai-answers | Last reviewed | Feeds `dateModified` - `_updatedAt` moves on trivial edits so it isn't a usable freshness signal on its own |

## 2. Genuinely new component-level fields (small set - most checklist items are
   code patterns, not content fields, see section 3)

These would live on shared object types used inside `blockContent`, `challenges[]`,
`solutions[]`, or wherever a button/link/image is authored.

| Field | Type | On object | Label | Checklist item it answers |
|---|---|---|---|---|
| `ariaLabel` | string, optional | link/button object | Accessible label | Per-element accessibility fields (Aria label) - only needed when the visible label alone doesn't describe the action (icon-only buttons, "Learn more" repeated many times on one page) |
| `relNofollow` | boolean, default false | link/button object (only where `href` can be external) | No-follow this link | NoFollow vs. DoFollow - currently no field exists because every link on the site is internal; add this only if/when outbound or sponsored links become a real use case |
| `imageContext` | string, optional | image object | Context note | Visual-to-Text Proximity - short editor-facing note on what nearby copy this image supports, so a reviewer can check placement. Does not render on the page, authoring aid only |

**Not proposing a new field for:** Alt text - check first whether the existing
image objects across schemas already require `alt`; if the field exists but
isn't enforced (`validation: (r) => r.required()`), that's a validation fix, not
a new field.

## 3. Checklist items that are code patterns, not schema fields - no field
   proposed, with reasoning

| Item | Why no schema field |
|---|---|
| Real landmark tags (section/article/nav) | Template markup decision (`<section>` vs `<div>`), not editor-controlled content |
| Heading level flexibility | Already solved - Portable Text `style` field (H2-H4) already exists and is editor-controlled |
| No skipped heading levels | Enforced by editorial discipline or a future Studio validation rule on `blockContent`, not a new field |
| Section label (scroll anchor) | `id="about"` etc. are hardcoded per-template (work/[slug].astro), not something an editor sets per document |
| Native href attribute | Template implementation - every button/link component already renders a real `<a>`/`<button>` |
| Descriptive anchor text | Already an existing field (`label` on buttons/links) - this is a copy-quality guideline, not a missing field |
| Native lazy loading | Template implementation (`loading="lazy"` in the `<img>` tag), not content |
| Image/asset optimization | Owned by the Asset Registry (588 Sanity asset docs / R2 pipeline) - flagged, not duplicated here |
| Asymmetric loading & DOM order | CSS/layout decision, not content |
| Answer-first text design, Definition & key takeaway blocks, Entity density | Copywriting guidelines for how to *write into* `aiSummary`/`keyTakeaways`/body content - not new fields, they're guidance for filling in the fields that already exist (or are proposed above) |

## Next step

Nothing here is deployed. If this looks right, next I: (1) add the SEO/AI-Answers
group to `caseStudy.ts` and `post.ts` matching section 1, (2) add the 3 small
component-level fields from section 2 only where you confirm they're worth the
schema complexity, (3) run `npx tsc --noEmit` and deploy the schema.
