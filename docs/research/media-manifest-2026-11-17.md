# Case-study media manifest, dry run (2026-11-17)

Part 2 step 3 of the wugweb-work plan. Read-only: Sanity public query API (case-study bodies and the asset registry) and R2 public URLs (HEAD and ranged GETs of header bytes). Nothing was uploaded, copied, renamed, deleted or written to Sanity or Notion. Every number below is summed by `scripts/media-manifest-dry-run.mjs`, not estimated.

**Folder listing.** R2 has no read-only list command in this setup, so the files "in a folder" are the Sanity `asset` registry rows whose path is in that folder. A file in R2 that the registry does not know is not seen here.

## Headline numbers

| Measure | Count |
|---|---|
| Case studies with a body | 37 of 44 |
| Own folder resolved | 27 (none for 10: no media and no folder) |
| Own folder changed by the slug cross-check | 0 |
| Registry folders under assets/work/ | 32 (27 claimed by a body, 5 not) |
| Manifest entries (per case study, summed) | 1041 (420 body, 42 record cover/thumbnail, 579 folder only) |
| Unique media files measured | 874, 911.4 MB |
| Dead links (status not 200) | 6 (6 linked from a body or record, 0 registry rows with no file in R2) |
| Duplicates (dupOf) | 28 |
| Suspects (borrowed, other brand, stock?, off-store) | 125 entries |
| Images over 4 MB | 21 |
| Videos over 10 MB | 4 |
| Pages over 25 MB rendered (v2 parser with the own folder) | 4 |
| Videos with moov at the end | 69 of 79 |
| Videos without a poster file | 21 of 79 |
| Files whose header could not be read | 0 |
| Same file in two or more folders | 0 groups |
| HTTP requests (this run) | 960 to R2 (959 HEAD, 1 ranged GET, 0 retries), 2 to Sanity |

## For the owner to decide

Nothing below was changed. Each line is a fact from this run and the decision it waits on.

1. **Folders no body claims (5):** bodyshop-building-a-premium-wellness-commerce-experience (9 files, looks like Bodyshop, no body); hyatt-restaurants-elevating-culinary-discovery-through-digital-experiences (9 files, looks like Hyatt Restaurants, no body); others (2 files, no case study matches); pvr-cinemas (6 files, no case study matches); tecnotree (7 files, no case study matches). Attach, leave, or name the case study.
2. **Dead links in bodies or records (6):** they stay in the source and the page skips them. Fix in Notion or leave.
3. **Other-brand file names (8) and stock-style names (7):** listed, never dropped; the visual read (step 3b) confirms by looking. Off-store media links: 7.
4. **Borrowed body files (107):** body links into another case study's folder. The v2 parser drops borrowed images (videos are kept); the proposal step takes them out of the body.
5. **Pages over 25 MB (4):** Inkompass 47.6 MB, Plufo 33.7 MB, Sadhan 30.9 MB, Axis Bank 37.1 MB. Per the media rule this is met by showing less at first, never by making smaller files.
6. **Weight, moov and posters:** 21 images over 4 MB, 4 videos over 10 MB, 69 of 79 videos with moov at the end (the browser must fetch the end of the file before playing), 21 without a poster file. Facts only: re-encoding or new poster files need the owner's yes.
7. **Duplicates (28):** same bytes, or the same size and name stem in one folder. The page never renders a `dupOf` entry; the files stay.

## Own folders

Rule order: cover path, thumbnail path, folder named after the slug, majority of body images; then the slug and short-title cross-check.

| Case study | Own folder | Decided by | Body files | Folder only | Borrowed | Rendered (v2) |
|---|---|---|---|---|---|---|
| Kia | accelerating-loyalty-designing-kias-intuitive-customer-dashboard | cover path | 17 | 19 | 3 | 15 files, 23.1 MB |
| ad:tech & iMedia | adtech-and-imedia-sculpting-the-visual-identity-of-global-martech-summits | cover path | 0 | 24 | 0 | 1 files, 2.3 MB |
| Airtel Xsafe | airtel-xsafe | cover path | 18 | 27 | 5 | 14 files, 13.8 MB |
| Airtel Xstream Play | airtel-xstream-play | cover path | 17 | 28 | 4 | 14 files, 15.9 MB |
| Bankco | bankco | cover path | 30 | 12 | 16 | 17 files, 24.6 MB |
| Cartier | cartier-careers | cover path | 18 | 38 | 2 | 17 files, 17.6 MB |
| Adneto | crafting-digital-authority-the-adneto-website-showcase | cover path | 18 | 10 | 5 | 14 files, 18.4 MB |
| ToT Bridal | crafting-digital-elegance-the-tot-bridal-launch-story | cover path | 18 | 23 | 4 | 16 files, 18.1 MB |
| Aditya Birla Capital | demystifying-finance-crafting-the-ux-for-aditya-birla-capital-s-credit-score-tool | cover path | 18 | 31 | 8 | 11 files, 22.5 MB |
| Eekenlife |  | none (no cover, thumbnail, slug folder or body image) | 0 | 0 | 0 | 0 files, 0.0 MB |
| Global Trade Finance | global-trade-finance-engineering-an-authority-first-lead-generation-engine | folder named after the slug | 0 | 1 | 0 | 0 files, 0.0 MB |
| Gratify | gratify-the-intelligent-rewards-and-feedback-platform | cover path | 19 | 45 | 13 | 8 files, 12.7 MB |
| iKan |  | none (no cover, thumbnail, slug folder or body image) | 0 | 0 | 0 | 0 files, 0.0 MB |
| IndusNinja | indusninja-your-ai-powered-financial-ninja | cover path | 18 | 25 | 5 | 14 files, 16.2 MB |
| Inkompass | inkompass | cover path | 42 | 33 | 5 | 37 files, 47.6 MB |
| ITC Dark Fantasy | itc-dark-fantasy-x-citadel-personalizing-the-spy-experience | cover path | 0 | 24 | 0 | 1 files, 0.9 MB |
| Labelly |  | none (no cover, thumbnail, slug folder or body image) | 0 | 0 | 0 | 0 files, 0.0 MB |
| LinkedIn Sales Navigator |  | none (no cover, thumbnail, slug folder or body image) | 0 | 0 | 0 | 0 files, 0.0 MB |
| Metcred | metcred | cover path | 19 | 39 | 5 | 15 files, 23.4 MB |
| NSL OilChem | nsl-oilchem-digitizing-the-lifecycle-of-industrial-waste-management | folder named after the slug | 0 | 3 | 0 | 0 files, 0.0 MB |
| NTUC U Care Fund | ntuc-u-care-fund-digital-transformation-for-enhanced-member-support | cover path | 18 | 47 | 6 | 13 files, 17.6 MB |
| Plufo | plufo | cover path | 42 | 18 | 1 | 40 files, 33.7 MB |
| RAK SME | rak-sme-scaling-the-tech-infrastructure-for-ras-al-khaimah-business-ecosystem | folder named after the slug | 0 | 5 | 0 | 0 files, 0.0 MB |
| RideEV | rideev | cover path | 18 | 31 | 6 | 13 files, 20.2 MB |
| Sadhan | sadhan | cover path | 35 | 30 | 3 | 32 files, 30.9 MB |
| SBS Transit | sbs-transit-engineering-the-future-of-multimodal-urban-mobility | cover path | 0 | 3 | 0 | 1 files, 3.5 MB |
| Stayweb PMS |  | none (no cover, thumbnail, slug folder or body image) | 0 | 0 | 0 | 0 files, 0.0 MB |
| Suzlon |  | none (no cover, thumbnail, slug folder or body image) | 0 | 0 | 0 | 0 files, 0.0 MB |
| Axis Bank | the-architecture-of-loyalty-designing-the-axis-bank-savings-account-platform | cover path | 19 | 3 | 3 | 17 files, 37.1 MB |
| Wugweb HRMS |  | none (no cover, thumbnail, slug folder or body image) | 0 | 0 | 0 | 0 files, 0.0 MB |
| Valyu.ai | valyu-ai-empowering-indias-workforce-with-on-demand-earned-wages | cover path | 18 | 32 | 7 | 12 files, 11.9 MB |
| VisiONE | visione | cover path | 18 | 26 | 6 | 13 files, 16.3 MB |
| Wave Group | wave-group-crafting-a-multi-conglomerate-interactive-experience | folder named after the slug | 0 | 1 | 0 | 0 files, 0.0 MB |
| Witty Vegan |  | none (no cover, thumbnail, slug folder or body image) | 0 | 0 | 0 | 0 files, 0.0 MB |
| Woodkraft | woodkraft-elevating-indias-largest-corporate-fit-out-legacy | folder named after the slug | 0 | 1 | 0 | 0 files, 0.0 MB |
| Wugweb Kits |  | none (no cover, thumbnail, slug folder or body image) | 0 | 0 | 0 | 0 files, 0.0 MB |
| Wugweb |  | none (no cover, thumbnail, slug folder or body image) | 0 | 0 | 0 | 0 files, 0.0 MB |

## Folders no body claims

| Folder | Registry files | Case study it looks like | That case study has a body |
|---|---|---|---|
| bodyshop-building-a-premium-wellness-commerce-experience | 9 | Bodyshop | no |
| hyatt-restaurants-elevating-culinary-discovery-through-digital-experiences | 9 | Hyatt Restaurants | no |
| others | 2 |  |  |
| pvr-cinemas | 6 |  |  |
| tecnotree | 7 |  |  |

## Dead links (6)

| Case study | File | Source | Status |
|---|---|---|---|
| airtel-xsafe-securing-homes-with-intuitive-digital-experiences | Xsafe_thumb.mp4 | body: Thumbnail Video | 404 |
| demystifying-finance-crafting-the-ux-for-aditya-birla-capital-s-credit-score-tool | abc_about.mp4 | body: About Video URL | 404 |
| demystifying-finance-crafting-the-ux-for-aditya-birla-capital-s-credit-score-tool | abc-about.mp4 | body | 404 |
| inkompass-cultivating-global-talent-for-a-smoke-free-future | https://wugweb.pages.dev/assets/uncode/case/redesigning-inkompass-cultivating-global-talent-for-a-smoke-free-future/02_Program-Details-copy-1.png | body: Gallery | 404 |
| plufo-crafting-an-immersive-edtech-ecosystem-for-young-learners | https://wugweb.pages.dev/assets/uncode/case/plufo-crafting-an-immersive-edtech-ecosystem-for-young-learners/Plufo.png | body: Gallery | 404 |
| plufo-crafting-an-immersive-edtech-ecosystem-for-young-learners | https://wugweb.pages.dev/assets/uncode/case/plufo-crafting-an-immersive-edtech-ecosystem-for-young-learners/Group-56973.png | body: Gallery | 404 |

## Suspects (125)

| Case study | File | Source | Why |
|---|---|---|---|
| accelerating-loyalty-designing-kias-intuitive-customer-dashboard | crafting-digital-elegance-the-tot-bridal-launch-story/challenge-image-1-duwn.jpg | body | borrowed from crafting-digital-elegance-the-tot-bridal-launch-story |
| accelerating-loyalty-designing-kias-intuitive-customer-dashboard | crafting-digital-elegance-the-tot-bridal-launch-story/design-philosophy-image-1-ohd3.jpg | body | borrowed from crafting-digital-elegance-the-tot-bridal-launch-story |
| accelerating-loyalty-designing-kias-intuitive-customer-dashboard | crafting-digital-authority-the-adneto-website-showcase/conclusion-image-1-m6oa.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| airtel-xsafe-securing-homes-with-intuitive-digital-experiences | airtel-xstream-play/design-philosophy-image-2-nx78.jpg | body | borrowed from airtel-xstream-play |
| airtel-xsafe-securing-homes-with-intuitive-digital-experiences | airtel-xstream-play/design-philosophy-image-3-drqq.jpg | body | borrowed from airtel-xstream-play |
| airtel-xsafe-securing-homes-with-intuitive-digital-experiences | airtel-xstream-play/styles-image-1-ctd5.png | body | borrowed from airtel-xstream-play |
| airtel-xsafe-securing-homes-with-intuitive-digital-experiences | airtel-xstream-play/styles-image-2-2lht.png | body | borrowed from airtel-xstream-play |
| airtel-xsafe-securing-homes-with-intuitive-digital-experiences | Airtel Xsafe/Xsafe_thumb.mp4 | body | borrowed from Airtel Xsafe; not on the media store (wugweb.online) |
| airtel-xstream-play-showcasing-indias-unified-digital-entertainment-on-the-web | airtel-xsafe/solution-image-3-5685.jpg | body | borrowed from airtel-xsafe |
| airtel-xstream-play-showcasing-indias-unified-digital-entertainment-on-the-web | crafting-digital-elegance-the-tot-bridal-launch-story/design-philosophy-image-1-ohd3.jpg | body | borrowed from crafting-digital-elegance-the-tot-bridal-launch-story |
| airtel-xstream-play-showcasing-indias-unified-digital-entertainment-on-the-web | accelerating-loyalty-designing-kias-intuitive-customer-dashboard/design-philosophy-image-f43i.jpg | body | borrowed from accelerating-loyalty-designing-kias-intuitive-customer-dashboard |
| airtel-xstream-play-showcasing-indias-unified-digital-entertainment-on-the-web | crafting-digital-elegance-the-tot-bridal-launch-story/design-philosophy-image-2-e1ky.jpg | body | borrowed from crafting-digital-elegance-the-tot-bridal-launch-story |
| bankco-revolutionizing-financial-engagement-with-a-super-app | crafting-digital-authority-the-adneto-website-showcase/adneto-thumb.mp4 | record | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| bankco-revolutionizing-financial-engagement-with-a-super-app | crafting-digital-authority-the-adneto-website-showcase/client-logo-enb1.png | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| bankco-revolutionizing-financial-engagement-with-a-super-app | crafting-digital-authority-the-adneto-website-showcase/cover-image-jx5x.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| bankco-revolutionizing-financial-engagement-with-a-super-app | accelerating-loyalty-designing-kias-intuitive-customer-dashboard/challenge-image-2-res4.jpg | body | borrowed from accelerating-loyalty-designing-kias-intuitive-customer-dashboard |
| bankco-revolutionizing-financial-engagement-with-a-super-app | crafting-digital-authority-the-adneto-website-showcase/solution-image-1-tle0.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| bankco-revolutionizing-financial-engagement-with-a-super-app | crafting-digital-authority-the-adneto-website-showcase/solution-image-3-h10z.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| bankco-revolutionizing-financial-engagement-with-a-super-app | crafting-digital-authority-the-adneto-website-showcase/design-philosophy-image-fxib.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| bankco-revolutionizing-financial-engagement-with-a-super-app | accelerating-loyalty-designing-kias-intuitive-customer-dashboard/design-philosophy-image-3-m3jq.jpg | body | borrowed from accelerating-loyalty-designing-kias-intuitive-customer-dashboard |
| bankco-revolutionizing-financial-engagement-with-a-super-app | accelerating-loyalty-designing-kias-intuitive-customer-dashboard/design-philosophy-image-f43i.jpg | body | borrowed from accelerating-loyalty-designing-kias-intuitive-customer-dashboard |
| bankco-revolutionizing-financial-engagement-with-a-super-app | crafting-digital-elegance-the-tot-bridal-launch-story/styles-image-1-p7wt.png | body | borrowed from crafting-digital-elegance-the-tot-bridal-launch-story |
| bankco-revolutionizing-financial-engagement-with-a-super-app | crafting-digital-elegance-the-tot-bridal-launch-story/styles-image-2-0y40.png | body | borrowed from crafting-digital-elegance-the-tot-bridal-launch-story |
| bankco-revolutionizing-financial-engagement-with-a-super-app | crafting-digital-authority-the-adneto-website-showcase/filler-image-ikvs.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| bankco-revolutionizing-financial-engagement-with-a-super-app | crafting-digital-authority-the-adneto-website-showcase/filler-image-2-0ves.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| bankco-revolutionizing-financial-engagement-with-a-super-app | crafting-digital-authority-the-adneto-website-showcase/conclusion-image-1-m6oa.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| bankco-revolutionizing-financial-engagement-with-a-super-app | crafting-digital-authority-the-adneto-website-showcase/conclusion-image-2-74t5.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| bankco-revolutionizing-financial-engagement-with-a-super-app | crafting-digital-authority-the-adneto-website-showcase/adneto-about.mp4 | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| cartier-redesigning-the-career-website-where-passion-meets-excellence | crafting-digital-authority-the-adneto-website-showcase/conclusion-image-2-74t5.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| cartier-redesigning-the-career-website-where-passion-meets-excellence | crafting-digital-authority-the-adneto-website-showcase/conclusion-image-1-m6oa.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| crafting-digital-authority-the-adneto-website-showcase | crafting-digital-elegance-the-tot-bridal-launch-story/challenge-image-1-duwn.jpg | body | borrowed from crafting-digital-elegance-the-tot-bridal-launch-story |
| crafting-digital-authority-the-adneto-website-showcase | crafting-digital-elegance-the-tot-bridal-launch-story/design-philosophy-image-1-ohd3.jpg | body | borrowed from crafting-digital-elegance-the-tot-bridal-launch-story |
| crafting-digital-authority-the-adneto-website-showcase | crafting-digital-elegance-the-tot-bridal-launch-story/design-philosophy-image-2-e1ky.jpg | body | borrowed from crafting-digital-elegance-the-tot-bridal-launch-story |
| crafting-digital-authority-the-adneto-website-showcase | crafting-digital-elegance-the-tot-bridal-launch-story/styles-image-1-p7wt.png | body | borrowed from crafting-digital-elegance-the-tot-bridal-launch-story |
| crafting-digital-authority-the-adneto-website-showcase | crafting-digital-elegance-the-tot-bridal-launch-story/styles-image-2-0y40.png | body | borrowed from crafting-digital-elegance-the-tot-bridal-launch-story |
| crafting-digital-authority-the-adneto-website-showcase | https://cdn.dribbble.com/userupload/16487628/file/original-88bef965e49135ae61f0bfd6894cdf7a.mp4 | body | not on the media store (cdn.dribbble.com) |
| crafting-digital-elegance-the-tot-bridal-launch-story | crafting-digital-authority-the-adneto-website-showcase/client-logo-enb1.png | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| crafting-digital-elegance-the-tot-bridal-launch-story | airtel-xstream-play/challenge-image-1-qyrc.jpg | body | borrowed from airtel-xstream-play |
| crafting-digital-elegance-the-tot-bridal-launch-story | crafting-digital-authority-the-adneto-website-showcase/conclusion-image-1-m6oa.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| crafting-digital-elegance-the-tot-bridal-launch-story | crafting-digital-authority-the-adneto-website-showcase/conclusion-image-2-74t5.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| crafting-digital-elegance-the-tot-bridal-launch-story | crafting-digital-elegance-the-tot-bridal-launch-story/6541956_66.jpg | folder | stock? |
| crafting-digital-elegance-the-tot-bridal-launch-story | crafting-digital-elegance-the-tot-bridal-launch-story/8887533_738.jpg | folder | stock? |
| crafting-digital-elegance-the-tot-bridal-launch-story | crafting-digital-elegance-the-tot-bridal-launch-story/9070912_156.jpg | folder | stock? |
| crafting-digital-elegance-the-tot-bridal-launch-story | crafting-digital-elegance-the-tot-bridal-launch-story/9425749_11369.jpg | folder | stock? |
| crafting-digital-elegance-the-tot-bridal-launch-story | crafting-digital-elegance-the-tot-bridal-launch-story/9550771_230.jpg | folder | stock? |
| demystifying-finance-crafting-the-ux-for-aditya-birla-capital-s-credit-score-tool | metcred/design-philosophy-image-2-3a81.jpg | body | borrowed from metcred |
| demystifying-finance-crafting-the-ux-for-aditya-birla-capital-s-credit-score-tool | bankco/challenge-image-1-ms9n.jpg | body | borrowed from bankco |
| demystifying-finance-crafting-the-ux-for-aditya-birla-capital-s-credit-score-tool | the-architecture-of-loyalty-designing-the-axis-bank-savings-account-platform/design-philosophy-image-1-l13k.jpg | body | borrowed from the-architecture-of-loyalty-designing-the-axis-bank-savings-account-platform |
| demystifying-finance-crafting-the-ux-for-aditya-birla-capital-s-credit-score-tool | the-architecture-of-loyalty-designing-the-axis-bank-savings-account-platform/design-philosophy-image-2-2vd9.jpg | body | borrowed from the-architecture-of-loyalty-designing-the-axis-bank-savings-account-platform |
| demystifying-finance-crafting-the-ux-for-aditya-birla-capital-s-credit-score-tool | metcred/challenge-image-1-pbhm.jpg | body | borrowed from metcred |
| demystifying-finance-crafting-the-ux-for-aditya-birla-capital-s-credit-score-tool | inkompass/inkompass-thumb.mp4 | body | borrowed from inkompass; name carries another client's brand "inkompass" (Inkompass) |
| demystifying-finance-crafting-the-ux-for-aditya-birla-capital-s-credit-score-tool | Aditya Birla Credit/abc_about.mp4 | body | borrowed from Aditya Birla Credit; not on the media store (wugweb.online) |
| demystifying-finance-crafting-the-ux-for-aditya-birla-capital-s-credit-score-tool | aditya-birla-capital/abc-about.mp4 | body | borrowed from aditya-birla-capital; not on the media store (wugweb.pages.dev) |
| gratify-the-intelligent-rewards-and-feedback-platform | crafting-digital-authority-the-adneto-website-showcase/client-logo-enb1.png | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| gratify-the-intelligent-rewards-and-feedback-platform | crafting-digital-authority-the-adneto-website-showcase/cover-image-jx5x.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| gratify-the-intelligent-rewards-and-feedback-platform | crafting-digital-elegance-the-tot-bridal-launch-story/challenge-image-1-duwn.jpg | body | borrowed from crafting-digital-elegance-the-tot-bridal-launch-story |
| gratify-the-intelligent-rewards-and-feedback-platform | crafting-digital-authority-the-adneto-website-showcase/solution-image-1-tle0.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| gratify-the-intelligent-rewards-and-feedback-platform | crafting-digital-authority-the-adneto-website-showcase/solution-image-2-7adq.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| gratify-the-intelligent-rewards-and-feedback-platform | crafting-digital-authority-the-adneto-website-showcase/solution-image-3-h10z.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| gratify-the-intelligent-rewards-and-feedback-platform | crafting-digital-authority-the-adneto-website-showcase/design-philosophy-image-3-i2kz.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| gratify-the-intelligent-rewards-and-feedback-platform | crafting-digital-elegance-the-tot-bridal-launch-story/styles-image-1-p7wt.png | body | borrowed from crafting-digital-elegance-the-tot-bridal-launch-story |
| gratify-the-intelligent-rewards-and-feedback-platform | crafting-digital-elegance-the-tot-bridal-launch-story/styles-image-2-0y40.png | body | borrowed from crafting-digital-elegance-the-tot-bridal-launch-story |
| gratify-the-intelligent-rewards-and-feedback-platform | crafting-digital-authority-the-adneto-website-showcase/filler-image-ikvs.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| gratify-the-intelligent-rewards-and-feedback-platform | crafting-digital-authority-the-adneto-website-showcase/filler-image-2-0ves.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| gratify-the-intelligent-rewards-and-feedback-platform | crafting-digital-authority-the-adneto-website-showcase/conclusion-image-1-m6oa.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| gratify-the-intelligent-rewards-and-feedback-platform | crafting-digital-authority-the-adneto-website-showcase/conclusion-image-2-74t5.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| indusninja-your-ai-powered-financial-ninja | cartier-careers/challenge-image-1-xrsy.jpg | body | borrowed from cartier-careers |
| indusninja-your-ai-powered-financial-ninja | crafting-digital-elegance-the-tot-bridal-launch-story/challenge-image-1-duwn.jpg | body | borrowed from crafting-digital-elegance-the-tot-bridal-launch-story |
| indusninja-your-ai-powered-financial-ninja | cartier-careers/design-philosophy-image-2-aa9g.jpg | body | borrowed from cartier-careers |
| indusninja-your-ai-powered-financial-ninja | cartier-careers/design-philosophy-image-3-x1qg.jpg | body | borrowed from cartier-careers |
| indusninja-your-ai-powered-financial-ninja | accelerating-loyalty-designing-kias-intuitive-customer-dashboard/conclusion-image-2-3zq3.jpg | body | borrowed from accelerating-loyalty-designing-kias-intuitive-customer-dashboard |
| indusninja-your-ai-powered-financial-ninja | indusninja-your-ai-powered-financial-ninja/Airtel Xsafe 1 – 11.png | folder | name carries another client's brand "airtel" (Airtel Xsafe, Airtel Xstream Play) |
| indusninja-your-ai-powered-financial-ninja | indusninja-your-ai-powered-financial-ninja/Airtel Xsafe 1 – 12.png | folder | name carries another client's brand "airtel" (Airtel Xsafe, Airtel Xstream Play) |
| indusninja-your-ai-powered-financial-ninja | indusninja-your-ai-powered-financial-ninja/Airtel Xsafe 1 – 13.png | folder | name carries another client's brand "airtel" (Airtel Xsafe, Airtel Xstream Play) |
| indusninja-your-ai-powered-financial-ninja | indusninja-your-ai-powered-financial-ninja/Airtel Xsafe 1 – 3.png | folder | name carries another client's brand "airtel" (Airtel Xsafe, Airtel Xstream Play) |
| indusninja-your-ai-powered-financial-ninja | indusninja-your-ai-powered-financial-ninja/Airtel Xsafe 1 – 7.png | folder | name carries another client's brand "airtel" (Airtel Xsafe, Airtel Xstream Play) |
| indusninja-your-ai-powered-financial-ninja | indusninja-your-ai-powered-financial-ninja/Airtel Xsafe 1 – 8.png | folder | name carries another client's brand "airtel" (Airtel Xsafe, Airtel Xstream Play) |
| inkompass-cultivating-global-talent-for-a-smoke-free-future | bankco/design-philosophy-image-1-bh4r.jpg | body | borrowed from bankco |
| inkompass-cultivating-global-talent-for-a-smoke-free-future | accelerating-loyalty-designing-kias-intuitive-customer-dashboard/design-philosophy-image-f43i.jpg | body | borrowed from accelerating-loyalty-designing-kias-intuitive-customer-dashboard |
| inkompass-cultivating-global-talent-for-a-smoke-free-future | accelerating-loyalty-designing-kias-intuitive-customer-dashboard/design-philosophy-image-3-m3jq.jpg | body | borrowed from accelerating-loyalty-designing-kias-intuitive-customer-dashboard |
| inkompass-cultivating-global-talent-for-a-smoke-free-future | crafting-digital-authority-the-adneto-website-showcase/conclusion-image-2-74t5.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| inkompass-cultivating-global-talent-for-a-smoke-free-future | crafting-digital-authority-the-adneto-website-showcase/conclusion-image-1-m6oa.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| inkompass-cultivating-global-talent-for-a-smoke-free-future | https://wugweb.pages.dev/assets/uncode/case/redesigning-inkompass-cultivating-global-talent-for-a-smoke-free-future/02_Program-Details-copy-1.png | body | not on the media store (wugweb.pages.dev) |
| inkompass-cultivating-global-talent-for-a-smoke-free-future | inkompass/05_01.png | body | stock? |
| inkompass-cultivating-global-talent-for-a-smoke-free-future | inkompass/17_404.png | folder | stock? |
| metcred-the-avant-garde-of-banking-designing-the-zero-fee-mobile-experience | airtel-xsafe/conclusion-image-2-08ud.jpg | body | borrowed from airtel-xsafe |
| metcred-the-avant-garde-of-banking-designing-the-zero-fee-mobile-experience | bankco/design-philosophy-image-1-bh4r.jpg | body | borrowed from bankco |
| metcred-the-avant-garde-of-banking-designing-the-zero-fee-mobile-experience | accelerating-loyalty-designing-kias-intuitive-customer-dashboard/design-philosophy-image-3-m3jq.jpg | body | borrowed from accelerating-loyalty-designing-kias-intuitive-customer-dashboard |
| metcred-the-avant-garde-of-banking-designing-the-zero-fee-mobile-experience | crafting-digital-authority-the-adneto-website-showcase/conclusion-image-2-74t5.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| metcred-the-avant-garde-of-banking-designing-the-zero-fee-mobile-experience | crafting-digital-authority-the-adneto-website-showcase/conclusion-image-1-m6oa.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| ntuc-u-care-fund-digital-transformation-for-enhanced-member-support | crafting-digital-elegance-the-tot-bridal-launch-story/challenge-image-1-duwn.jpg | body | borrowed from crafting-digital-elegance-the-tot-bridal-launch-story |
| ntuc-u-care-fund-digital-transformation-for-enhanced-member-support | crafting-digital-elegance-the-tot-bridal-launch-story/design-philosophy-image-1-ohd3.jpg | body | borrowed from crafting-digital-elegance-the-tot-bridal-launch-story |
| ntuc-u-care-fund-digital-transformation-for-enhanced-member-support | crafting-digital-elegance-the-tot-bridal-launch-story/design-philosophy-image-2-e1ky.jpg | body | borrowed from crafting-digital-elegance-the-tot-bridal-launch-story |
| ntuc-u-care-fund-digital-transformation-for-enhanced-member-support | crafting-digital-authority-the-adneto-website-showcase/design-philosophy-image-3-i2kz.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| ntuc-u-care-fund-digital-transformation-for-enhanced-member-support | crafting-digital-authority-the-adneto-website-showcase/conclusion-image-1-m6oa.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| ntuc-u-care-fund-digital-transformation-for-enhanced-member-support | crafting-digital-authority-the-adneto-website-showcase/conclusion-image-2-74t5.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| plufo-crafting-an-immersive-edtech-ecosystem-for-young-learners | airtel-xstream-play/conclusion-image-2-j5c9.jpg | body | borrowed from airtel-xstream-play |
| plufo-crafting-an-immersive-edtech-ecosystem-for-young-learners | https://wugweb.pages.dev/assets/uncode/case/plufo-crafting-an-immersive-edtech-ecosystem-for-young-learners/Plufo.png | body | not on the media store (wugweb.pages.dev) |
| plufo-crafting-an-immersive-edtech-ecosystem-for-young-learners | https://wugweb.pages.dev/assets/uncode/case/plufo-crafting-an-immersive-edtech-ecosystem-for-young-learners/Group-56973.png | body | not on the media store (wugweb.pages.dev) |
| rideev-powering-the-phygital-ev-revolution-in-india | gratify-the-intelligent-rewards-and-feedback-platform/challenge-image-2-ihqu.jpg | body | borrowed from gratify-the-intelligent-rewards-and-feedback-platform |
| rideev-powering-the-phygital-ev-revolution-in-india | accelerating-loyalty-designing-kias-intuitive-customer-dashboard/challenge-image-2-res4.jpg | body | borrowed from accelerating-loyalty-designing-kias-intuitive-customer-dashboard |
| rideev-powering-the-phygital-ev-revolution-in-india | gratify-the-intelligent-rewards-and-feedback-platform/design-philosophy-image-1-jcjs.jpg | body | borrowed from gratify-the-intelligent-rewards-and-feedback-platform |
| rideev-powering-the-phygital-ev-revolution-in-india | gratify-the-intelligent-rewards-and-feedback-platform/design-philosophy-image-2-bnyt.jpg | body | borrowed from gratify-the-intelligent-rewards-and-feedback-platform |
| rideev-powering-the-phygital-ev-revolution-in-india | crafting-digital-authority-the-adneto-website-showcase/conclusion-image-2-74t5.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| rideev-powering-the-phygital-ev-revolution-in-india | crafting-digital-authority-the-adneto-website-showcase/conclusion-image-1-m6oa.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| sadhan-streamlining-driver-onboarding-and-lead-management | airtel-xstream-play/challenge-image-2-jr4r.jpg | body | borrowed from airtel-xstream-play |
| sadhan-streamlining-driver-onboarding-and-lead-management | crafting-digital-authority-the-adneto-website-showcase/design-philosophy-image-3-i2kz.jpg | body | borrowed from crafting-digital-authority-the-adneto-website-showcase |
| sadhan-streamlining-driver-onboarding-and-lead-management | airtel-xstream-play/conclusion-image-1-bcir.jpg | body | borrowed from airtel-xstream-play |
| the-architecture-of-loyalty-designing-the-axis-bank-savings-account-platform | metcred/design-philosophy-image-2-3a81.jpg | body | borrowed from metcred |
| the-architecture-of-loyalty-designing-the-axis-bank-savings-account-platform | bankco/challenge-image-1-ms9n.jpg | body | borrowed from bankco |
| the-architecture-of-loyalty-designing-the-axis-bank-savings-account-platform | metcred/challenge-image-1-pbhm.jpg | body | borrowed from metcred |
| valyu-ai-empowering-indias-workforce-with-on-demand-earned-wages | plufo/challenge-image-2-fvqv.jpg | body | borrowed from plufo |
| valyu-ai-empowering-indias-workforce-with-on-demand-earned-wages | plufo/challenge-image-1-0nbl.jpg | body | borrowed from plufo |
| valyu-ai-empowering-indias-workforce-with-on-demand-earned-wages | rideev/design-philosophy-image-1-y3de.jpg | body | borrowed from rideev |
| valyu-ai-empowering-indias-workforce-with-on-demand-earned-wages | gratify-the-intelligent-rewards-and-feedback-platform/design-philosophy-image-1-jcjs.jpg | body | borrowed from gratify-the-intelligent-rewards-and-feedback-platform |
| valyu-ai-empowering-indias-workforce-with-on-demand-earned-wages | gratify-the-intelligent-rewards-and-feedback-platform/design-philosophy-image-2-bnyt.jpg | body | borrowed from gratify-the-intelligent-rewards-and-feedback-platform |
| valyu-ai-empowering-indias-workforce-with-on-demand-earned-wages | plufo/conclusion-image-1-8iav.jpg | body | borrowed from plufo |
| valyu-ai-empowering-indias-workforce-with-on-demand-earned-wages | airtel-xstream-play/conclusion-image-2-j5c9.jpg | body | borrowed from airtel-xstream-play |
| valyu-ai-empowering-indias-workforce-with-on-demand-earned-wages | valyu-ai-empowering-indias-workforce-with-on-demand-earned-wages/899-Wub Web-Airtel-295.png | folder | name carries another client's brand "airtel" (Airtel Xsafe, Airtel Xstream Play) |
| visione-empowering-workforce-development-with-competency-based-assessments | airtel-xstream-play/challenge-image-1-qyrc.jpg | body | borrowed from airtel-xstream-play |
| visione-empowering-workforce-development-with-competency-based-assessments | airtel-xstream-play/design-philosophy-image-2-nx78.jpg | body | borrowed from airtel-xstream-play |
| visione-empowering-workforce-development-with-competency-based-assessments | cartier-careers/design-philosophy-image-1-s2ry.jpg | body | borrowed from cartier-careers |
| visione-empowering-workforce-development-with-competency-based-assessments | airtel-xstream-play/design-philosophy-image-3-drqq.jpg | body | borrowed from airtel-xstream-play |
| visione-empowering-workforce-development-with-competency-based-assessments | indusninja-your-ai-powered-financial-ninja/conclusion-image-2-p79c.jpg | body | borrowed from indusninja-your-ai-powered-financial-ninja |
| visione-empowering-workforce-development-with-competency-based-assessments | accelerating-loyalty-designing-kias-intuitive-customer-dashboard/conclusion-image-2-3zq3.jpg | body | borrowed from accelerating-loyalty-designing-kias-intuitive-customer-dashboard |

## Duplicates (28)

| Case study | File | Duplicate of | Why |
|---|---|---|---|
| accelerating-loyalty-designing-kias-intuitive-customer-dashboard | Style1.png | styles-image-1-sffk.png | same size, same name stem, same folder |
| accelerating-loyalty-designing-kias-intuitive-customer-dashboard | Style2.png | styles-image-2-uvub.png | same size, same name stem, same folder |
| adtech-and-imedia-sculpting-the-visual-identity-of-global-martech-summits | adtech.png | adtech.jpg | same size, same name stem, same folder |
| airtel-xsafe-securing-homes-with-intuitive-digital-experiences | Cover.jpg | cover-image-y42i.jpg | same size, same name stem, same folder |
| airtel-xstream-play-showcasing-indias-unified-digital-entertainment-on-the-web | aiftel.png | aiftel.jpg | same size, same name stem, same folder |
| cartier-redesigning-the-career-website-where-passion-meets-excellence | Style1.png | styles-image-1-5rfo.png | same size, same name stem, same folder |
| cartier-redesigning-the-career-website-where-passion-meets-excellence | Style2.png | styles-image-2-8h8t.png | same size, same name stem, same folder |
| inkompass-cultivating-global-talent-for-a-smoke-free-future | Cover.jpg | cover-image-now0.jpg | same size, same name stem, same folder |
| inkompass-cultivating-global-talent-for-a-smoke-free-future | Solution-1.jpg | solution-image-1-whjr.jpg | same size, same name stem, same folder |
| inkompass-cultivating-global-talent-for-a-smoke-free-future | Solution-2.jpg | solution-image-2-4pa3.jpg | same size, same name stem, same folder |
| inkompass-cultivating-global-talent-for-a-smoke-free-future | Solution-3.jpg | solution-image-3-ls4o.jpg | same size, same name stem, same folder |
| inkompass-cultivating-global-talent-for-a-smoke-free-future | Style 1.png | styles-image-1-48n3.png | same size, same name stem, same folder |
| inkompass-cultivating-global-talent-for-a-smoke-free-future | Style 2.png | styles-image-2-3v8v.png | same size, same name stem, same folder |
| itc-dark-fantasy-x-citadel-personalizing-the-spy-experience | DARK FANTASY.png | DARK FANTASY.jpg | same size, same name stem, same folder |
| ntuc-u-care-fund-digital-transformation-for-enhanced-member-support | Cover.jpg | cover-image-kd0f.jpg | same size, same name stem, same folder |
| ntuc-u-care-fund-digital-transformation-for-enhanced-member-support | Style1.png | styles-image-1-vocm.png | same size, same name stem, same folder |
| ntuc-u-care-fund-digital-transformation-for-enhanced-member-support | Style2.png | styles-image-2-0a6g.png | same size, same name stem, same folder |
| plufo-crafting-an-immersive-edtech-ecosystem-for-young-learners | Style1.png | styles-image-1-3a6k.png | same size, same name stem, same folder |
| plufo-crafting-an-immersive-edtech-ecosystem-for-young-learners | Style2.png | styles-image-2-zpxh.png | same size, same name stem, same folder |
| rideev-powering-the-phygital-ev-revolution-in-india | Cover.jpg | cover-image-uopf.jpg | same size, same name stem, same folder |
| rideev-powering-the-phygital-ev-revolution-in-india | Style1.png | styles-image-1-vbu4.png | same size, same name stem, same folder |
| rideev-powering-the-phygital-ev-revolution-in-india | Style2.png | styles-image-2-mss3.png | same size, same name stem, same folder |
| sadhan-streamlining-driver-onboarding-and-lead-management | Solution-3.jpg | solution-image-3-5vi2.jpg | same size, same name stem, same folder |
| sadhan-streamlining-driver-onboarding-and-lead-management | Style1.png | styles-image-1-az6o.png | same size, same name stem, same folder |
| sadhan-streamlining-driver-onboarding-and-lead-management | Style2.png | styles-image-2-1wd4.png | same size, same name stem, same folder |
| visione-empowering-workforce-development-with-competency-based-assessments | Filler-2.jpg | filler-image-2-vs27.png | same size, same name stem, same folder |
| visione-empowering-workforce-development-with-competency-based-assessments | Style 1.png | styles-image-1-biwo.png | same size, same name stem, same folder |
| visione-empowering-workforce-development-with-competency-based-assessments | Style2.png | styles-image-2-40oc.png | same size, same name stem, same folder |

## Images over 4 MB (21)

| Folder | File | MB | w×h |
|---|---|---|---|
| the-architecture-of-loyalty-designing-the-axis-bank-savings-account-platform | solution-image-2-r03f.jpg | 7.4 | 6670×5375 |
| metcred | challenges-image-ustx.jpg | 6.0 | 6000×4500 |
| indusninja-your-ai-powered-financial-ninja | solution-image-2-z6rs.jpg | 6.0 | 6000×4500 |
| airtel-xstream-play | filler-image-2-lra4.jpg | 5.3 | 6400×4800 |
| inkompass | filler-image-2-szxa.jpg | 5.3 | 6400×4800 |
| rideev | solution-image-2-ntpg.jpg | 5.1 | 6000×4500 |
| plufo | solution-image-3-5ovt.jpg | 4.9 | 6000×4500 |
| sadhan | filler-image-2-5beq.jpg | 4.9 | 6000×4500 |
| the-architecture-of-loyalty-designing-the-axis-bank-savings-account-platform | filler-image-w848.jpg | 4.8 | 6000×4500 |
| the-architecture-of-loyalty-designing-the-axis-bank-savings-account-platform | filler-image-2-67bo.jpg | 4.8 | 6000×4500 |
| demystifying-finance-crafting-the-ux-for-aditya-birla-capital-s-credit-score-tool | filler-image-2-h6aw.jpg | 4.8 | 6000×4500 |
| demystifying-finance-crafting-the-ux-for-aditya-birla-capital-s-credit-score-tool | challenges-image-9iey.jpg | 4.7 | 6000×4500 |
| metcred | MacBook_Mockup_3.jpg | 4.6 | 4000×3000 |
| the-architecture-of-loyalty-designing-the-axis-bank-savings-account-platform | impact.webp | 4.6 | 6000×4500 |
| bankco | conclusion-image-1-nm8l.jpg | 4.6 | 9496×5316 |
| inkompass | filler.webp | 4.5 | 6400×4800 |
| crafting-digital-authority-the-adneto-website-showcase | design-philosophy-image-fxib.jpg | 4.4 | 6400×4800 |
| crafting-digital-elegance-the-tot-bridal-launch-story | 416617103_6c81c7fc-f737-4fff-a70f-792929a638e9-Recovered.jpg | 4.4 | 5958×5727 |
| valyu-ai-empowering-indias-workforce-with-on-demand-earned-wages | challenges-image-7r1u.jpg | 4.2 | 6000×4500 |
| accelerating-loyalty-designing-kias-intuitive-customer-dashboard | filler-image-ynfu.jpg | 4.2 | 3680×2760 |
| metcred | solution-image-2-qzay.jpg | 4.1 | 7800×5300 |

## Videos over 10 MB (4)

| Folder | File | MB | Duration |
|---|---|---|---|
| rideev | Design_Philosophy.mp4 | 24.6 | 25.62 s |
| airtel-xstream-play | 03_AirtelXtream.mp4 | 17.2 | 4.62 s |
| ntuc-u-care-fund-digital-transformation-for-enhanced-member-support | Design_Philosophy.mp4 | 10.5 | 152.79 s |
| indusninja-your-ai-powered-financial-ninja | 06_Indusind_Ninja.mp4 | 10.3 | 6.68 s |

## Pages over 25 MB rendered (4)

| Case study | Files | MB |
|---|---|---|
| inkompass-cultivating-global-talent-for-a-smoke-free-future | 37 | 47.6 |
| plufo-crafting-an-immersive-edtech-ecosystem-for-young-learners | 40 | 33.7 |
| sadhan-streamlining-driver-onboarding-and-lead-management | 32 | 30.9 |
| the-architecture-of-loyalty-designing-the-axis-bank-savings-account-platform | 17 | 37.1 |

## Videos with moov at the end (69)

| Folder | File | MB | Duration |
|---|---|---|---|
| accelerating-loyalty-designing-kias-intuitive-customer-dashboard | kia-thumb.mp4 | 2.2 | 7.3 s |
| accelerating-loyalty-designing-kias-intuitive-customer-dashboard | kia-about.mp4 | 1.7 | 4.67 s |
| adtech-and-imedia-sculpting-the-visual-identity-of-global-martech-summits | adtech-thumb.mp4 | 1.4 | 4.03 s |
| airtel-xsafe | xsafe-about.mp4 | 3.2 | 3.72 s |
| airtel-xsafe | 07.mp4 | 7.3 | 2.23 s |
| airtel-xsafe | 3063fdc0-7782-411d-9712-7761d2ce0836.mp4 | 1.5 | 10.02 s |
| airtel-xsafe | 860063e1-3ab6-4b68-9e71-24d63f0e40a3.mp4 | 4.3 | 10.02 s |
| airtel-xsafe | ee558a3e-fb2d-43ca-bc82-1f9db4ca2de6.mp4 | 2.1 | 10.02 s |
| airtel-xstream-play | Xstream-thumb.mp4 | 1.9 | 6.1 s |
| airtel-xstream-play | Xstream-about.mp4 | 2.0 | 6.1 s |
| airtel-xstream-play | Xstream-dp.mp4 | 3.0 | 4.6 s |
| airtel-xstream-play | 03_AirtelXtream.mp4 | 17.2 | 4.62 s |
| airtel-xstream-play | 04_AirtelXtream.mp4 | 5.7 | 3.58 s |
| airtel-xstream-play | 1a9b1ebf-ee9b-4e6a-8c20-e28cad9a22d6.mp4 | 0.8 | 3 s |
| airtel-xstream-play | 1d2a6881-5103-45d2-a4ee-b0638e193b7f.mp4 | 1.7 | 4.62 s |
| airtel-xstream-play | 6b2b902b-298e-4860-aba2-4345ec773641.mp4 | 0.3 | 3.58 s |
| airtel-xstream-play | bd3af5d8-aa98-4d2d-b150-fc7bd5288100.mp4 | 0.8 | 6.17 s |
| crafting-digital-authority-the-adneto-website-showcase | adneto-thumb.mp4 | 2.5 | 6.03 s |
| bankco | bankco-thumb.mp4 | 3.3 | 9.03 s |
| bankco | bankco-about.mp4 | 2.3 | 4.03 s |
| crafting-digital-authority-the-adneto-website-showcase | adneto-about.mp4 | 3.0 | 5.03 s |
| cartier-careers | cartier-thumb.mp4 | 3.3 | 8.07 s |
| cartier-careers | cartier-about.mp4 | 2.1 | 5.36 s |
| cartier-careers | cartier-dp.mp4 | 2.8 | 4.22 s |
| cartier-careers | cartier-solution.mp4 | 3.7 | 4.93 s |
| crafting-digital-elegance-the-tot-bridal-launch-story | tot-thumb.mp4 | 3.3 | 5.37 s |
| crafting-digital-elegance-the-tot-bridal-launch-story | tot-about.mp4 | 4.1 | 4.03 s |
| crafting-digital-elegance-the-tot-bridal-launch-story | tot-dp.mp4 | 0.9 | 4.03 s |
| demystifying-finance-crafting-the-ux-for-aditya-birla-capital-s-credit-score-tool | abc-thumb.mp4 | 0.7 | 4.03 s |
| inkompass | inkompass-thumb.mp4 | 4.2 | 4.98 s |
| demystifying-finance-crafting-the-ux-for-aditya-birla-capital-s-credit-score-tool | abc-dp.mp4 | 2.2 | 4.03 s |
| gratify-the-intelligent-rewards-and-feedback-platform | gratifi-thumb.mp4 | 5.1 | 4.87 s |
| gratify-the-intelligent-rewards-and-feedback-platform | gratifi-about.mp4 | 2.9 | 4.03 s |
| gratify-the-intelligent-rewards-and-feedback-platform | gratifi-dp.mp4 | 2.8 | 5.63 s |
| indusninja-your-ai-powered-financial-ninja | indusninja-thumb.mp4 | 2.0 | 4.03 s |
| indusninja-your-ai-powered-financial-ninja | 06_Indusind_Ninja.mp4 | 10.3 | 6.68 s |
| inkompass | inkompass-about.mp4 | 2.7 | 5.47 s |
| inkompass | inkompass-dp.mp4 | 3.9 | 3.53 s |
| inkompass | Inkompass_Design-Philosophy.mp4 | 8.3 | 5.58 s |
| metcred | metcred-thumb.mp4 | 0.5 | 3.03 s |
| metcred | metcred-about.mp4 | 2.8 | 4.43 s |
| metcred | metcred-dp.mp4 | 1.5 | 4.03 s |
| metcred | metcred-landing.mp4 | 1.8 | 4 s |
| metcred | Metcred_LP_About-us.mp4 | 3.4 | 7.03 s |
| ntuc-u-care-fund-digital-transformation-for-enhanced-member-support | ntuc-thumb.mp4 | 2.8 | 5 s |
| ntuc-u-care-fund-digital-transformation-for-enhanced-member-support | ntuc-about.mp4 | 0.7 | 5.53 s |
| ntuc-u-care-fund-digital-transformation-for-enhanced-member-support | ntuc-dp.mp4 | 1.7 | 4.03 s |
| ntuc-u-care-fund-digital-transformation-for-enhanced-member-support | ntuc-solution.mp4 | 3.0 | 3.87 s |
| ntuc-u-care-fund-digital-transformation-for-enhanced-member-support | NTUC_Solution.mp4 | 4.6 | 7.85 s |
| plufo | plufo-thumb.mp4 | 5.0 | 9 s |
| plufo | plufo-about.mp4 | 1.9 | 4.03 s |
| plufo | plufo-dp.mp4 | 3.0 | 6.67 s |
| rideev | RideEV-thumb.mp4 | 3.0 | 3.97 s |
| rideev | RideEV-about.mp4 | 1.6 | 4.03 s |
| rideev | RideEV-dp.mp4 | 0.7 | 6.97 s |
| rideev | Design_Philosophy.mp4 | 24.6 | 25.62 s |
| sadhan | sadhan-thumb.mp4 | 3.4 | 6.4 s |
| sadhan | sadhan_thumb.mp4 | 2.7 | 7.27 s |
| sadhan | sadhan-about.mp4 | 0.8 | 3 s |
| sadhan | sadhan-dp.mp4 | 3.7 | 11.22 s |
| sbs-transit-engineering-the-future-of-multimodal-urban-mobility | sbs-about.mp4 | 3.5 | 3.72 s |
| sbs-transit-engineering-the-future-of-multimodal-urban-mobility | SBS_About-us.mp4 | 5.8 | 5.55 s |
| the-architecture-of-loyalty-designing-the-axis-bank-savings-account-platform | axis-thumb.mp4 | 4.2 | 7.03 s |
| the-architecture-of-loyalty-designing-the-axis-bank-savings-account-platform | axis-about.mp4 | 2.2 | 4 s |
| the-architecture-of-loyalty-designing-the-axis-bank-savings-account-platform | axis-dp.mp4 | 2.1 | 4 s |
| valyu-ai-empowering-indias-workforce-with-on-demand-earned-wages | Valyu-thumb.mp4 | 2.4 | 5.37 s |
| valyu-ai-empowering-indias-workforce-with-on-demand-earned-wages | Valyu-about.mp4 | 1.7 | 4.08 s |
| visione | visione-thumb.mp4 | 3.7 | 5.37 s |
| visione | visione-about.mp4 | 1.7 | 4 s |

## Videos without a poster file (21)

| Folder | File | Duration | Audio track |
|---|---|---|---|
| airtel-xsafe | 03.mp4 | 10.02 s | no |
| airtel-xsafe | 07.mp4 | 2.23 s | no |
| airtel-xsafe | 3063fdc0-7782-411d-9712-7761d2ce0836.mp4 | 10.02 s | no |
| airtel-xsafe | 860063e1-3ab6-4b68-9e71-24d63f0e40a3.mp4 | 10.02 s | no |
| airtel-xsafe | ee558a3e-fb2d-43ca-bc82-1f9db4ca2de6.mp4 | 10.02 s | no |
| airtel-xstream-play | 03_AirtelXtream.mp4 | 4.62 s | no |
| airtel-xstream-play | 04_AirtelXtream.mp4 | 3.58 s | no |
| airtel-xstream-play | 1a9b1ebf-ee9b-4e6a-8c20-e28cad9a22d6.mp4 | 3 s | no |
| airtel-xstream-play | 1d2a6881-5103-45d2-a4ee-b0638e193b7f.mp4 | 4.62 s | no |
| airtel-xstream-play | 6b2b902b-298e-4860-aba2-4345ec773641.mp4 | 3.58 s | no |
| airtel-xstream-play | bd3af5d8-aa98-4d2d-b150-fc7bd5288100.mp4 | 6.17 s | yes |
| indusninja-your-ai-powered-financial-ninja | 06_Indusind_Ninja.mp4 | 6.68 s | no |
| indusninja-your-ai-powered-financial-ninja | slice (online-video-cutter.com).mp4 | 4.03 s | no |
| inkompass | Inkompass_Design-Philosophy.mp4 | 5.58 s | no |
| metcred | Metcred_LP_About-us.mp4 | 7.03 s | no |
| ntuc-u-care-fund-digital-transformation-for-enhanced-member-support | Design_Philosophy.mp4 | 152.79 s | yes |
| ntuc-u-care-fund-digital-transformation-for-enhanced-member-support | NTUC_Solution.mp4 | 7.85 s | no |
| rideev | Design_Philosophy.mp4 | 25.62 s | no |
| sadhan | sadhan_thumb.mp4 | 7.27 s | no |
| sbs-transit-engineering-the-future-of-multimodal-urban-mobility | SBS_About-us.mp4 | 5.55 s | no |
| sbs-transit-engineering-the-future-of-multimodal-urban-mobility | SBS-opening.mp4 | 29.74 s | yes |

## Header not read (0)

None.

## Same file in two or more folders (0)

None.

## Per case study

### Media report: accelerating-loyalty-designing-kias-intuitive-customer-dashboard

- Own folder: accelerating-loyalty-designing-kias-intuitive-customer-dashboard (decided by cover path)
- Files: 36 (33 own, 3 borrowed; 17 folder only), 44.1 MB total (summed)
- Shapes: landscape 27, wide 1, tall 3, square 3, scrollshot 2; videos 2
- Folder-only flows: A316ed6d 1ceb 4ac5 b197 55017975878a 1, E57fcd94 1f57 4827 a1e8 8be8517eb8f 1, 826fdc58 e9a4 45e0 a367 142a73aa2d6c 1, Td 8099 td mockup 1, Challenge image 1, Conclusion image 1, Customers 1, D9df15ce edf4 42e7 b058 75870c4949e 1, Dashboard 1, Frame 1, Free iPad Pro Mockup 1, Home page 1, Loyalty 1, Rewards 1, Scene 1, Style 2
- Dead: none
- Duplicates: Style1.png, Style2.png
- Suspects: challenge-image-1-duwn.jpg (borrowed from crafting-digital-elegance-the-tot-bridal-launch-story); design-philosophy-image-1-ohd3.jpg (borrowed from crafting-digital-elegance-the-tot-bridal-launch-story); conclusion-image-1-m6oa.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase)
- Over 4 MB images: filler-image-ynfu.jpg
- Over 10 MB videos: none
- moov at end: kia-thumb.mp4, kia-about.mp4
- No poster: none
- Rendered bytes for the v2 page: 23.1 MB in 15 files (budget 25 MB)

### Media report: adtech-and-imedia-sculpting-the-visual-identity-of-global-martech-summits

- Own folder: adtech-and-imedia-sculpting-the-visual-identity-of-global-martech-summits (decided by cover path)
- Files: 24 (24 own, 0 borrowed; 22 folder only), 34.1 MB total (summed)
- Shapes: landscape 12, wide 8, square 3, tall 1; videos 2
- Folder-only flows: Screens 6, Adtech 2, Adtech copy 1, Adtech ND 3, Banner 12 1, Banner 22 08 2022 1, Banner 3, Carousel 2, Image 1, ME 1, Vsb 1
- Dead: none
- Duplicates: adtech.png
- Suspects: none
- Over 4 MB images: none
- Over 10 MB videos: none
- moov at end: adtech-thumb.mp4
- No poster: none
- Rendered bytes for the v2 page: 2.3 MB in 1 files (budget 25 MB)

### Media report: airtel-xsafe-securing-homes-with-intuitive-digital-experiences

- Own folder: airtel-xsafe (decided by cover path)
- Files: 45 (40 own, 5 borrowed; 25 folder only), 51.7 MB total (summed)
- Shapes: landscape 41, wide 1, square 2; videos 8
- Folder-only flows: Screens 6, Fdc0 7782 411d 9712 7761d2ce 1, Cam Expanded 1, E1 3ab6 4b68 9e71 24d63f0e40a 1, Airtel Xsafe 1 7, Cover 1, Ee558a3e fb2d 43ca bc82 1f9db4ca2de 1, Group 5, Style 2
- Dead: Xsafe_thumb.mp4
- Duplicates: Cover.jpg
- Suspects: design-philosophy-image-2-nx78.jpg (borrowed from airtel-xstream-play); design-philosophy-image-3-drqq.jpg (borrowed from airtel-xstream-play); styles-image-1-ctd5.png (borrowed from airtel-xstream-play); styles-image-2-2lht.png (borrowed from airtel-xstream-play); Xsafe_thumb.mp4 (borrowed from Airtel Xsafe; not on the media store (wugweb.online))
- Over 4 MB images: none
- Over 10 MB videos: none
- moov at end: xsafe-about.mp4, 07.mp4, 3063fdc0-7782-411d-9712-7761d2ce0836.mp4, 860063e1-3ab6-4b68-9e71-24d63f0e40a3.mp4, ee558a3e-fb2d-43ca-bc82-1f9db4ca2de6.mp4
- No poster: 03.mp4, 07.mp4, 3063fdc0-7782-411d-9712-7761d2ce0836.mp4, 860063e1-3ab6-4b68-9e71-24d63f0e40a3.mp4, ee558a3e-fb2d-43ca-bc82-1f9db4ca2de6.mp4
- Rendered bytes for the v2 page: 13.8 MB in 14 files (budget 25 MB)

### Media report: airtel-xstream-play-showcasing-indias-unified-digital-entertainment-on-the-web

- Own folder: airtel-xstream-play (decided by cover path)
- Files: 44 (40 own, 4 borrowed; 25 folder only), 66.1 MB total (summed)
- Shapes: landscape 41, wide 1, square 2; videos 9
- Folder-only flows: AirtelXtream 4, A9b1ebf ee9b 4e6a 8c20 e28cad9a22d 1, D2a6881 5103 45d2 a4ee b0638e193b7f 1, B2b902b 298e 4860 aba2 4345ec 1, Aiftel 5, Airtel 1, Airtelxtream 1, Bd3af5d8 aa98 4d2d b150 fc7bd 1, Challenges image 1, Design philosophy image 3, Filler Image 2, IPad Pro Showcase Scene Free psd Mockup 1, Solution 3
- Dead: none
- Duplicates: aiftel.png
- Suspects: solution-image-3-5685.jpg (borrowed from airtel-xsafe); design-philosophy-image-1-ohd3.jpg (borrowed from crafting-digital-elegance-the-tot-bridal-launch-story); design-philosophy-image-f43i.jpg (borrowed from accelerating-loyalty-designing-kias-intuitive-customer-dashboard); design-philosophy-image-2-e1ky.jpg (borrowed from crafting-digital-elegance-the-tot-bridal-launch-story)
- Over 4 MB images: filler-image-2-lra4.jpg
- Over 10 MB videos: 03_AirtelXtream.mp4
- moov at end: Xstream-thumb.mp4, Xstream-about.mp4, Xstream-dp.mp4, 03_AirtelXtream.mp4, 04_AirtelXtream.mp4, 1a9b1ebf-ee9b-4e6a-8c20-e28cad9a22d6.mp4, 1d2a6881-5103-45d2-a4ee-b0638e193b7f.mp4, 6b2b902b-298e-4860-aba2-4345ec773641.mp4, bd3af5d8-aa98-4d2d-b150-fc7bd5288100.mp4
- No poster: 03_AirtelXtream.mp4, 04_AirtelXtream.mp4, 1a9b1ebf-ee9b-4e6a-8c20-e28cad9a22d6.mp4, 1d2a6881-5103-45d2-a4ee-b0638e193b7f.mp4, 6b2b902b-298e-4860-aba2-4345ec773641.mp4, bd3af5d8-aa98-4d2d-b150-fc7bd5288100.mp4
- Rendered bytes for the v2 page: 15.9 MB in 14 files (budget 25 MB)

### Media report: bankco-revolutionizing-financial-engagement-with-a-super-app

- Own folder: bankco (decided by cover path)
- Files: 42 (26 own, 16 borrowed; 10 folder only), 54.9 MB total (summed)
- Shapes: landscape 34, wide 2, square 5, tall 1; videos 4
- Folder-only flows: Free Macbook Pro Mockup On Podium 1, Client logo qhmv 1, Frame 2, Free Hand Holding iPhone 16 Pro Mockup 1, Free iPhone Pro in Hands Mockup 1, Free Keyboard With Tablet Mockup 1, Group 1, IPhone with Accessories Mockup 1, Scene #5 (Light) 1
- Dead: none
- Duplicates: none
- Suspects: adneto-thumb.mp4 (borrowed from crafting-digital-authority-the-adneto-website-showcase); client-logo-enb1.png (borrowed from crafting-digital-authority-the-adneto-website-showcase); cover-image-jx5x.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase); challenge-image-2-res4.jpg (borrowed from accelerating-loyalty-designing-kias-intuitive-customer-dashboard); solution-image-1-tle0.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase); solution-image-3-h10z.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase); design-philosophy-image-fxib.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase); design-philosophy-image-3-m3jq.jpg (borrowed from accelerating-loyalty-designing-kias-intuitive-customer-dashboard); design-philosophy-image-f43i.jpg (borrowed from accelerating-loyalty-designing-kias-intuitive-customer-dashboard); styles-image-1-p7wt.png (borrowed from crafting-digital-elegance-the-tot-bridal-launch-story); styles-image-2-0y40.png (borrowed from crafting-digital-elegance-the-tot-bridal-launch-story); filler-image-ikvs.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase); filler-image-2-0ves.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase); conclusion-image-1-m6oa.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase); conclusion-image-2-74t5.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase); adneto-about.mp4 (borrowed from crafting-digital-authority-the-adneto-website-showcase)
- Over 4 MB images: design-philosophy-image-fxib.jpg, conclusion-image-1-nm8l.jpg
- Over 10 MB videos: none
- moov at end: adneto-thumb.mp4, bankco-thumb.mp4, bankco-about.mp4, adneto-about.mp4
- No poster: none
- Rendered bytes for the v2 page: 24.6 MB in 17 files (budget 25 MB)

### Media report: cartier-redesigning-the-career-website-where-passion-meets-excellence

- Own folder: cartier-careers (decided by cover path)
- Files: 54 (52 own, 2 borrowed; 34 folder only), 47.8 MB total (summed)
- Shapes: landscape 25, wide 1, square 3, tall 21, phone 4; videos 4
- Folder-only flows: Cartier Homepage 1, Cartier solution 1, Cartier 1, Conclusion image 2, Group 25, Search job 2000x2000px 1, Solution 1, Style 2
- Dead: none
- Duplicates: Style1.png, Style2.png
- Suspects: conclusion-image-2-74t5.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase); conclusion-image-1-m6oa.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase)
- Over 4 MB images: none
- Over 10 MB videos: none
- moov at end: cartier-thumb.mp4, cartier-about.mp4, cartier-dp.mp4, cartier-solution.mp4
- No poster: none
- Rendered bytes for the v2 page: 17.6 MB in 17 files (budget 25 MB)

### Media report: crafting-digital-authority-the-adneto-website-showcase

- Own folder: crafting-digital-authority-the-adneto-website-showcase (decided by cover path)
- Files: 28 (23 own, 5 borrowed; 8 folder only), 31.9 MB total (summed)
- Shapes: landscape 26, wide 1, tall 1; videos 3
- Folder-only flows: Screens 2, Free Ipad Pro Mockup With Pencil 1, Free iPad Pro With Magic Keyboard Mockup On Podium 1, Free iPad Pro With Magic Keyboard Mockup 1, Free Macbook Pro 16 Mockup 1, Free J Mockups iPhone 15 Pro 1, Scene # 1
- Dead: none
- Duplicates: none
- Suspects: challenge-image-1-duwn.jpg (borrowed from crafting-digital-elegance-the-tot-bridal-launch-story); design-philosophy-image-1-ohd3.jpg (borrowed from crafting-digital-elegance-the-tot-bridal-launch-story); design-philosophy-image-2-e1ky.jpg (borrowed from crafting-digital-elegance-the-tot-bridal-launch-story); styles-image-1-p7wt.png (borrowed from crafting-digital-elegance-the-tot-bridal-launch-story); styles-image-2-0y40.png (borrowed from crafting-digital-elegance-the-tot-bridal-launch-story); https://cdn.dribbble.com/userupload/16487628/file/original-88bef965e49135ae61f0bfd6894cdf7a.mp4 (not on the media store (cdn.dribbble.com))
- Over 4 MB images: design-philosophy-image-fxib.jpg
- Over 10 MB videos: none
- moov at end: adneto-thumb.mp4, adneto-about.mp4
- No poster: none
- Rendered bytes for the v2 page: 18.4 MB in 14 files (budget 25 MB)

### Media report: crafting-digital-elegance-the-tot-bridal-launch-story

- Own folder: crafting-digital-elegance-the-tot-bridal-launch-story (decided by cover path)
- Files: 40 (36 own, 4 borrowed; 20 folder only), 54.2 MB total (summed)
- Shapes: square 4, landscape 34, wide 1, tall 1; videos 3
- Folder-only flows: Free iPad Pro With Magic Keyboard Mockup 1, Free Macbook Pro Mockup On Podium 1, OS5KHU 1, 6c81c7fc f737 4fff a70f 792929a638e9 Recovered 2, Screens 5, Frame 1, Free Hand Holding iPhone 16 Pro Mockup 1, Free Keyboard With Tablet Mockup 1, Image 6, Scene #5 (Light) 1
- Dead: none
- Duplicates: none
- Suspects: client-logo-enb1.png (borrowed from crafting-digital-authority-the-adneto-website-showcase); challenge-image-1-qyrc.jpg (borrowed from airtel-xstream-play); conclusion-image-1-m6oa.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase); conclusion-image-2-74t5.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase); 6541956_66.jpg (stock?); 8887533_738.jpg (stock?); 9070912_156.jpg (stock?); 9425749_11369.jpg (stock?); 9550771_230.jpg (stock?)
- Over 4 MB images: 416617103_6c81c7fc-f737-4fff-a70f-792929a638e9-Recovered.jpg
- Over 10 MB videos: none
- moov at end: tot-thumb.mp4, tot-about.mp4, tot-dp.mp4
- No poster: none
- Rendered bytes for the v2 page: 18.1 MB in 16 files (budget 25 MB)

### Media report: demystifying-finance-crafting-the-ux-for-aditya-birla-capital-s-credit-score-tool

- Own folder: demystifying-finance-crafting-the-ux-for-aditya-birla-capital-s-credit-score-tool (decided by cover path)
- Files: 49 (41 own, 8 borrowed; 29 folder only), 32.8 MB total (summed)
- Shapes: landscape 17, wide 1, square 13, tall 9, phone 7; videos 5
- Folder-only flows: Expanded Card 4, Screens 2, ABC Credit 1, Error Styling 1, Property 1=Default 1, Property 1=Variant 8, Property 1=Variant13 2, Property 1=Variant5 1, Results 2, S Homepage Default 7
- Dead: abc_about.mp4, abc-about.mp4
- Duplicates: none
- Suspects: design-philosophy-image-2-3a81.jpg (borrowed from metcred); challenge-image-1-ms9n.jpg (borrowed from bankco); design-philosophy-image-1-l13k.jpg (borrowed from the-architecture-of-loyalty-designing-the-axis-bank-savings-account-platform); design-philosophy-image-2-2vd9.jpg (borrowed from the-architecture-of-loyalty-designing-the-axis-bank-savings-account-platform); challenge-image-1-pbhm.jpg (borrowed from metcred); inkompass-thumb.mp4 (borrowed from inkompass; name carries another client's brand "inkompass" (Inkompass)); abc_about.mp4 (borrowed from Aditya Birla Credit; not on the media store (wugweb.online)); abc-about.mp4 (borrowed from aditya-birla-capital; not on the media store (wugweb.pages.dev))
- Over 4 MB images: challenges-image-9iey.jpg, filler-image-2-h6aw.jpg
- Over 10 MB videos: none
- moov at end: abc-thumb.mp4, inkompass-thumb.mp4, abc-dp.mp4
- No poster: none
- Rendered bytes for the v2 page: 22.5 MB in 11 files (budget 25 MB)

### Media report: eekenlife-redefining-footwear-e-commerce-for-the-next-generation

- Own folder: none (decided by none (no cover, thumbnail, slug folder or body image))
- Files: 0 (0 own, 0 borrowed; 0 folder only), 0.0 MB total (summed)
- Shapes: none; videos 0
- Folder-only flows: none
- Dead: none
- Duplicates: none
- Suspects: none
- Over 4 MB images: none
- Over 10 MB videos: none
- moov at end: none
- No poster: none
- Rendered bytes for the v2 page: 0.0 MB in 0 files (budget 25 MB)

### Media report: global-trade-finance-engineering-an-authority-first-lead-generation-engine

- Own folder: global-trade-finance-engineering-an-authority-first-lead-generation-engine (decided by folder named after the slug)
- Files: 1 (1 own, 0 borrowed; 1 folder only), 2.0 MB total (summed)
- Shapes: landscape 1; videos 0
- Folder-only flows: Global trade fin 1
- Dead: none
- Duplicates: none
- Suspects: none
- Over 4 MB images: none
- Over 10 MB videos: none
- moov at end: none
- No poster: none
- Rendered bytes for the v2 page: 0.0 MB in 0 files (budget 25 MB)

### Media report: gratify-the-intelligent-rewards-and-feedback-platform

- Own folder: gratify-the-intelligent-rewards-and-feedback-platform (decided by cover path)
- Files: 63 (50 own, 13 borrowed; 42 folder only), 43.5 MB total (summed)
- Shapes: landscape 30, wide 3, tall 3, square 2, phone 25; videos 3
- Folder-only flows: Free Iphone 15 Pro On Concrete Brick Mockup 3, Free iPhone 16 Pro Mockup Holding By Hand 3, Client logo 5nzb 1, Conclusion image 1, Congrats 1, Design philosophy image 1, Design 1, Filler image 2, Form 1 Introduction 1, Form 10 Rating 1, Form 11 Log answeer 1, Form 12 Thank You 1, Form 2 Input 1, Form 2 MCQ 1, Form 3 Radio Butten 1, Form 4 Image Selection 1, Form 5 Score 1, Form 5 Short Answer 1, Form 1, Form 7 Checkbox 1, Form 8 file Upload 2, Form 9 Date & Time 1, Gratift 1, Group 1, Home 1, My Profile 2, My Rewards 1, Profile 1, Reward Detail 1, Solution image 3, Splash 2, Widgets 1
- Dead: none
- Duplicates: none
- Suspects: client-logo-enb1.png (borrowed from crafting-digital-authority-the-adneto-website-showcase); cover-image-jx5x.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase); challenge-image-1-duwn.jpg (borrowed from crafting-digital-elegance-the-tot-bridal-launch-story); solution-image-1-tle0.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase); solution-image-2-7adq.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase); solution-image-3-h10z.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase); design-philosophy-image-3-i2kz.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase); styles-image-1-p7wt.png (borrowed from crafting-digital-elegance-the-tot-bridal-launch-story); styles-image-2-0y40.png (borrowed from crafting-digital-elegance-the-tot-bridal-launch-story); filler-image-ikvs.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase); filler-image-2-0ves.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase); conclusion-image-1-m6oa.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase); conclusion-image-2-74t5.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase)
- Over 4 MB images: none
- Over 10 MB videos: none
- moov at end: gratifi-thumb.mp4, gratifi-about.mp4, gratifi-dp.mp4
- No poster: none
- Rendered bytes for the v2 page: 12.7 MB in 8 files (budget 25 MB)

### Media report: ikan-the-next-generation-corporate-mental-healthcare-platform

- Own folder: none (decided by none (no cover, thumbnail, slug folder or body image))
- Files: 0 (0 own, 0 borrowed; 0 folder only), 0.0 MB total (summed)
- Shapes: none; videos 0
- Folder-only flows: none
- Dead: none
- Duplicates: none
- Suspects: none
- Over 4 MB images: none
- Over 10 MB videos: none
- moov at end: none
- No poster: none
- Rendered bytes for the v2 page: 0.0 MB in 0 files (budget 25 MB)

### Media report: indusninja-your-ai-powered-financial-ninja

- Own folder: indusninja-your-ai-powered-financial-ninja (decided by cover path)
- Files: 42 (37 own, 5 borrowed; 22 folder only), 38.7 MB total (summed)
- Shapes: landscape 26, square 2, phone 14; videos 5
- Folder-only flows: Indusind Ninja 1, Screens 14, Airtel Xsafe 1 6, Slice (online video cutter.com) 1
- Dead: none
- Duplicates: none
- Suspects: challenge-image-1-xrsy.jpg (borrowed from cartier-careers); challenge-image-1-duwn.jpg (borrowed from crafting-digital-elegance-the-tot-bridal-launch-story); design-philosophy-image-2-aa9g.jpg (borrowed from cartier-careers); design-philosophy-image-3-x1qg.jpg (borrowed from cartier-careers); conclusion-image-2-3zq3.jpg (borrowed from accelerating-loyalty-designing-kias-intuitive-customer-dashboard); Airtel Xsafe 1 – 11.png (name carries another client's brand "airtel" (Airtel Xsafe, Airtel Xstream Play)); Airtel Xsafe 1 – 12.png (name carries another client's brand "airtel" (Airtel Xsafe, Airtel Xstream Play)); Airtel Xsafe 1 – 13.png (name carries another client's brand "airtel" (Airtel Xsafe, Airtel Xstream Play)); Airtel Xsafe 1 – 3.png (name carries another client's brand "airtel" (Airtel Xsafe, Airtel Xstream Play)); Airtel Xsafe 1 – 7.png (name carries another client's brand "airtel" (Airtel Xsafe, Airtel Xstream Play)); Airtel Xsafe 1 – 8.png (name carries another client's brand "airtel" (Airtel Xsafe, Airtel Xstream Play))
- Over 4 MB images: solution-image-2-z6rs.jpg
- Over 10 MB videos: 06_Indusind_Ninja.mp4
- moov at end: indusninja-thumb.mp4, 06_Indusind_Ninja.mp4
- No poster: 06_Indusind_Ninja.mp4, slice (online-video-cutter.com).mp4
- Rendered bytes for the v2 page: 16.2 MB in 14 files (budget 25 MB)

### Media report: inkompass-cultivating-global-talent-for-a-smoke-free-future

- Own folder: inkompass (decided by cover path)
- Files: 74 (69 own, 5 borrowed; 30 folder only), 87.8 MB total (summed)
- Shapes: landscape 40, wide 1, square 2, tall 14, scrollshot 1, phone 15; videos 4
- Folder-only flows: Home Hamburger 1, Home 1, Program Details 1, Discover PMI 1, Explore Opportunities 1, 01 Market Scenario 2 2, 03 Market Scenario 3 1, 04 Market Country Dropdown 1, Testimonial 1, FAQs 1, Contact Us 1, Company Information 1, Screens 1, Chanllenges 1, Cover 1, Filler 2, Group 2, Impact 2, Inkompass Design Philosophy 1, Inkompass 2, Solution 3, Style 2
- Dead: https://wugweb.pages.dev/assets/uncode/case/redesigning-inkompass-cultivating-global-talent-for-a-smoke-free-future/02_Program-Details-copy-1.png
- Duplicates: Cover.jpg, Solution-1.jpg, Solution-2.jpg, Solution-3.jpg, Style 1.png, Style 2.png
- Suspects: design-philosophy-image-1-bh4r.jpg (borrowed from bankco); design-philosophy-image-f43i.jpg (borrowed from accelerating-loyalty-designing-kias-intuitive-customer-dashboard); design-philosophy-image-3-m3jq.jpg (borrowed from accelerating-loyalty-designing-kias-intuitive-customer-dashboard); conclusion-image-2-74t5.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase); conclusion-image-1-m6oa.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase); https://wugweb.pages.dev/assets/uncode/case/redesigning-inkompass-cultivating-global-talent-for-a-smoke-free-future/02_Program-Details-copy-1.png (not on the media store (wugweb.pages.dev)); 05_01.png (stock?); 17_404.png (stock?)
- Over 4 MB images: filler-image-2-szxa.jpg, filler.webp
- Over 10 MB videos: none
- moov at end: inkompass-thumb.mp4, inkompass-about.mp4, inkompass-dp.mp4, Inkompass_Design-Philosophy.mp4
- No poster: Inkompass_Design-Philosophy.mp4
- Rendered bytes for the v2 page: 47.6 MB in 37 files (budget 25 MB) **over**

### Media report: itc-dark-fantasy-x-citadel-personalizing-the-spy-experience

- Own folder: itc-dark-fantasy-x-citadel-personalizing-the-spy-experience (decided by cover path)
- Files: 24 (24 own, 0 borrowed; 23 folder only), 10.6 MB total (summed)
- Shapes: phone 19, landscape 5; videos 1
- Folder-only flows: Screens 15, DARK FANTASY 2, ITC 1, ITC Sunfeast 1, ITC Sunfeast DARK FANTASY 1, Screenshot 2023 05 04 at 4.30.54 AM 1, Screenshot 2023 05 05 at 9.22.43 AM 1, Screenshot 2023 05 09 at 6.40.42 PM 1
- Dead: none
- Duplicates: DARK FANTASY.png
- Suspects: none
- Over 4 MB images: none
- Over 10 MB videos: none
- moov at end: none
- No poster: none
- Rendered bytes for the v2 page: 0.9 MB in 1 files (budget 25 MB)

### Media report: labelly-immutable-product-verification-via-blockchain-integration

- Own folder: none (decided by none (no cover, thumbnail, slug folder or body image))
- Files: 0 (0 own, 0 borrowed; 0 folder only), 0.0 MB total (summed)
- Shapes: none; videos 0
- Folder-only flows: none
- Dead: none
- Duplicates: none
- Suspects: none
- Over 4 MB images: none
- Over 10 MB videos: none
- moov at end: none
- No poster: none
- Rendered bytes for the v2 page: 0.0 MB in 0 files (budget 25 MB)

### Media report: linkedin-sales-navigator-optimizing-the-social-selling-interface

- Own folder: none (decided by none (no cover, thumbnail, slug folder or body image))
- Files: 0 (0 own, 0 borrowed; 0 folder only), 0.0 MB total (summed)
- Shapes: none; videos 0
- Folder-only flows: none
- Dead: none
- Duplicates: none
- Suspects: none
- Over 4 MB images: none
- Over 10 MB videos: none
- moov at end: none
- No poster: none
- Rendered bytes for the v2 page: 0.0 MB in 0 files (budget 25 MB)

### Media report: metcred-the-avant-garde-of-banking-designing-the-zero-fee-mobile-experience

- Own folder: metcred (decided by cover path)
- Files: 56 (51 own, 5 borrowed; 35 folder only), 45.6 MB total (summed)
- Shapes: landscape 36, wide 1, square 1, phone 17, scrollshot 1; videos 5
- Folder-only flows: Free iPhone 16 Pro Mockup Holding By Hand 1, F 1, Account Home 1, App Setting 1, Bill Payment 3, Card Home 1, Case Studies Metcred App Free Hand Holding iPhone 16 Pro Mockup 1, Case Studies Metcred App Free K Mockups iPhone 15 Pro 1, Case Studies Metcred LP Free Hand Holding iPhone 16 Pro Mockup 1, Case Studies Metcred LP Free K Mockups iPhone 15 Pro 1, Credit card studio 1, Free L Mockups MacBook Air 1, Free iPhone Pro in Hands Mockup 1, Home 1, IPad Pro Showcase Scene Free psd Mockup 1, IPad Proand iPhone Pro Showcase Screens Free psd Mockup 1, IPhone 11 Pro Mockup 1, IPhone 15 Pro Showcase Screen Scene psd Mockup 1, IPhone with Accessories Mockup 1, Landing Page Home (Revised) 1, LogIn 2, MacBook Mockup 1, Metcred LP About us 1, METCRED 1, Money Transfer (Test) 3, Onboarding 1, Payment 1, Profile 2, Registration 1
- Dead: none
- Duplicates: none
- Suspects: conclusion-image-2-08ud.jpg (borrowed from airtel-xsafe); design-philosophy-image-1-bh4r.jpg (borrowed from bankco); design-philosophy-image-3-m3jq.jpg (borrowed from accelerating-loyalty-designing-kias-intuitive-customer-dashboard); conclusion-image-2-74t5.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase); conclusion-image-1-m6oa.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase)
- Over 4 MB images: challenges-image-ustx.jpg, solution-image-2-qzay.jpg, MacBook_Mockup_3.jpg
- Over 10 MB videos: none
- moov at end: metcred-thumb.mp4, metcred-about.mp4, metcred-dp.mp4, metcred-landing.mp4, Metcred_LP_About-us.mp4
- No poster: Metcred_LP_About-us.mp4
- Rendered bytes for the v2 page: 23.4 MB in 15 files (budget 25 MB)

### Media report: nsl-oilchem-digitizing-the-lifecycle-of-industrial-waste-management

- Own folder: nsl-oilchem-digitizing-the-lifecycle-of-industrial-waste-management (decided by folder named after the slug)
- Files: 3 (3 own, 0 borrowed; 3 folder only), 3.6 MB total (summed)
- Shapes: landscape 3; videos 0
- Folder-only flows: NSL 2, NSL Oil Chem 1
- Dead: none
- Duplicates: none
- Suspects: none
- Over 4 MB images: none
- Over 10 MB videos: none
- moov at end: none
- No poster: none
- Rendered bytes for the v2 page: 0.0 MB in 0 files (budget 25 MB)

### Media report: ntuc-u-care-fund-digital-transformation-for-enhanced-member-support

- Own folder: ntuc-u-care-fund-digital-transformation-for-enhanced-member-support (decided by cover path)
- Files: 63 (57 own, 6 borrowed; 43 folder only), 52.5 MB total (summed)
- Shapes: landscape 38, square 3, tall 22; videos 6
- Folder-only flows: APM02 Programme Create 1, APM04 Programs – Details Filled 1, B2 Assistance Programmes 1, Cover 1, Design Philosophy 1, Filler 1, Group 31, NTUC Solution 1, NTUC 1, NTUC U Care Fund 1, Solution 1, Style 2
- Dead: none
- Duplicates: Cover.jpg, Style1.png, Style2.png
- Suspects: challenge-image-1-duwn.jpg (borrowed from crafting-digital-elegance-the-tot-bridal-launch-story); design-philosophy-image-1-ohd3.jpg (borrowed from crafting-digital-elegance-the-tot-bridal-launch-story); design-philosophy-image-2-e1ky.jpg (borrowed from crafting-digital-elegance-the-tot-bridal-launch-story); design-philosophy-image-3-i2kz.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase); conclusion-image-1-m6oa.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase); conclusion-image-2-74t5.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase)
- Over 4 MB images: none
- Over 10 MB videos: Design_Philosophy.mp4
- moov at end: ntuc-thumb.mp4, ntuc-about.mp4, ntuc-dp.mp4, ntuc-solution.mp4, NTUC_Solution.mp4
- No poster: Design_Philosophy.mp4, NTUC_Solution.mp4
- Rendered bytes for the v2 page: 17.6 MB in 13 files (budget 25 MB)

### Media report: plufo-crafting-an-immersive-edtech-ecosystem-for-young-learners

- Own folder: plufo (decided by cover path)
- Files: 59 (58 own, 1 borrowed; 15 folder only), 38.8 MB total (summed)
- Shapes: landscape 50, square 2, phone 5; videos 3
- Folder-only flows: Cover 1, Mapped assets Plufo 1, Mask Group 4, P04 Home 1, P05 achedule 2, P05 FAQ 1, P05 message 1, P05 Profile 1, Style 2, Uncode case plufo crafting an immersive edtech ecosystem for young learners Plufo 1
- Dead: https://wugweb.pages.dev/assets/uncode/case/plufo-crafting-an-immersive-edtech-ecosystem-for-young-learners/Plufo.png, https://wugweb.pages.dev/assets/uncode/case/plufo-crafting-an-immersive-edtech-ecosystem-for-young-learners/Group-56973.png
- Duplicates: Style1.png, Style2.png
- Suspects: conclusion-image-2-j5c9.jpg (borrowed from airtel-xstream-play); https://wugweb.pages.dev/assets/uncode/case/plufo-crafting-an-immersive-edtech-ecosystem-for-young-learners/Plufo.png (not on the media store (wugweb.pages.dev)); https://wugweb.pages.dev/assets/uncode/case/plufo-crafting-an-immersive-edtech-ecosystem-for-young-learners/Group-56973.png (not on the media store (wugweb.pages.dev))
- Over 4 MB images: solution-image-3-5ovt.jpg
- Over 10 MB videos: none
- moov at end: plufo-thumb.mp4, plufo-about.mp4, plufo-dp.mp4
- No poster: none
- Rendered bytes for the v2 page: 33.7 MB in 40 files (budget 25 MB) **over**

### Media report: rak-sme-scaling-the-tech-infrastructure-for-ras-al-khaimah-business-ecosystem

- Own folder: rak-sme-scaling-the-tech-infrastructure-for-ras-al-khaimah-business-ecosystem (decided by folder named after the slug)
- Files: 5 (5 own, 0 borrowed; 5 folder only), 0.1 MB total (summed)
- Shapes: landscape 3, wide 1, square 1; videos 0
- Folder-only flows: Mapped assets Case Studies RAK RAK SME colored 1, Mapped assets RAK Logo RAK SME colored 1, RAK SME colored 1, RAK SME 1, RAK SME white 1
- Dead: none
- Duplicates: none
- Suspects: none
- Over 4 MB images: none
- Over 10 MB videos: none
- moov at end: none
- No poster: none
- Rendered bytes for the v2 page: 0.0 MB in 0 files (budget 25 MB)

### Media report: rideev-powering-the-phygital-ev-revolution-in-india

- Own folder: rideev (decided by cover path)
- Files: 48 (42 own, 6 borrowed; 28 folder only), 70.0 MB total (summed)
- Shapes: landscape 32, square 2, phone 5, tall 7, wide 2; videos 4
- Folder-only flows: Homepage 1, Screens 4, Listing 1, Product 1, Business 1, Booking Successful 1, Cover 1, Design Philosophy 1, Filler 1, Group 12, RideEV 1, Solution 1, Style 2
- Dead: none
- Duplicates: Cover.jpg, Style1.png, Style2.png
- Suspects: challenge-image-2-ihqu.jpg (borrowed from gratify-the-intelligent-rewards-and-feedback-platform); challenge-image-2-res4.jpg (borrowed from accelerating-loyalty-designing-kias-intuitive-customer-dashboard); design-philosophy-image-1-jcjs.jpg (borrowed from gratify-the-intelligent-rewards-and-feedback-platform); design-philosophy-image-2-bnyt.jpg (borrowed from gratify-the-intelligent-rewards-and-feedback-platform); conclusion-image-2-74t5.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase); conclusion-image-1-m6oa.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase)
- Over 4 MB images: solution-image-2-ntpg.jpg
- Over 10 MB videos: Design_Philosophy.mp4
- moov at end: RideEV-thumb.mp4, RideEV-about.mp4, RideEV-dp.mp4, Design_Philosophy.mp4
- No poster: Design_Philosophy.mp4
- Rendered bytes for the v2 page: 20.2 MB in 13 files (budget 25 MB)

### Media report: sadhan-streamlining-driver-onboarding-and-lead-management

- Own folder: sadhan (decided by cover path)
- Files: 64 (61 own, 3 borrowed; 27 folder only), 40.2 MB total (summed)
- Shapes: landscape 39, square 5, tall 12, phone 8; videos 4
- Folder-only flows: Cover 1, Da 2, DA 1, F 3, Mask Group 1, MOCK 1, Sadhan 1, Solution 1, Style 2, Onboarding 1, Step 1, Details 1, Details DCO 1, Driver 6, Successful Digilocker Additional Docs 1, Upload Documents 1, 02 Aadhar Card 1, Group 1
- Dead: none
- Duplicates: Solution-3.jpg, Style1.png, Style2.png
- Suspects: challenge-image-2-jr4r.jpg (borrowed from airtel-xstream-play); design-philosophy-image-3-i2kz.jpg (borrowed from crafting-digital-authority-the-adneto-website-showcase); conclusion-image-1-bcir.jpg (borrowed from airtel-xstream-play)
- Over 4 MB images: filler-image-2-5beq.jpg
- Over 10 MB videos: none
- moov at end: sadhan-thumb.mp4, sadhan_thumb.mp4, sadhan-about.mp4, sadhan-dp.mp4
- No poster: sadhan_thumb.mp4
- Rendered bytes for the v2 page: 30.9 MB in 32 files (budget 25 MB) **over**

### Media report: sbs-transit-engineering-the-future-of-multimodal-urban-mobility

- Own folder: sbs-transit-engineering-the-future-of-multimodal-urban-mobility (decided by cover path)
- Files: 3 (3 own, 0 borrowed; 2 folder only), 13.2 MB total (summed)
- Shapes: landscape 2, phone 1; videos 3
- Folder-only flows: SBS About us 1, SBS opening 1
- Dead: none
- Duplicates: none
- Suspects: none
- Over 4 MB images: none
- Over 10 MB videos: none
- moov at end: sbs-about.mp4, SBS_About-us.mp4
- No poster: SBS_About-us.mp4, SBS-opening.mp4
- Rendered bytes for the v2 page: 3.5 MB in 1 files (budget 25 MB)

### Media report: stayweb-pms-a-next-gen-hospitality-engine-powered-by-ai-and-design-systems

- Own folder: none (decided by none (no cover, thumbnail, slug folder or body image))
- Files: 0 (0 own, 0 borrowed; 0 folder only), 0.0 MB total (summed)
- Shapes: none; videos 0
- Folder-only flows: none
- Dead: none
- Duplicates: none
- Suspects: none
- Over 4 MB images: none
- Over 10 MB videos: none
- moov at end: none
- No poster: none
- Rendered bytes for the v2 page: 0.0 MB in 0 files (budget 25 MB)

### Media report: suzlon-reimagining-global-energy-through-minimalist-technical-excellence

- Own folder: none (decided by none (no cover, thumbnail, slug folder or body image))
- Files: 0 (0 own, 0 borrowed; 0 folder only), 0.0 MB total (summed)
- Shapes: none; videos 0
- Folder-only flows: none
- Dead: none
- Duplicates: none
- Suspects: none
- Over 4 MB images: none
- Over 10 MB videos: none
- moov at end: none
- No poster: none
- Rendered bytes for the v2 page: 0.0 MB in 0 files (budget 25 MB)

### Media report: the-architecture-of-loyalty-designing-the-axis-bank-savings-account-platform

- Own folder: the-architecture-of-loyalty-designing-the-axis-bank-savings-account-platform (decided by cover path)
- Files: 21 (18 own, 3 borrowed; 0 folder only), 37.6 MB total (summed)
- Shapes: landscape 19, wide 1, square 1; videos 3
- Folder-only flows: none
- Dead: none
- Duplicates: none
- Suspects: design-philosophy-image-2-3a81.jpg (borrowed from metcred); challenge-image-1-ms9n.jpg (borrowed from bankco); challenge-image-1-pbhm.jpg (borrowed from metcred)
- Over 4 MB images: solution-image-2-r03f.jpg, filler-image-w848.jpg, filler-image-2-67bo.jpg, impact.webp
- Over 10 MB videos: none
- moov at end: axis-thumb.mp4, axis-about.mp4, axis-dp.mp4
- No poster: none
- Rendered bytes for the v2 page: 37.1 MB in 17 files (budget 25 MB) **over**

### Media report: unified-hrms-redefining-the-employee-lifecycle-through-automation

- Own folder: none (decided by none (no cover, thumbnail, slug folder or body image))
- Files: 0 (0 own, 0 borrowed; 0 folder only), 0.0 MB total (summed)
- Shapes: none; videos 0
- Folder-only flows: none
- Dead: none
- Duplicates: none
- Suspects: none
- Over 4 MB images: none
- Over 10 MB videos: none
- moov at end: none
- No poster: none
- Rendered bytes for the v2 page: 0.0 MB in 0 files (budget 25 MB)

### Media report: valyu-ai-empowering-indias-workforce-with-on-demand-earned-wages

- Own folder: valyu-ai-empowering-indias-workforce-with-on-demand-earned-wages (decided by cover path)
- Files: 50 (43 own, 7 borrowed; 30 folder only), 26.8 MB total (summed)
- Shapes: landscape 36, wide 1, square 2, tall 4, phone 7; videos 2
- Folder-only flows: Screens 9, Wub Web Airtel 1, Banner 1, Company missing 2, Group 5, Landing page 2, Login 1, Screenshot 2024 03 17 at 1.53.24 PM 1, Screenshot 2024 03 17 at 1.53.29 PM 1, Screenshot 2024 03 17 at 1.53.34 PM 1, Screenshot 2024 03 17 at 1.53.39 PM 1, Screenshot 2024 03 17 at 1.53.44 PM 1, Screenshot 2024 03 17 at 1.53.49 PM 1, Screenshot 2024 03 17 at 1.53.55 PM 1, Valyu 1, VALYU copy 1
- Dead: none
- Duplicates: none
- Suspects: challenge-image-2-fvqv.jpg (borrowed from plufo); challenge-image-1-0nbl.jpg (borrowed from plufo); design-philosophy-image-1-y3de.jpg (borrowed from rideev); design-philosophy-image-1-jcjs.jpg (borrowed from gratify-the-intelligent-rewards-and-feedback-platform); design-philosophy-image-2-bnyt.jpg (borrowed from gratify-the-intelligent-rewards-and-feedback-platform); conclusion-image-1-8iav.jpg (borrowed from plufo); conclusion-image-2-j5c9.jpg (borrowed from airtel-xstream-play); 899-Wub Web-Airtel-295.png (name carries another client's brand "airtel" (Airtel Xsafe, Airtel Xstream Play))
- Over 4 MB images: challenges-image-7r1u.jpg
- Over 10 MB videos: none
- moov at end: Valyu-thumb.mp4, Valyu-about.mp4
- No poster: none
- Rendered bytes for the v2 page: 11.9 MB in 12 files (budget 25 MB)

### Media report: visione-empowering-workforce-development-with-competency-based-assessments

- Own folder: visione (decided by cover path)
- Files: 44 (38 own, 6 borrowed; 24 folder only), 27.6 MB total (summed)
- Shapes: landscape 37, square 7; videos 2
- Folder-only flows: Screens 13, Cover 1, Design philosophy image 2, Filler 2, Group 4, Style 2
- Dead: none
- Duplicates: Filler-2.jpg, Style 1.png, Style2.png
- Suspects: challenge-image-1-qyrc.jpg (borrowed from airtel-xstream-play); design-philosophy-image-2-nx78.jpg (borrowed from airtel-xstream-play); design-philosophy-image-1-s2ry.jpg (borrowed from cartier-careers); design-philosophy-image-3-drqq.jpg (borrowed from airtel-xstream-play); conclusion-image-2-p79c.jpg (borrowed from indusninja-your-ai-powered-financial-ninja); conclusion-image-2-3zq3.jpg (borrowed from accelerating-loyalty-designing-kias-intuitive-customer-dashboard)
- Over 4 MB images: none
- Over 10 MB videos: none
- moov at end: visione-thumb.mp4, visione-about.mp4
- No poster: none
- Rendered bytes for the v2 page: 16.3 MB in 13 files (budget 25 MB)

### Media report: wave-group-crafting-a-multi-conglomerate-interactive-experience

- Own folder: wave-group-crafting-a-multi-conglomerate-interactive-experience (decided by folder named after the slug)
- Files: 1 (1 own, 0 borrowed; 1 folder only), 0.0 MB total (summed)
- Shapes: landscape 1; videos 0
- Folder-only flows: Wave 1
- Dead: none
- Duplicates: none
- Suspects: none
- Over 4 MB images: none
- Over 10 MB videos: none
- moov at end: none
- No poster: none
- Rendered bytes for the v2 page: 0.0 MB in 0 files (budget 25 MB)

### Media report: witty-vegan-democratizing-plant-based-diversity-through-culture

- Own folder: none (decided by none (no cover, thumbnail, slug folder or body image))
- Files: 0 (0 own, 0 borrowed; 0 folder only), 0.0 MB total (summed)
- Shapes: none; videos 0
- Folder-only flows: none
- Dead: none
- Duplicates: none
- Suspects: none
- Over 4 MB images: none
- Over 10 MB videos: none
- moov at end: none
- No poster: none
- Rendered bytes for the v2 page: 0.0 MB in 0 files (budget 25 MB)

### Media report: woodkraft-elevating-indias-largest-corporate-fit-out-legacy

- Own folder: woodkraft-elevating-indias-largest-corporate-fit-out-legacy (decided by folder named after the slug)
- Files: 1 (1 own, 0 borrowed; 1 folder only), 1.2 MB total (summed)
- Shapes: landscape 1; videos 0
- Folder-only flows: Woodkraft 1
- Dead: none
- Duplicates: none
- Suspects: none
- Over 4 MB images: none
- Over 10 MB videos: none
- moov at end: none
- No poster: none
- Rendered bytes for the v2 page: 0.0 MB in 0 files (budget 25 MB)

### Media report: wugweb-kits-the-full-stack-infrastructure-for-multi-platform-design

- Own folder: none (decided by none (no cover, thumbnail, slug folder or body image))
- Files: 0 (0 own, 0 borrowed; 0 folder only), 0.0 MB total (summed)
- Shapes: none; videos 0
- Folder-only flows: none
- Dead: none
- Duplicates: none
- Suspects: none
- Over 4 MB images: none
- Over 10 MB videos: none
- moov at end: none
- No poster: none
- Rendered bytes for the v2 page: 0.0 MB in 0 files (budget 25 MB)

### Media report: wugweb-revamp-the-living-manifesto-of-digital-perfection

- Own folder: none (decided by none (no cover, thumbnail, slug folder or body image))
- Files: 0 (0 own, 0 borrowed; 0 folder only), 0.0 MB total (summed)
- Shapes: none; videos 0
- Folder-only flows: none
- Dead: none
- Duplicates: none
- Suspects: none
- Over 4 MB images: none
- Over 10 MB videos: none
- moov at end: none
- No poster: none
- Rendered bytes for the v2 page: 0.0 MB in 0 files (budget 25 MB)

