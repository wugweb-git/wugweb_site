# Changelog

## 0.4.2, 2026-11-17

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
