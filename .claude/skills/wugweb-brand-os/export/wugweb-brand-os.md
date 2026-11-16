# wugweb-brand-os: single-file export

Version 0.1.0. Built from the skill folder by scripts/build-export.mjs. Do not edit by hand: change the source files and rebuild.

This one document holds the whole skill: the main instructions, then every reference file. Paste it or attach it in any tool. Read the first section first. A reference file is named in the main instructions; look for its heading below when the question needs it.

Contents: the owner's standing rules (copied), the main instructions, then 17 reference files.

---

# Standing rules (copied from docs/skills/STANDING-RULES.md, do not edit here)

These apply to every skill in the Wugweb Skill System and to every session.
Each skill reads this file and repeats none of it. A skill's own rules live in
that skill. Where a helper skill or tool disagrees with a rule here, this file
wins. Dates show when the owner set or confirmed a rule, where known.

## Truth and evidence

- Nothing is invented: no numbers, quotes or facts.
- A claim needs a screen, a sourced number or a named fact. "Unvalidated" is a complete answer.
- Existing content is an input, not the benchmark. (2026-10-19)
- Every number in a report is computed, never estimated.

## Sources and approval

- Notion is the source for case studies and blog posts. (2026-10-13)
- One source, from the owner. Content is enriched only as a proposal. (2026-10-19)
- Changes are shown as current to proposed, with the reason.
- Nothing is written to the content source or the CMS without the owner's approval of that exact change, with a backup first.
- Nothing is deleted without asking: no data, files, records or pages.
- Nothing is posted or scheduled without the owner's yes for that post. (2026-11-16)
- Third-party helper skills return proposals or reports. Only a Wugweb skill writes, and only after approval. (2026-11-16)
- Nothing goes to development until the owner says so. (2026-11-16)

## Media

- Media lives in the owner's media store only: no uploads, no local copies.
- Files are never cropped or re-encoded.
- Media may be shown at any size if the original aspect ratio is kept. Clipping masks are allowed. (2026-11-16)
- Resizing and masks are done on the page, never by making new files. (confirmed 2026-11-16)
- A mask must not hide the part of a screen that proves the claim. (confirmed 2026-11-16)
- A file shown above its natural size is flagged, not banned. (confirmed 2026-11-16)
- No sound anywhere. Every video is muted. (2026-11-11)
- A new image file is made only when nothing existing fits, one file at a time, on the owner's yes for that file. (2026-11-11)

## Writing

- British English.
- Sentence case.
- No em or en dashes in anything a visitor reads. Ranges are written out.

## Working with the owner

- Replies are short and plain, result first.
- Do exactly what is asked. No side tasks.
- Full output: complete files, no placeholders, no "rest unchanged".
- Do not raise the domain cutover, asset clean-up or the cookie policy unless asked.

## Limits

- Never exceed any vendor's free tier. No feature that needs a paid plan unless the owner asks.
- No dependency on Framer: no Framer URLs, redirects or assets. (2026-10-13)
- One slug per page; no redirects for old URLs. (2026-10-13)

## The skill system

- One home per rule. Each rule lives in exactly one skill; the others point to it. (2026-11-16)
- One Notion page per skill: no sub-pages, nothing elsewhere. The repo keeps one copy as that skill's PLAN file. (2026-11-16)
- Every skill must be usable in GPT, Cursor and other tools, not only Claude. (2026-11-16)
- The layout values in the design system's layout shell document are binding. Skills read that document and point to `wugweb-kits`. (2026-11-16)

## Git, only when asked to commit

- Commit by path. Never add everything at once.
- The only trailer is `Co-Authored-By: Wugweb <admin@wugweb.com>`.
- Check for an index lock first; other sessions share the checkout.
- Every commit adds a line to the changelog.
- Push only on the owner's go.

## Working caution, not an owner rule

- When writing to Notion, never write a bare word-colon-word pattern or a bare
  file name ending in a dot and "md". Notion turns them into links and can
  corrupt the page. Put them in inline code or reword. (found 2026-11-16)

---

# Main instructions (SKILL.md)

# wugweb-brand-os

## Purpose

Hold the single reference for who Wugweb is and what its visuals must mean. Answer brand questions, check artwork against the art direction, check claims about Wugweb against approved facts, and put proposed rule changes to the owner.

This skill is reference only. It never writes or rewrites a piece of content, never makes or edits a media file, and never writes to a content source. Every output is an answer, a finding or a proposal.

This is version 0.1.0. Several parts are waiting on the owner and are marked "not yet approved". Report those gaps as gaps. Never fill them.

## When to use and when not

Use this skill for:

- Questions about Wugweb's identity, positioning, values, audience, differentiation or messaging framework.
- Questions about how a visual should look and feel: a blog hero, case-study cover, social card, carousel slide, deck slide, thumbnail or campaign.
- A check of an artwork or an artwork brief against the brand.
- A check of any claim about Wugweb (numbers, names, dates, places, profiles).
- A request to add or change a brand rule.

Hand off instead when the question is about:

| Topic | Goes to |
|---|---|
| How to write: voice, tone, wording, banned words | `wugweb-voice` |
| What to publish, for whom, when; topics, calendar, briefs | `wugweb-strategy` |
| Tokens, components, layout, accessibility, any measured value | `wugweb-kits` |
| Keywords, titles, schema, search reports | `wugweb-seo` |
| Producing a case study, post, page, deck or social piece | `wugweb-work` |
| A client's own brand | The case study it belongs to, through `wugweb-work` |

## Rules that always apply

1. Read `docs/skills/STANDING-RULES.md` in the repo first. The owner's standing rules live there and are not repeated here. Where anything in this skill or a helper disagrees with that file, that file wins.
2. Invent nothing. A fact about Wugweb is used only when `references/brand-facts.md` marks it approved. Anything else is reported as "not yet approved by the owner".
3. Follow the source order: an approved owner decision beats a pattern, a pattern beats a single observation, and one attractive reference never becomes a rule.
4. Cite the reference file behind every answer.
5. Keep observation and interpretation apart. Say what is visible or written, then say what it means.
6. State a rule; never hold a value. Colour codes, sizes, spacing and timings live in `wugweb-kits`.
7. Hold no voice rule. Point to `wugweb-voice`.
8. Show every proposed change as current to proposed, with the reason and the evidence. Nothing becomes a rule until the owner approves it.

## Brand rules already fixed

These are settled. Apply them without asking.

- **Six pillars, in this order:** Strategy, Brand, Experience, Engineering, Growth, Operations. Older service lists are reference only.
- **Many things, one team:** multi-workstream engagements are the norm for Wugweb, not the exception.
- **One claim per asset:** every asset has one claim, one audience tension, one proof and one outcome. The story order is problem, insight, system, outcome.
- **Case-study covers:** show a project-specific object or outcome. Never a generic laptop or dashboard.
- **Yellow is a reservation, not an emphasis level.** It is the resting fill only on the one conversion action per page and on the closing call-to-action banner, and it stays at 10% or less of any page. Other buttons may use it only on hover or tap.
- **Structure stays in brand ink.** An accent is spent on one or two things only. A pillar colour never paints structure.
- **Text is never pure white.** The live colour values must not change.
- **Logo:** the lockup is two-tone, and two-tone titles mirror it. Use the real logo file, never a redrawn or recoloured mark.
- **Feel:** rounded geometry, a black canvas with glass panels on the site, calm motion that respects reduced motion, and layouts that never resolve into an even grid.

## What is not yet approved

Version 0.1.0 is a first draft. These parts are waiting on the owner, so answers about them must say so:

- The positioning line and the one fixed descriptor that other skills and search tools read.
- Values, audience and brand strategy. The owner's own documents for these have not been supplied.
- Most facts about Wugweb: the legal name, address, phone, team size, project count, markets and official profiles. Only the six pillars and the website are approved.
- Which of two conflicting rules wins for artwork: the guideline palette against the site's pillar colours, the light default background against the black canvas, and the gradient and motion rules.
- The wording of "crop" in the guideline files.

When asked about any of these, give the open question, show what exists as background labelled unapproved, and stop. Never pick a side for the owner and never fill the gap from memory or from the stale 2023 profile.

## The four modes

### Answer

1. Find the reference file that owns the topic (see the index below).
2. Give the rule in one or two sentences, then name the file.
3. If the file marks the topic "not yet approved", say so and name the open owner question. Offer what does exist as background, labelled as unapproved.
4. If the question belongs to another skill, name that skill and stop.

### Visual check

Judge the rendered result, never a description of it. This mode needs a model that can see images; without one, check the written brief only and say that the artwork itself was not seen.

1. Name the format and its job (see `references/visual-os/formats-and-campaigns.md`).
2. Name the one visual mode it uses. The five modes are editorial thought leadership, campaign collage, product proof, systems and architecture, and typographic presentation. Mixing modes casually is a finding.
3. Run the two-second test: what does the eye hit first, is that the right thing, and is the one claim clear without the headline?
4. Describe the visual in a fixed frame: subject, composition, colour, lighting and treatment, type, format fit.
5. Check the banned list: robots, AI brains, neural webs, circuitry, holograms, dense node graphs, random technology icons, tiny floating analytics widgets, dashboard-heavy compositions (unless the subject is software), gradient-heavy looks, stock corporate teams and handshakes, clutter, and anything copied from another studio's signature work.
6. Check the fixed rules above, and the media rules in the standing-rules file. Where a guideline says "crop", read it as how a subject is framed in a composition. It never means cutting an existing media file.
7. Report: overall impression, findings ranked must fix, should fix, nice to have, what works, and the top three fixes. Each finding says where, why, and a fix in the piece's own style. Keep taste apart from real problems.
8. Give a pass or fail. Scoring detail is in `references/review-gates.md`.

### Fact check

1. List every claim about Wugweb in the copy: numbers, names, dates, places, clients, awards, profiles.
2. Look each one up in `references/brand-facts.md`.
3. Mark each claim approved, not yet approved, or stale, and give the source.
4. Flag superlatives without evidence, comparisons with competitors, and quotes without a named source.
5. Do not correct the copy. Hand the findings to whoever is writing it.

### Change

1. State the proposed rule and what prompted it.
2. Gather the evidence: where it appears, how often, and whether an owner decision already covers it.
3. Check it against the fixed rules and the standing rules. If it conflicts, say so.
4. Present current to proposed, with the reason, and name the reference file it would change.
5. Wait for the owner. Do not edit `brand_guidelines/` or any reference file without approval.

## Working without helpers

Every mode above can be done by hand from this file and the reference files. Helper skills, plugins and connectors are optional and are listed only in `references/tooling.md`. A helper that is missing or signed out is skipped and reported, never a blocker. Where a helper disagrees with this skill or with the owner's rules, the helper loses.

In a tool that does not load reference files on demand, use the single-file export at `export/wugweb-brand-os.md`. It holds this file, every reference file and a copy of the standing rules in one document.

## Reference files

Read only what the question needs.

| File | Read it when |
|---|---|
| `references/identity-and-positioning.md` | Anyone asks what Wugweb is, is not, or how it differs |
| `references/brand-strategy.md` | Positioning is being compared with competitors or reviewed |
| `references/values-and-principles.md` | Values, beliefs or working principles come up |
| `references/audience.md` | Anyone asks who Wugweb is for |
| `references/messaging.md` | A message, claim or proof is being planned or checked |
| `references/vocabulary.md` | The brand name, descriptor or pillar names are being written |
| `references/brand-facts.md` | Any claim about Wugweb is being made or checked |
| `references/review-gates.md` | Running a visual check or a fact check |
| `references/source-map.md` | Asking where a rule came from or how strong its source is |
| `references/tooling.md` | Looking for an optional helper |
| `references/visual-os/art-direction.md` | Setting or checking the direction of any visual |
| `references/visual-os/colour-type-photo-motion.md` | Colour roles, type, photography or motion character |
| `references/visual-os/metaphors.md` | Choosing or checking a visual metaphor |
| `references/visual-os/objects-and-components.md` | Choosing objects, devices, cards, routes or other parts |
| `references/visual-os/formats-and-campaigns.md` | Any specific format: hero, cover, card, slide, thumbnail, campaign |
| `references/visual-os/references-and-patterns.md` | Using a reference, or promoting a pattern to a rule |
| `references/visual-os/judging-a-visual.md` | Running a visual check in full |

## Never do

- Never state a positioning line, value, audience or fact that the owner has not approved.
- Never hold or restate a voice rule, a token value or an SEO rule.
- Never write, rewrite, generate or edit content or media.
- Never write to Notion, the CMS, the media store or `brand_guidelines/`.
- Never use the 2023 company profile as truth. It is stale background.
- Never treat a helper's output as approved.

---

<!-- references/identity-and-positioning.md -->

# Identity and positioning

## Status

The positioning line is **not yet approved by the owner** (owner item 1). Until it is, never state one line as "the" positioning. Offer the candidates below as background and say they are unapproved.

## What is fixed

- **Six pillars, in this order:** Strategy, Brand, Experience, Engineering, Growth, Operations. Source: `CLAUDE.md`. The older eight-service list is reference only.
- **Many things, one team.** The owner's phrase is "does a lot, into one": multi-workstream engagements are the norm. Whether that phrase is public wording is open (owner item 9). Use the idea; do not quote the phrase in public copy until answered.

## Candidate positioning lines (none approved)

| Candidate | Where it appears |
|---|---|
| "A product and experience architecture studio" | The site's About page (marked placeholder in the code) and `CLAUDE.md` |
| "A systems-minded design partner that turns complexity into clear, scalable, human-centred outcomes" | `brand_guidelines/01_FOUNDATION/BRAND_POSITION.md` |
| "Creative UX design agency" | The 2023 company profile. Stale; do not use. |

## What the guidelines say Wugweb is and is not

Source: `brand_guidelines/01_FOUNDATION/BRAND_POSITION.md`. That folder is marked archived, so treat this as the strongest existing source, not as an owner decision.

Wugweb is:

- a design and product systems practice
- a visual and strategic systems partner
- a brand that makes invisible structures visible

Wugweb is not:

- a generic marketing agency
- a template-led design studio
- a decorative illustration brand
- a futuristic AI art style

Promise, as written there: make complexity understandable, actionable and scalable.

## How to write the positioning once the owner chooses

Use these methods to draft options for the owner. They produce proposals, never the answer.

**Three plain sentences.** What Wugweb is. The one thing the alternatives do not do. Why a reader should believe it. "Cheaper", "better" and "faster" are not positions.

**Four questions a reader must be able to answer.**

1. Who exactly is this for?
2. What does it replace? Name the reader's current alternative, including doing nothing.
3. Which category does the reader put Wugweb in?
4. Which proven differences matter to that reader?

**One sentence shape.** For [audience] who [current alternative and its cost], Wugweb [what it does], unlike [alternative], because [reason to believe]. Fill it only from approved facts.

**Point of view.** List one to three stances Wugweb will defend, and the stances it will not take. Draw them out by asking what most studios in the field get wrong.

**The ownable test.** Finish "Wugweb can own this because" with something specific and true. If the sentence cannot be finished, the claim is not ownable.

## Signs the positioning is broken

- The audience is "businesses" or "teams" with no qualifier.
- The line could sit unchanged on a competitor's page.
- It lists features before saying what problem they solve.
- It names more than one or two differences.
- It positions against a competitor instead of a client need.
- It changes often.

## Three-second clarity test

Read the line once and answer: who is it for, what does Wugweb do, why should I care? If any answer is missing, it fails. A line written for everyone is written for no one.

## Order of work

Settle positioning before wording. A piece with unclear positioning is not fixed by better sentences. Wording belongs to `wugweb-voice`; this file only settles what is being said and for whom.

---

<!-- references/brand-strategy.md -->

# Brand strategy

## Status

**Not yet supplied.** The owner holds a Brand Strategy document that has not been given to any session (owner item 10). This file holds only the methods for reviewing positioning against the field. It holds no strategy of Wugweb's own until that document arrives.

This file is about brand strategy: where Wugweb stands and why. Content strategy (what to publish, for whom and when) belongs to `wugweb-strategy`.

## Method: reading the field

Use these only when the owner asks for a positioning review. Each produces a proposal.

**Choose the set.** Five to eight others, in three kinds:

- direct: same offer, same audience
- aspirational: who owns the ground Wugweb wants
- adjacent: a different offer the same client might choose instead

Add one more row for "doing nothing": the habit or in-house fix a client would otherwise keep. Choose by audience overlap, not by assumption.

**Capture one row each.** Their one-line promise, who they address, their key claims, how they say they differ, and three to five recurring themes. Mark every entry as observed (seen in a public source, with the source and date) or inferred.

**Map the space.** Pick the two axes that matter most to the audience and place each player on evidence. Read the empty area as possible ground. Also look for a point of view nobody holds and an audience nobody serves well.

**Decide what to change.** List what Wugweb should stop competing on, what to do less of, what to raise, and what to add that the field does not offer. Record what to defend as well as what to gain.

**Write it in Wugweb's own words.** The aim is to be different, not louder. Never copy another studio's line, look or signature idea.

## Rules for this work

- Date-stamp every finding and cite its source.
- Need two or more agreeing signals before drawing a conclusion.
- Never estimate another company's numbers. Leave them out.
- Third-party review sites are not a content source for Wugweb.
- Live research on other companies' sites needs the owner's yes each time.
- Keep a short "skipped, and why" list so settled decisions are not reopened.
- End with what is still not known.

---

<!-- references/values-and-principles.md -->

# Values and principles

## Status

**Values are not yet approved by the owner** (owner item 2). The only values list is in the 2023 company profile, which is stale. Do not state Wugweb's values. Say they are waiting on the owner.

The principles below come from `brand_guidelines/01_FOUNDATION/`. That folder is marked archived, so they are the strongest existing source, not an owner decision. They describe how Wugweb thinks about its visual and systems work.

## Philosophy (from `PHILOSOPHY.md`)

- Wugweb visualises invisible systems.
- The goal is not decoration. The goal is making complexity understandable.
- Systems are the product. Clarity is the value. Design is the language. Storytelling is the structure.

Working rule: if an element does not help explain the system, remove it.

## Ten principles (from `PRINCIPLES.md`)

1. Systems thinking
2. Editorial storytelling
3. Information architecture as art
4. Clarity before decoration
5. Metaphor before explanation
6. Composition before ornament
7. Human judgement before automation
8. Simplicity before density
9. Rounded language over sharp technical forms
10. One dominant anchor per composition

## How to record values once the owner supplies them

Use a "we are, we are not" table of four to seven rows. Each row carries the evidence behind it: where it is written or how it shows in the work. A row with no evidence is left out.

Mark each with an evidence level in words:

| Level | Meaning |
|---|---|
| High | Stated outright by the owner, or found in three or more sources |
| Medium | Found in one or two sources, or inferred |
| Low | A single mention, inferred, or in conflict with another source |

Leave out an empty section instead of filling it with a placeholder.

---

<!-- references/audience.md -->

# Audience

## Status

**Not yet approved by the owner** (owner item 3). No approved description of Wugweb's audience exists. A draft in the site settings is marked as inferred and is not a source. Do not describe the audience as fact. Say it is waiting on the owner.

This file holds who the audience is. What to publish for them belongs to `wugweb-strategy`.

## How to record the audience once the owner supplies it

**Describe by job, not by demographics.** For each segment, write the job the client is hiring Wugweb to do:

- functional: what they need done
- emotional: how they want to feel about it
- social: how they want to be seen for it

**One to three segments.** More than three means the audience has not been chosen.

**For each segment record:**

| Field | What goes in |
|---|---|
| Who they are | Role, kind of organisation, what they already know |
| Job to be done | Functional, emotional, social |
| Pains | What is hard or costly today |
| Desired outcome | The before and the after |
| Current belief | What they think the answer is today |
| Objections | Why they would say no |
| Current alternative | What they do or buy today, including nothing |

Cut any field that would not change the work.

**A buying group, not one person.** A client is usually several roles: the one who feels the problem, the one who decides, the one who pays, the one who will use the result. Record each role the owner names. Never fill a role by guessing.

## Evidence rules

- Keep what was observed apart from what it is taken to mean.
- Anything without a source is labelled "assumed, to be checked" or left out.
- Never give a segment size unless it was counted.
- End with what is still not known.
- Never record a real person's name, email or phone number here.

---

<!-- references/messaging.md -->

# Messaging framework

This file holds what Wugweb says and in what order. How it is worded belongs to `wugweb-voice`.

## Fixed rules

Source: `brand_guidelines/03_MARKETING_SYSTEM/02_MESSAGING_FRAMEWORK.md` and owner decisions.

- **Every asset has one claim, one audience tension, one proof and one outcome.**
- **Story order:** problem, insight, system, outcome.
- The visual carries the claim through a tangible metaphor; the copy names it. A thumbnail is never asked to carry a whole positioning.

## The shift each piece shows

Show a change, not a list of services. The guidelines name these shifts:

- unknown to understood
- manual to adaptive
- noise to signal
- process to platform
- complexity to clarity
- productivity to competitive advantage

One piece shows one shift. Never five.

## Open stance

"The client is the hero, Wugweb is the guide." Recommended, **not yet approved by the owner** (owner item 13). Until answered, it may guide planning but is not quoted as a rule.

## Building a message

**The ladder.** Each rung feeds the next: positioning, then one main message, then three or four supporting messages, then a proof for each. Positioning is in `identity-and-positioning.md` and is not yet approved, so a ladder built today is a proposal.

**Four questions, in order.** Why should I care? What is it? Why Wugweb? What do I do next?

**One main message, three or four supports.** Each support ties to an audience need and carries its own proof. A support without proof is cut.

**Differences are stated against every alternative,** including doing nothing.

## Proof

Match the proof to the objection:

| The reader thinks | Proof that answers it |
|---|---|
| It will not work for an organisation like mine | A case from the same kind of organisation |
| It is too risky | A named client, a described process, what happened when something went wrong |
| It costs too much | The outcome, with its source and date |
| It is hard to switch | How the handover and rollout were done |
| Can I trust them? | Named people, named clients, verifiable profiles |

Proof strength, weakest to strongest: a bare rating, a short quote, a named quote with role and organisation, a number with its source and date, a full case study.

Proof rules: nothing made up, permission recorded, meaning kept when a quote is trimmed, and every fact about Wugweb taken from `brand-facts.md`.

## Testing a message

A message passes when all five are true:

1. **Clear:** understood in five seconds.
2. **Different:** a competitor could not say it unchanged.
3. **Credible:** it can be proved from approved facts.
4. **Relevant:** it answers a need the audience has.
5. **Consistent:** it does not contradict the positioning or another piece.

---

<!-- references/vocabulary.md -->

# Brand vocabulary

This file holds brand terms only: the name, the descriptor and the pillar names. Every other wording rule, including preferred and banned words, belongs to `wugweb-voice`.

## The name

- Written "Wugweb" on the site and in the repo.
- The 2023 company profile also writes "WugWeb". Which spelling is official is **not yet approved by the owner** (owner item 4). Until answered, write "Wugweb", as the live site does.
- The legal name appears in two forms in the stale profile. Do not write a legal name until the owner confirms it.
- Use one spelling everywhere, with the full name at first mention. Reported by the `wugweb-seo` session as the rule search and AI tools rely on.

## The descriptor

The short phrase that says what Wugweb is. **Not yet approved** (owner item 1). See the candidates in `identity-and-positioning.md`. `wugweb-seo` reads the approved descriptor from `brand-facts.md` and never rewrites it.

## The six pillars

Always these names, in this order: Strategy, Brand, Experience, Engineering, Growth, Operations.

## Words the guidelines use for the work

Source: `brand_guidelines/01_FOUNDATION/VOCABULARY.md`. These describe systems and relationships, and are for internal briefs and art direction:

transformation, architecture, signals, networks, blueprint, orchestration, decision, system, capability, structure, flow, clarity, metaphor, composition.

The guideline's own rule: use words that describe systems and relationships, not decorative or hype-driven language. Whether any of these words suit public copy is a voice question; ask `wugweb-voice`.

## Naming competitors and the category

How Wugweb names its category and its competitors is part of positioning and is not yet approved. Do not adopt a term a competitor coined without the owner's say.

---

<!-- references/brand-facts.md -->

# Approved facts about Wugweb

This is the one list of facts about Wugweb that any piece may state. `wugweb-seo` reads it one way, for titles and organisation markup, and never rewrites it.

## Status

**Almost nothing here is approved yet** (owner item 4). The table lists what exists today and where. A row marked "not yet approved" must not be stated as fact in any piece. Nothing is invented.

Last reviewed: 2026-11-16.

## The register

| Fact | What exists today | Source | Status |
|---|---|---|---|
| Brand name and spelling | "Wugweb"; the 2023 profile also writes "WugWeb" | Site, `CLAUDE.md`, 2023 profile | Not yet approved: confirm one spelling |
| Legal name | Two different forms in the 2023 profile | 2023 profile (stale) | Not yet approved: which is correct |
| One fixed line: what Wugweb is, for whom, what is distinct | Three competing descriptors | Site, `BRAND_POSITION.md`, 2023 profile | Blank until owner item 1 |
| Six pillars | Strategy, Brand, Experience, Engineering, Growth, Operations | `CLAUDE.md` | **Approved** |
| Website | `wugweb.com` | `CLAUDE.md` | Exists |
| Phone | The WhatsApp number used in the site navigation | `CLAUDE.md` | Not yet approved as the public phone number |
| Email | One general address | 2023 profile (stale) | Not yet approved |
| Address | One office address | 2023 profile (stale) | Not yet approved: confirm it is current |
| Founding date | A date in December 2020 | 2023 profile (stale) | Not yet approved |
| Team size | A range | 2023 profile (stale) | Not yet approved |
| Projects delivered | Two different figures | 2023 profile (stale) | Not yet approved: a figure, or none |
| Markets served | Several lists that differ | 2023 profile (stale) | Not yet approved |
| Official profile links | Profile records exist in the CMS; three review platforms are named in the repo | `CLAUDE.md` | Not read. Not yet approved: which profiles are official |

Unapproved values are described, not written out, so that nobody copies a stale value from this file.

## Rules for using a fact

- State a fact only when its row says approved.
- Name, address, phone and profile links are identical everywhere they appear: site, profiles, listings.
- One spelling of the brand everywhere, with the full name at first mention.
- The one fixed line is used unchanged on the site, profiles and listings.
- A number is given with its source and date, or not at all.
- A client is named only when the owner has cleared that name for public use.

The second, third and fourth rules were reported by the `wugweb-seo` session from its own reading.

## How a fact gets in

1. The owner states it, or approves a proposed value shown as current to proposed.
2. Record the value, the date approved, and where it came from.
3. Rank sources in this order: an approved owner statement, a document in live use, a conversation, a design file or note, a superseded document. A superseded document is listed for reference and never relied on.
4. When two sources disagree, list both and ask the owner. The newer one is not assumed to be right.

## Left out on purpose

The 2023 profile also holds tax, registration and bank details. They are not brand facts and are never copied into a skill, a page or a piece.

---

<!-- references/review-gates.md -->

# Review gates

Checklists and scoring for the visual check and the fact check. The full judging method is in `visual-os/judging-a-visual.md`.

## Visual approval gate

Source: `brand_guidelines/02_VISUAL_SYSTEM/20_DESIGN_CHECKLIST.md` and `09_VALIDATION/`. Approve only when every line holds.

- One message and one tangible metaphor.
- One dominant anchor and no competing focal point.
- A meaningful relationship between person, object and interface, where any are used.
- A limited palette, with controlled photography.
- Rounded language, asymmetry, breathing room.
- Nothing from the banned list.
- It reads at its target size and looks art-directed, not machine-made.
- The fixed brand rules in `SKILL.md` hold.
- The media rules in `docs/skills/STANDING-RULES.md` hold.

## Five gates, in order

1. **Concept:** one idea survives with the headline removed.
2. **Composition:** one focal point and enough empty space.
3. **Brand:** palette, rounded language and collage logic are present.
4. **Craft:** any interface shown is believable; no artefacts or text errors remain.
5. **Compliance:** no banned motif and no unsupported claim.

Stop at the first gate that fails. A weak concept is not fixed by craft.

## Scoring

Score each of ten points from 0 to 2:

concept, hierarchy, brand language, craft, differentiation, object and interface logic, palette and density, human role, accessibility, compliance.

Work for production needs 16 of 20 or more, with no zero. To improve a score, remove or replace the weakest part; do not add.

## Common mistakes

- Adding cards to cover an unclear concept.
- Showing AI as a robot or a brain.
- Reusing the same profile-card idea across unrelated topics.
- People placed beside an interface as decoration.
- Filling empty space with connector lines.
- Using every colour equally.
- Treating a generated scene as a composed collage.

## How to report a finding

Each finding gives:

| Part | What it says |
|---|---|
| Where | The exact place in the piece |
| What | What is seen, without interpretation |
| Why it matters | Which rule or gate it breaks |
| Rank | Must fix (breaks a brand rule or carries risk), should fix (inconsistent), nice to have (preference) |
| Fix | A change in the piece's own style |

Open with the overall impression. Say what works. Close with the top three fixes in order. Keep taste apart from real problems, and match the depth of the review to the stage of the work.

## Fact check gate

- Every claim about Wugweb is found in `brand-facts.md` and marked approved.
- No superlative without evidence.
- No comparison with a named competitor unless the owner approved it.
- No quote without a named source and permission.
- No number without its source and date.
- Generated imagery is never presented as a real product screen, a real client result or a real photograph.

## Source and rights labels

Source: `brand_guidelines/09_VALIDATION/06_SOURCE_AND_RIGHTS.md`. Every photograph, screen, logo, reference and generated image carries one label:

`owned`, `licensed`, `public-reference-only`, `generated`, or `unknown, do not reuse`.

A client's product screen, customer data or an identifiable person is never used without approval. Other studios are used for principle-level comparison only; their composition, type, imagery and campaign assets are never copied.

## Positioning check on a draft

Before any wording review, confirm the piece says who it is for, what it replaces and why Wugweb. If it does not, report "fix positioning first" and stop. Wording review is `wugweb-voice`'s job.

---

<!-- references/source-map.md -->

# Source map

Where each part of this skill comes from, how strong the source is, and what is still open. The helper list is in `tooling.md`.

## Source order

1. An approved owner decision.
2. A pattern repeated across several sources.
3. A single observation.

A lower source never overrides a higher one. One attractive reference never becomes a rule.

## Where each file comes from

| File | Main source | Strength |
|---|---|---|
| `identity-and-positioning.md` | `brand_guidelines/01_FOUNDATION/BRAND_POSITION.md`, `CLAUDE.md`, the site | Thin; the line itself is not approved |
| `brand-strategy.md` | Method only | No Wugweb source yet |
| `values-and-principles.md` | `01_FOUNDATION/PHILOSOPHY.md`, `PRINCIPLES.md` | Short lists; values not approved |
| `audience.md` | Method only | No Wugweb source yet |
| `messaging.md` | `03_MARKETING_SYSTEM/02_MESSAGING_FRAMEWORK.md`, `01_BRAND_STORY.md`, `02_VISUAL_SYSTEM/09_NARRATIVE_SYSTEMS.md` | Two or three sentences each |
| `vocabulary.md` | `01_FOUNDATION/VOCABULARY.md`, `CLAUDE.md` | Short list |
| `brand-facts.md` | `CLAUDE.md`, the site, the 2023 profile | Mostly stale |
| `review-gates.md` | `02_VISUAL_SYSTEM/20_DESIGN_CHECKLIST.md`, `09_VALIDATION/` | One paragraph each |
| `visual-os/art-direction.md` | `02_VISUAL_SYSTEM/` files 01, 02, 06, 07, 08, 12, 13, 21; `DECISIONS.md` | Modes and decisions are the fullest sources |
| `visual-os/colour-type-photo-motion.md` | `02_VISUAL_SYSTEM/` files 04, 05, 15, 16; the kits docs | Colour roles are full; the rest short |
| `visual-os/metaphors.md` | `07_METAPHOR_LIBRARY/`, `VISUAL_REASONING.md`, `02_VISUAL_SYSTEM/03` and `10` | Two sentences per metaphor |
| `visual-os/objects-and-components.md` | `06_COMPONENT_LIBRARY/`, `02_VISUAL_SYSTEM/` files 11, 14, 19 | Two or three sentences each |
| `visual-os/formats-and-campaigns.md` | `08_ARTWORK_FORMULAS/`, `03_MARKETING_SYSTEM/` | The format matrix is full; each formula is one or two sentences |
| `visual-os/references-and-patterns.md` | `05_REFERENCE_LIBRARY/`, `PATTERN_REGISTRY.md`, `OBSERVATIONS.md` | Rules are clear; the library itself is nearly empty |
| `visual-os/judging-a-visual.md` | `09_VALIDATION/`, plus methods restated from installed skills | Method |

The brand rules sourced from the design system docs (yellow as a reservation, structure in brand ink, the two-tone logo, surfaces, motion and layout feel) come from `kits_design_system/docs/components.md`, `tokens/layout-shell.md` and `tokens/sizing.md`. Their values stay in `wugweb-kits`.

Methods restated from other skills are listed with their sources in section 18 of `docs/skills/wugweb-brand-os/PLAN.md`.

## Known weaknesses in the sources

- `brand_guidelines/README.md` and `DECISIONS.md` are marked "completed and archived (2026-08-07)". Their status as live rules is unclear.
- Most files in `brand_guidelines/` hold one to three sentences. Several are headings with no content.
- No image files are in the repo. The nine reference images described in the guidelines are not available.
- There is no source at all for campaign systems, lighting, or approved and rejected examples.
- The owner's Visual OS and Brand Strategy documents have not been supplied.
- The 2023 company profile is stale and contradicts itself.

## Open conflicts, waiting on the owner

| # | Conflict |
|---|---|
| 6 | The guidelines say avoid purple, green and orange. Three pillar colours are exactly those. Which wins for artwork? |
| 14 | The guidelines call warm or light backgrounds the default. The site canvas is black. |
| 15 | The guidelines treat magenta as the brand energy colour. The design system treats yellow as the one brand colour. |
| 16 | The guidelines ban gradient-heavy looks. The service pages use a glow per pillar. |
| 17 | The guidelines say motion is not elastic. The navigation spring has a slight bounce. |
| 18 | The guidelines hold no logo rules. |

Until each is answered, report both sides and do not pick one.

## Other open owner items

1 positioning line, 2 values, 3 audience, 4 facts, 5 status of `brand_guidelines/`, 7 owner of the image prompt folder, 9 whether "does a lot, into one" is public wording, 10 the two source documents and the nine images, 12 the wording changes for "crop", 13 the hero and guide stance. The full list is in section 15 of the plan.

## When sources disagree

List both sides, with where each is written and its date. Give a recommendation if there is a basis for one. The owner decides. Record the decision here with its date.

---

<!-- references/tooling.md -->

# Tooling

This is the only file in the skill that names a tool, a vendor or a Claude helper. Everything here is optional. Every mode in `SKILL.md` can be done by hand without any of it.

## Rules for every helper

- A helper returns a proposal or a report. It never writes anything and its output is never treated as approved.
- Where a helper disagrees with this skill or with `docs/skills/STANDING-RULES.md`, the helper loses.
- A helper that is missing or signed out is skipped and reported. It is never a blocker.
- Live research on other companies' sites, and anything that sends Wugweb's or a competitor's name to an outside service, needs the owner's yes each time.
- No helper may generate, crop, re-encode or upload media as part of this skill's work.

## Optional helpers (Claude)

| Helper | Use | Watch for |
|---|---|---|
| `brand-voice:discover-brand` | Searching connected workspaces for brand documents | It recommends which source to adopt; the owner decides |
| `brand-voice:guideline-generation` | Drafting a non-voice guideline from approved sources | It is mostly a voice tool; take only the identity and messaging blocks |
| `marketing:brand-review` | A second opinion on a fact check | It treats sentence case and dashes as open choices; they are not |
| `marketing:competitive-brief` | Structuring a positioning comparison | It leans on third-party review sites, which are not a source here |
| `anthropic-skills:skill-creator` | Running the test prompts in `evals/` | Its tooling is Claude-only; the prompts can be run by hand |

## Not to be used

| Tool | Why |
|---|---|
| `brightdata:design-mirror` | It scrapes other sites and restyles the codebase to match. Do not run it. |
| `anthropic-skills:brand-guidelines` | It applies another company's brand |
| Any image generator, as a default step | New media is made only per file, on the owner's yes, and never by this skill |

## Where the sources live

| Source | Place |
|---|---|
| The owner's standing rules | `docs/skills/STANDING-RULES.md` in the repo |
| The plan and its open items | `docs/skills/wugweb-brand-os/PLAN.md` in the repo, and the skill's one Notion page |
| The visual guidelines | `brand_guidelines/` in the repo |
| Design system rules and values | `kits_design_system/docs/` in the repo, owned by `wugweb-kits` |
| The stale 2023 profile | Notion; background only |

Outside Claude, the owner pastes or attaches the source the question needs.

## The export

`scripts/build-export.mjs` joins `SKILL.md` and every reference file into `export/wugweb-brand-os.md`. It is plain Node with no dependencies.

```bash
node .claude/skills/wugweb-brand-os/scripts/build-export.mjs
```

Rebuild after any change to a rule. Never edit the export by hand.

## What works only in Claude

- Automatic triggering from the description in `SKILL.md`.
- Loading a reference file only when needed.
- The optional helpers above.

The visual check needs any model that can see images. A text-only model can check a written brief but not the artwork.

---

<!-- references/visual-os/art-direction.md -->

# Art direction

Visual OS is how Wugweb's visuals should look and feel. It says what a visual must mean. How the interface is built (tokens, components, layout) belongs to `wugweb-kits`. Making the piece belongs to `wugweb-work`.

## Status

Sources are thin. Most guideline files hold one to three sentences. The modes and the approved and banned lists are the fullest parts. The owner's own Visual OS document has not been supplied (owner item 10). Treat this file as the strongest existing source, not as a finished system.

## The working chain

Reference, then observation, then pattern, then principle, then rule, then brief, then artwork. A rule is only made after a pattern repeats across several sources.

## Approved direction

Source: `brand_guidelines/DECISIONS.md` (archived, so strongest existing source, not an owner decision).

- Collage first, not illustration first.
- Made by a designer, not generated.
- Simplification wins.
- Rounded geometry dominates.
- Objects over dashboards.
- One dominant geometric anchor.
- A limited palette per artwork.
- Asymmetrical editorial balance.
- Say it through metaphor, not text.
- Choose one visual mode before composing.
- Use paper and cards as tangible objects when they mean something. Avoid fake torn paper and heavy grain as a default.
- A person or hand appears only when it shows agency, judgement or interaction.

## Banned

- AI brains, robots, neural webs, circuitry, holograms
- Dense node graphs
- Random technology icons
- Tiny floating analytics widgets
- Dashboard-heavy compositions, unless the subject is software
- Over-detailed illustration
- Gradient-heavy looks
- Clutter
- Stock corporate teams and handshakes
- Copying another studio's signature composition or asset

## Conditional, never default

- Dense system maps, dot fields, grids and connectors: only when the story is really about systems, routes or relationships.
- One realistic interface or device: only when the product experience is the evidence.
- Dark backgrounds: for contrast or intensity. Warm or light backgrounds are the stated editorial default in the guidelines, but the site is dark. Which applies to artwork is open (owner item 14).

## The five visual modes

Choose exactly one before briefing or judging. Do not blend modes casually. Consistency comes from shared visual language, not one repeated layout.

| Mode | Use for | Notes |
|---|---|---|
| Editorial thought leadership | Blog heroes, article thumbnails, strategic ideas | One dominant object or shape, generous space, little or no text in the image |
| Campaign collage | Social campaigns, service material, posters, announcements | Bolder type panels, device crops, controlled overlap, still one hierarchy and one metaphor |
| Product proof | A real product experience | One credible screen or module as evidence; never a canvas of fake widgets |
| Systems and architecture | A process, route or relationship | Maps, linework and connectors are allowed only because they are the metaphor |
| Typographic presentation | Posters, section dividers, deck covers | Type can be the hero; short copy works as graphic form |

Selection questions: Is the claim a strategic idea, a campaign message, a product interaction, a system or a statement? What one piece of evidence makes it tangible? Which mode shows that evidence best in this format?

## Visual grammar

Order: meaning, then metaphor, then anchor, then proof. Start from the business shift, turn it into a tangible metaphor, set one dominant anchor, then use people, objects and interface as proof.

The design should still say its idea with the headline removed.

## Composition

- Balance is asymmetrical. Centred symmetry and equal weight everywhere are findings.
- One large anchor takes roughly a third to a little over half of the canvas.
- Layers, from back to front: background field, anchor, photograph or object, believable interface, one restrained accent.
- At most three supporting objects or modules.
- Let the anchor run off an edge, using a mask or frame, and keep real empty space.
- Density comes from hierarchy, not from the number of parts. When a piece feels weak, remove the least meaningful part first. Never add parts to fill space.
- Default parts: one anchor, one interaction, up to three quiet supports, one optional micro accent.

## Collage

Assemble, do not illustrate. A background field, one colour anchor, a monochrome person or hand or a tangible object, one to three believable interface modules, one small accent.

Every part must interact: holding, searching, selecting, assembling, navigating or placing. Use clean cut-outs and natural overlap. Test every layer: does it clarify the same visual sentence? If not, remove it.

## Editorial feel

Aim for a design-magazine cover or a premium case study: decisive framing, large type when needed, deliberate overlap, high contrast and a pause around the message. Editorial does not mean decorative. Avoid the look of a software screenshot, a generic landing-page hero or an explanatory infographic.

## What a visual shift shows

Every asset tells one silent story: noise to signal, manual to adaptive, insight to strategy, person to product to outcome, complexity to clarity, productivity to competitive advantage. Show it through composition: a route, a hand moving a module, an object changing context, a growing field. One piece shows one shift.

## Writing the direction down

For any new piece or campaign, write a short plan before making anything:

1. **One-line read:** what it is, who it is for, what it should feel like.
2. **Mode:** one of the five.
3. **Metaphor and hero object:** from `metaphors.md` and `objects-and-components.md`.
4. **Palette priority and accent:** roles, not codes. Values are in `wugweb-kits`.
5. **Type treatment and photo treatment.**
6. **One signature element.** Spend boldness there and keep the rest quiet.
7. **What to avoid.**

Three dials help state a direction quickly, each from 1 to 10: variance (how asymmetrical), motion (how much movement implied) and density (how much is on the canvas). Defaults for Wugweb are moderate variance, low motion and low density.

Test the plan: would it come out the same for any similar brief? If so, it is generic and needs the subject's own world in it: its materials, objects and vocabulary.

## Rules for any reference

- A reference is evidence, not instruction.
- Take the rhythm, spacing, density, treatment and accent logic. Never take the mark, name, composition, line or a unique asset.
- Compare three to five real references on fixed questions: how many colours and for what, how type is paired, how shape is used, how imagery is treated. Never describe a reference that was not seen.
- Where a template might be recognised, ask: could a stranger name the template? If so, change the layout, not just the colours.

## The word "crop"

In these guidelines, "crop" means how a subject is framed in a composition. It never means cutting an existing media file. The media rules in the standing-rules file apply. The proposed wording changes to the guideline files are waiting on the owner (owner item 12); until approved, read "crop" in any guideline file this way.

---

<!-- references/visual-os/colour-type-photo-motion.md -->

# Colour, type, photography and motion

This file says what each of these means in a Wugweb visual. It holds no value: no colour codes, sizes or timings. Those live in `wugweb-kits`, which also enforces them on the site.

## Colour roles

Source: `brand_guidelines/02_VISUAL_SYSTEM/04_COLOR_ROLES.md`. The guideline's own note: the role system is approved; exact values were never made canonical in that folder. Real values are in the design system docs.

| Role | What it signals |
|---|---|
| Black | Authority and framing |
| White or warm off-white | Clarity (but see the open question on backgrounds) |
| Magenta | Human and brand energy (open: see below) |
| Yellow | Focus and opportunity |
| Teal or cyan | Product and digital systems |
| Royal blue | Structure and trust |

Use two to four accents per artwork, plus neutrals. Keep people and most photography monochrome so colour belongs to the brand system. Avoid unapproved purple, green, orange, neon, rainbow palettes and gradients.

By mode: editorial uses a neutral base with two or three accents; campaign collage uses a black or off-white base with three or four approved accents; product proof uses neutral interface plus one or two structural accents; systems uses a neutral base, one anchor colour and restrained blue or cyan; typographic can let one headline colour field dominate.

## Brand colour rules that are fixed

Source: the design system docs (`kits_design_system/docs/`). Rules only.

- **Yellow is a reservation, not an emphasis level.** It is the resting fill only on the one conversion action per page and on the closing call-to-action banner, under 10% of any page. Other buttons may use it only on hover or tap. On a yellow surface the button inverts to dark.
- **Structure stays in brand ink.** An accent is spent on one or two things only. Painting structure in a pillar colour breaks the yellow rule and the accent budget.
- **Text is never pure white.** The live colour values must not change.
- **One accent per client in a case study,** taken from the client's own palette, for rules and numerals only. The Wugweb frame stays.
- **One dominant colour, one or two supporting, one sharp accent** in a deck. No accent lines under titles and no edge stripes.

## Open colour questions, waiting on the owner

Report both sides and never choose between them.

- Items 6 and 15: the guidelines avoid purple, green and orange and name magenta as the brand energy colour. The design system uses yellow as the one brand colour and has purple, green and orange as pillar colours.
- Item 14: the guidelines call light backgrounds the default. The site canvas is black.
- Item 16: the guidelines ban gradient-heavy looks. The service pages use a glow per pillar.

## Type

Type is a graphic object: bold, clean, high contrast, set at a decisive scale with generous margins. It can lead a poster, a cover or a divider. It never rescues a visual that has no metaphor.

- In-image text is a strong phrase, a poster fragment or a purposeful card. Never paragraphs or tiny labels.
- Two typefaces at most in any card or slide.
- Never use generated lettering where the text must be read exactly. Set live text instead.
- Break lines on meaning, put the key phrase largest, and keep the strongest word at a line end.
- No all-caps blocks and no title case in headings.
- Type supports the hierarchy and never dominates it.

Type sizes, scales and font files are in `wugweb-kits`.

## Logo

- The lockup is two-tone, and two-tone titles mirror it.
- Use the real logo file wherever a logo belongs. Never initials, an emoji, a generic mark or a redrawn version, and never recoloured or re-proportioned.
- Show a partner's or client's logo in its own form, in greyscale if a row needs calm.
- A mark must read at very small size, in one colour, and in black and white.
- The brand guidelines hold no logo rules (owner item 18). Sizes are in `wugweb-kits`.

## Photography

Use real people, hands and objects, in monochrome or a tightly controlled treatment. Favour natural action: holding, pointing, searching, building, selecting, navigating, observing. Keep cut-outs clean and high contrast on a minimal background.

Avoid staged smiling teams, handshakes, glossy office stock, colourful clothing that fights the palette, and faces made odd by generation tools.

A real photo or screenshot usually beats a generated image. Say so first. A new image file is made only when nothing existing fits, one file at a time, on the owner's yes (see the standing rules).

## Motion

Motion is calm, precise and editorial. It is not elastic, flashy or game-like. It must clarify a direction. Never add motion to make a weak idea look technical.

- Imply movement in still work with routes, broad ribbons, a change of framing, sequence and purposeful hand action.
- On the site: one spring with a slight bounce for navigation and hover; load and scroll-in are a fade plus a rise; everything respects reduced motion. Source: design system docs. Whether the bounce fits "not elastic" is open (owner item 17).
- No sound anywhere; every video is muted.

---

<!-- references/visual-os/metaphors.md -->

# Metaphors

Choose the metaphor before choosing any part. Sources: `brand_guidelines/07_METAPHOR_LIBRARY/`, `VISUAL_REASONING.md` and `02_VISUAL_SYSTEM/03_SHAPE_LANGUAGE.md`. Each metaphor file in the source holds two sentences and seven empty headings, so this is the whole of what exists.

Never use robots, brains, circuitry or holograms as a shortcut for AI. Show outcomes such as navigation, recommendation or discovery, not AI symbols.

## Methods for finding a metaphor

Use one, at most two.

- Turn the product's action into a symbol.
- Join two meaningful ideas.
- Use negative space.
- Use construction geometry.

Settle the strategy first: the category, the audience, the function, the feeling to leave, the trust level, and what to avoid. Never pick a symbol at random.

A visual system should answer five questions: what the brand stands for, the core metaphor, how the mark carries it, how it scales across screen, print, image and detail, and why it is ownable.

## The ten metaphors

| Metaphor | Use for | Choose | Avoid |
|---|---|---|---|
| Construction | Architecture, capability building, personalisation | Hands assembling cards, blocks, profiles, paper modules, product parts | Hard hats, generic buildings, blueprint wallpaper |
| Creativity | Making, iteration, expressive possibility within a system | Posters, notes, printed fragments, a camera, selected colour fields, meaningful cards | Paint splatter, confetti, chaotic collage |
| Discovery | Research, insight, emerging needs, finding signal | Magnification, search, a folder, a highlighted card, a selected marker | Light bulbs, detective cliches |
| Growth | Momentum, expansion, compounding value | An upward route, a change of scale, a staircase, an expanding field | Rockets, generic stock-chart arrows |
| Intelligence | Informed action, recognition, recommendation, decisions | Selected signals, knowledge cards, adaptive routes, human judgement | Brains, robots, neural webs, circuitry |
| Learning | Feedback and continuous improvement | An evolving object, an annotated notebook, a loop, a before and after state, an iterative route | Graduation caps |
| Navigation | Direction, customer journey, strategic choice | A map, compass, route, marker or destination card | Steering wheels, ships, GPS dashboards |
| Orchestration | Coordinated systems, full-funnel movement, always-on operations | Routes, modular stations, sparse connected steps guided by human judgement | Dense node webs, dashboard control rooms |
| Transformation | Moving from the current state to a new operating model | A broad ribbon, a route, a changed object, a change between fields, a hand repositioning a part | Before and after arrows that have not been earned |
| Trust | Credibility, transparent choice, reliability | A document, a verified profile, a signature, a considered action | Shield or lock wallpaper, handshake stock |

## What shapes mean

Source: `VISUAL_REASONING.md`. Never use a shape only because it looks nice; every shape must carry meaning.

| Shape | Means |
|---|---|
| Circle | Ecosystem, market, loop, field of attention |
| Arrow | Transformation, progress, orchestration, movement |
| Grid | Architecture, structure, system, decision space |
| Card | Product, module, capability, block of information |
| Rounded container | Calm, premium quality, human-centred design |
| Negative space | Clarity, hierarchy, editorial balance |
| Rectangle | Capability |

Default shapes: circles, arcs, quarter-circles, pills, rounded rectangles and softly rounded cards. Use one dominant form and quieter supports. Avoid sharp polygons, hexagon patterns, starbursts, confetti and random blobs. Visible grids and connectors are conditional tools for real system maps.

## Case-study covers

A cover shows a project-specific object or outcome that reflects the actual client's change. It is never a generic laptop or dashboard. Pick the metaphor from the client's own work, not from this list alone.

## Keep the series fresh

Within a series, keep the shared look and change the metaphor and hero object each time. Never repeat the same person, circle and card layout across unrelated topics. The four-role article series in the sources is the worked example; its own table of hero vocabulary and what to avoid is in `formats-and-campaigns.md`.

---

<!-- references/visual-os/objects-and-components.md -->

# Objects and components

The artwork parts a visual may use. Sources: `brand_guidelines/06_COMPONENT_LIBRARY/` and `02_VISUAL_SYSTEM/` files 11, 14 and 19. The source files hold two or three sentences each, with the Approved patterns, Avoid, Examples and Notes headings empty, so this is the whole of what exists.

These are artwork parts, not interface components. Interface components and their tokens are in `wugweb-kits`.

## Primitives

The core set is: a monochrome person or hand, a hero object, a rounded card, a believable interface module, a circle or arc, a colour field, a route or ribbon, and one optional editorial accent.

These are vocabulary, not a checklist. Good work often uses only three to six, each with a stated role. Never use them all.

## The parts

| Part | Means | Use | Avoid |
|---|---|---|---|
| Cards | Information, capability or product state | Generous interiors, rounded corners, content that feels real. Stack only to show hierarchy. | Scattered generic cards, tiny unreadable interface fragments |
| Devices | A real interaction | A phone, tablet or browser frame to show search, a route, a preference, a recommendation or a selection. Credible, rounded, naturally angled, subordinate to the hero. One is usually enough. | A device for decoration |
| Geometry | The anchor | One oversized circle, rounded field, arc or quarter-circle. Supporting shapes are smaller and quieter. | Shapes that compete with the hero |
| Maps | Discovery, journey, territory | Simple regions, markers or routes, paired with a person reading or choosing | Literal GPS or dashboard detail |
| Objects | A strategy made tangible | One hero object that carries the idea | A pile of props |
| Photography | Authentic human action | High-contrast monochrome cut-outs; active poses that advance the metaphor | Coloured corporate stock, decorative faces |
| Ribbons | Continuity, movement, transformation | Broad rounded ribbons from origin to outcome | Decorative swirls; use only when the story has real movement |
| Routes | A decision or a sequence | Few turns and few destinations, a clear origin and outcome | A dense process map for a simple idea |
| Scribbles | One human accent | A single marker line or tiny dotted field | Several scribbles, confetti or marks that hide weak hierarchy |
| Interface modules | Proof of the concept | Profiles, search, recommendations, route cards, preference chips, product cards, notifications, map panels, filters, settings blocks. Believable. | Modules used only to look technical |

## Hero objects

Prefer a tangible object whose behaviour supports the story: a phone, compass, map, folder, notebook, puzzle, report, package, paper tab, magnifier, camera, card or modular block. Pick one. An object belongs only when it carries the idea.

Avoid prop piles, generic light bulbs, gears, rockets and floating technology icons.

## Icons

Icons are secondary. When needed, use simple rounded outlines with a consistent stroke and nothing like an emoji. Prefer an object or a real interface state when it carries more meaning. Never use icon clouds, mosaics of technology logos or isolated generic symbols as the main idea.

## Using real interface

A real screenshot is evidence. Show it only when the product experience is the proof. Use the client's real screens, never invented ones, and check whether a flagged screen (sample data, placeholder text) is critical before hiding it. A device frame is a mask around real content; it must not hide the part that proves the claim.

Generated work is never presented as a real product screen, a real client result or a real photograph.

## Spacing and grid, as feel

Use an invisible grid to align edges, type and cards. Spacing follows a visible rhythm: generous outer margins, clear separation of layers, a quiet zone around the hero. The exact steps are in `wugweb-kits`. Whitespace is a design element. Never compress a visual to fit every part in.

Visible grids, nodes and connectors are for architecture, blueprint or network ideas only.

---

<!-- references/visual-os/formats-and-campaigns.md -->

# Formats and campaigns

What each format should look and feel like. Sources: `brand_guidelines/08_ARTWORK_FORMULAS/` and `03_MARKETING_SYSTEM/`. The format matrix is complete. Each per-format formula holds one or two sentences with ten empty headings, so the lines below are the whole of what exists. The two files for the LinkedIn post and the Instagram post, and the pitch deck, are the thinnest.

This file holds how a visual should look. Platform sizes, safe areas, file settings, export and scheduling belong to `wugweb-work`.

## Format decision matrix

Pick the mode from the format. Format decides whether text in the image is excluded, minimal or central.

| Format | Default mode | Text in the image | Interface allowance | Priority |
|---|---|---|---|---|
| Article thumbnail or blog hero | Editorial thought leadership | None; the headline sits outside | None, or one proof module | One metaphor readable at small size |
| LinkedIn static post | Campaign collage or typographic presentation | A short statement can be graphic form | One believable module | Recognition while scrolling |
| Carousel or presentation | Typographic presentation or systems | Allowed; type carries the hierarchy | Only when the slide proves an interaction | Clear sequence |
| Service page or website section | Product proof or campaign collage | Interface and body copy belong in the page layout, not the image | One believable product proof | Relevance to the product or service |
| Case-study cover | Editorial or product proof | Minimal title treatment | One representative product frame | Recognition and a cue to the story |

"No text inside artwork" is not a universal rule. It applies to no-text thumbnail and hero briefs.

## Per-format direction

**Blog hero.** One insight, one tangible metaphor, one hero object, an optional monochrome interaction, and zero to three supporting layers. A clear anchor and large empty space. No explanatory text in the image. AI topics show outcomes (navigation, recommendation, discovery), not AI symbols.

**Case-study cover.** A distinctive object or outcome from the actual project, never a generic laptop or dashboard. One representative product frame at most.

**Editorial hero.** An oversized anchor, a decisive framing and one proof visual. Type may share the hierarchy for a manifesto or cover; for thought-leadership thumbnails keep type outside the image where possible.

**Thumbnail.** One anchor, one recognisable object or interaction, high contrast. No paragraphs, tiny interface, dense diagrams or title text inside the image. Judge it at its real platform size. Image and title are one unit: the image shows, the title tells, and they never repeat each other. Before designing, write the promise the piece keeps in one sentence.

**LinkedIn post.** Small-scale recognition: high contrast, one memorable silhouette, live platform copy outside the image. Use the campaign look and remove detail that will not survive feed size.

**Instagram post.** A composition that holds in a square, one anchor, bold framing. A carousel can run one metaphor across frames; never repeat one layout or load a single card with text.

**Carousel slide.** Each slide is a small poster: a headline and at most one supporting line, a slide number and one accent, in the same hierarchy on every slide. The cover must stand alone as an image at thumbnail size. One idea per slide. A single point is a single image.

**Deck.** Make the first slide a confident editorial statement: a strong dark or light field, one anchor, minimal text. Then one-message slides in the same visual language, never a dense proposal template. Treat slides as editorial pages: oversized type, a dark and light shift, a framed geometry field or one proof visual. Use a diagram only when it clarifies. Repeat one motif across the deck with no accent stripes or underlined titles. Pick each layout by the slide's job (title, problem, big number, quote, comparison, timeline, closing). Alternate what is with what could be, and break the visual pattern about a third and two thirds of the way through with a full-bleed slide.

**Quote card.** The line must stand alone, or there is no card. One idea, the key phrase largest, lines broken on meaning, two typefaces at most, generous margins, a solid panel over any photo. Legibility at thumbnail size is the deliverable. Never invent, misattribute or strip context from a quote.

**Data visual.** The title states the takeaway, not the axes. For one or two numbers use a large figure, not a chart. Strip decoration: no 3D, shadow or gradient. Label directly, use one base colour and one accent. Always show source and date. The scale rules and contrast checks are in `wugweb-kits`.

**Website section.** One framing-safe visual beside the live text. It reinforces the claim and does not repeat it, and it stays readable without embedded type. On a landing page reserve an uncluttered side for responsive live copy, use product interface only as direct evidence, and make sure the anchor survives the change from desktop to phone. The hero visual shows the real product, not an abstract shape.

**Email banner.** One message, a safe framing, high contrast, a restrained hero object, light enough to load quickly. Never rely on embedded copy for the whole message.

**Ad.** One visual proposition, instant contrast, a clear framing. Lead with an object or metaphor, not a feature list or dashboard fragment. Any call to action stays live platform text.

**Event.** Large type or an anchor that reads from a distance, a limited palette, a simple silhouette and repeatable geometry. Use the campaign metaphor across signage, slides, handouts and social instead of event-themed decoration.

## Campaigns

A campaign shares a visual grammar, not identical layouts. Define:

1. One campaign tension.
2. Palette priority.
3. Type treatment.
4. Photo treatment.
5. A small family of related metaphors.

Each piece brings a new hero object or composition and still looks like Wugweb. Keep a small named family of recurring formats (quote card, carousel frame, announcement, cover) so several versions look like one campaign. A family look is not a clone: several versions share the bones and differ in image, layout and angle, never only in colour. A stranger should not be able to name the template.

### Worked example: the four-role article series

Shared look: Wugweb colour roles, rounded geometry, editorial hierarchy, credible product or physical evidence. The metaphor changes in every image.

| Role | Core idea | Hero vocabulary | Interface allowance | Avoid |
|---|---|---|---|---|
| Agent Whisperer | Make a brand legible to intelligent agents | Metadata cards, taxonomy labels, structured knowledge, folders, index systems | One believable knowledge or search module | Robots, AI faces, chat bubbles as decoration |
| Full-funnel Navigator | Coordinate an adaptive ecosystem | Routes, modular blocks, directional paths, priorities | One orchestration proof only | Dashboard walls, equal-weight paths |
| Hyperpersonalization Architect | Build trusted one-to-one experiences | A mobile device, recommendations, preference chips, adaptive modules | One real mobile or product experience | Cluttered profile cards |
| Customer Wayfinder | Turn scattered signals into meaning | A map, compass, routes, markers, photos, curated fragments | Usually none; a route or map is enough | Generic analytics charts, GPS dashboard looks |

Keep the shared look, vary the metaphor. Never repeat the same person, circle and card layout, or the same hero object, across the four.

## Art-direction vocabulary

For naming a look in a brief or a pattern entry, a banner style list names about twenty styles (for example minimalist, bold type, geometric, retro, editorial, collage, duotone, glass, neon). Use these as vocabulary only, never as a recommendation. Neon and glass styles, and anything that reads as a data dashboard, are close to the banned looks.

Three layout types help brief a graphic: type as hero, full-bleed image, split, list, and a centred badge. State the amount of empty space each leaves.

## Briefing a graphic

Before making anything, settle: the purpose and where it appears, the exact copy (locked, not generated), the canvas, one layout, two or three style words plus palette, and whether it is on brand. For an open request offer three directions that differ in kind, not three shades of one. Where a logo belongs, use the real logo file. Never bake text into an image; leave clean space where live type will sit.

## Existing media and framing

A shown screen or video is never cropped or re-encoded. Resizing keeps the original ratio, and a mask or frame may shape what is shown. A mask must not hide the part that proves the claim. The full rules are in `docs/skills/STANDING-RULES.md`.

---

<!-- references/visual-os/references-and-patterns.md -->

# References and patterns

How evidence becomes a rule. Sources: `brand_guidelines/05_REFERENCE_LIBRARY/`, `REFERENCE_LIBRARY.md`, `OBSERVATIONS.md` and `PATTERN_REGISTRY.md`.

## Status

The method is clear. The library itself is nearly empty. Sixteen of the seventeen reference files hold a format and no entries. The registry holds eight pattern names with no evidence, meaning or confidence recorded. No image files are in the repo. The nine reference images described in the guidelines are not available, and there is no Master Theme PDF, token export or rights record. Do not describe a reference that has not been seen.

## The chain

Reference, then observation, then pattern, then principle, then rule. If something appears once, it is a candidate. If it repeats across sources, promote it.

## Evidence hierarchy

1. Owned Wugweb source files and approved design files.
2. The current public Wugweb website and portfolio work.
3. Past Wugweb material.
4. External inspiration, used only to compare principles.

When a past and a current source conflict, the current approved decision wins.

## Evidence log

Record each entry as one line:

`date | source | what can be seen | confidence | linked observation or pattern | note`

Log what is visible, not opinion. A source supports a pattern only when its specific visual fact is recorded.

## A reference is usable when

- Its rights and source are recorded.
- The observation describes what is visible, not an assumption.
- Repetition or the owner's approval supports its confidence.
- It is linked to an observation, a pattern or a decision.
- It does not contradict current approved direction without a documented change.

## Patterns that repeat across the sources

These are the observed, repeated findings. Each is a candidate to become a rule only with an owner decision or documented repetition.

- Collage first, not illustration first.
- A designer-made feel, not a generated one.
- Simplification improves the result.
- Rounded geometry fits the brand better than sharp technical forms.
- Real interface beats invented widgets.
- One dominant anchor makes a clearer hierarchy than several focal points.
- A limited palette feels more premium.
- Asymmetrical editorial balance feels more intentional than centring.
- Conceptual metaphors beat literal explanations.
- Dense node graphs and generic AI-brain motifs weaken the brand.

The registry's example entry shape, to use for each new pattern: name, evidence sources, meaning, confidence, rule.

## Entry shape for a pattern or style

For a library of looks, each entry holds: name, a few mood words, best for, do not use for, and anti-patterns. This is borrowed as a template only; none of its content is used.

## Comparing references

Compare three to five real references on fixed questions: how many colours and what each is for, how type is paired, how shape and imagery are used, and how dense the layout is. Give every colour a role and a reason. State the pattern in your own words. Never copy another brand's logo, imagery or whole look, and never describe a reference you have not seen.

External studios are principle-level inspiration only. Their composition, type, imagery and campaign assets are never copied.

## Rights labels

Every reusable reference carries one: `owned`, `licensed`, `public-reference-only`, `generated`, or `unknown, do not reuse`. A client's product screen or an identifiable person is used only with approval.

## What is missing, to ask the owner for

- The Visual OS and Brand Strategy documents.
- The nine reference images named in the guidelines, with their sources, dates and rights.
- The approved design file or token export.
- Approved and rejected examples for each format and for the four-role series.
- Current public website captures with retrieval dates.
- Original or licensed source photography used in past campaigns.

---

<!-- references/visual-os/judging-a-visual.md -->

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
