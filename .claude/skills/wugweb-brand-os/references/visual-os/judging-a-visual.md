# Judging a visual

The full method for the visual check. The short version is in `SKILL.md`; the checklists and scoring are in `../review-gates.md`.

This needs a model that can see images. Without one, judge the written brief only and say plainly that the artwork was not seen. Judge the rendered result, never the source or a description of it. If the render was not actually seen, say so.

## Before judging

1. What is it, and where will it appear?
2. What is its one claim?
3. Which of the five modes does it use? (See `art-direction.md`.)
4. What size will it really be seen at?

## The two-second test

Look away, look back, and answer:

- What does the eye hit first?
- Is that the right thing?
- What does it feel like?
- Is the purpose clear without the headline?

Then squint, or view at a quarter of the size, and check it still reads: one focal point, a clear reading path, still legible at half size. Then view it in black and white and check the hierarchy holds without colour.

## Describing it, in a fixed frame

Write one line for each, from what is visible:

| Part | Questions |
|---|---|
| Subject | What is shown? Is it a metaphor, an object, a person, an interface? |
| Composition | Where is the anchor, how much of the canvas does it take, where is the empty space, what is the reading order? |
| Colour | How many accents, which roles, is any colour doing two jobs? |
| Lighting and treatment | Is photography monochrome and high contrast? Is the treatment consistent across parts? |
| Type | How many typefaces, what scale, is any in-image text needed? |
| Format fit | Does it suit the format's job and the size it is seen at? Does the anchor survive a change of shape? |

Keep what you see apart from what it means.

## Hierarchy

- Does hierarchy come from size, spacing and contrast, not from colour alone?
- Is there one primary focus?
- Is the empty space doing a job?
- Are structural devices (numbers, labels, rules) carrying real information, or only decoration?

## Brand checks

- One metaphor, one anchor, no competing focal point.
- Rounded language, asymmetrical balance, breathing room.
- A limited palette with two to four accents.
- Nothing from the banned list.
- The fixed brand rules in `SKILL.md` hold.
- The media rules in `docs/skills/STANDING-RULES.md` hold: no file is cropped or re-encoded, resizing keeps the ratio, a mask does not hide the proof, a file shown larger than its natural size is flagged, not banned.
- No generated imagery passed off as a real screen, result or photograph.
- A real logo file is used wherever a logo appears.

## The look-alike test

Ask: would this come out the same for any similar brief? Does it read as a template? Could a stranger name the template? Signs of a generic look: identical rounded cards, one accent on near-black used as a default, stock imagery, pale gradients, all-caps labels used as decoration, a hero that is an abstract shape instead of the real subject. If it is generic, put the subject's own world into it.

## Ranking findings

| Rank | Means |
|---|---|
| Must fix | Breaks a brand rule, a media rule or a gate, or carries risk |
| Should fix | Inconsistent with the system or weakens the concept |
| Nice to have | A preference |

Separate real problems from taste. For each finding give where, what, why and a fix. Offer an alternative in the piece's own style. Say what works. Match the depth of the review to the stage of the work: early work needs direction, late work needs polish.

## Closing a review

1. Overall impression in two or three sentences.
2. Findings, ranked.
3. What works.
4. The top three fixes, in order.
5. Pass or fail, with the score from `../review-gates.md`.

To improve a failing piece, remove or replace the weakest part. Do not add to it.

## For decks and carousels, also check

- One message per slide, and every slide has a visual part.
- One motif repeated, with no accent lines under titles and no edge stripes.
- Layouts vary, and titles of the same kind sit in the same place.
- The pattern breaks about a third and two thirds of the way through.
- Overflow, overlap, uneven gaps, tight margins, misalignment, low contrast, broken words and drift between slides.

## What this skill does not judge

- Interface usability, design-system consistency and accessibility: `wugweb-kits`.
- Wording and tone of any text in the piece: `wugweb-voice`.
- Whether the piece should exist, or when: `wugweb-strategy`.
- Search markup and alt text rules: `wugweb-seo`.
