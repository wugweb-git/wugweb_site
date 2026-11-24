# Eval audit-schema: JSON-LD on a case-study page

Prompt: Check the JSON-LD on a case-study page.

Files read: SKILL.md, LESSONS.md, references/audit.md, references/handoffs.md, references/standing-rules.md, README.md (commands), examples/page-pass.html, examples/page-fail.html. Scripts run (read-only): `node scripts/check-page.mjs examples/page-pass.html --kind work --host wugweb.com` and the same on `examples/page-fail.html`.

## Response

No page was named, and I cannot reach the live site. So I ran the check on the two example case-study pages the skill ships. These are test files, not live wugweb.com pages. Send the rendered HTML or address of the real page and I will run the same check on it.

The rule for a case study on wugweb.com: `WebPage`, `CreativeWork` and `BreadcrumbList`; Wugweb is `creator` and `publisher`; no `author`; no `HowTo`, `Review` or `AggregateRating`; `FAQPage` only for questions the page shows, and a case study carries none.

### Example 1: examples/page-pass.html

```
1 page (work). no findings. 17 checks passed.
```

Schema checks: `schema-parses`, `schema-banned-type`, `schema-faq-content`, `schema-required-types`, `schema-no-author` and `schema-context` all pass.

By reading the block:

- One graph holds `WebPage`, `CreativeWork` and `BreadcrumbList`.
- `CreativeWork` has Wugweb as `creator` and `publisher`, and no `author`.
- `@context` is exactly `https://schema.org`. Addresses are absolute and on wugweb.com.
- No date in the schema and none shown on the page, which is right for a case study.
- The name "Care booking flow" in the schema is not the page's H1 ("A booking flow families finish in one sitting"). Every schema value should be visible on the page. I could not confirm this one from the HTML; check it on the rendered page.
- The last breadcrumb item has `position` and `name` but no `item`. The house rule asks for all three. I am reporting it, not raising it as a finding; as far as I recall, Google's breadcrumb guidance allows the last item to omit it, and I have not re-read that page today.

It passes the scripted checks.

### Example 2: examples/page-fail.html

```
1 page (work). 2 blockers, 3 high, 1 low (schema checks only).

BLOCKER  JSON-LD            1 of 2 blocks do not parse                 schema-parses
BLOCKER  JSON-LD            HowTo present                              schema-banned-type
HIGH     FAQPage            no questions in mainEntity                 schema-faq-content
HIGH     JSON-LD            missing WebPage, BreadcrumbList            schema-required-types
HIGH     CreativeWork       needs creator and publisher, and no author schema-no-author
LOW      JSON-LD            1 block does not use @context https://schema.org schema-context
```

Those lines are taken from the full run, which found 4 blockers, 7 high, 4 medium and 1 low on this page. Two of the other blockers come first: the page carries `noindex`, and its canonical points at a staging host over http. Schema on a page that is not indexable does no work.

```
SEO fixes: example page (examples/page-fail.html), 2026-11-19
To: site code
Scope: the JSON-LD emitted on /work/<slug>
1. BLOCKER Remove or repair the second JSON-LD block, which is not valid JSON. Check: schema-parses passes
2. BLOCKER Remove the HowTo node. Check: schema-banned-type passes
3. HIGH Remove the FAQPage node; it has no questions and a case study shows none. Check: schema-faq-content passes
4. HIGH Add WebPage and BreadcrumbList to the graph. Check: schema-required-types passes
5. HIGH On CreativeWork, remove author and set Wugweb as creator and publisher. Check: schema-no-author passes
6. LOW Set @context to https://schema.org. Check: schema-context passes
Copy, layout and tokens are out of scope.
```

If any of these values come from a Sanity or Notion field, that part goes to `wugweb-engineer`, which applies it on your go.

### Not checked

- The real page. None was supplied.
- Whether every schema value is visible on the rendered page.
- JSON-LD added by scripts after load. The check reads server HTML only.
- The search engine's rich results test, and the live page after deploy.
- The `Organization`, `WebSite` and founder nodes the layout emits. The example files do not include them; on the real page they stay as they are.

Next most useful check: the canonical and robots meta on the same page.
