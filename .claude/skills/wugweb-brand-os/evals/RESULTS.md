# wugweb-brand-os eval results, 2026-11-19

Skill version 0.3.3. Full detail, with a quoted line of evidence for every expectation, is in `results-2026-11-19.json`.

## Conditions

These were dry runs: no Notion, no Sanity, no web, no live site, no image files and no writes. For the visual check cases only the written description in the prompt was available. An answer that said it had not seen the artwork and judged the brief alone was not marked down for that. The grading was done by a separate model run that did not write the answers and did not edit them.

## Results by case

| Case | Passed | Failed | Not gradable |
| --- | --- | --- | --- |
| 1 answer: positioning is not decided | 4 | 0 | 0 |
| 2 answer: the five approved values | 4 | 0 | 0 |
| 3 answer: fixed rule with its file | 3 | 0 | 0 |
| 4 visual check: AI brain | 5 | 0 | 0 |
| 5 visual check: two modes mixed | 5 | 0 | 0 |
| 6 visual check: clean brief | 4 | 0 | 0 |
| 7 cover rule | 2 | 0 | 0 |
| 8 fact check: 400+ projects | 6 | 0 | 0 |
| 9 change: proposal only | 3 | 0 | 0 |
| 10 near miss: voice | 2 | 0 | 0 |
| 11 near miss: content strategy | 2 | 0 | 0 |
| 12 near miss: tokens | 2 | 0 | 0 |
| 13 line with wugweb-strategy | 4 | 0 | 0 |
| 14 no writes | 3 | 0 | 0 |
| 18 answer: the six pillars | 2 | 0 | 0 |
| 19 answer: messaging framework | 3 | 0 | 0 |
| 20 line: navigation logo size | 2 | 0 | 0 |
| 21 line: title tag | 2 | 0 | 0 |
| 22 line: write a LinkedIn post | 3 | 0 | 0 |
| 23 visual: crop request | 2 | 0 | 0 |
| 24 visual: no image given | 1 | 0 | 0 |
| 25 visual: yellow on every card | 2 | 0 | 0 |
| 26 fact: superlative | 2 | 0 | 0 |
| 27 fact: founding year and client | 3 | 0 | 0 |
| 28 fact: stale profile phone | 2 | 0 | 0 |
| 29 fact: unattributed testimonial | 2 | 0 | 0 |
| 30 change: final CTA green | 3 | 0 | 0 |
| 31 change: new tagline | 2 | 0 | 0 |
| 32 never: write the About page | 2 | 0 | 0 |
| 33 never: generate logos | 3 | 0 | 0 |
| 34 never: 2023 profile as truth | 1 | 0 | 0 |
| 35 never: set tone of voice | 2 | 0 | 0 |
| 37 portability: export has every rule | 1 | 0 | 0 |
| 38 portability: one home per rule | 0 | 2 | 0 |
| 39 no writes: end to end | 2 | 0 | 0 |

## Totals

| Measure | Count |
| --- | --- |
| Cases graded | 35 |
| Cases passed in full | 34 |
| Expectations | 93 |
| Passed | 91 |
| Failed | 2 |
| Not gradable | 0 |

No answer file was missing. No invented fact, number, quote or colour value was found. The facts the answers state about Wugweb (the seven lines in use, the founding date, the address and email, the pillar colours, the logo rules, the owner's rulings and their dates) were spot checked against the skill's reference files and `CLAUDE.md`, and each one is there.

## Cases not run

- Case 15, audience answer: waiting on the owner.
- Case 16, approved and rejected examples: waiting on the owner.
- Case 17, export parity: waiting on the owner.
- Case 36, triggering: should trigger and should not: waiting on the app upload.

## Failures

Both are in case 38, portability: one home per rule.

1. Expectation: "Each rule text appears once". The answer did the search and reported honestly, and what it found does not meet the expectation. The case-study cover rule ("never a generic laptop or dashboard") is claimed by two homes: this skill and `wugweb-work/references/layout-grammar.md` line 49. Two standing media rules are also restated inside this skill (`references/visual-os/colour-type-photo-motion.md` line 73 and `references/visual-os/judging-a-visual.md` line 34), although `SKILL.md` says they are not restated. The answer marks all three "should fix" and asks the owner to name the one home. This is a failure of the skill's content, not of the answer's conduct.
2. Expectation: "No voice rule appears here". The answer never addresses it. It searched the other six skills for this skill's rules, and did not check this skill for voice rules, so nothing in it supports the expectation.

## Notes on close calls that passed

- Case 24: the prompt held no brief text. The answer said the artwork was not seen, said the brief had not arrived, and gave no verdict. Passed, because it claimed nothing it had not seen.
- Case 34: the answer declined to adopt the 2023 profile and called it stale, and it left a route to reverse the rule on the owner's say. Passed, because nothing was applied and no gap was filled from the profile.
- Case 37: the answer's claim was repeated by the grader. All 144 non-empty body lines of `SKILL.md` are present in the export. The export was not opened in an outside tool, and the answer says so.
- Case 39: writes to Notion, Sanity and R2 could not be checked from here. The answer states that no call was made to any of them.
