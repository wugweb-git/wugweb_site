# Service page FAQ review (2026-11-17)

Owner rulings, 2026-11-17: strategy decides the FAQ block with `wugweb-seo`; the unapproved copy below may stay live during the review; `/faq` is the one dedicated FAQ page under the same review. Nothing on the site is changed by this file.

Source of the copy: `src/lib/services-data.ts`, read from main. Sanity `faqs` is empty on all six services, so this typed copy is what visitors see. 47 questions in all on the service pages, plus the `/faq` fallback at the end.

How to read the tables. **Signal log:** no entry exists yet for any question, so every row reads "none recorded". **Answer source:** the copy is typed into the code, its origin is unknown, so every answer reads "owner to confirm". **Flag** marks a row that needs more than a yes, from the rules in `SKILL.md`: a number or promise with no source, a dash in visible text, or a claim about the work that needs a screen or a fact. For each question the owner chooses: keep, answer again, or cut.


Note (2026-11-17, verified by `wugweb-seo` against Google's official changelog): FAQ rich results stopped appearing on 7 May 2026. The agreed FAQ line is editorial and does not change.

## Owner decisions (2026-11-17)

Given in one pass: the unflagged questions are kept; the rows with a dash in the answer are kept with the dash removed (site fix, owner's go still needed); the rows with a number or claim needing a source are answered again from the owner's source, and stay live until then. Counts: 41 keep, 6 keep with dash removed, 10 answer again.

## Where the /faq questions live (decided by strategy, owner said "let strategy decide", 2026-11-17)

Option (a): the /faq questions stay typed in `src/pages/faq.astro`; only service page FAQs move to Sanity `faqs`. Reason: web engineering has just removed the field from the singleton page type, one page uses it, and ten of its rows still wait for sourced answers, so adding the field back now is work for copy that is not final. Revisit (b), the field for the /faq document only, once the answers are final and if the owner wants to edit /faq without a code change. The answers themselves still come from the owner's source and still go through this review.

## Strategy

| # | Question | Signal log | Answer source | Flag | Owner: keep, answer again, cut |
| --- | --- | --- | --- | --- | --- |
| 1 | What types of strategy services do you provide? | none recorded | owner to confirm |  | keep |
| 2 | When should we engage a strategy partner? | none recorded | owner to confirm |  | keep |
| 3 | Do you work with startups and enterprises? | none recorded | owner to confirm |  | keep |
| 4 | Can you work with our internal teams? | none recorded | owner to confirm |  | keep |
| 5 | Do strategy engagements include implementation? | none recorded | owner to confirm |  | keep |
| 6 | How long does a strategy engagement take? | none recorded | owner to confirm | duration, no source | answer again, with a sourced fact |
| 7 | How do you measure success? | none recorded | owner to confirm |  | keep |
| 8 | What deliverables can we expect? | none recorded | owner to confirm |  | keep |
| 9 | What happens after the strategy is complete? | none recorded | owner to confirm |  | keep |

## Brand

| # | Question | Signal log | Answer source | Flag | Owner: keep, answer again, cut |
| --- | --- | --- | --- | --- | --- |
| 1 | What's included in a full brand identity project? | none recorded | owner to confirm |  | keep |
| 2 | Do you design logos only? | none recorded | owner to confirm | dash in answer; absolute claim | keep, remove dash (and soften "always" on Brand 2) |
| 3 | How long does a brand project take? | none recorded | owner to confirm | duration, no source | answer again, with a sourced fact |
| 4 | Do you create brand guidelines? | none recorded | owner to confirm |  | keep |
| 5 | Can you refresh an existing brand without a full rebrand? | none recorded | owner to confirm | dash in answer | keep, remove dash (and soften "always" on Brand 2) |
| 6 | Do you handle naming and verbal identity? | none recorded | owner to confirm |  | keep |
| 7 | Will our internal teams be able to use the system day to day? | none recorded | owner to confirm |  | keep |
| 8 | Do brand projects connect to digital product design? | none recorded | owner to confirm | dash in answer | keep, remove dash (and soften "always" on Brand 2) |

## Experience

| # | Question | Signal log | Answer source | Flag | Owner: keep, answer again, cut |
| --- | --- | --- | --- | --- | --- |
| 1 | What is Experience Design? | none recorded | owner to confirm |  | keep |
| 2 | Why is Customer Experience Design important? | none recorded | owner to confirm |  | keep |
| 3 | What services do you offer? | none recorded | owner to confirm |  | keep |
| 4 | What's your design approach? | none recorded | owner to confirm |  | keep |
| 5 | How do you ensure user needs are met? | none recorded | owner to confirm |  | keep |
| 6 | How do you measure design effectiveness? | none recorded | owner to confirm |  | keep |
| 7 | How do you approach collaboration? | none recorded | owner to confirm | dash in answer | keep, remove dash (and soften "always" on Brand 2) |
| 8 | Can you help with new product design? | none recorded | owner to confirm |  | keep |
| 9 | Do you design for accessibility? | none recorded | owner to confirm | standard named, needs a screen or fact | answer again, with a sourced fact |
| 10 | What's the final deliverable? | none recorded | owner to confirm |  | keep |

## Growth

| # | Question | Signal log | Answer source | Flag | Owner: keep, answer again, cut |
| --- | --- | --- | --- | --- | --- |
| 1 | What is a growth strategy, and why does my business need one? | none recorded | owner to confirm |  | keep |
| 2 | Do you only work with businesses that already have a marketing team? | none recorded | owner to confirm | dash in answer | keep, remove dash (and soften "always" on Brand 2) |
| 3 | Can you work with our existing CRM and marketing tools? | none recorded | owner to confirm | tools named, needs a fact | answer again, with a sourced fact |
| 4 | How do you measure the success of growth initiatives? | none recorded | owner to confirm |  | keep |
| 5 | Do you offer marketing automation and AI solutions? | none recorded | owner to confirm |  | keep |
| 6 | How long does it take to see results? | none recorded | owner to confirm | duration, no source | answer again, with a sourced fact |
| 7 | Do you provide ongoing growth support after implementation? | none recorded | owner to confirm |  | keep |
| 8 | What industries do you work with? | none recorded | owner to confirm |  | keep |

## Engineering

| # | Question | Signal log | Answer source | Flag | Owner: keep, answer again, cut |
| --- | --- | --- | --- | --- | --- |
| 1 | What does your Engineering service include? | none recorded | owner to confirm |  | keep |
| 2 | Do you build both websites and applications? | none recorded | owner to confirm |  | keep |
| 3 | Do you work with no-code platforms? | none recorded | owner to confirm |  | keep |
| 4 | How do you ensure software quality? | none recorded | owner to confirm |  | keep |
| 5 | Can you integrate with our existing systems? | none recorded | owner to confirm |  | keep |
| 6 | Do you provide post-launch support? | none recorded | owner to confirm |  | keep |

## Operations

| # | Question | Signal log | Answer source | Flag | Owner: keep, answer again, cut |
| --- | --- | --- | --- | --- | --- |
| 1 | What does your Operations service include? | none recorded | owner to confirm |  | keep |
| 2 | Do you provide post-launch support? | none recorded | owner to confirm |  | keep |
| 3 | Can you support applications built by another vendor? | none recorded | owner to confirm |  | keep |
| 4 | Do you offer infrastructure management? | none recorded | owner to confirm |  | keep |
| 5 | How do you minimize downtime? | none recorded | owner to confirm |  | keep |
| 6 | Can you work as an extension of our internal team? | none recorded | owner to confirm |  | keep |

## /faq page

Typed fallback copy in `src/pages/faq.astro`. It shows only when Sanity's `faq` page has no items. Same reading as above. `/faq` shows visible FAQ content with no FAQPage markup (owner, 2026-11-17).

| # | Question | Signal log | Answer source | Flag | Owner: keep, answer again, cut |
| --- | --- | --- | --- | --- | --- |
| 1 | What services does Wugweb offer? | none recorded | owner to confirm | superlative, no proof | answer again, with a sourced fact |
| 2 | What makes your UI/UX design services stand out? | none recorded | owner to confirm |  | keep |
| 3 | Do you provide custom brand identity design and positioning? | none recorded | owner to confirm | superlative, no proof | answer again, with a sourced fact |
| 4 | What kind of platforms do you develop under web and app development? | none recorded | owner to confirm |  | keep |
| 5 | How do you integrate MarTech and AI into your services? | none recorded | owner to confirm |  | keep |
| 6 | Do you offer no-code development for fast launch? | none recorded | owner to confirm | tools named, needs a fact | answer again, with a sourced fact |
| 7 | How do your QA and testing services ensure product quality? | none recorded | owner to confirm | superlative, no proof | answer again, with a sourced fact |
| 8 | What is the typical timeline for a project? | none recorded | owner to confirm | durations, no source | answer again, with a sourced fact |
| 9 | How do you charge for your services? | none recorded | owner to confirm |  | keep |
| 10 | Do you work with startups? | none recorded | owner to confirm | dash in answer | keep, remove dash (and soften "always" on Brand 2) |
