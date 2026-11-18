# Blind test

How to test whether drafts written with this skill can be told apart from the owner's real writing. Status: waiting on samples; it needs held-back samples in a mode before it can run.

The method comes from the research report "Voice calibration method" (2026-11-16, in this project). No source sets a pass mark or a confidence scale for a voice test, so every threshold below is a starting point for the owner to set.

## What the evidence says

| Finding | Why it shapes the test | Source |
| --- | --- | --- |
| Style signal appears at a few hundred words, but often settles only at 2,000 to 5,000, and some authors never settle | Counts are minimums; stability is the test | Eder 2010, 2017 |
| Function words and punctuation hold across topics; vocabulary and character patterns partly measure topic; sentence length can reverse between topics | Prefer structure rules; treat word rules as topic-bound until seen across topics | Stamatatos 2017; survey arXiv 2310.00436 |
| Training on one genre and testing on another gave 36%; training on five genres gave 75 to 82% | Calibrate per mode, and pool modes for cross-mode rules | Goldstein-Stewart et al. 2009 |
| Real unseen text by the same author matched its own style model only 69 to 82% of the time | Score drafts against a ceiling (his unseen text), not against 100% | arXiv 2509.14543 |
| Untrained human judges scored at chance; experts who knew the author picked the real text 51% of the time against 20% chance | People are weak judges; report results against chance | Clark et al. 2021; Schwitzgebel et al. |
| A poetry study used 5 real and 5 generated items, the first outputs with no selection, and left out famous pieces | The item design below | Porter and Machery 2024 |
| Starting a generated text with a real opening roughly doubled its "human" rating | Never copy his openings into drafts | arXiv 2509.14543 |
| Swapping the order of two texts flipped an AI judge's verdict 88% of the time | Run AI judges in both orders; drop flipped verdicts | ExPerT, arXiv 2501.14956 |
| Three kinds of judge barely agreed with each other | Never let one judge pass a draft | ICML 2026 |
| Writers did not feel more ownership of text closer to their style | Record the owner's sign-off as a separate result | Draxler et al. |

## Design

1. **Items.** For a mode, take five held-back real pieces. For each, write a short content brief (what it says, not how) and generate one draft from that brief with the skill. That gives five real and five generated items on the same content and of similar length.
2. **No picking.** Use the first draft generated for each brief. Leave out his best-known pieces.
3. **No openers copied.** Never start a draft with his real opening line.
4. **Blind and shuffled.** Remove labels, shuffle the order, and give each judge the same set.
5. **Judges.** The owner, and one or two colleagues who know his writing. Show each judge two labelled real examples first. Ask for a reason with every guess.
6. **Floor.** Add one piece on the same topic by another writer, if one is available, to check the judges can spot an outsider at all.

## Scoring

- Count correct guesses per judge. With 10 items, a judge needs 9 or 10 right to beat guessing at the usual 5% level (exact binomial, worked here, not from a source: 9 or more of 10 by guessing has about a 1.1% chance, 8 or more about 5.5%).
- Report the result as "detected" or "not detected at 10 items". Never as "indistinguishable" or "passed": with this few items, a judge who can really spot drafts most of the time will often still score below the line.
- Report agreement between judges when there are two or more. Krippendorff's alpha bands: 0.800 or more reliable, 0.667 to 0.800 tentative, below 0.667 discard.
- Record the owner's own sign-off separately from the judges' score.
- Keep every judge's reasons. A reason repeated by two judges ("too tidy", "he never opens like that") becomes a candidate rule for the owner to rule on.

## When a mode is tested

- After the first fill of that mode's rules (order of work, step 6).
- After any change to a rule that applies to the mode.
- After a sample cited by its rules is removed.

## Not decided (owner)

- The share of samples held back per mode (suggested one in five).
- How many items a test uses.
- What result moves a mode to high confidence.
