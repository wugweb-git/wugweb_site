# Blog Post Layout

**Status:** built, awaiting sign-off · **Last verified:** 2026-10-19
**Source:** `src/pages/blog/[slug].astro` · tokens `--article-*` in `src/styles/global.css` · related cards `src/components/PostCard.astro`

Reference: the Fabrica blog post (split layout, sticky cover beside one
reading column). Copy, order of content and the global sections (Sectors,
blog teaser, final CTA) are unchanged.

---

## 1. Anatomy

```
section.wrap.post-layout#article (.has-cover when the post has a cover)
├ header.post-hero#article-hero   grid-area: hero   h1, intro, tags, meta
├ figure.post-cover#article-cover grid-area: cover  cover image
└ div.post-body                   grid-area: body   contents, body, author, share, newsletter, previous/next
section#related-posts  PostCard (row) × 3
section#related-cases  case-study cards × 2
```

## 2. Tokens (sm / md / lg)

Boundaries: sm 0, md 768, lg 1200 (the layout shell's own steps).

| Token | sm | md | lg |
|---|---|---|---|
| `--article-cols` | `minmax(0, 1fr)` | same | `minmax(0, 5fr) minmax(0, 7fr)` |
| `--article-areas` | `"hero" "cover" "body"` | same | `"cover hero" "cover body"` |
| `--article-column` | `720px` | same | `none` |
| `--article-cover-ratio` | `4 / 3` | `16 / 9` | `auto` |
| `--article-cover-height` | `auto` | same | viewport below the header |
| `--article-cover-position` | `static` | same | `sticky` |
| `--article-title-size` | `--t-display` | same | `--t-h1` |

A post without a cover never splits: one 720 column at every breakpoint.

## 3. Tiers

| Range | Layout |
|---|---|
| x < 768 | Title block, cover (4:3), body: one column |
| 768 ≤ x < 1200 | Same, 720 column, cover 16:9 |
| x ≥ 1200 | Sticky cover left (5 of 12), title and body right (7 of 12) |

## 4. Related posts

The shared PostCard with `row`: compact row cards below 768, the normal card
from 768. Grid: 1 column, 2 at md, 3 at lg. Card states (hover lift and zoom,
focus, row press) come from PostCard; nothing is restyled here.
