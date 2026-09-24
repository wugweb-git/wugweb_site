# Wugweb — full site content map

Generated from `src/pages/**/*.astro` on 2026-09-24.

`…` = value resolved from Sanity at runtime — that copy lives in the CMS, not the code.

**24 routes · 86 page-own sections.** Excluded: `/kits` (unlinked showcase), `/contact-v2` and `/footer/refund-policy` (301 redirects).

Every page also renders global chrome from the layout: nav above; partners → industries → insights → final CTA → footer below. Six routes opt out of the final CTA — `/footer/industries` and the four legal pages.

---

## `/`

**Sanity:** `servicesListQuery` · `caseStudiesListQuery` · `postsListQuery` · `singletonPageQuery`

| # | Section | Title | Subtitle | Buttons |
|---|---|---|---|---|
| 1 | `hero` | … | — | Explore Wugweb · Get in Touch |
| 2 | `intro` | Wugweb is a tight team of thoughtful creatives, engineers, and strategists | … | — |
| 3 | `services tone-recessed` | Crafting UI, UX, and Brand Systems that drive meaning | In a world where the unexpected is becoming the norm, we build custom digital solutions through user experienc | View Services |
| 4 | `work` *(grid)* | Work that Leads with Clarity and Delivers with Impact | … — … | View case studies |
| 5 | `industries-section tone-elevated` | We understand the context behind the product. | From regulated sectors to fast-moving consumer markets, our experience spans industries that demand precision  | Explore All Industries |

## `/404`

**Hardcoded** — no CMS fields

| # | Section | Title | Subtitle | Buttons |
|---|---|---|---|---|
| 1 | `not-found` | Seems this page is not available. | Would you like to play a game with us till then? | Back to Home |

## `/404-2`

**Hardcoded** — no CMS fields

| # | Section | Title | Subtitle | Buttons |
|---|---|---|---|---|
| 1 | `nf2` | This page wandered off. | It's not where it used to be — but while you're here, we owe you a game. | Back to Home · See our work |

## `/about`

**Sanity:** `singletonPageQuery` · `teamListQuery` · `siteSettingsQuery`

| # | Section | Title | Subtitle | Buttons |
|---|---|---|---|---|
| 1 | `about-hero` | About Us | A product and experience architecture studio. We work across strategy, brand, experience, engineering, growth  | — |
| 2 | `stats` | — | … | — |
| 3 | `values` | … | Creating projects at the nexus of design and technology, bringing the future into the present. We develop comp | — |
| 4 | `culture` *(grid)* | Culture Reigns Supreme | Establishing a robust foundational culture within our organisation is vital to Wugweb's long-term vision, grow | — |
| 5 | `reviews` | What clients and the team say. | Verified review platforms Wugweb is listed on, and how to reach us if you're one of them. | — |

## `/blog`

**Sanity:** `singletonPageQuery` · `postsListQuery`

| # | Section | Title | Subtitle | Buttons |
|---|---|---|---|---|
| 1 | `blog-hero` | Notes on design, product, and growth. | Field notes from Wugweb's design, engineering, and strategy work: what we're learning, testing, and shipping. | — |
| 2 | `blog-featured` *(grid)* | … | … | — |
| 3 | `blog-filters` | — | — | — |
| 4 | `blog-grid-section` *(grid)* | … | … … … | — |

## `/blog/[slug]`

**Sanity:** `postsListQuery`

| # | Section | Title | Subtitle | Buttons |
|---|---|---|---|---|
| 1 | `article-hero-media-wrap` | — | — | — |
| 2 | `[` | … | … | — |
| 3 | `article` *(grid)* | Get insights like this in your inbox | Contents | View all work |

## `/contact-error`

**Hardcoded** — no CMS fields

| # | Section | Title | Subtitle | Buttons |
|---|---|---|---|---|
| 1 | `contact-error` | Something went wrong on our end. | Your message wasn't saved — this wasn't a problem with what you entered. Try again, or email us directly and w | Try again · Email hello@wugweb.com |

## `/contact-us`

**Sanity:** `singletonPageQuery`

_No `<section>` elements — div/form based._

## `/faq`

**Sanity:** `singletonPageQuery`

| # | Section | Title | Subtitle | Buttons |
|---|---|---|---|---|
| 1 | `faq` | … | … | — |

## `/footer/cookie-policy`

**Sanity:** `singletonPageQuery`

| # | Section | Title | Subtitle | Buttons |
|---|---|---|---|---|
| 1 | `legal` | 01 — What are cookies? | This Cookie Policy explains how Wugweb uses cookies and similar technologies when you visit our websites and u | — |

## `/footer/impact`

**Sanity:** `singletonPageQuery`

| # | Section | Title | Subtitle | Buttons |
|---|---|---|---|---|
| 1 | `hero-section` | Supporting meaningful work. | Support for meaningful work has never mattered more. We believe organisations, campaigns and people working to | Request support |
| 2 | `approach-section` *(grid)* | We give capability, not just support. | Sometimes it means building technology for a campaign. Sometimes it means supporting an organisation's digital | — |
| 3 | `request-banner-section` | Working on something that matters? | If you're a purpose-driven organisation, campaign or initiative and need help with design, technology or digit | Request support &rarr; |
| 4 | `advocacy-section` | Where we've put our capabilities to work. | We helped create and run the digital platform behind Animal Writes, supporting its campaign and helping it bui | — |
| 5 | `other-contributions-section` | Nawabi Tails Rescue | We provide digital sponsorship and support to an organisation working in animal rescue and welfare. | — |
| 6 | `mentorship-section` *(grid)* | Expertise should be shared. | Through design mentorship, professional guidance and knowledge sharing, we support emerging designers, founder | Learn more &rarr; |
| 7 | `support-work-section` *(grid)* | You can help too. | You don't have to work with us to contribute. If the work of organisations we support matters to you, you can  | Support Animal Writes · Support Nawabi Tails |
| 8 | `recognised-section` | DPIIT Recognised Startup | Wugweb is recognised under India's Startup India ecosystem through the Department for Promotion of Industry an | Startup India |
| 9 | `final-cta-section` | Have meaningful work that needs support? | Tell us what you're working on, who you're helping, and where Wugweb could contribute. | Request support &rarr; |

## `/footer/industries`

**Sanity:** `singletonPageQuery`

| # | Section | Title | Subtitle | Buttons |
|---|---|---|---|---|
| 1 | `hero-section` | We understand the context behind the product. | Every industry has different customers, constraints, regulations and ways of working. We bring cross-industry  | — |
| 2 | `explorer-section` | Explore our industries. | From highly regulated sectors to fast-moving consumer businesses, we adapt our approach to the context we're w | — |
| 3 | `cross-experience-section` *(grid)* | Different industries. Shared problems. | Customers still expect clarity. Teams still need better systems. Businesses still need products that work. | — |
| 4 | `matrix-section` | Industry context meets capability. | A visual representation of Wugweb's multidisciplinary approach. Click a row to see the capability intersection | — |
| 5 | `missing-industry-section` | Don't see your industry? | Our experience spans different sectors, business models and operating environments. If your industry isn't lis | Talk to us &rarr; · View our services &rarr; |
| 6 | `final-cta` | Bring us the problem, not just the brief. | Tell us what you're trying to achieve. We'll bring the industry context, strategy, design and technology neede | Start a conversation &rarr; |

## `/footer/reviews`

**Sanity:** `singletonPageQuery`

| # | Section | Title | Subtitle | Buttons |
|---|---|---|---|---|
| 1 | `hero-section` | What people say about working with us. | Client feedback lives on the platforms that host it — we link straight there instead of quoting numbers we can | — |
| 2 | `reviews-section` *(grid)* | Agency reviews | Verified review platforms Wugweb is listed on. Ratings and counts live on each platform directly — visit the p | — |
| 3 | `reviews-section` | Employee reviews | No verified employer-review platform profile (Glassdoor, AmbitionBox, etc.) is on record for Wugweb yet — this | — |
| 4 | `reviews-section` *(grid)* | Other recognition | — | — |

## `/footer/sitemap`

**Sanity:** `servicesListQuery` · `caseStudiesListQuery` · `postsListQuery` · `singletonPageQuery`

| # | Section | Title | Subtitle | Buttons |
|---|---|---|---|---|
| 1 | `static-page sitemap` *(grid)* | Explore the Site | Everything on wugweb.com, organised. Jump to any page, service, case study, or article. | — |

## `/footer/subscription`

**Sanity:** `singletonPageQuery`

| # | Section | Title | Subtitle | Buttons |
|---|---|---|---|---|
| 1 | `hero-section` | Your digital team, on subscription. | Design, technology, strategy and growth support — continuously, without the overhead of hiring another team. | Talk to us |
| 2 | `how-it-works` | Simple by design. | Add as many requests as you need. | — |
| 3 | `core-rule-section` *(grid)* | Unlimited requests. One active request. | — | — |
| 4 | `capabilities-section` | One team. Six capabilities. | Product thinking, audits, roadmaps, research synthesis and strategic problem solving. | — |
| 5 | `explorer-section` *(grid)* | If it moves your digital work forward, it can probably go in the queue. | Description of work goes here. | — |
| 6 | `speed-section` | Fast by default. Thoughtful when it matters. | Most standard requests are delivered within 1–3 business days. | — |
| 7 | `included-section` *(grid)* | Everything you need to keep moving. | One subscription. Multiple capabilities. No need to assemble a different team for every task. | — |
| 8 | `boundaries-section` | Some work deserves its own project. | Complex visual audits or complete business restructuring fall outside the quick iterative scope of our monthly | — |
| 9 | `pricing-section` | — | — | Talk to us |
| 10 | `pause-cancel-section` | Manage Subscription State | Test the workspace pause and cancellation flow interface directly. | — |
| 11 | `faq-section` | Frequently Asked Questions | You can add as many requests as you need. We work on the highest-priority active request before moving to the  | — |
| 12 | `final-cta` | Keep your digital work moving. | A senior team across strategy, design, technology and growth — available when you need it. | Talk to us |

## `/offline`

**Hardcoded** — no CMS fields

| # | Section | Title | Subtitle | Buttons |
|---|---|---|---|---|
| 1 | `offline` | You're offline right now. | This page hasn't been saved for offline use yet. Reconnect and try again — pages you've already visited will k | Back to Home |

## `/privacy-policy`

**Sanity:** `singletonPageQuery`

| # | Section | Title | Subtitle | Buttons |
|---|---|---|---|---|
| 1 | `static-page legal` | What is this Privacy Policy for? | This privacy policy is for this website & being served by Wugweb (including its global affiliates) and governs | — |

## `/refund-policy`

**Sanity:** `singletonPageQuery`

| # | Section | Title | Subtitle | Buttons |
|---|---|---|---|---|
| 1 | `legal` | 01 — Our approach | This policy explains how cancellations, refunds and subscription changes are handled for Wugweb services. We a | — |

## `/services`

**Sanity:** `servicesListQuery` · `caseStudiesListQuery` · `singletonPageQuery`

| # | Section | Title | Subtitle | Buttons |
|---|---|---|---|---|
| 1 | `services-hero` | Services | At Wugweb, we design with function driving aesthetics—crafting scalable, human-centered systems across brand,  | — |
| 2 | `stats` | — | … | — |
| 3 | `services-intro` | Bringing intuitive and beautiful innovations to life. | We create at the intersection of design and technology, combining UX design services with innovative systems t | — |
| 4 | `why-wugweb` | Why Wugweb? | … | — |
| 5 | `svc-panel` | … | … | Learn More · Get in Touch · Contact Us |

## `/services/[slug]`

**Sanity:** `serviceBySlugQuery` · `caseStudiesListQuery` · `postsListQuery`

| # | Section | Title | Subtitle | Buttons |
|---|---|---|---|---|
| 1 | `detail-hero` | … | … | Get in Touch |
| 2 | `detail-body` | — | … | — |
| 3 | `svc-stats` | — | … | — |
| 4 | `capabilities-section` | What we can do | — | — |
| 5 | `capabilities-section` | … | — | — |
| 6 | `approach-section` | From first conversation to handover. | ` clip library is third-party showreel footage (pending #6). Rather than repeat one stock image down the colum | Start a project |
| 7 | `framework-section` | Our … Framework | … | — |
| 8 | `toolkit-section` *(grid)* | Wugweb leverages a diverse toolkit of industry-leading technologies to craft exceptional user experiences. | — | — |
| 9 | `svc-work` *(grid)* | Work that leads with clarity and delivers with impact | ……` : ''} | View all case studies |

## `/termsofuse`

**Sanity:** `singletonPageQuery`

| # | Section | Title | Subtitle | Buttons |
|---|---|---|---|---|
| 1 | `legal` | Introduction and Overview | Please carefully read these Terms of Use (these "Terms") because they set forth a legally binding agreement be | — |

## `/thank-you`

**Hardcoded** — no CMS fields

| # | Section | Title | Subtitle | Buttons |
|---|---|---|---|---|
| 1 | `thank-you` | Thanks, we'll be in touch. | A member of our team will review your message and get back to you within one business day. | Back to Home |

## `/work`

**Sanity:** `singletonPageQuery` · `caseStudiesListQuery`

| # | Section | Title | Subtitle | Buttons |
|---|---|---|---|---|
| 1 | `work-hero` | What We've Built | We create digital solutions that are as functional as they are beautiful. | — |
| 2 | `work-filters` | — | — | — |
| 3 | `work-grid-section` *(grid)* | … | … | — |

## `/work/[slug]`

**Sanity:** `caseStudyBySlugQuery`

| # | Section | Title | Subtitle | Buttons |
|---|---|---|---|---|
| 1 | `work-detail-hero` | … | … | — |
| 2 | `section work-cover` | — | — | — |
| 3 | `case-section` | About | … | — |
| 4 | `case-section` | The problem | … | — |
| 5 | `case-section` | The approach | … | — |
| 6 | `case-section` | The outcome | … | — |
| 7 | `case-section` | Design thesis | …. … : line} | — |
| 8 | `case-section` | In depth | — | — |
| 9 | `case-gallery-section` *(grid)* | Gallery | — | — |
| 10 | `section more-cases-section` *(grid)* | More Case Studies | — | View all work |

---

## All CTAs, by file and section

| File | Section | Label | Destination |
|---|---|---|---|
| components/PortableTextRenderer.astro | `pt-code-wrapper glass-panel` | Copy | _(in-page)_ |
| components/SiteHeader.astro | `(page root)` | Let's Talk | /contact-us |
| components/SiteHeader.astro | `(page root)` | Let's Talk | /contact-us |
| layouts/BaseLayout.astro | `global-industries` | More about us | /about |
| layouts/BaseLayout.astro | `cookie-banner-wrap` | Accept all | _(in-page)_ |
| layouts/BaseLayout.astro | `cookie-banner-wrap` | Reject optional | _(in-page)_ |
| layouts/BaseLayout.astro | `cookie-banner-wrap` | Manage preferences | _(in-page)_ |
| layouts/BaseLayout.astro | `cookie-banner-wrap` | Reject optional | _(in-page)_ |
| layouts/BaseLayout.astro | `cookie-banner-wrap` | Save preferences | _(in-page)_ |
| layouts/BaseLayout.astro | `cookie-banner-wrap` | Accept all | _(in-page)_ |
| layouts/BaseLayout.astro | `install-banner-wrap` | Install | _(in-page)_ |
| pages/404-2.astro | `nf2-board-wrap` | Back to Home | / |
| pages/404-2.astro | `nf2-board-wrap` | See our work | /work |
| pages/404.astro | `not-found` | Back to Home | / |
| pages/blog/[slug].astro | `article` | Subscribe | _(in-page)_ |
| pages/blog/[slug].astro | `article` | View all work | /work |
| pages/contact-error.astro | `contact-error` | Try again | /contact-us |
| pages/contact-error.astro | `contact-error` | Email hello@wugweb.com | mailto:hello@wugweb.com |
| pages/contact-us.astro | `form-footer` | Send Enquiry | _(in-page)_ |
| pages/footer/cookie-policy.astro | `cta-block` | Manage Cookie Settings | _(in-page)_ |
| pages/footer/cookie-policy.astro | `cta-block` | Open Cookie Settings | _(in-page)_ |
| pages/footer/impact.astro | `hero-actions` | Request support | /contact-us |
| pages/footer/impact.astro | `request-banner-section` | Request support | /contact-us |
| pages/footer/impact.astro | `mentorship-grid` | Learn more | /contact-us |
| pages/footer/impact.astro | `action-cards-grid` | Support Animal Writes | https://animalwrites.in/ |
| pages/footer/impact.astro | `action-cards-grid` | Support Nawabi Tails | https://nawabitailsrescue.org/ |
| pages/footer/impact.astro | `recognised-section` | Startup India | https://www.startupindia.gov.in/ |
| pages/footer/impact.astro | `final-cta-inner-impact` | Request support | /contact-us |
| pages/footer/industries.astro | `section-header` | Banking | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | Fintech | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | Insurtech | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | Wealth & Investment | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | Healthcare | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | Diagnostics | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | Pharma | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | Wellness | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | E-commerce | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | Retail | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | D2C | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | Consumer Brands | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | Travel | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | Hospitality | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | Aviation | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | Automotive | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | Logistics & Mobility | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | SaaS | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | AI & Emerging Tech | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | Platforms & Marketplaces | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | EdTech | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | HR & Workforce | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | Professional Services | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | Media | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | Entertainment | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | Sports | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | Music | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | Government | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | NGOs & Non-profits | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | Social Impact | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | Energy | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | Manufacturing | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | Real Estate | _(in-page)_ |
| pages/footer/industries.astro | `section-header` | Construction | _(in-page)_ |
| pages/footer/industries.astro | `prev-section` | Start a conversation | /contact-us |
| pages/footer/industries.astro | `missing-industry-section` | Talk to us | /contact-us |
| pages/footer/industries.astro | `missing-industry-section` | View our services | /about |
| pages/footer/industries.astro | `final-cta` | Start a conversation | /contact-us |
| pages/footer/subscription.astro | `hero-actions` | Start subscription | _(in-page)_ |
| pages/footer/subscription.astro | `hero-actions` | Talk to us | /contact-us |
| pages/footer/subscription.astro | `interactive-panel-header` | Simulate Next Deliverable | _(in-page)_ |
| pages/footer/subscription.astro | `section-header` | STRATEGY | _(in-page)_ |
| pages/footer/subscription.astro | `section-header` | BRAND | _(in-page)_ |
| pages/footer/subscription.astro | `section-header` | EXPERIENCE | _(in-page)_ |
| pages/footer/subscription.astro | `section-header` | ENGINEERING | _(in-page)_ |
| pages/footer/subscription.astro | `section-header` | GROWTH | _(in-page)_ |
| pages/footer/subscription.astro | `section-header` | OPERATIONS | _(in-page)_ |
| pages/footer/subscription.astro | `pricing-cta-box` | Start subscription | _(in-page)_ |
| pages/footer/subscription.astro | `pricing-cta-box` | Talk to us | /contact-us |
| pages/footer/subscription.astro | `pause-cancel-section` | Pause subscription | _(in-page)_ |
| pages/footer/subscription.astro | `pause-cancel-section` | Resume subscription | _(in-page)_ |
| pages/footer/subscription.astro | `pause-cancel-section` | Cancel subscription | _(in-page)_ |
| pages/footer/subscription.astro | `final-cta` | Start subscription | _(in-page)_ |
| pages/footer/subscription.astro | `final-cta` | Talk to us | /contact-us |
| pages/footer/subscription.astro | `final-cta` | Continue to payment | _(in-page)_ |
| pages/footer/subscription.astro | `form-group` | Proceed to payment | _(in-page)_ |
| pages/footer/subscription.astro | `form-group` | Authorize AutoPay | _(in-page)_ |
| pages/footer/subscription.astro | `form-group` | Start onboarding | _(in-page)_ |
| pages/footer/subscription.astro | `ob-options-grid` | Next Step | _(in-page)_ |
| pages/footer/subscription.astro | `ob-options-grid` | Next Step | _(in-page)_ |
| pages/footer/subscription.astro | `ob-options-grid` | Next Step | _(in-page)_ |
| pages/footer/subscription.astro | `form-group` | Create my workspace | _(in-page)_ |
| pages/index.astro | `hero-ctas` | Explore Wugweb | #services-content |
| pages/index.astro | `hero-ctas` | Get in Touch | /contact-us |
| pages/index.astro | `services tone-recessed` | View Services | /services |
| pages/index.astro | `work` | View case studies | /work |
| pages/index.astro | `(wrap)` | Explore All Industries | /footer/industries |
| pages/offline.astro | `offline` | Try again | _(in-page)_ |
| pages/offline.astro | `offline` | Back to Home | / |
| pages/services/[slug].astro | `detail-hero-content` | Get in Touch | /contact-us |
| pages/services/[slug].astro | `approach-cta-inner` | Start a project | /contact-us |
| pages/services/[slug].astro | `approach-cta-inner` | See the work first | /work |
| pages/services/[slug].astro | `svc-work` | View all case studies | /work |
| pages/services/index.astro | `svc-inner` | Learn More | `/services/${s.slug |
| pages/services/index.astro | `svc-inner` | Get in Touch | /contact-us |
| pages/services/index.astro | `svc-inner` | Contact Us | /contact-us |
| pages/thank-you.astro | `thank-you` | Back to Home | / |
| pages/work/[slug].astro | `section more-cases-section` | View all work | /work |

**106 CTAs.**
