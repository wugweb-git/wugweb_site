> ## Status and pending, 2026-11-17 (end of day)
>
> This section replaces every older status, version or "not built" line on this page. Since the coordinator's handover on 2026-11-17, the wugweb-work session keeps this page and the plan file in the repo (`docs/skills/wugweb-work/PLAN.md`) and works with the owner directly.
>
> ### Where it stands
>
> - Skill: version 0.5.0 on main, Part 1 locked (owner: "call it 0.5"). Last skill commit 5bec58b9, before the review fixes of 2026-11-19 (made in the working tree; the coordinator commits them). Body 1,933 words by the shared count after those fixes; validate 30 checks, 0 errors; test passes. Upload zip built from main; the owner uploads it to the app.
> - Evals: 64 of 78 expectations met, 8 of 14 evals in full. First run 56 of 78; evals 2, 3, 4, 5 and 8 were rerun on live sources (Notion body, R2 files, Sanity copy) and met 26 of 31. Every skill-side failure is fixed.
> - Part 2 step 2 (body parser v2) is on main as 313140b4: 21 tests; all 37 live bodies parse cleanly; 17 render as before and 20 get only the intended fixes. The new fields reach the page only at the template step.
> - Part 2 step 3 (media manifest, read-only dry run) is on main as merge 8f0b7fe8: the library, 18 tests (39 with the parser's), and the report `docs/research/media-manifest-2026-11-17.md`.
> - GitHub has main only. Part 2 steps now go straight to main after local checks, on the owner's go.
>
> ### Owner rulings recorded today (with commits)
>
> - Plan vetting approved; Part 2 needs the owner's own go for each step.
> - Made files go to R2 under the piece's folder, each on the owner's yes, placed by the owner; the skill never uploads. No scheduling tool: posts are handed over as approved drafts (0da786fe).
> - A direct request for a v2 proposal still runs Audit, Media and Look first; a published v1 body counts as proof for the facts it already publishes; the hero subtitle is proposed only after the body is read (0364c6e5).
> - FAQ blocks on service pages and blog posts only, never on case studies; FAQPage only where every question and answer is visible. Google stopped FAQ rich results from 7 May 2026; no rule here depends on them.
> - Internal links: up to the service page only, never a sector page, and across to two or three sibling case studies (03168c7c).
> - Voice: "we" or "I" per piece, the owner's pick; the voice is uncalibrated until he supplies writing samples (48795f52; pointers 0fb1b03a).
> - SEO limits and checks point to wugweb-seo (4ee2a22c); dateModified only on a real content edit (11816356).
> - Brand rules point to wugweb-brand-os: yellow share, claim order, cover rule, the meaning of crop (1bd89d8a, 1cec0144). A client marked NDA in the client record is never named in skill files, evals or examples; facts about Wugweb come only from brand-os (12d0f63c).
> - Media layout, the viewer and the chapter nav spec point to wugweb-kits (0b3add23).
> - Story safe zone: no official pixel figure; keep edges clear (21b5e4e7).
>
> ### Pending: the owner decides
>
> 1. Step 3b go: the visual read of each case study's own media (read-only, one review per case study).
> 2. Five R2 folders no case study with a body claims: bodyshop and hyatt-restaurants (case studies with no body), and others, pvr-cinemas and tecnotree (no case study).
> 3. Six dead links in bodies (two Aditya Birla videos, the Airtel Xsafe thumbnail, three old Inkompass and Plufo images): fix in Notion or leave; the page skips them.
> 4. 69 of 79 videos not arranged for fast start and 21 without a poster: re-encoding or new posters need his yes under the media rule.
> 5. Four pages over the 25 MB budget (Inkompass, Axis Bank, Plufo, Sadhan): a "show less at first" decision.
> 6. Whether the /work list hides the 7 no-body (noIndex) case studies.
> 7. The brand identity archetype has no real brand content yet; its example is under NDA.
>
> ### Pending: the owner's own steps
>
> - Replace the rejected Notion token in the env file (401); the step 4 sync cannot read Notion until then. The standard name is `NOTION_API_TOKEN`; the site sync scripts still read the old name `NOTION_TOKEN`.
> - Confirm NVIDIA_API_KEY in the shell profile; the portability test waits (test text only, never client material; models nvidia/nemotron-3.5-lightning-30b-a3b, nvidia/nemotron-3-ultra-550b-a55b, meta/muse-glimmer-30b).
> - Upload the 0.5.0 zip to the app.
>
> ### Next Part 2 steps
>
> Already on main (see the check below): step 4 schema fields (7e42a910) and step 5 layout resolver, components and preview route (4b834c9b). Still to do: 3b visual read; the step 4 sync dry run (needs the new Notion token), then the owner's go to write, both run by `wugweb-engineer`; 6 previews and the gate on all 44; 7 eval loop; 8 docs and ship.
>
> ### Carried over from the older docs (so they can be retired)
>
> Data fixes, still true on 2026-11-17 (Notion or the CMS, the owner's call):
> - Labelly's Team value ends in a comma.
> - Kia and Axis Bank: the body names Adneto as partner, the record says EasyRewardz.
> - Eastman's Timeline holds sectors; Timeline is empty ("—") on NTUC, Plufo, RideEV, Sadhan and Valyu; Metcred's year and timeline disagree.
> - Results are text, not lists, on 5 records (Kia, Stayweb, HRMS, Valyu, Wugweb revamp); services, related case studies and related posts are empty on all 44 (sync step).
> - Borrowed files: IndusNinja holds six files named after Airtel Xsafe (they are IndusNinja boards); Valyu holds two Airtel-named files; Aditya Birla's body links Inkompass's thumbnail video; Gratify and Bankco use Adneto's images and logo; one Styles pair is shared by Bankco, Adneto, Gratify and the NDA case study.
> - Site flags: MusicLinkd has no thumbnail; the IndusInd Bank client uses the IndusNinja logo; the footer reads "Copyright 2020-2025"; the "Trusted by" heading sits inside the logo list (looks deliberate); home services run 01, 03, 06, 02, 04, 05 in page order.
> - Fixed since September: two slugs per case study, the framer asset paths, relative og images, shared Xsafe and Xstream and Sadhan logos, marquee junk, blog card images.
>
> For the template step (from the code map): the page still renders only the v1 fields; section padding stacks (global stylesheet line 1241); body videos have no poster and images have no width and height; media with no `Section:` prefix still goes to the closing grid; the hero video autoplays with preload metadata; 22 records have no listing thumbnail; the case study schema declares none of 22 fields the records carry; 19 records hold video paths on the old wugweb.online host.
>
> Rules routed to other skills: layout and accessibility items to wugweb-kits (now in its media and widgets file); dateModified to wugweb-seo (done); the brand order detail to wugweb-brand-os.
>
> Older files: the three research docs of 2026-10-19 and section 14 of the September UI spec are carried here and can be retired after the template step; the NTUC draft is superseded by the skill's worked example and can go now; the brand glass showcase prompt was already removed on main (89403ec6).

> COMPILED FINAL PLAN, re-exported 2026-11-16 after the page update. Same content as the Notion page "wugweb-work" (formerly "wugweb-work skill: plan (final for vetting)"; Wugweb HQ / Wugweb Skill Management System) (https://app.notion.com/p/415bb710b9ab818b8057cc9b2c2ed922), put in final reading order. The Notion page is the source of truth: change it there, then recompile. Do not edit this file by hand. Research reports: `docs/research/case-study-system-2026-10-19/`.

# wugweb-work skill: final plan

> CHECKED AGAINST MAIN, 2026-11-19 (coordinator, from the files; no skill file was edited): version 0.5.0 on main, 54 files, skill file body 1,811 words, last skill commit 5bec58b9. Part 2 on main: step 2 (313140b4), step 3 (8f0b7fe8), step 5 (4b834c9b), the D1 gate and block doc (77e75442), step 4 schema fields (7e42a910). The Notion page now holds the skill file text (turned into a Notion skill on 2026-11-18); this file is the plan.

## Contents

1. Where this skill stands · Two tracks · What stays and what moves · Forms module · Works beyond Claude · Track 2 procedure · Fits with the design system · Extracted and absorbed · Skill card · About · Why · One source of truth
2. Status and owner decisions
3. Standing rules
4. Standard structure of the skill
5. Writing style and tone
6. Adaptive UX
7. Skill map
8. Schemas: Body Content v2, layout grammar, JSON-LD
9. Part 1: the skill (folder, references, evals)
10. Part 2: this site's build (pipeline, page, checks, docs)
11. Order of work · Verification · Definition of done · Owner inputs
12. Reference case: NTUC U Care (audit, method, proposal)
13. Background: context and research digest
14. Vetting log

# 1. What this is

> This is the one page for the `wugweb-work` skill. On 2026-11-16 the short skill page and the full plan page were merged here, at the owner's request. Part of the Wugweb Skill System. Plan stage only: nothing goes to development until the owner says.

## Where this skill stands (2026-11-16)

| | |
|---|---|
| Skill | `wugweb-work`, one of seven in the Wugweb Skill System (`wugweb-engineer` is the seventh, 2026-11-19) |
| The question it answers | How is each piece made? |
| Status | Skill built in the owner's development chat and installed. Master copy in the repo since 2026-11-17 at `.claude/skills/wugweb-work/`, version 0.5.0, Part 1 locked (SKILL body 1,933 words by the shared count after the 2026-11-19 review fixes; validate 30 checks, 0 errors; test passes). The standing rules are now one copied block in the skill (`references/standing-rules.md`). Figures with no recorded source were marked unvalidated (sentence length and page position, the FAQ and HowTo end dates, the 44 case studies count). The 14 evals were run and graded on 2026-11-17 (64 of 78 expectations after the live rerun, 8 of 14 in full, per the skill's changelog), and `evals/evals.json` is in the repo copy. The owner uploads the 0.5.0 zip to the app. The site build (Part 2) has started and goes straight to main: steps 2, 3, 4 (schema fields) and 5 are on main (see "Checked against main" above). |
| Planned in session | wugweb-work |
| Will live at | `.claude/skills/wugweb-work/` |
| Registry | Wugweb Skill Management System (https://app.notion.com/p/41abb710b9ab81a38ca7fbd947b47298) |

**Scope, settled by the owner.** `wugweb-work` executes everything, in two tracks:

1. **Client work:** case studies, portfolio, showcase. The full procedure below applies: media manifest, looking at every asset, proof screens, evidence.
2. **Wugweb's own content:** blog posts, service pages, site and landing copy. No client screens to read, so a lighter procedure, still to be written.

The social, deck, Behance and Dribbble versions of either are a module of this skill. Planning (what to say, to whom, when) belongs to `wugweb-strategy`, which hands this skill a brief.

**What it does not own**

- Voice: `wugweb-voice`. One voice; the owner and Wugweb are the same.
- Brand and art direction: `wugweb-brand-os`.
- Layout rules, blocks, components, adaptive UX: `wugweb-kits`.
- SEO and schema rules: `wugweb-seo`.
- Content planning: `wugweb-strategy`.
- Site code (build, deploy, git): an ordinary build plan under the repo's `CLAUDE.md`, not a skill.
- Changes to Sanity and Notion data, their backups and undo, Sanity schema edits, and running the Notion to Sanity sync scripts: `wugweb-engineer` (the seventh skill, 0.3.1, 2026-11-19). This skill hands it the owner-approved content and values file.

**Hands off to and from**

| With | `wugweb-work` gives | `wugweb-work` takes |
|---|---|---|
| `wugweb-strategy` | A finished piece; what proof exists | A brief: what to say, to whom, when, which case studies back it, and which pages it links to (strategy picks the targets; `wugweb-seo` owns the link rules) |
| `wugweb-voice` | The draft, with its form, mode, and the audience and purpose from the brief | A voice check: breaks and fixes |
| `wugweb-brand-os` | Cover picks and visuals to check | Brand and art-direction rules; approved facts about Wugweb |
| `wugweb-kits` | Content shape and chosen media; visible wording it asks for (labels, alt text) | Blocks, layout, tokens; gate and token results |
| `wugweb-seo` | The approved body and page URL; any visible wording seo asks for (title options) | Title and schema rules to apply; keyword notes; a fix list for a finding on one page |

- `wugweb-work` is the hub for wording and voice checks. `wugweb-voice` has no direct link with strategy, seo or kits.
- When seo or kits needs visible wording, they ask `wugweb-work`, which writes it and runs the voice check.
- An audit finding on one page comes here as a fix list. A finding that repeats across a block goes from seo to kits.
- Interface copy (errors, empty states, confirmations, button labels) is written by `wugweb-work` and voice-checked; `wugweb-kits` names which component states need wording.
- Every link must read the same on both skills' pages.

**Waiting on the owner**

- [ ] Vetting and approval of the plan.
- [ ] NTUC inputs: results with source and date, live URL, number of programme-builder steps, heading typeface.
- [ ] Social, still open: who uploads to Behance and Dribbble; where made files are kept before posting; whether a Dribbble shot may sit a screen on a plain canvas; whether Postiz is connected and to which accounts. (Accounts in scope, linked pages and client permission were settled on 2026-11-16; see Owner decisions.)
- [ ] Medium is now an account in scope: is it a form of its own, or the blog post reposted as is?
- [x] Media rule: the three readings are confirmed (2026-11-16; see Owner decisions).
- [x] Token-check findings: reported only at first; blocking comes later, on a short list (2026-11-16).
- [x] Client-work brief: settled 2026-11-16. Brief mode is for client work only; it is written inside this skill.
- [ ] The sizes wanted for story, Behance cover and Dribbble shot. The og image is settled at 1200 x 630 (see Owner decisions). The installed skills disagree on story safe zones and none gives Behance or Dribbble cover sizes.
- [x] Hero copy limit: settled at 90 characters (2026-11-16). The earlier question: this plan sets the subtitle at 90 characters or fewer; `wugweb-kits` proposes a headline of 2 lines or fewer and subtext of 20 words or fewer. Pick one.
- [ ] May LinkedIn posts carry a few specific tags, or none? The plan says none; `wugweb-seo` proposes a few.
- [ ] Confirm the proposed sizes for Behance cover, Dribbble shot and story canvas (og is settled at 1200 x 630).
- [ ] Replies and outreach: are replies, comment routines and outreach pitches part of the Forms module? Until decided they are out, because they are conversation and not production from an approved body.
- [ ] Shared with `wugweb-kits`, held proposals for the layout side: the 85vw rail width, the 20% peek, the 2400 px signature width and the 35 to 60 character line.
- [ ] Shared with `wugweb-kits`, loop pause and hidden loops: loops are `aria-hidden` by rule, but a pause control must be reachable. `wugweb-kits` decides which gives way.
- [ ] Shared with `wugweb-kits`, the `faqs` field clash between the CMS and the page, and the existing blocks awaiting sign-off.
- [ ] Shared with `wugweb-kits`, card thumbnails (16:10 frame, 4:3 videos) and the old media ratios not yet mapped to sections.

**Reading the rest of this page.** Everything below is the full plan as written while `wugweb-work` was the only skill. The decisions above win where an older line disagrees. Parts that now belong to a sibling skill (writing style to voice; layout grammar and adaptive UX to kits; schema to seo; art-direction rules to brand-os; forms planning to strategy) stay here until that skill's plan is approved, then move.

## Two tracks and the nine modes

`wugweb-strategy` hands over a brief for track 2; track 1 starts from the client's project.

| Mode | Track 1: client work | Track 2: Wugweb's own content |
|---|---|---|
| Audit | Full: body, media folder, live page | Text, page and links only |
| Brief | Written here from the audit and the owner's facts | Received from `wugweb-strategy`; checked, not written |
| Media | Full manifest of the R2 folder | Light: cover and inline images measured |
| Look | Every image and video | Cover and inline images only |
| Body | Body Content v2 proposal | Blog or page draft, current to proposed |
| Layout | Block plan, calling `wugweb-kits` | Existing page templates; `wugweb-kits` only if a new block is needed |
| SEO / Schema | Calls `wugweb-seo` | Calls `wugweb-seo` |
| Ship | Full gate | Same gate, minus the media checks that do not apply |
| Forms | All forms | Social versions mainly |

Each track gets its own reference files. Track 2's body standards (blog, service page, site copy) are still to be written; sources are Notion Blogs and the Sanity service records.

## What stays here and what moves

| Part of this page | Goes to |
|---|---|
| Body Content v2, media manifest fields, visual read, proof screens, All screens rule, evidence rules, media rule, evals, NTUC | Stays |
| Writing style and tone; the no-dash rule | `wugweb-voice`. The evidence rule and case-study lengths stay. |
| Block catalogue, tiers, motion, accessibility and performance rules; device and capability rows of Adaptive UX; design vocabulary | `wugweb-kits`. Which block a content shape gets stays. |
| JSON-LD v2; title, description and slug rules; site-wide SEO | `wugweb-seo` |
| Art-direction rules (a cover is never a generic laptop; the Wugweb system frames a client accent) | `wugweb-brand-os`. The cover pick and its reason stay. |
| Calendar, topic choice, editorial standards, repurposing order, reporting | `wugweb-strategy` |
| Part 2: parser, manifest code, sync, schema, components, tests, deploy; git rules | Ordinary build plan under `CLAUDE.md` |
| Skill map, handoff contracts, per-task tests | Divided by the function each row serves |

Nothing has moved yet. Each part stays on this page until the sibling skill's plan is approved.

## Forms module (taken in 2026-11-16)

There is no separate social skill. Its tasks are a module of this skill. Planning (calendar, repurposing order, campaigns, reporting) went to `wugweb-strategy`.

**Files**, under `.claude/skills/wugweb-work/references/`: `forms.md` (index; card, tile and logo band stay here) and a `forms/` folder with `fact-pack.md`, `linkedin-post.md`, `linkedin-carousel.md`, `behance.md`, `dribbble.md`, `deck.md`, `pdf.md`, `charts.md`, `og-image.md`, `presence-compare.md` (read-only check of a Behance or Dribbble piece against its case study) and `publish-approval.md`. Three examples: NTUC fact pack, LinkedIn post, carousel outline.

**What each form takes from an approved body**

| Form | Takes | Helpers |
|---|---|---|
| LinkedIn post | One claim heading, its answer sentence, one design decision as the lesson, one proof screen, the page link. No numbers or quotes that are not in the body; no hashtag lists. | `linkedin-post-writer` |
| LinkedIn carousel | Title and subtitle on slide 1; one claim heading per slide with its proof screen; "What was delivered" last. No chapters without a screen, no flagged screens. | `carousel-writer`, `before-after-and-transformation` |
| Behance | Cover, screens set by set in body order, approved captions word for word, credits from Team and Partner. | Own procedure |
| Dribbble | One proof screen or one flow, a title, one or two sentences from that chapter, the page link. | `platform-specs-and-validation` |
| Deck | One claim per slide, delivered facts and credits at the end. | `slides`, `pptx` |
| PDF | Same content as the deck or page. | `pdf` |
| Charts | Only numbers with value, what, period, baseline, source and date. | `dataviz`, `data:create-viz`, `data:statistical-analysis`, `data-and-original-research` |
| og image | An existing R2 file that fits, first; a made file only if nothing fits and the owner says yes; wired in by site code, not by the module. | |

**Two more forms (added 2026-11-16, from `wugweb-strategy`'s list)**

| Form | Takes | Helpers |
|---|---|---|
| Newsletter edition | Built from one or more approved pieces. One purpose and one main action; each item links to its page; no fact that is not in an approved body. In scope (owner, 2026-11-16). Sending needs the owner's yes. Form file still to be written. | `email-and-newsletter`, `email-sequence` (the first not yet read) |
| Advocacy copy | Short share text for the team, built from an approved post. Same facts as the post; nothing added. | `linkedin-company-pages` |

Not in this module: replies, comment routines and outreach pitches. They are conversation, not production from an approved body, so the fact ledger and approval steps do not apply to them as written. Proposed by `wugweb-strategy`; left out until the owner decides.

**Sizes for made files (proposed, awaiting the owner's confirmation)**

Found by the coordinating session on 2026-11-16 and kept on the registry; not checked by this session. These are sizes for new made files, never for resizing client media.

| File | Size | Source and standing |
|---|---|---|
| Link share image (og) | 1200 x 630 | LinkedIn Help, read directly: at least 1200 x 627, ratio 1.91:1, 5 MB at most. Settled by the owner, 2026-11-16. |
| Behance cover | Upload at least 808 x 632; shown at 202 x 158 | Behance Help Center as reported by search; figures date from 2020; the page was not read directly |
| Dribbble shot | At least 1600 wide, no fixed ratio; PNG, JPG or GIF up to 10 MB, video up to 20 MB | Dribbble Help Center, read directly; 1600 x 1200 is convention only |
| Story canvas | 1080 x 1920 | Safe zone unverified: no official page confirms it. Guides range from 250 px top and bottom to 270 px top, 670 px bottom and 6% at the sides; use the wider margins |

**Rules in every form file.** Platform sizes and limits are checked with `platform-specs-and-validation` when the file is written, and dated, never from memory. Existing media is resized keeping the ratio; masks allowed; no cropped files; no sound (where a brand file says "decisive crop", the media rule wins). Client words only as a quote that is in the body. British English, sentence case, no dashes, no hashtag stuffing.

**Approval steps** (`publish-approval.md`)

1. The body is approved, else stop.
2. Fact ledger: every sentence maps to a body line.
3. Voice checked against `wugweb-voice`.
4. Format checked against the dated spec.
5. Media check; each made file listed.
6. The owner's yes per made file.
7. The owner's yes per post, seeing the exact text, media, account, date and time. A post whose linked page is not live is held. A client is named or tagged only with permission on record.
8. Send or schedule through Postiz, then report. Any later edit needs a new yes.

**Tests.** Every fact-pack item has a body line. Every post sentence is in the ledger. One claim per carousel slide, with a proof screen. Behance captions match the approved ones word for word. No deck slide without a body line. A chart request on a body with no numbers is refused. An existing og file is proposed before a made one. "Post it now" stops for the per-post yes. An unapproved body stops at step 1.

**Source gaps.** The Behance and Dribbble counts were not checked against the live profiles. The brand files `LinkedIn_Post.md`, `Pitch_Deck.md` and `Instagram_Post.md` are one paragraph and empty headings. No approved body exists yet. Platform specs are unverified.

## Works beyond Claude

Owner, 2026-11-16: every skill must be usable from GPT, Cursor or another tool, not only Claude.

- **Plain rules.** `SKILL.md` and every reference file are plain Markdown that any model can follow. No rule depends on a Claude feature.
- **Helpers are optional.** Every mode can be done by hand from the reference files. Claude-only helper skills, plugins and connectors speed a mode up; none is required.
- **Scripts.** `case-audit.mjs` and `check-case-page.mjs` are plain Node with no Claude tooling.
- **Wiring in one file.** Tool and vendor names (Notion, Sanity, R2, Cloudflare, Postiz, the helper skills) live only in `references/ops-cycle.md` and `references/skill-map.md`.
- **Single-file export.** One Markdown file, built from `SKILL.md` and the references, that can be pasted or attached in GPT, Cursor or another tool.
- **Test.** One eval prompt is run from the export in another tool; it passes when the output meets the same checks as the with-skill run.
- **Main file stands alone.** Other tools may not load reference files on demand, so `SKILL.md` carries the core rules itself (source rule, evidence rule, media rule, approval gates, the nine modes); the reference files add detail, never a rule that is missing from the main file.

**What works only in Claude today** (Claude's assessment, for the owner to correct)

- Looking at every image and video needs a model that can see them and reach the R2 URLs. A text-only tool cannot do the Look mode.
- Stepping through video frames uses the browser pane.
- The skill-creator eval loop and the helper skills are Claude tooling.
- Notion, Sanity and Postiz access runs through this setup's connectors; another tool needs its own access or a person to paste the content in.

## Track 2 procedure: Wugweb's own content

Applies to blog posts, service pages, and site and landing copy.

**Sources.** Blog posts: Notion Blogs. Service pages: the Sanity service records for the six pillars. Site and landing copy: the page's own records. Media: existing R2 files only. A piece starts from a brief handed over by `wugweb-strategy`. (Where service-page and site copy live is taken from the repo's `CLAUDE.md`, not from the owner directly; to be corrected if wrong.)

**Steps**

1. **Check the brief.** It must name the reader, what they know now, what they should know and do after, the goal, the format, and which case studies back it. A missing field goes back to `wugweb-strategy`; nothing is drafted without it.
2. **Audit what exists.** Read the current piece and its live page. Give it one verdict: keep, update, merge or retire. List every claim, link and image, with what is backed and what is not.
3. **Media, light.** Measure the cover and inline images already in R2: status, size, pixel size, alt. Look at each one before writing its alt text or caption.
4. **Outline, then draft.** One declared structure, held throughout. Use the body standard for the type (below). Every claim points to a screen, a sourced number, a named fact or a linked case study; anything else is cut or marked unvalidated.
5. **Check the draft.** Fact lock, evidence ledger, source log for outside claims, metric fields, skim test, count of deliverables. Then the voice check through `wugweb-voice`, and title, description and schema limits from `wugweb-seo`.
6. **Propose.** Current to proposed, with the reason for each change and the questions for the owner.
7. **Owner approval** of that exact text. Only then is the source written, with a backup first, and synced on the owner's go.
8. **Ship gate** on the rendered page at 375, 768 and 1200, then other forms if wanted.

**Body standards**

- **Blog post:** the opening states the claim and who it is for; one teachable thing; sections with claim headings, the point first, then evidence; limits or trade-offs; a close with one next step, soft where the page informs.
- **Service page:** what it does and for whom; the problem it removes; how it works; what it needs from the client; proof only from real case studies, linked; limits; one action.
- **Site and landing copy:** the first screen says what, for whom, and one action; how it works; real proof; objections answered in the body, no FAQ block; the same action repeated.

**Hard stops:** an unsourced factual claim, an invented number or quote, a piece with no brief, any write without the owner's approval.

## Fits with the design system (source: kits docs; rules owned by wugweb-kits)

Read from `kits_design_system/docs/tokens/layout-shell.md`, `tokens/sizing.md` and `docs/components.md`. This skill points to those docs and restates none of their values.

- **Numbers.** Widths, section padding, columns, gaps and header heights for the Layout mode and the page gate are read from `layout-shell.md` and nowhere else.
- **Structure.** Page, section, content, blocks. The section owns the gutter and the content owns the maximum width. A block plan never sets its own gutter or width.
- **Headings.** Every section needs an id and an accessible name, so every chapter in a body needs a real heading. One h1 per page; no skipped levels.
- **Filters** sit inside the grid they filter, never as a section of their own.
- **Media.** Alt always, empty only when decorative. Decorative muted loops are hidden from screen readers. Media with a caption is a figure with a figcaption. A loop longer than 5 seconds gets a pause control (owner, 2026-11-16; the rule is held by wugweb-kits).
- **First screen.** On a 390 x 844 phone the headline, subhead and primary action are visible without scrolling.
- **Actions.** One yellow conversion action per page; labels describe the action. Yellow stays under 10% of the page.
- **Existing blocks** (Service Spotlight Panel, Client Assembly Grid, Service Tag Field, Bento Block, Process Map) are all awaiting the owner's sign-off. The bento on `/work/[slug]` is the layout this plan replaces.
- **Proposed CMS fields** on case studies and posts (`ogImagePath`, `noIndex`, `focusKeyword`, `searchIntent`, `aiSummary`, `keyTakeaways`, `faqs`, `schemaType`, `lastReviewedAt`) are a proposal owned elsewhere, not deployed. The `faqs` field feeds FAQPage schema, which the owner has ruled out; that clash is with the owner.

**Open items shared with wugweb-kits**

- Thumbnail shape. The work card uses a 16:10 container, while the thumbnail videos are 4:3 and the current CSS crops them. Under the media rule a file is shown whole, so either the card shows a 4:3 file inside a 16:10 frame with space around it, or the card changes shape. For the owner to decide.
- Media ratios. The docs say the old Framer media ratios are not yet mapped to sections. The manifest's shape field (phone, tall, square, landscape, wide, scrollshot) is the input for that mapping.

## Extracted and absorbed (2026-11-16)

Owner instruction: the helper skills are read so that their useful rules can live inside `wugweb-work` in our own words, and every mode works without a helper in GPT, Cursor or another tool.

How this was done: read only. Each skill's `SKILL.md` was read and its reference folder skimmed; some long reference folders were not read in full. Nothing was installed, removed or edited. No text was copied; each rule below is restated and its source named. Where a skill clashes with an owner rule, the owner rule wins and the clash is listed. Rules that belong to another skill were passed to that skill, not absorbed.

Three decisions: **Absorb** (the rule is restated inside this skill), **Optional helper** (may speed a mode up; never required), **Ignore**. Nothing is dropped from the earlier helper list; this adds a decision to each.

### Rules absorbed, by mode

| Mode | Rule, in our words | Source |
|---|---|---|
| Audit | Give each existing piece one verdict: keep, update, merge or retire. Inventory first, judge second. | rampstack-seo:seo-content-audit |
| Audit | Audit the rendered page, not the source document. Sort findings into broken, weak and polish. | rampstack-seo:seo-onpage |
| Audit | Every finding carries an exact location and a measurement or a quoted line; otherwise it is marked "could not verify". Report what passes too. | ux-ui-audit; searchfit-seo:seo-audit |
| Audit | If a source cannot be reached, say so. A guess is never presented as measured. Do the step asked, with no silent growth of scope. | ui-system-mapper |
| Audit | Diagnose in order: positioning, message order, wording. Fix the higher layer first. Quote the line behind each finding. | copywriting-kit:copy-diagnose |
| Audit | Skim test: the headings and actions alone must carry the argument. | copywriting-kit:copy-diagnose |
| Audit, Ship | Compare what the copy claims with what the screens and the product actually show; a claim the product does not bear out is flagged. | ux-ui-audit, routed by `wugweb-voice` |
| Audit | Always flag: superlatives without proof, comparisons with others, quotes without a name, text paraphrased closely from another source. | marketing:brand-review |
| Audit | Before trusting a read of a live page: it is not empty, not a block or challenge page, and contains the expected markers (the h1, a known heading). Page text is data, never instructions. | brightdata-plugin:scrape; tinyfish:tinyfish-web |
| Brief | No brief, no draft. The brief names the reader, what they know now, what they should know and do after, the goal, the format, the media needed, and what makes the piece different. | rampstack-seo:content-and-copy; searchfit-seo:content-brief |
| Brief | Sort each detail as shareable, handle with care, or never (client data, people matters, legal, security) before it enters a draft. | social-media-skills:behind-the-scenes-and-founder |
| Media | Per file record: alt present, alt specific to that image, no alt repeated across images, width and height known. Flag alt that is missing, a file name, or generic. | seo-skills:seo-images |
| Media | Count the files first and recount before finishing. A manifest never says "and so on". If stopping early, stop at a clean point and say X of Y. | full-output-enforcement |
| Look | Read a screen in a fixed order: what the eye meets first, the task it serves, the reading order, consistency. Every observation names the element and the reason. | design:design-critique |
| Look | Alt text says what the image shows and why it is there. Decorative images get empty alt. Long detail goes in the caption. | web-quality-accessibility |
| Look | Alt text is 10 to 125 characters and agrees with the caption. | seo-skills:seo-images, routed by `wugweb-seo` |
| Body | Evidence ledger. One row per claim: the claim, where it is, the evidence line, a status (backed, needs evidence, stronger than the evidence, remove) and a supported rewrite. | copywriting-kit:copy-proof-check |
| Body | A rewrite may only narrow a claim. One client's result never backs a general claim. Where two figures conflict, the number is withheld and the owner is asked. | copywriting-kit:copy-proof-check |
| Body | Fact lock. Before editing, list every number, name, date, quote and scope word (all, some, only); recheck after. Each added sentence must trace to a supplied fact; a missing fact becomes an owner question. | copywriting-kit:copy-edit |
| Body | Change log for every edit: before, after, reason. | copywriting-kit:copy-edit |
| Body | Outline before prose. Pick one structure and hold it. Edit in order: structure, substance, wording. Edit by cutting. | rampstack-seo:content-and-copy |
| Body | A rate needs its denominator and definition. Small samples are directional only. A benchmark needs source, year and population, and is never a target. | analytics-skills:metric-context-and-benchmarks |
| Body | Never round a number up. State sample, period and method beside the figure. | social-media-skills:data-and-original-research |
| Body | Compare like periods and flag partial periods. Parts must sum to the total. | data:validate-data |
| Body | Trace each load-bearing outside claim to its primary source; confirm it exists, says it, and is current. Keep a source log: claim, source, date, link. | social-media-skills:content-research-and-sourcing; deep-research |
| Body | Only what actually happened. Quotes keep their exact wording, source and consent. | social-media-skills:behind-the-scenes-and-founder, social-proof-and-testimonials |
| Body | Body markdown uses only constructs the sync can convert to blocks: links, bold and italic, lists with a type and level. | sanity:portable-text-conversion |
| Body, track 2 | Each section has one job or it goes. Lead each section with its point. Teach one thing per piece; more than one becomes a series. | website-design:landing-page; marketing:content-creation; social-media-skills:educational-content-and-how-to |
| Body, track 2 | No proof supplied means no proof section. State one limit or fit condition. | copywriting-kit:landing-page-copy |
| Body, track 2 | Match the call to action to the reader's intent: a soft next step on a page that informs, one clear action on a page where the reader is ready to act. | rampstack-seo:seo-keyword, routed by `wugweb-seo` |
| Body | When two competing pages are both kept, rewrite the title, H1 and opening of each so each owns a distinct intent. `wugweb-seo` names the pair; the rewrite is done here. | seo-skills:seo-content-audit, routed by `wugweb-seo` |
| Layout | Per block, state the limits: maximum length, and what shows when a field or a media item is missing. | design:design-handoff |
| Layout | Numbering and labels must reflect a true order or structure in the content. | frontend-design |
| Layout | Show real screens, not icon cards. One main point and one visual per section. | website-design:landing-page; design-taste-frontend |
| SEO / Schema | Schema fields are filled only from what the page shows. An unfilled field is marked for the owner, never guessed. (All other schema rules belong to `wugweb-seo`.) | searchfit-seo:schema-markup; seo-skills:seo-schema |
| Ship | Hard stops that block publishing whatever else passes: an unsourced factual claim, an undisclosed relationship, no date on time-bound content. Verdict is publish, publish with fixes, or no. | seo-skills:seo-content-audit |
| Ship | Every link and media address in the piece resolves; list source, target, status. A broken link is fixed at the link, never by a redirect. | searchfit-seo:broken-links |
| Ship | Check the rendered page at phone, tablet and desktop widths; never call something checked from code alone. Rank findings must, should, nice. Change nothing until the owner picks. | website-design:review-page |
| Ship | Reread every visible string before ship. No placeholder text, links work, screenshots are current, permission for each quote is held. | design-taste-frontend; rampstack-seo:content-and-copy |
| Ship | Every custom block type in the body has a renderer; an unknown type fails the gate. | sanity:portable-text-serialization |
| Ship | Order the checks cheap first: automated checks, then the manual read. | design-qa |
| Forms | Every form is derived from the one approved body. Each form stands alone and is rebuilt for its place, not pasted; the facts are the same in all of them. | sanity:content-modeling-best-practices; social-media-skills:cross-platform-repurposing |
| Forms: LinkedIn post | One idea per post. The opening must carry the point before the preview cut-off. Short paragraphs. The link sits outside the body text. | social-media-skills:linkedin-post-writer, text-post-and-microblog |
| Forms: carousel | The cover states the promise. One idea per slide. The slide count is set by the body. The last slide is the payoff. Say so when a carousel is the wrong form. | social-media-skills:carousel-writer |
| Forms: before and after | Before and after are shown under the same conditions, with the middle (process, timeline) included. No cherry-picked result. | social-media-skills:before-after-and-transformation |
| Forms: captions | A caption adds to the media and does not describe it. One call to action. | social-media-skills:caption-writer |
| Forms: thread | A thread is one idea rebuilt beat by beat, never an article cut up. If it fits one post, it is one post. | social-media-skills:thread-writer |
| Forms: deck | One message per slide. Whether it is read alone or presented decides the word count. Check for overflow and leftover placeholder text. | pptx |
| Forms: charts | The title states the finding, with dates. Bars start at zero. No 3D, no second axis. Source and date on the chart. Sorted by value. Not colour alone. Alt text. One or two numbers are a stat, not a chart. | social-media-skills:infographic-and-data-viz; data:create-viz, data-visualization, validate-data |
| Forms: charts | Use the median for skewed data. One result is not a general claim. | data:statistical-analysis |
| Forms: card, tile, og image | One line per card, word for word, attributed, in context. Image and title do not repeat each other. Must read at small size. | social-media-skills:quote-cards-and-text-graphics, thumbnail-design |
| Forms: og image | Use a real asset, screenshot or chart before any made image. | social-media-skills:image-prompt |
| Forms: approval | Show exactly what will happen and get a yes per action. Publish now and delete are separate actions. Create as a draft first; moving to the queue is its own step. | social-media-skills:scheduling-and-queue; postiz |
| Forms: email (only if approved as a form) | One purpose and one main action per email. Subject and preview limits checked and dated. | marketing:email-sequence |
| Skill build | Main file short, one reference file per mode, loaded when needed. Say why each rule exists. Description lists trigger phrases; every reference file is named in the main file. Test with and without the skill. | skill-creator; skill-development; rampstack-seo:skill-creation-walkthrough |

### Decision for every skill read

**Absorbed (rules above):** rampstack-seo: seo-content-audit, seo-onpage, content-and-copy. searchfit-seo: broken-links, seo-audit (finding format only), content-brief (skeleton only), schema-markup and generate-schema (evidence rule only). seo-skills: seo-images (record fields only), seo-content-audit (hard stops only). copywriting-kit: copy-proof-check, copy-edit, copy-diagnose, landing-page-copy. marketing: brand-review (flag list), email-sequence (limits only). analytics-skills: metric-context-and-benchmarks. data: validate-data, create-viz, data-visualization, statistical-analysis. design: design-critique, design-handoff (one rule). website-design: landing-page, review-page. sanity: content-modeling-best-practices (single source), portable-text-conversion, portable-text-serialization (check only). social-media-skills: linkedin-post-writer, carousel-writer, before-after-and-transformation, social-proof-and-testimonials, data-and-original-research, cross-platform-repurposing, caption-writer, infographic-and-data-viz, quote-cards-and-text-graphics, thumbnail-design, image-prompt (gate only), thread-writer, text-post-and-microblog, behind-the-scenes-and-founder, content-research-and-sourcing, educational-content-and-how-to, scheduling-and-queue, story-writer and pinterest-pin-design (specs only, parked until those forms are approved). Claude app skills: full-output-enforcement, ui-system-mapper (two rules), frontend-design (one rule), design-taste-frontend (four rules), web-quality-accessibility (alt and caption), skill-creator, skill-development, pptx (content rules), deep-research (citation rule). ux-ui-audit (finding rules). brightdata-plugin: scrape (the read check only).

**Optional helper:** rampstack-seo: seo-keyword, skill-creation-walkthrough. searchfit-seo: internal-linking. seo-skills: seo-schema, seo-geo, seo-content-brief, seo-sxo. aeotester: audit. cloudflare: web-perf, wrangler. design: accessibility-review, ux-copy. brand-voice: brand-voice-enforcement. marketing: content-creation. website-design: web-review. ui-ux-pro-max. design-qa. code-review. sanity: sanity-best-practices. social-media-skills: platform-specs-and-validation. slides. banner-design. pdf. docx. xlsx. postiz. html-css-to-image: hcti-open-graph-images, hcti-image-generation. Notion: find, database-query. tinyfish: tinyfish-web (fetch only). `wugweb-seo` is a sibling, not a helper: handed to, not absorbed.

**Ignored:** rampstack-seo: seo-aeo-geo, content-strategy. searchfit-seo: content-strategy, create-topic, create-content, on-page-seo, translate-content. sanity: seo-aeo-best-practices, content-experimentation-best-practices, typegen. marketing: campaign-plan, draft-content. aeo-brand-scan: scan. copywriting-kit: brand-voice. brand-voice: guideline-generation. design: design-system. musiclinkd-design-system (another product's contract; stays as the MusicLinkd-only helper in the skill map). system-design. responsive-token-engine. gsap-react. web-design-guidelines. web-artifacts-builder. superdesign. simplify. Notion: create-page. social-media-skills: hook-writer, storytelling-and-narrative, design-and-templates, linkedin-company-pages, canva, youtube-publishing-and-metadata.

**Ignored under the no-sound rule (social-media-skills):** ai-video, ai-voiceover, ai-music-and-sound, heygen, synthesia, runway, kling, luma, veo-3, suno, descript, capcut, opus-clip, podcast-and-audiograms. Also not needed: captions-and-clipping, talking-head-and-piece-to-camera, livestream-and-realtime, reels-script, short-form-video-script, tiktok-script, scripting-and-storyboarding, youtube-long-form, youtube-shorts. Under "existing media only": ai-image-editing, flux, ideogram, nano-banana.

### Clashes with owner rules (the owner rule wins in each)

| Skill | What it suggests | Owner rule that wins |
|---|---|---|
| rampstack-seo:seo-aeo-geo, searchfit-seo (several), seo-skills:seo-schema, sanity:seo-aeo-best-practices, website-design:landing-page, marketing:draft-content | FAQ blocks, FAQPage or HowTo schema, llms.txt, question headings | None of these |
| searchfit-seo: content-brief, create-content, on-page-seo | Keyword counts and "3 to 5 links minimum" | No keyword counts |
| searchfit-seo:seo-audit, seo-skills:seo-content-audit, copywriting-kit:copy-diagnose | 0 to 100 or percentage scores | Every number is computed from something real; no invented scores |
| rampstack-seo:seo-content-audit, searchfit-seo:broken-links | Redirects as the fix | No redirects; fix the link |
| seo-skills:seo-images, cloudflare:web-perf | Convert or compress images | No re-encoding |
| design-taste-frontend, superdesign, banner-design, canva, image-prompt, hcti skills | Generated or placeholder images, third-party logos, uploads | Existing client media only; a made file needs a yes for that file |
| design-qa | Stored screenshot baselines | No stored screenshot files |
| social-media-skills: linkedin-post-writer, carousel-writer, caption-writer, hook-writer; marketing:content-creation | Hashtag sets, "save this" and comment-bait closers, curiosity-gap openers, hook formulas with made-up statistics | No hashtag stuffing, no bait, no invented numbers |
| social-media-skills: story-writer, pinterest-pin-design, canva | Formats that need crops or new rasters | No cropping; existing media must already fit |
| postiz, canva, docx | Upload media or make local copies | No uploads, no local copies |
| Notion:create-page, sanity:portable-text-conversion, code-review | Write to Notion or Sanity, or post comments | Nothing written without approval of that exact change |
| tinyfish, brightdata, seo-skills (paid data), aeo-brand-scan | Billed services, or data sent to a third party | Free tier only; private data stays private |
| frontend-design | Invents copy when the brief has none | Never invent; ask |
| social-media-skills: scheduling-and-queue, platform-specs-and-validation | A scheduler called WoopSocial, one approval per batch, uploading media | A yes per post; no uploads |
| design (the owner's own skill; not read by this session, reported by `wugweb-voice`) | Slide copy formulas with empty number slots | No number without a source |

### Passed to other skills, not absorbed

Sent to the coordinating session as "FOR" lists: accessibility, token, block-state, render-width, safe-zone and deck type-scale rules to `wugweb-kits`; stock-phrase, opener, register, quote-length and "we" or "I" rules to `wugweb-voice`; title, meta, schema, indexing, internal-link, alt-length and translation-keyword rules to `wugweb-seo`; brief template fields, series and refresh decisions, cadence, repurposing order, page or profile choice and reporting to `wugweb-strategy`; positioning line, signature element and colour rules to `wugweb-brand-os`.

From `wugweb-kits`' own pass, routed here as proposals:

| Proposal | Call |
|---|---|
| Hero copy limits: headline 2 lines or fewer, subtext 20 words or fewer (design-taste-frontend) | Not taken as written. This plan already sets the subtitle at 90 characters or fewer; a second limit would clash. For the owner to choose one. Not checked against the source by this session. |
| A two-second test and five lenses for the Look mode (design:design-critique) | Taken as the fixed reading order above. The "five lenses" wording was not checked against the source by this session. |
| Made files: `wugweb-work` picks which platform size a file uses; `wugweb-kits` supplies the size list and safe zone | Taken. Matches the links table. |

From `wugweb-brand-os`' own pass, routed here as proposals:

| Proposal | Call |
|---|---|
| Platform size tables and export steps in banner-design, design, superdesign, thumbnail-design, pinterest-pin-design, carousel-writer, canva, pptx | Sizes are noted as unverified leads only; each is checked and dated when its form file is written. Export steps that generate, crop, upload or re-encode are not taken. |
| Asset naming and manifest in the brand skill | Not taken. This skill's manifest describes files as the owner placed them in R2; nothing is renamed. Not read by this session. |
| Prompt templates in brandkit and image-prompt | Not taken. Existing media first; a made file needs the owner's yes for that file. |
| Battlecards in competitive-brief and competitive-intel | Not this skill's. Belongs to `wugweb-strategy` if anywhere. Review sites are not a source (owner rule). |

From `wugweb-voice`'s pass: the structures, lengths and claims checks it pointed to are the ones absorbed above; its warning stands (many of those templates model invented figures, urgency lines and title case; owner rules win).

Never run: brightdata `design-mirror` (it scrapes other sites, restyles the codebase, and its scripts turn off certificate checking).

### Track 2 structure, first draft from this pass

For the owner's review; this is the starting point for the track 2 body standards, not a final standard.

- **Blog post:** an opening that states the claim and who it is for, with no warm-up; one declared structure held throughout; each section with a claim heading, its point first, then a screen, a sourced number or a named fact; trade-offs or limits; a close that resolves the opening with one next step.
- **Service page:** what it does and for whom; the problem it removes; how it works (what goes in, what is done, what comes out); what it needs from the client; proof only if real, with case studies linked; limits; one action.
- **Landing page:** first screen says what, for whom, and one action; the reader's situation only if supplied; how it works; real proof; objections answered in the body with one fit condition, not in an FAQ block; the same action repeated.
- **All three:** every section has one job; the headings and actions alone pass the skim test; checked by fact lock, evidence ledger, source log, metric fields and a count of deliverables, then owner questions.

### Gaps this pass found

- No installed skill reads video frame by frame, or sorts UI screens by kind, audience, flow and state. The core of the Look mode is written from scratch, as the NTUC run already did.
- No skill covers Behance. Dribbble appears only as a posting channel, with no format rules. Both form files are written from our own procedure.
- No skill gave an og image size, or Behance or Dribbble dimensions.
- Platform numbers that were found (LinkedIn post about 3,000 characters with about 140 to 210 visible before the cut-off; Threads about 500; story 1080 by 1920; pin 1000 by 1500; LinkedIn banners 1584 by 396 and 1128 by 191) are unverified, and one skill disagrees with another on the LinkedIn limit. Each must be checked and dated when its form file is written.
- `dataviz` was not found on disk (it is built into the app) and was not read. `simplify` likewise.
- Wrangler has no read-only command that lists the objects in an R2 bucket, as far as this pass could tell; the media manifest needs its own script. To be confirmed against the project's own `wrangler r2 --help`. Commands that write, delete or download are forbidden.

## Skill card

| Field | Value |
|---|---|
| Name | `wugweb-work` |
| Type | Claude Code project skill (Agent Skill): one `SKILL.md` plus `references/`, `scripts/`, `examples/`, `evals/` |
| Version | 0.4.2 (repo master copy 2026-11-17; built as 0.4.0 on 2026-11-16, installed 0.4.1; the plan's first number was 0.1.0) |
| Status | Skill built, installed (app copy 0.4.1) and in the repo (master 0.4.2). Evals not run and not in the repo copy. Site build not started. |
| Owner | Vedanshu, Wugweb |
| Lives at | `.claude/skills/wugweb-work/` in the repo `wugweb-git/wugweb_site` |
| Content source | Notion Case Studies → Body Content (one document per case study) |
| Media source | Cloudflare R2, `assets/work/<slug>/` |
| Used by | Any Claude session on the repo. Other bots use this export. |
| Covers | Case study page, portfolio, showcase, and the other forms of the same work: card, showcase tile, logo band, deck or PDF, Behance, Dribbble, LinkedIn |
| Also covers (added 2026-11-16) | Wugweb's own content: blog posts, service pages, site and landing copy (track 2; procedure still to be written). Site-wide SEO belongs to `wugweb-seo`. |
| Depends on CMS or host | No. Only one reference file and the scripts name Notion, Sanity, R2 and Cloudflare. |
| Developed in | Claude chat https://claude.ai/chat/9a6e8e7f-382b-4eb7-9634-70128e0641e5 (given by the owner, 2026-11-16; the planning session cannot open it) |
| Reference case | NTUC U Care (audit and proposal at the end of this file) |

## About

**What it is.** A written standard and a step-by-step procedure for turning a client project into a case study and its other forms. It tells Claude how to read the source, look at every image and video, judge what proves what, write the body, pick the layout, and check the result.

**What it is not.** It is not a page template and not a design. The page code for this site is a separate part of this plan (Part 2).

**When it is used.** Whenever someone asks for a case study, portfolio or showcase piece, a `/work` page, Body Content for a client, screens or brand assets to be arranged, or a Behance, Dribbble, LinkedIn or deck version of a project.

**What goes in and what comes out, per mode.**

| Mode | In | Out |
|---|---|---|
| Audit | Body Content, media folder, live page | Findings: what is there, what is missing, what is wrong |
| Brief | Audit + owner's facts | One-page brief: claim, tension, proof, outcome, keyword |
| Media | Media folder | Manifest: every file measured, own or borrowed, duplicates, weight |
| Look | Every image and video | Visual read: what each shows, kind, audience, flow, state, flags, alt, caption |
| Body | Brief + visual read | Body Content proposal, current → proposed, with owner questions |
| Layout | Approved body + manifest | Block plan for the page |
| SEO / Schema | Approved body | Title, description, headings check, JSON-LD |
| Ship | Built page | Gate result at 375, 768 and 1200, then sync and deploy on the owner's go |
| Forms | Approved body | Card, tile, deck, Behance, Dribbble and LinkedIn versions |

## Why we are doing this

1. **The content was made for a schema that no longer exists.** The case studies were written to fill fixed Framer slots. The real work sits unlabelled in R2. On NTUC the page shows 7 device mockups and unbacked claims while 31 real screens are hidden in an end carousel. The same pattern runs across the 44 case studies.
2. **Every case study has been handled ad hoc.** The bento attempt failed because it was one composition forced on every content shape.
3. **What is coming is bigger and more varied.** iKan v2, MusicLinkd (200+ screens), Animal Writes (stats, SEO and campaigns), and clients where Wugweb does many things in one engagement. The same work must also become decks, Behance, Dribbble and LinkedIn pieces.
4. **Several sessions and other bots work on this.** Without one written standard each one redoes it differently.

So the need is a standard and a procedure, not another page design.

**Two findings from analysing the plan.**

- **The plan is two things and they are now separated.** Part 1 is the skill: standard, procedure and two read-only scripts. It is portable and cannot break the site. Part 2 is this site's build: parser, media manifest, sync, components and template. The NTUC run showed Part 1 works by hand before any code exists, so Part 1 is built and tested first.
- **Risks, stated plainly.** Scope: "end game of all" can stall delivery, so v0.1 covers the audit and the case-study page, with other forms as one reference file. Owner inputs (numbers, links, sources) are the real limit on quality: no numbers are invented. Looking at every asset is slow and is the main running cost.

## One source of truth

- **The Notion page is the source** for the plan, its decisions and its status. Changes are made there first.
- **This file is the one export** of that page for other tools.
- **Research lives once**, in `docs/research/case-study-system-2026-10-19/` (three files).
- **Everything else points to the Notion page and repeats nothing**: `pending.md`, `CLAUDE.md`, `AGENTS.md`, `governance.md`, the Wugweb Skill Management System registry.
- Once the skill is built, `.claude/skills/wugweb-work/` becomes the source for the skill's own rules and the plan keeps status and decisions only.

# 2. Status and owner decisions

## Status (2026-11-14)

- The plan is final and waiting for the owner's vetting and approval.
- Nothing is built: no skill files, no site code, no Sanity write, no case-study row changed in Notion, no media touched.
- Done, read-only: three research reports (in `docs/research/case-study-system-2026-10-19/`), the NTUC reference audit, the NTUC Body Content v2 proposal.
- NTUC test: audit and proposal done; the new page is not built, so there is no preview yet and the eval loop has not run.
- Docs are aligned: `pending.md`, `governance.md`, `CLAUDE.md`, `AGENTS.md` and the Notion hub all point to the Notion plan page.
- Next step after approval: step 0 in "Order of work".

## Owner decisions, each stated once

| Date | Decision |
|---|---|
| 2026-10-13 | Case-study content is Notion Body Content only. One slug per case study. Zero Framer. |
| 2026-10-19 | Existing content is an input, not the benchmark. One source, from the owner; Claude enriches by proposal only. |
| 2026-11-11 | No sound anywhere: every video is muted. |
| 2026-11-11 | A flagged screen (sample data, placeholder text) is checked for being critical before it is hidden. |
| 2026-11-11 | Cover choice and screen selection are Claude's call, reported with reasons. |
| 2026-11-11 | A chapter shows only the screens that prove it; all other approved screens go in one All screens block. |
| 2026-11-11 | Checks are done by hand; helper skills are called only on request or when a check looks wrong. (Superseded 2026-11-14, see the last row.) |
| 2026-11-11 | Media-making helpers are allowed only for other forms, one file at a time, on the owner's yes. |
| 2026-11-11 | The skill does not depend on the CMS or host. |
| 2026-11-14 | The Notion page is the one source of truth for the plan. |
| 2026-11-14 | The digital-twin skill is out of scope for this plan. |
| 2026-11-14 | Focus is adaptive UX plus every function already discussed. Every function has named skills behind it (see "Skill map"). This replaces the 2026-11-11 "by hand only" rule: the skill still carries its own checks, and the mapped skills are used as standard, with the owner's rules winning over anything a skill says. |
| 2026-11-16 | Brief mode is for client work only. `wugweb-strategy` owns the brief for Wugweb's own content; `wugweb-seo` fills its search block. |
| 2026-11-16 | Accounts in scope: the Wugweb company accounts (site blog, LinkedIn page, Behance, Dribbble), the owner's LinkedIn and the owner's Medium. The 5 personal Behance projects are out. |
| 2026-11-16 | A post waits until the page it links to is live. No client is named or tagged without permission. |
| 2026-11-16 | The newsletter is in scope. Sending needs the owner's yes. |
| 2026-11-16 | Media rule readings confirmed: resize and masks are done in CSS only, never as new files; a mask must not hide the part of a screen that proves the claim; a file shown above its natural size is flagged, not banned. |
| 2026-11-16 | Token-check findings are reported only at first; blocking comes later, on a short list. |
| 2026-11-16 | The hero subtitle limit is 90 characters. |
| 2026-11-16 | The og image is 1200 x 630. |
| 2026-11-16 | A loop longer than 5 seconds gets a pause control (a `wugweb-kits` rule). |

Where an older line further down disagrees with this table, the table wins.

# 3. Standing rules

## Standing rules (apply to every step)

The owner's standing rules live in `docs/skills/STANDING-RULES.md`. Each skill reads that file and repeats none of it. Only the rules below belong to wugweb-work.

1. Source: Notion Body Content + the client's R2 folder, owner-authored. Proposals go to `docs/drafts/<slug>-body-v2.md` as current → proposed with reasons. Sanity is written only by the sync (`node scripts/sync-notion-case-studies.mjs` dry run → owner's go → `WRITE=1`, backup first).
2. Weight, missing posters and `moov`-at-end are **reported as facts**; the page defends itself (dimensions, lazy, `preload="none"`, `content-visibility`). If a file does not fit, say so and let the owner decide.
3. Dead links stay in Notion and are listed; the page skips rendering a URL whose manifest status is not 200.
4. Ranges as inequalities in docs. The template emits no dash; the audit flags dashes in body copy for the owner.
5. Tokens only (zero hardcoded colour, spacing, radius, opacity, shadow, blur, z-index, easing); yellow ≤ 10% and `FooterCTA` stays yellow; GSAP via `data-reveal`/`data-scroll`; buttons `--radius-sm`, chips `--radius-full`, cards `--radius-lg`; breakpoints literal; mobile is the PWA (`svh`/`dvh`, full-bleed welcome). No strokes that read as hairlines in the rendered result.
6. JSON-LD only on the canonical host, never FAQPage/HowTo/Review stars.
7. Git: `.md` files are committed, push to `main` auto-deploys Pages, Studio deploy and sync writes are the owner's go.
8. Count deliverables before finishing.

# 4. Standard structure of the skill

## Standard structure of the skill

Folder tree: see "A. The skill" below. The `SKILL.md` follows the standard Agent Skill shape:

```
---
name: wugweb-work
description: This skill should be used when the user asks to "write a case study", "audit a case study", "fix the /work page", "prepare Body Content", "arrange the screens", "make the portfolio or showcase version", or "make the Behance, Dribbble, LinkedIn or deck version" of client work, or mentions a client's screens, moodboard, brand assets or project media. It governs the full cycle for Wugweb client work: audit, brief, media manifest, visual read of every image and video, Body Content proposal, layout, SEO and schema, shipping, and other forms.
version: 0.1.0
---
```

- **Body:** 1,500 to 2,000 words, imperative voice. Purpose, when to use and when not, the source rule and never-do list, the nine modes (one paragraph each), an archetype table, the rules that always apply, and an index of the reference files.
- **Progressive disclosure:** the name and description are always loaded; the body loads when the skill triggers; reference files load only when a mode needs them; scripts run without being read.
- **No duplication:** a rule lives in one file only.

# 5. Writing style and tone

## Writing style and tone

This is the voice for every case study and every other form. It lives in the skill as `references/copy-and-seo.md`. Sources: `brand_guidelines/03_MARKETING_SYSTEM/14_COPY_GUIDELINES.md` (direct, intelligent, specific; outcomes over hype), `02_MESSAGING_FRAMEWORK.md` (one claim, one tension, one proof, one outcome; Problem → Insight → System → Outcome), the owner's rules, and the research rules.

**Tone in one line:** a senior practitioner explaining what was built and why, to a peer. Calm, exact, no selling.

| Rule | How |
|---|---|
| Say what was built | Name the thing: "a member portal and a back office", not "a holistic digital ecosystem". |
| Evidence or nothing | Every claim points to a screen, a number with its source and date, or a named fact. No evidence: cut the claim or mark it "unvalidated". Numbers are never invented. |
| Headings are claims | "Members apply in one guided flow", not "Solutions". 70 characters or fewer. |
| Answer first | The first sentence under a heading answers it. The first third of the page carries the main facts. |
| Short, whole sentences | Fact sentences of 6 to 20 words that make sense on their own. One idea per sentence. |
| Plain words | Use, build, show, help. No superlatives or filler: pivotal, robust, seamless, meticulous, holistic, cutting-edge, leverage, empower, unlock, world-class. |
| Active, with a named doer | "Staff set the workflow per programme", not "workflows were streamlined". "We" is allowed for Wugweb. |
| The client's own words | Use the terms on their screens (NTUC writes "Programmes"). One spelling per name (iCube, not Icube). |
| British English | programme, centralised, colour, organisation. |
| No dashes | No em or en dashes in anything a visitor reads. Ranges are written out ("3 to 5"). |
| Sentence case | Headings, labels and buttons. No Title Case, no ALL CAPS. |
| Credit honestly | Name partners and the team. Say what Wugweb did and did not do. |

**Lengths.** Subtitle 90 characters or fewer. Summary 40 to 60 words. Chapter 30 to 150 words. Point title 2 to 6 words, point text one sentence. Caption 25 words or fewer, saying why the screen matters. Alt text 125 characters or fewer, saying what the screen shows and lets the user do. SEO title 51 characters or fewer. Meta description 140 to 160 characters. Quote 3 lines or fewer, with name, role and organisation.

**Before and after (NTUC).**

| Before | After | Why |
|---|---|---|
| Empowering low-income families through a holistic digital ecosystem. | One portal for members to apply for aid, one back office for NTUC to run every programme. | Says what was built |
| A robust administrative backend was developed to centralize and automate critical operations via sophisticated dashboards. | Staff start from a programme template, then set fields, workflow and eligibility rules. | Named doer, plain words, visible in the screens |
| The transformation delivered measurable improvements. | (cut until a number with a source exists) | No evidence |
| Design Philosophy: Accessibility as a core principle. | Errors give a next step: a blocked application shows a phone number and hours. | A decision plus the screen that shows it |

**Tone by form.** Case study page: full sentences, evidence in every chapter. Card and tile: client, one line of what was built, no adjectives. Deck: one claim per slide, the screen does the talking. LinkedIn: first person plural, one lesson from the project, no hashtag stuffing, same facts as the page. Behance and Dribbble: captions only, flow by flow.

**How it is checked.** The audit lists every banned word, dash, unbacked claim, generic heading and over-length item. The body proposal shows current → proposed for each. Skills behind this: `rampstack-seo:content-and-copy`, `copywriting-kit:copy-proof-check`, `copywriting-kit:copy-edit`, `design:ux-copy`, `brand-voice:brand-voice-enforcement`, `marketing:brand-review`.

# 6. Adaptive UX

## Adaptive UX: what "adaptive" means here

The page is never one fixed composition. It adapts along seven lines, and each line has a rule and a check.

| Adapts to | Rule | Checked by |
|---|---|---|
| Content shape | Layout comes from what the body holds: number of points (1, 2 to 3, 4 to 6, 7 or more), number and shape of media (phone, tall, square, landscape, wide, full-page), quotes, tables, results, timelines. No empty cells, no filler media. | Block plan fixtures for 8 different case studies |
| Content depth | Rich body, thin text-only body, and no body each get a complete page. A chapter with no media is prose; a media-only chapter is allowed. Results, quotes and credits appear only when they exist. | Labelly (thin), Bodyshop (no body) previews |
| Kind of work | Product UI, brand identity, campaign and stats-led, multi-workstream. Screens group by audience, then flow; device mockups are support, never the proof. | Archetype table + NTUC, a client under NDA, Airtel, Animal Writes |
| Volume | 3 screens or 200. A chapter shows only its proof screens; the rest go to one All screens block with sets, thumbnails and a viewer. | NTUC (31), IndusNinja, MusicLinkd skeleton |
| Device | 375, 768, 1200. One column on phone, rails that show the next item, targets of 44 px or more, a file shown above its natural size is flagged, no sideways page scroll. Mobile is the PWA. | Gate at 375 / 767 / 768 / 769 / 1199 / 1200 / 1201 |
| Capability and conditions | Works without JavaScript (all content in server HTML). Reduced motion stops loops and reveals. Videos are muted and load only when near. Heavy pages stay under the 25 MB budget by showing less at first, not by resizing files. | No-JS check, reduced-motion check, byte total per page |
| Client identity | One accent colour per client, taken from their own palette, contrast-checked, used for rules and numerals only. The Wugweb system stays the frame. | Contrast check on every accent |

The same adaptive rules drive the other forms: a card, a tile, a deck slide and a LinkedIn carousel each take the pieces of the body they can hold.

# 7. Skill map

## Skill map: which skills back each function

Every function of `wugweb-work` has named skills behind it. The first one listed leads.

| Function | Skills used |
|---|---|
| Building and testing the skill itself | `anthropic-skills:skill-creator`, `anthropic-skills:skill-development`, `rampstack-seo:skill-creation-walkthrough`, `anthropic-skills:full-output-enforcement` |
| Audit (content, page, links) | `rampstack-seo:seo-content-audit`, `ux-ui-audit`, `searchfit-seo:broken-links`, `searchfit-seo:seo-check`, `seo-skills:seo-images` |
| Brief (claim, keyword, intent) | `searchfit-seo:content-brief`, `rampstack-seo:seo-keyword`, `searchfit-seo:content-strategy`, `searchfit-seo:create-topic`, `anthropic-skills:wugweb-seo`, `marketing:campaign-plan` (multi-workstream and campaign cases) |
| Media (measure, weight, speed) | The skill's own manifest script, `cloudflare:web-perf` |
| Look (reading images, UI, video, design assets) | `design:design-critique`, `ui-ux-pro-max`, `anthropic-skills:ui-system-mapper`, `anthropic-skills:musiclinkd-design-system` (MusicLinkd only), `design:design-system` |
| Body (copy, claims, voice, captions, alt) | `rampstack-seo:content-and-copy`, `searchfit-seo:create-content`, `copywriting-kit:copy-proof-check`, `copywriting-kit:copy-edit`, `copywriting-kit:copy-diagnose`, `design:ux-copy`, `brand-voice:brand-voice-enforcement`, `marketing:brand-review`, `marketing:draft-content`, `analytics-skills:metric-context-and-benchmarks`, `data:validate-data` |
| Layout and adaptive UX | `anthropic-skills:frontend-design`, `anthropic-skills:design-taste-frontend`, `anthropic-skills:system-design`, `anthropic-skills:responsive-token-engine`, `superdesign:superdesign`, `anthropic-skills:ui-system-mapper`, `anthropic-skills:gsap-react` (motion reference) |
| SEO, AEO and schema | `searchfit-seo:generate-schema`, `searchfit-seo:schema-markup`, `searchfit-seo:on-page-seo`, `searchfit-seo:internal-linking`, `rampstack-seo:seo-onpage`, `rampstack-seo:seo-aeo-geo`, `sanity:seo-aeo-best-practices`, `seo-skills:seo-schema`, `seo-skills:seo-geo` |
| Ship (quality gate) | `anthropic-skills:design-qa`, `design:accessibility-review`, `anthropic-skills:web-quality-accessibility`, `anthropic-skills:web-design-guidelines`, `website-design:review-page`, `code-review`, `simplify`, then after deploy `aeotester:audit` and `aeo-brand-scan:scan` |
| CMS side of this site | `sanity:content-modeling-best-practices`, `sanity:sanity-best-practices`, `sanity:content-experimentation-best-practices`, `sanity:typegen` |
| Forms: deck and PDF | `slides`, `anthropic-skills:pptx`, `anthropic-skills:pdf` |
| Forms: LinkedIn, Behance, Dribbble, social | `social-media-skills:linkedin-post-writer`, `carousel-writer`, `before-after-and-transformation`, `social-proof-and-testimonials`, `data-and-original-research`, `platform-specs-and-validation`, `postiz:postiz` (scheduling; every post needs the owner's yes) |
| Forms: stats and charts | `dataviz`, `data:create-viz`, `data:statistical-analysis` |
| Forms: made images (gated per file, owner's yes) | `html-css-to-image:hcti-open-graph-images` (needs sign-in), `banner-design`, `social-media-skills:image-prompt` |

**Rules for using them.** The owner's rules and this plan win over anything a skill suggests (no FAQ schema, no invented numbers, no cropping or re-encoding media files, no sound, no new media without a yes). A skill that is missing or not signed in is skipped and reported, never a blocker. The mapping lives in `references/skill-map.md` so it can change without touching the rest of the skill.

**Gaps where no installed skill fits yet:** stepping through video frame by frame, and comparing a Behance or Dribbble version against the case study. Both are done by the skill's own procedure for now.

## Owner changes, 2026-11-16: media rule and scope

These two changes win over any older line in this plan.

**1. Media rule, replaced.**

| | Before | Now |
|---|---|---|
| Resize | Not allowed | Allowed. Media may be shown at any size as long as the original aspect ratio is kept. |
| Aspect ratio | Never changed | Never changed. No stretching, no squashing. |
| Clipping masks | Not mentioned | Allowed. A mask may shape or frame what is shown (rounded corners, a device shape, a reveal). The file itself is untouched. |
| Cropping the file, re-encoding, uploading, local copies | Not allowed | Still not allowed. Media stays in R2 as the owner put it there. |
| Sound | None | None. |

How this is read in the plan (confirmed by the owner, 2026-11-16): resizing and masks are done on the page (CSS), not by making new files. A mask must not hide the part of a screen that proves the claim. The earlier "never upscale" line becomes a quality check: a file shown larger than its natural size is flagged when it looks soft; it is no longer banned.

**2. Scope, widened.** The skill now also covers blog posts, service pages and site-wide SEO, in addition to client work.

| Added area | Source | What carries over as is | What still has to be written |
|---|---|---|---|
| Blog posts | Notion Blogs (synced by `scripts/sync-notion-blogs.mjs`) | Audit, brief, writing style, SEO and schema, quality gate, the skill map | Blog body standard, cover and inline image rules, internal links, refreshing old posts |
| Service pages | Sanity `service` documents (6 pillars) | Audit, writing style, SEO, quality gate | What a service page must contain, how case studies are linked in as proof |
| Site-wide SEO | The whole site; `wugweb-seo` as the lead helper | Audit and report steps | Keyword and intent map per page, technical checks, reporting rhythm |

Effect on the plan (updated 2026-11-16): blog posts, service pages and site copy are track 2 of this skill; its procedure is still to be written. Site-wide SEO in the table above belongs to `wugweb-seo`. Planning belongs to `wugweb-strategy`. Until track 2 is written, the detailed procedure exists only for client work.

## Final skill list (owner, 2026-11-16)

Nothing is dropped. Every skill in the skill map stays, in three groups. Where two skills disagree, the lead skill wins; where a skill disagrees with the owner's rules, the owner's rules win.

**Core: used on every case study (22)**

| Function | Lead skills |
|---|---|
| Building the skill itself | `skill-creator`, `skill-development` |
| Audit | `rampstack-seo:seo-content-audit`, `ux-ui-audit`, `searchfit-seo:broken-links` |
| Brief | `searchfit-seo:content-brief`, `rampstack-seo:seo-keyword`, `wugweb-seo` |
| Look | `design:design-critique`, `ui-ux-pro-max` |
| Body | `rampstack-seo:content-and-copy`, `copywriting-kit:copy-proof-check`, `copywriting-kit:copy-edit`, `design:ux-copy`, `brand-voice:brand-voice-enforcement` |
| Layout and adaptive UX | `frontend-design`, `design-taste-frontend`, `responsive-token-engine` |
| SEO and schema | `searchfit-seo:generate-schema`, `rampstack-seo:seo-onpage` |
| Ship | `design-qa`, `design:accessibility-review` |

**Situational: only when the case needs it (19)**

| When | Skills |
|---|---|
| MusicLinkd only | `musiclinkd-design-system` |
| Stats-led cases | `analytics-skills:metric-context-and-benchmarks`, `data:validate-data`, `dataviz` |
| Multi-workstream or campaign cases | `marketing:campaign-plan` |
| Exploring a new block or form | `superdesign`, `system-design` |
| Deck or PDF version | `slides`, `pptx`, `pdf` |
| LinkedIn and social versions | `social-media-skills:linkedin-post-writer`, `carousel-writer`, `platform-specs-and-validation`, `postiz` (each post needs the owner's yes) |
| After deploy | `aeotester:audit`, `aeo-brand-scan:scan`, `cloudflare:web-perf` |
| Part 2 code work | `code-review`, `sanity:content-modeling-best-practices` |

**Second opinion: kept, used to cross-check the lead skill (17)**

| Cross-checks | Skills |
|---|---|
| Schema | `searchfit-seo:schema-markup`, `seo-skills:seo-schema` |
| On-page SEO and AI search | `searchfit-seo:on-page-seo`, `seo-skills:seo-geo`, `rampstack-seo:seo-aeo-geo`, `sanity:seo-aeo-best-practices`, `searchfit-seo:seo-check`, `seo-skills:seo-images` |
| Brief and drafting | `searchfit-seo:content-strategy`, `searchfit-seo:create-topic`, `searchfit-seo:create-content`, `marketing:draft-content` |
| Copy and voice | `copywriting-kit:copy-diagnose`, `marketing:brand-review` |
| Accessibility and page review | `web-quality-accessibility`, `web-design-guidelines`, `website-design:review-page` |

The other skills named in the skill map above (for example the social writers for before-and-after and testimonials, the data charting skills, `gsap-react`, the Sanity helpers, `full-output-enforcement`, `skill-creation-walkthrough`) also stay and are used when their function comes up.

**Outside this skill:** `ui-system-mapper` is built into `wugweb-kits` (owner, 2026-11-16). The digital twin is different work. Bright Data and TinyFish were not picked. Media-making helpers run only per file on the owner's yes. SEO is one skill, `wugweb-seo`, with plan, audit and report parts.

**Status of the list:** the Claude app skills and the owner's own skills folder are verified on disk. The plugin skills show as available in the session but have not each been run. Signed-out connectors (Sanity plugin, Cloudflare plugin, Figma, Canva, HTML/CSS to Image, SE Ranking, TinyFish, Website Design) limit the skills that depend on them until the owner signs in.

## Handoff contracts

Every helper returns a proposal or a report. Only `wugweb-work`, after the owner's approval, writes anything.

| Helper | Mode | Goes in | Comes out | May not do |
|---|---|---|---|---|
| `wugweb-seo` | Brief, SEO/Schema, after deploy | Topic, client, audience; later the rendered page URL | Keyword and intent notes for the brief; an issue list for the page; a traffic note after launch | Write case-study copy; add FAQPage, HowTo or llms.txt; change titles in Notion |
| Copy helpers (`content-and-copy`, `copy-proof-check`, `copy-edit`, `ux-copy`) | Body | Draft text plus the owner's evidence | Claims ledger, edit suggestions, caption and alt drafts | Add a fact or number; write to Notion |
| Voice helpers (`brand-voice-enforcement`, `brand-review`) | Body | Draft text, `brand_guidelines/` | List of voice breaks with fixes | Change the meaning; override the writing-style rules |
| Design review (`design-critique`, `ux-ui-audit`, `design-qa`, accessibility skills) | Look, Ship | Asset URLs or the rendered page | Findings with measured values | Change code; store screenshots as files |
| Layout helpers (`frontend-design`, `design-taste-frontend`, `superdesign`, `responsive-token-engine`) | Layout | Block plan, tokens, layout shell | Layout options as proposals | Add hardcoded values; add a block type outside the catalogue |
| `wugweb-kits` (includes ui-system-mapper) | Ship, on request | The `Case*` components and tokens | Findings by rule id | Delete tokens or refactor without the owner's yes |
| Schema helpers (`generate-schema`, `schema-markup`, `seo-schema`) | SEO/Schema | Approved body, page facts | JSON-LD draft | Emit FAQPage, HowTo, Review stars or `author` |
| Sanity helpers | Part 2 only | Schema file | Modelling advice | Deploy the Studio; write documents |
| Forms helpers (slides, pptx, pdf, social writers, `postiz`, dataviz) | Forms | Approved body and media URLs | The other form as a draft | Publish or schedule without the owner's yes; invent facts |
| Media-making helpers (og image, banner, image prompt) | Forms | A request approved per file | One file, proposed first | Run without a yes for that file; place a file in the repo |

# 8. Schemas

## Schemas, in one place

| Schema | What it defines | Where in this file |
|---|---|---|
| Body Content v2 | How a case study is written in Notion: meta lines, chapters, points, media labels, results, quotes | "Body Content v2" |
| Media manifest entry | One record per file: url, source, kind, type, w, h, bytes, shape, flow, audience, dupOf, status | B2 |
| Visual read record | What Claude saw: what, kind, platform, audience, flow, step, state, flags, heroScore, alt, caption | B2b |
| Results line | value, what, source, as of (period and baseline optional) | B1 and B4 |
| Block catalogue | The 23 page blocks the layout can use | C1 and "Layout grammar" |
| JSON-LD graph | WebPage + CreativeWork + BreadcrumbList | "JSON-LD v2" |
| Eval file | skill_name, evals with id, prompt, expected output, files, expectations | D3 |

## Body Content v2 (the contract; full text goes in `references/body-content-standard.md`)

```
## Title line                                  ignored by the page (human label)
**Subtitle:** one line, ≤ 90 chars             hero line
**Client:** Name or [Name](https://…)          meta; link rendered as a link
**Industry:** … **Partner:** … **Disciplines:** … **Team:** … **Timeline:** … **Year:** … **Country:** … **Platform:** … **Special Thanks:** …
**Category:** … **Tags:** a, b, c
**Live:** https://…  **App Store:** …  **Play Store:** …  **Behance:** …  **Dribbble:** …  **Awards:** …
**Accent:** #hex                               optional identity; contrast-checked at render, else ignored
**Results:**                                   optional; or a `### Results` section
- 42% | fewer HR tickets | Internal helpdesk report, Jan to Jun 2026 | as of 2026-07
### Claim heading                              a chapter; any count; generic labels allowed, claims preferred
Layout: rail | split | mosaic | chapter | stats | quote | timeline | gallery     optional hint, directly under the heading
Lead sentence that answers the heading. Paragraphs follow.
*Group label*                                  optional; groups the points below
- **Point title**: text                        or `1.` numbered, or `- **Title**` + indented description
![Screens: Onboarding 1](https://…/01.png)     media anywhere; label = kind[: name][ n]; order preserved
- Video: https://…/clip.mp4                    or ![Video: name](url.mp4); ≤ 15 s = loop, longer = muted click-to-play
> "Quote text."
> Name, Role, Organisation
| Table | rows |
2026-03: dated milestone                       ≥ 3 dated lines become a timeline
## Media                                       v1 compatibility: labelled list routed by label words or `Section:` prefix
## Gallery (site assets)                       v1 compatibility: closing media
```

Everything works with no hints; hints only override. Media kinds decide blocks; counts and shapes decide sizes. Folder-only files (not linked in the body) are grouped by flow and rendered as closing screens, or attached to the chapter whose `Screens: <flow>` label names the same flow.

## Layout grammar (summary; full rules in `references/layout-grammar.md`)

- Hero: brand label (shortTitle → clientRef.name → client), H1 = title, subtitle, meta `<dl>` (keys present only), cover (body Cover → `coverPath` image → none: text hero on the accent surface). `stats` under the hero when results exist (2 ≤ n ≤ 4; the rest in the Results chapter). Summary = the first chapter's lead when it is 40 ≤ words ≤ 60, else none.
- Chapter = head (h2 + lead + paragraphs) then its items in body order. Points: n = 1 prose; 2 ≤ n ≤ 3 columns; 4 ≤ n ≤ 6 grid (3 columns when n ∈ {3, 6}, else 2); n ≥ 7 two-column list; groups become h3 sub-lists. Tiles never carry decorative cards on mobile; surface and rule colour separate them on desktop.
- Media in a chapter: 1 image → `split` when the chapter text ≤ 120 words and the image is not a phone screen, else `figure` (contained, captioned); the single widest landscape ≥ 2400 px on the page may be the one full-bleed signature `figure`. 2 images of the same shape → `pair` 50:50 uncropped (Styles always a pair). 3 ≤ n ≤ 8 phone/tall → `rail` (per flow; captions from labels; counter; buttons; `proximity` snap; peek 20%). n ≥ 9 phone → rails per flow of ≤ 8 each, remainder → `wall` with lightbox. 2 ≤ n ≤ 6 landscape/mixed → `mosaic` (spans from shapes, cell count = n, source order kept, UI never cropped). n ≥ 7 landscape → `wall`, except that a set whose manifest bytes exceed the page budget becomes a `rail` (lazy, one item at a time) instead of a wall of originals. `scrollshot` → fixed-height figure showing the top, "View full page" opens the lightbox. Video ≤ 15 s → `loop` (muted, playsinline, poster, `data-src`, `aria-hidden`); longer → `video`, muted, click-to-play with a play/pause button only, `preload="none"`, poster, never `aria-hidden`. GIF = image. Entries with `dupOf` or `status ≠ 200` never render.
- Quotes → `quote` (`figure > blockquote + figcaption`) after the chapter text; tables → `table`; ≥ 3 dated lines → `timeline`.
- Rhythm: consecutive chapters never repeat the same media family when another fits; `split` alternates sides; ≤ 1 full-bleed per chapter; ≤ 2 zigzags in a row.
- Closing: `results` chapter when results exist and no chapter is named Results; `screens` (the All screens block: every approved screen not shown in a chapter); `credits` (team, partner, special thanks, services, year/timeline, country, platform); `presence` (Live, stores, Behance, Dribbble, awards); `related` (3 from Notion; fallback `relatedWorkFor` by pillar then industry) and `next` (next by `publishedAt` in the same pillar, with brand + title + industry). The global `FooterCTA` stays the page's one yellow note; no second CTA.
- Tiers: x < 768 single column, media edge to edge within the gutter, rails horizontal, points stacked; 768 ≤ x < 1200 two columns for points/mosaics/pairs; x ≥ 1200 full composition; content max 1200; UI media never wider than 1200; photography may full-bleed (hero and signature figure only). Micro-adjustments only at x < 480. Literal `min-width` values; `767.98px`/`1199.98px` when going down.
- Identity: `--case-accent` from `Accent:` (validated ≥ 3:1 against the page surface, text use only at ≥ 4.5:1), else `--color-accent-primary`; used for rules, stat numerals, group labels; never surfaces above 10%.
- Motion: `data-reveal` on chapter heads and figures (`data-reveal-delay` for staggers); rails never auto-advance; no parallax on UI screens; reduced motion stops loops.
- Accessibility: h1 → h2 (chapters) → h3 (groups/points); alt = owner-edited `asset.alt` via `altFor()` when it exists, else "{brand}: {label}" when the label is descriptive, else "{brand} {kind} {n of N}", ≤ 125 chars; captions from labels; rails per W3C; AA contrast on client colours; focus visible; `scroll-margin-top` on chapters.
- Performance: width/height on every `<img>` from the manifest; hero `fetchpriority="high"` never lazy; everything else `loading="lazy" decoding="async"`; `content-visibility: auto` + `contain-intrinsic-size` only on media containers without `data-reveal`; videos `preload="none"` + poster + IO start; the page never requests a URL whose manifest status ≠ 200 or that is a `dupOf`; rendered bytes per page reported, warn > 25 MB.

## JSON-LD v2 (`references/schema-jsonld.md`)

One `@graph` via `JsonLd.astro`: `WebPage` (`@id` = URL, `name`, `description`, `isPartOf` → `#website`, `primaryImageOfPage` → cover, `breadcrumb`), `CreativeWork` (`@id` = URL#work, `headline`, `name`, `abstract` = summary, `creator` and `publisher` → `#organization`, `datePublished` = `publishedAt`, `dateModified` = `_updatedAt`, `inLanguage` = `language`, `image` = cover + any 1:1/4:3/16:9 images already in the manifest, `about` → client `Organization` node {`name`, `url` = website, `sameAs`}, `genre` = industry, `keywords` = tags, `mentions` = partners/platforms, `video` = `VideoObject` per labelled video with poster {`name`, `description`, `thumbnailUrl`, `contentUrl`, `uploadDate` = R2 Last-Modified from the manifest (else `publishedAt`), `duration`}), `BreadcrumbList` (kept). URLs come from the canonical origin BaseLayout uses. Testimonials: `blockquote` markup, optional `Quotation` node, never Review/AggregateRating. No `author`, no FAQPage, no HowTo. `og:type` stays `website` (BaseLayout) unless a one-line prop is trivial.

# 9. Part 1: the skill

The standard, the procedure and two read-only scripts. Portable; cannot break the site. Built and tested first. Its evals are D3 under Part 2's checks.

### A. The skill folder: `.claude/skills/wugweb-work/`

```
.claude/skills/wugweb-work/
├── SKILL.md                         1,500 ≤ words ≤ 2,000, imperative, third-person description with trigger phrases
├── references/
│   ├── body-content-standard.md     the editorial contract (v2 grammar, examples per archetype, v1 compatibility)
│   ├── layout-grammar.md            block catalogue, resolver rules, tiers, mobile, identity, motion
│   ├── copy-and-seo.md              brief template (ski-ramp), voice, title/meta/slug/H1/H2, entities, metrics rule, en-GB
│   ├── schema-jsonld.md             the @graph spec and what never to emit
│   ├── media-standard.md            R2 folder rules, manifest fields, dedup, shapes, flows, posters, budgets, alt/caption, permissions
│   ├── visual-read.md               how to look at images, UI, video of UI and design assets; the read schema; what each kind needs; examples
│   ├── design-principles.md         elements and principles of design + UX laws, used two ways (below)
│   ├── forms.md                     index; card, showcase tile, logo band
│   ├── forms/                       fact-pack, linkedin-post, linkedin-carousel, behance, dribbble, deck, pdf, charts, og-image, presence-compare, publish-approval
│   ├── archetypes.md                observed + designed-for archetypes with example slugs and block recipes
│   ├── skill-map.md                 which installed skill or plugin each mode calls, what it may and may not do here, what needs sign-in
│   ├── qa-checklist.md              publish gate: content, technical, a11y, perf, housekeeping; breakpoints 375 / 767 / 768 / 769 / 1199 / 1200 / 1201
│   └── ops-cycle.md                 sync → preview → approval → commit → deploy; pane caveats; never-do list
├── scripts/
│   ├── case-audit.mjs               read-only: parse one body (Sanity slug or .md), print sections/points/media kinds/shapes/archetype/block plan/QA flags/dashes/missing pieces
│   └── check-case-page.mjs          fetch a rendered page (local or live, optional Host header) and run the gate (below)
├── examples/
│   ├── body-ntuc-u-care.md          Body Content v2 proposal derived from the existing NTUC content (web platform archetype)
│   ├── body-animal-writes.md        skeleton for a stats-led multi-workstream case (owner-input markers, no invented numbers)
│   └── body-musiclinkd.md           skeleton for 200+ screens grouped by flows
└── evals/
    └── evals.json                   skill-creator test prompts + assertions
```

SKILL.md body (1,500 ≤ words ≤ 2,000): purpose (2 sentences) → when to use / when not (site-wide SEO → `wugweb-seo`; planning → `wugweb-strategy`) → the source rule and the never-do list → the cycle as modes, one paragraph each: **Audit → Brief → Media → Look (visual read) → Body → Layout → SEO/Schema → Ship → Forms** (commands, gates and output formats live in `references/ops-cycle.md`, not in the body) → archetype quick table → rules that always apply (≤ 15 bullets, each with its reason) → reference index. Frontmatter: `name: wugweb-work` (≤ 64 chars), `description` ≤ 1,024 chars, third person, pushy, trigger phrases only: case study, portfolio, /work, client work, showcase, Body Content, screens/moodboard/brand assets for a client, Behance/Dribbble/LinkedIn version, deck of a project, blog post, service page, site or landing copy; the "do not trigger" list (site-wide SEO, content planning) lives in the body's "when not to use" section.

Rules the references encode (from the research digest, reconciled with owner rules): narrative (hero = client + one project-specific line; answer-first summary 40 ≤ words ≤ 60; 2 ≤ stats ≤ 4 near the top only when verified; claim headings; 30 ≤ words ≤ 150 per chapter; closing = outcome → quote → credits → next → one CTA); copy (full-sentence facts of 6 ≤ words ≤ 20; metric = value + what + period + baseline/benchmark + source + as-of; no superlatives, no invented numbers, "unvalidated" is a complete answer; en-GB; quotes ≤ 3 lines with name, role, organisation); media (never crop UI, `contain`/native ratio; frameless screens; screen-count recipes; brand identity order idea → mark → type → colour swatches as HTML → system → applications → motion; loops ≤ 15 s muted with poster; a long video is muted and click-to-play, never with sound); rhythm (rotate families, ≤ 2 zigzags in a row, full-bleed only hero + one signature moment per chapter + video); mobile (375 first, rails peek, ≥ 44 px targets, `svh`, no page-level horizontal overflow); SEO (title ≤ 51 chars so " | Wugweb" fits, meta 140 ≤ chars ≤ 160, H1 = client + what was built, everything in server HTML); a11y (alt ≤ 125 chars saying what the screen shows and lets the user do; `figure`/`figcaption`; W3C rail pattern; AA contrast on client colours); perf (hero `fetchpriority="high"`; width/height everywhere; `content-visibility`; `preload="none"`).

`design-principles.md` (new, both directions):
- Vocabulary. Elements: point, line, shape, form, space (positive/negative), colour (hue, value, saturation, temperature), type (family, weight, scale, measure, leading), texture, imagery, scale, motion. Principles: hierarchy, contrast, emphasis/focal point, balance (symmetric, asymmetric, radial), alignment and grid, proximity, repetition and rhythm, pattern, movement and flow, white space, proportion, unity and variety, figure-ground, Gestalt (similarity, continuity, closure, common region). UX laws and heuristics: Nielsen's 10, Fitts, Hick, Jakob, Miller, Tesler, Doherty, aesthetic-usability, Von Restorff, Zeigarnik, serial position, peak-end; accessibility (WCAG 2.2 AA) and affordance/feedback.
- Reading the client's work: the visual read names which elements carry the brand and which principles the UI applies, with the screen that proves it ("one primary action per step: Hick's law, screens 3 to 5 of onboarding"). This turns the old "Design Philosophy" filler into evidence: a principle, the decision, the screen. Only claims visible in the assets; never a law name used as decoration.
- Composing the page: every block and the resolver's rhythm rules map to a principle (one focal point per chapter, hierarchy h1 → h2 → lead → points, proximity of caption to media, contrast for stats, repetition of the client accent as the unifying element, white space between chapters ≥ the space inside them, alignment to the 4/8/12-column grid). The QA gate adds a design critique pass (design:design-critique) scored on hierarchy, focal point, rhythm, contrast, consistency and legibility at 375 and 1200.

Conflicts settled in the skill: copy is drafted only as proposals for approval (owner rule beats "never author"); headings are claims, question form where natural, generic labels only in the chapter nav; no FAQPage/HowTo/llms.txt levers; no keyword counts; page-level horizontal overflow banned, labelled rails allowed; sentence case, "we" allowed; dashes banned; schema `creator` + `publisher` = Wugweb Organization (no `author`).

**Installed skills and plugins the cycle calls** (owner picks 2026-11-11; full table in `references/skill-map.md`). They are helpers. Since 2026-11-14 the mapped skills are used as standard (see "Skill map"); the skill still carries its own checks. The standing rules win over anything a helper says (a helper that suggests FAQPage schema, keyword counts, llms.txt, cropping or new media is overridden). A helper that is missing or not signed in is skipped and reported, never a blocker.

- Look + design QA (picked):
  - Look mode: `anthropic-skills:musiclinkd-design-system` (MusicLinkd only: its taxonomy, `screen.json` and `flows-map.json` order the 205 screens by flow and state), `ui-ux-pro-max` (UX guideline lookup behind the principle vocabulary).
  - Layout and build: `anthropic-skills:ui-system-mapper` (every `Case*` value resolves to a token), with the already listed `frontend-design`, `design-taste-frontend`, `system-design`, `full-output-enforcement`.
  - Ship gate, on the rendered page at 375 and 1200: `ux-ui-audit` (measured contrast, tap targets, focus rings, accessible names, Hick and Fitts indices, Gestalt proximity and similarity; its numbers go in the gate table), `anthropic-skills:design-qa` (token and hardcoded-value lint, axe, contrast; no stored screenshot baselines, since those are local media files), `design:accessibility-review` + `anthropic-skills:web-quality-accessibility` (WCAG 2.2 AA), `anthropic-skills:web-design-guidelines`, `website-design:review-page`, `design:design-critique`.
- Copy, claims, SEO/AEO (picked):
  - Brief and Body: `copywriting-kit:copy-proof-check` (claims ledger: every number and claim in a proposal is checked against the owner's evidence; unbacked becomes "unvalidated" or is cut), `copywriting-kit:copy-diagnose` and `copy-edit`, `design:ux-copy` (alt text, captions), `marketing:draft-content` (case-study format as a cross-check), `brand-voice:brand-voice-enforcement` + `marketing:brand-review` (against `brand_guidelines/`), `analytics-skills:metric-context-and-benchmarks` (how to frame baseline and benchmark on a Results line; it never supplies a number).
  - SEO and Schema: `rampstack-seo:seo-onpage`, `seo-aeo-geo`; `searchfit-seo:on-page-seo`, `internal-linking` (related and next), `broken-links` (dead links listed and kept); `sanity:seo-aeo-best-practices`; `seo-skills:seo-schema`, `seo-images`, `seo-geo`; `aeotester:audit` after deploy. Plus the originally listed rampstack, searchfit, marketing and sanity skills and `anthropic-skills:wugweb-seo`.
- Media-making helpers and Brand.dev (owner: add all, gated): `html-css-to-image:hcti-open-graph-images` (project og:image 1200×630; needs sign-in), `banner-design`, the social-media-skills image and video skills (`image-prompt`, `nano-banana`, `ideogram`, `flux`, `veo-3` and the like), Brand.dev (client logo and colours). Gate, per file: used only in Forms (og:image, social cards, Behance/Dribbble covers), never as evidence inside a case study (brand guideline: real evidence only); each file is proposed first (what, size, where it would live), made only after the owner's yes for that file, kept out of the repo, and reaches the site only when the owner puts it in R2. Brand.dev values arrive as current → proposed, never written without approval.
- Second round (picked): `superdesign:superdesign` (Layout mode: explore options before a new block or form is built; output is a proposal and the tokens-only rule still applies), `postiz:postiz` (Forms: schedule the LinkedIn and social versions that `forms.md` produces; every post needs the owner's yes before it is scheduled, nothing is ever sent on its own), `aeo-brand-scan:scan` (after deploy: how Wugweb and the client work show up in AI answers; report only), `data:validate-data`, `data:statistical-analysis`, `data:create-viz` (stats-led cases such as Animal Writes: check the owner's numbers before they become Results lines; charts render as HTML/SVG on the page, no image files).
- Since 2026-11-14 the Sanity, Cloudflare, code-review and social-writing skills are also in the skill map. Bright Data and TinyFish stay out.

**Platform independence** (owner question 2026-11-11: yes, the skill does not depend on the CMS or host). SKILL.md and every reference except one are written against a neutral contract: source (one Body Content document + one media folder) → parsed body → media manifest → block plan → rendered page and other forms. The standard, layout grammar, visual read, design principles, copy, SEO, schema, forms and QA never name a vendor. This site's wiring (Notion → Sanity → Astro on Cloudflare Pages, media in R2, the sync and manifest scripts, deploy steps) lives only in `references/ops-cycle.md` under "This site's wiring" and in the scripts. A move to another CMS, store or host means rewriting that one section and the sync script; nothing else in the skill changes. `case-audit.mjs` therefore accepts a plain `.md` file as well as a Sanity slug, and `check-case-page.mjs` takes any URL.

# 10. Part 2: this site's build

The parser, media manifest, sync, components and template for `wugweb_site`. Starts after Part 1 exists.

### B. Content pipeline

B1. `src/lib/case-body.ts` v2 parser (backward compatible with every v1 body):
- Keep the `## Sanity site copy` branch (long copy wins over the short `###` copy; 19 bodies depend on it, `case-body.ts:121-123,145-146`) and the "The long-form copy as published" filter.
- Trim every line before the `##`/`###`/list matching (`sections()` at `:102` and the h2 split at `:116` match untrimmed lines; this is what collapses the 15 tab-indented thin docs). Merge `- **Title**` + an indented description line into one point without swallowing a following indented `- sub` item. Strip `#` runs from point titles. Parse markdown links in meta values to `{text, href}`. Run milestone, table and quote detection before the titled-point heuristic at `:87` (otherwise `2026-03: milestone` becomes a tile title).
- Keep a section when it has media, quotes or tables, not only `lead || paras || tiles` (`:109`), so a media-only `### Screens` chapter survives.
- Grammar v2 (see "Body Content v2" below): media lines anywhere inside a `###` section attach to that section in order; `Layout:` hint line; `Accent:` meta; presence meta keys (Live, App Store, Play Store, Behance, Dribbble, Awards); `Results:` meta block or `### Results` section with `value | what | source | as of` lines (2-part `value | what` also accepted); `> quote` + `> Name, Role, Organisation`; markdown tables; dated milestone lines; `*Group*` labels (kept). `META_KEYS` (`:34`) stays the allowlist for the hero `<dl>`; Live/App Store/Play Store/Behance/Dribbble/Awards go to `links`, `Accent` to `accent`, `Results` to `results`, `Layout` to the section hint; none of them reach the `<dl>`.
- Media kinds from labels: cover, hero, screen/screens/flow/mobile, web, dashboard, styles/style board/moodboard, logo/mark, type, colour, pattern, application, print, social, photo, diagram, chart, before, after, video, loop, press, award, plus the v1 slot labels (challenge, solution, design philosophy/dp, conclusion/filler, about, thumbnail). Unknown label → figure with the label as caption.
- Routing: in-section media stays in its section; `## Media` items route by label words (v1) or `Section:` prefix; `## Gallery` → closing. Borrowed-folder filter stays, but "own folder" comes from the manifest (rule below), not the majority guess.
- Output types extended: `Section{…, layoutHint?, quotes[], tables[], milestones[]}`, `CaseBody{…, results[], links{}, accent?}`. Erasable TypeScript only (no enums, namespaces, parameter properties); relative imports carry the `.ts` extension; never import `./sanity`.
- `src/lib/case-body.test.ts` (`node --test`, Node 24 type stripping, pattern of `redirects.test.ts`) with fixtures cut from real bodies: rich with site copy (Cartier: asserts the long copy wins), thin tab-indented (Labelly), two-line items (SBS Transit), `####` (Aditya Birla), trailing colon (Airtel Xsafe), raw link meta (Valyu), v2 sample with in-section media, quote, table, milestones, results. Add `"test:case"` to `package.json` like `test:forms`.

B2. `scripts/lib/image-dims.mjs` + `scripts/lib/media-manifest.mjs` (no new dependencies; `sharp` 0.34.5 is already in `node_modules` transitively and `sync-notion-blogs.mjs:21,117` already imports it, so it is the fallback):
- Dimensions from a `Range: bytes=0-65535` read (PNG/JPEG/WebP/GIF headers). JPEG: scan markers sequentially and extend the range on demand when SOF sits past 64 KB (large EXIF/ICC/XMP); fall back to `sharp(buffer).metadata()`. mp4: read the top-level atoms from the head, take `mdat` offset + size (handle `size == 1` largesize and `size == 0`), range-read from the end of `mdat` to EOF for `moov`; `mvhd` v1 has 64-bit fields; apply the `tkhd` rotation matrix (swap w/h for 90/270); record `moovAtEnd`. HEAD gives content-length, ETag, Last-Modified (used as `VideoObject.uploadDate`), status. Cache in `scripts/data/media-manifest-cache.json` keyed by URL + ETag; add it to `.gitignore` (it churns every run; `case-study-media-map.json` stays tracked).
- Own folder rule: folder of `coverPath` → folder of `thumbnailPath` → registry folder named after the slug → majority of body images; cross-check the winner against slug/shortTitle tokens and, on disagreement, prefer the registry folder named after the slug; print the decision per doc. Fixes Gratify and claims the 7 unclaimed folders.
- Manifest entry: `{url, source: 'body'|'folder', label, kind, section, order, type: 'image'|'video'|'gif', w, h, bytes, duration?, moovAtEnd?, poster?: url|null, status, shape: 'phone'|'tall'|'square'|'landscape'|'wide'|'scrollshot', flow?: string, dupOf?: url, suspect?: reason}`.
- Shape: by h/w (≥ 1.75 phone, 1.2 ≤ r < 1.75 tall, 0.85 ≤ r < 1.2 square, 0.5 ≤ r < 0.85 landscape, < 0.5 wide); `scrollshot` when w ≥ 1280 and h/w ≥ 1.75.
- Flow grouping for folder files: runs of numeric prefixes / `Group NNNNN` sequences / shared stem → `flow` name from the stem (humanised), else "Screens".
- Dedup: same bytes, or same w×h with a name pair like `Style1`/`styles-image-1`, `Cover`/`cover-image-*` → `dupOf`. Suspect: filename containing another client's brand (Airtel inside indusninja), stock-style numeric names flagged as "stock?" (never dropped).
- Reports: dead links, suspects, duplicates, images > 4 MB, videos > 10 MB, total rendered bytes per page (warn > 25 MB), `moovAtEnd`, missing posters, per case study.
- Every array entry gets a deterministic `_key` (sha1 of the URL, or of `pageId + ref`) so the Studio never shows "Missing keys" and re-runs do not re-patch unchanged docs.

B2b. **Visual read: Claude looks at every asset** (the step the first plan lacked; measurements alone cannot tell a login screen from a moodboard).
- How it sees, without local copies (media rule): images are opened by their R2 URL in the browser pane and read from a screenshot (zoom for detail); videos are opened in the pane, `currentTime` stepped by script and a screenshot taken per step (≤ 15 s: every 1 s; longer: every 5 s, ≤ 24 frames), plus first and last frame. Text and colour facts that need pixels (dominant palette, contrast of embedded text) are computed in memory with `sharp` from a ranged fetch, never written to disk. Case studies run in parallel subagents, one per case study, each returning JSON only.
- Per asset it records (`scripts/data/media-reads/<slug>.json`, committed, keyed by URL + ETag so it is read once): `what` (one sentence: "Onboarding step 2: phone number entry with OTP field"), `kind` (corrects the label: mobile screen, web page, dashboard, scrollshot, component sheet, style tile, moodboard, logo/mark, type specimen, colour palette, pattern, illustration, photo, device mockup, print, social post, event/environment, diagram, chart, motion/prototype clip, before, after), `platform` (iOS, Android, web desktop, web mobile, tablet, print, social), `flow` + `step` (screens ordered by what they show, not by file name), `state` (empty, filled, error, success, loading, modal), `framed` (device mockup or frameless), `textHeavy`, `pii` (real names, numbers, faces: flag for redaction decision, never auto-hidden), `brand` (colours as hex, type families recognised, logo present, which brand: catches the "Airtel inside IndusNinja" files by looking, not by name), `quality` (sharp, soft, upscaled, stock, placeholder or lorem text, watermark, wrong client), `nearDupOf` (visual duplicates the byte/size check missed: Cover.jpg, Style1, re-exports), `heroScore` 0 ≤ s ≤ 5 (project-specific, legible small, not a generic laptop: the brand guideline), `alt` (≤ 125 chars: what it shows and lets the user do), `caption` (≤ 25 words: why it matters), `chapterFit` (which section it proves). Videos add: `demonstrates` (interaction, transition, prototype walk-through, brand film, event), `loopable`, `posterAt` (best second; rendered as `src="…mp4#t=<s>"` with `preload="metadata"` when no poster file exists, so no new file is made), `audio` (reported only; nothing on the page plays sound).
- What uses it: the resolver (kind and flow override labels; order inside rails = `step`; hero = highest `heroScore`; `nearDupOf` never renders); the body proposal (captions, alt, and which screens prove which chapter); the identity proposal (`Accent:` from the client's own palette, validated for contrast); the audit (wrong-brand, stock, PII, placeholder findings listed for the owner, nothing hidden or deleted without a decision).
- Approval path: reads are derived data and may be committed; alt and captions are content, so they are proposed (current → proposed) and only after approval go to Notion labels (captions) and to Sanity `asset.alt` where empty (`setIfMissing`, backup first).

B3. `scripts/sync-notion-case-studies.mjs` v2:
- Keep every existing guarantee (dry run, backup, never Notion, never delete, empty never clears, canonical guard).
- Store each row's Notion `pageId` (today thrown away at `:82-91`) and build `pageId → sanityId` in memory; Related Posts resolve through the blog data source's Slug like `sync-notion-blogs.mjs:199-206` (`slugOf`, `bySlug`); exclude self and unmatched.
- Add: `mediaManifest` (replaces `extraMedia` writes; `extraMedia` left as is), `results[]` from Notion Results lines ("metric | label", or the 4-part form) written as the declared array (replaces the 5 string values with arrays of the same content; Gratify's keyed array is kept when equal), `relatedCaseStudies` from the Notion relation, `services`: Notion Services rows are almost certainly sub-services, so match them to `taxonomy` docs with `vocabulary == "sub-service"` by name/slug, derive the pillar (Notion pillar relation or a small map) and write pillar refs to `services[]` (`reference → service`, 6 docs); list unmapped names; confirm in the first dry run. Also `relatedPosts`, `year` (number), `timeline` (string; coerce date ranges), `country`, `platform`, `projectType`, `engagementType`, `specialThanks`, `team` (string[]; coerce), and from Body Content meta: `links` (Live, App Store, Play Store, Behance, Dribbble, Awards) and `accent`. No `lastUpdated`: the owner said Last Updated is not needed (`pending.md:56`); `dateModified` uses Sanity `_updatedAt` like `sitemap.xml.ts`.
- Extend the doc projection (`:95`), `FIELDS` (`:137`), the `before` snapshot (`:165`) and the compare (`:157-158`) to the new fields; compare arrays canonically (reuse the `strip/canon` pattern from `sync-notion-blogs.mjs:137-140`), never by string equality. Commit in chunks of 10 docs (the manifests add ~1 MB to the transaction); print payload size in the dry run. Backup name `backups/caseStudy-v2-before-<ts>.json` (the `backups/` folder is tracked; the file is committed with the sync commit).
- Print a per-case-study media report (B2) in the dry run.
- Verify `NOTION_TOKEN` first; on 401 stop with "owner: new token needed".

B4. `sanity/schemaTypes/caseStudy.ts`: declare `mediaManifest` (array of objects, read-only, `hidden: true` like `neonSynced`, or a collapsed fieldset), declare `extraMedia` (hidden, read-only, legacy), extend `results` items with optional `source`, `asOf`, `period`, `baseline` (nothing removed), declare the fields the page reads that already hold data (`year`, `country`, `platform`, `projectType`, `engagementType`, `specialThanks`, `links`, `accent`). No field is removed. Studio deploy is the owner's step.

B5. `src/lib/queries.ts`: `caseStudyBySlugQuery` selects the new fields plus `language`, `clientRef->{name, logoPath, website, "industry": industry->name}`, `industryRef->{name, "slug": slug.current}`, `services[]->{title, "slug": slug.current}`, `relatedCaseStudies[]->{title, shortTitle, "slug": slug.current, coverPath, thumbnailPath, industry}`; `caseStudiesListQuery` adds `&& noIndex != true` (it feeds `/`, `/work`, `/footer/sitemap`, `/services`, `/services/[slug]`, so the 7 stubs disappear everywhere at once) and `shortTitle` to the projection for `related`/`next`.

### C. Page system

C1. `src/lib/case-layout.ts`: pure function `resolveLayout(body, manifest, doc) → Block[]`. Deterministic, erasable TS, no Sanity import, unit-tested with the eight preview slugs as fixtures (parsed body + manifest in, block plan out, checked in as JSON under `src/lib/__fixtures__/case-layout/`). Skips manifest entries with `status ≠ 200` or `dupOf`. Block types: `hero`, `summary`, `stats`, `chapter` (head), `points`, `figure`, `split`, `pair`, `rail`, `mosaic`, `wall`, `scrollshot`, `loop`, `video`, `quote`, `table`, `timeline`, `results`, `screens` (the closing All screens block: set chips, thumbnail grid and viewer, grouped by audience then flow), `credits`, `presence`, `related`, `next`. Rules in "Layout grammar" below.

C2. `src/components/work/` one Astro component per block (`CaseHero.astro`, `CaseChapter.astro`, `CasePoints.astro`, `CaseFigure.astro`, `CaseSplit.astro`, `CasePair.astro`, `CaseRail.astro`, `CaseMosaic.astro`, `CaseWall.astro`, `CaseLoop.astro`, `CaseVideo.astro`, `CaseQuote.astro`, `CaseStats.astro`, `CaseTable.astro`, `CaseTimeline.astro`, `CaseCredits.astro`, `CasePresence.astro`, `CaseRelated.astro`) plus `CaseBlocks.astro` (the switch). Each owns its CSS (tokens only; every selector `.case-*`). Tiles are separated by `--color-border-subtle` or a surface step, never `--line` + `--stroke-thin` (that is the banned hairline). `--case-accent` is content: set through a `style` attribute from the validated `accent` value, never a hex in CSS. Stories for the media blocks (rail, mosaic, pair, figure, stats) fed from the checked-in block-plan fixtures (stories cannot read Sanity), with the `RevealDecorator` for blocks carrying `data-reveal`.

C3. `src/pages/work/[slug].astro` becomes thin: fetch → parse → resolve → `<CaseBlocks>`. Markup: one `<section class="wrap case-page" id="case-study" aria-label="{brand} case study">` holding `<article class="case-chapter" id="{chapter-slug}">` per chapter with its h2 (articles, not nested labelled sections: the industries page already rejected a dozen region landmarks in `0ffbb59e`; nested elements escape the global padding rule and the scroll-flow script either way). Chapter ids deduped and never colliding with `work-cover`/`case-study`; `scroll-margin-top: var(--header-height)` set locally (the global rule reaches top-level sections only). Full-bleed (hero cover and the one signature figure only) uses `margin-inline: calc(50% - 50vw)` with `overflow-x: clip` on the outer section, because `.wrap` carves the content box with `padding-inline: max(gutter, (100% - 1200px)/2)` (`global.css:1139-1148`) and `-1 * var(--shell-gutter)` cannot escape it at ≥ 1200. Hero keeps the current `<dl class="work-meta">` (allowlisted keys only, links rendered). Alt text goes through `altFor(altMap, url, generatedAlt)` so an owner-edited `asset.alt` always wins. JSON-LD v2 (below) takes the canonical origin from the same source as BaseLayout (no hardcoded `https://www.wugweb.com`). No-body docs render hero (title, brand, `seoDescription` only: their `about` and `summary` hold NTUC's text) + related, and stay `noIndex`. The legacy fallback markup and its CSS are removed from this file (content stays in Sanity). The `title` prop loses the em dash (it reaches `<main aria-label>`, an a11y fix). `/work` and the four other list consumers hide `noIndex` docs through the query (B5).

C4. Client logic lives in `src/lib/case-rail.ts` and `src/lib/case-lightbox.ts` (TS allowed, testable); each component `<script>` is plain JS that imports and calls `init…()` (the repo rule: Astro strips TS in component scripts, Storybook does not). Rail: buttons + counter + keyboard per the W3C pattern, no auto-advance. Lightbox: a `<dialog>` opened with `showModal()` (Esc and focus trap are native), swipe/buttons, native pinch-zoom; back-button close via `pushState`/`popstate` is optional. `data-reveal` on chapter heads and figures; `lazy-video.ts` reused for loops (poster when the manifest has one; else a tokenised surface). `content-visibility: auto` only on media containers that carry no `data-reveal` and contain none (ScrollTrigger positions from layout at refresh; a skipped subtree has no layout and its `once` reveals fire off-screen); never on chapters.

C5. `scripts/check-case-css.mjs` chained in `prebuild` (`node scripts/check-sector-css.mjs && node scripts/check-case-css.mjs`): `.case-*` selectors may live only in `src/components/work/*.astro`.

### D. QA and evals

D1. `check-case-page.mjs` gate (used locally on `http://localhost:4321/work/<slug>` for everything except JSON-LD, and on `npm run preview` = `wrangler pages dev ./dist` on port 8788 with `Host: www.wugweb.com` for JSON-LD, since `astro dev` rejects unknown hosts; on `wugweb.pages.dev` JSON-LD is reported as n/a by design): exactly one h1; heading levels never skip; every `<section>` has an id and an accessible name; every chapter `<article>` has a unique id and an h2; every `<img>` has alt, width, height; no `—` or `–` in text nodes; no page-level horizontal overflow; rails have `role="region"` + `aria-roledescription="carousel"` + buttons; loops are `muted playsinline aria-hidden` with `data-src`; long videos are muted, with a play/pause button only, and are not `aria-hidden`; every media URL returns 200 (HEAD); total rendered media bytes ≤ 25 MB (warn above); `<title>` ≤ 60; meta description 140 ≤ n ≤ 160; canonical self; JSON-LD has `WebPage` + `CreativeWork` + `BreadcrumbList` (canonical host only). Output: pass/fail table, `[passed]/[applicable]`.

D2. Unit tests: `case-body.test.ts`, `case-layout.test.ts`, `media-manifest.test.mjs` (header parsers on tiny fixture buffers), run through `npm run test:case`.

D3. Skill evals (skill-creator loop, workspace `.claude/skill-workspaces/wugweb-work/`, added to `.gitignore` in the skill commit; `evals/evals.json` in the skill-creator schema `{skill_name, evals:[{id, prompt, expected_output, files, expectations[]}]}` with the three `examples/body-*.md` as `files` where useful; viewer via `generate_review.py --static` sent with SendUserFile): 4 prompts, each run with and without the skill, graded, feedback → skill v1.1 → rerun.
1. Cartier: from its current Body Content, produce the v2 body proposal (current → proposed) and the block plan.
2. Animal Writes: from the Notion pages (hub, Growth, Campaign Content Standard), write the Body Content v2 skeleton with owner-input markers, metrics in the full form, no invented numbers.
3. IndusNinja: 22 screens + its sections → block plan JSON + alt and captions for every screen, grouped by flow.
4. Labelly (thin): audit, list what is missing and the exact questions for the owner.
5. Visual read: given 12 IndusNinja folder files (the 6 "Airtel Xsafe" PNGs among them) and one 10 s loop, return the read JSON. Assertions: the Airtel files are flagged wrong-client by look; screens are ordered by `step`; every item has `what`, `kind`, `alt`, `caption`; the video has `demonstrates` and `posterAt`; at least one principle claim cites a specific screen.
Assertions (objective): no em/en dashes; every metric has value + what + period + source or is marked unvalidated; H2s are not generic labels and ≤ 70 chars; every media item has alt ≤ 125 chars and a caption; rails ≤ 8 per flow; chapters 30 ≤ words ≤ 160; no placeholders (`TBD`, `[INSERT`, `lorem`); title ≤ 51 chars; meta 140 ≤ n ≤ 160; block types ∈ catalogue; proposals never claim to have written Notion.

D4. Previews in the pane (dev server via `preview_start`, port 4321) at 375 / 768 / 1200 and the gate at 767 / 769 / 1199 / 1201: NTUC U Care (web platform), Cartier (web + 21 tall screens), IndusNinja (14 phone screens), Kia (dashboard + scrollshots), Airtel Xstream Play (9 videos, campaign), a client under NDA (brand, square cover), Labelly (thin), Bodyshop (no body). Screenshots sent to the owner; iterate until approved.

### E. Docs and ship

- `kits_design_system/docs/blocks/case-study.md` in the block-doc template (Status/Source/Content/Anatomy/Tiers/States), no dashes; `kits_design_system/docs/components.md` gets the `src/components/work/*` entries (it is the maintained components list).
- `docs/research/case-study-system-2026-10-19/{code-map,skills-and-research,content-inventory}.md` (step 0, copied from the plan's research appendices). The old draft `docs/drafts/ntuc-u-care-case-study.md` was superseded by the NTUC v2 proposal and removed on 2026-11-17; the skill's `examples/body-ntuc-u-care.md` carries NTUC.
- `CHANGELOG.md`: one `[Unreleased]` entry per commit (governance §9.11; the last entry is from 2026-10-13); headings keep the file's existing `### Changed — topic (date)` form (the dash rule covers visible site copy and block docs, not this file). `pending.md` (replace the case-study items), `CLAUDE.md` + `AGENTS.md` (identical except the H1: components list, skill pointer, sync v2 fields, source rule), `governance.md` §5 (Body Content v2 fields synced from Notion; mediaManifest is derived data).
- `.gitignore`: `.claude/skill-workspaces/`, `scripts/data/media-manifest-cache.json`, `scripts/.tmp-*.mjs` (the existing `scripts/tmp-*.mjs` pattern misses the dot prefix; `scripts/.tmp-cands.mjs` itself stays untouched).
- Memory (outside the repo): "existing content is not a benchmark" and "single source from the owner, enrich by proposal only".
- Commits by path, in this order: research docs + gitignore; skill; parser + tests; manifest + sync + schema + backup; layout + components + template + guard + fixtures + stories; block doc + components.md + CHANGELOG + pending + CLAUDE/AGENTS + governance. Each with its CHANGELOG line. Push after the owner's go; verify live on `wugweb.pages.dev` (all 44 return 200, gate passes on the 8 preview slugs). The `sectors` worktree (`.claude/worktrees/sectors`) is not in the way; check `.git/index.lock` before each commit.

# 11. Doing it

## Order of work (each step ends with a checkpoint the owner can see)

0. Save the three research reports (in `docs/research/case-study-system-2026-10-19/`) to `docs/research/`; write the two memory notes; verify `NOTION_TOKEN` (stop and ask if invalid).
1. Skill v1: every file in A, examples included, `evals/evals.json`. Commit by path. Show the owner the SKILL.md and the Body Content v2 contract; adjust.
2. Parser v2 + tests → `node --test src/lib/case-body.test.ts`. Run `case-audit.mjs` over all 37 bodies: the 15 collapsed thin docs now parse into their 5 sections.
3. Manifest lib + header parsers + cache → dry run over all 37 → media report to the owner (own folders, dead, duplicates, suspects, weights, posters, moov).
3b. Visual read of all own-folder media for the 19 media case studies (parallel subagents, pane screenshots, JSON out) → per case study: corrected kinds, flows in order, hero pick, wrong-client / stock / PII / placeholder findings, near-duplicates, palette, alt + caption proposals → to the owner as one review page per case study.
4. Sync v2 dry run → diff to the owner → owner's go → `WRITE=1` (backup) → schema declarations → owner deploys Studio.
5. Layout resolver + fixtures + tests → components + stories → thin template → CSS guard → `npm run build` passes → gate script on all 44 locally.
6. Previews (D4) in the pane; screenshots and the gate table to the owner; fix loop until approved.
7. Skill eval loop (D3): runs with/without skill → grading → viewer → owner feedback → skill v1.1 → rerun → repeat while feedback is non-empty.
8. Docs and ship (E): block doc, CHANGELOG, pending, CLAUDE/AGENTS, governance; commits by path; push on the owner's go; live verification on `wugweb.pages.dev`.
9. Optional: description optimisation (`run_loop.py`, `claude-fable-5-1`) after the owner is happy.

## Verification

- `node --test src/lib/case-body.test.ts src/lib/case-layout.test.ts` and `node --test scripts/lib/media-manifest.test.mjs` pass.
- `node .claude/skills/wugweb-work/scripts/case-audit.mjs --all` shows 37 bodies with ≥ 2 sections each, 0 leaked `###` lines, 0 points starting with `#`.
- `node scripts/sync-notion-case-studies.mjs` (dry run) prints the manifest for 37 docs: own folder resolved for every doc with media, Gratify's own images included, 7 formerly unclaimed folders attached, every dead link listed and kept, every suspect listed and kept.
- `npm run test:case` passes; `npm run build` succeeds (both prebuild guards); `preview_start` `wugweb-dev`; `node .claude/skills/wugweb-work/scripts/check-case-page.mjs http://localhost:4321/work/<slug>` passes on all 44 slugs; JSON-LD checked through `npm run preview` (port 8788) with `-H 'Host: www.wugweb.com'` on the 8 preview slugs.
- Pane checks at 375 / 768 / 1200 on the 8 preview slugs: no horizontal page overflow (`document.documentElement.scrollWidth === clientWidth`), no cropped UI (`object-fit` never `cover` on screen kinds), Styles pair 50:50, rails show a counter and buttons, every chapter has an id, no `—`/`–` in `document.body.innerText`.
- Eval viewer: with-skill runs pass every assertion the baseline fails; owner feedback empty on the last iteration.
- Live after push: all 44 `/work/<slug>` return 200; the 7 no-body pages show no NTUC copy; `/work` lists 37.

## Per-task tests

| Task | How it is tested | Passes when |
|---|---|---|
| Body parsing | Unit tests on real bodies: rich, thin tab-indented, two-line points, `####`, trailing colon, raw link meta, v2 sample | Every body yields 2 or more sections, no leaked `#`, no lost point |
| Media manifest | Header parsers on fixture bytes; dry run over all bodies | Every file has status, size, pixel size, shape; duplicates and borrowed files flagged |
| Visual read | Eval 5: 12 IndusNinja files plus one loop | Wrong-client files flagged by look; screens ordered by step; each has what, kind, alt, caption |
| Screen selection | NTUC | 12 proof screens in chapters, all 31 in All screens, 2 flagged screens hidden |
| All screens block | NTUC page | Set chips show Member 8, States 4, Dashboard 9, Back office 7, Cases 3; with JavaScript off every set is still on the page |
| Viewer | NTUC page, keyboard and touch | Caption and "n of N, set"; previous, next, Esc and swipe work; focus returns to the thumbnail |
| Layout | Block-plan fixtures for 8 case studies | Plan matches the checked-in fixture; no block outside the catalogue |
| Writing style | Evals 1 to 4 | No banned word, no dash, no unbacked claim, claim headings, lengths in range |
| SEO and schema | Gate script on the preview with the canonical host | Title 60 or fewer, description 140 to 160, canonical self, WebPage + CreativeWork + BreadcrumbList, no FAQPage |
| Page gate | Gate script at 375, 767, 768, 769, 1199, 1200, 1201 | One h1, no skipped level, every image with alt and size, no sideways scroll, nothing cropped, a file shown above its natural size flagged when soft, all video muted, under 25 MB |
| End to end | One case study from audit to preview | Output matches the approved proposal; nothing written without approval |

**Open owner decision:** should serious findings from the token check (hardcoded colour, spacing and the like in `src/components/work/`) block a merge, or only be reported? Until decided: report only; the existing prebuild CSS guard stays the one blocking check.

## Definition of done

| Stage | Done when |
|---|---|
| Audit | Every file measured and looked at close up; every claim marked backed or unbacked; findings listed with numbers that were computed, not estimated. |
| Body proposal | One copy; claim headings; every screen captioned; every own-folder file accounted for; owner questions listed; nothing written to Notion. |
| Owner approval | The owner has approved that exact text. Only then is the Notion row written, with a backup first. |
| Page | Gate passes at 375, 768 and 1200: one h1, no skipped headings, every image with alt and size, no dashes, no sideways scroll, nothing cropped, a file shown above its natural size flagged when soft, all media muted, under the weight budget. |
| Skill v0.1 | With-skill runs pass every eval check the baseline fails, on 5 prompts; the owner has no open feedback. |

## Owner inputs (not blockers for building; needed before the matching step)

- A valid `NOTION_TOKEN` if the current one is rejected.
- Go for: sync `WRITE=1`, Studio deploy, push.
- Later, in Notion Body Content: iKan v2, MusicLinkd, Animal Writes bodies; Results lines in the full form; Behance/Dribbble/Live links per case study; `Accent` where a client colour should lead.
- Speed of the visual read: the default looks at each asset through the browser pane (no file ever saved). A contact-sheet approach (12 thumbnails per sheet made in memory, written to the scratchpad only long enough to view, then deleted) is about ten times faster; it needs the owner's yes because it briefly creates local files.
- Decisions on reported facts: wrong-brand files inside own folders, heavy files, videos without posters or with `moov` at the end (re-encoding would be a derivative; the owner decides).

# 12. Reference case: NTUC U Care

## NTUC reference audit (2026-11-11, read-only) and what it adds

Run on `ntuc-u-care-fund-digital-transformation-for-enhanced-member-support`: Sanity doc, all 63 media files measured in memory, every image and video looked at in the pane, live page at 1280 and 375. The skill is not built until the owner has reviewed this audit.

Findings that confirm the plan: body images are 7 device mockups while the 43 real screens sit unlabelled in the folder; best cover candidate (`NTUC.jpg`, the "#EVERY WORKER MATTERS" key visual) is an unlinked folder file; 6 borrowed stock images (one is a bridal boutique); re-encoded duplicates (Cover, Style1, Style2, Filler-2); 0 img dimensions, 41 identical alts, 0 captions, 6 of 7 videos without poster, 6 of 10 sections without id, rail without role, buttons or counter; 2 em dashes in visible copy and 1 in `<main aria-label>`; 0 numbers, 0 quotes, generic headings, unbacked claims.

Additions the audit forces (not in the plan before):
1. Audience level above flow. NTUC has a member side (18 screens) and a back-office side (11 screens). Manifest and visual read gain `audience` (member, admin, public, partner); `screens` and rails group by audience, then flow. This is the "does a lot, into one" shape.
2. Device mockups are their own kind (`mockup`). Rule: at most 2 per page, never the only evidence in a chapter, never the hero when a project-specific visual exists; real screens lead.
3. States recipe. Error, ineligible, declaration and success screens form a "what happens when it goes wrong" set: a `states` rail with the state as caption.
4. Process from screens. The admin workflow (Submission → Document verification → Eligibility check → Reward rule → Award disbursement) is visible in the screens: the visual read may propose a `timeline`/steps block with the screen that proves each step.
5. Upscaling is flagged, not banned (owner, 2026-11-16): a file shown above its natural size is flagged when it looks soft (417 px palette shown at about 580 px; 600 px video stretched to 1184 px today). Small files get a contained cell.
6. Rail items fit the viewport: width ≤ 85vw on mobile (today 743 px and 996 px items on a 375 px screen, so no screen can be seen whole).
7. Video dedup and length gate verified: `ntuc-solution.mp4` (600×334) is a low-res copy of `NTUC_Solution.mp4` (2730×2048): prefer the larger, mark the other `dupOf`. `Design_Philosophy.mp4` is a 152.8 s film, today looping inside the rail. **Owner rule (2026-11-11): no sound anywhere; all media is muted and voiceless.** Every `<video>` renders `muted` with no unmute control (a long video gets a play/pause button only, never native volume controls). This replaces "story video with controls and captions" everywhere in this plan, and the visual read's `audio` field becomes a report-only fact. A video > 15 s never loops in a rail: it is a muted click-to-play video in its own chapter, or stays off the page when a short cut of it already exists (NTUC: `ntuc-about.mp4` is a 5.5 s cut of the film, so the film stays off).
8. Placeholder and sample data inside screens. Lorem ipsum and a team member's name, email and phone appear in screens. **Owner rule (2026-11-11): identify whether a flagged screen is critical before hiding it.** Critical = the only proof of a flow, step or feature: it stays and the flag is recorded. Not critical = another screen proves the same thing: hidden by default, kept in R2 and Notion, listed in the audit.
8b. Cover and hero picks are Claude's call (owner: "you have it all, decide"), made from `heroScore` across body and folder files and reported in the proposal with the reason.
9. One copy per body. NTUC carries a short copy and a long "Sanity site copy" of the same story, and "Impact" in one is "Conclusion" in the other. The v2 proposal collapses to one copy; the parser keeps the v1 branch for unconverted bodies.
10. Entity and spelling consistency check in the audit: client vocabulary wins ("Programmes"), en-GB throughout, one spelling per entity (Icube vs iCube).
11. Styles pair stays an image pair, 50:50, native ratio, flagged if shown above its natural size (owner, 2026-11-16). The visual read only reads its values (NTUC: #EA1828, #FE950C, #E8E8E8, #F5F5F5, #FFFFFF; Open Sans) to propose `Accent` and to write the alt text.

## How the NTUC audit and proposal were done (the skill's procedure, as actually run)

This is the method the skill encodes in `SKILL.md` and `references/ops-cycle.md`. Everything was read-only and nothing was saved locally except one JSON copy of the Sanity record in the session scratchpad.

1. Record. One read of the case study from the Sanity public query API (`https://splvhmk1.apicdn.sanity.io/v2024-01-01/data/query/production`, GROQ on `_type == "caseStudy"`): all fields, `bodyMarkdown`, `extraMedia`. (Notion itself was not read; the skill reads Notion first and uses Sanity to compare.)
2. Measure. Every URL in the body plus every `extraMedia` URL: HEAD for status, bytes and ETag; a ranged read of the first 256 KB, parsed in memory for pixel size (PNG, JPEG, WebP); shape from the ratio; own folder versus borrowed folder from the path. Result: 63 files, 57 own, 52.5 MB.
3. Look at images. Contact sheets built inside the browser pane straight from the R2 URLs (open one R2 image, replace the page body with a flex grid of `<img>` tags, 8 to 12 per sheet, file name as label, wait 2 s, screenshot). Six sheets covered all 57 images. Then a close view (image at 440 px wide, cropped to the phone) for the 6 screens that showed personal-looking data. No file was written.
4. Look at videos. All six loaded as `<video muted preload="auto">` in the pane; duration, pixel size and audio bytes read from the element; one screenshot at the middle frame and one at the end frame.
5. Check the live page. The HTML fetched and parsed for title, description, canonical, robots, og tags, JSON-LD, headings, sections (id and name), images (alt, width, height, lazy), videos (poster, preload), dashes, word count. Then the pane at 1280 and at 375: page height, horizontal overflow, object-fit, cropped and upscaled media, rail item widths, rail semantics, tap targets, with screenshots of the hero, two chapters and the rail.
6. Sort what was seen. Kind (mockup, real screen, style tile, key visual, film), audience (member, staff), flow order, states, duplicates and low-res copies, placeholder text and sample data, the best cover, and for each flagged screen whether another screen proves the same thing.
7. Write the proposal. One copy built from the owner's existing text; every claim with no evidence in the source cut and listed; headings as claims; captions from what each screen shows; design decisions tied to named screens; a list of questions for the owner; every own-folder file accounted for; byte total summed from step 2.

Where this run was thin (the skill must do better): most captions were written from thumbnail-size views; videos were seen at 2 frames, not stepped through; the 768 tier and JSON-LD on the canonical host were not checked; the heading typeface is a guess; the first byte total quoted was an estimate and was wrong (corrected by summing). Rule for the skill: a caption or alt text is written only after that screen has been seen close up, and every number in a report is computed, never estimated.

Screen selection rule (owner: "up to you", 2026-11-11): a chapter shows only the 1 to 4 screens that prove its claim; every other approved screen goes to one closing `screens` block titled "All screens". That block has set chips with counts (audience, then flow), a thumbnail grid (3 columns for phone screens and 1 to 2 for desktop screens on mobile; denser on desktop), and the `<dialog>` viewer with caption, "n of N, set name", previous and next buttons ≥ 44 px, and swipe. Without JavaScript every set renders stacked under its own heading, so all content is in the server HTML. In Body Content terms: only the proof screens are linked in a chapter; the rest stay folder-only and reach the block through the manifest, with captions from the approved visual read.

## NTUC U Care Body Content v2 proposal (for owner review; nothing written anywhere)

At step 1 this is saved as `docs/drafts/ntuc-u-care-body-v2.md` and as the skill's `examples/body-ntuc-u-care.md`. Notion is written only after the owner approves this text. Base URL for every file: `https://pub-39ad1d03baec440faf48303be95c3782.r2.dev/assets/work/ntuc-u-care-fund-digital-transformation-for-enhanced-member-support/` (shown as `…/` below).

### What changes, current → proposed

| Item | Current | Proposed | Why |
|---|---|---|---|
| Copy | Two copies of the same story (short + "Sanity site copy"), 1,045 words | One copy, about 520 words | One source; the page already ignores the short copy |
| Headings | About, Challenges, Solutions, Design Philosophy, Conclusion | 9 claim headings (below) | A heading should say what the chapter proves |
| Subtitle | Empowering low-income families through a holistic digital ecosystem. | One portal for members to apply for aid, one back office for NTUC to run every programme. | Says what was built |
| Cover | `cover-image-kd0f.jpg` (dark tablet mockup, UI unreadable) | `NTUC.jpg` (phone screen, worker photo, "#EVERY WORKER MATTERS", programme cards) | Project-specific and readable small; brand guideline bans generic device covers |
| og:image | same dark mockup | `B2-Assistance Programmes – 3.jpg` (2378×1202, already 2:1) | Existing R2 file, no new file made |
| Body media | 7 device mockups + 6 borrowed stock images | 31 real screens in 5 labelled sets, 2 mockups, Styles pair, 3 loops | The work itself was never on the page except in an unlabelled end carousel |
| Design Philosophy | 3 generic principles | 6 decisions, each with the screen that shows it | Evidence, not adjectives |
| Impact / Conclusion | 4 claims, no numbers | "What was delivered" (facts) + owner-input list | No invented numbers |
| Spelling | program, centralized, Icube | programme, centralised, iCube | en-GB; client's own word on its screens is "Programmes" |
| Dashes | 1 en dash in title line, 2 em dashes in copy | none | Rule |
| New meta | none | Year 2022, Country Singapore, Platform, Accent #EA1828 | Already in Sanity; accent is the client's red (3.9:1 on the page surface: rules and large numerals only) |

Claims in the current copy with no evidence in the source (left out of the proposal; each can return with a number and a source): "measurable improvements", "drastically reduced manual effort", "significant operational efficiencies, cost savings", "increasing engagement", "improving overall well-being", "increased successful access to aid", "reinforced trust and organizational authority", and the whole "Improved Communication Tools" point (no screen shows it).

### Proposed Body Content

```
## NTUC U Care Fund: member portal and back office
**Subtitle:** One portal for members to apply for aid, one back office for NTUC to run every programme.
**Client:** NTUC U Care Fund
**Industry:** Non-Profit, Social Services
**Partner:** iCube
**Disciplines:** Strategy, UX Design, UI Design, Frontend Development, Backend Development, Systems Integration
**Team:** Vedanshu Srivastava, Alwyn Lai, Tang Ka Wei, Gadar Soe
**Year:** 2022
**Country:** Singapore
**Platform:** Web Platform, Admin Portal
**Category:** Web & App Dev, Experience Design
**Tags:** Social Impact, Admin Backend, Data Centralization
**Accent:** #EA1828
![Cover](…/NTUC.jpg)
![Client logo](…/client-logo-grfk.png)

### One fund, many programmes, no single place to apply
NTUC U Care Fund supports low-income union members and their families in Singapore with financial and educational assistance.
Its programmes include the NTUC Care Fund (e-Vouchers), the U Care Hardship Grant and the LIFT-UP Pathfinder sponsorship. Wugweb worked with iCube to give members one portal to apply and staff one back office to run every programme.
- Loop: …/ntuc-about.mp4

### Four problems stood between members and aid
The old digital presence slowed members down and left staff working by hand.
- **Dated and hard to use on a phone**: The old interfaces lacked clear structure and did not adapt to mobile.
- **Manual programme management**: Applications, tracking and disbursement ran on separate manual processes.
- **No central data**: Scattered sources made reporting and oversight slow.
- **Applicants struggled**: Complex navigation made information hard to find and applications hard to finish.

### Members apply in one guided flow
A member finds a programme, checks what it needs, and applies in five short sections.
- **Prefill first**: Retrieve MyInfo fills personal details before the member types anything.
- **Five sections, one at a time**: Personal, occupation, income, family and bank details open one by one.
- **Apply for family**: A member can apply for a secondary applicant, such as a child.
- **Track it afterwards**: The confirmation links to tracking, and every application shows its status and award.
![Screens: Member 1, Portal home with assistance and subsidy programmes](…/Group 17568.png)
![Screens: Member 2, Hardship Grant page with period, processing time, documents and quantum](…/Group 17570.png)
![Screens: Member 3, LIFT-UP Pathfinder page on the same programme template](…/Group 17565.png)
![Screens: Member 4, Application start with Retrieve MyInfo and five sections](…/Group 17561.png)
![Screens: Member 5, Primary applicant and secondary applicant details](…/Group 17567.png)
![Screens: Member 6, Application submitted, with a link to track it](…/Group 17564.png)
![Screens: Member 7, Application status card showing In Process](…/Group 17569.png)
![Screens: Member 8, Award detail with eligible and approved awards](…/Group 17566.png)
![Mockup: Hardship Grant application on tablet](…/solution-image-1-s3p2.jpg)
- Loop: …/ntuc-dp.mp4

### The portal says what to do when something goes wrong
Every blocked path ends with a next step.
![States: Prefill failed, with the option to try again or enter details by hand](…/Group 17551.png)
![States: Application cannot be accepted, with the hotline number and hours](…/Group 17548.png)
![States: Not a member yet, with a route to membership](…/Group 17549.png)
![States: Declaration and consent before Submit Application](…/Group 17550.png)

### One dashboard for applications, events and donations
On desktop, a signed-in member sees current applications, programmes, events and giving in one place.
![Web: Dashboard 1, Current applications](…/Group 17607.png)
![Web: Dashboard 2, Assistance programmes](…/Group 17608.png)
![Web: Dashboard 3, Hardship Grant application form](…/Group 17604.png)
![Web: Dashboard 4, Eligibility explained before applying](…/Group 17611.png)
![Web: Dashboard 5, Event history](…/Group 17605.png)
![Web: Dashboard 6, Family Fun Fiesta request submitted](…/Group 17606.png)
![Web: Dashboard 7, Donation type and amount](…/Group 17610.png)
![Web: Dashboard 8, Thank you after a donation](…/Group 17612.png)
![Web: Dashboard 9, Donation history](…/Group 17609.png)
![Mockup: Event request confirmation on laptop](…/challenges-image-9uky.jpg)
- Loop: …/NTUC_Solution.mp4

### Staff build a programme from a template
Staff start from an existing programme template or from scratch, then set fields, workflow and eligibility rules.
- **Templates**: Five existing programme templates, or a blank start.
- **Field configuration**: Staff choose which personal detail fields an application asks for.
- **Workflow**: Submission, document verification, eligibility check, reward rule and award disbursement are set per programme.
- **Eligibility rules**: Rules are assembled from conditions in a rule builder.
![Dashboard: Back office 1, Choose a template or start from scratch](…/APM02_Programme_Create.png)
![Dashboard: Back office 2, Step 1 programme detail](…/APM04_Programs – Details Filled.png)
![Screens: Back office 3, Programme content sections](…/Group 17617.png)
![Screens: Back office 4, Step 2 field configuration](…/Group 17618.png)
![Screens: Back office 5, Workflow stages for a programme](…/Group 17619.png)
![Screens: Back office 6, Step 4 eligibility check rules](…/Group 17620.png)
![Screens: Back office 7, Step 6 review before publishing](…/Group 17621.png)

### Every application carries its own audit trail
Staff see pending actions, open any case, and read its history from application to award.
1. Applied
2. Submission evaluation
3. Document verification
4. Evaluation
5. Approval 1, 2 and 3
6. Awarded
![Screens: Cases 1, Applications pending action, with search and filters](…/Group 17615.png)
![Screens: Cases 2, Income documents attached to a case](…/Group 17614.png)
![Screens: Cases 3, Audit history from Applied to Awarded](…/Group 17613.png)

### Design decisions, and the screens that show them
- **One main action per screen**: Each step has a single red button. See Member 4, Member 3 and the declaration state.
- **Short sections instead of one long form**: Five collapsed sections replace a single page of fields. See Member 4 and Dashboard 3.
- **The system does the typing first**: MyInfo prefill comes before any field, with a clear fallback when it fails. See Member 4 and the prefill state.
- **Status is always visible**: A member sees In Process and the award; staff see the full history. See Member 7 and Cases 3.
- **Errors give a next step**: A blocked application shows a phone number and hours; a non-member sees how to join. See States.
- **One pattern for members and staff**: The same accordions, type and red action appear on both sides. See Member 4 and Back office 3.
![Styles 1](…/styles-image-1-vocm.png)
![Styles 2](…/styles-image-2-0a6g.png)

### What was delivered
A mobile-first member portal, a desktop member dashboard, and a back office for programmes, applications and awards.
```

### Screen selection applied to the body above (owner: "up to you")

The body above lists all 31 screens so each has its caption. In the final body only these 12 stay linked inside chapters; the other 19 lines are removed from the body and render in the closing "All screens" block from the manifest, with the captions written above.

- Members apply in one guided flow: Member 1 (`Group 17568`), Member 4 (`Group 17561`), Member 6 (`Group 17564`), Member 7 (`Group 17569`).
- The portal says what to do when something goes wrong: `Group 17551` (prefill failed), `Group 17548` (cannot be accepted).
- One dashboard: Dashboard 1 (`Group 17607`), Dashboard 7 (`Group 17610`).
- Staff build a programme from a template: Back office 1 (`APM02_Programme_Create`), Back office 5 (`Group 17619`), Back office 6 (`Group 17620`).
- Every application carries its own audit trail: Cases 3 (`Group 17613`).

All screens block sets: Member 8, States 4, Dashboard 9, Back office 7, Cases 3 (31 in total; the 12 above appear in both places). Block plan change: member chapter becomes a rail of 4; states a pair; dashboard a pair; back office a figure plus a pair; cases a figure; then `screens` (All screens) before credits. Media inside the chapters sums to 17.6 MB (25.1 MB when all 31 screens sat in chapters); the other 19 screens in the block add 7.5 MB and load lazily.

### Owner input needed (asked once; "unvalidated" is a complete answer)

1. Results: any number with its source and date. Useful ones: programmes live on the platform, applications handled, processing time before and after, launch date.
2. Live URL, if public.
3. How many steps the programme builder has (screens show steps 1, 2, 4 and 6).
4. A screenshot of the old site for the problems chapter, if one exists.
5. Heading type looks like Poppins beside Open Sans: confirm.

### Flagged screens and the call on each (owner rule: check if critical before hiding)

| Screen | Flag | Critical? | Call |
|---|---|---|---|
| Group 17561 | lorem ipsum | Yes: only screen with MyInfo and the five sections | Stays |
| Group 17567 | sample name, email, phone | Yes: only proof of applying for a family member | Stays, flag recorded |
| Group 17566 | team member's full name | Yes: only award screen | Stays |
| Group 17615 | sample name and NRIC-style number | Yes: only back office case list | Stays |
| Group 17605 to 17612 | first name "Gadar", lorem ipsum | Yes as a set: the member dashboard | Stay |
| Group 17563 | sample name, email, phone, address, employer | No: Member 4 proves the same form | Hidden |
| Group 17616 | sample name, email, phone | No: Cases 1 and 3 prove case handling | Hidden |

### Every own-folder file accounted for (57)

- On the page (41): `NTUC.jpg`, `client-logo-grfk.png`, 8 member screens, 4 states, 9 dashboard screens, 7 back office screens, 3 case screens, 2 mockups, Styles pair, loops `ntuc-about.mp4`, `ntuc-dp.mp4`, `NTUC_Solution.mp4`, and `ntuc-thumb.mp4` (cards only, 4:3 kept).
- og:image only (1): `B2-Assistance Programmes – 3.jpg`.
- Not rendered, kept in R2 (15): duplicates `Cover.jpg`, `Style1.png`, `Style2.png`, `Filler-2.png`, `ntuc-solution.mp4` (600×334 copy of `NTUC_Solution.mp4`); extra mockups `cover-image-kd0f.jpg`, `filler-image-cpra.jpg`, `filler-image-2-dg4t.png`, `solution-image-2-azzj.jpg`, `solution-image-3-2e83.jpg`, `Solution.jpg`; `NTUC U Care Fund.png` (300×200 logo); `Design_Philosophy.mp4` (152.8 s film, 10.5 MB); hidden screens `Group 17563.png`, `Group 17616.png`.
- The 6 borrowed stock images (a client under NDA and Adneto folders) leave the NTUC body in the proposal; the files themselves are untouched.

### Block plan the resolver should produce from this body

hero (cover `NTUC.jpg`, no stats) → chapter + loop → chapter + points (4, grid 2×2) → chapter + points (4) + rail "Member" (8 phone screens) + figure (mockup) + loop → rail "States" (4) → chapter + wall "Dashboard" (9 landscape, lightbox) + figure (mockup) + loop → chapter + points (4) + pair (2 desktop) + rail "Back office" (5 phone) → chapter + steps (6) + rail "Cases" (3) → chapter + points (6, grid 3×2) + pair (Styles, 50:50, native size) → chapter (prose) → credits → related → next. Rendered media sums to 25.1 MB on the page (27.9 MB counting the card thumbnail video) against 52.5 MB in the folder, which sits on the 25 MB warning line: the largest are `NTUC_Solution.mp4` (4.6 MB) and the `challenges-image-9uky.jpg` mockup (2.9 MB); dropping that mockup brings the page to 22.2 MB. No file wider than its natural width; nothing cropped.

# 13. Background

## Context

`/work/<slug>` renders Notion Body Content (synced to Sanity `bodyMarkdown`) through `src/lib/case-body.ts` and a bento template shipped 2026-10-19. Owner verdict on that attempt: a text grid with pictures, not reusable across clients, holes in rows, media as filler, carousel bolted on at the end.

Owner decisions this session (settled):
- The current bodies are inputs, **not the benchmark**. Design for what is coming: iKan v2 (enhances iKan, needs more layouts), MusicLinkd (200+ screens), Animal Writes (stats, SEO, conversions, impact, plus UI/UX), and "does a lot, into one" multi-workstream engagements as the norm.
- **One source, from the owner**: Notion Body Content plus the client's R2 folder. Claude may enrich, but only as proposals (current → proposed); nothing becomes source without approval.
- Media sizes are measured **at sync time from R2** and stored in Sanity; the page lays out on the server.
- Layout is **automatic from content shape**, with optional hints that live only in Body Content.
- Testing: **real previews + the formal skill-creator eval loop**.
- Scope: the **end-game client-work skill**: portfolio, case study, showcase and all forms (card, showcase tile, logo band, deck/PDF, Behance/Dribbble, LinkedIn).
- Rigour bar: Animal Writes "Campaign Content Standard v1.0" (Notion `3fcbb710-b9ab-81fa-9a64-dfd5609b4af5`): taxonomy defined once, canonical order, conditional sections hidden when empty, evidence-led metrics (value, source, "as of" date, threshold), per-campaign identity tokens inside one design system, data model, governance, QA at exact breakpoints.

### Facts the executor needs (from the three research reports)

The full reports are in `docs/research/case-study-system-2026-10-19/` (code map; skills digest + web research, 60 rules; content inventory). The digest below is what the plan was built on.

Content (44 published case studies):
- 19 rich bodies, all from one identical template (About · Challenges 4 · Solutions 6 · Design Philosophy 3 · Conclusion 4; short copy + "Sanity site copy" duplicate). Labelled body media is ~80% landscape; nearly every phone screen lives in `extraMedia`. 99 borrowed stock images across them.
- 18 thin text-only bodies (140 ≤ words ≤ 255). The parser breaks 15 of them: tab-indented `\t### **Solutions**` headings are not matched (`case-body.ts:102`), so everything collapses into one "Challenges" section with 17 untitled tiles; the two-line item form (`- **Title**` then an indented description) yields title-only tiles. Also: `####` leaks into titles (Aditya Birla), a trailing colon drops a tile (Airtel Xsafe), raw markdown in meta (`[VALYU.ai](http://valyu.ai/)`), a Google Drive link and an extensionless 404 rendered as `<img>`.
- 7 no-body docs, all `noIndex`: Bodyshop, Eastman, Hyatt, PharmaDropper render **NTUC's copy verbatim**; MusicLinkd, Spark Logistics, TheBizGift show placeholder text. `/work` lists all 44.
- Metrics on 7 (Gratify has a real `results[]`; 5 docs hold strings in `results`; Notion Results has 7 rows as "metric | label"). Testimonials 0, FAQ 0. Team on all; Special Thanks 19 (unrendered).
- R2: 34 `work/*` folders. Own folder = `coverPath`/`thumbnailPath` folder for 22; 7 folders unclaimed (bodyshop, global-trade-finance, hyatt, nsl-oilchem, rak-sme, wave-group, woodkraft); Gratify's body majority folder is Adneto's. Wrong-brand files inside own folders (IndusNinja: 6 "Airtel Xsafe" files; Valyu: "899-Wub Web-Airtel-295.png"). 8 dead links. Re-encoded duplicates (Styles pair, Cover) in most carousels. Images up to 9496×5316 and 7.4 MB, 20+ over 4 MB. Videos 2 s ≤ d ≤ 153 s, up to 24.6 MB; most mp4 keep `moov` at the end; thumbnails are 4:3 (current CSS crops to 16:9); posters exist for 56 of 78 videos. Desktop full-page captures (1440×3507, 1440×11656) look like phones by ratio alone: use width ≥ 1280 as the tell.
- Image-shape counts for 10 docs: body rendered L133 S9 T16 P6; extraMedia L138 S14 T49 P42.
- Notion data source `3a3bb710-b9ab-80d6-b520-000bfeabe514`: 64 properties, 49 rows. Filled but unused by the site: Services (49, 1 ≤ n ≤ 5), Related Case Studies (49 × 3), Related Posts (31), Results (7), Year (15), Timeline (27), Country (25), Platform (46), Project Type (46), Engagement Type (46), Team (46), Special Thanks (19), Excerpt (49), Last Updated (36), Cover/Thumbnail/About/DP video URLs, Client Logo, OG Image. Live URL / Prototype URL hold only "—". **The `.env` NOTION_TOKEN was rejected during the inventory** ("API token is invalid"): verify before the first sync; if invalid the owner supplies a new one.
- Presence: Behance wugweb (7 projects: a client under NDA, Metcred, Kia, Bankco, Axis Bank, Adneto, Gratify), Behance vedanshu (same 7 + 5 personal), Dribbble wugweb (8 shots: UI Explorations 2024, IndusNinja, Airtel Xsafe, Airtel Xtream Play, iMedia guide, RideEV social, adtech 2022 guide, Instagram post). Animal Writes exists as `client-CLI-ANIMALWRITES` (Media + Non-Profit), no case study yet.

Code:
- `src/pages/work/[slug].astro` (913 lines): hero + meta `<dl>`, cover, bento body (`.bento`, `.b-head`, `.b-point`, `.b-media[data-shape]`, `.b-styles`, `.b-video`, `.b-carousel`), legacy fallback `{!body && …}`, "More Case Studies" (unordered, same two every time). Client-side `data-shape` script. No `data-reveal` in the body, chapters lack ids, images lack width/height, body videos lack posters, alt text generic, `title` prop contains an em dash, JSON-LD `CreativeWork` with `author: #founder` and no `dateModified`.
- `src/lib/case-body.ts` (parser), `src/lib/queries.ts` (`caseStudyBySlugQuery`), `src/lib/assets.ts` (`assetUrl`, `posterFor` → `-poster.webp` sibling), `src/lib/work-mapping.ts` (`pillarsFor`, `relatedWorkFor`), `src/lib/scroll-animations.ts` (`[data-reveal]`, `[data-scroll]`), `src/lib/lazy-video.ts` (`video[data-src]`, needs poster), `src/layouts/BaseLayout.astro` (title + " | Wugweb" only when ≤ 60; canonical self; noindex and **no JSON-LD on non-canonical hosts**, verify with `Host: www.wugweb.com`), `src/components/JsonLd.astro` (@graph, no `@context` per node).
- `src/styles/global.css`: tokens only (fluid type `--fluid-*`, `--gap-*`, `--space-section-*`, `--radius-*`, `--duration-*`/`--easing-*`, `--layer-*`, `--shell-gutter`, `--line`); breakpoints literal 480/640/768/1024/1200; global rule `section:not(section section):not(.global-final-cta){padding-block:var(--section-y)!important}` (stacks on every top-level `<section>`; nest chapters inside one section).
- `kits_design_system/docs/tokens/layout-shell.md` (authoritative): section owns the gutter, content max 1200, every section has an id and an accessible name, `aria-labelledby` only to a heading that always renders, never to a heading inside `.map()`, `figure`/`figcaption` for captioned media, decorative loops `aria-hidden`, one h1, no skipped levels. Block doc template: `kits_design_system/docs/blocks/sector-showcase.md` (Status/Source/Content/Anatomy/Tiers as inequalities/States).
- Tooling: no `astro check`; unit tests via `node --test` on `src/lib/*.test.ts`; Storybook 10; `prebuild` CSS-ownership guard pattern in `scripts/check-sector-css.mjs`; `imageService: 'passthrough'` (no resizing). Dev server: `.claude/launch.json` → `wugweb-dev` on port 4321 (use `preview_start`). The browser pane reports `visibilityState === "hidden"`: IntersectionObserver and reveals never fire there; inject `[data-reveal]{opacity:1!important}` and prefer DOM/markup checks over screenshots.
- Schema `sanity/schemaTypes/caseStudy.ts`: `extraMedia` and 21 other fields (year, country, platform, projectType, engagementType, specialThanks, aiSummary, …) exist in data but are undeclared.
- `scripts/sync-notion-case-studies.mjs`: Notion → Sanity, dry run by default, `WRITE=1` backs up to `backups/` then commits one transaction; never writes Notion; never deletes; carries only title, shortTitle, bodyMarkdown, extraMedia, slug, seoTitle, seoDescription, focusKeyword, canonicalUrl.
- Brand guidelines: `brand_guidelines/03_MARKETING_SYSTEM/06_CASE_STUDIES.md` (real evidence; cover = project-specific metaphor, never a generic laptop; challenge → intervention → outcome), `14_COPY_GUIDELINES.md` (direct, specific, outcomes over hype), `02_MESSAGING_FRAMEWORK.md` (one claim, one tension, one proof, one outcome; Problem → Insight → System → Outcome).

Research (encode, do not re-derive):
- Google: FAQ rich results gone 2026-05-07, HowTo gone 2023, self-serving Review stars ineligible (no star markup on testimonials), Article/CreativeWork fine, no AI-specific markup or llms.txt needed, images in `<img src>` only, og:image project-specific 1200×630. AI assistants cite full sentences of 6 ≤ words ≤ 20, mostly from the first 30% of a page; brand mentions correlate with AI visibility more than backlinks.
- NN/g: rails only for secondary sets, next item peeks 15% ≤ x ≤ 25%, end reachable in 3 ≤ swipes ≤ 4, no autoplay, visible buttons ≥ 44 px, never essential content only in a rail. W3C carousel pattern: labelled region with `aria-roledescription="carousel"`, slides as groups "n of N", native buttons.
- CSS: `scroll-snap-type: x proximity` when any item may exceed the viewport; `grid-auto-flow: dense` breaks reading order (never where order matters); masonry not shipped widely; `content-visibility: auto` + `contain-intrinsic-size`; lazy images need width/height; videos `preload="none"` + poster; hero image `fetchpriority="high"`, never lazy.
- Studio patterns worth copying: hero = client + one project-specific line; meta/key-facts panel; stats near the top with timeframe or benchmark; claim headings, 30 ≤ words ≤ 150 per chapter; media sequence from the client's own material; credits (roles, names, partners, awards, press); live/store links; next project with metadata. Anti-patterns: uncaptioned 16-screen dumps, generic laptop heroes, inconsistent numbers, missing alt text, JS-only content.

# 14. Vetting log

| Date | Who | What | Result |
|---|---|---|---|
| 2026-11-14 | Second assistant (source audit + Deep Research), run by the owner | Retrieved the full plan and the real `layout-shell.md`; checking the actual GitHub code against the plan. | In progress. Findings are added here when they arrive; a finding changes the plan only after the owner accepts it. |
| 2026-11-14 | Owner | Digital-twin skill question raised by the vetting. | Closed: different work, not part of this plan. |
| 2026-11-16 | Claude, at the owner's request | Reviewed the second assistant's consolidated plan. | Taken: handoff contracts, per-task tests, the CI question. Not taken, because each conflicts with an owner decision or a fact: fixed About / Challenge / FAQ structure; FAQPage schema and `author`; digital twin inside this system; Notion against Sanity as open (decided); canonical and redirect questions (decided); picking screens by keyword or file name; leftover-only gallery; TinyFish and Bright Data as essential; its folder sketch. |
| 2026-11-16 | Owner | Final skill list. | Nothing dropped: 22 core, 19 situational, 17 second opinion. `ui-system-mapper` is a separate skill. SEO stays one skill, `wugweb-seo`. |
| 2026-11-16 | Owner | Media rule and scope. | Resize allowed if the original aspect ratio is kept; clipping masks allowed. Scope now includes blog posts, service pages and site-wide SEO (Part 3, to be planned). |
| 2026-11-16 | Owner | Six-skill Wugweb Skill System. | `wugweb-work` produces every piece in two tracks; the social and other forms are a module of this skill; planning belongs to `wugweb-strategy`. |

## Full read, 2026-11-19: the md files and what needs changing

Every file of the skill (54) was read on 2026-11-19 from main (`4fbf334c`) by a read-only reviewer for the coordinator. Nothing in the skill folder was changed. The skill's own checks pass (`build.mjs --check` 5 of 5 fresh, `validate.mjs` 30 checks with 0 errors, `test.mjs` all passed). No stale generated file, no version disagreement, no NDA name and no stray dash was found in the skill. The list below is for the work session to act on; line numbers are as of that commit.

### The md files the skill carries

| File | What it is | Kind |
| --- | --- | --- |
| `SKILL.md` | Procedure, rules, index | Authored |
| `README.md` | Package overview, install, run | Authored |
| `CHANGELOG.md` | History | Authored |
| `references/standing-rules.md` | Marked copy of the home file; matches it | Copy |
| `references/evidence.md` | Audit findings, ledger, fact lock, numbers | Authored |
| `references/body-content-standard.md` | The v2 grammar | Authored |
| `references/own-content.md` | Track 2 steps, the FAQ rule | Authored |
| `references/media-standard.md` | Media rule, manifest, shapes | Authored |
| `references/visual-read.md` | Look mode and the read schema | Authored |
| `references/archetypes.md` | Archetype recipes | Authored |
| `references/forms.md` and `references/forms/` (13 files) | Forms index and one file per form, plus publish approval | Authored |
| `references/handoffs.md` | Requests to sibling skills | Authored |
| `references/qa-checklist.md` | Publish gate | Authored |
| `references/open-items.md` | Open and settled matters | Authored |
| `references/skill-map.md` | Helpers, permissions, clashes | Authored |
| `references/ops-cycle.md` | Commands, output formats, site wiring | Authored |
| `references/copy-and-seo.md` | Brief template, lengths, voice and SEO pointers | Authored |
| `references/layout-grammar.md`, `design-principles.md`, `schema-jsonld.md` | Rules "held for" kits, kits and seo | Authored |
| `examples/` (7 files) | NTUC proposal, two skeletons, three NTUC forms examples, one test fixture | Authored |
| `AGENTS.md`, `export/wugweb-work.md`, `adapters/cursor/wugweb-work.mdc`, `adapters/chatgpt/instructions.md` | Built by `scripts/build.mjs` | Generated |

### Needs changing in the skill

1. `wugweb-engineer` is never named. `SKILL.md` line 120 ("only this skill writes"), `handoffs.md` line 3 and `ops-cycle.md` lines 82 to 102 (sync, Notion and Sanity writes) contradict the engineer skill, which owns the sync and Sanity patches. Also missing from `metadata.json`, the `SKILL.md` ownership table and `skill-map.md`.
2. "Six skills" in `README.md` line 3 and "five sibling skills" at line 25 are out of date.
3. "Until a sibling skill is installed" wording is out of date, since all siblings exist: `SKILL.md` lines 36, 79, 81 and 140 to 143, `README.md` lines 44 to 45, `handoffs.md` lines 5, 9 and 24, and the headers of `layout-grammar.md`, `design-principles.md`, `schema-jsonld.md`, `skill-map.md`. Caveat: kits holds no block catalogue and seo has no JSON-LD graph file, so those three held files cannot become bare pointers until the rules move.
4. Title limit: `qa-checklist.md` line 39 and `check-case-page.mjs` line 150 say 60; `evals.json` line 123 and the seo audit reference say 51 before the suffix.
5. Kits values are restated: 44 px (`layout-grammar.md` lines 30 and 107, `qa-checklist.md` line 69); 85vw, 20%, 2400 and 35 to 60 (`layout-grammar.md` lines 58, 66, 79, 148).
6. Word count: `validate.mjs` line 36 uses its own count (1,863); the shared method gives 1,811.
7. Evals against the skill: `evals.json` lines 52, 75 and 80 expect the Airtel Xsafe files flagged "wrong client", while `visual-read.md` line 108 and the changelog say they are misnamed IndusNinja boards; line 131 asks whether a scheduling tool is connected (settled: none).
8. `examples/forms-ntuc-fact-pack.md` line 27 says NTUC facts are still open; `open-items.md` line 40 says not.
9. `case-audit.mjs` lines 76 and 81 recognise only "Sanity site copy"; `ops-cycle.md` line 77 says "Framer site copy" is read the same way.
10. `README.md` line 52 says 16 reference files (17 exist), line 58 says the build writes three files (it writes five); `export/` and `agents/openai.yaml` are not listed there or at `SKILL.md` line 149.
11. `ops-cycle.md` line 88 says `NOTION_TOKEN`; the standard name is `NOTION_API_TOKEN` (the site sync script itself still reads the old name).
12. `media-standard.md` line 80 and `ops-cycle.md` line 75 say no folder listing exists; `scripts/media-manifest-dry-run.mjs` now does it.
13. `metadata.json` line 6 says Part 2 runs on its own branch; it goes straight to main.
14. `CHANGELOG.md` lines 54 to 58 say "Same content as 0.4.3, no rule changed" under 0.5.0 after about 25 rule changes, and there is no line for the 2026-11-18 standing-rules commits.
15. Hard stops: `SKILL.md` line 63 lists six, `qa-checklist.md` line 14 lists three.
16. `forms/newsletter.md` lines 23 to 25 say "Not decided" while `open-items.md` line 3 says nothing is open.
17. `examples/body-musiclinkd.md` line 9 and `skill-map.md` line 50 name the same helper differently.

### Needs changing in this plan

- The NDA client is named at lines 630, 945 and 1224.
- Line 7 gives the last skill commit as `12d0f63c`; it is `5bec58b9`.
- Line 44 lists steps 4 and 5 as next while line 67 has them on main; line 96 still says 0.4.2 and evals not run.
- Lines 94 and 115 say site code is not a skill; `wugweb-engineer` now exists. Line 38 says `NOTION_TOKEN`.

### Worth knowing

- `validate.mjs` checks 10 banned words; `case-audit.mjs` carries 25.
- `case-audit.mjs` does not parse the `Section:` prefix that `body-content-standard.md` line 135 describes.
- The helper name table in `skill-map.md` dates from 2026-11-16 and no longer matches the installed names.
- `ops-cycle.md` line 72 carries an unresolved "to be corrected if wrong".

### Fixed 2026-11-19

Fixed 2026-11-19 (work session, in the working tree; the coordinator commits): skill items 1 to 17, all fixed; plan items fixed: the NDA client unnamed (four places, lines 630, 945, 1224 and 1257), line 7, line 38, line 44, lines 94 and 115, line 96. Not fixed: none of the numbered items. Notes: `handoffs.md` carries the engineer contract in vendor-neutral words ("from the source to the CMS") because the skill's own check allows vendor names only in `ops-cycle.md` and `skill-map.md`; the engineer's exact wording is quoted in `ops-cycle.md`. Lines 913, 960 and 1012 of this plan still say `NOTION_TOKEN`, which is the name the site sync scripts read today. The "Worth knowing" points were not in scope and are unchanged. Line numbers in the list above are as of `4fbf334c`. Checks after the fixes: `build.mjs --check` 5 of 5 fresh, `validate.mjs` 30 checks with 0 errors, `test.mjs` all passed.

Changed back the same day at the owner's word: the newsletter's sending tool, list and cadence are not decided; `forms/newsletter.md` says so and `open-items.md` lists it as the one open matter.

Owner, 2026-11-19, final on titles: one limit for every page type, 60 characters as rendered, set by `wugweb-seo`. The 51-character source check is removed from the case-study gate.

RESTORED 2026-11-19 (owner). The skill folder is back to the work session's own 0.5.0 (commit `4fbf334c`). The review fixes listed above as "Fixed 2026-11-19" are undone in the skill: they had handed the sync and the writes to `wugweb-engineer`, replaced the layout sizes with pointers to `wugweb-kits`, and a further change had started to move the block catalogue out of this skill. `wugweb-work` is the full production system this plan describes: nine modes, Body Content v2, the media manifest, the visual read, the 23-block catalogue and layout grammar, screen selection and the All screens block, the viewer, the publish gate, the sync, preview, approval, commit and deploy cycle, and the Forms module. Kept on top of the restored skill, by the owner's rulings of 2026-11-19: one title limit for every page type (60 characters as rendered); the newsletter's sending tool, list and cadence are not decided; an NDA client is never named. Open for the owner: `wugweb-engineer` also says it runs the Notion to Sanity sync; the two skills overlap on that step until he rules.

### Completed against this plan, 2026-11-19 (commits `d47791d4`, `de9dc6c8`, `7fa46f82`)

The skill was read line by line against this plan and completed. Nothing was removed and no step was given to another skill: `wugweb-work` holds every layout, block, media, copy, schema and gate rule itself, and a sibling may only check a result. Version stays 0.5.0. Checks: 32 validator checks with 0 errors, 27 tests passed, build fresh.

Added to the skill:

- Layout: the layout shell values, the screen system (proof screens, All screens, the viewer), the layout words the owner uses (bento, columned, slides), the cover rule, the yellow rule, the tokens-only rule, the first screen on a phone, video and loop loading, where a quote, a table and a timeline sit.
- Helpers: the handoff contracts table, the helper register by area, and every helper the owner named moved out of "Ignored" with when it is used.
- Copy and SEO: the twelve writing rules in full, the claim order, title 60 as rendered, description 140 to 160, Title without the brand and Short Title as the brand, no inferred meta value.
- Cycle: the layers on this site, content source governance, the publishing contract, what Ship checks after the sync and the deploy, failure handling, rollback, the definition of done, output formats per mode.
- Checks: All screens and viewer checks in the gate, one hard-stops list in three files, one banned-word list in three files (the validator fails if they drift), four new evals and 17 new tests.
- Charts: on a page a chart is HTML or SVG from the owner's numbers; for a deck, post or share image it is a made file through the new-file gate.

Not in this plan, so not added (owner to supply if wanted): the chapter nav block spec, type sizes for made files, the "ski-ramp" brief template, how an HTML or SVG chart is carried in the block plan, blog image rules, the rule for refreshing old posts.

Open with the owner: the newsletter's tool, list and cadence; which research helper leads (TinyFish is written as first, Bright Data second); `wugweb-engineer` also says it runs the source to CMS sync.

Built 2026-11-19: the All screens component (`src/components/work/CaseScreens.astro`), with set chips and counts, thumbnails at their own ratio, and the viewer showing "3 of 8, Member". It is on the preview route only. Still to do on the site: the preview route passes no media manifest, so sets are named from the body labels until the manifest is wired in.

Fixed after the pass (same day): the mosaic row reads as this plan has it again (the narrowing to brand applications was an error, not an owner rule), and the gate script takes the hero from the hero block.

### Owner decisions and additions, afternoon of 2026-11-19

Skill on main at `9a2fc9c3`, version 0.5.0, uploaded to the Claude app the same day. The full list is on the Notion page and in the skill's `CHANGELOG.md`. In short: the skill gives composition (content and experience together) and is not a page builder; the owner names the page and section each time; a case study's hero meta keys are his; inside the section given the skill has authority over layout and structure; colour comes from this site's stylesheet, Wugweb's brand and the client's brand values supplied with the content; mobile first; no render without his go. New in the skill: `references/composition.md` and `references/forms/graphics.md`, the decision log, provenance, failure handling, acceptance criteria and the conflict rule. What the site does not do yet is listed in the skill's `references/open-items.md`.
