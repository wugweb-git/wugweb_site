# Asset reorganisation plan (PLAN ONLY, nothing moved)

Generated 2026-10-12T11:44:49.680Z. 412 files, 344.3 MiB under framer, uncode, more. 919 Sanity docs (incl. drafts) and 83 code files scanned. 1 templated /assets/${…} literals in src/ cannot be resolved statically.

## Per source folder
- framer/: 252 files, 249.9 MiB, unreferenced 38
- uncode/: 140 files, 76.4 MiB, unreferenced 31
- more/: 20 files, 18.0 MiB, unreferenced 5

## Counts per target folder
- work: 317 files, 288.4 MiB
- (unreferenced): 74 files, 43.6 MiB
- site: 10 files, 6.4 MiB
- about: 5 files, 5.7 MiB
- logos: 4 files, 0.0 MiB
- blog: 2 files, 0.1 MiB

## By owner type
- caseStudy: 317
- unreferenced: 74
- page: 14
- client: 4
- post: 2
- src: 1

## Collisions: 2
- assets/more/about/about-message-poster.webp -> assets/about/about-message-poster.webp (exists in tree)
- assets/more/about/about-message.mp4 -> assets/about/about-message.mp4 (exists in tree)

## Unsure: 12
- assets/more/about/about-message-poster.webp: poster of about-message.mp4; mixed owners: page+code; also referenced in src/
- assets/more/about/about-message.mp4: mixed owners: page+code; also referenced in src/
- assets/more/home/brand-strategy-poster.webp: poster of brand-strategy.mp4; proposes new site/ folder; mixed owners: page+code; also referenced in src/
- assets/more/home/brand-strategy.mp4: proposes new site/ folder; mixed owners: page+code; also referenced in src/
- assets/more/home/experience-design-poster.webp: poster of experience-design.mp4; proposes new site/ folder; mixed owners: page+code; also referenced in src/
- assets/more/home/experience-design.mp4: proposes new site/ folder; mixed owners: page+code; also referenced in src/
- assets/more/home/home-poster.webp: referenced by src/ only: keep in place or move to site/
- assets/more/home/home.mp4: proposes new site/ folder; mixed owners: page+code; also referenced in src/
- assets/more/home/martech-genai-poster.webp: poster of martech-genai.mp4; proposes new site/ folder; mixed owners: page+code; also referenced in src/
- assets/more/home/martech-genai.mp4: proposes new site/ folder; mixed owners: page+code; also referenced in src/
- assets/more/home/web-app-development-poster.webp: poster of web-app-development.mp4; proposes new site/ folder; mixed owners: page+code; also referenced in src/
- assets/more/home/web-app-development.mp4: proposes new site/ folder; mixed owners: page+code; also referenced in src/

## Byte-identical to a file elsewhere in the tree: 25 (17.7 MiB)
Copying these would add R2 storage for no reason; the apply step could repoint at the existing key instead.

## Unreferenced: 74 files, 43.6 MiB
- assets/framer/adneto-digital-showcase-ai-powered-loyalty-platform/challenges-image-h4hs.png (380320 B)
- assets/framer/adneto-digital-showcase-ai-powered-loyalty-platform/client-logo-enb1.png (4487 B)
- assets/framer/adneto-digital-showcase-ai-powered-loyalty-platform/conclusion-image-1-m6oa.jpg (66200 B)
- assets/framer/adneto-digital-showcase-ai-powered-loyalty-platform/conclusion-image-2-74t5.jpg (31414 B)
- assets/framer/adneto-digital-showcase-ai-powered-loyalty-platform/design-philosophy-image-3-i2kz.jpg (29835 B)
- assets/framer/adneto-digital-showcase-ai-powered-loyalty-platform/design-philosophy-image-fxib.jpg (4659777 B)
- assets/framer/adneto-digital-showcase-ai-powered-loyalty-platform/filler-image-2-0ves.jpg (3875526 B)
- assets/framer/adneto-digital-showcase-ai-powered-loyalty-platform/filler-image-ikvs.jpg (578074 B)
- assets/framer/adneto-digital-showcase-ai-powered-loyalty-platform/solution-image-1-tle0.jpg (624849 B)
- assets/framer/adneto-digital-showcase-ai-powered-loyalty-platform/solution-image-2-7adq.jpg (843642 B)
- assets/framer/adneto-digital-showcase-ai-powered-loyalty-platform/solution-image-3-h10z.jpg (721495 B)
- assets/framer/airtel-xsafe-securing-homes-with-intuitive-digital-experiences/client-logo-c6rj.png (5915 B)
- assets/framer/airtel-xstream-play-digital-entertainment-ux-web-design/client-logo-8gyg.png (2827 B)
- assets/framer/bankco-super-app-digital-banking-loyalty-commerce/client-logo-qhmv.png (1672 B)
- assets/framer/cartier-career-site-redesign-luxury-ux-ui-talent-branding/client-logo-jrot.png (2374 B)
- assets/framer/demystifying-finance-crafting-the-ux-for-aditya-birla-capital-s-credit-score-tool/client-logo-te1y.png (6098 B)
- assets/framer/kia-customer-loyalty-dashboard-ui-ux/challenge-image-1-nyzk.jpg (57585 B)
- assets/framer/kia-customer-loyalty-dashboard-ui-ux/challenge-image-2-res4.jpg (61708 B)
- assets/framer/kia-customer-loyalty-dashboard-ui-ux/challenges-image-bce5.png (820877 B)
- assets/framer/kia-customer-loyalty-dashboard-ui-ux/client-logo-5nkj.png (1140 B)
- assets/framer/kia-customer-loyalty-dashboard-ui-ux/conclusion-image-1-rwz2.jpg (46866 B)
- assets/framer/kia-customer-loyalty-dashboard-ui-ux/conclusion-image-2-3zq3.jpg (55514 B)
- assets/framer/kia-customer-loyalty-dashboard-ui-ux/design-philosophy-image-3-m3jq.jpg (93154 B)
- assets/framer/kia-customer-loyalty-dashboard-ui-ux/design-philosophy-image-f43i.jpg (3632446 B)
- assets/framer/kia-customer-loyalty-dashboard-ui-ux/filler-image-2-b408.jpg (3078740 B)
- assets/framer/kia-customer-loyalty-dashboard-ui-ux/filler-image-ynfu.jpg (4398207 B)
- assets/framer/kia-customer-loyalty-dashboard-ui-ux/solution-image-1-cnws.jpg (955731 B)
- assets/framer/kia-customer-loyalty-dashboard-ui-ux/solution-image-2-4wf2.jpg (3151995 B)
- assets/framer/kia-customer-loyalty-dashboard-ui-ux/solution-image-3-luhb.jpg (2637234 B)
- assets/framer/kia-customer-loyalty-dashboard-ui-ux/styles-image-1-sffk.png (4747 B)
- assets/framer/kia-customer-loyalty-dashboard-ui-ux/styles-image-2-uvub.png (23604 B)
- assets/framer/ntuc-u-care-fund-digital-transformation-for-enhanced-member-support/client-logo-grfk.png (31517 B)
- assets/framer/plufo-crafting-an-immersive-edtech-ecosystem-for-young-learners/client-logo-6djh.png (4329 B)
- assets/framer/redesigning-inkompass-cultivating-global-talent-for-a-smoke-free-future/client-logo-9fd5.png (3005 B)
- assets/framer/rideev-powering-the-phygital-ev-revolution-in-india/client-logo-1gbn.png (9250 B)
- assets/framer/sadhan-streamlining-driver-onboarding-lead-management/client-logo-zqsr.png (18967 B)
- assets/framer/the-architecture-of-loyalty-designing-the-axis-bank-savings-account-platform/client-logo-d64b.png (7985 B)
- assets/framer/the-avant-garde-of-banking-designing-the-metcred-zero-fee-mobile-experience/client-logo-q4ee.png (3358 B)
- assets/more/home/Web & App Development-poster.webp (17270 B)
- assets/more/home/Web & App Development.mp4 (1208266 B)
- assets/more/service/service_benefit_6.webp (181734 B)
- assets/more/service/service_message-poster.webp (14374 B)
- assets/more/service/service_message.mp4 (4797138 B)
- assets/uncode/case/accelerating-loyalty-designing-kia-s-intuitive-customer-dashboard/att/image-placeholder-6.jpg (41573 B)
- assets/uncode/case/airtel-xsafe-securing-homes-with-intuitive-digital-experiences/att/image-placeholder-6.jpg (41573 B)
- assets/uncode/case/airtel-xstream-play-showcasing-india-s-unified-digital-entertainment/att/image-placeholder-6.jpg (41573 B)
- assets/uncode/case/bankco-revolutionizing-financial-engagement-with-a-super-app/att/image-placeholder-6.jpg (41573 B)
- assets/uncode/case/gratify-the-intelligent-rewards-feedback-platform/att/image-placeholder-6.jpg (41573 B)
- assets/uncode/case/ntuc-u-care-fund-digital-transformation-for-enhanced-member-support/att/image-placeholder-6.jpg (41573 B)
- assets/uncode/case/plufo-crafting-an-immersive-edtech-ecosystem-for-young-learners/att/image-placeholder-6.jpg (41573 B)
- assets/uncode/case/portfolio/att/image-placeholder-6.jpg (41573 B)
- assets/uncode/case/portfolio/Design-Systems.mp4 (264491 B)
- assets/uncode/case/rideev-powering-the-phygital-ev-revolution-in-india/att/image-placeholder-6.jpg (41573 B)
- assets/uncode/case/sadhan-streamlining-driver-onboarding-lead-management/att/image-placeholder-6.jpg (41573 B)
- assets/uncode/case/valyu-ai-empowering-india-s-workforce-with-on-demand-earned-wages/1.png (666465 B)
- assets/uncode/case/valyu-ai-empowering-india-s-workforce-with-on-demand-earned-wages/2.png (232688 B)
- assets/uncode/case/valyu-ai-empowering-india-s-workforce-with-on-demand-earned-wages/3.png (231295 B)
- assets/uncode/case/valyu-ai-empowering-india-s-workforce-with-on-demand-earned-wages/4.png (308700 B)
- assets/uncode/case/valyu-ai-empowering-india-s-workforce-with-on-demand-earned-wages/5.png (166587 B)
- assets/uncode/case/valyu-ai-empowering-india-s-workforce-with-on-demand-earned-wages/6.png (144426 B)
- assets/uncode/case/valyu-ai-empowering-india-s-workforce-with-on-demand-earned-wages/7.png (417850 B)
- assets/uncode/case/valyu-ai-empowering-india-s-workforce-with-on-demand-earned-wages/8.png (274756 B)
- assets/uncode/case/valyu-ai-empowering-india-s-workforce-with-on-demand-earned-wages/9.png (215897 B)
- assets/uncode/case/valyu-ai-empowering-india-s-workforce-with-on-demand-earned-wages/att/image-placeholder-6.jpg (41573 B)
- assets/uncode/case/valyu-ai-empowering-india-s-workforce-with-on-demand-earned-wages/banner.png (1257113 B)
- assets/uncode/case/valyu-ai-empowering-india-s-workforce-with-on-demand-earned-wages/Company-missing.png (225111 B)
- assets/uncode/case/valyu-ai-empowering-india-s-workforce-with-on-demand-earned-wages/Group-15118.png (355704 B)
- assets/uncode/case/valyu-ai-empowering-india-s-workforce-with-on-demand-earned-wages/Group-15119.png (459110 B)
- assets/uncode/case/valyu-ai-empowering-india-s-workforce-with-on-demand-earned-wages/Group-15120.png (368834 B)
- assets/uncode/case/valyu-ai-empowering-india-s-workforce-with-on-demand-earned-wages/Group-15121.png (526710 B)
- assets/uncode/case/valyu-ai-empowering-india-s-workforce-with-on-demand-earned-wages/Group-15122.png (1462346 B)
- assets/uncode/case/valyu-ai-empowering-india-s-workforce-with-on-demand-earned-wages/Landing-page-–-1.jpg (518987 B)
- assets/uncode/case/valyu-ai-empowering-india-s-workforce-with-on-demand-earned-wages/Valyu.png (8352 B)
- assets/uncode/case/visione-empowering-workforce-development-with-competency-based-assessments/att/image-placeholder-6.jpg (41573 B)
