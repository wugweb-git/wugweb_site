# Eval audit-title-description: title and meta description of a case-study page

Prompt: Audit the title and meta description of a case-study page.

Files read: SKILL.md, LESSONS.md, references/audit.md, references/handoffs.md, references/standing-rules.md, README.md (commands), examples/page-pass.html, examples/page-fail.html. Scripts run (read-only): `node scripts/check-page.mjs examples/page-pass.html --kind work --host wugweb.com` and the same on `examples/page-fail.html`.

## Response

No page was named, and I cannot reach the live site. So I ran the check on the two example case-study pages the skill ships. These are test files, not live wugweb.com pages. Send the rendered HTML or address of the real page and I will run the same check on it.

The rules checked, on wugweb.com:

- Rendered title: 60 characters or fewer, including " | Wugweb" where the site adds it. A house limit; Google sets none and cuts titles to the device width.
- Description: 140 to 160 characters. Also a house limit.

### Example 1: examples/page-pass.html

```
1 page (work). no findings. 17 checks passed.
```

| Check | Measured | Rule | Result |
| --- | --- | --- | --- |
| `title-present` | one title | one non-empty title | passes |
| `title-rendered` | 54 characters | 60 or fewer | passes |
| `description-length` | 148 characters | 140 to 160 | passes |

By reading: the title and the H1 say the same thing (the title adds the brand). The description does not repeat the title.

It passes.

### Example 2: examples/page-fail.html

```
1 page (work). 2 high (title and description only).

HIGH     <title>            rendered title 69 characters, limit 60     title-rendered
HIGH     meta description   26 characters, range 140 to 160            description-length
```

Those two lines are taken from the full run, which found 4 blockers, 7 high, 4 medium and 1 low on this page. One of the blockers matters before any title work: the page carries `noindex` (`robots-meta`). A page that is not indexable is not optimised; the indexing fault is reported first.

By reading: the title ("How We Completely Rebuilt The Care Booking Flow For Families | Wugweb") and the first H1 ("Care booking") do not say the same thing, and the page has two H1 elements.

Fix list, one page (to `wugweb-work`, as current → proposed):

1. Title: current 69 characters as rendered → proposed limit 60 characters or fewer as rendered, saying the same thing as the H1. Check: `title-rendered` passes.
2. Description: current 26 characters → proposed limit 140 to 160 characters, not repeating the title. Check: `description-length` passes.

I give the limits, not the wording. `wugweb-work` writes the title and description and runs the voice check. For a case study the SEO title and description are stored in Notion, so the approved change goes to `wugweb-engineer` to apply on your go.

### Not checked

- The real page. None was supplied.
- Whether the title and description are unique across the site. That needs the full page list.
- Anything added by scripts after load. The check reads server HTML only.
- Whether the title carries the page's target phrase. No phrase was given.
- Titles are not checked for dashes, by rule.

Next most useful check: the JSON-LD on the same page.
