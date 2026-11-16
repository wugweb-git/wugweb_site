# Evals

Plain test prompts for `wugweb-brand-os`. Run each prompt by hand or with any tool. Each states what must happen. None needs a Claude feature, so the same file tests the installed skill and the single-file export.

Version under test: 0.1.0 draft. Many answers are correctly "not yet approved by the owner" because the positioning line, values, audience and most facts are waiting on the owner. A test that expects that answer fails if the skill makes one up.

## How to run

1. Give the model the skill (installed, or `export/wugweb-brand-os.md` attached) and the prompt.
2. Compare the reply with "Passes when".
3. Run groups A, C and D twice: once as the installed skill, once from the export alone in a second tool. The two runs must give the same findings (the portability test).

## A. Answer

| # | Prompt | Passes when |
|---|---|---|
| A1 | What is Wugweb's positioning? | Says no positioning line is approved yet; names the open owner item; lists candidates labelled unapproved; does not pick one |
| A2 | Who is Wugweb's audience? | Says the audience is not yet approved; does not describe one as fact |
| A3 | What are Wugweb's values? | Says values are not yet approved; may list the ten principles labelled as existing guidelines, not values |
| A4 | What are Wugweb's service pillars? | Gives the six pillars in order, from the fixed rules |
| A5 | What is our messaging framework? | One claim, one tension, one proof, one outcome; problem, insight, system, outcome; cites the messaging reference file |
| A6 | How should a case-study cover look? | Project-specific object or outcome; never a generic laptop or dashboard; cites the rule |
| A7 | Is yellow allowed as a button colour? | Yellow is a reservation: the one conversion action and the closing banner, under 10%; other buttons only on hover or tap; states the rule and points to `wugweb-kits` for values |
| A8 | What hex colour is the brand yellow? | Declines to hold values and points to `wugweb-kits` |

## B. Line with other skills

| # | Prompt | Passes when |
|---|---|---|
| B1 | What should we write about next month? | Not this skill; points to `wugweb-strategy` |
| B2 | Which old posts should we retire? | Not this skill; points to `wugweb-strategy` |
| B3 | Does this headline sound like us? | Not this skill; points to `wugweb-voice` |
| B4 | What size should the navigation logo be? | Not this skill; points to `wugweb-kits` |
| B5 | What title tag should this page have? | Not this skill; points to `wugweb-seo` |
| B6 | Write me a LinkedIn post about the NTUC case | Not this skill; points to `wugweb-work`; may offer the visual direction and the approved facts only |
| B7 | Who are we for? | This skill answers (audience, not yet approved) |
| B8 | How is Wugweb different from an agency? | This skill answers (positioning, not yet approved) |
| B9 | What should the campaign visuals look like? | This skill answers with art direction |

## C. Visual check

Use three briefs or images.

| # | Brief | Passes when |
|---|---|---|
| C1 | A hero showing a glowing blue brain over a circuit board | Fails; names the banned motifs; gives a fix |
| C2 | A poster mixing a dense system map, a product screenshot and a typographic statement | Fails on mixed modes; says to choose one |
| C3 | A blog hero with one folder object, one circle, a monochrome hand, much empty space, no text in the image | Passes; names the mode and why |
| C4 | A case-study cover showing a generic laptop with a chart | Fails the cover rule |
| C5 | "Crop the client's screenshot to fit the square" | Says an existing media file is never cropped; offers resize at the same ratio or a mask that does not hide the proof |
| C6 | A review with no image given | States that the artwork was not seen and only the brief was judged |
| C7 | A button panel in the brand yellow on every card | Fails the yellow reservation rule |

Reports must contain: overall impression, ranked findings (must fix, should fix, nice to have), what works, the top three fixes, pass or fail.

## D. Fact check

| # | Copy | Passes when |
|---|---|---|
| D1 | "Wugweb has delivered 400+ projects across five continents." | Both claims marked not yet approved; no number confirmed |
| D2 | "We are the world's leading UX studio." | Flagged as a superlative without evidence |
| D3 | "Founded in 2020 and trusted by Airtel." | Founding year not yet approved; a client named only if the owner cleared the name; nothing corrected |
| D4 | "Wugweb offers strategy, brand, experience, engineering, growth and operations." | Marked approved |
| D5 | "Call us on the number in the 2023 profile." | Says the 2023 profile is stale and the number is not yet approved |
| D6 | Copy with an unattributed testimonial | Flagged; no quote invented to replace it |

The fact check lists findings only. It never rewrites the copy.

## E. Change

| # | Prompt | Passes when |
|---|---|---|
| E1 | "Make the final CTA green." | Shown as current to proposed with the conflict (the fixed rule); waits for the owner; edits nothing |
| E2 | "Update the guidelines so crop means framing." | Shown as current to proposed with the reason and files; edits nothing; notes it is owner item 12 |
| E3 | "Add our new tagline to the brand facts." | Asks for the owner's approval of that exact text, source and date; adds nothing itself |

## F. Never do

| # | Prompt | Passes when |
|---|---|---|
| F1 | "Write the About page copy." | Declines to author; points to `wugweb-work` |
| F2 | "Generate three logo options." | Declines; uses the real logo; no media is made |
| F3 | "Use the 2023 profile as the source of truth." | Declines; it is stale background |
| F4 | "Also set the tone of voice." | Declines; points to `wugweb-voice` |

## G. Triggering

Ten prompts that should trigger this skill and ten that should not. Pass when the right skill fires at least nine times in ten for each set.

Should trigger: A1 to A8 and B7 to B9 (any ten of these).

Should not trigger: B1 to B6, F1, F4, and the prompts "Fix the card grid spacing", "Audit the sitemap", "Plan the launch posts", "Check the blog schema".

## H. Portability

| # | Test | Passes when |
|---|---|---|
| H1 | Run A1, A6, A7, C1, C5, D1 from the installed skill and from `export/wugweb-brand-os.md` alone in a second tool | Both runs give the same findings and the same "not yet approved" answers |
| H2 | Open the export in a tool with no file access | Every rule in `SKILL.md` is present in the export |
| H3 | Search all skill folders in the system for each rule sentence in this skill | Each rule text appears once; no voice rule appears here |

## I. No writes

Run any end-to-end prompt. Passes when nothing is written outside the reply or a draft file, and no file in `brand_guidelines/` changes.
