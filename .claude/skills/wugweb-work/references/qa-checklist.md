# QA checklist: the publish gate

Run on the rendered page, never on the source. For track 2 pieces, mark a media or layout check that does not apply as not applicable, with the reason. Output is a pass or fail table with `[passed]/[applicable]`. A page ships only when every applicable check passes or the owner accepts a named exception.

## Breakpoints

Look at 375, 768 and 1200. Run the gate at 375, 767, 768, 769, 1199, 1200 and 1201. Never call something checked from code alone.

## Order, verdict and hard stops

- Order the checks cheap first: the automated script, then the manual read.
- Rank findings must, should, nice. Change nothing until the owner picks.
- Verdict: publish, publish with fixes, or no.
- Hard stops that block publishing whatever else passes: an unsourced factual claim; an invented number or quote; an undisclosed relationship; no date on time-bound content; a form made from an unapproved body; a track 2 piece with no brief; any write without the owner's approval.
- Count the deliverables before finishing: what was asked for against what is delivered, as X of Y.

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
- [ ] Every media item has alt (10 to 125 characters) and a caption.
- [ ] Personal data is scanned out of the screens: every screen was read for names, numbers and faces; sample data is judged by the critical test and real personal data is raised with the owner (`media-standard.md`).
- [ ] One spelling per entity, and the client's own terms kept (`evidence.md`).
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
- [ ] Structured data passes a schema validator and the Rich Results Test.
- [ ] `dateModified` changes only for a real content edit; with none on record it equals `datePublished` (`schema-jsonld.md`).
- [ ] Every link resolves; list source, target and status. A broken link is fixed at the link, never by a redirect.
- [ ] Every custom block type in the body has a renderer; an unknown type fails the gate.
- [ ] Every media URL returns 200; none is a duplicate.

## Media and layout

- [ ] No page-level horizontal overflow (`scrollWidth === clientWidth`) at every gate width.
- [ ] Aspect ratio kept on every image and video: no stretching, no squashing.
- [ ] No mask and no `object-fit: cover` hides the part of a screen that proves the claim.
- [ ] Files shown larger than their natural size are listed; one that looks soft is flagged (a flag for the owner, not a fail).
- [ ] Styles pair 50:50 at native ratio.
- [ ] A small file sits in a contained cell; none is shown above its natural size by the layout.
- [ ] First screen on a 390 by 844 phone: the headline, subhead and primary action are visible without scrolling.
- [ ] Yellow stays under 10% of the page; the footer call to action is yellow and is the page's one yellow note; no second call to action.
- [ ] Rails: labelled region or group, `aria-roledescription="carousel"`, slides as groups with `aria-roledescription="slide"` and a name, a visible counter that shows the position ("3 of 8"), previous and next buttons, items 85vw or less on mobile, no auto-advance.
- [ ] All screens: the set chips show every set with its count, one chip is selected at a time, and the thumbnails keep their own ratio.
- [ ] Viewer shows the caption, then the position and set as "n of N, set name"; swipe works as well as the previous and next buttons, which are real buttons of 44 px or more.
- [ ] Viewer has a visible close button; Escape closes it; focus returns to the thumbnail.
- [ ] With JavaScript off, every All screens set renders stacked under its own heading, with every thumbnail and caption.
- [ ] A video over 15 seconds never loops in a rail; it sits in its own chapter, muted, click to play.
- [ ] At most 2 mockups; never the hero when a project-specific visual exists.
- [ ] At most 1 full-bleed per chapter; no more than 2 zigzags in a row.

## Accessibility

- [ ] Loops: `muted playsinline`, a poster or start frame, the source in `data-src`, load when near. A loop of 5 seconds or less with no control has `aria-hidden`; a loop over 5 seconds (duration from the manifest) has a pause control and no `aria-hidden`. All loops stop under reduced motion and pause off screen.
- [ ] Long videos: muted, play and pause button only (no unmute control, no native volume controls), not `aria-hidden`, `preload="none"`, with an `aria-label`.
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

- [ ] Tokens only (`layout-grammar.md`): no hardcoded colour, spacing, radius, opacity, shadow, blur, z-index or easing; buttons `--radius-sm`, chips `--radius-full`, cards `--radius-lg`; reveals through `data-reveal` and `data-scroll`.
- [ ] Token findings from the `wugweb-kits` scan are listed with file and line (handoff 4 in `handoffs.md`). Reported only at first; blocking comes later, on a short list the owner sets (owner, 2026-11-16).

## Design critique

- [ ] Hierarchy, focal point, rhythm, contrast, consistency and legibility each score 3 or more at 375 and 1200 (see `design-principles.md`).

## Measured numbers from a helper

When a UX audit helper is run on the rendered page at 375 and 1200, its measured numbers go into the gate table beside the check they belong to: contrast ratios, tap target sizes, focus rings, accessible names, Hick and Fitts indices, and Gestalt proximity and similarity. A number is entered only as measured, with the tool named.

## Housekeeping

- [ ] Changelog entry for the change.
- [ ] Commits by path only.
- [ ] Nothing deleted; dead links listed, not removed.

## Automated part

`scripts/check-case-page.mjs <url> [--host <canonical host>] [--no-body]` covers the static checks: headings, sections, articles, images, dashes, rails, videos, title, description, canonical (host and path), JSON-LD, media status and byte total. The chapter check is reported as not applicable on a page that is not a case study (track 2) and, with `--no-body`, on a no-body case study. Overflow, aspect ratio, masks, contrast, targets, reduced motion, the rail counter, All screens, the viewer, the link check and the critique are checked in the browser at each width.

## Acceptance criteria per mode

A mode is finished when its conditions are met, not when its steps were run. Each row is pass or fail. One fail means the mode is not done and the next mode does not start. A condition that could not be checked is reported as `not checked` and counts as a fail.

| Mode | Passes only when all of these are true |
|---|---|
| Audit | Every finding has a location and a measurement or a quoted line. Every file in the piece's own folder is listed. Every number in the report was computed. The piece has exactly one verdict: keep, update, merge or retire |
| Brief | Every field of the template is filled or marked "to supply" with the question to the owner. The piece states one claim, one tension, one proof and one outcome. The search phrase has a source or is marked "unvalidated". No fact in it lacks a source |
| Media | Every file has status, bytes, pixel size and shape, or is marked `dead` or `unmeasured`. Duplicates are marked and point at the file kept. Borrowed and wrong-client files are flagged. The count of files equals the count in the folder listing |
| Look | Every image was opened and read close up, and every video was stepped through. Each record has what it shows, kind, audience, flow, quality and the chapter it proves, or `none`. Every flag has a call: stays, hidden or ask the owner. No caption or alt text exists for a file marked `not read` |
| Body | One copy only. Every heading is a claim of 70 characters or fewer. Every claim has a ledger row with provenance, and none is `unverified` or `conflicting`. Every own-folder file is used, sent to All screens, or listed as not rendered with the reason. The banned-word and dash checks return zero. Nothing was written to the source |
| Layout | Every block is one of the 23 types. The block plan accounts for every approved media file exactly once in a chapter or in All screens. The page was rendered and seen at 375, 768 and 1200, and the decision log holds what was seen. Nothing is cropped, nothing changes ratio, a Styles pair is 50:50, and no cell is empty |
| SEO and schema | The rendered title is 60 characters or fewer. The description is 140 to 160 characters. The canonical is the page's own address. The graph holds exactly the types the page needs, with no `author`, review stars or how-to type, and no FAQ markup on a case study. Every value in the graph is visible on the page |
| Ship | Every automated gate check passes or is not applicable. Every browser check was run at 375, 767, 768, 769, 1199, 1200 and 1201 and passes. No hard stop is open. The owner approved the preview. After the deploy, the live page matches the preview and every media address returns 200 |
| Forms | The form was made from the approved body only. Every claim in it carries the same source line as the case study. Captions for Behance are the case study's captions word for word. No slide is without a body line. Each made file had the owner's yes for that file. Nothing was scheduled or posted without the owner's yes for that post |

## Definition of done

| Stage | Done when |
|---|---|
| Audit | Every file measured and looked at close up; every claim marked backed or unbacked; findings listed with numbers that were computed, not estimated |
| Body proposal | One copy; claim headings; every screen captioned; every own-folder file accounted for; owner questions listed; nothing written to the source |
| Owner approval | The owner has approved that exact text. Only then is the source written, with a backup first |
| Page | The gate passes at 375, 768 and 1200: one h1, no skipped headings, every image with alt and size, no dashes, no sideways scroll, nothing cropped, a file shown above its natural size flagged when soft, all media muted, under the weight budget |
| Skill | With-skill runs pass every eval check the baseline fails, on 5 prompts; the owner has no open feedback |
