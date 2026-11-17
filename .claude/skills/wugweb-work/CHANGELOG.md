# Changelog

## 0.5.0, 2026-11-17 (revised the same day, still called 0.5.0 at the owner's word)

- Two rules carried over from the 2026-10-19 research review: a video with speech needs captions or a transcript from the owner's source (`media-standard.md`); a quote carries the person's photo only when the owner supplies it (`copy-and-seo.md`).

- Live eval rerun graded (evals 2, 3, 4, 5, 8: 26 of 31; whole run now 64 of 78, 8 of 14 in full). Skill fixes: the audit ends with the owner questions as one numbered list (`evidence.md`); each flow names at least one design principle; video records carry every base field (`visual-read.md`).

- From the live eval rerun: the `visual-read.md` example no longer teaches a wrong-client call (the Airtel-named file is a misnamed IndusNinja board); animated GIFs are read like videos; `ops-cycle.md` names both site-copy headings the bodies use; `SKILL.md` step 7 says the SEO title and description are handed to the owner as paste-in text, never written to his source.

- Two more brand-os pointers (its eval 38 rerun): the claim order (`SKILL.md` step 2, `copy-and-seo.md`) and the meaning of "crop" (`forms.md`, `media-standard.md`) now point to `wugweb-brand-os` (`messaging.md`, `vocabulary.md`). The brief template keeps its fields, which the step needs.

- `body-content-standard.md` names the `Section:` separator as `Section: <chapter> | <label>`, matching the parser v2 on branch `case-body-v2`.

- Internal links (owner, via `wugweb-strategy` 497a6710): a case study links up to its service page only, never a sector page, and across to two or three sibling case studies. The pending mark is removed.

- SEO rules sorted with `wugweb-seo` (2.5.0, relayed by the coordinator): title limit, description length, one slug and no redirects, entity naming, server HTML, no keyword counts or `llms.txt`, and share tags now point to `wugweb-seo`; FAQ points to the agreed strategy and seo line; internal links follow seo's rule for now, with sector link-up pending `wugweb-strategy`; H1 wording, description wording and the entity list stay here.

- Voice rules sorted with `wugweb-voice` (its answer on main 3ef0c4a6, relayed by the coordinator): "we" or "I", the client's on-screen terms and no dashes are now pointers to `wugweb-voice`; tone, say what was built, the 6 to 20 word range, plain words, active voice, honest-credit phrasing, no throat-clearing openers, the banned words and tone by form are marked candidate (working rules here, pending the owner's yes or samples there); the rest stay this skill's own. SEO lines untouched until `wugweb-seo` answers.

- Owner answers to the three eval questions (2026-11-17): a direct request for a v2 proposal still runs Audit, Media and Look first (`SKILL.md` step 5); a published v1 body counts as proof for the facts it already publishes (handoff 7); the hero subtitle is proposed only after the body is read (`copy-and-seo.md`). Recorded in `open-items.md`.

- First eval run and independent grade (2026-11-17): 56 of 78 expectations, 6 of 14 evals in full; most fails were the dry run not reading its sources. Skill-side fixes: the brief check uses the six fields `wugweb-strategy` sets (links and date no longer stop a draft) in `own-content.md` and handoff 7; draft standards are reported as drafts awaiting the owner's review; every reply says what was written and where, or that nothing was (`SKILL.md` rule 10); metric parts agree (baseline or benchmark) across `forms/charts.md`, `body-content-standard.md` and `qa-checklist.md`, pointing to `copy-and-seo.md`; the loop pause rule has one home (`media-standard.md`); hashtags: no hashtag lists, LinkedIn tags none; `publish-approval.md` step 6 marked not applicable when no file is made; `skill-map.md` install states current; a typo in `copy-and-seo.md`. Eval 14 updated to the owner's 2026-11-17 decisions (Behance size adopted, LinkedIn tags none).
- Made files and scheduling settled (owner, 2026-11-17): made files are kept in the media store (R2) under the piece's folder, each on the owner's yes, placed by the owner (the skill never uploads); no scheduling tool is connected, so posts are handed over as approved drafts. No matter is now open with the owner. `open-items.md`, `forms.md`, `publish-approval.md`, `ops-cycle.md`, `SKILL.md`, `README.md`, `metadata.json`.

- Brand rules pointed home (from `wugweb-brand-os` eval 38): the yellow share rule (`layout-grammar.md`), the messaging order (`copy-and-seo.md`) and the case-study cover rule (`visual-read.md` heroScore, `layout-grammar.md` cover line) now point to their files in `wugweb-brand-os` instead of restating them.

- Voice rulings (owner, via `wugweb-voice` 3ef0c4a6): "we" or "I" is the owner's pick per piece, asked in the brief or proposal; the voice check reply opens with a 40 to 60 word summary row; translated copy is out of scope until English is calibrated; the voice is uncalibrated until the owner supplies writing samples, so voice findings are low confidence and reported as such (`handoffs.md` handoff 5, `copy-and-seo.md`). `test.mjs` now checks the marked standing-rules copy against `docs/skills/STANDING-RULES.md` (the home file wins) and that it is built into `AGENTS.md`.

- Story safe zone (finding by `wugweb-seo`, read on the platform's own help pages, 2026-11-17): the 1080 x 1920 canvas is official; there is no official pixel safe zone. `forms.md` and `open-items.md` now say keep the top, bottom and sides clear, wider margins, the bottom 40% clear of text on Reels ads, and never state a pixel figure as a rule.

- FAQ block rules agreed by `wugweb-strategy` (33e60149) and `wugweb-seo` (90340cf9) recorded in `own-content.md`: service pages and blog posts only, never case studies; questions from the signal log approved by the owner (brief field 8), answers only from the owner's source (field 11), unanswered questions cut, count never padded. Pointers in `SKILL.md`, `schema-jsonld.md`, `layout-grammar.md`, `copy-and-seo.md`, `handoffs.md`; the gate script fails FAQPage on a case study. Brand: Wugweb has no campaign system.

- NTUC is a worked example only (owner, 2026-11-17): its facts are no longer an open item. One matter remains with the owner: where made files are kept and whether a scheduling tool is connected.

- Brand rulings: three held lines removed because the owner ruled that set null (claims marked "unverified", dashboards only for software, campaign systems not decided). Kept: the client is the hero, "does a lot, into one" is an idea, black canvas by default. FAQPage confirmed by the owner in this session ("faq will be there"): the settlement rule stays.

- Deck and card type sizes (owner via `wugweb-kits`, kits commit 2946127e): made files use the existing graphic and fluid body tokens by role, the text holder is a size container, no new token; `forms.md` and `forms/deck.md` point to kits' `references/component-sizes.md` and restate no values.

- FAQPage follows the `faqs` settlement (owner, 2026-11-17, in this session): allowed only from the `faqs` field where every question and answer is visibly on the page and comes from the owner's source; HowTo and review stars stay banned. The gate script now checks each FAQ question and answer against the visible text instead of banning FAQPage.

- Rulings relayed by the coordinator from the sibling sessions: made-file sizes adopted as written (no "proposed" marks); brief field 9 (the strategy brief carries the `wugweb-seo` keyword note pasted unchanged); token check reports only first, blocking once case study components are clean; loops (15 seconds or less, over 5 seconds gets a pause control and is not hidden, 5 seconds or less without a control stays hidden, all stop under reduced motion; the gate script no longer requires `aria-hidden`); rail 85vw never past the 1200 maximum, peek 20%, signature width 2400 px, lines 35 to 60 characters, all owned by `wugweb-kits`; the five existing blocks signed off; `ui-system-mapper` merged into `wugweb-kits` and retired; brand rulings from `wugweb-brand-os` held in `handoffs.md`. Card thumbnails: every card is 16/10, original ratio kept, the frame is a mask (no crop, no re-encode). Two matters remain with the owner and one (the old media ratios) is shared with `wugweb-kits`.

- Open items reconciled: one count in `SKILL.md`, `README.md`, `metadata.json` and `references/open-items.md`. The `faqs` clash is settled as reported by `wugweb-kits` (layout shell commit 908ce91b): `faqs` kept, FAQPage only where every question and answer is visibly on the page; `seoCanonicalUrl`, `schemaType`, `aiSummary` and `keyTakeaways` dropped on case studies.
- Later answers: Medium is not a form (repost unchanged); the owner uploads to Behance and Dribbble and the skill hands over a list; a Dribbble screen is never on a plain canvas; the three made-file sizes are confirmed. Two matters remain with the owner (NTUC facts; where made files are kept and whether a scheduling tool is connected). Earlier answers: the plan is approved and Part 1 stays locked (Part 2 still needs his go); replies and outreach are out of the Forms module; LinkedIn tags are none. Two matters remain with the owner after that (see above) and four are shared with `wugweb-kits`.
- `README.md` version line corrected.

Lock version for Part 1. Same content as 0.4.3; the number marks the stable baseline.

- No rule changed, no reference moved, no script edited.
- `metadata.json` status reads "Part 1 locked at 0.5.0".
- Future changes to Part 1 go to 0.5.1 and above until a decision calls for 0.6.

## 0.4.3, 2026-11-17

Portability bump. No skill rule changed.

- Added `agents/openai.yaml` for Codex and the ChatGPT desktop app; matches the sibling skills.
- Added `export/wugweb-work.md`, the single-file export at the shared path. `AGENTS.md` stays too; both are generated by `scripts/build.mjs` from the same sources.
- `references/skill-map.md`: `ui-ux-pro-max` and `banner-design` moved out of "not found installed" into the live tables. The owner approved installing both in their Claude account on 2026-11-17; their rows in the Look row and the Forms gate stand.

## 0.4.2, 2026-11-17

Later the same day, in the same version:

- Full read of the references, forms and examples against the plan and standing rules. Fixed: duplicated standing rules removed from `copy-and-seo.md` and `forms/presence-compare.md`; 44 px and the 375 and 1200 gate numbers replaced by pointers to `wugweb-kits` in `design-principles.md`; the 5 second pause note added beside the 15 second loop rule in `body-content-standard.md` and `archetypes.md`; three figures with no recorded source (sentence length and page position in `copy-and-seo.md`, the FAQ and HowTo end dates in `schema-jsonld.md`, the 44 case studies in `archetypes.md`) marked unvalidated. Left as they are: the NTUC tag spelling (the client's term), real file names with en dashes, deliberate test data, and the `forms/` lines that restate the per-post and per-file yes rules.

- `SKILL.md` "Rules that always apply" cut from 15 to 10: the rules the standing-rules file already holds (evidence, ratio, sound, computed numbers, full output, plain replies, house spelling) are removed; the skill keeps its own. The adapter text says it is a short form and that `references/standing-rules.md` wins.
- `layout-grammar.md`: removed the 390 x 844 and "below 480" numbers; the 85vw rail, 20% peek, 2400 px and 35 to 60 character line are marked as held proposals for `wugweb-kits`.
- Loop pause: added to the gate list in `qa-checklist.md` and `check-case-page.mjs` as a manual check; the clash with `aria-hidden` loops is an open item for `wugweb-kits`.

First repo copy (master). Changes from the app copy 0.4.1:

- The owner's standing rules are now one block, `references/standing-rules.md`, copied from `docs/skills/STANDING-RULES.md`. The duplicates in `SKILL.md` "Never do" and `ops-cycle.md` are removed; the skill keeps only its own three never-do lines.
- Loop pause: `open-items.md` now points to `media-standard.md`, where the rule is written.
- `skill-map.md`: `wugweb-kits` is installed under that name (old name `ui-system-mapper`).
- `open-items.md`: added plan vetting and the `faqs` field clash with the existing blocks awaiting sign-off.
- Evals: the folder is not in this copy. README says so and `validate.mjs` skips the check with a note instead of failing.
- `SKILL.md` frontmatter name is unquoted, so `build.mjs` no longer writes a quoted adapter file name.
- `validate.mjs` treats `standing-rules.md` as a verbatim copy, exempt from the vendor and agent-name checks.

## 0.4.1, 2026-11-16

Rebuilt from the plan file at commit `3c8ef8c`, which records the owner's decisions of 2026-11-16.

- Settled and no longer marked open: the three media-rule readings (confirmed); token findings (reported only at first, blocking later on a short list); the brief (Brief mode is for client work only and is written here); the hero subtitle (90 characters); the share image (1200 x 630).
- New rules from the owner: accounts in scope; a post waits until the page it links to is live; no client is named or tagged without permission on record; the newsletter is in scope and sending needs the owner's yes; a loop longer than 5 seconds gets a pause control.
- The brief from `wugweb-strategy` now also names the pages the piece links to.
- Open items are now six: NTUC facts, the remaining social questions, Medium as a form, three made-file sizes, LinkedIn tags, replies and outreach. Pointers use the item's name, not a number.
- "Nothing wider than its natural size" replaced by "a file shown above its natural size is flagged".
- Evals 9 and 14 updated to match.

## 0.4.0, 2026-11-16

Part 1 built from the plan file at commit `1c0d925`, the same text as the plan page edited at 17:11 UTC. Part 2 (site code) is out of scope.

- `SKILL.md` stands alone: it now carries the approval gates and the hard stops as well as the source, evidence and media rules and the nine modes.
- Track 2: `references/own-content.md` rewritten with the eight steps, the brief fields, and the body standards for blog posts, service pages, and site and landing copy, marked as a first draft for the owner's review.
- New `references/evidence.md`: finding format, one verdict per piece, sensitivity sort, evidence ledger, fact lock, change log, number rules, source log.
- New `references/open-items.md`: the nine matters open with the owner, each with the working assumption used until it is decided.
- Layout values are no longer restated. `layout-grammar.md` points to `wugweb-kits` and the layout shell document.
- Forms: newsletter edition and advocacy copy added; proposed sizes for made files added and marked open; rules for posts, carousels, charts, decks, captions and threads absorbed. Replies and outreach are out until decided.
- Gate: widths are 375, 767, 768, 769, 1199, 1200 and 1201; verdict of publish, publish with fixes, or no; cheap checks first; renderer check; no redirects.
- Interface copy is written here and voice-checked.
- Helper list: a decision for each helper read (absorbed, optional, ignored), the clash table, and one helper that is never run.
- Evals: 14. The blog post eval now expects "no brief, no draft". Two added: a service page from a brief, and an open item marked as open.

## 0.3.0, 2026-11-16

Brought in line with the registry and the plan page as they stood at 16:44 UTC.

- Scope: two tracks. Client work keeps the full cycle. Wugweb's own content (blog posts, service pages, site and landing copy) is in scope through `references/own-content.md`; its body standards are marked not decided.
- Media rule replaced: showing media resized is allowed when the aspect ratio is kept; clipping masks are allowed; a file shown larger than its natural size is a flag, not a ban. Cropped files, re-encoding, uploads and local copies stay banned. The rule lives in `references/media-standard.md` only.
- Six-skill system: a "Who owns what" table; handoffs to `wugweb-voice`, `wugweb-brand-os`, `wugweb-kits`, `wugweb-strategy` and `wugweb-seo`. `ui-system-mapper` is now named `wugweb-kits`.
- One home per rule: layout, design vocabulary, schema, voice and on-page rules are marked as held for their owner skill. Nothing was moved or deleted; they move when the owner skill is approved.
- Token findings are reported, not blocking, until the owner decides.
- Forms module: `references/forms.md` is now an index, with 11 files in `references/forms/` (fact pack, LinkedIn post and carousel, Behance, Dribbble, deck, PDF, charts, share image, presence compare, publish approval) and 3 examples. Platform sizes are no longer written from memory.
- Helper list follows the owner's final list: 22 core, 19 situational, 17 second opinion.
- Never post or schedule without the owner's yes for that post.
- Evals: 12. The blog post eval no longer expects a refusal. Four added: post approval, chart refusal, the media rule, planning handed to strategy.
- Scripts: `build.mjs` and `validate.mjs` read nested reference folders; the validator checks the forms index, relative pointers and the scheduling tool name.

## 0.2.1, 2026-11-16

Checked against the 60 rules in the research file `skills-and-research.md`. Added what was missing and not overruled by an owner decision:

- Brief: a one-line case read (sector, buyer, disciplines, evidence, sensitivity) that sets the motion level.
- Copy: structure rules, the not-templated test, identical numbers everywhere, approvals and non-disclosure handling.
- Media: honest-media rules, a permission field, pause control for loops over 5 seconds, a note when a muted video carries speech.
- Layout: at least 4 block families on long pages, keyboard-reachable rails, viewer at natural size, text size and line length.
- Gate: approvals, schema validator, link check, keyboard and screen reader pass, 320 px and 400% zoom, accessibility scan, Core Web Vitals.

## 0.2.0, 2026-11-16

- Made the skill usable outside Claude: `AGENTS.md`, a Cursor rule and custom GPT instructions, all generated by `scripts/build.mjs`.
- Added `README.md`, `metadata.json`, `scripts/validate.mjs` and `scripts/test.mjs`.
- Added `references/handoffs.md`: four written requests to specialist skills, and the findings that are declined.
- Rewrote `references/skill-map.md` by capability, with permission levels, an own procedure for every capability, and fallbacks.
- Routing: general SEO, blog posts and service pages are handed off; three routing evals added (8 evals in total).
- Rails now require named slide groups, per the W3C carousel pattern; the viewer needs a visible close button; long videos need a label. The gate script checks all three.
- NTUC is one example among several, not the reference case. Archetypes are set after the visual read.
- Frontmatter: version moved under `metadata`, description quoted, licence added.

## 0.1.0, 2026-11-14

- First build from the plan: `SKILL.md`, 12 references, 2 scripts, 3 examples, 5 evals.
