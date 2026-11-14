> Research for the wugweb-work skill plan, run 2026-10-19 (read-only). The plan itself is on Notion: https://app.notion.com/p/415bb710b9ab818b8057cc9b2c2ed922

# Installed skills digest and web research

I've finished both parts and checked the repo against them. All 27 requested skills were found, and the research turned up several things that change the rules you'd write.

Four findings that matter most:
- **FAQ rich results are now gone entirely.** Google stopped showing them on May 7, 2026, beyond the August 2023 restriction you mentioned. HowTo went in September 2023.
- **Your current page breaks several of the rules below.** `/work/[slug].astro` gives screens generic alt text, sets no image dimensions, and has a hero video with no poster.
- **The site does no image resizing at all.** It uses `imageService: 'passthrough'`, so you'll need to generate image sizes yourself.
- **Your content model can't tell a phone screen from a logo.** `galleryPaths` is a plain list of file paths, with no type, alt text, caption or size per item. Without that, the layout can't adapt to the media.

I couldn't see the studio pages visually: the browser pane wasn't allowed to load them. So layout is inferred from HTML order, file names and image sizes. Metalab, R/GA, frog and Koto put almost nothing in their server HTML, which is itself a finding about AI crawlers.

---

## PART 1: Installed skills digest

Every requested skill was found. `create-content`, `create-topic` and `generate-schema` are slash-command files, not SKILL.md files. Some skills also have older copies in a second session folder (`…/5af6230d-…/a2039669-…/rpm/…`) and under `/Users/abcom/.claude/plugins/marketplaces/claude-plugins-official/plugins/…`. I read the copies listed here.

| Skill | Absolute path |
|---|---|
| rampstack content-and-copy | `/Users/abcom/Library/Application Support/Claude/local-agent-mode-sessions/fe22c8da-2dcb-4af0-9d0c-50adfbca5694/b914284f-c118-4df2-a600-bf602c5d965d/rpm/plugin_01FL78hKqXjBJeWzdAi5MVtg/skills/content-and-copy/SKILL.md` (+ `references/content-edit-checklist.md`) |
| rampstack seo-aeo-geo | same root `…/plugin_01FL78hKqXjBJeWzdAi5MVtg/skills/seo-aeo-geo/SKILL.md` (+ `references/extraction-friendly-patterns.md`) |
| rampstack seo-onpage | `…/plugin_01FL78hKqXjBJeWzdAi5MVtg/skills/seo-onpage/SKILL.md` (+ `references/title-and-meta-patterns.md`) |
| rampstack seo-keyword / seo-content-audit / skill-creation-walkthrough | `…/plugin_01FL78hKqXjBJeWzdAi5MVtg/skills/{seo-keyword,seo-content-audit,skill-creation-walkthrough}/SKILL.md` (+ `skill-creation-walkthrough/references/description-cookbook.md`) |
| searchfit-seo | `/Users/abcom/Library/Application Support/Claude/local-agent-mode-sessions/fe22c8da-2dcb-4af0-9d0c-50adfbca5694/b914284f-c118-4df2-a600-bf602c5d965d/rpm/plugin_016u9h5nGGKuX18riDTJ7otg/skills/{content-strategy,content-brief,schema-markup}/SKILL.md` and `…/plugin_016u9h5nGGKuX18riDTJ7otg/commands/{create-content,create-topic,generate-schema}.md` |
| marketing | `/Users/abcom/Library/Application Support/Claude/local-agent-mode-sessions/fe22c8da-2dcb-4af0-9d0c-50adfbca5694/b914284f-c118-4df2-a600-bf602c5d965d/rpm/plugin_01PNE4z3g878E64sW8Urn6mN/skills/{draft-content,content-creation,campaign-plan}/SKILL.md` |
| sanity | `/Users/abcom/Library/Application Support/Claude/local-agent-mode-sessions/fe22c8da-2dcb-4af0-9d0c-50adfbca5694/b914284f-c118-4df2-a600-bf602c5d965d/rpm/plugin_011mb6WVKYLUBDXV4jydVoro/skills/{content-modeling-best-practices,seo-aeo-best-practices,content-experimentation-best-practices}/` (the SKILL.md files are only indexes; the rules are in `references/*.md`) |
| anthropic-skills | `/Users/abcom/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/b914284f-c118-4df2-a600-bf602c5d965d/fe22c8da-2dcb-4af0-9d0c-50adfbca5694/skills/{wugweb-seo,skill-development,skill-creator,system-design,frontend-design,design-taste-frontend,full-output-enforcement,design-qa,web-design-guidelines}/SKILL.md` |
| ui-ux-pro-max | `/Users/abcom/.claude/skills/ui-ux-pro-max/SKILL.md` (+ `data/ux-guidelines.csv`, `data/landing.csv`) |
| design:ux-copy | `/Users/abcom/Library/Application Support/Claude/local-agent-mode-sessions/fe22c8da-2dcb-4af0-9d0c-50adfbca5694/b914284f-c118-4df2-a600-bf602c5d965d/rpm/plugin_01XXJmxLXPEhPMmnxmrgntNw/skills/ux-copy/SKILL.md` |

### rampstack-seo
**content-and-copy**
- Don't write without a brief: reader, goal, length and voice must be known.
- Judge every piece on five things: hook, structure, voice, substance, closing. Pick one structure and keep to it; Problem → Solution → Proof fits case studies.
- The hook has to earn the read in 3–5 seconds. No throat-clearing, dictionary-definition openers or vague promises.
- Substance means specifics ("roughly 40 percent" beats "many"), named examples and honest trade-offs. Fix weak copy by cutting, not adding.
- End by resolving the opening and giving one specific next action. No recap ending, no wall of CTAs.
- Edit checklist (`references/content-edit-checklist.md`):
  - One CTA per piece; every claim sourced.
  - Quotes verified word for word.
  - Customer permission for testimonials, logos and photos.
  - Screenshots current; no placeholders ("TBD", "[INSERT QUOTE]").
- Headings descriptive, not clever. Paragraphs 2–4 sentences, average sentence under 20 words, active voice.
- Frontmatter: title 50–60 characters, description 120–160, plus slug, author, date and last_updated.

**seo-aeo-geo**
- Open each major section with a direct 1–3 sentence answer; use question-form H2s where natural.
- State each fact once, with its context: number, unit, time window and sample (e.g. "23% lift … 412 customers … Jan–Mar 2025").
- Tables for comparisons, bullets for parallel items, numbered lists for steps.
- Sections must stand alone: no "as mentioned above", and say what the page does and doesn't cover.
- Add a key-takeaways block of 3–7 bullets. Show publish and update dates, and put both in the schema.
- Don't trap facts in images, PDFs or iframes; server-render critical content.
- Test: read only the H1 and the first sentence under each H2.
- **Outdated advice here:** FAQPage and HowTo schema, and llms.txt as a lever (see Part 2c).

**seo-onpage**
- Covers eight areas: title, meta description, headings, body, internal links, images, URL slug, schema.
- Title:
  - 50–60 characters, primary query in the first 30.
  - Brand last; distinct from the H1; unique across the site.
  - Detail-page pattern: `[Product] - [Key benefit] | [Brand]`.
- Meta description: 140–160 characters. Promise the value, back it with a number, then cue the action. Don't repeat the title or leave the CMS default.
- One H1, no skipped heading levels, paragraphs of 3–5 lines on mobile.
- Internal links: at least 2–3 out and 2–3 in, with descriptive anchor text.
- Images: descriptive alt and file names, WebP or AVIF, lazy below the fold, width and height set.
- Slug: lowercase, hyphenated, under 60 characters, no dates.
- Schema must match what's visible. Keyword density is "not a real ranking signal".

**seo-keyword**
- Read intent from the live search results; there are four intents. Case-study searches are mostly commercial research, e.g. "[service] agency [city]", "[client] case study", "[industry] app design".
- Two keywords belong on the same page if they share 3 or more of the top 10 results. One page per cluster; flag pages that compete for the same terms.
- Priority = Opportunity + Strategic fit − Difficulty. Don't chase volume without intent.

**seo-content-audit**
- Every page gets one decision: keep, update, merge, redirect or delete (deleted pages return 410).
- Check backlinks before deleting anything; merge thin overlapping pages.
- "Low" thresholds include under 5 organic visits a month, zero linking domains, and no update in over 24 months.
- Measure the effect at 30, 60 and 90 days.
- Note: your repo has a standing owner decision of one slug per case study and no legacy redirects.

**skill-creation-walkthrough**
- A description has four parts: what it does, when to use it, "Also triggers when…", and "Useful for…". Write it in the user's own words.
- Body sections: one-line purpose, When to use, When NOT to use (name the sibling skills), Required inputs, Framework, Workflow, Failure patterns, Output format, Reference files.
- SKILL.md 250 lines or fewer; each reference 400 lines or fewer. References must stand alone and be named `*-template`, `*-checklist`, `*-playbook` or `example-*`.
- Test with 5 prompts that should trigger the skill and 3 that shouldn't. Keep method and implementation separate.

### searchfit-seo
- **content-strategy:** Lists case studies as a content type ("real results and data"). Match format to intent and plan pillar/cluster hubs. Priority quadrants: quick wins, big bets, fill-ins, avoid.
- **content-brief:** Brief template:
  - Target and secondary keywords, intent, word count, audience, type, tone.
  - Three title options and a 150–160 character meta.
  - H1/H2/H3 outline and a keyword placement table.
  - Internal and external links; image requirements, each with alt text.
  - Schema type, competitive notes, and what makes it different.
  - Quality checks: FAQ questions must be real; schema must fit the page.
- **schema-markup:** Never fabricate data. URLs absolute, dates in ISO 8601, omit empty fields rather than leaving them blank. `@type` must match the content. Combine types (Article + BreadcrumbList + Organization). Validate in the Rich Results Test.
- **create-content (command):**
  - Metadata and outline: title 50–60, meta 150–160, 3–5 H2s, a 3–5 question FAQ, 2–4 image suggestions.
  - Keywords: primary 3–5 times, secondary 2–3 times.
  - Links: placeholder markers for internal and external links.
  - Schema: JSON-LD of type Article, HowTo or FAQ.
  - **Outdated for case studies:** the FAQ section, HowTo/FAQ schema and keyword counts.
- **create-topic (command):** Case study / data is one of ten content angles. Each topic gets title, primary keyword, intent, funnel stage (case studies sit mid-to-late funnel), difficulty and unique angle, plus a cluster map and internal linking plan.
- **generate-schema (command):** Read the page, then output JSON-LD with required and recommended properties, framework integration code, rich-result eligibility and a link to the validation test.

### marketing
- **draft-content: case-study format, exactly as written:**
  1. Title emphasizing the result
  2. Customer overview (industry, size, challenge)
  3. Challenge section
  4. Solution section (what was implemented)
  5. Results section with metrics (prompt user for data)
  6. Customer quote placeholder
  7. Call to action

  Other required inputs: content type, topic, audience, 2–4 key messages, tone, length. Web pieces add a primary keyword, keyword in headline/first paragraph/subheads/meta, meta under 160 characters, and alt-text opportunities.
- **content-creation: case-study structure:**
  - Title: "[Customer] achieves [result] with [product]".
  - Snapshot (sidebar or callout box): customer name, industry, company size, product used, key result.
  - Challenge → Solution ("what was implemented and how") → Results (quantified) → Quote → CTA.
  - CTA examples: "See how [product] can work for your team" / "Talk to our team".
  - Web rules: lead with benefits, answer "so what?" in every section, one primary CTA, active voice, front-load each section.
- **campaign-plan:**
  - Message order: why care → what it is → why you → what to do. Every supporting message needs a proof point.
  - Production benchmarks: landing page 5–7 days, video 2–4 weeks.
  - Distribution channels across owned, earned and paid.
  - Use this as the case-study launch and distribution checklist.

### sanity
- **content-modeling** (`references/separation-of-concerns.md`, `reference-vs-embedding.md`, `content-reuse.md`, `taxonomy-classification.md`):
  - Content is data, not pages. Name fields by meaning (`gallery`, `outcome`, `emphasis`), never by layout (`threeColumnGallery`, `phoneRail`); the frontend decides layout.
  - Reference reusable things (client, industry, person, testimonial, service). Embed page-specific things (SEO, sections).
  - Hybrid pattern: a reference plus optional per-page override fields.
  - Avoid over-abstraction.
  - Taxonomy: one category, many tags, 3–4 levels at most, edited only by named owners.
- **seo-aeo-best-practices** (`references/structured-data.md`, `aeo-considerations.md`, `eeat-principles.md`):
  - Article JSON-LD with author and publisher; combine types in one `@graph`.
  - Use `pt::text()` to turn rich text into plain text for schema.
  - E-E-A-T "Experience" means case studies, real results and screenshots.
  - Show publish and update dates; update `dateModified` only for substantive changes.
  - Allow AI crawlers deliberately rather than by default.
  - Its FAQ-schema advice is outdated.
- **content-experimentation** (`references/experiment-design.md`, `cms-integration.md`, `common-pitfalls.md`):
  - Hypothesis format: "We believe [change] will [impact metric] because [reasoning]".
  - One primary metric plus guardrails (bounce, load time). Calculate sample size first, run at least 1–2 full weeks, don't stop early.
  - Best things to test: headlines, CTA text and placement, where social proof sits.
  - Individual case pages likely lack the traffic for valid tests; test on the /work index or hub pages instead.

### anthropic-skills
**wugweb-seo** (everything Wugweb-specific)
- **Ground rules (they override the generic SEO skills):**
  - Specs, not finished copy; draft wording only when Vedanshu asks.
  - Never change existing copy; don't design screens; answer in chat.
  - Buy rather than build. Write ranges as inequalities (`50 ≤ title chars ≤ 60`). Give the easy and best option with a pick.
  - No made-up numbers ("unvalidated" is an acceptable answer).
  - Google's own guidance beats AEO lore; cite third-party statistics with source and date.
- **Keyword map columns:** Cluster | Primary term | Supporting terms | Intent | SERP format | Page type | Existing URL / gap | Priority.
  - Include the follow-up sub-queries an AI assistant would generate.
  - Prioritise by business fit × intent × winnability; volume only breaks ties.
- **"Ski-ramp" brief (front-loaded answer structure):**
  - Key claim in paragraph 1; H2s phrased as the user's questions; a direct answer in the first 1–2 sentences under each H2.
  - Entities with sources; a stated information-gain asset (Wugweb's own data, case numbers, screenshots) or NONE; key takeaways at the end.
- **Brief template fields:**
  - Page / Site / Owner.
  - Cluster/primary/supporting terms; intent plus SERP format; audience plus job-to-be-done.
  - The key claim for paragraph 1 (what it must establish, not the wording); H1 requirement; H2 questions in reader-journey order.
  - Entities and facts with sources; information-gain asset; word budget.
  - Internal links: up to the pillar, across to 2–3 siblings, in from named pages. External citations; schema types.
  - Title `50 ≤ chars ≤ 60`, term first, brand last. Meta `140 ≤ chars ≤ 160`: value + proof + soft CTA.
  - Author/E-E-A-T; top 3 competitors to beat; refresh cadence.
- **On-page audit:**
  - Basic checks as in seo-onpage, plus a self-referencing canonical, indexable, in the sitemap.
  - Critical content must be in raw HTML (view-source test): AI crawlers mostly don't run JavaScript, which matters for the PWA.
  - Images: alt, width and height, WebP/AVIF, lazy below the fold, the LCP image preloaded. JSON-LD matches visible content and passes the Rich Results Test.
  - Fixes are tagged Critical/High/Medium, each with who does it (Vedanshu or Claude Code).
- **Technical and AI-crawler audit:**
  - robots.txt decided per bot: search/citation bots allowed; training bots are a business choice, recorded per property.
  - Cloudflare bot-fight/WAF settings can silently block AI crawlers even when robots.txt allows them.
  - Redirect chains at most 1 hop. Core Web Vitals: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1.
  - Sitewide schema: Organization (logo, sameAs), WebSite, BreadcrumbList. llms.txt is optional and low priority.
- **Citability score (0–100), five weighted criteria per content block:**
  - Answer quality 30%. Self-containment 25%: blocks 50–200 words, no "it/this" orphans, no opening with "But/However".
  - Structure 20%: 2–4 sentence paragraphs, tables for 3+ items. Statistics 15%: sourced and dated. Uniqueness 10%.
  - Report the three weakest blocks plus site-level blockers.
  - Brand mentions correlate with AI visibility more than backlinks; plan distribution for any information-gain asset.
- **Claude Code handoff block:** `### SEO handoff — [site] — [date]`, a scope line, numbered fixes each with an acceptance test, and "Do not change: visible copy, layout, design tokens."

**skill-development** (plugin-dev)
- Description in third person: "This skill should be used when the user asks to "…"", with quoted trigger phrases.
- Body in imperative form, never "you". SKILL.md 1,500–2,000 words (5,000 at most).
- Details go in `references/` (2–5k words each); also `examples/`, `scripts/`, `assets/`. Reference every bundled file from SKILL.md.
- Never duplicate content between SKILL.md and references; give grep patterns for references over 10k words. Includes a validation checklist.

**skill-creator** (anatomy and description only)
- `name` and `description` are required. All "when to use" information goes in the description, made slightly "pushy" because Claude tends to under-trigger skills.
- Three loading levels: metadata (~100 words), body (under 500 lines), resources (unlimited). Add a table of contents to references over 300 lines; split references by variant.
- Explain the reason behind rules instead of ALL-CAPS MUSTs.
- Trigger evaluation: 20 realistic queries, 8–10 that should trigger and 8–10 near-misses that shouldn't.

**system-design:** Requirements (functional, non-functional, constraints) → high-level design → deep dive (data model, APIs) → scale and reliability → explicit trade-offs, noting "what to revisit as it grows". Use it to design the media manifest and layout-resolver pipeline.

**frontend-design**
- The hero states the page's thesis: open with the most characteristic thing in the subject's world.
- Type carries personality. Structural devices must encode something true: numbering only for real sequences.
- Plan before building: 4–6 named hex colours, two or more type roles, a layout concept and one signature element. Then critique the plan against generic defaults.
- Avoid the three AI-default looks: cream background with serif and terracotta; near-black with one acid accent; hairline broadsheet.
- Spend boldness in one place. Quality floor: responsive, visible focus, reduced motion.
- Copy: specific over clever, sentence case, active voice, each label does one job.

**design-taste-frontend**
- Start with a one-line "Design Read". Dial presets: studio portfolio 8/7/3; trust-first sectors 3/2/5, which fits social-services clients.
- Hero: fits the first viewport, at most 4 text elements, subtext of 20 words or fewer.
- Section rhythm:
  - Each layout family used once at most; at least 4 families on pages with 8 sections; no more than 2 text/image zigzags in a row.
  - At most 1 eyebrow label per 3 sections. Bento cell count equals the content you have. Asymmetric layouts collapse to one column below 768px.
- Content honesty:
  - Real assets only: no div-built fake screenshots; official logos.
  - Quotes 3 lines at most, with name, role and company. No fake-precise numbers.
- Banned outright: em and en dashes on the page, pills overlaid on images, scroll cues, section-number eyebrows.
- Motion:
  - Motivated motion only; reduced motion handled above intensity 3; Core Web Vitals targets.
  - Use `min-h-[100dvh]`; no `window` scroll listeners.
- Run the pre-flight checklist.
- Dashboards are out of scope as pages, but client dashboards shown as media are fine.

**full-output-enforcement:** No placeholders or "rest follows the same pattern". Count the deliverables and cross-check before finishing. When near the output limit, stop at a clean break with `[PAUSED — X of Y complete…]`. This matters when generating markup for dozens of screens.

**design-qa:** This copy is incomplete by its own admission: its scripts and references are missing. The QA sequence:
- Token and hard-coded-value lint.
- Automated accessibility (axe): zero serious or critical issues, plus a contrast check on real rendered pages.
- Visual regression across variants, states, themes, breakpoints and RTL, with animations frozen.
- Manual accessibility sign-off: keyboard, screen reader, 400% reflow, 200% text spacing, reduced motion, forced colours.

**web-design-guidelines:** The skill fetches Vercel's guidelines live; I fetched them. Relevant rules:
- Images: `&lt;img&gt;` width and height, alt, lazy below the fold, high priority for above-the-fold images.
- Media:
  - Muted, looping inline video instead of GIFs, with a still alternative.
  - Captions or transcripts.
  - A pause control for autoplaying motion over 5 seconds; decorative loops stop under reduced motion.
- Full-bleed: safe-area insets. Anchors: `scroll-margin-top`.
- Type: `tabular-nums`, `text-wrap: balance`, curly quotes, the `…` character, non-breaking spaces in units.
- Performance: preconnect to asset domains; `content-visibility` for long lists.
- Deep-link stateful UI such as a lightbox or tabs.
- **Conflicts with other skills:** it prescribes Title Case and no first person.

### ui-ux-pro-max (layout and media only)
- Carousels need pause/stop and must stop on focus, hover and reduced motion. Previous/next and keyboard must reach every slide.
- No page-level horizontal scroll on mobile; avoid horizontal swipe on main content. Swipes need a visible affordance and a non-gesture alternative.
- Declare width/height or `aspect-ratio`; WebP/AVIF with srcset/sizes; lazy below the fold; reserve space for async media.
- Video: click-to-play preferred, captions, pause control, stop when off-screen, honour reduced motion, `&lt;video controls preload="none"&gt;`.
- Motion: subtle parallax, no scroll-jacking, 1–2 animated elements per view, stagger of 30–50ms.
- Layout:
  - Mobile-first, 16px base text, line length 35–60 characters on mobile and 60–75 on desktop.
  - Use `min-h-dvh`; `scroll-padding` so sticky headers don't hide focused elements.
  - Web tap targets at least 24×24 CSS px (44pt in apps).
- Landing patterns:
  - Portfolio Grid: visuals first, lazy reveal, lightbox, hover info that isn't hover-only.
  - Bento: stacks on mobile; works without hover; no motion under reduced motion.

### design:ux-copy
- Principles: clear, concise, consistent, useful, human.
- CTAs start with a verb and name the outcome ("View the live portal", not "Learn more").
- Error and empty states (e.g. a gallery that fails to load): what happened, why, and how to proceed.
- Output: recommended copy, a table of alternatives, rationale, and localisation notes (en-GB vs en-US).

---

## PART 2: Web research

### 2a. Studio case-study pages (what each actually does)

| Studio / page | Opening | Narrative order | Media | Results | Quote | Credits | End |
|---|---|---|---|---|---|---|---|
| [Instrument: Oura](https://www.instrument.com/work/oura-smart-ring) | Client name as H1; ~30-word framing; "Get in Touch" | Challenge → Approach → feature-named sections (conversion storytelling, progressive disclosure, scalable system) → Impact → quote → live-site link → Awards → "Our Roles" | Product GIF loop, mobile still, full-width app-screen composite (1920×992); no alt text | 3 metrics, stated as one month after launch (+42% sales/day, +3% funnel progression) | Name, title, company | Roles listed by discipline (Strategy / Design / Content), no names; 12 award badges | Related cases + newsletter |
| [Instrument: ServiceNow](https://www.instrument.com/work/servicenow-rebrand) | Rebrand framing | Challenge → Leap → System → Result → CMO quote → sub-brand → launch → partnership | Brand applications in context: social story, event stills, billboard, icon detail, UI moment, app, gallery carousel with counter | Event attendance, +18.5% YoY revenue, count of $5M+ customers | CMO pull quote | Roles by discipline | Related cases |
| [Fantasy: Fubo](https://fantasy.co/work/fubo) | Outcome line as hero | Four one-line objectives → named features, 1–2 sentences each → Apple TV chapter → Impact | Not present in server HTML | Results dated by year (2021, 2024, 2025) | One line, first name + title | None | Contact CTA |
| [Fantasy: Priceline Penny](https://fantasy.co/work/priceline-penny) | AI-assistant identity | Overview → objectives → design principle → interface features → system → Impact | One brand image | No numeric results; leans on a CEO quote about uplift | CPO and CEO quotes | None | Contact CTA |
| [Collins: Dropbox](https://www.wearecollins.com/work/dropbox) | Strategic idea line, then meta (Programs / Industry / Stage) | Gallery first → short story → Impact → credits → system components, each 1–2 sentences + media → Impact in detail → press | Image and Mux video mix; logo construction; motion signature | IPO first-day gain, revenue and users with years; one stat label doesn't match its text | None external | Full named team, plus collaborators (type foundry, animation studio) | Press links, no next project |
| [Pentagram: Univers](https://www.pentagram.com/work/univers) | One-liner of deliverables; sector/discipline tags; partners, team and collaborators named | Key visual → about 10 motion players interleaved with 3 pull quotes → long-form chapters (Challenge, Strategy, Identity, Symbol &amp; Wordmark, Visual System, Generative Tool, Outcome) | Motion-led; no alt text | Scale numbers (connected devices, GW managed, partners) | Pull quotes, unattributed | Full credits | Next project |
| [Locomotive: Scout Motors](https://locomotive.ca/en/work/scout-motors) | Client's own brand line; meta: year, sector, city, categories, website, award count | ~80-word About → Awards → gallery of about 20 frames → visit site → credits | Mixed portrait phone-ratio (1000×1778) and landscape frames; media carries the story | None | None | 8 roles with names | Next project, with year, sector and city |
| [Koto: Yazio](https://koto.com/projects/yazio) | Two-word brand idea; "Nutrition \| 2026" | **Sticky section nav**: Challenge / Strategy / Identity / Application / Outcome; blocks of 40–85 words | Not present in server HTML | Qualitative only | None | None | none |
| [Cuberto: DaoWay](https://cuberto.com/projects/daoway/) | Platforms and store links up front | Challenge → Product → brand captions → core mission → native development → graphic design | `screenshot/` and `splitshow/` series, about 20 frames, captioned per group; empty alt text | Store rating only | Client marketing department | None | **Next project** |
| [Ramotion: Clearbit](https://www.ramotion.com/clearbit-website-transformation/), [Shorelines](https://www.ramotion.com/shorelines/) | **Key-facts sidebar**: exit, records, customers, services, tech stack, industry, website; app downloads as "usage" | About → Company → Challenge → **old-site screenshot** → Solution → Outcome | 3D hero scene; Shorelines uses pre-composited "slides" (2880×810 strip, 16:9) | Business facts in the sidebar | Headshot, name, role, company | None | CTA + newsletter |
| [Halo Lab: Rytmo](https://www.halo-lab.com/project/rytmo) | Service-plus-client H1, human headline, subhead; meta: industry, services, platform, timeline | About → Challenge → Process → Results bullets → slider → quote → key stats → 4 steps with deliverables → screen strip → team → tech | Slider of 4; **strip of 16 screens with no alt text or captions** | Delivery time and quality outcomes | 5.0 rating, portrait, name, title | Team as role counts; tech logos | Other cases |
| [Netguru: whym](https://www.netguru.com/clients/whym) | Breadcrumb, tags, descriptive H1, read time, 2 stats at top | Client → Challenge → What we did (4 cards: Research / QA / Design / Launch) → quote | Cover only | Top stats (time to relaunch, test scenarios) | Headshot, name, title | none | 3 related cases + a **named contact** |
| [Netguru hubs](https://www.netguru.com/our-clients/mobile-app-development/technology/uk) | Faceted case hubs: service × industry × country × stack | — | — | Aggregate stats | — | — | — |
| [ustwo: Soph's Plant Kitchen](https://www.ustwo.com/work/sophs-plant-kitchen/) | One-liner | Intro → **Impact before Challenge** → Process (9-week timeline, features, stack, AI tools) → Why it matters | Not present in server HTML | 84% month-1 and 61% month-3 retention, **compared with a 30–35% category benchmark**; +131% growth | Founder: name, then role and company | None named | Contact |
| [Huge: McDonald's](https://www.hugeinc.com/case-study/mcdonalds) | Outcome-framed hero | Services → "the keys" → short sections of 10–15 words, each with a GIF/JPG → "the numbers" | GIF per section | 127M downloads since 2022; 40% digital sales in Q1 2023; **a 50M figure described differently in body and stat block** | None | None | None |
| [IDEO: Teal Health](https://www.ideo.com/case-study/teal-health) | **H1 is the human outcome**, then client + one-liner | **4 stats right under the hero**, each with a full-sentence label → background → founder quote → challenge → captioned prototype photo → design → testing results with sample size (n=220) → packaging → funding timeline → press | Photos with **long explanatory captions** | Yes; **one top stat (94%) differs from the body (92%)** | Name, role, company | None | Press links + 2 related cases |
| [Metalab](https://metalab.com/work/upwork) | Server HTML holds only the title, meta and a generic laptop-on-desk image | — | — | — | — | — | — |

Two more: [Work &amp; Co](https://work.co/) publishes work as news posts rather than case studies. The [R/GA](https://www.rga.com/work) and [frog](https://www.frog.co/work) indexes show no projects in server HTML. Awwwards "inspiration" tag pages only give metadata. The one useful write-up, on [Shed.design's Site of the Day](https://abduzeedo.com/award-winning-web-design-how-sheddesign-earned-awwwards-sotd), credits imagery sequenced by scroll parallax and clip-path transitions, with custom typefaces rotating per section.

**Patterns worth encoding**

**Opening**
- The hero is client + one line specific to this project: an idea, a brand line, or a human outcome. Examples: Collins, Locomotive, Koto, IDEO. The page title carries the client and service; Halo Lab and Ramotion separate the search-facing title from the human headline.
- A meta strip or key-facts panel appears almost everywhere: year, sector, services, platforms, live or store links (Ramotion's sidebar is the richest).

**Proof**
- Results are either at the top (IDEO, Netguru, ustwo) or in a closing Impact section (Instrument, Fantasy, Huge). The good ones give a timeframe ("one month after launch", year by year) or a benchmark (ustwo).
- External proof sits beside quotes: awards (Instrument, Locomotive), press links (Collins, IDEO), live product and store links (Instrument, Cuberto, Ramotion).
- Credits range from discipline roles (Instrument) to named people and collaborators (Pentagram, Locomotive, Collins) to team composition and stack (Halo Lab, ustwo).
- Next or related projects are almost universal: Locomotive and Pentagram show one next project with metadata; IDEO and Netguru show 2–3 related cases.

**Section design**
- Feature-named sections with 1–2 sentences each (Fantasy, Instrument) read as product thinking, not template filler. Section blocks are short, 30–150 words.

**Media**
- Studios often bake multiple screens into one landscape slide (Ramotion, Instrument). That shrinks badly on mobile.
- Mobile screens tend to appear as portrait frames inside galleries (Locomotive), as captioned series (Cuberto), or as long strips (Halo Lab).

**Rhythm**
- Gallery-led (Locomotive); motion-led with pull quotes (Pentagram); essay with captioned figures (IDEO); chapter nav (Koto); card grid for "what we did" (Netguru).
- Pages avoid feeling templated because each one's hero line, section names and media sequence come from the client's own material.

**Anti-patterns observed**
- Missing alt text almost everywhere: Instrument, Pentagram, Locomotive, Cuberto, Ramotion, Halo Lab.
- Content that only appears after JavaScript runs: Metalab, R/GA, frog, Koto media.
- Inconsistent numbers: Huge, IDEO, Collins. Undated metrics.
- A 16-screen dump with no captions (Halo Lab). A generic laptop hero (Metalab), which your own brand guideline bans for covers.
- A broken link on the Metalab index.

### 2b. What B2B buyers want, plus NN/g guidance
- **Demand Gen Report Content Preferences Survey:** case studies are consistently a top format. The 2019 edition had them at 47% alongside webinars at 39%; 2022 had both at 40%. The report's headline: buyers want short, visual, mobile-optimised content. The pages blocked direct fetching, so these figures come from DGR pages surfaced in search. [DGR](https://www.demandgenreport.com/b2b-content-preferences), [2019 report](https://www.demandgenreport.com/resources/2019-content-preferences-survey-report)
- **Gartner/CEB (2018–19, via secondary sources):** buyers spend about 17% of buying time with suppliers. Most of the rest goes to independent online research (27%), offline research (18%) and internal buying-group meetings (22%). The case study has to persuade with no salesperson present. [summary](https://istart.com.au/?p=29514)
- **NN/g, How People Read Online (2020):** people scan, read non-linearly and jump around. Front-load the main point; use clear headings, bullets and bold. Pull quotes interrupt reading. [link](https://www.nngroup.com/articles/how-people-read-online/)
- **NN/g, Scrolling and Attention (2018):** 57% of viewing time is above the fold and 74% within the first two screenfuls. Keep high-priority content and major CTAs at the top; avoid false floors. [link](https://www.nngroup.com/articles/scrolling-and-attention/)
- **NN/g, Photos as Web Content:** users look at images that carry information and ignore decorative or stock ones. Real people earn attention. Enlarged views should be at least twice the original size. [link](https://www.nngroup.com/articles/photos-as-web-content/)
- **NN/g, Trustworthiness (2016):** four factors: design quality, upfront disclosure, comprehensive and current content, and connection to the rest of the web. Users trust external sources such as reviews and press more than on-site testimonials. [link](https://www.nngroup.com/articles/trustworthy-design/)
- **NN/g, Horizontal Scrolling (2014):**
  - Swiping is natural on mobile; on desktop, sideways content is missed and arrows go unnoticed.
  - Never put essential content behind a horizontal scroll; it works for secondary sets such as galleries.
  - Show how much content there is, give visible click targets, and show partial adjacent items.

  [link](https://www.nngroup.com/articles/horizontal-scrolling/)
- **NN/g, Carousels on Mobile (2018):**
  - The last item should be reachable in 3–4 swipes; use a list for large sets.
  - Dots are weak signifiers and hard to tap. A partly visible next item is a strong cue; arrows are a good tap alternative.
  - Keep a gutter at the screen edge; keep items closely related; the first item signals the rest.

  [link](https://www.nngroup.com/articles/mobile-carousels/)
- **NN/g, Carousel usability:** 5 frames or fewer; no auto-forward on mobile; controls inside the carousel; descriptive indicators. [link](https://www.nngroup.com/articles/designing-effective-carousels/)
- **NN/g B2B report:** 188 guidelines. B2B sites tend to be inward-looking and fail to answer buyers' main questions. [link](https://www.nngroup.com/reports/b2b-websites-usability/)
- **W3C ARIA carousel pattern:**
  - The carousel is a region or group with `aria-roledescription="carousel"` and a label.
  - Each slide is a labelled `group` with role description "slide"; "3 of 10" is allowed as a name.
  - Controls are native buttons. A rotation control, if present, is the first tab stop.
  - Rotation stops on focus or hover. Use `aria-live` off while rotating and polite when not.

  [link](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/)

### 2c. SEO and AEO for case-study pages
- **What Google no longer supports:**
  - FAQ rich results: restricted to government and health sites in August 2023, then shown nowhere from May 7, 2026; the documentation was removed June 15, 2026. ([changelog](https://developers.google.com/search/updates))
  - HowTo rich results: gone from September 13, 2023. ([post](https://developers.google.com/search/blog/2023/08/howto-faq-changes))
  - Breadcrumbs: shown on desktop results only since January 22, 2025.
  - Seven niche structured-data types phased out in June 2025. ([post](https://developers.google.com/search/blog/2025/06/simplifying-search-results), [update](https://developers.google.com/search/blog/2025/11/update-on-our-efforts))
- **Review markup:**
  - Self-serving reviews are ineligible: a review about entity A on entity A's own site, including via embedded widgets. Client testimonials about Wugweb on wugweb.com therefore get no star markup.
  - Incentivised reviews must disclose the incentive, and you can't aggregate reviews from other sites. ([doc](https://developers.google.com/search/docs/appearance/structured-data/review-snippet))
- **Article guidance:** no required properties. Author can be a Person or an Organization; for an Organization, link its homepage. Include `datePublished` and `dateModified` with timezone, and images in 16:9, 4:3 and 1:1 of at least 50K pixels each. ([doc](https://developers.google.com/search/docs/appearance/structured-data/article))
  - Your code deliberately uses `CreativeWork` instead; schema.org gives it `about`, `mentions`, `creator`, `contributor`, `abstract` and `video`. ([schema.org](https://schema.org/CreativeWork))
- **Quotation:** schema.org `Quotation` is a CreativeWork attributable to a real author; it earns no Google feature. ([schema.org](https://schema.org/Quotation))
- **Google on AI features** ([doc](https://developers.google.com/search/docs/appearance/ai-features), [May 2025 post](https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search)):
  - No special markup, AI text files or schema is needed. The page must be indexed and eligible for a snippet.
  - Important content must be in text; structured data must match the visible text; support text with good images and video.
  - Controls: `nosnippet`, `data-nosnippet`, `max-snippet`.
- **How AI assistants pick what to cite:**
  - Adding statistics, quotations and citations raised visibility by up to 40% in generative engines in the GEO paper (KDD 2024). ([arXiv](https://arxiv.org/abs/2311.09735))
  - Indig (Feb 2026): 1.2M ChatGPT results with 18,012 citations; about 44% came from the first 30% of a page's text.
  - Shashko (Bright Data): 42,971 citations across 6 platforms. In AI Mode and Gemini, 46.1% came from the first 30% and 74.8% from the first half. 92.4% of cited sentences were 6–20 words, and all were full sentences. ([summary](https://www.practicalecommerce.com/studies-reveal-ai-citation-clues))
  - Ahrefs (75K brands): branded web mentions correlated 0.664 with AI Overview visibility, against 0.218 for backlinks. Correlation, not causation. ([Ahrefs](https://ahrefs.com/blog/ai-overview-brand-correlation/))
- **Title patterns observed on studio pages:** [verb]ing [client site] | Studio; [Client] [platform] [service]; [Service] for [client product]; [Client] [product]: [disciplines] | Studio.
  - Formula: client and what was built, front-loaded; brand last; one title per page.
- **Image SEO** ([doc](https://developers.google.com/search/docs/appearance/google-images)):
  - Google indexes images in `&lt;img src&gt;` (including inside `&lt;picture&gt;`), not CSS backgrounds. Always give `src` a fallback.
  - Alt text is the most important image attribute. Use descriptive file names and place images near relevant text.
  - The preview image comes from `primaryImageOfPage` or `og:image`; since March 2026 Google uses both schema.org and og:image. Avoid logos or text-heavy previews.
- **Video SEO** ([doc](https://developers.google.com/search/docs/appearance/video)):
  - Video results favour watch pages where the video is the main content, so case-study videos rarely qualify.
  - Still give each one a unique name, description and stable thumbnail.
  - Don't make the video depend on a click or swipe to exist in the page.
- **LCP** ([web.dev](https://web.dev/articles/optimize-lcp)):
  - The hero image must be in the HTML, with `fetchpriority="high"` on one or two images at most, and never lazy-loaded.
  - Prefer the same origin. For a video hero, the poster is the LCP: preload it, because the `poster` attribute can't take `fetchpriority`. ([video](https://web.dev/articles/lazy-loading-video))

### 2d. Mobile-first media techniques and support (as of Oct 2026)

| Technique | Rule | Support / source |
|---|---|---|
| Scroll-snap rails | `scroll-snap-type: x mandatory` only when no item exceeds the container (otherwise some content can't be reached); use `proximity` otherwise; `scroll-padding` for gutters; `scroll-snap-stop` sparingly | Widely supported. [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap/Basic_concepts) |
| CSS carousel pseudo-elements (`::scroll-button`, `::scroll-marker`) | Progressive enhancement only, behind `@supports selector(::scroll-marker)`, with a JS or native-button fallback | Chromium 135+. Safari reports conflict (possibly 26.6 beta); Firefox not shipped. [SitePoint](https://www.sitepoint.com/scrolldriven-css-in-2026-building-carousels-without-javascript/) |
| Keyboard access to scroll containers | Chrome 130+ makes a scroller tabbable when it has no focusable children. Elsewhere add `tabindex="0"`, `role="region"` and `aria-label` | [Chrome](https://developer.chrome.com/blog/keyboard-focusable-scrollers) |
| `aspect-ratio`, `object-fit` | `contain` (or native aspect) for UI screens; `cover` with a focal point only for photography | Baseline, widely available. [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio) |
| Masonry (`display: grid-lanes`; old syntax `grid-template-rows: masonry`) | Declare `display: grid` first, then `@supports (display: grid-lanes)` | Shipped only in Safari 26.4 (Mar 2026); Chrome/Edge 140+ and Firefox behind flags. [OpenReplay](https://blog.openreplay.com/css-grid-lanes-masonry-layout/) |
| `grid-auto-flow: dense` | Moves items out of source order, so sighted order and keyboard/screen-reader order diverge. Avoid for sequences such as user flows | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow) |
| Container queries | Make media modules respond to the width of their slot, not the viewport | Baseline 2023 |
| `content-visibility: auto` | Pair with `contain-intrinsic-size: auto &lt;est&gt;` on chapters below the fold | Baseline 2024 (Safari 18) |
| `loading="lazy"` | Always set width and height. Since Chrome 121, horizontal carousels load with the same distance thresholds as vertical scrolling | [web.dev](https://web.dev/articles/browser-level-image-lazy-loading) |
| `sizes="auto"` | Only on lazy images; write `sizes="auto, &lt;fallback&gt;"` | Chromium 126+, Firefox reportedly 150+, Safari not yet. [DatoCMS](https://www.datocms.com/product-updates/responsive-images-automatic-sizes.md) |
| Lazy video | Click-to-play: `preload="none"` + `poster`. Loops: `autoplay muted loop playsinline`, started by IntersectionObserver, `controls` as no-JS fallback | [web.dev](https://web.dev/articles/lazy-loading-video) |
| Scroll-driven animation | Behind `@supports (animation-timeline: view())` and reduced motion | Chrome 115+, Safari 26+, Firefox behind a flag |
| View transitions (e.g. into the next project) | Progressive enhancement only | Same-document Baseline since Oct 2025 ([web.dev](https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available)); cross-document is an Interop 2026 focus |
| Responsive images without a resizing CDN | Your adapter uses `imageService: 'passthrough'`, so Astro transforms nothing. Pre-generate widths and AVIF/WebP at upload into R2 and write `srcset` yourself, or bake prerendered pages at build. Astro's `layout` prop (5.10+) auto-generates `srcset`/`sizes` only when images are processed. For Sanity images use `urlFor(img).width(w).auto('format').fit('max')` | [Astro](https://docs.astro.build/en/guides/images/), [Sanity](https://www.sanity.io/docs/astro/images-and-portable-text-astro) |
| Device frames | Apple's marketing guidelines require Apple-provided bezels, unmodified, latest generation, straight-on; no 3D renders, no Home Screen with third-party content. Simplest default: frameless | [Apple](https://developer.apple.com/app-store/marketing/guidelines/) |

---

## What's already in the repo
- **Brand guidelines:** `/Users/abcom/Documents/GitHub/wugweb_site/brand_guidelines/03_MARKETING_SYSTEM/06_CASE_STUDIES.md` and `/Users/abcom/Documents/GitHub/wugweb_site/brand_guidelines/08_ARTWORK_FORMULAS/Case_Study_Cover.md`. Use real artefacts; the cover is a project-specific metaphor, never a generic laptop or dashboard; the arc is challenge → intervention → outcome.
- **CLAUDE.md** (`/Users/abcom/Documents/GitHub/wugweb_site/CLAUDE.md`, around line 166):
  - Notion is the source of truth for case-study SEO title, description, focus keyword and canonical.
  - `BaseLayout` appends " | Wugweb" only if the result fits in 60 characters, so base titles should be 51 characters or fewer.
  - One slug per case study.
- **Content model:** `/Users/abcom/Documents/GitHub/wugweb_site/sanity/schemaTypes/caseStudy.ts`.
  - `galleryPaths` is a list of strings: no type, alt, caption or size per item.
  - `results` has only metric and label: no period, baseline or source.
  - Quotes exist only as `quoteBlock` inside `bodyContent`. `asset` documents have `alt` and `mediaType` but no screen type or dimensions.
- **Page route:** `/Users/abcom/Documents/GitHub/wugweb_site/src/pages/work/[slug].astro`. It renders server-side, which is good for crawlers, but:
  - The H1 is the title without the client name.
  - The H2s are generic (About, The problem, The approach, The outcome, Design thesis, In depth, Gallery).
  - Screen alt text is generic ("{brand} screen").
  - Images have no width, height or `srcset`.
  - The hero is `&lt;video autoplay preload="metadata"&gt;` with no poster; the hero image has no `fetchpriority`.
  - The carousel uses `scroll-snap-type: x mandatory`.
  - JSON-LD is `CreativeWork` with `about` set to the industry string and `author` set to `#founder`. There's no `dateModified`.
- **Config:** `/Users/abcom/Documents/GitHub/wugweb_site/astro.config.mjs` uses `output: 'server'` and `imageService: 'passthrough'`. Installed Astro is 5.18.2; Cloudflare adapter 12.6.13.

## Conflicts between sources to settle in the skill
1. **Who writes copy.** wugweb-seo says "don't author content unless asked"; a case-study skill writes copy. State the authorisation explicitly, or make it draft-for-approval.
2. **Headings.** wugweb-seo and the AEO skills want question-form H2s; studio practice uses specific claim headings. Suggested reconciliation: claim headings, question form where natural, and generic labels only in the chapter nav.
3. **FAQ, HowTo and llms.txt.** Recommended by rampstack seo-aeo-geo, SearchFit `create-content` and the Sanity AEO reference; Google retired FAQ and HowTo rich results and says no AI-specific files are needed. Follow Google.
4. **Keyword counts.** SearchFit's "primary keyword 3–5 times" contradicts seo-onpage, which says density isn't a ranking signal. Drop the counts.
5. **Horizontal scroll.** ui-ux-pro-max says no horizontal scroll; NN/g allows labelled rails for secondary sets. Suggested split: page-level horizontal overflow banned, rails allowed.
6. **Copy style.** Vercel's guidelines want Title Case and no first person; frontend-design wants sentence case; case studies naturally use "we". Pick a house style.
7. **Dashes.** design-taste-frontend bans em and en dashes on the page outright. Decide once for the house style.
8. **Skill format.** Third-person descriptions (skill-development) vs. "Use when…" (rampstack). SKILL.md length: 250 lines, 500 lines, or 1,500–2,000 words depending on the skill.
9. **Schema author.** The page's `author: #founder` conflicts with governance.md ("case studies get owner", no author). Suggested: `creator` and `publisher` set to the Wugweb Organization.

---

## Rules I'd encode

The specific numbers below are suggested defaults where no source gives one.

**Narrative**
1. Start every case with a one-line read: sector, buyer, disciplines delivered (Strategy, Brand, Experience, Engineering, Growth, Operations), dominant evidence (media-led, product-led, brand-led, proof-led or systems-led) and sensitivity (public or social sector, luxury, regulated). It decides the chapters, layout families and motion level.
2. Keep the brand spine: challenge → intervention → outcome. Generate one chapter per delivered artefact (for NTUC U Care: portal, admin backend) and drop any chapter with no real material.
3. Hero:
   - Client wordmark plus an H1 naming the client and what was built.
   - One project-specific idea or outcome line of 12 words or fewer.
   - A real artefact or project-specific metaphor; never a generic laptop.
4. In the first screen after the hero, show two things:
   - A 40–60 word answer-first summary: who, what Wugweb did, platforms, year, headline result.
   - A key-facts list (`&lt;dl&gt;`): Client, Sector, Location, Year, Disciplines, Platforms, Team, Duration, Partners, Live/App links.
5. If verified metrics exist, show 2–4 headline stats right after the summary. Repeat the identical numbers in the Outcome chapter.
6. Each chapter: one specific claim heading, 40–120 words, and its media group. One idea per chapter.
7. Closing sequence: Outcome → client quote → credits (roles, names, partners, awards, press) → next project → one CTA.
8. Add external proof wherever it exists: live product, store listing with rating, press, awards.

**Copy**

9. Headings are claims ("Caseworkers see urgent cases first"), not labels ("The approach"); labels live only in the chapter nav.
10. Write key facts as complete sentences of 6–20 words that name their subject. Include number, unit and timeframe.
11. Every metric gives value, what it measures, direction, period, baseline or benchmark, and source. No invented or fake-precise numbers. If something isn't known, write "unvalidated" or leave it out.
12. The most important claim sits in the first 30% of the text. No "In this case study…" openers.
13. Paragraphs of 2–4 sentences, average sentence under 20 words, active voice, en-GB by default (the `language` field).
14. Ban filler verbs (elevate, seamless, unleash) and superlatives without proof. Apply the house dash rule once decided.
15. Quotes must be real and approved, 3 lines or fewer, attributed with name, role and organisation, and photo where available.
16. Every key image gets a caption of 25 words or fewer: what it shows and why it matters. Alt text is separate and literal.
17. Get client approval for logos, screens, metrics and quotes. Use synthetic data and redact personal data in social-services, health or finance screens. Anonymise NDA work consistently.

**Media by type**

18. Tag every asset on intake:
   - Type: mobile, web, dashboard, mark, type, colour, pattern, application, moodboard, photo, motion or diagram.
   - Placement: chapter, flow order, priority.
   - Facts: width, height, alt, caption, poster, permission.

   The current `galleryPaths` can't hold this, so extend the model.
19. Lay out individual screens in code rather than shipping baked multi-screen composites. If only a composite exists, add a mobile crop via `&lt;picture media&gt;`.
20. Never crop or distort UI: use `contain` or the native aspect ratio. Default to frameless with one radius and outline. If framed, use Apple's official bezels as-is, at one device size per set.
21. Screen-count recipes:

   | Screens | Layout |
   |---|---|
   | 1 | Beside its text |
   | 2–3 | A row (2-up on mobile) |
   | 4–8 from one flow | A snap rail in flow order, with step captions |
   | 9+ | Put 3–5 key screens in the story; the rest go in a captioned rail or wall with lightbox |

   Never an uncaptioned dump.
22. Web and dashboard screens: one overview plus 2–4 annotated detail crops. Below 768px show the crops, with the full screen in a lightbox at 2× or more.
23. Before/after only with a real, permitted "before". Stack with labels on mobile. Slider comparisons need a button and keyboard alternative.
24. Brand identity order:
   1. Idea
   2. Mark (construction, clear space)
   3. Typography (live text when licensed)
   4. Colour as HTML swatches with names and hex
   5. Graphic system
   6. Applications in context
   7. Motion

   Label moodboards as exploration.
25. Video:
   - Decorative loops: 15 seconds or less, muted, `playsinline`, poster. Paused off-screen and under reduced motion, with a pause control if over 5 seconds.
   - Story video: click-to-play, with captions or transcript.
   - Third-party players: a lightweight preview that loads the player on click.
26. Photography may use `cover` with a hotspot focal point. Prefer real people to stock. Limit each page to 2–3 aspect-ratio families.
27. No filler stock and no fake UI built from divs. A catch-all "Gallery" holds only leftovers, never the main story.

**Layout rhythm**

28. The base unit is text plus a media group. Rotate other layout families: full-bleed moment, contained figure, split, rail, mosaic, stats band, quote, credits. Use at least 4 families on pages with 8 or more sections, and no more than 2 zigzags in a row.
29. Full-bleed only for the hero, one signature moment per chapter, and video. Keep UI screens contained (about 1200–1400px maximum) so they stay legible.
30. From 1024px up, allow sticky text beside scrolling media, and a sticky chapter nav. Below that, unpin into a linear order.
31. Use mosaic or bento only for brand applications or equal-weight sets, with exactly as many cells as assets. Keep DOM order (no `dense`) wherever order carries meaning.
32. The client's brand may theme accents and the hero ground. Wugweb navigation, type scale and spacing tokens stay constant. One theme per page, with AA contrast checked on client colours.
33. Motion follows the case read: low for trust-first sectors, richer for brand-led cases. Always motivated, always safe under reduced motion.
34. Not-templated test: the hero line, chapter names and one signature layout must not be reusable for another client unchanged.

**Mobile**

35. Design at 360–390px first. Every multi-column block declares how it collapses below 768px. Body text 16px or larger; lines of 35–60 characters.
36. Rails only for related, secondary sets:
   - Show 15–25% of the next item and keep a gutter.
   - Visible previous/next buttons of at least 44×44px, plus a text counter ("3 of 8").
   - The end reachable in 3–4 swipes; no autoplay.
   - Anything essential also appears outside the rail.
37. No page-level horizontal overflow. Rails use `overscroll-behavior-x: contain`. Use `mandatory` snapping only when every item fits the viewport.
38. Full-height sections use `svh` or `dvh`. No scroll-jacking or pinning on mobile; safe-area insets on full-bleed.
39. The lightbox:
   - Opens at 2× or more, supports pinch-zoom, swipe and buttons.
   - Esc closes it, it traps focus, and the back button closes it.
   - Each item is deep-linkable.
40. On mobile the chapter nav is a compact disclosure menu, not dots. Anchors use `scroll-margin-top`.

**SEO, schema and AEO**

41. The `&lt;title&gt;` base is client plus what was built, front-loaded, 51 characters or fewer so " | Wugweb" still fits in 60. Write it in Notion and keep it unique.
42. Meta description of 140–160 characters: what was built, for whom, the headline proof, a discipline cue. It must match the page.
43. One H1 containing the client name and the deliverable. Logical H2/H3 order. One slug, `/work/{client}-{deliverable}`, no dates.
44. All copy, stats, captions, alt text and credits are in the server HTML (pass the view-source test). No galleries that only exist after JavaScript runs.
45. One JSON-LD `@graph`, matching the visible text:
   - `WebPage`.
   - `CreativeWork`, with:
     - `headline` and `abstract`;
     - `creator` and `publisher` as the Wugweb Organization `@id`;
     - `datePublished` and `dateModified`;
     - images in 16:9, 4:3 and 1:1;
     - `about` as the client Organization `@id` plus the sector;
     - `mentions` for partners and platforms; `contributor` for credited people.
   - `BreadcrumbList`.
   - A `VideoObject` (name, description, thumbnailUrl, uploadDate, contentUrl) for each prominent video.
46. Do not use FAQPage for rich results, HowTo, Review or AggregateRating stars on client testimonials, keyword-count targets, or llms.txt as a ranking lever.
47. Mark up testimonials as `&lt;figure&gt;&lt;blockquote&gt;…&lt;figcaption&gt;`. Optionally add schema.org `Quotation` with `creator`. Never star markup.
48. Spell out entities fully: the client's official name (and parent organisation), sector, city, country, platforms, year. Give the client Organization `sameAs` links: official site, LinkedIn, Wikidata.
49. Link up to the matching service and sector pages, across to 2–3 related cases, and back from those pages. Use descriptive anchor text.
50. Use real `&lt;img&gt;` elements with descriptive kebab-case file names (`{client}-{screen}-{state}.avif`). Make the `og:image` project-specific at 1200×630. Distribute each case on LinkedIn, Behance, award sites and client co-posts to build brand mentions.

**Accessibility**

51. Alt text for a UI screen says what it shows and what it lets the user do, ideally around 125 characters or fewer. Decorative images use `alt=""`. Never "screen" or "image of".
52. Rails and carousels follow the W3C pattern: a labelled region, slides as groups named "n of N", native buttons, no auto-rotation, and keyboard-focusable scroll areas.
53. Meaningful video is never `aria-hidden`. Provide captions or transcripts, keyboard-operable controls, and a pause for motion over 5 seconds.
54. AA contrast: 4.5:1 for body text, 3:1 for large text and UI, including over client colours and imagery. Visible focus that sticky UI never hides.
55. Reading order matches visual order. Content reflows at 320px. Touch targets at least 24×24 CSS px, aiming for 44.

**Performance**

56. The hero image or poster is the LCP element:
   - In the HTML, `fetchpriority="high"`, never lazy, width and height set.
   - AVIF/WebP via `srcset`/`sizes`, served from the same origin.
   - Targets: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1.
57. Below the fold:
   - Images: `loading="lazy"` plus dimensions, and `sizes="auto, &lt;fallback&gt;"` (lazy images only).
   - Videos: `preload="none"` plus a poster, started by IntersectionObserver.
58. Image handling, because the site does no resizing:
   - R2 media: pre-generate 480/768/1080/1440/2160px widths in AVIF and WebP, and write the `srcset` yourself.
   - Sanity images: `urlFor().width().auto('format').fit('max')`.
59. Below-the-fold chapters use `content-visibility: auto` with `contain-intrinsic-size`. Budgets: a 1080px screen at 150KB or less in AVIF; a loop at 3MB or less.

**QA**

60. Publish gate:
   - **Content:**
     - Every number verified and identical everywhere.
     - Approvals logged; personal data scanned out of screens.
     - Every image has alt text and a caption.
     - No placeholders.
   - **Technical:**
     - View-source test.
     - Schema validator and Rich Results Test.
     - Lighthouse on mobile.
     - axe with zero serious or critical issues.
   - **Accessibility passes:**
     - Keyboard and screen reader through rails and lightbox.
     - Reduced motion.
     - 320px width and 400% zoom.
   - **Housekeeping:**
     - Link check on live and store links.
     - `dateModified` changes only for substantive edits.

**Skill authoring notes**
- **Description:** what it does, plus triggers (write, structure, lay out or mark up a case study, /work page or client story; any media dump for a case). Add "also triggers when…" and name near-misses that shouldn't trigger it: blog posts, service pages.
- **SKILL.md:** about 1,500–2,000 words.
- **References:**
  - `narrative-and-copy.md`
  - `media-recipes.md`
  - `schema-jsonld.md`
  - `qa-checklist.md`
  - `example-ntuc-u-care.md`
- **Writing:** explain the reasons behind rules rather than ALL-CAPS MUSTs.
- **Testing:** 5 should-trigger and 3 near-miss prompts.

---

### Sources
- **Studios:** [Instrument Oura](https://www.instrument.com/work/oura-smart-ring) · [Instrument ServiceNow](https://www.instrument.com/work/servicenow-rebrand) · [Fantasy Fubo](https://fantasy.co/work/fubo) · [Fantasy Priceline](https://fantasy.co/work/priceline-penny) · [Collins Dropbox](https://www.wearecollins.com/work/dropbox) · [Pentagram Univers](https://www.pentagram.com/work/univers) · [Pentagram index](https://www.pentagram.com/work) · [Locomotive Scout](https://locomotive.ca/en/work/scout-motors) · [Locomotive index](https://locomotive.ca/en/work) · [Koto Yazio](https://koto.com/projects/yazio) · [Cuberto DaoWay](https://cuberto.com/projects/daoway/) · [Ramotion Clearbit](https://www.ramotion.com/clearbit-website-transformation/) · [Ramotion Shorelines](https://www.ramotion.com/shorelines/) · [Ramotion index](https://www.ramotion.com/work) · [Halo Lab Rytmo](https://www.halo-lab.com/project/rytmo) · [Netguru whym](https://www.netguru.com/clients/whym) · [Netguru hub](https://www.netguru.com/our-clients/mobile-app-development/technology/uk) · [ustwo](https://www.ustwo.com/work/sophs-plant-kitchen/) · [ustwo index](https://www.ustwo.com/work/) · [Huge McDonald's](https://www.hugeinc.com/case-study/mcdonalds) · [IDEO Teal](https://www.ideo.com/case-study/teal-health) · [IDEO index](https://www.ideo.com/work) · [Metalab](https://metalab.com/work/upwork) · [Metalab index](https://www.metalab.com/work) · [Awwwards Metalab](https://awwwards.com/metalab-com-case-study.html) · [Work &amp; Co](https://work.co/) · [Clay](https://clay.global/work) · [Shed.design SOTD](https://abduzeedo.com/award-winning-web-design-how-sheddesign-earned-awwwards-sotd)
- **Research and UX:** [NN/g reading](https://www.nngroup.com/articles/how-people-read-online/) · [NN/g attention](https://www.nngroup.com/articles/scrolling-and-attention/) · [NN/g photos](https://www.nngroup.com/articles/photos-as-web-content/) · [NN/g trust](https://www.nngroup.com/articles/trustworthy-design/) · [NN/g horizontal scrolling](https://www.nngroup.com/articles/horizontal-scrolling/) · [NN/g mobile carousels](https://www.nngroup.com/articles/mobile-carousels/) · [NN/g carousels](https://www.nngroup.com/articles/designing-effective-carousels/) · [NN/g B2B report](https://www.nngroup.com/reports/b2b-websites-usability/) · [W3C APG carousel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) · [Demand Gen Report](https://www.demandgenreport.com/b2b-content-preferences) · [DGR 2019](https://www.demandgenreport.com/resources/2019-content-preferences-survey-report) · [Gartner 17% summary](https://istart.com.au/?p=29514)
- **SEO and AEO:** [Search Central updates](https://developers.google.com/search/updates) · [HowTo/FAQ 2023](https://developers.google.com/search/blog/2023/08/howto-faq-changes) · [Simplifying results 2025](https://developers.google.com/search/blog/2025/06/simplifying-search-results) · [Nov 2025 update](https://developers.google.com/search/blog/2025/11/update-on-our-efforts) · [FAQ doc](https://developers.google.com/search/docs/appearance/structured-data/faqpage) · [Article doc](https://developers.google.com/search/docs/appearance/structured-data/article) · [Review snippet](https://developers.google.com/search/docs/appearance/structured-data/review-snippet) · [AI features](https://developers.google.com/search/docs/appearance/ai-features) · [Succeeding in AI search](https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search) · [Image SEO](https://developers.google.com/search/docs/appearance/google-images) · [Video SEO](https://developers.google.com/search/docs/appearance/video) · [schema.org CreativeWork](https://schema.org/CreativeWork) · [schema.org Quotation](https://schema.org/Quotation) · [GEO paper](https://arxiv.org/abs/2311.09735) · [Citation studies](https://www.practicalecommerce.com/studies-reveal-ai-citation-clues) · [Growth Memo](https://www.growth-memo.com/i/188121887/3-entity-richness) · [Ahrefs brand mentions](https://ahrefs.com/blog/ai-overview-brand-correlation/) · [Apple marketing guidelines](https://developer.apple.com/app-store/marketing/guidelines/)
- **Front-end:** [Optimize LCP](https://web.dev/articles/optimize-lcp) · [Lazy loading images](https://web.dev/articles/browser-level-image-lazy-loading) · [Lazy loading video](https://web.dev/articles/lazy-loading-video) · [View transitions Baseline](https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available) · [MDN scroll snap](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap/Basic_concepts) · [MDN grid-auto-flow](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow) · [Chrome focusable scrollers](https://developer.chrome.com/blog/keyboard-focusable-scrollers) · [Grid Lanes](https://blog.openreplay.com/css-grid-lanes-masonry-layout/) · [CSS carousels 2026](https://www.sitepoint.com/scrolldriven-css-in-2026-building-carousels-without-javascript/) · [sizes=auto](https://www.datocms.com/product-updates/responsive-images-automatic-sizes.md) · [Astro images](https://docs.astro.build/en/guides/images/) · [Sanity in Astro](https://www.sanity.io/docs/astro/images-and-portable-text-astro) · [Vercel guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md)
