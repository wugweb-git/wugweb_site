# Visual read

How to look at every image and video, and what to record. Measurements cannot tell a login screen from a moodboard, and file names lie. This step is slow; it is the main running cost and it is not skipped.

## Contents

1. How to look without saving files
2. Images
3. Videos
4. The read record
5. What each kind needs
6. Sorting what was seen
7. Examples
8. Where the run was thin last time

## 1. How to look without saving files

- Open each media URL directly in the browser. Take a screenshot; zoom for detail.
- Contact sheets for a first pass: open one media URL, replace the page body with a grid of `img` tags pointing at the URLs (8 to 12 per sheet, file name as label), wait about 2 seconds, screenshot. This is only for sorting; it never counts as a close look.
- Close look before any caption or alt text: the image at about 440 px wide or larger, one screen per view.
- Facts that need pixels (dominant palette, contrast of embedded text) are computed in memory from a ranged fetch, never written to disk.
- Large sets run in parallel, one case study per worker, each returning the read as JSON only.

## 2. Images

Read a screen in a fixed order: what the eye meets first, the task it serves, the reading order, consistency. Every observation names the element and the reason.

For each image, in this order:

1. What is it? One sentence of what the screen shows.
2. What kind is it, whatever the label says?
3. Which platform, audience, flow and step?
4. Which state: empty, filled, error, success, loading, modal?
5. Anything wrong: placeholder or lorem text, sample personal data, stock, upscaled, watermark, another client's brand?
6. Which chapter's claim does it prove?
7. Would it work as the hero at small size?

## 3. Videos

- Load as `<video muted>` in the browser. Read duration, pixel size and whether an audio track exists from the element.
- Step `currentTime` by script and screenshot each step: every 1 second up to 15 seconds; every 5 seconds for longer videos, 24 frames or fewer; plus the first and last frame.
- Record what it demonstrates, whether it loops cleanly, and the best poster second.
- A low-resolution copy of another video is a duplicate of the larger file.
- An animated GIF is read like a video: look at its frames (first, last and enough between to see what it demonstrates), not the first frame alone.

## 4. The read record

Stored per case study, one file of records for each, keyed by URL and ETag so each file is read once. The records are derived data and may be committed; where they are kept on this site is in `ops-cycle.md`.

Alt text and captions are content, not derived data. They are proposed as current → proposed, and only after the owner's approval do captions go to the media labels in the source and alt text to the asset record, where that is empty, with a backup first.

| Field | Meaning |
|---|---|
| `what` | One sentence: "Onboarding step 2: phone number entry with OTP field" |
| `kind` | mobile screen, web page, dashboard, scrollshot, component sheet, style tile, moodboard, logo or mark, type specimen, colour palette, pattern, illustration, photo, mockup, print, social post, event or environment, diagram, chart, motion or prototype clip, before, after |
| `platform` | iOS, Android, web desktop, web mobile, tablet, print, social |
| `audience` | member, admin, public, partner |
| `flow`, `step` | Screens ordered by what they show, not by file name |
| `state` | empty, filled, error, success, loading, modal |
| `framed` | Device mockup or frameless |
| `textHeavy` | Yes or no |
| `pii` | Real or sample names, numbers, faces: flagged for a decision, never auto-hidden |
| `brand` | Colours as hex, type families recognised, logo present, which brand |
| `quality` | sharp, soft, upscaled, stock, placeholder or lorem, watermark, wrong client, misnamed file |
| `nearDupOf` | Visual duplicate the size check missed |
| `heroScore` | 0 to 5: project-specific, legible small, never a generic laptop or dashboard (the cover rule, held in `layout-grammar.md` section 3) |
| `alt` | 10 to 125 characters |
| `caption` | 25 words or fewer |
| Boards | A file that shows several screens on one artboard (a presentation board, a contact sheet) is one record. Its `kind` is the kind of the screens on it, with `board: true`; its `what`, `alt` and `caption` describe the board as a whole and say how many screens it holds. It never has an empty `alt` or `caption` unless it is marked `not read` or is not to be shown |
| `chapterFit` | Which chapter it proves |
| `principle` | A design principle the screen applies, with the decision (see `design-principles.md`). Optional per record, but each flow names at least one where a screen shows the decision |
| Videos add `demonstrates`, `loopable`, `posterAt`, `audio` | On top of every field above, `what`, `kind`, `alt` and `caption` included. `audio` is reported only |

## 5. What each kind needs

- UI screens: the task, the state and the one main action. Group by audience then flow.
- Dashboards and scrollshots: what data the user sees and what they can do; shown whole, with nothing that proves the claim masked.
- Mockups: marked as mockups; at most 2 on the page.
- Brand assets: read in the order idea, mark, type, colour, system, applications, motion. Record hex values and type families for the identity proposal; colour swatches render as HTML on the page.
- Style tiles: read the values; render as a pair at their own ratio; flag when shown larger than natural size and soft.
- Photos and events: who and where, only as visible; no guesses about people.
- Charts: what is measured, the period and the source if shown; numbers are taken only when legible and are still checked with the owner.

## 6. Sorting what was seen

After the read, produce per case study:

- Corrected kinds and flows in order.
- The hero pick with its reason (the agent's call, owner rule 2026-11-11).
- Wrong-client, stock, placeholder and personal-data findings, each with the critical test applied.
- Near-duplicates.
- The palette and the proposed `Accent`.
- Alt and caption proposals.
- Process steps that the screens show, each with its proving screen.

## 7. Examples

The two records below come from two different clients. The schema is the same for every client and archetype.

```json
{ "url": "…/Group 17561.png", "what": "Application start with Retrieve MyInfo and five collapsed sections",
  "kind": "mobile screen", "platform": "web mobile", "audience": "member", "flow": "Apply", "step": 4,
  "state": "empty", "framed": false, "pii": "none", "quality": ["placeholder"],
  "heroScore": 2, "alt": "NTUC U Care application start: retrieve MyInfo, then fill five sections one at a time",
  "caption": "Prefill comes before any typing, and the form opens one short section at a time.",
  "chapterFit": "Members apply in one guided flow",
  "principle": "Hick's law: one primary action per step" }
```

```json
{ "url": "…/airtel-xsafe-3.png", "what": "IndusNinja presentation board of three phone screens; the file name says Airtel Xsafe, the screens do not",
  "kind": "mobile screen", "board": true, "brand": { "which": "IndusNinja" }, "quality": ["misnamed file", "near-duplicate"],
  "alt": "Presentation board of three IndusNinja phone screens", "caption": "Three screens on one board; a near-duplicate of the single screens, so not shown.",
  "chapterFit": null }
```

## 8. Where the run was thin last time

The NTUC run wrote most captions from thumbnail views, saw videos at 2 frames only, and quoted one byte total as an estimate that was wrong. So: a caption or alt text is written only after that screen has been seen close up; videos are stepped through; every number is computed.

## The brand read

Beside the read of each file, Look mode reads the client's brand once per piece: colours, fonts and style from the client's live stylesheet and from the pixels of the screens, each with where it was read and its measured contrast. The steps and what is taken from them are in `composition.md`; the command on this site is in `ops-cycle.md`. A palette picked by eye is not a read.
