# Deck

## Takes

- One claim per slide; the screen does the talking.
- Whether the deck is read alone or presented decides the word count. Say which it is.
- Order: title (client and what was built), the tension, the claim slides with their proof screens, results with sources (only when they exist), then delivered facts and credits at the end.

## Leaves out

- A slide with no body line.
- More than two device mockups.
- Cropped screens. A screen keeps its ratio.

## Steps

1. Outline: slide number, claim, screen, body line.
2. Use only `wugweb-kits` tokens for colour, type and spacing. Type sizes by role come from its component sizes reference (`.claude/skills/wugweb-kits/references/component-sizes.md` in this repository) (owner, 2026-11-17): title `--type-graphic-l`, subtitle or key figure `--type-graphic-m`, label `--type-graphic-s`, body `--fluid-body-md` or `--fluid-body-sm`. The text holder is a size container. No new token; the values live in kits only.
3. Voice check on the slide text.
4. Build the file with the deck helper in `skill-map.md`.
5. A deck that will be sent or posted goes through `publish-approval.md`.

## Check

No slide without a body line. No text overflows its slide. No placeholder text is left. Count the slides and the ledger rows; they match.
