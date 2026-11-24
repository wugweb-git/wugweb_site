# Eval audit-keyphrase-score: keyphrase score for "care booking"

Prompt: Score this case-study page for the focus keyphrase care booking.

Files read: SKILL.md, LESSONS.md, references/audit.md, references/handoffs.md, references/standing-rules.md, README.md (commands), examples/page-pass.html, examples/score-good.html. Scripts run (read-only): `node scripts/score-page.mjs examples/page-pass.html --keyword "care booking" --host wugweb.com` and the same on `examples/score-good.html`.

## Response

No page came with the request, and I cannot reach the live site. So I scored the example case-study page the skill ships, `examples/page-pass.html`. It is a test file, not a live wugweb.com page. Send the rendered HTML or address of the real page and I will score that.

**Score: 14 of 100 (bad), for "care booking", on the example page.**

```
On-page keyphrase score: 14/100 (bad). Focus keyphrase: "care booking".

FAIL  0/36  keyword-in-title
ok    5/5  keyword-in-permalink
FAIL  0/3  keyword-in-first-10pct
FAIL  0/3  keyword-in-content
FAIL  0/3  keyword-in-subheading
FAIL  0/2  keyword-in-image-alt
FAIL  0/2  keyword-in-description
FAIL  0/3  title-starts-with-keyword
FAIL  0/6  keyword-density  (0.00%)
warn  0/0  keyword-not-used-before  (warning: needs a site-wide phrase map; not scored)
FAIL  0/8  content-length  (191 words)
ok    2/6  has-image-or-video  (2 images, 0 videos)
ok    3/3  short-paragraphs
FAIL  0/2  table-of-contents
FAIL  0/5  internal-link
FAIL  0/4  external-link
FAIL  0/2  not-all-links-external
ok    4/4  permalink-length  (18 chars)
FAIL  0/1  title-sentiment
FAIL  0/1  title-power-word
FAIL  0/1  title-number

Earned 14 of 100 applicable points. Bands: bad <=50, ok 51 to 80, great >80.
This score reports; it writes no copy. Fixes go to wugweb-work (wording) or a developer (markup).
```

### What is weak

- **The phrase is only in the address.** The slug is `/work/care-booking`, but the exact phrase "care booking" is not in the title, the description, the body, a subheading or an image alt. The page says "booking flow" and "care provider" instead. That costs 58 of the 100 points, 36 of them on the title alone.
- **Length.** 191 words in the body scores 0 of 8. The first band starts at 600 words.
- **Links.** No internal link and no external link: 0 of 11.
- **No table of contents, and no sentiment word, power word or number in the title:** 0 of 5.

What already earns points: the phrase in the slug, a short address, short paragraphs, two images.

### How to read it

- The score is modelled on Rank Math and built faithful to it, by your decision of 2026-11-17. That is why density, the phrase in a subheading and the title readability tests are scored here. Outside the score, this skill still proposes no density target and asks for no heading rewrite.
- The score reports. It does not rewrite. Whether the page should use the exact phrase at all is a wording choice: it goes to `wugweb-work` as a finding, and a case study's headings stay claims.
- "Keyword not used before" is a warning only. It needs a site-wide phrase map, which does not exist yet.
- This is the search score. The citability score, the AI-answer score, is separate and was not asked for.

For comparison, the shipped fixture `examples/score-good.html` scores 89 of 100 (great) for the same phrase. It is a test page built to pass each test, with a density of 13.55%; it is not a model to write towards.

### Fix list, one page (to wugweb-work, as current → proposed)

1. Title: exact phrase absent → finding only: the phrase "care booking" is not in the title. Check: `keyword-in-title` scores 36.
2. Description, opening of the body, one image alt: exact phrase absent. Check: the matching tests score.
3. Links: none → one link up to the service page and two or three across to sibling pages, with descriptive anchors. Check: `internal-link` scores 5.

### Not checked

- The real page. None was supplied.
- The 17 page checks, the crawler check and the citability score.
- Whether another page already targets "care booking".
- Whether "care booking" is the right phrase. No search data was given; the phrase is unvalidated.

Next most useful check: the citability score for the same page, which is the other half of the scoring step.
