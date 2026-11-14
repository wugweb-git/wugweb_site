> Research for the wugweb-work skill plan, run 2026-10-19 (read-only). The plan itself is on Notion: https://app.notion.com/p/415bb710b9ab818b8057cc9b2c2ed922

# Content inventory of the 44 case studies

I've inventoried all 44 published case studies (no drafts). The real shapes are narrower than imagined: 19 rich pages built from one identical template, 18 text-only pages, 7 legacy stubs, and almost no metrics, testimonials or FAQs anywhere.

Everything was read-only: Sanity GROQ fetches, the real parser imported directly from `src/lib/case-body.ts`, and HTTP range reads of all 761 unique media URLs. **The `NOTION_TOKEN` in `.env` is rejected by Notion ("API token is invalid")**, so `scripts/sync-notion-case-studies.mjs` would currently fail. I read the Notion data source through the connected Notion MCP instead (schema fetch plus read-only SQL).

## 1. What the page really receives

- **37 docs have `bodyMarkdown`** and render through `parseCaseBody` in `src/pages/work/[slug].astro`. The **7 without it are all `noIndex: true`** and use the legacy layout.
- **Two body shapes:**
  - **19 "rich" bodies:** title line, meta, Notion short copy, `## Media`, `## Sanity site copy`, and on 13 of them `## Gallery (site assets)`. When long copy exists, the short copy is never rendered.
  - **18 "thin" bodies:** meta plus short copy only. 16 have no URL at all; SBS Transit and ad:tech have one bare video in a Gallery.
- **Where media goes:**
  - Cover goes to the hero.
  - Challenge, Solution, Design Philosophy/DP and Conclusion/Filler images go after their section. Conclusion/Filler falls back to the last section.
  - Thumbnail and About media go into **About**, so every rich page shows its 4:3 listing loop video inside About.
  - Styles go to a 2-up row in About. Unlabelled Gallery items go to a closing grid. `extraMedia` goes to a carousel.
- **What the parser hides:** client logos, repeated URLs, and any image whose folder differs from the doc's majority folder ("borrowed"). Videos are never hidden.
- **What body mode ignores:** Sanity `results`, `platform`, `year`, `country`, `timeline`, `specialThanks` and `services`. Only body meta, Subtitle and Tags reach the page, so **no metric is rendered anywhere today**.

**Parser behaviour that changes the content you actually see:**
- **Collapsed thin pages:** 15 thin bodies use tab-indented `\t### Solutions/Impact/Strategic Insights` headings, which the parser does not recognise.
  - Each collapses into one "Challenges" section with 17 untitled tiles and 20 loose paragraphs, including 3 literal `### **Solutions**`-style lines.
  - Affected: Eekenlife, Global Trade Finance, ITC, Labelly, LinkedIn, NSL, RAK, Stayweb, Wave, Witty Vegan, Woodkraft, Wugweb, HRMS, Kits, iKan.
- **Detached descriptions:** the thin item format (`- **Title**` then an indented description line) gives title-only tiles with the descriptions as separate paragraphs, on all 18 thin docs. SBS Transit, Suzlon and ad:tech keep 5 sections but every tile is untitled.
- **No About:** Labelly, LinkedIn and Stayweb have no About section, so the page opens on "Challenges".
- **Literal hashes:** Aditya Birla Capital's long copy uses `####`, giving 10 tile titles that start with "####".
- **Lost tile:** in Airtel Xsafe, `**Immersive Visual Storytelling:**` ends with a colon, so Solutions shows 5 tiles plus 3 paragraphs instead of 6.
- **Raw markdown in meta:** Valyu's Client meta shows as `[VALYU.ai](http://valyu.ai/)` because `&lt;dd&gt;` prints raw text.
- **Broken images:** a Google Drive "view" link (Adneto, labelled DP Video) and an extensionless 404 (`…/metcred/challenges`) are rendered as `&lt;img&gt;`.
- **Cropping:** `.b-video` forces 16:9 crop, but thumbnail videos are 4:3.

## 2. `caseStudy` schema (`sanity/schemaTypes/caseStudy.ts`)

Fill counts are out of 44 published docs.

- **Overview:** title 44, shortTitle 44, subtitle 44, slug 44, owner 44, summary 44, thumbnailPath 22 (all mp4), coverPath 22 (19 images, 3 mp4), coverImage 0, client (legacy text) 44, disciplines[] 44, industry (text) 44, timeline 27, partner 35 (only 15 real; 19 "None", 1 "—"), team[] (strings) 44, tags[] 44, language 44, bodyMarkdown (read-only) 37.
- **Narrative (legacy):** about 41, challenges[] 41 (4 each), solutions[] 41 (6 each), designPhilosophy 41, impact[] 41 (4 each).
- **Media:** galleryPaths[] 21 docs (1–41 paths). There is no dedicated video field; only a `video` type inside `bodyContent`.
- **Custom blocks:** bodyContent 44. Only `block` (44 docs) and `mediaUrl` (5 docs, 111 blocks) are used.
- **Results:** `results[] {metric, label}` on 6 docs. **5 of the 6 are plain strings** ("1 week | …"), not the declared array; only Gratify holds a real 4-item array. publishedAt 44 (only two distinct values), featured 44 (35 true).
- **SEO:** seoTitle 44, seoDescription 44, focusKeyword 44, canonicalUrl 44 (all self), ogImagePath 19, ogImage/ogTitle/ogDescription 0, **noIndex 7**.
- **Relations:** clientRef 44, industryRef 44, **services 0, assets 0, relatedCaseStudies 0, relatedPosts 0**, syndicatedTo 0.
- **Not in the schema at all:** testimonial (14 testimonial docs exist, none tagged wugweb/both), FAQ, people refs (team is strings), live URL, app-store links.
- **Present in data but undeclared:**
  - `extraMedia` (18 docs) — the page reads it, but editors can't see it.
  - aiSummary 44, schemaType 44, status 44, visibility 44, aiKeywords 38, engagementType 37, readTime 37, wordCount 37, platform 35, projectType 35, industryRefs 25, sectorRefs 25, `_system` 25.
  - country 21, specialThanks 19, clientLogoPath 19, clientLogoAlt 19, coverAlt 19, year 14.
  - thumbnailVideoPath 19, aboutVideoPath 18, designPhilosophyVideoPath 16 — all three still point at the old `wugweb.online` host.

**The 7 no-body docs:** Bodyshop, Eastman, Hyatt Restaurants and PharmaDropper all carry **NTUC U Care's copy verbatim** (same text hash). MusicLinkd, Spark Logistics and TheBizGift say "Complete original markdown from Case Study NN." None has a cover or gallery. The sitemap excludes them, but `/work` lists all 44 with no noIndex filter.

## 3. Per-case-study tables (the 37 with bodyMarkdown; noIndex is false/unset on all 37)

### 3a. Identity and meta
Every body has Subtitle, Category, Client, Industry, Disciplines, Team and Tags. The only variable keys are Partner (20 docs), Special Thanks (2) and Timeline (1). Year, Country and Platform never appear in bodies. Rendered meta items: 5–7.

| Case study | slug | Client: body → clientRef | Industry: body → industryRef | Extra meta keys |
|---|---|---|---|---|
| Aditya Birla Capital | demystifying-finance-crafting-the-ux-for-aditya-birla-capital-s-credit-score-tool | Aditya Birla Capital → same | Fintech / BFSI → Fintech | Partner (Finomenal) |
| Adneto | crafting-digital-authority-the-adneto-website-showcase | Adneto → Adneto | FinTech, Loyalty Solutions → Digital Finance | — |
| Airtel Xsafe | airtel-xsafe-securing-homes-with-intuitive-digital-experiences | Airtel → Airtel XSafe | Telecommunications, Smart Home → Smart Home | Partner (Dentsu Webchutney) |
| Airtel Xstream Play | airtel-xstream-play-showcasing-indias-unified-digital-entertainment-on-the-web | Airtel → Airtel Xstream | Telecom, Media &amp; Entertainment → Entertainment | Partner (Dentsu Webchutney) |
| Axis Bank | the-architecture-of-loyalty-designing-the-axis-bank-savings-account-platform | Axis Bank → same | BFSI (…) → Banking | Partner (Adneto) |
| Bankco | bankco-revolutionizing-financial-engagement-with-a-super-app | Adneto / Partner Banks → Adneto | FinTech, Banking → Banking | — (stray `Title:` key, ignored) |
| Cartier | cartier-redesigning-the-career-website-where-passion-meets-excellence | Cartier → Cartier | Luxury → Luxury | Partner (Publicis Sapient) |
| Eekenlife | eekenlife-redefining-footwear-e-commerce-for-the-next-generation | Paragon Footwear → Paragon | Fashion &amp; Retail → Fashion &amp; Lifestyle | Partner (Dentsu Webchutney) |
| Global Trade Finance | global-trade-finance-engineering-an-authority-first-lead-generation-engine | same → same | Business Finance → Financial Services | — |
| Gratify | gratify-the-intelligent-rewards-and-feedback-platform | Gratify → **Adneto** | E-commerce, Fintech → Digital Finance | Partner (Adneto) |
| ITC Dark Fantasy | itc-dark-fantasy-x-citadel-personalizing-the-spy-experience | ITC (for Amazon Prime Video) → ITC Citadel | Media &amp; Entertainment → Media | Partner (Dentsu Webchutney) |
| IndusNinja | indusninja-your-ai-powered-financial-ninja | IndusInd Bank → same | NeoBanking, FinTech, AI → Banking | Partner (Leo Burnett) |
| Inkompass | inkompass-cultivating-global-talent-for-a-smoke-free-future | Philip Morris International (PMI) → PMI | FMCG, Tobacco → FMCG | Partner (Publicis Sapient) |
| Kia | accelerating-loyalty-designing-kias-intuitive-customer-dashboard | Kia Motors → Kia | Automobile → Automotive | Partner (Adneto), Special Thanks |
| Labelly | labelly-immutable-product-verification-via-blockchain-integration | Labelly → Labelly | Web3 / Tech → Blockchain &amp; Web3 | — (Team "Vedanshu Srivastava," with trailing comma) |
| LinkedIn Sales Navigator | linkedin-sales-navigator-optimizing-the-social-selling-interface | LinkedIn → LinkedIn Ads | SaaS / Professional Networking → SaaS | Partner (Dentsu Webchutney) |
| Metcred | metcred-the-avant-garde-of-banking-designing-the-zero-fee-mobile-experience | Metcred → Metcred | Fintech → Fintech | — |
| NSL OilChem | nsl-oilchem-digitizing-the-lifecycle-of-industrial-waste-management | NSL OilChem Waste Mgmt → NSL Oil Chem | Environmental Services / Petrochem → Petrochemicals &amp; Waste | Partner (iCube) |
| NTUC U Care Fund | ntuc-u-care-fund-digital-transformation-for-enhanced-member-support | NTUC U Care → NTUC | Non-Profit, Social Services → Non-Profit | Partner (Icube) |
| Plufo | plufo-crafting-an-immersive-edtech-ecosystem-for-young-learners | Plufo → Plufo | EdTech → EdTech | — |
| RAK SME | rak-sme-scaling-the-tech-infrastructure-for-ras-al-khaimah-business-ecosystem | Ras Al Khaimah Government → RAK Chambers | Government → Government | Timeline (Ongoing) |
| RideEV | rideev-powering-the-phygital-ev-revolution-in-india | RideEV → RideEV | Electric Vehicles, E-commerce → eCommerce | — |
| SBS Transit | sbs-transit-engineering-the-future-of-multimodal-urban-mobility | same → same | Transportation &amp; Public Utility → Mobility | Partner (iCube) |
| Sadhan | sadhan-streamlining-driver-onboarding-and-lead-management | Sadhan Enterprise (I) Pvt. Ltd. → Sadhan | Logistics, Gig Economy → Gig Economy | — |
| Stayweb PMS | stayweb-pms-a-next-gen-hospitality-engine-powered-by-ai-and-design-systems | Stayweb → Stayweb | Hospitality → Hotels &amp; Restaurants | — |
| Suzlon | suzlon-reimagining-global-energy-through-minimalist-technical-excellence | Suzlon → Suzlon | Renewable Energy → same | Partner (Dentsu) |
| ToT Bridal | crafting-digital-elegance-the-tot-bridal-launch-story | TOT Bridal (Touch of Trend) → TOT | Fashion, Bridal, E-commerce → eCommerce | Special Thanks |
| Valyu.ai | valyu-ai-empowering-indias-workforce-with-on-demand-earned-wages | **`[VALYU.ai](http://valyu.ai/)` (raw markdown)** → Valyu.ai | Fintech, HRTech → Fintech | — |
| VisiONE | visione-empowering-workforce-development-with-competency-based-assessments | VisiONE → VisiOne | EdTech, HRTech, Talent Dev → EdTech | Partner (iCube) |
| Wave Group | wave-group-crafting-a-multi-conglomerate-interactive-experience | Wave Group → Wave | Real Estate, Manufacturing → Real Estate | Partner (Emporiom) |
| Witty Vegan | witty-vegan-democratizing-plant-based-diversity-through-culture | same → same | Food &amp; Beverage → same | — |
| Woodkraft | woodkraft-elevating-indias-largest-corporate-fit-out-legacy | Woodkraft → WoodKraft | Architecture &amp; Interior Design → Architecture &amp; Interiors | Partner (Leo Burnett) |
| Wugweb | wugweb-revamp-the-living-manifesto-of-digital-perfection | Wugweb (Internal) → Wugweb | Digital Agency → Advertising &amp; Marketing | — |
| Wugweb HRMS | unified-hrms-redefining-the-employee-lifecycle-through-automation | Internal Product / Corporate Clients → Wugweb | Enterprise SaaS / HRTech → HRTech | — |
| Wugweb Kits | wugweb-kits-the-full-stack-infrastructure-for-multi-platform-design | Internal Product / Wugweb Ecosystem → Wugweb | Design Technology → Design &amp; Technology | — |
| ad:tech &amp; iMedia | adtech-and-imedia-sculpting-the-visual-identity-of-global-martech-summits | ad:tech / iMedia → Adtech | Events &amp; Marketing Technology → Events | Partner (Comexposium) |
| iKan | ikan-the-next-generation-corporate-mental-healthcare-platform | iKan → iKan | Corporate Wellness / HealthTech → Mental Health | — |

13 docs have an `_id` that is not `caseStudy-&lt;slug&gt;`, for example `caseStudy-airtel-xsafe`, `caseStudy-cartier-careers`, `caseStudy-plufo`, `caseStudy-visione`.

**Layout limits:**

| Field | Range | Median | Longest |
|---|---|---|---|
| H1 length | 39–71 chars | 56 | Inkompass, ad:tech |
| Subtitle length | 64–90 chars | — | Aditya Birla Capital |
| Tags | 2–4 | — | — |
| Disciplines | 2–6 | — | NTUC (6) |
| Team names | 1–5 | — | — |
| Category values | 1–3 | — | — |

### 3b. Copy, as rendered
Section format below is points / paragraphs.

**The 19 long-copy docs always render the same five sections:** About, Challenges, Solutions, Design Philosophy, Conclusion. Points are always 0/4/6/3/4, and every section except About has exactly 1 paragraph.
- **About paragraphs:** 1 on Bankco, NTUC, Plufo, RideEV and Sadhan; 2 on the other 14.
- **Exception:** Airtel Xsafe Solutions has 5 points and 3 paragraphs.
- **Approximate words rendered** (long-copy words / short-copy words in brackets):

| Case study | Words | Case study | Words |
|---|---|---|---|
| Aditya Birla Capital | 571 (577/330) | Kia | 540 (546/303) |
| Adneto | 710 (716/330) | Metcred | 668 (674/307) |
| Airtel Xsafe | 460 (466/335) | NTUC U Care Fund | 531 (537/380) |
| Airtel Xstream Play | 513 (519/301) | Plufo | 608 (614/392) |
| Axis Bank | 603 (609/314) | RideEV | 579 (585/391) |
| Bankco | 598 (604/318) | Sadhan | 639 (645/385) |
| Cartier | 449 (455/323) | ToT Bridal | 555 (561/339) |
| Gratify | 663 (669/338) | Valyu.ai | 623 (629/392) |
| IndusNinja | 544 (550/369) | VisiONE | 573 (579/372) |
| Inkompass | 604 (610/348) | | |

Section word counts run from 54 (Aditya Birla About) to 252 (Adneto Solutions).

**The 18 thin docs (approximate words rendered):**
- **About 0/1 + Challenges 17/20, with 3 leaked heading lines:** Eekenlife 209, Global Trade Finance 228, ITC 217, NSL 215, RAK 211, Wave 193, Witty Vegan 201, Woodkraft 254, Wugweb 221, HRMS 213, Kits 220, iKan 226.
- **Challenges 17/20 only (no About):** Labelly 142, LinkedIn 171, Stayweb 183.
- **Five sections, untitled tiles** (About 0/1 · Challenges 4/4 · Solutions 6/6 · Impact 4/4 · Strategic Insights &amp; Design Philosophy 3/3): SBS Transit 239, Suzlon 218, ad:tech 212.
- **Intended Notion structure for all of them:** About (1 paragraph) plus Challenges 4, Solutions 6, Impact 4 and Strategic Insights 3. Each item is a bold title plus a one-line description.

No body uses `*Group*` labels; the parser's group feature is unused.

### 3c. Media
Columns are counted on `## Media` labels; "Gallery" is the `## Gallery` part. All counts are images/videos. "Borrowed" is image references from another case study's folder, all hidden by the parser.

| Case study | Media | Gallery | Cover | About | Thumb | Styles | Challenge | Solution | DP | Concl/Filler | Logo | Borrowed | Repeated URLs | extraMedia | Rendered in body | Closing items |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Aditya Birla Capital | 15/3 | 9/2 | 1 | 1v | 1 | 2 | 3 | 3 | 4 | 2 | 1 | 5 | 10 | 29/1 | 9/4 | 1 |
| Adneto | 19/3 | 0/1 | 1 | 1v | 1 | 2 | 4 | 3 | 5 | 4 | 1 | 6 | 2 | 7/0 | 12/3 | 0 |
| Airtel Xsafe | 17/3 | 0/0 | 1 | 1v | 1 | 2 | 3 | 3 | 4 | 4 | 1 | 4 | 0 | 20/5 | 12/3 | 0 |
| Airtel Xstream Play | 17/3 | 0/0 | 1 | 1v | 1 | 2 | 3 | 3 | 4 | 4 | 1 | 5 | 1 | 19/6 | 11/3 | 0 |
| Axis Bank | 17/3 | 14/2 | 1 | 1v | 1 | 2 | 3 | 3 | 4 | 4 | 1 | 3 | 15 | 0/0 | 14/3 | 1 |
| Bankco | 18/2 | 14/2 | 1 | 1v | 1 | 2 | 3 | 3 | 4 | 4 | 1 | **14** | 5 | 8/0 | 14/3 | 11 |
| Cartier | 17/3 | 0/0 | 1 | 1v | 1 | 2 | 3 | 3 | 4 | 4 | 1 | 2 | 0 | 33/1 | 14/3 | 0 |
| Gratify | 17/3 | 0/0 | 1 | 1v | 1 | 2 | 3 | 3 | 4 | 4 | 1 | 7 | 0 | 9/2 | 9/3 | 0 |
| IndusNinja | 17/3 | 11/2 | 1 | 1v | 1 | 2 | 3 | 3 | 4 | 4 | 1 | 6 | 13 | 20/2 | 11/3 | 1 |
| Inkompass | 17/3 | 35/2 | 1 | 1v | 1 | 2 | 3 | 3 | 4 | 4 | 1 | 5 | 13 | 29/1 | 35/3 | 24 |
| Kia | 18/2 | 0/1 | 1 | 1v | 1 | 2 | 3 | 3 | 4 | 4 | 1 | 3 | 2 | 17/0 | 13/2 | 0 |
| Metcred | 17/3 | 12/3 | 1 | 1v | 1 | 2 | 3 | 3 | 4 | 4 | 1 | 5 | 13 | 34/1 | 12/4 | 2 |
| NTUC U Care Fund | 17/3 | 9/3 | 1 | 1v | 1 | 2 | 3 | 3 | 4 | 4 | 1 | 7 | 12 | 41/2 | 9/4 | 1 |
| Plufo | 17/3 | 39/2 | 1 | 1v | 1 | 2 | 3 | 3 | 4 | 4 | 1 | 1 | 17 | 15/0 | 39/3 | 24 |
| RideEV | 17/3 | 10/2 | 1 | 1v | 1 | 2 | 3 | 3 | 4 | 4 | 1 | 6 | 12 | 27/1 | 10/3 | 0 |
| Sadhan | 18/3 | 29/2 | 1 | 1v | 1 | 2 | 3 | 3 | 5 | 4 | 1 | 3 | 16 | 13/1 | 29/3 | 15 |
| ToT Bridal | 17/3 | 0/0 | 1 | 1v | 1 | 2 | 3 | 3 | 4 | 4 | 1 | 4 | 0 | 19/0 | 13/3 | 0 |
| Valyu.ai | 18/2 | 10/1 | 1 | **1 image** | 1 | 2 | 3 | 3 | 4 | 4 | 1 | 7 | 11 | 30/0 | 10/2 | 0 |
| VisiONE | 18/2 | 0/0 | 1 | 1v | 1 | 2 | 3 | 3 | 4 | 4 | 1 | 6 | 0 | 24/0 | 11/2 | 0 |

- **Zero media:** the other 16 thin docs.
- **One video only:** SBS Transit (`sbs-about.mp4`) and ad:tech (`adtech-about.mp4`), each in a bare Gallery item that renders as a closing item. Their `coverPath` is the same mp4, so it shows twice. ITC has no body media but a video `coverPath`.
- **Borrowing in total:** 99 borrowed image references across the 19 rich docs.

### 3d. Results, testimonials, FAQ, credits
- **Testimonials and FAQ: 0 of 37.** The only hits are feature mentions ("testimonials and FAQs") in Airtel Xsafe, Cartier and Inkompass.
- **Credits:** Team is present on all 37 (1–5 names). Special Thanks is in the body only for Kia and ToT; Sanity's `specialThanks` holds 19 values that are never rendered.
- **Real outcome numbers exist in only 7 docs:**

| Case study | Number in body text | Results field (Notion / Sanity) |
|---|---|---|
| Gratify | "a 40% rise in AOV for Apparel"; "130% boost in New User Acquisition" (also 2.2X LTV, 48% CSAT, 32% repeat purchase) | — / real array of 4 metrics |
| RAK SME | "99.9% Platform Uptime" | "99.9% · Platform uptime…" / **not synced** |
| SBS Transit | "Accelerated feature deployment by 40%" | "40% · …" / **not synced** |
| Stayweb PMS | "50% Faster Frontend Delivery" | same / string |
| Wugweb | "3× Higher Session Duration"; "80% Faster Publishing" | same / string |
| Wugweb HRMS | "70% Fewer HR Tickets" | same / string |
| Valyu.ai | none in body | "1M+ · Indian workers given instant access to earned wages" / string |

- **Numbers that are context, not outcomes:**
  - Adneto: "14+ countries", "1,500+ brands"
  - Xstream: "target of 20 million subscribers"
  - Metcred: "5X on top spend" (a product feature)
  - Woodkraft: "75 million sq. ft."
  - Kia: Results is "1 week" (a duration)

## 4. Image shapes for 10 case studies

The 10 are the seven you named (Airtel = Xsafe) plus Kia (dashboard), ToT Bridal (brand website) and Airtel Xstream Play (campaign / motion).
- Shapes use your h/w thresholds: P = phone-screen (≥1.75), T = tall-portrait, S = square-ish, L = landscape, W = wide (&lt;0.5).
- Exact byte duplicates: **none in any doc.** The duplicates listed below are re-encodes with the same pixel size but different bytes.

| Case study | Body images (unique) | Rendered | Hidden (logo + borrowed) | Rendered shapes | extraMedia shapes | Videos |
|---|---|---|---|---|---|---|
| NTUC U Care Fund | 16 | 9 | 1+6 | L8 S1 | 41: L17 S2 T22 | 6 |
| Cartier | 17 | 14 | 1+2 | L13 S1 | 33: L6 S2 T21 P4 | 4 |
| Inkompass | 41 | 35 | 1+5 | L18 S1 T14 P1 + 1 dead | 29: L13 S1 P15 | 4 |
| Plufo | 41 | 39 | 1+1 | L31 S1 P5 + 2 dead | 15: L14 S1 | 3 |
| Airtel Xsafe | 17 | 12 | 1+4 | L12 | 20: L19 S1 | 8 (1 dead) |
| Valyu.ai | 18 | 10 | 1+7 | L9 S1 | 30: L18 S1 T4 P7 | 2 |
| IndusNinja | 17 | 11 | 1+5 | L10 S1 | 20: L6 P14 | 5 |
| ToT Bridal | 17 | 13 | 1+3 | L11 S1 T1 | 19: L16 S3 | 3 |
| Kia | 17 | 13 | 1+3 | L11 S1 T1 | 17: L11 S2 T2 P2 | 2 |
| Airtel Xstream Play | 16 | 11 | 1+4 | L10 S1 | 19: L18 S1 | 9 |
| **Total** | | **167** | | **L133 S9 T16 P6, 3 dead** | **243: L138 S14 T49 P42** | |

**Key fact:** the labelled body slots are about 80% landscape. Almost every phone or tall screen lives in `extraMedia` (the carousel) or the Gallery.

A ratio-only rule misreads desktop full-page captures as "phone": Kia `Dashboard.png` 1440×3507 and `Rewards.png` 1440×3271, Inkompass `01_Home-copy.jpg` 1920×3379, Metcred LP 1440×11656. Width ≥ ~1280 is a better tell.

Abbreviations below: Chs = Challenges Image, Ch1/Ch2 = Challenge Image 1/2, Sol = Solution, St = Styles, Fil = Filler, Con = Conclusion, +G = also in Gallery, X = extraMedia. "borrowed←X" names the folder it comes from.

**NTUC U Care Fund**
- Body:
  - Logo client-logo-grfk.png 1232×822 L (hidden)
  - Cover+G cover-image-kd0f.jpg 3680×2760 L
  - Chs+G challenges-image-9uky.jpg 6000×4500 L
  - Ch1 and Ch2 are the **same URL**: challenge-image-1-duwn.jpg 950×542 L, borrowed←ToT
  - Sol1–3+G: solution-image-1-s3p2.jpg 4500×3000 L, -2-azzj.jpg 4000×3000 L, -3-2e83.jpg 4500×3000 L
  - DP1 -1-ohd3.jpg 1182×753, DP2 -2-e1ky.jpg 1182×753 (both borrowed←ToT); DP3 -3-i2kz.jpg 950×542 (borrowed←Adneto)
  - St1+G styles-image-1-vocm.png 417×372 S; St2+G -2-0a6g.png 644×371 L
  - Fil+G filler-image-cpra.jpg 6400×4800 L; Fil2+G -2-dg4t.png 6000×4500 L
  - Con1 conclusion-image-1-m6oa.jpg and Con2 -2-74t5.jpg, both 950×542, borrowed←Adneto
- extraMedia:
  - APM02_Programme_Create.png 1440×976 L; APM04_Programs – Details Filled.png 1440×1403 S; B2-Assistance Programmes – 3.jpg 2378×1202 L
  - Cover.jpg 3680×2760 L (duplicate of the cover); Filler-2.png 2400×1800 L
  - Group 17548–17549 828×1130 T ×2; Group 17550–17551 828×1120 T ×2
  - Group 17561 and 17563–17570 1450×2447 T ×9; Group 17604–17612 1440×1056 L ×9; Group 17613–17621 1450×2447 T ×9
  - NTUC U Care Fund.png 300×200 L (tiny); NTUC.jpg 2400×1800 L
  - Solution.jpg 4000×3000 L (same size as Sol2); Style1.png 417×372 S and Style2.png 644×371 L (duplicates of the Styles pair)
- Videos:
  - Thumbnail ntuc-thumb 800×600, 5.0 s, 2.8 MB
  - About ntuc-about 720×400, 5.5 s
  - DP ntuc-dp 720×400, 4.0 s
  - Gallery ntuc-solution 600×334, 3.9 s
  - X Design_Philosophy.mp4 1280×720, **152.8 s**, 10.5 MB
  - X NTUC_Solution.mp4 2730×2048, 7.8 s

**Cartier**
- Body:
  - Logo client-logo-jrot.png 300×88 W (hidden); Cover cover-image-qrw0.jpg 1440×750 L; Chs challenges-image-0ykf.jpg 6400×4800 L
  - Ch1 -1-xrsy.jpg and Ch2 -2-p3bq.jpg 1500×857 L
  - Sol1 -1-xrct.jpg and Sol2 -2-52kw.jpg 3680×2760 L; Sol3 -3-56my.jpg 4500×3000 L
  - DP1–3 (-1-s2ry, -2-aa9g, -3-x1qg) 1500×857 L
  - St1 417×372 S; St2 644×371 L
  - Fil filler-image-ildp.png 6000×4500 L; Fil2 4500×3000 L
  - Con1 conclusion-image-2-74t5.jpg and Con2 -1-m6oa.jpg 950×542, borrowed←Adneto, hidden
- extraMedia:
  - Cartier-Homepage.jpg 1440×750 L (same size as the cover; likely a duplicate); cartier.png 1200×900 L
  - conclusion-image-1-ztuy.jpg and -2-sx4c.jpg 1500×857 L — **Cartier's own conclusion images**
  - Group-15664–15672 and 15674–15685 1000×1688 T ×21; Group-17581–17584 1000×2370 P ×4
  - search-job-2000x2000px.jpeg 2000×2000 S; Solution.png 2400×1800 L
  - Style1.png 417×372 S and Style2.png 644×371 L (duplicates)
- Videos: Thumbnail cartier-thumb 800×600, 8.1 s · About 720×400, 5.4 s · DP 720×400, 4.2 s · X cartier-solution 720×400, 4.9 s

**Inkompass**
- Body, Media part:
  - Logo client-logo-9fd5.png 300×91 W (hidden)
  - Cover+G cover-image-now0.jpg 4500×3000 L; Chs+G challenges-image-x70k.jpg 6000×4500 L
  - Ch1+G and Ch2+G 676×440 L
  - Sol1–3+G 4500×3000 L
  - DP1 design-philosophy-image-1-bh4r.jpg 2041×1500 (borrowed←Bankco); DP2 -f43i.jpg 6400×4800 and DP3 -3-m3jq.jpg 2041×1500 (borrowed←Kia)
  - St1+G 417×372 S; St2+G 644×371 L
  - Fil+G 4500×3000 L; Fil2+G 6400×4800 L (5.3 MB)
  - Con1 -2-74t5.jpg and Con2 -1-m6oa.jpg 950×542, borrowed←Adneto
- Body, Gallery part:
  - filler.webp 6400×4800 L
  - 02_Program-Details-copy.png 1920×3315 T; 01_Home-copy.jpg 1920×3379 P (actually a desktop capture); 03_Discover-PMI-copy.png 1920×3315 T
  - **02_Program-Details-copy-1.png is a 404 on wugweb.pages.dev**
  - 01-1.png 1000×1686 T
  - 02-1, 03-1, 4_04, 04-1, 05_01, 5_02, 5_03, 5_04, 06-1, 7-1, 8-1 (.png): 860×1450 T ×11
  - Artboard-–-1, 2, 5, 6, 7, 8, 9 (.png): 1600×800 L ×7
- extraMedia:
  - 01_Home_Hamburger, 01_Home, 02_Program Details, 03_Discover PMI, 04_Explore Opportunities, 05_01_Market Scenario 2 – 1, 05_01_Market Scenario 2 – 2, 05_03_Market Scenario 3 – 2, 05_04_Market Country Dropdown, 06_Testimonial, 07_FAQs, 09_Company Information – 2, 17_404 (.png): 750×1626 P ×13
  - Group 56938.png 750×1764 P; Group 56939.png 750×1756 P
  - 08_Contact-Us.jpg 1920×1080 L
  - Chanllenges.jpg 6000×4500 L (same size as Chs); Cover.jpg 4500×3000 L (duplicate of the cover)
  - Filler-1.jpg 2400×1600 L; Filler-2.jpg 2400×1800 L; Impact-5.jpg and Impact-6.jpg 2400×1344 L
  - Inkompass.jpg 2400×1800 L; inkompass.png 1180×885 L
  - Solution-1/2/3.jpg 4500×3000 L (duplicates of Sol1–3)
  - Style 1.png 417×372 S and Style 2.png 644×371 L (duplicates)
- Videos: Thumbnail 800×600, 5.0 s · About+G 720×400, 5.5 s · DP+G 720×400, 3.5 s · X Inkompass_Design-Philosophy.mp4 2562×1748, 5.6 s, 8.3 MB

**Plufo**
- Body, Media part:
  - Logo 300×200 (hidden)
  - Cover+G 6400×4800 L; Chs+G 4000×3000 L; Ch1+G and Ch2+G 950×542 L
  - Sol1–3+G 6000×4500 L (Sol3 is 4.9 MB)
  - DP1–3+G 950×542 L
  - St1+G 417×372 S; St2+G 644×371 L
  - Fil+G 4000×3000 L; Fil2+G 4500×3000 L
  - Con1+G 950×542 L; Con2 conclusion-image-2-j5c9.jpg 950×542, borrowed←Xstream
- Body, Gallery part:
  - Plufo-Login-Web-–-12, 14, 15, 23: 1920×1080 L ×4
  - Plufo-Login-Web-–-16, 17, 19, 20, 24: 500×881 P ×5
  - **Plufo.png and Group-56973.png are 404s on wugweb.pages.dev**
  - Style-board.png 1285×828 L
  - Group-56970–56972 and 56974–56976: 1300×1100 L ×6 (h/w 0.846, just under the square threshold)
  - Group-56960–56965: 1295×750 L ×6
- extraMedia:
  - Cover.jpg 2400×1800 L; mapped-assets__Plufo.png 1200×900 L
  - Mask Group 407–410: 1700×1000 L ×4
  - P04_Home – 2, P05_achedule – 1, P05_achedule, P05_FAQ, P05_message, P05_Profile – 1: 1024×768 L ×6 (the two "achedule" files are both about 106 KB and likely identical)
  - Style1.png 417×372 S; Style2.png 644×371 L
  - uncode_case_plufo…__Plufo.png 300×200 L (tiny)
- Videos: Thumbnail 1600×1000, 9.0 s · About+G 1080×600, 4.0 s · DP+G 600×334, 6.7 s

**Airtel Xsafe**
- Body:
  - Logo 475×168 W (hidden); Cover 4500×3000 L; Chs challenges-image-la0i.jpg 1223×689 L
  - Ch1 and Ch2 2041×1500 L
  - Sol1 3680×2760 L; Sol2 6000×4500 L; Sol3 solution-image-3-5685.jpg 4500×3000 L
  - DP1 9496×5316 L
  - DP2 2041×1500, DP3 950×542, St1 417×372 and St2 644×371 are all borrowed←Xstream, **so this page renders no Styles row**
  - Fil 2400×1800 L; Fil2 4500×3000 L
  - Con1 and Con2 9496×5316 L
- extraMedia:
  - 01-2.png 1920×1440 L; 02.png 4800×3600 L; 04.png 1920×1384 L; 06.png 1920×1440 L; 360Cam_Expanded.png 1920×1080 L
  - Airtel Xsafe 1 – 1/2/4/5/7/8.jpg and Airtel-Xsafe-1-–-6.jpg: 2400×1800 L ×7
  - Cover.jpg 4500×3000 L (duplicate)
  - Group 5927–5931 about 1224×689 L ×5 (5929 and 5930 match Chs at exactly 1223×689; possible duplicates)
  - Style1.png 417×372 S; Style2.png 644×371 L
- Videos:
  - **Thumbnail Xsafe_thumb.mp4 is a 404 on wugweb.online**
  - About 1080×600, 3.7 s · DP 960×720, 3.0 s
  - X: 03.mp4 2320×1740, 10 s, 9.5 MB · 07.mp4 2732×1536, 2.2 s · three UUID-named mp4s (800×600, 1440×1080, 853×640), 10 s each

**Valyu.ai**
- Body:
  - Logo 326×155 W (hidden)
  - Cover+G 4500×3000 L; **About Image+G 2400×1800 L** (the only About image anywhere); Chs+G 6000×4500 L
  - Ch1 and Ch2 950×542, borrowed←Plufo
  - Sol1+G 4500×3000 L; Sol2+G 4000×3000 L; Sol3+G 6000×4500 L
  - DP1 borrowed←RideEV; DP2 and DP3 borrowed←Gratify (all 950×542)
  - St1+G 417×372 S; St2+G 644×371 L
  - Fil+G 4500×3000 L; Fil2+G 2677×1610 L
  - Con1 borrowed←Plufo; Con2 borrowed←Xstream (both 950×542)
  - Result: the Challenges, DP and Conclusion sections lose all numbered images.
- extraMedia:
  - 1.png–9.png 1920×1080 L ×9
  - **899-Wub Web-Airtel-295.png** 1920×1080 L
  - banner.png, Company missing – 1.png, Company-missing.png, Landing-page-–-1.jpg, Login.png, VALYU copy.png: 1920×1080 L
  - Group-15118–15121 1223×2064 T ×4; Group-15122.png 2677×1610 L (same size as Fil2)
  - Landing page – 2.jpg 1080×1080 S; Valyu.png 2400×1800 L
  - Screenshot 2024-03-17 at 1.53.24 / .29 / .34 / .39 / .44 / .49 / .55 PM: phone screens of inconsistent size (628–678 × 1194–1250)
- Videos: Thumbnail 800×600, 5.4 s · "DP Video URL" is actually **Valyu-about.mp4** 852×480, 4.1 s (also in Gallery) · there is no About video

**IndusNinja**
- Body:
  - Logo 300×268 S (hidden)
  - Cover+G 6000×4500 L; **Chs+G challenges-image-p8w9.gif 600×450 animated GIF**
  - Ch1 1500×857 (borrowed←Cartier); Ch2 950×542 (borrowed←ToT)
  - Sol1+G and Sol2+G 6000×4500 L (Sol2 is **6.0 MB**); Sol3+G 4500×3000 L
  - DP1 and DP3 are the **same URL**, 1500×857 borrowed←Cartier; DP2 1500×857 borrowed←Cartier
  - St1+G 417×372 S; St2+G 644×371 L
  - Fil+G and Fil2+G 2400×1800 L
  - Con1 950×668 borrowed←Kia; Con2+G 950×668 L
  - Gallery Solution.jpg 2400×1800 L
- extraMedia:
  - 1, 2, 4, 5, 7, 8, "10 – 1", "11 – 3", "11 – 5", "11 – 6", "11 – 7", 11, "12 – 1", 12 (.png): 900×1950 P ×14. **7.png and 8.png differ by 6 bytes.**
  - **Airtel Xsafe 1 – 3/7/8/11/12/13.png: 2400×1800 L ×6 — another client's files**
- Videos: Thumbnail 800×600, 4.0 s · About+G 846×646, 8.0 s · DP+G 2320×1740, 3.3 s · X 06_Indusind_Ninja.mp4 2320×1740, 6.7 s, 10.3 MB · X "slice (online-video-cutter.com).mp4" 960×720, 4.0 s

**ToT Bridal**
- Body:
  - Logo client-logo-enb1.png 300×89 W — the file lives in Adneto's folder (hidden)
  - **Cover 5958×5727 S** (the only square cover); Chs 3680×2760 L
  - Ch1 challenge-image-1-duwn.jpg 950×542 L (this is the shared stock file other docs borrow); Ch2 950×668 borrowed←Xstream
  - Sol1 6000×4500 L; Sol2 4500×3000 L; Sol3 4350×2447 L
  - DP1–3 1182×753 L
  - **St1 417×510 T and St2 644×510 L** (the Styles pair is a different size from every other doc)
  - Fil 1280×871 L; Fil2 4500×3000 L
  - Con1 and Con2 950×542 borrowed←Adneto
- extraMedia:
  - 01-Free-iPad-Pro-With-Magic-Keyboard-Mockup.jpg and 01-Free-Macbook-Pro-Mockup-On-Podium.jpg: 4500×3000 L
  - 1195702_OS5KHU1.jpg 2207×2207 S; 6541956_66.jpg 3000×2400 L; 8887533_738.jpg 4000×3000 L; 9070912_156.jpg 2400×1350 L; 9425749_11369.jpg 3300×2700 L; 9550771_230.jpg 2400×1600 L (stock-style numeric IDs)
  - 416617103_…-Recovered.jpg and -Recovered1.jpg 5958×5727 S (cover variants)
  - Frame 1618872775.png 1280×871 L (same size as Fil)
  - Free_Hand_Holding_iPhone_16_Pro_Mockup.jpg 6000×4500 L; Free-Keyboard-With-Tablet-Mockup.jpg 4000×2700 L
  - Image1–Image5.png 2352×1376 L ×5; Image0008.jpg 6000×4500 L
- Videos: Thumbnail 800×600, 5.4 s · About 1944×1080, 4.0 s · DP 1080×600, 4.0 s

**Kia**
- Body:
  - Logo 300×86 W (hidden); Cover 5114×3855 L; Chs challenges-image-bce5.png 4000×3000 L
  - Ch1 950×542 borrowed←ToT; Ch2 950×542 L
  - Sol1 solution-image-1-cnws.jpg 2500×2000 L; **Sol2 -2-4wf2.jpg 4000×6000 T**; Sol3 -3-luhb.jpg 6000×4500 L
  - "DP" (unnumbered) and DP1 are the **same URL**, 6400×4800 L; DP2 1182×753 borrowed←ToT; DP3 2041×1500 L
  - St1 417×372 S; St2 644×371 L
  - Fil 3680×2760 L (4.2 MB); Fil2 4500×3000 L
  - Con1 950×542 borrowed←Adneto; Con2 950×668 L
- extraMedia:
  - 455-td-8099-td-mockup.jpg 5000×3333 L
  - 417379471_….png 4000×3000 L (same size as Chs); 417392763_….jpg 6000×4500 L (same as Sol3); 418301362_….jpg 4000×6000 T (same as Sol2); d9df15ce-….jpg 2500×2000 L (same as Sol1)
  - challenge-image-1-nyzk.jpg and conclusion-image-1-rwz2.jpg 950×542 L — **Kia's own versions of the borrowed slots**
  - Customers.png 1440×1684 S; **Dashboard.png 1440×3507 P**; Home page.png 1440×1000 L; Loyalty.png 1440×1779 T; **Rewards.png 1440×3271 P** (both "P" files are desktop full-page captures)
  - Frame 1618872755.png 644×371 L; Free-iPad-Pro-Mockup.jpg 2400×1600 L; Scene-13.jpg 2400×1800 L
  - Style1.png 417×372 S; Style2.png 644×371 L
- Videos: Thumbnail 1600×1200, 7.3 s · About+G 720×400, 4.7 s · no DP video

**Airtel Xstream Play**
- Body:
  - Logo 300×139 W (hidden); Cover 7700×5300 L
  - Chs and Sol3 are the **same URL**, an Xsafe file (solution-image-3-5685.jpg 4500×3000), hidden
  - Ch1 950×668 L; Ch2 950×542 L
  - Sol1 and Sol2 2400×1800 L
  - DP1 and DP3 1182×753 borrowed←ToT; DP2 6400×4800 borrowed←Kia
  - St1 417×372 S; St2 644×371 L
  - Fil 2400×1800 L; Fil2 6400×4800 L (5.3 MB)
  - Con1 and Con2 950×542 L
- extraMedia:
  - 02_AirtelXtream.png and 05_AirtelXtream.png 2400×1800 L
  - "aiftel – 2", "aiftel – 3", "aiftel – 4" (.jpg), aiftel.jpg, aiftel.png, Airtel 1.jpg: 2400×1800 L ("aiftel – 3" and "aiftel – 4" are within 1.4% in size; aiftel.jpg and aiftel.png are the same art)
  - airtelxtream.png 1200×900 L
  - **Its own challenges-image-25bd.jpg 2400×1800 and design-philosophy-image-1/2/3 (950×542, 2041×1500, 950×542)**, unused by the body
  - Filler-Image-2.jpg 2400×1800 L; Filler-Image.jpg 4500×3000 L
  - iPad-Pro-Showcase-Scene-Free-psd-Mockup.jpg 2400×1652 L
  - Solution-1.jpg 6000×4500 L; Solution-2.jpg 2229×2400 S; Solution-3.jpg 3680×2760 L
- Videos: Thumbnail 960×720, 6.1 s · About 1080×600, 6.1 s · DP 1080×600, 4.6 s · X: 03_AirtelXtream.mp4 2330×1748, 4.6 s, **17.2 MB**; 04_AirtelXtream.mp4 2330×1748, 3.6 s; four UUID-named mp4s, 3.0–6.2 s

**Shape counts for the other 9 media docs** (rendered body / extraMedia):
- **Aditya Birla Capital:**
  - Images: rendered L8 S1. extraMedia: T9 (1400×1759), P7 (360×1902, h/w 5.3), S12 (468×529 and 492×552 component cards), L1. 7 near-identical pairs.
  - Videos: the Thumbnail is **inkompass-thumb.mp4**, and both About URLs are dead.
- **Adneto:** rendered L11 plus 1 broken Drive "image". extraMedia L7, all device mockups.
- **Axis Bank:** rendered L13 S1. No extraMedia. Filler and Filler 2 are the same 6000×4500, 4.8 MB image.
- **Bankco:** rendered L11 S3, all from the Gallery. extraMedia L6 S2.
- **Gratify:** rendered L9. extraMedia L9, plus adneto-about and adneto-thumb videos.
- **Metcred:**
  - Rendered L10 S1 plus 1 broken image.
  - extraMedia: L16, P18 (390×844 ×12, 390×1125 ×2, and `Landing Page Home (Revised).jpg` **1440×11656**).
- **RideEV:**
  - Rendered L9 S1.
  - extraMedia: L12, T7 (1191×2009), P5, W2, S1.
  - Plus X Design_Philosophy.mp4 25.6 s, **24.6 MB**.
- **Sadhan:** rendered L14 S4 T11 (1719×2899 composites ×11). extraMedia L11 T1 S1. Its DP video is 3000×1732, 11.2 s.
- **VisiONE:** rendered L10 S1. extraMedia L19 S5 (1366×917 ×13).

**Video patterns across all 78 mp4 URLs (75 playable, 3 dead):**
- Every rich doc has a Thumbnail video (19). About videos exist on 18 (not Valyu); DP videos on 16 (not Kia, VisiONE, Bankco). There are 23 extra videos in `extraMedia`.
- Thumbnails are mostly 800×600 4:3 (12 docs), cropped by the 16:9 rule. About/DP videos are mostly 720×400 or 1080×600 at about 1.8:1.
- Labelled videos run 3–11 s; extras run 2.2–152.8 s.
- **Most files keep the moov atom at the end of the file**, so playback cannot start until the end has loaded.

## 5. Notion data source "Case Studies"

**49 rows:** 44 Published/Synced and 5 Draft/Notion-only (CS-003 sellsage, CS-004 pvr-cinemas-loyalty, CS-007 career-health-assessment, CS-015 Adneto Merchant Platform, CS-028 Greenko; none has body content). There are 64 properties; fill counts below are out of 49.

| Property | Type | Filled |
|---|---|---|
| Case Study ID | title | 49 |
| Title | text | 49 |
| Short Title | text | 46 |
| Subtitle | text | 46 |
| Slug | text | 49 |
| Sanity ID | text | 49 |
| Legacy IDs | text | 19 |
| Status | select (Published 44 / Draft 5) | 49 |
| Sync Status | select (Synced 44 / Notion only 5) | 49 |
| Visibility | select | 49 |
| Language | select | 49 |
| Schema Type | select | 49 |
| Featured | checkbox | 37 checked |
| Owner | relation | 49 |
| Author | relation | 49 |
| Publish Date | date | 44 |
| Last Updated | date | 36 |
| Body Content | text | 37 |
| Excerpt | text | 49 |
| **Results** ("metric \| label" lines) | text | **7** |
| AI Summary | text | 49 |
| AI Keywords | text | 49 |
| Word Count | number | 37 |
| Read Time (min) | number | 37 |
| Partner | text | 37 (many "None"/"—") |
| Team | text | 46 |
| Special Thanks | text | 19 |
| Timeline | text | 27 |
| Year | number | 15 |
| Country | text | 25 |
| Platform | text | 46 |
| Project Type | text | 46 |
| Engagement Type | text | 46 |
| Primary Discipline | select (8 options) | 46 |
| Additional Disciplines | text | 46 |
| **Live URL** | url | 5, **all "—"** |
| **Prototype URL** | url | 5, **all "—"** |
| Cover Image | url | 23 |
| Cover Image Alt | text | 44 |
| Thumbnail | url | 20 |
| Thumbnail Video | url | 23 |
| About Video URL | url | 19 |
| Design Philosophy Video URL | url | 15 |
| Client Logo | url | 19 |
| Client Logo Alt | text | 44 |
| OG Image | url | 19 |
| Assets | relation | 25 (1–21 each) |
| SEO Title | text | 49 |
| SEO Description | text | 49 |
| Focus Keyword | text | 49 |
| Canonical URL | text | 44 |
| Client (Master) | relation | 48 |
| Industry (Master) | relation | 48 (1–4 each) |
| Primary Industry | relation | 25 |
| Category (Master) | relation | 49 (1–3 each) |
| Tags (Master) | relation | 46 (1–4 each) |
| **Services** | relation | **49 (1–5 each)** |
| **Related Case Studies** | relation (self) | **49 (exactly 3 each)** |
| Related Posts | relation | 31 (1–3 each) |
| Publications | relation | 0 |
| Published At | multi_select | 0 |
| Filter Category / Published On / Sector (Master) | rollups | not measurable through the connector |

- **What the sync carries:** the sync script reads only Case Study ID, Slug, Sanity ID, Title, Short Title, Body Content, SEO Title, SEO Description, Focus Keyword and Canonical URL. Services, Related Case Studies, Related Posts, Results, Year, Timeline and the media URLs never reach Sanity.
- **What Notion has that a page could use:** Results (7), Services (49), Related Case Studies (49 × 3), Related Posts (31), Year, Timeline, Country, Platform, Project Type, Team, Special Thanks, the three video URLs and Excerpt.
- **What it doesn't have:** no testimonial, FAQ, structured metrics, app-store links or credited roles. Live and Prototype URLs are placeholders only.

## 6. Content archetypes

1. **Mobile app, screen-led** — 14–35 phone or tall screens, mostly in the carousel. IndusNinja, Metcred, Valyu.ai, Sadhan, Aditya Birla Capital (web app with mobile flows and component-state sheets), and Bankco (degraded, since its own images are hidden).
2. **Responsive web platform or portal with large mixed screen sets** — desktop full-page captures plus mobile screens, 24–64 images. NTUC U Care, Inkompass, Cartier, VisiONE, Plufo, RideEV.
3. **Dashboard / enterprise** — desktop data screens and very long desktop captures. Kia, Axis Bank, Gratify.
4. **Marketing or campaign site, led by mockups and motion** — 2400×1800 device mockups and many short loop videos (Xstream has 9 videos, Xsafe 8). Airtel Xsafe, Airtel Xstream Play, ToT Bridal, Adneto.
5. **Thin, text-only** — about 140–255 words, 0 images; 15 have no cover at all. All 18 thin docs:
   - Internal or product with metrics: Wugweb, Wugweb HRMS, Wugweb Kits, Stayweb PMS.
   - Enterprise or government platforms: NSL OilChem, RAK SME, SBS Transit, LinkedIn, iKan, Global Trade Finance.
   - Brand, campaign or corporate: ad:tech &amp; iMedia, ITC Dark Fantasy, Witty Vegan, Labelly, Wave Group, Woodkraft, Suzlon, Eekenlife.
6. **Legacy noIndex stubs** — Bodyshop, Eastman, Hyatt Restaurants, PharmaDropper (NTUC's copy), and MusicLinkd, Spark Logistics, TheBizGift (placeholder text).

**Cross-cutting traits:**
- **Has metrics:** Gratify, RAK SME, SBS Transit, Stayweb, Wugweb, HRMS, Valyu.
- **"Brand identity with styles or moodboard" doesn't exist as real content.** Every rich doc carries the same template Styles pair (417×372 + 644×371). The brand-led projects are all thin with no images. The only real style board is Plufo's `Style-board.png`.

## 7. Edge cases the layout must survive

- **Media extremes:**
  - **No media and no cover:** 15 docs. **Video-only:** 3 (SBS Transit, ad:tech, ITC), where the same video can appear as cover and closing item.
  - **Largest image sets:** Inkompass 64 shown (35 in the body + 29 in the carousel), Plufo 54, NTUC 50, Cartier 47, Metcred 46. **Largest closing grids:** 24 (Inkompass, Plufo) and 15 (Sadhan).
  - **Videos per page:** up to 9 (Xstream); 8 on Xsafe.
- **Image proportions and sizes:**
  - **Extreme ratios:** 1440×11656 (h/w 8.1) and 360×1902 (h/w 5.3). In the 560 px-tall carousel these render as slivers about 69 px and 106 px wide.
  - **Odd images:** tiny 300×200 carousel items; an animated GIF in a labelled slot; WebP files; a square cover (ToT).
  - **Huge source files:** up to 9496×5316, and 7.4 MB (Axis Sol2). More than 20 images exceed 4 MB.
- **Copy shapes:**
  - **Sections:** sections with 0 points and 1–2 paragraphs (About, always); a 17-point single section (the collapsed thin docs).
  - **Length:** long copy runs 449–710 words; the longest section is 252 words.
  - **Meta and hero text:** meta grid of 5–7 items; H1 up to 71 characters; subtitle up to 90 characters; Disciplines up to 6.
  - **Not present at all:** single-point sections, `*Group*` labels, quotes, FAQs and tables.

## 8. Anomalies

1. **Dead or non-media links (8):**
   - Aditya Birla About Video: `wugweb.online/…/abc_about.mp4` (404) and Gallery `wugweb.pages.dev/…/abc-about.mp4` (404).
   - Airtel Xsafe Thumbnail: `wugweb.online/…/Xsafe_thumb.mp4` (404).
   - Inkompass `…/uncode/case/…/02_Program-Details-copy-1.png` (404).
   - Plufo `…/uncode/case/…/Plufo.png` and `…/Group-56973.png` (both 404).
   - Metcred `wugweb.pages.dev/assets/work/metcred/challenges` (404, no extension).
   - Adneto DP "video": a Google Drive HTML page.
   - Other non-R2 links: Adneto's `cdn.dribbble.com` mp4 (works). All 81 `coverPath`, `thumbnailPath`, `ogImagePath` and logo paths resolve fine.
2. **Wrong-brand files shown as this client's work:**
   - IndusNinja carousel: 6 "Airtel Xsafe 1 – N.png".
   - Valyu carousel: "899-Wub Web-Airtel-295.png".
   - Aditya Birla's Thumbnail video is Inkompass's.
   - Gratify's majority folder is Adneto's, so 4 genuine Gratify images are hidden and Adneto's are shown. Its carousel also plays adneto-about and adneto-thumb.
   - Bankco: 14 of 18 labelled images (Cover, logo, Sol1/3, all DPs, Styles, Fillers, Conclusions) point to Adneto/Kia/ToT. Its Gallery plays adneto-about, and its listing `thumbnailPath` is adneto-thumb.mp4.
   - ToT's client-logo file sits in Adneto's folder.
3. **Body points at shared stock while the correct own file sits unused in the carousel:**
   - **Cartier:** conclusion 1/2.
   - **Kia:** challenge 1 and conclusion 1.
   - **Airtel Xstream Play:** challenges image and DP1–3.
   - **Airtel Xsafe:** Styles pair (so no Styles row renders).
4. **Duplicates:**
   - Re-encoded duplicates in the carousel of images already in the body (same pixel size, different bytes):
     - Styles pair: NTUC, Cartier, Inkompass, Plufo, Xsafe, Kia.
     - Cover: NTUC, Inkompass, Xsafe, Cartier, ToT.
     - Solutions: Inkompass, Kia.
     - Challenges: Inkompass.
     - Filler: ToT, Valyu.
   - Same URL used for two slots: NTUC Ch1 = Ch2; Xstream Chs = Sol3; IndusNinja DP1 = DP3; Kia DP = DP1.
   - Near-identical files: IndusNinja 7.png / 8.png (6 bytes apart); Axis Filler = Filler 2; plus pairs in Aditya Birla, Metcred, RideEV, Sadhan and VisiONE.
5. **Sync and data drift:**
   - Sanity `results` holds strings instead of the declared array on 5 docs. Notion Results for RAK SME and SBS Transit never reached Sanity; Gratify's metric array exists only in Sanity.
   - Services, Related Case Studies and Related Posts are filled in Notion but empty in Sanity.
   - `extraMedia` and 21 other fields exist in data but are undeclared in the schema.
   - Body Partner (Adneto) conflicts with Sanity/Notion (EasyRewardz) for Kia and Axis.
   - Notion Eastman Timeline is "Manufacturing, Enterprise, Corporate"; Suzlon Year is 2026.
   - Year and Timeline conflict for Metcred (2024 vs June 2021), Plufo (2022 vs Jun–Sep 2021) and Valyu (2023 vs 2020–21).
   - Notion Timelines for NTUC, Plufo, RideEV, Sadhan and Valyu were never synced (Sanity shows "—").
   - `.env` NOTION_TOKEN is rejected.
6. **Legacy and listing:** 4 noIndex docs show NTUC's copy and 3 show placeholder text. All 7 appear on `/work`, and 15 docs have no listing thumbnail.
7. **Parser and template issues:** all listed in section 1.
