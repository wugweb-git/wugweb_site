# Changelog

## 2.4.0, 2026-11-16

Rules checked against Google's and the AI vendors' own pages, read on
2026-11-16.

- Title, description, alt text, redirect and click-depth figures are marked
  as house limits; Google sets none of them.
- "Title not word for word the H1" becomes "the title and the H1 say the same
  thing".
- `schema-context` drops from MEDIUM to LOW.
- JSON-LD stays in server HTML; the reason is corrected.
- Added: FAQ rich results ended 2026-05-07; breadcrumbs show on desktop only;
  Google-Extended, ChatGPT-User and Perplexity-User notes; the Cloudflare
  default block; the dated source for the script-only content rule.
- Report: the 16 month figure is removed. Added AI traffic inside the Web
  totals, the Generative AI report, the 1,000 row table limit, the Bing AI
  Performance report and the ChatGPT `utm_source` note.

## 2.3.0, 2026-11-16

The owner's answers to the twelve open questions.

- `FAQPage` is allowed for questions the page visibly carries from its `faqs`
  field, written by `wugweb-work`. New check `schema-faq-content` (HIGH).
  `HowTo`, review stars and aggregate ratings stay banned.
- Existing `public/llms.txt` and `ai-context.txt` stay as they are; llms.txt is
  never recommended.
- Blog posts carry `BlogPosting` with a `Person` author and show their date.
  Case studies show no date. A shown date matches the schema date.
- The audit does not check titles for dashes.
- Fixed rules split: rules for every site, and wugweb.com rules in their own
  section.
- The description lists trigger phrases per part.
- A Search Console export is the standard source of search data.
- Leads named: `analytics-skills:traffic-change-diagnosis` for the report,
  `searchfit-seo:technical-seo` for the technical checks.
- Tags stay "few and specific", with no fixed number.
- Links: `wugweb-strategy` decides which pages a piece links to; this skill
  owns the link rules and audits them. Replaces the 2.2.1 wording.

## 2.2.1, 2026-11-16

Owner decisions.

- Link targets: `wugweb-strategy` sets the pillar and cluster structure;
  this skill picks each brief's link targets inside it and checks the links
  in the audit.
- `aeo-brand-scan:scan` stays optional and runs only after the owner's yes.

## 2.2.0, 2026-11-16

The ten changes and the "Extracted and absorbed" tables from the wugweb-seo
alignment plan on the registry page.

- Boundary: `wugweb-work` makes every piece and owns the copy; visible wording
  is asked of it. New rows for `wugweb-strategy` (what to publish, reporting
  on posts) and `wugweb-brand-os` (name, descriptor, approved facts, read
  only). No link with the voice skill. The `wugweb-content` row is removed.
- Title rule: the site adds " | Wugweb" only when the title does not already
  name Wugweb and the total fits in 60.
- Schema: the layout's sitewide `Organization`, `WebSite` and founder stay; other
  page types are not decided.
- Plan part: two callers. `wugweb-strategy` gets the site keyword map, topic
  gaps and refresh list; `wugweb-work` gets one brief or a platform keyword
  note for LinkedIn, Behance or Dribbble.
- Audit fix list split three ways: one page to `wugweb-work`, every page using
  a block to `wugweb-kits`, code to a developer.
- Report part feeds `wugweb-strategy`.
- Owner decisions: FAQPage site-wide, schema for other page types, the
  existing `llms.txt`.
- Absorbed rules restated in `references/plan.md`, `references/audit.md` and
  `references/report.md`, with their sources. Every helper is now optional.
- `references/handoffs.md` rewritten to the link table; platform keyword note
  helpers added.
- `scripts/check-page.mjs`: four new checks, from 13 to 17: `title-rendered`,
  `share-tags`, `share-url`, `schema-context`.
- Two new evals, eight in all.

## 2.1.0, 2026-11-16

Aligned with the wugweb-seo page in the skill registry.

- The plan part now returns an outline as well as constraints: the topics a
  page must cover, in order, each with the fact from the source it rests on.
  Topics only; the maker writes the headings. The registry page asked for an
  outline and 2.0.0 had none.

## 2.0.0, 2026-11-16

Rebuilt to the house skill format and aligned with the owner's fixed SEO rules
on the wugweb-seo page of the skill registry.

- One skill with three parts: plan, audit and report. The seven modes of 1.0.0
  are folded into them.
- New fixed rules from the registry: one slug per case study and no redirects
  for old or Framer addresses; a case-study source title of 51 characters or
  fewer; a description of 140 to 160 characters; `WebPage`, `CreativeWork` and
  `BreadcrumbList` on the main site address, with Wugweb as creator and
  publisher and no author.
- Removed advice that contradicted those rules: `FAQPage` schema, question
  headings, an `llms.txt` file and a 50 to 60 character title.
- Removed rules that belong to the owner's shared rules file or to
  `wugweb-voice`. This skill now points to them.
- New `scripts/check-page.mjs`: 13 checks on rendered HTML, each with a check
  id, a severity and a "Not checked" list.
- New `scripts/check-robots.mjs`: resolves search, citation and training bots
  against robots.txt for one path.
- New `scripts/test.mjs` with fixtures in `examples/`, and
  `scripts/validate.mjs` for the skill's own format.
- New `references/plan.md`, `references/audit.md`, `references/report.md` and
  `references/handoffs.md`. Handoffs match those in `wugweb-work`.
- New `evals/evals.json` with six prompts.
- Usable outside Claude: `AGENTS.md`, a Cursor rule, custom GPT instructions
  and `agents/openai.yaml`, all generated by `scripts/build.mjs`.
- Style: British spelling, sentence case, no em or en dashes.

## 1.0.0, 2026-10-07

- First build: one `SKILL.md` with seven modes and no scripts, references or
  tests.
