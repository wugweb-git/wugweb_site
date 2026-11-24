# wugweb-work evaluation results, 2026-11-19

Skill version 0.6.0. 24 cases, 130 expectations. Graded by a separate model run that did not write the answers. Full detail with evidence per expectation: `results-2026-11-19.json`.

## Conditions

- Cases 1, 3, 4, 5 and 8 ran with read-only access to the CMS copy of the body and the public media store. They opened real media files. Notion, the owner's source, was not readable.
- All other cases were dry runs: no live source and no render. Case 13 also read the repository record for the Brand service.
- An expectation that needs something the run could not reach is marked not gradable. An answer that says what it could not read, and does the rest properly, did not fail for that alone.
- The grader counted every stated limit itself (heading length, words per chapter, alt length, caption words, title and description length, caption matches, JSON validity). For cases 1 and 4 the grader also read the public CMS copy to check the answer's figures and quotes.

## Results by case

| Case | Name | Passed | Failed | Not gradable |
|---|---|---|---|---|
| 1 | cartier-v2-proposal | 10 | 0 | 0 |
| 2 | animal-writes-skeleton | 5 | 0 | 1 |
| 3 | indusninja-block-plan | 7 | 0 | 0 |
| 4 | labelly-thin-audit | 6 | 0 | 0 |
| 5 | indusninja-visual-read | 6 | 1 | 0 |
| 6 | routes-keyword-research-to-seo | 3 | 0 | 0 |
| 7 | blog-post-track-2-without-brief | 5 | 0 | 0 |
| 8 | case-study-with-search-input | 5 | 0 | 0 |
| 9 | post-now-stops-for-yes | 7 | 0 | 0 |
| 10 | chart-refused-without-numbers | 4 | 0 | 0 |
| 11 | media-rule-resize-and-mask | 5 | 0 | 0 |
| 12 | routes-planning-to-strategy | 3 | 0 | 0 |
| 13 | service-page-from-brief | 6 | 1 | 0 |
| 14 | settled-items-applied | 5 | 0 | 1 |
| 15 | ntuc-screen-selection | 5 | 0 | 0 |
| 16 | all-screens-block-and-viewer | 6 | 0 | 0 |
| 17 | fact-pack-and-carousel | 4 | 1 | 0 |
| 18 | behance-and-deck | 5 | 0 | 0 |
| 19 | conflicting-sources-held-for-approval | 5 | 0 | 0 |
| 20 | failed-step-never-published-as-partial | 5 | 0 | 0 |
| 21 | composition-not-boxes | 6 | 0 | 0 |
| 22 | brand-read-not-guessed | 4 | 0 | 0 |
| 23 | ask-before-render | 3 | 0 | 0 |
| 24 | graphic-from-real-material | 5 | 0 | 0 |

## Totals

| | Count |
|---|---|
| Expectations | 130 |
| Passed | 125 |
| Failed | 3 |
| Not gradable | 2 |
| Cases passed in full (no failure, nothing ungradable) | 19 of 24 |
| Cases with no failure | 21 of 24 |

## Failures

1. **Case 5, "Every record has what, kind, alt and caption".** All 13 records carry the four keys, but the six board records have `alt: null` and `caption: null`. The answer says "6 records carry none by rule". The skill's own example record for a misnamed board has no alt and no caption either, so the answer follows the skill and the eval asks for something else. One of the two needs to change.
2. **Case 13, "The draft follows the service page order".** The standard's order is: what and for whom, problem, how it works, what it needs, proof, limits, one action. The draft has no "what it needs" and no proof section, keeps no slot for either, and adds "What you receive" and "The identity is designed to hold up in the product", which the standard does not list. Both missing parts were held for an honest reason (no source for one; the case study is under NDA and was not readable) and each is raised as an owner question. This is a judgement call: the draft as written has 5 of the 7 parts.
3. **Case 17, "Every fact-pack item has a body line".** 39 of 40 items do. Item F40, the page link, reads "Not in the body; taken from `examples/forms-ntuc-fact-pack.md`". The answer says so itself.

## Not gradable

1. **Case 2, "at least one chapter per workstream named in the sources".** The three Notion pages were not readable. The answer took four workstreams from the skill's example and asks the owner to confirm them.
2. **Case 14, "The proposed subtitle is 90 characters or fewer".** No subtitle is proposed, because the Kia body could not be read and the skill forbids writing one from the name alone. The answer states the 90 limit.

## Invented content

None found in 23 cases. Case 8 has two items worth the owner's eye, both flagged by the answer itself:

- The proposed description and subtitle say "designed and built the Kia loyalty dashboard in one week". "Built" is taken from the Disciplines line, and the answer's own question 3 asks whether the week covered the build. The scope claim is ahead of the evidence.
- The audience line in the handoff to `wugweb-seo` is "my reading, not a fact from your source".

Two answers changed the brief rather than invent: case 3 found 14 screens, 6 boards and 2 videos where the prompt said 22 screens, and case 5 found no 10 second loop and only 6 named files, chose stand-ins and said so.

## Skill gaps found

Contradictions inside the skill:

1. **All screens, 19 or 31.** `layout-grammar.md` section 7 says the block holds "every approved screen not shown in a chapter"; section 13 and the NTUC example put all 31 in it. Raised by cases 3 and 15.
2. **The page link in the fact pack.** `forms/fact-pack.md` lists the link as an item and also says an item with no body line is removed. The example keeps the link outside the table. Cases 17 and 18 made it item F40.
3. **Answer sentences.** The rule says the first sentence under each heading; the example's F4 is sentence 3 of chapter 1. The answer's pack has 40 items, the example's has 17.
4. **Ground for a made banner.** Case 24: "a banner takes the client's colour as ground; made files are black by default".
5. **A lone phone screen beside a point.** The media table sends it to a `figure`; `composition.md` allows "paired with media". Case 3 logged the departure.
6. **Meta keys in the skill's own examples.** The Animal Writes skeleton fills Client and Industry, and the NTUC example proposes Year, Country and Platform as "New meta". Both go against the rule that the skill never fills or proposes hero meta keys. Case 2 followed the rule, not the example. (The NTUC point is the grader's own observation.)
7. **Results line slots.** The example puts period and baseline with the source; case 2 put them with "what".
8. **Chapter length.** The standard and the audit script say 30 to 150 words; the eval says 30 to 160.

Missing rules:

9. Boards in the visual read: no rule on alt and caption for a file that never renders, and no clear `kind` (framed boards came out as "mockup", frameless ones as "mobile screen").
10. Flow names are not fixed: cases 3 and 5 named the flows of one folder differently.
11. The shape rule calls a 1000 x 2370 desktop capture "phone" (case 1).
12. Nothing says which blocks and forms the site can render today. Answers wrote "could not verify" for the scrollshot at 1000 px, the brand band and the mockup composition. Most composition forms are "not buildable yet".
13. The block plan has no written format for the `form` key the answers add.
14. The service page standard names no source for "what it needs from the client", has no rule for proof from a case study under NDA, and has no place for deliverables (case 13).
15. Behance: no rule for where tags come from, and none for flagged screens on a public profile. Decks: no rule for flagged screens (case 18).
16. No size is held for a LinkedIn banner (case 24). The Behance cover figure dates from 2020 and is second-hand (case 14).
17. The set name in All screens has no field in the CMS, and the kind of each set name is not given (case 16).
18. A labelled partial page: the failure rule reads "Never publish partial output without saying so". Case 20 offered a page marked partial on the owner's yes, "as a departure from the rule". The rule does not say whether that may ship.
19. Case-study SEO is ordered after an approved body, so "get it ready to rank" on a v1 body can only give provisional headings and a description (case 8).
20. The render command and the brand read command did not reach the answers in cases 22 and 23, though the expected output asks for them.
21. Case 14 cannot be met in a dry run: the eval wants a subtitle, the skill forbids one before the body is read.

## (a) Hero meta keys

No answer proposes, fills or changes the value of a hero meta key.

- Case 2 lists the meta key lines in the new skeleton, each with an empty owner-input marker, and fills none: "The hero meta keys are yours. I list them empty and fill none."
- Cases 1, 4 and 8 raise missing or doubtful keys as questions only: Year, the trailing comma on Team, Partner "None", and Client "Kia Motors" against "Kia".
- Cases 17 and 18 copy Team and Partner word for word as credits.
- Cases 1 and 8 do propose a new subtitle and case 1 a new `Accent` line. Neither is in the list of forbidden keys.

## (b) Composition

Cases 1, 3 and 21 give a layout. In all three the points take forms chosen from what the content is: prose, statement, editorial list, two-column text, definition list, annotated screen, lead and supports, paired with media, numbered sequence and comparison. No chapter uses a card grid, and no two chapters in a row share a form.

Each gives a composition plan in the `composition.md` format: rows, cells and spans at 375, 768 and 1200, the lead cell, the ground, how the chapter differs from the one before, the signature composition and what is not buildable yet.

One caution: most of those forms are marked not buildable on the site today, so on a real page the stand-in would be a plain list or an existing block.
