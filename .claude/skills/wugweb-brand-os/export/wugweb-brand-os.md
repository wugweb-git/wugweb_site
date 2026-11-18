# wugweb-brand-os (single-file export, v0.3.2)

Built from the files in this folder by `scripts/build.mjs`. Do not edit by hand. Rebuild whenever the skill or `docs/skills/STANDING-RULES.md` changes. Read the skill first, then the reference a mode names.

## Owner's standing rules

Copied from `docs/skills/STANDING-RULES.md`. That file is the source; if this block differs, that file wins.

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

## API keys and secrets

- The standard lives in `docs/skills/SECRETS.md`. Every skill follows it.
- One name per use, UPPER_SNAKE_CASE, provider named: `OPENROUTER_API_KEY`, `NOTION_API_TOKEN`, `SANITY_SYNC_TOKEN`.
- No secret in the repo, in a URL, in a commit message, or in a file this session writes. Local `.env` is gitignored; the repo tracks `.env.example` with placeholders only.
- Paid providers are blocked by policy, whatever their balance: DeepSeek, OpenAI, Moonshot, MiniMax, xAI, Anthropic. A free-tier call through a router must pin to one verified free model.
- A key that reaches a chat, a file, a log or a commit is not echoed, written or sent further. What happens to that key after is the owner's call: no key rotation, never. (2026-11-19)

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

# wugweb-brand-os

The single place that says who Wugweb is and what its visuals must mean. It holds brand strategy, approved facts about Wugweb, brand rules and Visual OS (art direction). It is reference only: it answers, checks and proposes. It never authors or rewrites content, and it writes nothing anywhere.

## Status: read this first

Version 0.3.2 holds the structure, every sourced rule and the owner's rulings of 2026-11-16 and 17. Four core items are blank until the owner supplies them:

- **Positioning line:** not decided. Neither line in use is chosen.
- **Audience:** not decided.
- **Differentiation and brand strategy:** not decided.
- **Values:** approved 2026-11-17, the 2023 five. The ten principles stay principles.
- **Facts about Wugweb:** spelling, phone, email, address, founding date and the six pillars are approved. Team size, projects, markets and profile links wait for the owner.

Questions 1, 3 and 10 are open, plus the open rows in `brand-facts.md`; the list is in `references/source-map.md`. These gaps are filled through use, by the owner's approval: when an answer turns up, here or in another skill's session, run Change mode and apply nothing until the owner says yes. Other skills read these items from here and never hold them. When an answer depends on an open item, say "not decided: the owner decides" and report what exists with its source. Never fill a gap from the 2023 profile, a helper skill, a case study or general knowledge. A gap reported as a gap is a correct answer.

Read `references/standing-rules.md` first: a marked copy of the owner's standing rules from `docs/skills/STANDING-RULES.md`, which wins. They win over this skill and any helper. Cite the reference file behind every answer. Keep observation (what is visible or written) apart from interpretation (what it means).

## When to use

- A question about Wugweb's identity, positioning, values, audience, differentiation or messaging framework.
- A question about how a visual should look, or whether an artwork or artwork brief is on brand.
- Copy that makes claims about Wugweb and needs a fact check.
- A request to add or change a brand rule or a brand fact.
- Another Wugweb skill needs the brand name, descriptor, pillars, approved facts or Visual OS direction.

## When not to use

| Matter | Owner |
| --- | --- |
| Voice, tone, wording, banned words | `wugweb-voice`. Point there; hold and check no voice rule here |
| What to publish, topics, calendar, briefs, refresh and retire | `wugweb-strategy` |
| Token values, components, layout, radius, accessibility | `wugweb-kits`. State the look and feel here; every value lives there |
| Keywords, title and description lengths, schema | `wugweb-seo` |
| Writing or producing any piece, sizes and counts per form | `wugweb-work` |
| Sanity and Notion data, schema edits, sync scripts, backups | `wugweb-engineer` |
| A client's brand | Stays with that case study |

If a question could belong to two skills, say so and ask. Do not answer it from both.

## Source order

1. **Owner decisions**, with their date. They win over everything.
2. **Approved patterns**: repeated across several sources and promoted.
3. **Observations**: seen once. Never applied as a rule.

Label what is said: **confirmed** (the owner said it), **source** (written in a named file, not yet ruled on), **not decided** (the owner decides). Never present a source rule as the owner's confirmed preference. `brand_guidelines/` is the evidence archive: read it, never edit it.

## The four modes

Every output is a proposal or a finding. State which mode is running.

### Answer

In: a brand question. Out: the rule, with its label and the reference file that holds it.

1. Find the one reference file that owns the matter (see the index below).
2. Give the rule and cite that file.
3. If the item is blank, say "not decided: the owner decides", then list what exists with source and status.
4. If sources conflict, show both sides and the question number from `references/source-map.md`. Do not pick a side.

### Visual check

In: an artwork or an artwork brief. Out: the mode chosen, banned motifs found, pass or fail, and what to fix.

Judge the rendered result, never a description of it. This mode needs a model that can see images; without one, check the written brief only and say the artwork was not seen.

1. Describe what is there in a fixed frame: subject, composition, lighting, colour, style, mood.
2. Name the one visual mode. Two modes blended casually is a fail. Run the two-second test: what the eye hits first, whether that is right, and whether the one claim is clear without the headline.
3. Run the check list in `references/review-gates.md`, looking as `references/visual-os/judging-a-visual.md` describes. The banned list in `references/visual-os/art-direction.md` is a fail when met: robots, AI brains, neural webs, circuitry, holograms, node webs as texture, icon clouds, stock teams and handshakes, clutter, and anything copied from another studio's signature work.
4. Report findings as must fix, should fix or nice to have, each with its rule, its file and the fix as current to proposed.
5. Report points that rest on an open owner question as "not decided", not as a pass or a fail.
6. Say what could not be judged, for example when only a brief was supplied. Report overall impression, what works, and the top three fixes. Keep taste apart from real problems.

### Fact check

In: copy that makes claims about Wugweb. Out: each claim marked approved or not, with its status and source.

1. List every claim: numbers, names, dates, places, counts, descriptors, superlatives.
2. Look each up in `references/brand-facts.md`.
3. Mark it **approved** (status approved or fixed) or not approved, and give the status and source as `brand-facts.md` records them, or say the claim is absent.
4. Never soften, round or replace a number. Report it and stop.
5. Flag superlatives without evidence, comparisons with competitors, and quotes without a named source.
6. Give the source for each mark. Do not correct the copy; hand the findings to whoever is writing it.
7. Claims about a client belong to the case study in `wugweb-work`.

### Change

In: a proposed brand rule or fact. Out: current to proposed, with evidence, for the owner's approval.

1. Name the file and the exact text that would change.
2. Show current to proposed.
3. Give the evidence and its label.
4. Check that the rule belongs here and lives nowhere else. If another skill owns it, point there.
5. Wait for the owner's approval. Apply nothing.

## Rules already fixed

Confirmed. They hold in every mode.

**Brand**

- Six pillars, fixed: Strategy, Brand, Experience, Engineering, Growth, Operations. The older eight-service list is reference only.
- Multi-workstream engagements are the norm ("does a lot, into one"). It is an idea, not public wording, until the owner picks the wording.
- The client is the hero, Wugweb is the guide.
- Every asset has one claim, one audience tension, one proof and one outcome, in the order Problem to Insight to System to Outcome.

**Visual**

- A case-study cover shows a project-specific object or outcome, never a generic laptop or dashboard.
- One dominant anchor per composition. Pick one of the five visual modes and do not blend them.
- Robots, AI brains, neural webs, circuitry and holograms are never used, least of all as a shortcut for AI.
- Yellow is the one brand colour. It is an accent at 10% or less, reserved for the one conversion action per page and the footer banner. The final call to action stays yellow.
- Structure stays in brand ink. An accent is spent on one or two things, and a pillar colour does not paint structure.
- Text is never pure white. The live colour values must not change.
- Other buttons may use yellow only on hover or tap.
- All six pillar colours stand (Strategy orange, Brand magenta, Experience teal, Engineering blue, Growth green, Operations purple); the interface accent stays grey. The pillar glow is the one allowed gradient exception.
- The logo lockup is two-tone, and two-tone titles mirror it. Use the real logo file. Logo checks live here; sizes live in kits.
- Surfaces are a black canvas with glass panels, and the black canvas is also the artwork default. No format uses a light background until the owner names one. Corner radius is set by role.
- Motion: one spring with a slight bounce, which is within the brand, for nav and hover; load and scroll-in are a fade plus a rise; everything respects reduced motion.
- A bento never resolves into an even grid, and nothing is wider than the nav.

**Media**

- The media rules in `references/standing-rules.md` win over any brand wording and are not restated here.
- In the guidelines, "crop" means how a subject is framed in a composition, never the cutting of a file.

This skill states these rules. `wugweb-kits` holds every value and enforces them on the interface; no token value is written here.

## The five visual modes

| Mode | Use for |
| --- | --- |
| Editorial thought leadership | Blog heroes, thumbnails, strategic ideas. One visual sentence, generous space, little or no text |
| Campaign collage | Social campaigns, collateral, posters. Bolder type and colour, still one hierarchy and one metaphor |
| Product proof | A real product experience. One credible interface module as evidence |
| Systems and architecture | A process, route or relationship. Grids and connectors only because they are the metaphor |
| Typographic presentation | Posters, dividers, covers. Type is the hero |

Detail, the approved, banned and conditional lists, and composition are in `references/visual-os/art-direction.md`.

## What other skills get and give

| Skill | Gets from here | Gives | This skill may not |
| --- | --- | --- | --- |
| `wugweb-voice` | Identity, positioning, audience, brand terms, approved facts | Nothing; this skill points there for voice | Hold or check voice and tone rules |
| `wugweb-kits` | How things should look and feel | Token and component facts | Set or change a token, radius, component or layout |
| `wugweb-strategy` | Positioning, audience, differentiation, messaging framework | Nothing | Decide topics, calendar or briefs |
| `wugweb-work` | Brand rules, Visual OS direction, check findings | Drafts and artwork briefs to check | Author or rewrite content, make media, touch client brand choices |
| `wugweb-seo` | Brand name, descriptor, approved facts, read one way | Nothing | Change keywords, lengths or schema |
| `wugweb-engineer` | Nothing | Nothing | Change Sanity or Notion data, a schema or a sync script |

## Reference files

Load only the file a mode needs.

| File | Holds |
| --- | --- |
| `references/identity-and-positioning.md` | What Wugweb is and is not, the promise, pillars, positioning tests. Line blank |
| `references/brand-strategy.md` | Blank until the owner's document arrives; the method for a competitor read |
| `references/values-and-principles.md` | The five values, the ten principles, philosophy |
| `references/audience.md` | Blank; the shape to fill |
| `references/messaging.md` | The messaging rule and message tests |
| `references/vocabulary.md` | The name, pillar names, system terms |
| `references/brand-facts.md` | Every fact with source and status |
| `references/review-gates.md` | Visual and fact check lists, scoring, rights labels |
| `references/source-map.md` | Sources, conflicts, the 21 owner questions and their status |
| `references/tooling.md` | The only reference file that names helper skills |
| `references/standing-rules.md` | The owner's standing rules, a generated marked copy |
| `references/visual-os/art-direction.md` | Grammar, modes, approved, banned and conditional lists, composition, "crop" |
| `references/visual-os/colour-type-photo-motion.md` | Colour roles as meaning, type, photography, motion |
| `references/visual-os/metaphors.md` | Shape meanings and the ten metaphors |
| `references/visual-os/objects-and-components.md` | The eleven artwork components |
| `references/visual-os/formats-and-campaigns.md` | Format matrix, formulas, social and deck direction |
| `references/visual-os/references-and-patterns.md` | Evidence rules, pattern registry, reference inventory |
| `references/visual-os/judging-a-visual.md` | How to judge a visual and what to fix |
| `examples/` | Approved and rejected visuals, once the owner supplies them |
| `evals/evals.json` | Per-task tests |
| `scripts/build.mjs`, `scripts/test.mjs` | Build the generated files; self-test |

## Works outside Claude

This file carries the status, modes, fixed rules and boundaries, so it stands alone where reference files do not load. Every file is plain Markdown; helpers are optional. `node scripts/build.mjs` writes `AGENTS.md` and the export (one file with the standing rules), plus the Cursor rule, the ChatGPT instructions and the Codex settings; `README.md` says where each goes. Never edit them by hand. The Visual check needs a model that can see images.

## Never

- Invent a number, quote, fact, value, audience or positioning line, or fill a missing one.
- Pick between conflicting sources. Show both and ask.
- Hold, check or restate a voice rule, or write a token value.
- Author or rewrite content, or make, crop or re-encode media.
- Touch a client's brand.
- Edit `brand_guidelines/`.
- Write to Notion, Sanity or R2. Every change is a proposal for the owner.
- Turn a helper skill's advice into a rule without the owner's ruling.


---

<!-- references/audience.md -->

# Audience

**Not decided: owner.** Answered 2026-11-17: the audience stays blank until the owner supplies it; no Notion page names one. No approved source says who Wugweb is for. Until it arrives, answer "audience: not decided, the owner supplies it". Never infer the audience from case studies, the site or the 2023 profile.

## Slots, all empty

| Slot | Status |
| --- | --- |
| Segments (one to three) | Not decided: owner |
| The job each segment needs done | Not decided: owner |
| Pains and objections per segment | Not decided: owner |
| What they already know | Not decided: owner |
| The buying group (roles involved in one decision) | Not decided: owner |
| What we still do not know | Not decided: owner |

## Shape to use when the owner supplies it

1. Describe each segment by the job it needs done, not by demographics.
2. Keep to one to three segments. Each has pains and objections in the audience's own words where a source exists.
3. Treat the audience as a buying group of several roles, not one person.
4. Keep observation apart from interpretation: what was seen or said, then what it may mean.
5. Mark anything without a source "assumed".
6. End with "what we still do not know".

Not taken from the helpers: rough segment sizes, tools that expose people's names and emails.

## Scope

This file holds who the audience is. What to publish for them belongs to `wugweb-strategy`.

## Recording each segment

**The job, in three parts.** For each segment, write the job the client is hiring Wugweb to do:

- functional: what they need done
- emotional: how they want to feel about it
- social: how they want to be seen for it

More than three segments means the audience has not been chosen.

**Fields per segment.** Cut any field that would not change the work.

| Field | What goes in |
| --- | --- |
| Who they are | Role, kind of organisation, what they already know |
| Job to be done | Functional, emotional, social |
| Pains | What is hard or costly today |
| Desired outcome | The before and the after |
| Current belief | What they think the answer is today |
| Objections | Why they would say no |
| Current alternative | What they do or buy today, including nothing |

**Buying group.** Usually several roles: the one who feels the problem, the one who decides, the one who pays, the one who will use the result. Record each role the owner names. Never fill a role by guessing.

## Evidence rules

- Never give a segment size unless it was counted.
- Never record a real person's name, email or phone number here.
- A draft audience in the site settings is marked inferred and is not a source.

---

<!-- references/brand-facts.md -->

# Brand facts

Facts about Wugweb, each with its source and status. `wugweb-seo` reads this file one way and never rewrites it.

The owner approved the rows marked "approved 2026-11-17" from the Notion read (question 4). Every other row is not approved, and copy that uses it fails the fact check.

| Fact | What exists today | Source | Status |
| --- | --- | --- | --- |
| Brand name and spelling | "Wugweb" | Site, owner | Approved 2026-11-17 |
| One fixed line: what Wugweb is, for whom, what is distinct | Seven competing lines (see `identity-and-positioning.md`) | Site, Notion 2023 to 2026 | Blank. Owner to pick or write |
| Six pillars | Strategy, Brand, Experience, Engineering, Growth, Operations | `CLAUDE.md` | Approved, fixed |
| Website | `wugweb.com` | `CLAUDE.md` | Exists |
| Phone | The WhatsApp number used in the site nav | `CLAUDE.md`, owner | Approved 2026-11-17 |
| Email | `hello@wugweb.com` | 2023 profile, owner | Approved 2026-11-17 |
| Address | WeWork Berger Delhi One, Floor 19, Sector 16B, Noida 201301 | 2023 profile, owner | Approved 2026-11-17, while it stays current |
| Founding date | 4 December 2020 | 2023 profile, owner | Approved 2026-11-17 |
| Team size | "5-10 people" (2023) against 21 names in the July 2026 team capability profile | Notion | No figure until the owner gives one |
| Projects delivered | Both "200+" and "400+" on one 2023 page | 2023 profile | No figure until the owner picks |
| Markets served | Three lists that differ | 2023 profile | No list until the owner picks |
| Official profile links | No Wugweb links in Notion; Behance and Dribbble "wugweb" named without URLs; 59 Presence records in Sanity | Notion, `CLAUDE.md` | Open. Owner to say which are official |

## Rules for using facts

- A fact is usable only when its status is "approved" with a date, or "fixed".
- Name, address, phone and profile links are identical everywhere they appear: the site, profiles and listings.
- One spelling of the brand everywhere, with the full name at first mention.
- The one fixed line, once supplied, is used unchanged on the site, profiles and listings.
- The official profile links are the list `wugweb-seo` uses in organisation markup.

## Provenance

- Every fact carries its source and the date it was approved.
- This file reports which sources exist. The owner decides which to adopt.
- Each usable proof also records its usage rights (see the labels in `review-gates.md`).

## Adding or changing a fact

Use Change mode: show current to proposed with the evidence, and wait for the owner's approval. Never approve a fact on the owner's behalf.

## Left out on purpose

The 2023 profile also holds tax, registration and bank details. They are not brand facts and are not copied here.

## Further rules

- State a fact only when its row says approved.
- A number is given with its source and date, or not at all.
- A client is named only when the owner has cleared that name for public use.
- Unapproved values are described or listed as candidates, never marked usable, so nobody copies a stale value from this file.
- The rules on identical details, one spelling, the one fixed line and the profile list were reported by the `wugweb-seo` session from its own reading.

## How a fact gets in

1. The owner states it, or approves a proposed value shown as current to proposed.
2. Record the value, the date approved and where it came from.
3. Rank sources in this order: an approved owner statement, a document in live use, a conversation, a design file or note, a superseded document. A superseded document is listed for reference and never relied on.
4. When two sources disagree, list both and ask the owner.

---

<!-- references/brand-strategy.md -->

# Brand strategy

**Not decided: owner.** Blank until the owner's Brand Strategy document arrives (question 10). Do not fill this file from helper skills or general advice.

Content strategy (topics, calendar, briefs, refresh and retire) is not here. That is `wugweb-strategy`, which builds on the positioning held in `identity-and-positioning.md`.

## Slots, all empty

| Slot | Status |
| --- | --- |
| Strategic intent | Not decided: owner |
| Competitive set (5 to 8 named competitors) | Not decided: owner |
| Space nobody owns | Not decided: owner |
| What to stop, reduce, raise and add | Not decided: owner |

## Method, for when the owner asks for a competitor read

Use only on the owner's yes, each time. Live research is optional and lives in `tooling.md`.

1. **Set.** Name 5 to 8 competitors the owner agrees.
2. **One row each.** Positioning line as they state it, audience, proof shown, visual mode. Quote their words with the page and date; never estimate their numbers.
3. **Two-axis map.** Pick two axes the owner agrees (for example "template-led to systems-led", "single service to multi-workstream"). Place each competitor from evidence only.
4. **Gap.** The area of the map nobody holds, stated as a question for the owner, never as a decision.
5. **Grid.** What Wugweb should stop, reduce, raise and add. Each cell is a proposal.

Not taken from the helpers: estimated ranges, market sizes, third-party review sites as a source, scraping by default.

## Method detail

The competitor set (step 1 of the method above) has three kinds of entry:

- direct: same offer, same audience
- aspirational: who owns the ground Wugweb wants
- adjacent: a different offer the same client might choose instead

Add one more row for "doing nothing": the habit or in-house fix a client would otherwise keep. Choose by audience overlap, not by assumption.

For each row, also capture who they address, their key claims, how they say they differ, and three to five recurring themes. Mark every entry as observed (seen in a public source, with the source and date) or inferred.

When reading the map, look also for a point of view nobody holds and an audience nobody serves well. When deciding what to change, record what to defend as well as what to gain. Write the result in Wugweb's own words: the aim is to be different, not louder, and never to copy another studio's line, look or signature idea.

## Rules for this work

- Date-stamp every finding and cite its source.
- Need two or more agreeing signals before drawing a conclusion.
- Never estimate another company's numbers. Leave them out.
- Third-party review sites are not a content source for Wugweb.
- Live research on other companies' sites needs the owner's yes each time.
- Keep a short "skipped, and why" list so settled decisions are not reopened.
- End with what is still not known.

---

<!-- references/identity-and-positioning.md -->

# Identity and positioning

What Wugweb is and is not, the promise, the six pillars and "does a lot, into one". Labels: **confirmed** (owner said it, with date), **source** (written in a named file, not yet ruled on by the owner), **not decided** (the owner decides).

## Positioning line

**Not decided: owner.** Answered 2026-11-17 from the Notion read: the owner picks one of the lines below or writes a new one. Until then, leave the line blank and never pick one.

Lines found in use, for reference only. Do not use any of them as the line:

| Line | Where | Status |
| --- | --- | --- |
| "product and experience architecture studio" | The live site | In use, not chosen |
| "Digital Experience Agency" | Home page SEO title | In use, not chosen |
| "systems-minded design partner" | `brand_guidelines/01_FOUNDATION/BRAND_POSITION.md` | Source, not chosen |
| "Creative UX Design Agency" | 2023 Notion profile | Stale |
| "multidisciplinary product engineering company" | Notion team capability profile, July 2026 | Source, not chosen |
| "Outcome-driven, cross-functional product teams" | Notion rate card | Source, not chosen |
| "Product + UX + Automation" | Notion pitch deck, April 2026 | Source, not chosen |

When asked for the positioning line, answer "not decided: the owner supplies it" and list the lines above with their status.

## Audience

Held in `audience.md` only. It is blank until the owner supplies it.

## What Wugweb is (source: `BRAND_POSITION.md`)

- A design and product systems practice.
- A visual and strategic systems partner.
- A brand that makes invisible structures visible.
- It sits between business strategy, product execution and emerging AI systems.

## What Wugweb is not (source: `BRAND_POSITION.md`)

- A generic marketing agency.
- A template-led design studio.
- A decorative illustration brand.
- A futuristic AI art style.

## Core promise (source: `BRAND_POSITION.md`)

Make complexity understandable, actionable and scalable. The short form in the same file is "Designing systems that reduce complexity." Neither is confirmed as public wording.

## Six pillars (confirmed, fixed)

Strategy, Brand, Experience, Engineering, Growth, Operations. Source: `CLAUDE.md`. The older eight-service list in Notion is reference only. The content pillars in `brand_guidelines/03_MARKETING_SYSTEM/13_CONTENT_PILLARS.md` (AI, Product, UX, Systems, Engineering) do not match and are not used as pillars. Pillar colour values live in `wugweb-kits`.

## "Does a lot, into one" (confirmed as an idea)

Multi-workstream engagements are the norm: one engagement often spans several pillars. **Answered by the owner, 2026-11-17 (question 9):** "does a lot, into one" is the idea behind the work, not public wording, until the owner picks the wording. Do not use the phrase in visible copy.

## Differentiation

**Not decided: owner.** No approved source states how Wugweb differs from an agency or a studio. Until the owner supplies it, report the gap. The "what Wugweb is not" list above is the only written contrast.

## Method for when the owner supplies the line

Use these tests (restated from helper skills read on 2026-11-16; see `source-map.md`) to check a proposed line. They test a line; they never write one.

1. **Three plain sentences.** What Wugweb is, who it is for, what is distinct. If any sentence cannot be written, the line is not ready.
2. **Four questions.** Who exactly is it for? What does it replace? Which category does a buyer put it in? Which proven differences matter to that buyer?
3. **Statement shape.** Audience, their current alternative, the difference, the proof.
4. **Three-second test.** A stranger reading the line on the home page can say what Wugweb does.
5. **"We can own this because".** Each claimed difference finishes that sentence with a named fact from `brand-facts.md`.
6. **Settle positioning before wording.** Agree the meaning first; the wording is checked by `wugweb-voice`.

Signs the positioning is broken: several lines in use at once (today seven lines are found, two of them in use on the site), a line that a competitor could use unchanged, a difference with no proof.

## More tests and signs

**One sentence shape.** For [audience] who [current alternative and its cost], Wugweb [what it does], unlike [alternative], because [reason to believe]. Fill it only from approved facts.

**Three plain sentences, detail.** What Wugweb is; the one thing the alternatives do not do; why a reader should believe it. "Cheaper", "better" and "faster" are not positions.

**Point of view.** List one to three stances Wugweb will defend, and the stances it will not take. Draw them out by asking what most studios in the field get wrong.

**Three-second test, detail.** Read the line once and answer: who is it for, what does Wugweb do, why should I care? If any answer is missing, it fails. A line written for everyone is written for no one.

Further signs the positioning is broken:

- The audience is "businesses" or "teams" with no qualifier.
- It lists features before saying what problem they solve.
- It names more than one or two differences.
- It positions against a competitor instead of a client need.
- It changes often.

**Status of the written contrast.** The `brand_guidelines` folder is marked archived, so the "is" and "is not" lists are the strongest existing source, not an owner decision. The candidate line from `BRAND_POSITION.md` reads "a systems-minded design partner that turns complexity into clear, scalable, human-centred outcomes". The site's About page marks "product and experience architecture studio" as placeholder in the code.

Wording belongs to `wugweb-voice`; this file settles what is said and for whom.

---

<!-- references/messaging.md -->

# Messaging framework

How a Wugweb message is built. Wording, tone and style are not here; they live in `wugweb-voice`.

## The rule (confirmed, fixed)

Every asset has one claim, one audience tension, one proof and one outcome. The order is Problem to Insight to System to Outcome. Source: `brand_guidelines/03_MARKETING_SYSTEM/02_MESSAGING_FRAMEWORK.md`. The visual expresses the claim through a tangible metaphor and the copy names it. A thumbnail is never asked to carry a whole positioning framework.

## Messaging stance

**Confirmed by the owner, 2026-11-17 (question 13):** the client is the hero, Wugweb is the guide. State it as a rule.

## Core message and supports

**Not decided: owner.** The core message depends on the positioning line, which is blank. Shape to fill when it exists: one core message with three or four supports, each support with one proof from `brand-facts.md` or a named case study.

## Tests for a message

Run these on any message brief. They return findings, never rewritten copy.

1. **One of each.** Name the claim, the tension, the proof and the outcome. Any missing or doubled item is a finding.
2. **Message order.** Does it answer, in order: what is the problem, what did we see, what system answers it, what changed?
3. **Proof match.** Each likely objection is matched to a kind of proof. Strength, weakest to strongest: our own claim, a described example, a named client, a client's own words, a measured result with its source.
4. **Three-second clarity.** A stranger can say what is being claimed.
5. **Ownable.** The claim finishes "we can own this because" with a named fact.
6. **Facts.** Every number, name and quote goes through the fact check in `review-gates.md`.

Not taken from the helpers: target numbers, uncited statistics, invented example proof.

## Building a message

**The ladder.** Each rung feeds the next: positioning, then one main message, then three or four supporting messages, then a proof for each. Positioning is not decided, so a ladder built today is a proposal.

**Four questions, in order.** Why should I care? What is it? Why Wugweb? What do I do next?

**One main message, three or four supports.** Each support ties to an audience need and carries its own proof. A support without proof is cut.

**Differences are stated against every alternative,** including doing nothing.

## Proof

Match the proof to the objection:

| The reader thinks | Proof that answers it |
| --- | --- |
| It will not work for an organisation like mine | A case from the same kind of organisation |
| It is too risky | A named client, a described process, what happened when something went wrong |
| It costs too much | The outcome, with its source and date |
| It is hard to switch | How the handover and rollout were done |
| Can I trust them? | Named people, named clients, verifiable profiles |

Proof strength, weakest to strongest: a bare rating, a short quote, a named quote with role and organisation, a number with its source and date, a full case study. (The test list above uses a coarser ladder; use this one when judging a single piece of proof.)

Proof rules: nothing made up, permission recorded, meaning kept when a quote is trimmed, and every fact about Wugweb taken from `brand-facts.md`.

## Pass test for a message

A message passes when it is clear (understood in three seconds, as in the test above), different (a competitor could not say it unchanged), credible (provable from approved facts), relevant (answers a need the audience has) and consistent (does not contradict the positioning or another piece).

---

<!-- references/review-gates.md -->

# Review gates

The check lists for Visual check and Fact check, the scoring, and the rights labels. Every result is a finding for the owner; nothing is edited.

## Findings format

One row per finding:

| Field | Holds |
| --- | --- |
| Where | The exact place in the piece |
| What | The element or the quoted claim, as seen, without interpretation |
| Rule | The rule or gate it breaks, why it matters, and the reference file that holds it |
| Severity | Must fix (breaks a brand rule or carries risk), should fix (inconsistent), or nice to have (preference) |
| Fix | What to change, as current to proposed, in the piece's own style |

Keep taste apart from real problems. A taste note is labelled "taste" and is never a must fix. Use words for severity, not emoji. Open with the overall impression, say what works, and close with the top three fixes in order. Match the depth of the review to the stage of the work.

## Positioning check on a draft

Before any wording review, confirm the piece says who it is for, what it replaces and why Wugweb. If it does not, report "fix positioning first" and stop. Wording review is `wugweb-voice`'s job.

## Visual check

Run in this order. How to look at each point is in `visual-os/judging-a-visual.md`.

1. **Mode.** Name the one visual mode. Two modes blended casually is a fail.
2. **Claim.** One claim, one tension, one proof, one outcome. The idea survives with the headline removed.
3. **Anchor.** One dominant anchor and no competing focal point.
4. **Proof.** A meaningful relationship between person, object and interface. A real photo or screenshot comes before generated imagery.
5. **Banned motifs.** Any item on the banned list in `visual-os/art-direction.md` is a fail, named.
6. **Cover rule.** A case-study cover shows a project-specific object or outcome. A generic laptop or dashboard is a fail.
7. **Colour.** Yellow at 10% or less and kept for the final call to action; text never pure white; accents limited. Points still open with the owner are reported as "not decided", not failed.
8. **Media rules.** Check against the media rules in `references/standing-rules.md`: cropping, re-encoding, aspect ratio, and a mask over the proof.
9. **Format.** The format's row in `visual-os/formats-and-campaigns.md` is met, and the piece reads at its final size.
10. **Rights.** Every photograph, screenshot, logo and reference has a rights label.

Also approve only when these hold: rounded language, asymmetry and breathing room; a limited palette with controlled photography; it looks art-directed, not machine-made; the fixed brand rules in `SKILL.md` and the media rules in `references/standing-rules.md` hold.

Result: pass or fail, the mode chosen, each finding, and what could not be judged (for example, a brief with no image).

## Scoring (source: `brand_guidelines/09_VALIDATION/Scoring.md`)

Score each of ten points from 0 to 2: concept, hierarchy, brand language, craft, differentiation, object and interface logic, palette and density, human role, accessibility, compliance. Production work needs 16 out of 20 with no zero. Revise by removing or replacing the weakest component, not by adding.

## Quality gates (source: `Quality_Gates.md`)

- **Concept:** one idea survives without the headline.
- **Composition:** one focal point and adequate negative space.
- **Brand:** palette, rounded language and collage logic are present.
- **Craft:** the interface is credible and no artefacts or text errors remain.
- **Compliance:** no banned motifs and no unsafe claims.

Take the gates in this order and stop at the first that fails. A weak concept is not fixed by craft.

## Common failures (source: `Common_Mistakes.md`)

Adding cards to cover an unclear concept; showing AI as a robot or brain; reusing the same profile-card metaphor; decorative people beside an interface; filling negative space with connectors; using every colour equally; treating a generated scene as a composed collage.

## Fact check

1. List every claim about Wugweb in the copy: numbers, names, dates, places, counts, descriptors, "first", "only", "leading".
2. Look each one up in `brand-facts.md`.
3. Mark each **approved** (status approved or fixed) or not approved, with the status and source `brand-facts.md` records, or say it is absent.
4. Never soften, round or replace a number that is not approved. Report it.
5. Claims about a client are not checked here; they belong to the case study in `wugweb-work`.
6. Positioning claims are checked against `identity-and-positioning.md`. While the line is blank, any stated positioning line is not approved.

Also report any of these, each as a finding:

- A superlative with no evidence.
- A comparison with a named competitor the owner has not approved.
- A quote without a named source and permission.
- A number without its source and date.

Signs positioning is broken, to report when seen: more than one descriptor in the same piece, a difference with no proof, a line a competitor could use unchanged.

## Rights labels (source: `06_SOURCE_AND_RIGHTS.md`)

Every reusable reference carries one label: `owned`, `licensed`, `public-reference-only`, or `generated`.

- Record the source of every photograph, screenshot, logo, external reference and generated asset.
- Confirm permission or licence for external imagery and fonts.
- No client product screen, customer data or identifiable person without approval.
- Other studios' work is principle-level inspiration only. Never copy a composition, typography, imagery or campaign asset.
- Never present generated work as a real product screenshot, a real client outcome or a real photograph.

---

<!-- references/source-map.md -->

# Source map

Where each rule came from, what conflicts, and what is still open. Helper skill names are in `tooling.md` only.

## Source order

1. Owner decisions, with date. They win over everything.
2. Approved patterns: repeated across several sources and promoted.
3. Observations: seen once or in one source. Never a rule.



## Sources

| Source | Used for | Standing |
| --- | --- | --- |
| Owner decisions, 2026-11-16 and 17 | Scope, the media rule, pillars, and the rulings recorded against the questions below | Highest |
| `brand_guidelines/` | Principles, visual modes, metaphors, components, formulas, validation | Evidence archive. Never edited by this skill. Its `README.md` and `DECISIONS.md` are marked archived (2026-08-07) |
| `kits_design_system/docs/design.md` and kits docs | Yellow, ink, logo, surface, motion and layout feel | Rules restated here; every value stays in `wugweb-kits` |
| `CLAUDE.md` | Six pillars, website, contact channel | Fixed for pillars |
| The site | Two positioning lines in use | In use, not chosen |
| Owner's Visual OS and Brand Strategy documents | Not yet supplied | Waiting |

## Where each file comes from

| File | Main source | Strength |
| --- | --- | --- |
| `identity-and-positioning.md` | `brand_guidelines/01_FOUNDATION/BRAND_POSITION.md`, `CLAUDE.md`, the site | Thin; the line itself is not approved |
| `brand-strategy.md` | Method only | No Wugweb source yet |
| `values-and-principles.md` | `01_FOUNDATION/PHILOSOPHY.md`, `PRINCIPLES.md`; the 2023 Notion profile for the values | Short lists; the five values approved 2026-11-17 |
| `audience.md` | Method only | No Wugweb source yet |
| `messaging.md` | `03_MARKETING_SYSTEM/02_MESSAGING_FRAMEWORK.md`, `01_BRAND_STORY.md`, `02_VISUAL_SYSTEM/09_NARRATIVE_SYSTEMS.md` | Two or three sentences each |
| `vocabulary.md` | `01_FOUNDATION/VOCABULARY.md`, `CLAUDE.md` | Short list |
| `brand-facts.md` | `CLAUDE.md`, the site | Thin |
| `review-gates.md` | `02_VISUAL_SYSTEM/20_DESIGN_CHECKLIST.md`, `09_VALIDATION/` | One paragraph each |
| `visual-os/art-direction.md` | `02_VISUAL_SYSTEM/` files 01, 02, 06, 07, 08, 12, 13, 21; `DECISIONS.md` | Modes and decisions are the fullest sources |
| `visual-os/colour-type-photo-motion.md` | `02_VISUAL_SYSTEM/` files 04, 05, 15, 16; the kits docs | Colour roles are full; the rest short |
| `visual-os/metaphors.md` | `07_METAPHOR_LIBRARY/`, `VISUAL_REASONING.md`, `02_VISUAL_SYSTEM/03` and `10` | Two sentences per metaphor |
| `visual-os/objects-and-components.md` | `06_COMPONENT_LIBRARY/`, `02_VISUAL_SYSTEM/` files 11, 14, 19 | Two or three sentences each |
| `visual-os/formats-and-campaigns.md` | `08_ARTWORK_FORMULAS/`, `03_MARKETING_SYSTEM/` | The format matrix is full; each formula is one or two sentences |
| `visual-os/references-and-patterns.md` | `05_REFERENCE_LIBRARY/`, `PATTERN_REGISTRY.md`, `OBSERVATIONS.md` | Rules are clear; the library itself is nearly empty |
| `visual-os/judging-a-visual.md` | `09_VALIDATION/`, plus methods restated from helper skills | Method |

The brand rules sourced from the design system docs (yellow as a reservation, structure in brand ink, the two-tone logo, surfaces, motion and layout feel) come from `kits_design_system/docs/components.md`, `tokens/layout-shell.md` and `tokens/sizing.md`. Their values stay in `wugweb-kits`.

## Known weaknesses in the sources

- `brand_guidelines/README.md` and `DECISIONS.md` are marked archived (2026-08-07), so their status as live rules is unclear.
- Most files in `brand_guidelines/` hold one to three sentences. Several are headings with no content.
- No image files are in the repo. The nine reference images described in the guidelines are not available.
- There is no source at all for lighting, or approved and rejected examples.
- The owner's Visual OS and Brand Strategy documents have not been supplied.
- The 2023 company profile is stale and contradicts itself.

## Known conflicts

| Matter | One source says | Another says | Status |
| --- | --- | --- | --- |
| Positioning | "product and experience architecture studio" (site) | "systems-minded design partner" (guidelines) | Owner will supply a new line |
| Pillar colours | Avoid purple, green and orange (`04_COLOR_ROLES.md`) | Six pillar colours on the site and in kits | All six stand; accent stays grey. Confirmed 2026-11-17 (questions 6 and 21) |
| Brand colour | Magenta is brand energy (guidelines) | Yellow is the one brand colour (kits) | Yellow. Confirmed 2026-11-17 (question 15) |
| Background | Warm or light default (guidelines) | Black canvas (site, kits) | Black canvas everywhere. No format uses a light background until the owner names one (question 14, 2026-11-17) |
| Gradients | Banned (guidelines) | A glow per pillar on service pages | The pillar glow is an exception. Confirmed 2026-11-17 (question 16) |
| Motion | Not elastic (guidelines) | Slight bounce on nav and hover (kits) | A slight bounce is within the brand. Confirmed 2026-11-17 (question 17) |
| "Crop" | An instruction in about 15 guideline files | The owner's media rule: no file is cropped | Media rule wins. The definition lives only in the skill; the four guideline edits are dropped (question 12, 2026-11-17) |
| Content pillars | AI, Product, UX, Systems, Engineering | Six pillars | Six pillars win |
| Spelling | American in the guidelines | British English | Settled by the standing rules |
| Tiles | Sixteen by nine assumed | Seven ratios in use | Not confirmed |
| Logo rules | The guidelines hold none | Sizes are in the design system | Logo rules live here, sizes in kits. Confirmed 2026-11-17 (question 18) |

Until each "not decided" row is answered, report both sides and do not pick one. One attractive reference never becomes a rule.

## Open questions for the owner

Questions 1, 3 and 10 are open; questions 4 and 19 are answered in part. Open items are filled through use, by the owner's approval: when an answer arrives, show current to proposed and apply nothing until the owner approves.

| No. | Question | Status |
| --- | --- | --- |
| 1 | Positioning line | Open. The owner picks from the lines listed in `identity-and-positioning.md` or writes one (2026-11-17); blank until then |
| 2 | Values | Approved 2026-11-17: the 2023 five |
| 3 | Audience | Open. Blank until the owner supplies it; nothing in Notion (2026-11-17) |
| 4 | Facts about Wugweb | Answered 2026-11-17: see `brand-facts.md`; team size, projects, markets and profiles still open; the legal name is out of scope (owner, 2026-11-19) |
| 5 | `brand_guidelines/` stays untouched as the archive | Confirmed 2026-11-17 |
| 6 | Purple, green and orange in artwork | Confirmed: all six pillar colours stand (see 21) |
| 7 | Who owns `04_AI_PROMPT_ENGINE` | Confirmed: Visual OS here owns it |
| 8 | Where working preferences live | Closed: in the standing rules (`standing-rules.md`) |
| 9 | "Does a lot, into one" as public wording | Answered: an idea, not public wording, until the owner picks the wording |
| 10 | Visual OS and Brand Strategy documents, nine source images | Open: none in Notion (2026-11-17); owner to name the pages if they exist |
| 11 | Where the plan is kept | Confirmed |
| 12 | Crop definition and four wording changes | Answered: definition approved and held only in the skill; the four guideline edits are dropped |
| 13 | "The client is the hero" | Confirmed |
| 14 | Light or dark background default for artwork | Answered: black canvas; no format uses light until the owner names one |
| 15 | Magenta or yellow as brand colour in artwork | Confirmed: yellow |
| 16 | Pillar glow as a gradient exception | Confirmed: allowed |
| 17 | Slight bounce in motion | Confirmed: within the brand |
| 18 | Logo rules live here, sizes in kits | Confirmed |
| 19 | Logo files, tones, exemption, clear space, minimum size, one-colour version, unused PNG | Answered 2026-11-17: see `visual-os/art-direction.md`. Mark construction and live type stay open |
| 20 | "Brand identity" as a case-study archetype with a client under NDA as the example | Answered 2026-11-17: keep the archetype, do not name the client (its record is under NDA); fixes to that case study belong to `wugweb-work` |
| 21 | Secondary colours: kits README, code and question 6 differed | Answered 2026-11-17: all six pillar colours stand (Strategy orange, Brand magenta, Experience teal, Engineering blue, Growth green, Operations purple); the accent stays grey; yellow stays the one brand colour |

## Rules restated from helper skills

Read on 2026-11-16, restated in our own words so the skill works without them. The owner's rules win over anything a helper says, and no voice rule was taken.

| Lands in | What was taken |
| --- | --- |
| `identity-and-positioning.md` | Three plain sentences; four positioning questions; statement shape; three-second test; "we can own this because" |
| `brand-strategy.md` | Competitor set and capture row; two-axis map; stop, reduce, raise, add grid |
| `messaging.md` | Message order; core message with supports; objection to proof table; proof strength |
| `audience.md` | Job to be done; one to three segments; buying group; observation apart from interpretation |
| `brand-facts.md` | Provenance on every fact; proof with usage rights |
| `values-and-principles.md` | "We are, we are not"; evidence levels in words |
| `review-gates.md` | Claims check; findings with severity and a fix |
| `visual-os/` | Direction from the subject's world; one signature element; restraint; dials; fixed-axis comparison; two-second test; the six-part description frame; layout types; slide rules; chart title rule |

Methods restated from helper skills are listed with their sources in section 18 of `docs/skills/wugweb-brand-os/PLAN.md`.

Left out on purpose: defining voice, invented numbers, estimated ranges, scraping by default, generating media by default, cropping to fit, uploading to a vendor, pure white text, emoji severity marks.

## When sources disagree

List both sides, with where each is written and its date. Give a recommendation if there is a basis for one. The owner decides. Record the decision here with its date.

---

<!-- references/tooling.md -->

# Tooling

The only reference file that names helper skills. Other files name Notion only as a source, or as a place this skill never writes to. Every mode can be done by hand from the other files; nothing here is required.

## Where the skill and its plan live

- Plan: the Notion page "wugweb-brand-os" under "Wugweb Skill Management System", and `docs/skills/wugweb-brand-os/PLAN.md` in `wugweb-git/wugweb_site`, branch main. If they disagree, Notion wins.
- Skill: `.claude/skills/wugweb-brand-os/`.

## Helpers

Helpers return proposals or reports only, and their output is never treated as approved. The owner's rules, and the standing rules in `references/standing-rules.md`, win over anything a helper says. A helper that is missing or signed out is skipped and reported, never a blocker. Live research on other companies' sites, or anything that sends Wugweb's or a competitor's name to an outside service, needs the owner's yes each time. No helper may generate, crop, re-encode or upload media as part of this skill's work.

| Helper | Use | When |
| --- | --- | --- |
| `brand-voice:discover-brand` | Search connected platforms for brand material | At build time, or when the owner asks. It recommends which source to adopt; the owner decides |
| `brand-voice:guideline-generation` | Draft non-voice guidelines from approved sources | Only from approved sources. It is mostly a voice tool; take only the identity and messaging blocks |
| `marketing:brand-review` | Second opinion on brand fit or a fact check | Optional, after the Visual check. It treats sentence case and dashes as open choices; the standing rules settle them |
| `marketing:competitive-brief`, `brightdata:competitive-intel` | Live competitor research | Only on the owner's yes, each time. The brief leans on third-party review sites, which are not a source here |
| `skill-creator`, `skill-development` | Building and testing this skill | Development only |

## Do not use

| Skill | Why |
| --- | --- |
| `anthropic-skills:brand-guidelines` | It is Anthropic's own brand |
| `theme-factory` | Preset palettes clash with fixed Wugweb colours |
| `brightdata:brand-listening` | Scrapes by default; uses review sites as a source |
| `brightdata:design-mirror` | Scrapes other sites and restyles the codebase; risk of copying another brand |
| `algorithmic-art`, `canva`, any image generator as a default step | Make new media by default. New media is made only per file, on the owner's yes, and never by this skill |

## Writes

This skill writes nothing to Notion, Sanity, R2 or `brand_guidelines/`. A Change proposal is shown in chat or saved as a draft file. Any write to Notion needs the owner's approval of the exact change, with a backup first.

## Where the sources live

| Source | Place |
| --- | --- |
| The owner's standing rules | `docs/skills/STANDING-RULES.md` in the repo is the home; `references/standing-rules.md` is a marked copy rebuilt by `scripts/build.mjs`, so the rules travel with the skill |
| The visual guidelines | `brand_guidelines/` in the repo |
| Design system rules and values | `kits_design_system/docs/` in the repo, owned by `wugweb-kits` |
| The stale 2023 profile | Notion |

## Outside Claude

Attach `export/wugweb-brand-os.md` and ask directly. Rebuild it with `node scripts/build.mjs` whenever a rule changes, then run `node scripts/test.mjs`. Install routes for Cursor, Codex, ChatGPT and agents with no skill support are in `README.md`.

The export joins `SKILL.md` and every reference file. It is plain Node with no dependencies. Never edit it by hand.

## What works only in Claude

- Automatic triggering from the description in `SKILL.md`.
- Loading a reference file only when needed.
- The helpers above.

The Visual check needs any model that can see images. A text-only model can check a written brief but not the artwork.

---

<!-- references/values-and-principles.md -->

# Values and principles

## Values

**Approved 2026-11-17** (owner, from the 2023 Notion profile): User-Centricity, Innovation, Collaboration, Excellence, Social Impact. Use these five as the values. Never derive more values from the principles below.

## Principles (source: `brand_guidelines/01_FOUNDATION/PRINCIPLES.md`)

These stay as principles, not values (owner, 2026-11-16).

1. Systems thinking.
2. Editorial storytelling.
3. Information architecture as art.
4. Clarity before decoration.
5. Metaphor before explanation.
6. Composition before ornament.
7. Human judgement before automation.
8. Simplicity before density.
9. Rounded language over sharp technical forms.
10. One dominant anchor per composition.

Working rule from the same file: if a visual element does not strengthen the story or the system, remove it.

## Philosophy (source: `brand_guidelines/01_FOUNDATION/PHILOSOPHY.md`)

- Wugweb visualises invisible systems. The goal is not decoration; it is making complexity understandable.
- Artwork should feel like a premium editorial composition assembled by an experienced brand designer, not a generic AI illustration.
- Core belief: systems are the product; clarity is the value; design is the language; storytelling is the structure.

## "We are, we are not"

| We are | We are not |
| --- | --- |
| A design and product systems practice | A generic marketing agency |
| A visual and strategic systems partner | A template-led design studio |
| Makers of invisible structures made visible | A decorative illustration brand |
| Editorial and restrained | A futuristic AI art style |

Source: `BRAND_POSITION.md`. The left column is not confirmed as public wording.

## Evidence levels

Say how strong each item is, in words: **confirmed** by the owner, **source** in a named file, **observed** across several references, **assumed**. Leave out any section with nothing in it rather than padding it.

## Source status

The `brand_guidelines/01_FOUNDATION/` folder is marked archived, so the principles and philosophy are the strongest existing source, not an owner decision. They describe how Wugweb thinks about its visual and systems work.

## How to record a change to the values

The five values above are approved. If the owner adds or changes one, use a "we are, we are not" table of four to seven rows. Each row carries the evidence behind it: where it is written or how it shows in the work. A row with no evidence is left out.

| Level | Meaning |
| --- | --- |
| High | Stated outright by the owner, or found in three or more sources |
| Medium | Found in one or two sources, or inferred |
| Low | A single mention, inferred, or in conflict with another source |

---

<!-- references/vocabulary.md -->

# Vocabulary

Brand terms only. Banned words, preferred wording and tone are in `wugweb-voice`.

## The name

"Wugweb" is the approved spelling (owner, 2026-11-17; see `brand-facts.md`). Flag "WugWeb" and "Wug Web" as not the approved spelling. The legal name of the company is not a brand fact and is not held in this skill.

## The descriptor

**Not decided: owner.** The descriptor is the positioning line, which is blank. See `identity-and-positioning.md`.

## Pillar names (confirmed, fixed)

Strategy, Brand, Experience, Engineering, Growth, Operations. Use these six names exactly. Do not use the eight-service list or the content pillars as pillar names.

## System terms (source: `brand_guidelines/01_FOUNDATION/VOCABULARY.md`)

Words Wugweb uses internally to describe systems, visuals and strategy: transformation, architecture, signals, networks, blueprint, orchestration, decision, system, capability, structure, flow, clarity, metaphor, composition.

How and whether these words are used in copy is a voice matter; ask `wugweb-voice`.

## Visual OS terms

| Term | Meaning |
| --- | --- |
| Anchor | The one dominant form in a composition |
| Mode | One of the five visual modes in `visual-os/art-direction.md` |
| Proof | The person, object or real interface that makes the claim tangible |
| Crop | How a subject is framed in a composition. Never the cutting of a media file |
| Visual OS | Wugweb's art direction, held in `visual-os/` |

## More on the name and category

- Use one spelling everywhere, with the full name at first mention. This is the rule search and AI tools rely on, as reported by the `wugweb-seo` session.
- `wugweb-seo` reads the approved descriptor from `brand-facts.md` and never rewrites it.
- How Wugweb names its category and its competitors is part of positioning and is not decided. Do not adopt a term a competitor coined without the owner's say.

---

<!-- references/visual-os/art-direction.md -->

# Art direction

How Wugweb's visuals should look and feel across the site, social cards, carousel slides, deck slides and covers. Token values, components and layout are in `wugweb-kits`. Making the pieces is `wugweb-work`.

## Visual grammar (source: `02_VISUAL_SYSTEM/01_VISUAL_GRAMMAR.md`)

Reference, then observation, then pattern, then principle, then rule, then brief, then artwork: a rule is only made after a pattern repeats across several sources. Within a single piece the order is meaning, then metaphor, then anchor, then proof. Start with a business transformation, turn it into a tangible metaphor, set one dominant anchor, then use people, objects and product interface as proof. The design should still say its idea with the headline removed. Nothing is filler; every shape carries meaning (see `metaphors.md`).

## Strategy before visuals

1. State the claim, tension, proof and outcome (`messaging.md`) before any visual choice.
2. Take the direction from the subject's own world: the project's real objects, screens and setting.
3. Write a short plan: the mode, the metaphor, the anchor, the proof and one signature element.
4. Spend boldness in one place. Everything else is quiet.
5. Give a one-line design read before detail: what the piece is trying to be.
6. Test the plan: would it come out the same for any similar brief? If so it is generic and needs the subject's own materials, objects and vocabulary.
7. Three dials describe intent: variance (how far from the usual layout), motion (how much movement is implied) and density (how much is on the canvas). Wugweb defaults to moderate variance, low motion and low density.

## The five visual modes (source: `21_VISUAL_MODES.md`)

Pick one mode before briefing. Do not blend modes casually.

| Mode | Use for | Character |
| --- | --- | --- |
| Editorial thought leadership | Blog heroes, article thumbnails, strategic ideas | One visual sentence around a dominant object or geometry anchor, generous space, little or no embedded text. A person or hand is optional |
| Campaign collage | Social campaigns, service collateral, posters, announcements | Bolder type panels, wider approved colour, device frames, photography, controlled overlap. Still one hierarchy and one metaphor |
| Product proof | A real product experience | One credible mobile, browser, map, recommendation, settings or product module as evidence. Never a canvas of fake analytics widgets |
| Systems and architecture | A process, information architecture, route or relationship | Maps, structured cards, linework, dots, grids and connectors, allowed only because they are the metaphor |
| Typographic presentation | Posters, section dividers, presentation covers, editorial social | Type is the hero. Short copy as graphic form, not body text |

Selection questions:

1. Is the claim a strategic idea, a campaign message, a product interaction, a system or a typographic statement?
2. What one piece of evidence makes the claim tangible?
3. Which mode makes that evidence most legible at the delivery format?

## Approved

- Collage-first, designer-made, editorial feel.
- One dominant anchor.
- Rounded geometry: circles, arcs, quarter-circles, pills, rounded rectangles, softly rounded cards.
- Real interface over fake widgets.
- Monochrome people, hands and objects, in active poses.
- A limited palette per artwork.
- Asymmetrical editorial balance and true negative space.
- Metaphor-led visuals.
- Simplification wins, and objects over dashboards.
- Say it through metaphor, not text.
- Choose one visual mode before composing.
- Paper and cards as tangible objects when they mean something; fake torn paper and heavy grain are not the default.
- A person or hand appears only when it shows agency, judgement or interaction.
- Made by a designer, not generated.

## Banned

- Robots, android heads, AI brains, neural networks, circuit boards, holograms. For an AI subject, use the Intelligence metaphor in `metaphors.md` instead.
- Cyberpunk, sci-fi cities, glowing blue technology.
- A generic laptop or dashboard, most of all on a case-study cover.
- Stock corporate teams, handshakes, glossy office scenes.
- Ambient node webs, connector lines as texture, icon clouds, technology-logo mosaics.
- Light bulbs, gears, rockets, shields and locks as wallpaper, graduation caps, steering wheels.
- Sharp polygons, hexagon patterns, starbursts, confetti, random blobs, paint splatter.
- Rainbow palettes, neon, unreadable text, watermarks.
- Torn-paper effects, heavy grain, random stickers.
- Neon and glass art styles as a look for artwork.
- Over-detailed illustration and clutter.
- Copying another studio's signature composition or asset.

## Conditional

| Element | Allowed when |
| --- | --- |
| Visible grids, nodes, dots, connectors | The subject is a system, architecture, blueprint or network |
| A device frame | It shows an actual interaction; normally one device |
| Text inside artwork | The format allows it (see `formats-and-campaigns.md`) |
| A literal diagram | Structure itself is the subject |
| A scribble or marker line | Once, as a single human accent |
| Richer collage layers | Campaign collage mode, and every layer clarifies the same visual sentence |
| Dark backgrounds | The black canvas is the default everywhere. No format uses a light background until the owner names one (question 14, 2026-11-17) |
| Pillar colours | All six stand (Strategy orange, Brand magenta, Experience teal, Engineering blue, Growth green, Operations purple); the accent stays grey. Confirmed by the owner, questions 6 and 21 |
| A glow or gradient | The pillar glow is an allowed exception. Confirmed by the owner, question 16. Other gradient-heavy looks stay banned |

## Composition (source: `02_COMPOSITION.md`)

- Asymmetrical editorial balance around one large anchor taking roughly 30 to 60% of the canvas.
- Place the hero object or active monochrome person in relation to the anchor. At most three supporting objects or interface modules.
- Layer on purpose: background field, anchor, photograph or object, realistic interface, one restrained accent.
- Let the anchor run off the edge of the canvas and keep true negative space.
- Avoid centred symmetry, scattered floating components and equal weight everywhere.
- Vary the framing, hero object and placement of negative space between assets. Consistency comes from the visual language, not a repeated template.

## The definition of "crop"

In these guidelines, "crop" means how a subject is framed in a composition. It never means cutting an existing media file. The media rules in `references/standing-rules.md` apply and win over any guideline wording.

The definition is approved and lives only in this skill (question 12, 2026-11-17). The guideline files stay as they are: `brand_guidelines/` is an untouched archive, and no wording change to it is proposed.

## Editorial feel

Aim for a design-magazine cover or a premium case study: decisive framing, large type when needed, deliberate overlap, high contrast and a pause around the message. Editorial does not mean decorative. Avoid the look of a software screenshot, a generic landing-page hero or an explanatory infographic.

## What a visual shift shows

Every asset tells one silent story: noise to signal, manual to adaptive, insight to strategy, person to product to outcome, complexity to clarity, productivity to competitive advantage. Show it through composition: a route, a hand moving a module, an object changing context, a growing field. One piece shows one shift.

## Collage (source: `06_COLLAGE_SYSTEM.md`)

Assemble rather than illustrate: a background, one colour anchor, a monochrome person, hand or tangible object, one to three credible interface modules and one small graphic accent. Elements must interact: holding, searching, selecting, assembling, navigating or placing. Use clean cut-outs and natural overlap. Test every layer: does it clarify the same visual sentence? If not, remove it.

## Density (source: `07_VISUAL_DENSITY.md`)

Control density through hierarchy, not component count. Default: one anchor, one interaction, up to three support layers and one optional micro-accent. When work feels weak, remove the least meaningful element first. Never add grids, icons, labels, lines or cards to fill space.

## Rules restated from the kits docs (confirmed; values live in `wugweb-kits`)

- Colour (yellow, brand ink, pillar colours, never pure white text): held in `colour-type-photo-motion.md` only.
- The logo: held in the Logo section below.
- Surfaces are a black canvas with glass panels, and corner radius is set by role.
- A bento never resolves into an even grid, and nothing is wider than the nav.
- Not confirmed: that tiles keep a sixteen by nine ratio.

## Learning from a reference

Take the principle, never the composition. Name what the reference does (hierarchy, rhythm, restraint) and apply that. Other studios' work is `public-reference-only`.

- A reference is evidence, not instruction. Take the rhythm, spacing, density, treatment and accent logic; never the mark, name, composition, line or a unique asset.
- Compare three to five real references on fixed questions: how many colours and for what, how type is paired, how shape is used, how imagery is treated. Never describe a reference that was not seen.
- Where a template might be recognised, ask whether a stranger could name it. If so, change the layout, not just the colours.

## Logo

**Confirmed by the owner (question 18):** the two-tone rule and the logo checks live here, with sizes in kits. Use the real logo file wherever a logo belongs, never redraw it, and never bake a generated logo into an image. Never initials, an emoji or a generic mark in its place, and never recoloured or re-proportioned. Show a partner's or client's logo in its own form, in greyscale if a row needs calm.

**Approved by the owner 2026-11-17 (question 19):**

- The lockup is two-tone, and two-tone titles mirror it.
- `public/brand/logo-large.svg` is the lockup; `public/brand/logo-small.svg` is the mark.
- Their tones are fixed: the lockup is white and grey, the mark yellow and white.
- The logo files are exempt from the pure white and yellow rules. Nothing else is.
- Clear space is required on every side, equal to the height of the mark. `wugweb-kits` holds the value.
- Minimum size: `wugweb-kits` holds it, with the nav logo as the floor.
- No one-colour version until one is needed. The logo appears only on black.
- The unused `public/brand/wugweb-mark.png` was removed in a site change on 2026-11-18.

---

<!-- references/visual-os/colour-type-photo-motion.md -->

# Colour, type, photography and motion

The character of each, as meaning. No colour value, type size or timing is written here; `wugweb-kits` holds every value.

## Colour roles

### Confirmed (restated from the kits docs)

This file is the one home for the colour rules. `SKILL.md` carries them in short so it stands alone; every other file points here.

- Yellow is the one brand colour and an accent at 10% or less.
- Yellow is a reservation, not an emphasis level. It is the resting fill only on the one conversion action per page and on the footer banner, and the final call to action stays yellow. Other buttons may use it only on hover or tap. On a yellow surface the button inverts to dark.
- Structure stays in brand ink. An accent is spent on one or two things.
- A pillar colour marks its pillar and does not paint structure.
- Text is never pure white.
- The live colour values must not change.
- In a case study, one accent per client, taken from the client's own palette, for rules and numerals only. The Wugweb frame stays.
- In a deck, one dominant colour, one or two supporting and one sharp accent. No accent lines under titles and no edge stripes.

### Source, not yet ruled on (`02_VISUAL_SYSTEM/04_COLOR_ROLES.md`)

Two lines of this source were overruled by the owner on 2026-11-17 and are left out: its role for magenta, and its advice on purple, green and orange. The rulings under "Owner answers" below stand in their place.

| Colour | Role in artwork |
| --- | --- |
| Black | Authority and framing |
| White or warm off-white | Clarity |
| Yellow | Focus and opportunity |
| Teal or cyan | Product or digital systems |
| Royal blue | Structure and trust |

Two to four accents per artwork plus neutrals. People and most photography stay monochrome so colour belongs to the brand system. The guideline marks its own colour values as provisional. Avoid neon and rainbow palettes, and gradients other than the pillar glow.

Palette behaviour by mode, from the same file:

| Mode | Palette |
| --- | --- |
| Editorial thought leadership | Neutral base plus two or three accents |
| Campaign collage | Three or four approved accents |
| Product proof | Neutral product interface plus one or two structural accents |
| Systems and architecture | Neutral base, one anchor colour, restrained structural blue |
| Typographic presentation | High contrast; one headline colour field may dominate |

### Owner answers, 2026-11-17

- **Questions 6 and 21, confirmed.** All six pillar colours stand, in artwork as on the site: Strategy orange, Brand magenta, Experience teal, Engineering blue, Growth green, Operations purple. The interface accent stays grey. Magenta is the Brand pillar colour.
- **Question 15, confirmed.** Yellow is the one brand colour, as in kits.
- **Question 16, confirmed.** The pillar glow is an allowed exception to the gradient ban. Other gradient-heavy looks stay banned.
- **Question 14, confirmed.** The black canvas is the default everywhere. No format uses a light background until the owner names one.

## Type as a graphic object (source: `05_TYPOGRAPHY.md`)

- Type is an editorial graphic object: bold, clean, high-contrast sans-serif at decisive scale with generous margins.
- Type can lead posters, covers and presentation dividers. It does not rescue a hero visual that lacks a metaphor.
- In-art text is a strong phrase, a poster fragment or a purposeful card. No paragraphs, tiny labels or decorative fonts.
- Never rely on text baked into a generated image that must be read exactly.
- Two typefaces at most in any card or slide.
- Never use generated lettering where the text must be read exactly. Set live text instead.
- Break lines on meaning, put the key phrase largest and keep the strongest word at a line end.
- Heading case follows the standing rules; wording is for `wugweb-voice`.
- Type supports the hierarchy and never dominates it.
- Typefaces, weights and sizes are in `wugweb-kits`.

## Logo

The logo rules are held in the Logo section of `art-direction.md` only. Sizes are in `wugweb-kits`.

## Photography (source: `15_PHOTOGRAPHY_DIRECTION.md`)

- Authentic people, hands and objects, monochrome or tightly controlled, as clean high-contrast cut-outs.
- Natural gestures that advance the metaphor: holding, pointing, searching, building, selecting, navigating, observing.
- Avoid staged smiling teams, handshakes, glossy office stock, colourful clothing that fights the palette, and faces made uncanny by generation tools.
- A real photo or screenshot comes before generated imagery. Say so first. A new image file is made only when nothing existing fits, one file at a time, on the owner's yes.
- Existing media follows the media rules in `references/standing-rules.md`.

## Lighting

**Not decided: owner.** No approved source covers lighting. Judge it only for consistency within one piece.

## Motion character

### Confirmed (restated from the kits docs)

- One spring with a slight bounce for nav and hover.
- Load and scroll-in are a fade plus a rise.
- Everything respects reduced motion.

### Source (`16_MOTION_LANGUAGE.md`)

- Imply movement with routes, broad ribbons, changing framing, sequencing and purposeful hand action.
- Motion is calm, precise and editorial; never flashy or game-like.
- Animation must clarify a narrative direction. Do not add motion to make a weak concept feel technological.

### Owner answer, 2026-11-17

**Question 17, confirmed.** A slight bounce is within the brand: the kits behaviour stands on the site. Artwork motion stays calm.

Sound follows the media rules in `references/standing-rules.md`.

---

<!-- references/visual-os/formats-and-campaigns.md -->

# Formats and campaigns

Art direction per format. Sizes, counts, file handling and production steps are in `wugweb-work`. Layout and tokens are in `wugweb-kits`.

## Format decision matrix (source: `08_ARTWORK_FORMULAS/FORMAT_DECISION_MATRIX.md`)

| Format | Default mode | Text in the artwork | Interface allowed | Priority |
| --- | --- | --- | --- | --- |
| Article thumbnail, blog hero | Editorial thought leadership | None; the headline sits outside the image | None or one proof module | One metaphor readable at small size |
| LinkedIn static post | Campaign collage or typographic presentation | A short statement as graphic form | One credible module | Stop-scroll recognition |
| Carousel, presentation | Typographic presentation or systems and architecture | Allowed; type carries hierarchy | Only when the slide proves an interaction | Sequential clarity |
| Service page, website section | Product proof or campaign collage | Body copy belongs in the page, not the illustration | One credible product proof | Product and service relevance |
| Case study cover | Editorial or product proof | Minimal title treatment | One representative product frame | Recognition and a narrative cue |

"No text inside artwork" is not a universal rule. The format decides whether type is excluded, minimal or central.

## Per-format formulas (source: `08_ARTWORK_FORMULAS/`)

Each formula is one or two sentences in the source; the rest of its headings are empty and wait on the owner.

- **Blog hero.** One insight, one tangible metaphor, one hero object, optional monochrome interaction, zero to three supporting layers. A clear anchor and large negative space. No explanatory text in the visual. AI topics show outcomes (navigation, recommendation, discovery), not AI symbols.
- **Case study cover.** A distinctive project-specific object or product outcome that reflects the actual customer or business transformation. Never a generic laptop or dashboard. One representative product frame at most.
- **Editorial hero.** An oversized editorial anchor, decisive framing and one proof visual. Type may share the hierarchy for a manifesto or cover; for thought-leadership thumbnails keep type outside the artwork.
- **Instagram post.** A square-safe composition with one anchor and strong framing. A carousel may sequence one metaphor across frames; do not repeat one layout or overload one card with text.
- **Landing page.** Keep one side clear for live copy. Product interface only as direct evidence of the page claim. The anchor must survive the change from desktop to mobile.
- **LinkedIn post.** Small-scale recognition: high contrast, one memorable silhouette, platform copy outside the image. Remove tiny detail that will not survive feed size.
- **Pitch deck.** The first slide is a confident editorial statement: a strong black field, one anchor, minimal text. Then one-message slides in the same language, not a dense proposal template. Pick each layout by the slide's job (title, problem, big number, quote, comparison, timeline, closing). Alternate what is with what could be.
- **Thumbnail.** One clear subject, contrast and recognisable framing. Remove small interface, labels and thin lines. No paragraphs, dense diagrams or title text inside the image. Test at final size. Image and title are one unit: the image shows, the title tells, and they never repeat each other. Before designing, write in one sentence the promise the piece keeps.
- **Website section.** One text-adjacent conceptual visual per section that reinforces, not repeats, the written claim, and reads without embedded type. The hero visual shows the real product, not an abstract shape.
- **Carousel slide.** A small poster: a headline and at most one supporting line, a slide number and one accent, in the same hierarchy on every slide. The cover must stand alone as an image at thumbnail size. One idea per slide; a single point is a single image.
- **Quote card.** The line must stand alone, or there is no card. One idea, the key phrase largest, lines broken on meaning, two typefaces at most, generous margins, a solid panel over any photo. Legibility at thumbnail size is the deliverable. Never invent, misattribute or strip context from a quote.
- **Data visual.** See Charts and numbers below.
- **Email banner.** One message, a safe framing, high contrast, a restrained hero object, light enough to load quickly. Never rely on embedded copy for the whole message.
- **Ad.** One visual proposition, instant contrast, a clear framing. Lead with an object or metaphor, not a feature list or dashboard fragment. Any call to action stays live platform text.
- **Event.** Large type or an anchor that reads from a distance, a limited palette, a simple silhouette and repeatable geometry. Use the campaign metaphor across signage, slides, handouts and social instead of event-themed decoration.

## Social art direction (source: `03_MARKETING_SYSTEM/04_SOCIAL_MEDIA.md`)

- Design for recognition in two seconds: one memorable object, decisive framing, high contrast, a hierarchy that survives feed size.
- Hold a campaign together through palette, cut-out treatment, rounded geometry and type. Vary the metaphor and hero object between posts.
- Image and title work as one unit.
- Keep a small family of recurring formats, not a new layout each time.
- Each carousel slide is a small poster with one idea.
- Glance test at thumbnail size before approval.
- A stranger should not be able to name the template.
- Keep a small named family of recurring formats (quote card, carousel frame, announcement, cover) so several pieces look like one campaign. A family look is not a clone: pieces share the bones and differ in image, layout and angle, never only in colour.

## Deck art direction (source: `08_PRESENTATIONS.md`)

- Treat slides as editorial pages. One slide answers one question.
- Use oversized type, a geometry field running off the edge, or one proof visual. The canvas stays black (see `art-direction.md`).
- One motif repeated through the deck. No accent stripes and no underlined titles.
- Break the pattern at about one third and two thirds of the deck.
- Diagrams only when they clarify the point.
- The break at one third and two thirds is a full-bleed slide.

## Charts and numbers

- One takeaway per chart. The wording of its title is for `wugweb-voice`.
- For one or two numbers, use a big stat, not a chart.
- Show the source and the date. A number with no source fails the fact check.
- Strip decoration: no 3D, shadow or gradient. Label directly; one base colour and one accent. Scale rules and contrast checks are in `wugweb-kits`.

## Layout types

Five types, as vocabulary for briefs: anchor plus interaction, route, builder, signal, editorial statement. A banner or card has three zones (anchor, message, action) and one call to action. Banner layouts can also be named as type as hero, full-bleed image, split, list or centred badge; state the empty space each leaves.

## Art-direction vocabulary

A banner style list names about twenty styles (for example minimalist, bold type, geometric, retro, editorial, collage, duotone, glass, neon). Use them to name a look in a brief or a pattern entry, never as a recommendation. Neon and glass styles, and anything that reads as a data dashboard, are close to the banned looks.

## Briefing a graphic

Settle before making: the purpose and where it appears, the exact copy (locked, not generated), the canvas, one layout, two or three style words plus palette, and whether it is on brand. For an open request offer three directions that differ in kind, not three shades of one. Leave clean space where live type will sit.

## Making rules that art direction depends on

- No text baked into generated images.
- Use the real logo file where a logo belongs.
- Existing media follows the media rules in `references/standing-rules.md`.

## Campaign systems

Wugweb has no campaign system (owner ruling, 2026-11-17). Do not define one and do not report one as missing.

## AI prompt engine

**Confirmed by the owner, 2026-11-17 (question 7):** Visual OS owns `04_AI_PROMPT_ENGINE`. Its content is not yet absorbed here; the folder is thin.

---

<!-- references/visual-os/judging-a-visual.md -->

# Judging a visual

How to look at an artwork or an artwork brief, and what to say. The check list and scoring are in `review-gates.md`.

This needs a model that can see images. Without one, judge the written brief only and say plainly that the artwork was not seen.

## Before judging

- Ask four things first: what it is and where it will appear, its one claim, which of the five modes it uses (see `art-direction.md`), and the size it will really be seen at.
- Judge the rendered result at its final size, not the idea of it. If only a brief is supplied, say so and judge the brief.
- Describe what is there before judging it, in a fixed frame of six parts: subject, composition, lighting, colour, style, mood.
- Keep observation apart from opinion. Taste is labelled as taste.

## The two-second test

Look for two seconds, then look away. Say what the piece was about and what the eye went to first. If neither is clear, the concept or the anchor has failed, and nothing else needs judging until that is fixed.

Also ask: is that first thing the right thing, what does it feel like, and is the purpose clear without the headline? Then squint, or view at a quarter of the size: one focal point, a clear reading path, still legible at half size. Then view it in black and white and check the hierarchy holds without colour.

## Hierarchy

- It comes from size, spacing and contrast, not from colour alone.
- There is one primary focus.
- The empty space does a job.
- Structural devices (numbers, labels, rules) carry real information, not only decoration.

## Brand checks

- One metaphor, one anchor, no competing focal point.
- Rounded language, asymmetrical balance, breathing room.
- A limited palette with two to four accents.
- No generated imagery passed off as a real screen, result or photograph.
- A real logo file wherever a logo appears.
- A file shown above its natural size is flagged, not banned.

## The look-alike test

Would this come out the same for any similar brief? Does it read as a template, and could a stranger name it? Signs of a generic look: identical rounded cards, one accent on near-black used as a default, stock imagery, pale gradients, all-caps labels used as decoration, a hero that is an abstract shape instead of the real subject. If it is generic, put the subject's own world into it.

## What to judge

| Point | Ask | Common fix |
| --- | --- | --- |
| Concept | Does one idea survive with the headline removed? Is there one metaphor? | Restate the claim; pick one metaphor from `metaphors.md` |
| Mode | Is it clearly one of the five modes? | Choose the mode the evidence fits; drop the other mode's elements |
| Composition | One anchor at roughly 30 to 60% of the canvas? Asymmetry? Real negative space? | Remove the least meaningful element; enlarge the anchor |
| Hierarchy | Does it hold in black and white? | Reduce competing weights |
| Subject | Is the hero object or person doing something that advances the metaphor? Is it specific to the project? | Replace the generic prop with the project's own object or outcome |
| Proof | Is the interface credible and real? Real photo or screenshot before generated? | Use one real module; remove fake widgets |
| Colour | Limited accents? Yellow at 10% or less? No pure white text? | Cut accents; return structure to ink |
| Lighting | Consistent within the piece? | Match treatment across cut-outs. No approved lighting rule exists |
| Density | One anchor, one interaction, up to three supports? | Remove, do not add |
| Format | Does it meet its row in `formats-and-campaigns.md` and read at final size? | Remove small interface, labels and thin lines |
| Banned motifs | Anything on the banned list? | Remove and replace through the metaphor |
| Media rules | Does it break the media rules in `references/standing-rules.md`, for example a cropped file or a mask over the proof? | Follow that file; move the mask |
| Logo | Real file, unaltered? | Use the real file |
| Rights | Is every element labelled? | Label, or remove what is unknown |

## Order of review (source: `09_VALIDATION/Review_Process.md`)

Concept first, then hierarchy in black and white, then palette, then interface plausibility, then legibility at target size. Then score.

## Ranking findings

| Rank | Means |
| --- | --- |
| Must fix | Breaks a brand rule, a media rule or a gate, or carries risk |
| Should fix | Inconsistent with the system or weakens the concept |
| Nice to have | A preference |

Separate real problems from taste. For each finding give where, what, why and a fix, and offer an alternative in the piece's own style. Say what works. Match the depth to the stage of the work: early work needs direction, late work needs polish.

## Reporting

- Result: pass or fail, and the mode chosen.
- Findings as must fix, should fix, nice to have, each with the rule and its file, and the fix as current to proposed.
- Points that rest on an open owner question are reported as "not decided: owner", with the question number, and do not decide the result.
- What could not be judged. If the render was not actually seen, say so.
- Order of the report: overall impression in two or three sentences, findings ranked, what works, the top three fixes in order, then pass or fail with the score from `review-gates.md`.
- Revise by removing or replacing the weakest component.

Never rewrite the piece, make media or change a file. The report goes to the owner or back to `wugweb-work`.

To improve a failing piece, remove or replace the weakest part. Do not add to it.

## For decks and carousels, also check

- One message per slide, and every slide has a visual part.
- One motif repeated, with no accent lines under titles and no edge stripes.
- Layouts vary, and titles of the same kind sit in the same place.
- The pattern breaks about a third and two thirds of the way through.
- Overflow, overlap, uneven gaps, tight margins, misalignment, low contrast, broken words and drift between slides.

## What this does not judge

- Interface usability, design-system consistency and accessibility: `wugweb-kits`.
- Wording and tone of any text in the piece: `wugweb-voice`.
- Whether the piece should exist, or when: `wugweb-strategy`.
- Search markup and alt text rules: `wugweb-seo`.

---

<!-- references/visual-os/metaphors.md -->

# Metaphors

Choose a metaphor before choosing components. Source: `brand_guidelines/07_METAPHOR_LIBRARY/` and `VISUAL_REASONING.md`. In the source, each metaphor has one guidance paragraph; its other headings are empty and are left out here.

## What each shape means

| Shape | Means |
| --- | --- |
| Circle, arc | An ecosystem, market, loop or field of attention |
| Arrow | Transformation, progress, orchestration, movement |
| Grid | Architecture, structure, systems, decision spaces |
| Card, rectangle | A product, module, capability or block of information |
| Rounded container | Calm, premium quality, human-centred design |
| Route | Movement and decision |
| A human hand | Judgement or action |
| Negative space | Clarity, hierarchy, editorial balance |

Never use a shape only because it looks nice. Every shape must carry meaning.

Default shapes: circles, arcs, quarter-circles, pills, rounded rectangles and softly rounded cards. Use one dominant form and quieter supports. Avoid sharp polygons, hexagon patterns, starbursts, confetti and random blobs. Visible grids and connectors are conditional tools for real system maps.

## The ten metaphors

| Metaphor | Use for | Show | Avoid |
| --- | --- | --- | --- |
| Construction | Architecture, capability building, personalisation | Hands assembling cards, blocks, profiles, paper modules or product parts | Hard hats, generic buildings, blueprint wallpaper |
| Creativity | Making, iteration, expressive possibility within a system | Posters, notes, printed fragments, a camera, selected colour fields, meaningful cards | Paint splatter, confetti, chaotic collage |
| Discovery | Research, insight, emerging needs, finding signal | Magnification, search, a folder, a highlighted card, a selected marker | Light bulbs, detective clichés |
| Growth | Momentum, expansion, compounding value | An upward route, a scale shift, a staircase, an expanding field | Rockets, stock-chart arrows |
| Intelligence | Informed action, recognition, recommendation, decisions | Selected signals, knowledge cards, adaptive routes, human judgement | Brains, robots, neural webs, circuitry |
| Learning | Feedback and continuous improvement | An evolving object, an annotated notebook, a loop, a before and after state, an iterative route | Graduation caps |
| Navigation | Direction, customer journey, strategic choice | A map, compass, route, marker or destination card | Steering wheels, ships, GPS dashboards |
| Orchestration | Coordinated systems, full-funnel movement, always-on operations | Routes, modular stations, sparse connected steps directed by human judgement | Dense node webs, dashboard control rooms |
| Transformation | Movement from the current state to a new operating model | A broad ribbon, a route, a changed object, a transition between fields, a hand repositioning a component | Unearned before and after arrows |
| Trust | Credibility, transparent choice, reliability | A document, a verified profile, a signature, a considered action | Shield and lock wallpaper, handshake stock photography |

Robots, brains, circuitry and holograms are never a shortcut for AI. Show outcomes such as navigation, recommendation or discovery, not AI symbols.

## Methods for finding a metaphor

Use one method, at most two: turn the product's action into a symbol, join two meaningful ideas, use negative space, or use construction geometry. Settle the strategy first: the category, the audience, the function, the feeling to leave, the trust level and what to avoid. Never pick a symbol at random.

A visual system should answer five questions: what the brand stands for, the core metaphor, how the mark carries it, how it scales across screen, print, image and detail, and why it is ownable.

The working steps:

1. Start from the one claim in `messaging.md`.
2. Ask what the audience would physically do to cause that change: search, assemble, select, navigate, place.
3. Pick the tangible object that carries that act.
4. Check it against the "avoid" column and the banned list in `art-direction.md`.
5. Vary the metaphor and hero object between posts in a series; keep the language constant.

Do not reuse the same profile-card-and-phone layout across unrelated topics because it worked once.

## Case-study covers

A cover shows a project-specific object or outcome that reflects the actual client's change. It is never a generic laptop or dashboard. Pick the metaphor from the client's own work, not from this list alone.

## Keep the series fresh

Within a series, keep the shared look and change the metaphor and hero object each time. Never repeat the same person, circle and card layout across unrelated topics.

---

<!-- references/visual-os/objects-and-components.md -->

# Objects and components

The eleven artwork components. Source: `brand_guidelines/06_COMPONENT_LIBRARY/` and `02_VISUAL_SYSTEM/14_OBJECT_LIBRARY.md`. These are parts of an artwork, not interface components; interface components are in `wugweb-kits`. Approved patterns and examples are empty in the source and wait on the owner.

Use three to six components at once, never all of them. They are vocabulary, not a checklist: good work often uses only three to six, each with a stated role. Each must support the narrative, keep the composition editorial and be used only when it means something.

| Component | Means | Use | Avoid |
| --- | --- | --- | --- |
| Cards | Information, capability or product state | Generous interiors, rounded corners, content that feels real. Stack only to show hierarchy | Scattered generic cards, tiny unreadable fragments |
| Devices | An actual interaction | A phone, tablet or browser frame showing search, a route, a preference, a recommendation, a profile or a selection. Credible, rounded, naturally angled, below the hero metaphor. One is normally enough | A device as the hero; a device for decoration; a generic laptop |
| Geometry | The anchor | One oversized circle, rounded field, arc or quarter-circle. Supporting geometry is smaller and quieter | Shapes that compete with the hero |
| Maps | Discovery, journey, territory, context | Simple regions, markers or routes, paired with a human act of reading, selecting or navigating | Literal GPS or dashboard detail |
| Objects | Strategy made tangible | One hero object: compass, map, folder, notebook, puzzle, paper, report, package, magnifier, tab, camera, card or block | Prop piles; generic light bulbs, gears, rockets, floating technology icons |
| Photography | The human role | High-contrast monochrome cut-outs of real people, hands and objects in an active pose | Colourful corporate stock, decorative faces |
| Primitives | The base vocabulary | Person or hand, hero object, rounded card, credible interface, circle or arc, colour field, route or ribbon, one optional accent | Using the set as a checklist |
| Ribbons | Continuity, movement, transformation | Broad and rounded, leading the eye from origin to outcome, only when the story has real movement | Decorative swirls |
| Routes | Decisions or an orchestrated sequence | Few turns and destinations, a clear origin and outcome | A dense technical process map |
| Scribbles | A single human accent | One scribble, marker line or tiny dotted field | Several marks; marks hiding poor hierarchy |
| Interface modules | Proof of the concept | Plausible profiles, search, recommendations, route cards, preference chips, product cards, notifications, map panels, filters, settings blocks | Fake analytics widgets; modules as filler |

## Icons (source: `19_ICONOGRAPHY.md`)

Icons are secondary. If needed: simple rounded outlines, consistent stroke, nothing emoji-like. Prefer an object or a real interface state when it carries more meaning. No icon clouds, mosaics of technology logos or isolated generic symbols as the central concept.

## Choosing a hero object

Pick the one whose behaviour supports the narrative. A prop belongs only when it directly carries the idea. On a case-study cover the object or outcome is specific to the project.

## Using real interface

A real screenshot is evidence. Show it only when the product experience is the proof. Use the client's real screens, never invented ones, and check whether a flagged screen (sample data, placeholder text) is critical before hiding it. A device frame is a mask around real content; it must not hide the part that proves the claim. Generated work is never presented as a real product screen, a real client result or a real photograph.

## Spacing and grid, as feel

Use an invisible grid to align edges, type and cards. Spacing follows a visible rhythm: generous outer margins, clear separation of layers, a quiet zone around the hero. The exact steps are in `wugweb-kits`. Whitespace is a design element; never compress a visual to fit every part in. Visible grids, nodes and connectors are for architecture, blueprint or network ideas only.

---

<!-- references/visual-os/references-and-patterns.md -->

# References and patterns

How evidence becomes a rule, the pattern registry, and the reference inventory.

The library itself is nearly empty: sixteen of the seventeen reference files hold a format and no entries, and no image files are in the repo. Do not describe a reference that has not been seen.

The chain: reference, then observation, then pattern, then principle, then rule. Something seen once is a candidate; if it repeats across sources, promote it.

## Evidence rules

1. Order: owner decisions, then approved patterns, then observations.
2. A pattern is promoted only when it repeats across several sources.
3. An observation is never applied as a rule.
4. Every reference carries a rights label from `review-gates.md`.
5. A lesson that would change the system is shown to the owner as a Change proposal before it is treated as a rule.
6. Evidence ranks: owned Wugweb source files and approved design files, then the current public website and portfolio, then past Wugweb material, then external inspiration used only to compare principles. Where a past and a current source conflict, the current approved decision wins.

### Evidence log

One line per entry: `date | source | what can be seen | confidence | linked observation or pattern | note`. Log what is visible, not opinion. A source supports a pattern only when its specific visual fact is recorded.

### A reference is usable when

- Its rights and source are recorded.
- The observation describes what is visible, not an assumption.
- Repetition or the owner's approval supports its confidence.
- It is linked to an observation, a pattern or a decision.
- It does not contradict current approved direction without a documented change.

## Pattern registry (source: `brand_guidelines/PATTERN_REGISTRY.md`)

The source lists eight names with no evidence, meaning or confidence recorded. They are kept as names; each entry waits on evidence.

| Pattern | Evidence | Confidence |
| --- | --- | --- |
| Collage-first composition | Not recorded | Not recorded |
| Designer-made editorial feel | Not recorded | Not recorded |
| Rounded geometry dominance | Not recorded | Not recorded |
| One dominant geometric anchor | Not recorded | Not recorded |
| Real interface over fake widgets | Not recorded | Not recorded |
| Limited palette per artwork | Not recorded | Not recorded |
| Asymmetrical editorial balance | Not recorded | Not recorded |
| Metaphor-led visuals | Not recorded | Not recorded |

Entry shape for a new pattern: name, mood, best for, do not use for, evidence sources, meaning, confidence, rule.

The guidelines' observations also record these as repeated findings, each a candidate only until the owner decides or repetition is documented: simplification improves the result; conceptual metaphors beat literal explanations; dense node graphs and generic AI-brain motifs weaken the brand. The other seven match the registry names above.

## Reference inventory (source: `05_REFERENCE_LIBRARY/16_PROJECT_SOURCE_INVENTORY.md`)

Nine images are described in the source. None of the image files is in the repo, so they cannot be checked here. They are reference evidence, not approved templates.

| Described reference | Evidence for |
| --- | --- |
| Magenta anchor, yellow path, cyan block, monochrome hand and stairs, dense connectors | The conditional systems and architecture mode; not default density |
| Design-system collateral with a primary pink and a wider named palette | Palette provenance; values to be verified in an owned source |
| Digital Strategy collateral: oversized yellow circle, browser frame, speech bubble, black type panel | Campaign collage and product proof |
| Message Architecture collateral: poster-like type, rounded black title panel | Typographic presentation |
| Social Media Marketing collateral: device frames, portraits, bold colour fields | Device proof in campaign mode |
| Voice and Tone collateral: circular image masks, large type panel | Editorial type and circular masks |
| Creative Direction collateral: framed art, magenta anchor | Curated reference collage |
| User Research collateral: large persona cards, yellow anchor | Information cards as real content |
| Brand Strategy collateral: hands, puzzle object, yellow circle, black title panel | Tangible-object metaphor and hand interaction |

## Missing evidence

No Master Theme PDF, source Figma file, approved token export, approved or rejected examples, or rights records are on file. The owner's Visual OS document has not been supplied (question 10).

## Comparing references

Compare 3 to 5 references on fixed axes: mode, anchor, palette behaviour, density, type role, human role. Record what each does, then the principle to take. Never copy a composition. Use fixed questions: how many colours and what each is for, how type is paired, how shape and imagery are used, how dense the layout is. Give every colour a role and a reason. State the pattern in your own words. External studios are principle-level inspiration only; never copy their composition, type, imagery, campaign assets, logo or whole look.

## Rights

Labels are in `review-gates.md`. A client's product screen or an identifiable person is used only with approval.

To ask the owner for:

- The Visual OS and Brand Strategy documents.
- The nine reference images, with sources, dates and rights.
- The approved design file or token export.
- Approved and rejected examples for each format.
- Current public website captures with retrieval dates.
- Original or licensed source photography used in past campaigns.

---

<!-- examples/README.md -->

# Examples

Empty on purpose. Approved and rejected visuals go here once the owner supplies them (question 10), for each format. None will be invented or generated.

Each example is a short Markdown record, not a media file. Media lives in R2 only and is never copied here.

| Field | Holds |
| --- | --- |
| Name | A short name for the piece |
| Where the original lives | The R2 path or page |
| Format | From the format matrix |
| Mode | One of the five visual modes |
| Verdict | Approved or rejected, by the owner, with the date |
| Why | The rule it shows or breaks |
| Rights | One rights label |

Each record also keeps its source, date and the observation it supports.
