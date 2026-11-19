# QA checklist: the publish gate

Run on the rendered page, never on the source. For track 2 pieces, mark a media or layout check that does not apply as not applicable, with the reason. Output is a pass or fail table with `[passed]/[applicable]`. A page ships only when every applicable check passes or the owner accepts a named exception.

## Breakpoints

Look at 375, 768 and 1200. Run the gate at 375, 767, 768, 769, 1199, 1200 and 1201. Never call something checked from code alone.

## Order, verdict and hard stops

- Order the checks cheap first: the automated script, then the manual read.
- Rank findings must, should, nice. Change nothing until the owner picks.
- Verdict: publish, publish with fixes, or no.
- Hard stops that block publishing whatever else passes: an unsourced factual claim, an undisclosed relationship, no date on time-bound content.

## Content

- [ ] One copy of the story; no short-copy duplicate.
- [ ] Every heading is a claim of 70 characters or fewer; the first sentence answers it.
- [ ] No banned words; British English; sentence case.
- [ ] No em or en dash anywhere in visible text, including `aria-label` and the `main` label.
- [ ] Every claim has a screen, a sourced number or a named fact; no "unvalidated" claim shown as fact.
- [ ] Every metric has value, what, period, baseline or benchmark, source and as-of date, or is marked "unvalidated" (`copy-and-seo.md`).
- [ ] Every number is identical everywhere it appears on the page and in its other forms.
- [ ] Approvals recorded for logos, screens, metrics and quotes.
- [ ] Not-templated test: hero line, headings and one signature layout would not fit another client unchanged.
- [ ] No placeholder text in copy (`TBD`, `[INSERT`, `lorem`).
- [ ] Every visible string reread before ship; screenshots are current; permission for each quote is held.
- [ ] Every media item has alt (125 characters or fewer) and a caption.
- [ ] Every own-folder file is accounted for: on the page, in All screens, or listed as not rendered with a reason.
- [ ] No borrowed or wrong-client files on the page.
- [ ] Chapters of 30 to 150 words (160 tolerated in evals).

## Technical and SEO

- [ ] Exactly one h1; heading levels never skip.
- [ ] Every `section` has an id and an accessible name; every chapter `article` has a unique id and an h2.
- [ ] Every `img` has alt, width and height.
- [ ] `<title>` 60 characters or fewer; meta description 140 to 160; canonical points to itself.
- [ ] JSON-LD has WebPage, CreativeWork and BreadcrumbList on the canonical host; none of the banned types.
- [ ] All content present with JavaScript off.
- [ ] Structured data passes a schema validator.
- [ ] Every link resolves; list source, target and status. A broken link is fixed at the link, never by a redirect.
- [ ] Every custom block type in the body has a renderer; an unknown type fails the gate.
- [ ] Every media URL returns 200; none is a duplicate.

## Media and layout

- [ ] No page-level horizontal overflow (`scrollWidth === clientWidth`) at every gate width.
- [ ] Aspect ratio kept on every image and video: no stretching, no squashing.
- [ ] No mask and no `object-fit: cover` hides the part of a screen that proves the claim.
- [ ] Files shown larger than their natural size are listed; one that looks soft is flagged (a flag for the owner, not a fail).
- [ ] Styles pair 50:50 at native ratio.
- [ ] Rails: labelled region or group, `aria-roledescription="carousel"`, slides as groups with `aria-roledescription="slide"` and a name, counter, buttons, items 85vw or less on mobile, no auto-advance.
- [ ] Viewer has a visible close button; Escape closes it; focus returns to the thumbnail.
- [ ] At most 2 mockups; never the hero when a project-specific visual exists.
- [ ] At most 1 full-bleed per chapter; no more than 2 zigzags in a row.

## Accessibility

- [ ] Loops: `muted playsinline`, load when near. A loop of 5 seconds or less with no control has `aria-hidden`; a loop over 5 seconds (duration from the manifest) has a pause control and no `aria-hidden`. All loops stop under reduced motion and pause off screen.
- [ ] Long videos: muted, play and pause button only, not `aria-hidden`, `preload="none"`, with an `aria-label`.
- [ ] No audio plays anywhere.
- [ ] Keyboard and screen reader pass through every rail and the viewer.
- [ ] Content reflows at 320 px and at 400% zoom.
- [ ] Automated accessibility scan: zero serious or critical issues.
- [ ] Body text 16 px or larger.
- [ ] Contrast AA on all text, including the client accent; accent 3:1 or more for rules and numerals.
- [ ] Targets 44 px or more (the house rule; WCAG 2.2 AA asks for 24); focus visible; reduced motion stops loops and reveals.
- [ ] Controls and arrows hold 3:1 contrast against what is behind them.

## Performance

- [ ] Hero image high priority and not lazy; all other images lazy and async.
- [ ] Rendered media bytes per page 25 MB or less (warn above, with the largest files listed).
- [ ] Core Web Vitals on mobile: LCP 2.5 s or less, INP 200 ms or less, CLS 0.1 or less. Report the measured values and the tool.

## Design system

- [ ] Token findings from `wugweb-kits` are listed with file and line (handoff 4 in `handoffs.md`). Reported only at first; blocking comes later, on a short list the owner sets (owner, 2026-11-16).

## Design critique

- [ ] Hierarchy, focal point, rhythm, contrast, consistency and legibility each score 3 or more at 375 and 1200 (see `design-principles.md`).

## Housekeeping

- [ ] Changelog entry for the change.
- [ ] Commits by path only.
- [ ] Nothing deleted; dead links listed, not removed.

## Automated part

`scripts/check-case-page.mjs <url> [--host <canonical host>]` covers the static checks: headings, sections, articles, images, dashes, rails, videos, title, description, canonical, JSON-LD, media status and byte total. Overflow, aspect ratio, masks, contrast, targets, reduced motion and the critique are checked in the browser at each width.
