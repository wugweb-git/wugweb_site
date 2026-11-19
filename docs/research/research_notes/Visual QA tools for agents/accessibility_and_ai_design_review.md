# Free, scriptable accessibility and quality audits, and the evidence on AI vision models judging visual design from screenshots (as of 2026-11-19)

Reading notes for the report writer:

- Versions and licences marked "npm registry, 2026-11-19" were read with `npm view <package>` on that date. They are measured facts, not web claims.
- "Vendor claim" marks a figure published by a company about its own product.
- "Model opinion" marks anything that is a model's subjective judgement (a critique, a rating) as opposed to a number computed from the DOM or pixels.
- Where a search summary was the only source and the primary page was not opened, the finding says so.

## 1. axe-core and @axe-core/playwright: licence, version, WCAG coverage, share of issues found, blind spots

### Takeaway
axe-core 4.14.1 (MPL-2.0, free, no account) is the base engine almost every other free tool wraps. It reliably catches contrast on flat backgrounds, missing names, landmark and ARIA errors, but by Deque's own count it finds about 57% of issues by volume, and independent tests put automated tools nearer 30 to 40% of known barriers. Focus order, focus visibility, non-text contrast and anything that needs meaning or interaction are outside it.

### Cited Findings

Versions and licences (measured)
- axe-core latest is 4.14.1, licence MPL-2.0, last published 2026-11-16. [npm registry, 2026-11-19](https://www.npmjs.com/package/axe-core)
- @axe-core/playwright latest is 4.14.0, licence MPL-2.0, requires Node >=22.12.0. @axe-core/cli is 4.14.0, same licence and Node floor. [npm registry, 2026-11-19](https://www.npmjs.com/package/@axe-core/playwright)
- Playwright itself is 1.65.1, Apache-2.0, Node >=20. [npm registry, 2026-11-19](https://www.npmjs.com/package/playwright)

Rule coverage (from the axe-core rule list)
- Rule groups and approximate counts: WCAG 2.0 A and AA about 60 rules; WCAG 2.1 A and AA 3 rules; WCAG 2.2 A and AA 1 rule; best practices about 27; WCAG AAA 3; experimental 6; deprecated 5. The 2.2, AAA, experimental and deprecated groups are disabled by default. [axe-core rule-descriptions.md](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- `color-contrast` (WCAG 1.4.3, tag `wcag2aa`, impact serious) runs by default. `color-contrast-enhanced` (1.4.6, AAA) is off by default. [axe-core rule-descriptions.md](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- `target-size` (WCAG 2.5.8, tag `wcag22aa`, impact serious) exists but is disabled by default; it has to be switched on by tag or rule id. It is the only WCAG 2.2 rule. [axe-core rule-descriptions.md](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- Names: `button-name` (critical, 4.1.2), `link-name` (serious, 2.4.4 and 4.1.2), `image-alt` (critical, 1.1.1) run by default. [axe-core rule-descriptions.md](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- Landmarks: 8 `landmark-*` rules plus `region`, `heading-order` and `tabindex` are best-practice rules (not WCAG failures), impact moderate to serious. [axe-core rule-descriptions.md](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- Keyboard: `scrollable-region-focusable` (2.1.1) runs by default; `focus-order-semantics` is experimental and off. There is no rule that checks visual focus order. [axe-core rule-descriptions.md](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- axe returns four arrays: passes, violations, incomplete and inapplicable. "Incomplete" means the node could neither be passed nor failed and needs a human (or other) check. It gives no 0 to 100 score. [Lighthouse vs axe comparison, secondary](https://accessibilityscore.in/lighthouse-accessibility-vs-axe); [Deque rule page](https://dequeuniversity.com/rules/axe/4.9/color-contrast)

Share of issues found
- Vendor claim (Deque): automated tests built on axe-core found 57.38% of issues by volume, 169,242 of 294,958 issues, across "over 2,000 audits" and 13,000+ pages or page states. First-time audits only, WCAG 2.0 and 2.1 A and AA. First announced March 2021. [Deque coverage report](https://www.deque.com/automated-accessibility-coverage-report/); [Deque blog](https://www.deque.com/blog/automated-testing-study-identifies-57-percent-of-digital-accessibility-issues)
- The 57% is a share of issue volume, not of WCAG success criteria. Deque says the common "20 to 30%" figure counts criteria instead. [Deque coverage report](https://www.deque.com/automated-accessibility-coverage-report/)
- The volume figure is dominated by contrast: colour contrast (1.4.3) was 30.08% of all issues (88,714) and 83.11% of those were found automatically. Next: 4.1.2 Name, Role, Value 16.37%; 1.3.1 Info and Relationships 12.33%; 4.1.1 Parsing 11.69%; 1.1.1 Non-text Content 8.04%. Top five criteria are 78.51% of all issues. [Deque coverage report](https://www.deque.com/automated-accessibility-coverage-report/)
- In the same data, Focus Order (2.4.3), Focus Visible (2.4.7) and Non-text Contrast (1.4.11) were found only by manual testing. [Deque coverage report](https://www.deque.com/automated-accessibility-coverage-report/)
- Deque's caveats: template issues counted once, sample selection not described, "results vary with each dataset". [Deque coverage report](https://www.deque.com/automated-accessibility-coverage-report/)
- Vendor claim (Deque, 2022): automated plus Deque's guided tests reach 80.39% on average. The guided tests are part of the paid axe DevTools product, not axe-core. [Deque blog](https://www.deque.com/blog/deque-stakes-claim-as-undisputed-leader-in-automated-accessibility-testing-coverage-with-new-report/)
- Independent (UK Government Digital Service): GDS planted 142 barriers in one page and ran 13 automated tools. Government guidance drawn from it says the best tools find about 30 to 40% of known issues (DWP manual says about 40%, a GDS service guide about 30%). [GDS tool audit, archived](https://tnaqa.mirrorweb.com/ukgwa/20260506110838mp_/https://alphagov.github.io/accessibility-tool-audit/); [DWP accessibility manual](https://accessibility-manual.dwp.gov.uk/tools-and-resources/automated-accessibility-testing)
- Independent (GDS, 2017-02-24): on a deliberately inaccessible page, 29% of barriers were missed by all 10 tools tested. [GDS accessibility blog](https://accessibility.blog.gov.uk/2017/02/24/what-we-found-when-we-tested-tools-on-the-worlds-least-accessible-webpage/)
- Secondary, single source, primary not opened: in the GDS 142-barrier test axe-core found 39 of 142 (27%). [Lighthouse vs axe comparison](https://accessibilityscore.in/lighthouse-accessibility-vs-axe)

### Inferences
- The Deque 57% and the GDS 30 to 40% are not in conflict: Deque counts real-world issue volume (where contrast is a third of everything), GDS counts distinct planted barrier types. For a dark-themed marketing site with text over media, the realistic expectation is nearer the GDS figure, because the contrast cases axe can decide are the flat-background ones.
- To cover target size on a WCAG 2.2 audit, the run must add the `wcag22aa` tag explicitly; a default axe run silently skips it.
- The `incomplete` array is where an AI reviewer adds value: it is a machine-generated list of exactly the nodes a tool could not decide.

### Gaps
- An Evinced comparison (January 2026) reportedly found axe-core alone caught 22.6% of issues from 35 manual audits versus 62.8% for Evinced. This is a vendor claim seen only in a search summary; the primary page was not opened, so no link is given.
- I did not measure axe-core run time. It runs in-page and is typically quick, but I have no sourced figure.
- The rule list page does not say outright that WCAG 2.0/2.1 and best-practice rules are on by default; it only marks the other groups as disabled.

## 2. Lighthouse, Pa11y and IBM Equal Access: what each adds over axe-core, licence, cost, offline use, run time

### Takeaway
All three are free and need no account. Lighthouse adds performance, SEO and best-practice audits plus a single weighted accessibility score, but its accessibility category is a subset of axe. Pa11y adds a second engine (HTML_CodeSniffer) and scripted pre-test actions. IBM Equal Access adds a third, independent rule engine with a "needs review" tier and baselines.

### Cited Findings

Lighthouse
- lighthouse latest is 13.6.0, Apache-2.0, requires Node >=22.19, published 2026-11-19. It depends on axe-core 4.14.0 and puppeteer-core ^25.16.0. [npm registry, 2026-11-19](https://www.npmjs.com/package/lighthouse)
- Its accessibility category runs a selected set of axe-core checks and turns them into a score weighted by axe impact. One vendor comparison puts it at about 50 rules against 90+ in full axe-core (approximate). [Lighthouse vs axe comparison](https://accessibilityscore.in/lighthouse-accessibility-vs-axe); [a11yflow](https://www.a11yflow.dev/blog/how-accessibility-scores-are-calculated)
- Scoring is pass or fail per audit: no partial credit when only some elements pass. Weights reported as 10, 7, 3 or 1. [a11yflow](https://www.a11yflow.dev/blog/how-accessibility-scores-are-calculated)
- Lighthouse turns on axe's `target-size` rule, which raw axe leaves off by default. [Lighthouse vs axe comparison](https://accessibilityscore.in/lighthouse-accessibility-vs-axe)
- A Lighthouse accessibility score of 100 does not mean compliance; it covers automated checks only. [Curbcut Accessibility](https://www.curbcutaccessibility.com/blog/lighthouse-accessibility-score-100/)

Pa11y
- pa11y latest is 10.0.0 (pa11y-ci 5.0.0), licence LGPL-3.0-only, requires Node ^22.13.0 or >=24, published 2026-10-09. It bundles axe-core ~4.13.0, @pa11y/html_codesniffer ^2.6.0 and puppeteer ^25.9.0. [npm registry, 2026-11-19](https://www.npmjs.com/package/pa11y)
- Default runner is `htmlcs` (HTML_CodeSniffer); `axe` is built in; both can run in one pass (`--runner axe --runner htmlcs`). Standards: WCAG2A, WCAG2AA (default), WCAG2AAA (htmlcs only). [pa11y README](https://github.com/pa11y/pa11y)
- It drives headless Chrome through Puppeteer and accepts an existing Puppeteer browser or page. It supports "actions" before the test (click, set field, navigate, wait for element state) and a `screenCapture` option. [pa11y README](https://github.com/pa11y/pa11y)
- Issues are typed error, warning or notice; only errors fail the run by default. It accepts local HTML files by absolute path. [pa11y README](https://github.com/pa11y/pa11y)
- Known wrinkle: pa11y's axe runner maps axe "incomplete" items with critical or serious impact to type error, so undecided contrast items can appear as failures. [pa11y issue 623](https://www.github.com/pa11y/pa11y/issues/623)
- HTML_CodeSniffer upstream is BSD-3-Clause. [npm registry, 2026-11-19](https://www.npmjs.com/package/html_codesniffer)

IBM Equal Access
- accessibility-checker latest is 4.0.35, Apache-2.0, published 2026-11-13; the engine package accessibility-checker-engine is the same version and licence. [npm registry, 2026-11-19](https://www.npmjs.com/package/accessibility-checker)
- It works with Selenium, Puppeteer, Playwright or Zombie. Default config uses the latest rule archive and the IBM_Accessibility policy; archives can be pinned by version. [accessibility-checker on npm](https://npmjs.com/package/accessibility-checker)
- Result levels are violation, potentialviolation, recommendation and potentialrecommendation; teams can store a baseline and fail only on new items. [IBM Equal Access wiki mirror](https://gh.hhj520.top/IBMa/equal-access/wiki); [IBM toolkit, automated verification](https://www.ibm.com/able/toolkit/verify/automated)

### Inferences
- For a Node 22 project the Node floors matter: Lighthouse 13.6 needs >=22.19 and pa11y 10 needs >=22.13, so a Node 22 pin must be a recent 22.x.
- Running Lighthouse for accessibility on top of a full axe run adds nothing but the score and the target-size default; its real value is the performance, SEO and best-practice categories.
- Pa11y's unique value is the HTML_CodeSniffer engine as a second opinion. Because its licence is LGPL-3.0-only, it is fine as a dev-time tool but should not be bundled into shipped code without checking the licence terms.
- IBM's engine is the best free "third opinion" because it is not axe-based; disagreement between axe and IBM is a useful signal for manual review.

### Gaps
- Offline: I found no primary statement for any of the three. All run a local browser against a URL and accept localhost, and none requires an account, so they should work without internet once installed. IBM's default "latest" rule archive setting suggests a network fetch of rules unless an archive is pinned; I could not confirm this from a primary source.
- Run time: no sourced figures found. Lighthouse runs a throttled page load per URL and is the slowest of the group in practice; I have no measured numbers to give.
- The exact number of axe rules Lighthouse 13.6 runs was not confirmed from Lighthouse's own source.

## 3. Contrast of text over images or gradients: can a free tool do it, and how

### Takeaway
No free tool decides this automatically. axe-core deliberately returns text over images and gradients as "incomplete", and its maintainers have said multi-colour backgrounds are a job for screenshot testing. The workable free method is to compute it yourself from pixels in Playwright.

### Cited Findings
- axe's `color-contrast` rule "will not report on text elements that have a background-image, are obscured by other elements or are images of text"; gradient cases and 1:1 results are returned as incomplete for manual review. [Deque rule page](https://dequeuniversity.com/rules/axe/4.9/color-contrast)
- axe-core maintainers on multi-colour and gradient backgrounds: the problem "is better handled with screen shot testing" and is not expected to become part of core. [axe-core issue 708](https://github.com/dequelabs/axe-core/issues/708)
- Vendor claim (Deque): the axe DevTools browser extension (v4.28.0 onward) has an automatic colour contrast analyser that resolves some "needs review" items into true issue, non-issue, or still needs review. This is the extension product, not the open source axe-core library, and is not headless-scriptable from the evidence found. [Deque blog](https://www.deque.com/blog/axe-devtools-extension-update-new-color-contrast-analyzer/)
- Playwright exposes the building blocks: `locator.boundingBox()` for element rectangles and element or clipped screenshots. [Playwright Locator API](https://playwright.dev/docs/api/class-locator)

### Inferences
- A free, scriptable method (my construction, not a published tool): take the list of axe `incomplete` nodes for `color-contrast`; for each, read the computed text colour and bounding box; screenshot the box once normally and once with the text hidden (`color: transparent`); sample the background pixels; compute the WCAG ratio against the worst-case (lowest contrast) pixel and the median. Report both numbers. This is measured fact, and it handles gradients, images and video posters.
- For video or animated backgrounds the measurement is only valid for the sampled frame; sample several frames or the poster.
- A vision model looking at the screenshot can flag "this text looks hard to read here", but that is a model opinion. The pixel computation should be the gate and the model only a pointer to where to measure.

### Gaps
- I did not find a maintained free npm package that does pixel-sampled contrast out of the box. There may be one; none surfaced in this search.
- WCAG gives no formal rule for which pixel to use on a varied background; "worst case" is a conservative convention, not a cited standard.

## 4. Reduced motion, JavaScript disabled and keyboard focus order: automating each in Playwright

### Takeaway
All three are first-class Playwright context options or simple scripts, free and headless. They produce measured facts (was an animation running, is content present without JS, what is the tab sequence), which are exactly the checks axe and Lighthouse cannot do.

### Cited Findings
- Reduced motion: `reducedMotion: 'reduce'` in config or `browser.newContext`, or `page.emulateMedia({ reducedMotion: 'reduce' })`. [Playwright emulation docs](https://playwright.dev/docs/emulation)
- JavaScript disabled: `javaScriptEnabled: false` in config or `browser.newContext({ javaScriptEnabled: false })`. [Playwright emulation docs](https://playwright.dev/docs/emulation)
- Related switches: `colorScheme: 'dark' | 'light'`, `forcedColors: 'active'`, `contrast: 'more'`, `viewport`, `deviceScaleFactor`, and `offline: true` ("Emulate the network being offline"). [Playwright emulation docs](https://playwright.dev/docs/emulation)
- Deque's own audit data shows Focus Order (2.4.3) and Focus Visible (2.4.7) are found only by manual testing, so these need a custom script. [Deque coverage report](https://www.deque.com/automated-accessibility-coverage-report/)
- A third-party write-up of a 13-tool comparison says every tool missed reading order issues, missing visible focus indicators and context-dependent use of colour. Seen in a search summary only. [accessibility.works](https://www.accessibility.works/blog/automated-wcag-testing-tools-accessibility-compliance/)

### Inferences
- Reduced motion test recipe: open the page with `reducedMotion: 'reduce'`, scroll through it, and assert `document.getAnimations()` returns no running animations of meaningful duration; also screenshot twice a second apart and diff (pixelmatch, ISC licence, v8.0.0 per npm registry 2026-11-19). For a GSAP site, CSS media emulation alone proves nothing unless the script reads `matchMedia('(prefers-reduced-motion: reduce)')`; the two-screenshot diff catches that.
- No-JS test recipe: a context with `javaScriptEnabled: false`, then assert key headings, body copy, links and images are present and visible. This matters for reveal-on-scroll patterns where content starts at opacity 0 and only JS reveals it.
- Focus order recipe: press Tab in a loop, record `document.activeElement` (selector, accessible name, bounding box) each step, then check (a) every interactive element is reached, (b) the sequence is monotonic in reading order within a tolerance, (c) nothing off-screen or hidden receives focus, (d) the focused element's outline differs from its unfocused state (screenshot diff of the element box). Output is a table of facts; a model can then be asked whether the order "makes sense", which is opinion.
- A hidden or background browser pane can make IntersectionObserver and viewport rect results unreliable; check `document.visibilityState` before trusting scroll-triggered checks.

### Gaps
- Playwright's accessibility testing guide (playwright.dev/docs/accessibility-testing) was not re-fetched this session; the AxeBuilder usage there is from prior knowledge.
- No published benchmark was found for how well scripted focus-order checks agree with human auditors.

## 5. AI design critique from screenshots: reported accuracy, failure modes, and what improves reliability

### Takeaway
Published studies from 2024 to 2026 agree on one picture: multimodal models are usable as coarse approximators (ratings within one Likert point about three quarters of the time; picking the better of two clearly different designs about 90% of the time) but are near chance on fine distinctions, weak at localising what they criticise, prone to invented or over-applied issues, and get less useful as a design improves. Reliability improves with few-shot examples, coordinate marks on the image, zoomed crops, separate generate and validate passes, pairwise comparison and grounding in interaction evidence.

### Cited Findings

Agreement with humans on ratings (measured in studies; the model outputs themselves are opinions)
- "MLLM as a UI Judge" (Luera et al., Adobe Research and UC Berkeley, arXiv 2510.08783, 2025-10-09): 30 UIs, 500 MTurk participants, 9,296 retained responses, nine factors on a 1 to 7 scale; models Claude 3.5 Sonnet, GPT-4o, Llama-3.2-11B-Vision, each run 10 times with the median taken. [arXiv 2510.08783](https://arxiv.org/abs/2510.08783)
- Same paper: exact-match accuracy averaged 35 to 38%; within ±1 point accuracy averaged 72 to 77% (Claude 0.77, GPT-4o 0.72, Llama 0.74). MAE 0.51 to 0.54 on the 7-point scale. [arXiv 2510.08783, Table 3](https://arxiv.org/pdf/2510.08783)
- Same paper: per-factor rank correlation with humans is weak for most factors. For Claude 3.5: Ease of Use Pearson -0.05, Visual Hierarchy -0.14, Comfort -0.12, but Aesthetic Pleasure 0.62 and Interesting 0.85. Models over-rate ease of use and under-rate aesthetic pleasure and interest. [arXiv 2510.08783, Table 3](https://arxiv.org/pdf/2510.08783)
- Same paper, pairwise preference: overall accuracy Claude 59.98%, GPT-4o 59.60%, Llama 52.96% (chance is 50%). Ease of Use about 50% for all models. When the human score gap between two UIs was small, accuracy was "only slightly above 50%"; at the largest gaps GPT-4o and Claude reached about 90% and 93%. [arXiv 2510.08783, Table 4 and Figure 3](https://arxiv.org/pdf/2510.08783)
- Same paper's conclusion: MLLMs are "approximators, not replacements" and should not be used "for validation testing towards the end of the design process". [arXiv 2510.08783](https://arxiv.org/pdf/2510.08783)
- A separate 2026 Springer chapter, "Can Multimodal LLMs Model Expert Ratings in Mobile UI Usability Evaluation?", reportedly found GPT-5, Claude 4 Sonnet and Qwen-3 VL reach almost perfect agreement (kappa >= 0.81) with UICrit expert ratings on aesthetics and design quality zero-shot, while remaining unreliable for interaction-dependent usability from static screenshots. Seen in a search summary only; primary not opened. [ACM DL listing](https://dl.acm.org/doi/10.1007/978-3-032-30549-7_12)

Quality of written critiques
- UICrit (Duan et al., UC Berkeley and Google, UIST 2024, arXiv 2407.08850): 3,059 critiques with bounding boxes for 983 mobile UIs from seven designers with 1 to 16 years of experience. [arXiv 2407.08850](https://arxiv.org/html/2407.08850v3)
- UICrit: of 5,927 comments Gemini Pro Vision generated, designers validated only 776 (13.1%). [arXiv 2407.08850](https://arxiv.org/html/2407.08850v3)
- UICrit user study, comment quality on a 0 to 1 scale: zero-shot 0.31, few-shot with coordinate visual prompting 0.48 (a 55% gain, p = 5e-4), human designers 0.75. Experts preferred human critiques over the best LLM setup 81% of the time. Inter-rater Fleiss kappa was 0.29, so the human yardstick is itself noisy. [arXiv 2407.08850](https://arxiv.org/html/2407.08850v3)
- "Generating Automatic Feedback on UI Mockups with LLMs" (Duan et al., CHI 2024, arXiv 2403.13139): GPT-4 given a JSON of the Figma layer tree (no screenshot). On 51 UIs rated by 3 designers: 52% of suggestions accurate, 19% partially accurate, 29% not accurate; 49% helpful or very helpful. [arXiv 2403.13139](https://arxiv.org/html/2403.13139v1)
- Same paper against 12 human experts on 12 UIs: GPT-4 precision 0.603 vs average human 0.829; recall 0.380 vs 0.336; F1 0.466 vs 0.478. Of 100 distinct violations, 62% were found by humans only, 29% by both, 9% by GPT-4 only. [arXiv 2403.13139](https://arxiv.org/html/2403.13139v1)
- Same paper: usefulness fell as designs improved. First round 52% accurate and 47% helpful; later rounds 39% accurate and 33% helpful. The authors call it unsuitable as an iterative tool. Rater agreement was very low (Fleiss kappa 0.10 to 0.16). [arXiv 2403.13139](https://arxiv.org/html/2403.13139v1)
- "Synthetic Heuristic Evaluation" (Zhong, McDonald, Hsieh, Univ. of Washington, arXiv 2507.02306, 2025-07-03), screenshots only, Nielsen's 10 heuristics, two apps: GPT-4 found 73% and 77% of the master issue set; Gemini 1.5 Pro 59% and 59%; Claude 3.5 Sonnet 57% and 58%; five experts combined 57% and 63%; an average single expert 18% and 17%. [arXiv 2507.02306](https://arxiv.org/html/2507.02306v1)
- Same paper, consistency: repeated GPT-4 runs over three months agreed with the first run about 94 to 96% at the issue level. [arXiv 2507.02306](https://arxiv.org/html/2507.02306v1)
- UXBench (Wang et al., arXiv 2606.16262, 2026-06-15): 41 runnable local web fixtures (11 real, 30 synthetic) in ten surface families; eight frontier models browse, write a seven-dimension UX report, then a fixed repair agent applies it. Baseline rubric score 3.27 of 5; repaired scores 3.41 to 3.49; best lift +0.22 (GPT 5.4), Claude Sonnet 4.6 +0.19, Gemini 3.1 Pro +0.14. No model leads every surface type (for landing pages GPT 5.4 pairwise win rate 0.667, Sonnet 4.6 0.476; for visual design Kimi k2.5 0.786). [arXiv 2606.16262](https://arxiv.org/pdf/2606.16262)
- UXBench's stated premise: "web UX is not fully visible from a screenshot or a static DOM snapshot"; a judge that only inspects the first rendered view "can therefore produce fluent but weakly grounded criticism". [arXiv 2606.16262](https://arxiv.org/pdf/2606.16262)

Documented failure modes
- Spatial precision: with a plain screenshot, Gemini's bounding box IoU against designer boxes was 0.004; the best visual prompt reached only 0.222. The authors say LLMs "have poor object localization". [arXiv 2407.08850](https://arxiv.org/html/2407.08850v3)
- Even after few-shot plus iterative refinement, box IoU reached only 0.357 (Gemini 1.5 Pro) and 0.345 (GPT-4o). [arXiv 2412.16829](https://arxiv.org/html/2412.16829v2)
- Low-level geometry: on BlindTest (Rahmanzadehgervi et al., ACCV 2024), models averaged about 58% on tasks such as whether two lines cross or shapes overlap, with the best model at about 74 to 78% depending on paper version, against an expected human 100%. Counting line intersections scored 41 to 76%. Figures vary across arXiv versions. [arXiv 2407.06581](https://arxiv.org/html/2407.06581v4); [ACCV 2024 paper](https://openaccess.thecvf.com/content/ACCV2024/papers/Rahmanzadehgervi_Vision_language_models_are_blind_ACCV_2024_paper.pdf)
- Misreading components: 27 to 42% of GPT-4's false issues came from misrecognising UI elements (status-bar icons, a banner, clock icons); another 38 to 42% from misjudging standard app conventions. [arXiv 2507.02306](https://arxiv.org/html/2507.02306v1)
- Cross-screen consistency: GPT-4 found 43 to 50% of across-screen violations where experts found 83 to 86%. [arXiv 2507.02306](https://arxiv.org/html/2507.02306v1)
- Over-applying guidelines (all 12 designers reported it), repeating the same issue per element, vague fixes, re-raising a dismissed issue under another guideline, and missing "global" issues. [arXiv 2403.13139](https://arxiv.org/html/2403.13139v1)
- Structure without pixels also fails: with JSON only, the model flagged overlaps that were not visible and misjudged visual centring. [arXiv 2403.13139](https://arxiv.org/html/2403.13139v1)
- Hallucinated and assumption-laden comments were highest in zero-shot output; asking for critique and localisation in a single call lowered critique quality. [arXiv 2407.08850](https://arxiv.org/html/2407.08850v3)
- LLM self-validation is not fully reliable: a validation pass sometimes removes valid comments and can make correct boxes worse. [arXiv 2412.16829](https://arxiv.org/html/2412.16829v2)
- General LLM-as-judge literature cited by Luera et al.: judges are often verbose, biased toward existing positions and prefer their own outputs. [arXiv 2510.08783](https://arxiv.org/pdf/2510.08783)

Practices shown to improve reliability
- Few-shot examples chosen by task and visual similarity beat random examples and zero-shot (0.31 to 0.48 quality). [arXiv 2407.08850](https://arxiv.org/html/2407.08850v3)
- Coordinate marks along the screenshot edges or numbered patches help localisation (IoU 0.186 and 0.222 vs 0.004 for the bare screenshot). A drawn grid overlay made it worse (IoU 1.1e-5) by adding visual noise. [arXiv 2407.08850](https://arxiv.org/html/2407.08850v3)
- Zoomed crops plus iteration: passing a zoomed patch around each candidate region with the box drawn on it, splitting generation, filtering, refinement and validation into separate calls, and using a different model to refine than to generate (to cut self-bias) raised Gemini box IoU from 0.120 to 0.357 and experts preferred the pipeline's comment set over the baseline 58% of the time. Human sets were still preferred 62% of the time. [arXiv 2412.16829](https://arxiv.org/html/2412.16829v2)
- Text first, location second: boxes conditioned on already-written critique text. [arXiv 2412.16829](https://arxiv.org/html/2412.16829v2)
- Pairwise comparison works when the two candidates differ clearly (about 90% agreement at large gaps) and is unreliable when they are close. [arXiv 2510.08783](https://arxiv.org/pdf/2510.08783)
- Repeating the judgement and taking the median (10 runs) was used to reduce randomness. [arXiv 2510.08783](https://arxiv.org/pdf/2510.08783)
- Fixed rubric with evidence required: seven dimensions each scored 1 to 5, each finding valid only when tied to an observed interaction event; a coverage gate stops the model finishing before it has exercised the controls; desktop and mobile viewports both available. [arXiv 2606.16262](https://arxiv.org/pdf/2606.16262)
- Set-of-Mark prompting (Yang et al., Microsoft Research, arXiv 2310.11441, 2023-10-17): overlaying numbered marks on image regions lets the model refer to regions by id and improved GPT-4V grounding. [arXiv 2310.11441](https://arxiv.org/abs/2310.11441)
- Splitting a long checklist: Zhong et al. split the ten heuristics into two prompts to avoid truncated output. [arXiv 2507.02306](https://arxiv.org/html/2507.02306v1)

### Inferences
- Facts versus opinions, stated plainly: contrast ratios, target sizes, tab order, overflow, element rectangles and animation state are measured facts and should be computed by script. "Hierarchy is weak", "feels cramped", "looks premium" are model opinions with roughly ±1 point of noise on a 7-point scale and weak per-factor rank correlation; they should never gate a release on their own.
- The strongest design implication of the literature: do not ask a model to measure from pixels. Give it the measured numbers (rectangles, gaps, font sizes, contrast ratios from the DOM) alongside the image, and ask it only for the judgement that needs taste. This follows from IoU results of 0.2 to 0.36 and BlindTest; I found no paper that tests "numbers given alongside the image" directly, so it is an inference.
- "Performance drops as the design improves" (Duan, CHI 2024) plus "near chance on small differences" (Luera 2025) means a model reviewer is most useful for catching gross faults on early or broken builds and least useful for final polish. Expect more false positives on a good page, so a critique loop needs a stop rule and a "no issue found" answer must be allowed.
- Over-applied guidelines and misjudged conventions suggest telling the model the deliberate house decisions up front (for example a deliberately yellow final CTA, deliberate off-white text) so they are not reported as defects.
- Multiple viewport widths and cropped regions are supported indirectly: UXBench includes a both-viewports mode, and the Duan 2025 pipeline shows zoomed patches help. No study found isolates the effect of viewport count on critique accuracy.
- The 2026 Springer result (kappa >= 0.81 on aesthetics with newer models) conflicts in tone with Luera 2025 (weak per-factor correlation with older models). Possible reasons: newer models, expert raters versus crowd raters, coarser rating bins. Treat as unresolved until the Springer paper is read in full.
- All studies compare models with humans who themselves agree poorly (Fleiss kappa 0.10 to 0.29). "Agreement with designers" has a low ceiling; a reported gap partly reflects designer disagreement.

### Gaps
- No study found on judging marketing-site visual design specifically (brand fit, typography quality, dark themes). The datasets are mobile app screens (UICrit), emails/receipts/catalogues (Luera) and generic web fixtures (UXBench).
- No study found testing models on small text legibility or on counting UI elements in real screenshots; BlindTest covers abstract geometry only.
- No credible engineering write-up of a production "agentic visual QA" loop with measured accuracy was found in this session; only vendor blogs without numbers surfaced, so none are cited.
- Set-of-Mark's numeric gains were not re-read from the paper this session.
- UXBench's human validation numbers (pages 9 onward) and its seven rubric dimension definitions were not read in full.
- The Springer chapter's full method and exact figures were not opened.

## 6. Free open source tools that overlay boxes, grids or measurements on screenshots for a model

### Takeaway
There are a few small free libraries for numbered element marks (Set-of-Mark style), but nothing mature for design-measurement overlays (spacing, baseline grids, alignment guides). Playwright provides everything needed to draw such overlays in-page in a few lines, and the research says coordinate rulers and numbered marks help while dense grids hurt.

### Cited Findings
- WebMarker (reidbarber/webmarker, npm `webmarker-js` 0.7.0, MIT): injects labelled bounding-box overlays on interactive elements for Set-of-Mark prompting; `mark()` returns an object keyed by label. [GitHub](https://github.com/reidbarber/webmarker); [npm registry, 2026-11-19](https://www.npmjs.com/package/webmarker-js)
- Microsoft SoM (github.com/microsoft/SoM): reference code for Set-of-Mark; relies on segmentation models (SEEM, Semantic-SAM, SAM) rather than the DOM. A copied demo script header says MIT; the repo licence file was not opened. [arXiv 2310.11441](https://arxiv.org/abs/2310.11441); [demo script copy](https://huggingface.co/spaces/ZHUZHUXIA2025/SoM/blob/main/demo_gpt4v_som.py)
- GitHub's `set-of-mark` topic lists further small projects, including one combining Playwright with Set-of-Mark and one using classic computer vision with no model downloads. Not individually vetted. [GitHub topic](https://github.com/topics/set-of-mark)
- Playwright MCP (microsoft/playwright-mcp) works from accessibility snapshots and has an option to include each element's bounding box in CSS pixels relative to the viewport, which gives a model coordinates as text instead of asking it to read them off pixels. [GitHub](https://github.com/microsoft/playwright-mcp)
- Playwright `locator.boundingBox()` returns an element's box or null if not visible. [Playwright Locator API](https://playwright.dev/docs/api/class-locator)
- Research guidance on overlay style: coordinate labels on the screenshot edges and numbered patches helped; a full grid overlay reduced localisation accuracy below the no-overlay baseline. [arXiv 2407.08850](https://arxiv.org/html/2407.08850v3)
- pixelmatch 8.0.0 (ISC) is a free pixel-diff library usable for before/after and reduced-motion frame comparisons. [npm registry, 2026-11-19](https://www.npmjs.com/package/pixelmatch)

### Inferences
- The most reliable free overlay for layout review is self-built with `page.evaluate`: draw numbered outlines only on the elements under review (section containers, headings, CTAs), add pixel rulers on the top and left edges, and send the model both the marked screenshot and a JSON table of id, selector, x, y, width, height, font size and computed gaps. The model then cites ids and numbers instead of estimating positions.
- Keep overlays sparse. The UICrit grid result implies that a 12-column grid drawn over the whole page is likely to hurt; show column guides as edge ticks instead.
- Always pair a marked screenshot with an unmarked one, since marks cover the very pixels (spacing, edges) the model is asked to judge. This is an inference; no study found tests it.

### Gaps
- browser-use and OmniParser are widely described as doing numbered-box overlays, but only secondary blog descriptions surfaced; their repositories and licences were not checked.
- No free tool was found that annotates spacing or alignment measurements (redlines) onto a live page screenshot for model consumption.
- WebMarker's maintenance status and Playwright integration details were not verified beyond the npm version and licence.
