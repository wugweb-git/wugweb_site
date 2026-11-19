# Lessons: wugweb-work

What this skill has learned from being used. A skill gets better only when a correction is written down where the next session will read it, and then moved into the rule it changes.

## How a lesson is recorded

Add an entry when the owner corrects an output, when a rule produced a wrong result, when a step was missing, or when something worked that the skill did not say to do. One entry per lesson, newest first:

```
### <date>: <the lesson in one line>
What happened: <the output or step, and what was wrong or right about it>
The owner's words: "<quoted, with the date>"   (or: no owner comment; seen in <where>)
Why it happened: <the rule that was missing, wrong or misread>
Changed: <the file and section updated, and the commit>   (or: not yet changed)
Check for it: <the eval, test or checklist line that would catch it next time, or "none yet">
```

Rules:

- Quote the owner; never paraphrase a correction into something milder.
- A lesson is finished only when it has changed a rule, a check or an example. Until then its "Changed" line reads "not yet changed" and it stays at the top.
- Label a reading of the owner's meaning as a reading.
- Never record a secret, a client's private detail, or the name of a client who may not be named.
- Entries are not rewritten. A lesson that turns out wrong gets a new entry that says so.
- Read this file at the start of work with the skill, before the first output.

## Lessons

### 2026-11-19: The skill gives composition, not a list of boxes
What happened: layouts showed every set of points as a grid of equal cards, with the same number of points in each chapter, unbalanced, and with no client colour, icons or branded visuals.
The owner's words: "you stick to boxes even though they were not balanced", "why you stick to the same number of bullets when you can play around", "no creativity in layout", "usage of icons and usage of colors and branded visuals and content is totally lacking" (2026-11-19).
Why it happened: the layout rule chose a grid by the count of points, and client colour was limited to one accent for rules and numerals.
Changed: `references/composition.md` (forms, counts, balance, variety, client brand, the composition plan); `references/layout-grammar.md` sections 4 and 9.
Check for it: eval 21; the composition checks in `references/qa-checklist.md`.

### 2026-11-19: Ask before rendering, and which part
What happened: a full page was rendered at seven widths without asking.
The owner's words: "next time do not render without asking me cause only the body section may need more focus" (2026-11-19).
Why it happened: no gate existed before a render.
Changed: `references/ops-cycle.md` (the render review, gates table).
Check for it: eval 23.

### 2026-11-19: The owner names the page and section
What happened: the skill's reach was widened and narrowed on a reading of the owner's words instead of his instruction.
The owner's words: "it will be on me to tell you which section when applying the skill" (2026-11-19).
Why it happened: scope was treated as something the skill decides.
Changed: `SKILL.md` (the source rule); `references/composition.md` (scope and authority).
Check for it: none yet.

### 2026-11-19: Client brand values come with the content
What happened: colours and fonts were about to be picked by reading the client's site.
The owner's words: "the colors use will be from css or branded or client branded (client brand value to be inside provided along with content)" (2026-11-19).
Why it happened: no place existed in the body for the client's brand values.
Changed: `references/body-content-standard.md` (Brand colours, Brand fonts, Brand site); `references/composition.md` (where colour comes from).
Check for it: eval 22.

### 2026-11-19: Never move this skill's knowledge to another skill on a review finding
What happened: review passes handed the sync and the layout sizes to sibling skills and began moving the block catalogue out.
The owner's words: "you fucked my skill"; "for adaptive ui ux the skill must have all knowledge of layouts and blocks and ui" (2026-11-19).
Why it happened: a reviewer's note about duplication was treated as permission to change which skill owns what.
Changed: the skill was restored; `SKILL.md` ("This skill works alone"); `references/handoffs.md` (a sibling may check a result, never do the step).
Check for it: the validator fails when the banned-word or hard-stop lists drift; no check yet for ownership lines.

### 2026-11-19: An earlier draft is not approved content
What happened: an old draft body was described as approved.
The owner's words: "ntuc approved? my ass - that was just your old attempt" (2026-11-19).
Why it happened: a draft in an example file was read as the owner's content.
Changed: `references/ops-cycle.md` (content source governance: a draft, a proposal file and the CMS copy are never the authority).
Check for it: none yet.

