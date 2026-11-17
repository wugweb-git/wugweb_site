# Media standard

How media is found, measured, grouped and described. Media lives only in the media store. This skill reads it and never changes it.

## The rule

Owner, 2026-11-16. This is the one home of the media rule; every other file points here.

| Matter | Rule |
|---|---|
| Files | Media stays in the media store as the owner put it there. No uploads, no local copies, no cropped files, no re-encoding, no new poster files |
| Size | Media may be shown at any size as long as the original aspect ratio is kept. No stretching, no squashing |
| Masks | Clipping masks are allowed: rounded corners, a device shape, a reveal. The file is untouched |
| Sound | None |

Three readings of the rule, confirmed by the owner on 2026-11-16:

1. Resizing and masks are done on the page, in CSS only, never by making a new file.
2. A mask must not hide the part of a screen that proves the claim.
3. A file shown larger than its natural size is flagged when it looks soft. It is a quality flag, not a ban.

Weight, missing posters and `moov` at the end of an mp4 are reported as facts. The page defends itself with sizes, lazy loading, `preload="none"` and `content-visibility`. When a file does not fit, say so and let the owner decide.

One exception (owner, 2026-11-11): for a Form only, a media-making helper may make one file at a time, after the owner's yes for that file. See the gate for new files in `forms.md`.

## Folder rules

- One folder per case study, named after the slug: `work/<slug>/`.
- Own folder is decided in this order: folder of the cover path, folder of the thumbnail path, the folder named after the slug, then the majority of body images. Cross-check the winner against the slug and short-title words; on disagreement prefer the folder named after the slug. Print the decision.
- Files from another case study's folder are "borrowed". Borrowed files leave the body in the proposal; the files are never touched.

## Manifest entry

```
{ url, source: body|folder, label, kind, section, order, permission,
  type: image|video|gif, w, h, bytes, duration?, moovAtEnd?,
  poster?: url|null, status, shape, flow?, audience?, dupOf?, suspect? }
```

- `w`, `h`: read from file headers with a ranged request; nothing is downloaded whole or saved.
- `bytes`, `status`, ETag, Last-Modified: from a HEAD request.
- `audience`: member, admin, public, partner (from the visual read).

## Shape

Ratio r = h / w.

| Shape | Rule |
|---|---|
| phone | r ≥ 1.75 |
| tall | 1.2 ≤ r < 1.75 |
| square | 0.85 ≤ r < 1.2 |
| landscape | 0.5 ≤ r < 0.85 |
| wide | r < 0.5 |
| scrollshot | w ≥ 1280 and r ≥ 1.75 (a desktop full-page capture, not a phone) |

## Flows and grouping

- Folder files group into flows by numeric prefix runs, `Group NNNNN` sequences or a shared stem; the flow name is the humanised stem, else "Screens".
- The visual read then corrects the order by `step` and adds `audience`. Groups are audience first, then flow.

## Duplicates and suspects

- Duplicate (`dupOf`): same bytes, or same size with a name pair such as `Style1` and `styles-image-1`, or `Cover` and `cover-image-*`. A low-resolution copy of a video points to the larger file.
- Near-duplicate (`nearDupOf`): found by looking, in the visual read.
- Suspect: a file name with another client's brand, or stock-style numeric names ("stock?"). Suspects are listed, never dropped.

## Budgets and reports

Report per case study:

- Dead links (status not 200). They stay in the source; the page skips them.
- Images over 4 MB; videos over 10 MB.
- Total rendered bytes per page; warn above 25 MB. Meet the budget by showing less at first, never by making smaller files.
- Videos with `moov` at the end; videos without posters.
- Duplicates and suspects.

Every number in these reports is summed by a script, never estimated. Count the files first and recount before finishing. A manifest never says "and so on"; if stopping early, stop at a clean point and say X of Y.

Known gap: nothing here lists the objects in a media store folder. The audit script measures files that the body or the record already links. A folder listing needs its own read-only script or the owner's list; commands that write, delete or download are forbidden.

## Video

- 15 seconds or less: loop, muted, playsinline.
- Longer: muted, click to play, play and pause button only, or left off the page when a short cut of it exists.
- No poster file: use the best start frame from the visual read as `src="…mp4#t=<s>"` with `preload="metadata"`. No new file is made. This is unverified on iPhone Safari: test it before relying on it, and fall back to a plain surface until the video is near.
- Audio is reported only. Nothing plays sound. When a long video carries speech, say so: muted, it may lose its meaning, and the owner decides whether it stays.
- A loop is 15 seconds or less. A loop longer than 5 seconds has a pause control and is not hidden from assistive technology; a loop of 5 seconds or less with no control stays hidden. All loops stop under reduced motion and pause off screen (owner, 2026-11-17; the control is built by `wugweb-kits`).
- A video on a third-party player shows a lightweight preview and loads the player on click.

## Alt text and captions

- Alt: 10 to 125 characters, and it agrees with the caption. Long detail goes in the caption.
- Per file, record: alt present, alt specific to that image, no alt repeated across images, width and height known. Flag alt that is missing, a file name, or generic.
- Alt: 125 characters or fewer. Says what the screen shows and what it lets the user do. Never "screen" or "image of". A purely decorative image has `alt=""`. Owner-edited alt always wins.
- Caption: 25 words or fewer. Says why the screen matters to the chapter's claim.
- Both are written only after the screen has been seen close up (see `visual-read.md`), and both are proposals until approved.

## Honest media

- Real artefacts only. No stock used as filler and no fake interface built from markup to stand in for a screen.
- No device-frame image is made. An existing mockup is used as it is, within the mockup limits in `layout-grammar.md`. A device shape may be a clipping mask on the page.
- A moodboard is labelled as exploration, not as the delivered work.
- Before and after is used only when a real "before" exists and may be shown.
- Each record carries `permission`: approved, pending or not asked (see `copy-and-seo.md`).

## Permissions and privacy

- Placeholder text and sample personal data inside screens are flagged in the visual read. The critical test decides: a screen that is the only proof of a flow, step or feature stays and the flag is recorded; otherwise it is hidden by default, kept in the store and the source, and listed.
- Real personal data (real names, ID numbers, faces of private people) is raised with the owner before the page ships.
