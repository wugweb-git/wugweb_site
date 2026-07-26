# Driftime® Recreation — Design System & Audit Log

This file tracks everything confirmed from source material vs. what's inferred/placeholder in
this rebuild. Update this file whenever new source evidence arrives or a fix is made.

Source evidence hierarchy (highest to lowest confidence):
1. **Raw uploaded `.html` source, parsed as data** — the saved pages are a Next.js/Sanity CMS app;
   the full CMS JSON payload (including tab states never visually rendered) is embedded in the
   page as hydration data. Grepping this directly is ground truth, higher confidence than OCR.
2. `web_fetch` on live driftime.com — real current content, text-only, catches things that have
   changed since the saved HTML was captured.
3. Screen recording OCR (`home.mov`) — exact on-screen text, good for confirming interactive
   states (e.g. discovering the tabs were functional), but recording only captured what the user
   happened to click.
4. User screenshots — exact visual, single moment in time, useful for colors/layout.
5. Inference from pattern-matching — clearly flagged, needs verification.

**Lesson learned this session:** the raw HTML source (evidence tier 1) had answers to almost every
open question from the previous audit — it just required grepping the embedded JSON rather than
treating the file as only "what's visibly rendered." Mine this first before falling back to
OCR/inference next time.

---

## 1. Typography — unchanged, see prior entries
Body: self-hosted `Geist`. Display: `Archivo Black` (substitute for paid commercial font `landour`).

## 2. Color tokens — unchanged, see prior entries
`--ink #040404`, `--card #1c1c1d`, `--cream #f5f3ee`, `--orange #fc6444`, `--gold #f1bd75`,
`--strategy-bg #363732`, `--brand-bg #1e2d53`, `--digital-bg #c84525`.
`--reporting-bg` is still **unconfirmed/invented** — no screenshot or recording has shown this
section's actual background color yet.

## 3. RESOLVED — Service tier toggle tabs (was §4 open question)

Confirmed directly from the embedded CMS JSON in the saved HTML (not just OCR guesswork). Every
service has exactly two tabs. **All four Partnership tabs share the same price: "Starting From ·
£20K + VAT"** — earlier assumption of an escalating/different price per service (I had guessed
£30K for Brand/Digital/Reporting) was wrong.

**Structural rule confirmed:** the first tab (Masterclass/Foundations) has **two buttons** ("Learn
More" → Figma deck, plus a second CTA). The Partnership tab has **only one button** ("Contact Us",
send icon, internal link to `/contact`) — no Learn More on Partnership. Fixed in this pass; earlier
build incorrectly gave every Partnership panel two buttons.

| Service | Tab 1 | Tab 1 price | Tab 2 (Partnership) copy | Partnership price |
|---|---|---|---|---|
| Strategy | Masterclass | Per Seat · £399+VAT | "A bespoke creative, digital and communications strategy partnership for the bigger projects and bolder ambitions that need dedicated thinking." | Starting From · £20K+VAT |
| Brand | Foundations | Fixed Fee · £15K+VAT | "A bespoke brand partnership with dedicated creative resource for the projects that need more room, whether that's a full rebrand, a campaign identity, or something nobody's done before." | Starting From · £20K+VAT |
| Digital | Foundations | Fixed Fee · £15K+VAT | "A bespoke digital partnership for the builds that need more scope, from complex platforms to custom functionality, with dedicated resource shaped around your project." | Starting From · £20K+VAT |
| Reporting | Foundations | Fixed Fee · £15K+VAT | "A bespoke reporting partnership for the bigger stories, whether that's a flagship impact report, a multi-year review, or a narrative that needs real creative weight behind it." | Starting From · £20K+VAT |

All four rows now verbatim-confirmed. No more placeholders here.

## 4. RESOLVED — Client logo grid (was §5 open question)

Confirmed exact spellings by grepping the full brand/client list embedded in the source JSON
(much more reliable than OCR). Corrected in this pass:

- "FINNISH INSTITUTE UK+IRELAND" → **"The Finnish Institute in the UK and Ireland"** (real name,
  no "+" stylization)
- "Sustainable Banking" (OCR guess) → **"Sustainable Banking Hub"** (confirmed exact)
- "Global Center for Health Diplomacy and Inclusion" logo lockup → uses short acronym **"CeHDI"**
  as the primary mark (confirmed from source, matches the CSF-style acronym+subtitle pattern)
- Indagare, Roadrunner Ventures, Green Guarantee Group, shuddl, CSF — all spellings confirmed
  exact, no change needed

Note: the source also contains a much larger master brand list (300+ orgs: Alucinari, Boho
Beautiful, Nespresso, SEGA, Save the Children, Oxford University Press, IDEO, European Commission,
etc.) — this is clearly a sitewide "all brands ever referenced" table (press mentions, associates,
case studies), **not** the specific 8-logo homepage grid. Did not pull from this larger list for
the homepage grid; only used it to verify spelling of the 8 names already identified via the
recording.

## 5. RESOLVED — "2024 Impact Report" is now "2025 Impact Report"

Live `web_fetch` on driftime.com's homepage (fetched fresh, same session) shows the report link
has rolled over to **`2025.driftime.com`** / "2025 Impact Report" — both in the Reporting service
gallery and the footer. Updated everywhere in this build.

**Caveat:** fetching `driftime.com/contact` in the same session showed the *old* "2024 Impact
Report" / `2024.driftime.com` in its footer — i.e. the live site itself has an inconsistency
between pages (likely a caching/deploy timing artifact on their end). Treated the homepage fetch
as authoritative since it's the freshest and most-viewed page.

## 6. UNRESOLVED — Contact modal office photos

User screenshot (2026-07-26) confirms the real Contact modal shows actual interior photos for the
London (brick wall, teal/orange armchairs) and Brighton (navy lounge) office cards — not text-only
as I'd simplified it to.

Traced this properly: found the **exact Sanity CDN asset IDs** in the saved HTML's embedded JSON:
- London: `image-f25b89868f563b6d68382387ff225f3b35bae36c-1270x847-jpg`
- Brighton: referenced similarly (ID starts `481bed3e6cd50080...`, not fully captured)

These specific two images were **never downloaded** into any of the zip files the user provided —
the contact modal is client-side rendered and only fetches its images when opened, so a "save
complete webpage" capture (which doesn't trigger JS interactions) skipped them. Confirmed they
don't exist anywhere in the assets I have by hash search.

Tried to fetch the constructed CDN URL directly — blocked (`web_fetch` only allows URLs that
already appeared in a prior search/fetch result, and this constructed URL didn't qualify).
Fetching `driftime.com/contact` didn't surface them either — that route's contact-form content is
JS-hydrated, not present in the static-fetched HTML.

**Decision:** left office cards text-only rather than substitute a found stock/editorial photo of
"The Conduit" or "Projects Nile House" from a generic image search — those would be real venues
but not Driftime's own photography, and general web images carry uncertain licensing for reuse in
a delivered site. **If the user can right-click → save image on those two specific thumbnails from
their own browser and share the files, they can be dropped in directly** — that's the cleanest
path to closing this gap.

## 7. Still open / needs more source material

- [ ] Reporting section background color — zero evidence, still an invented placeholder
- [ ] The two office interior photos (see §6)
- [ ] Whether hero chip order/content is currently "Finnish Institute / Secure Energy / Only One /
      Art Not Evidence" (per 2026-07-13 screenshots) or has rotated to include "Driftime's 2025
      Impact Report" as seen in a 2026-07-26 live fetch — hero content appears to rotate/update
      over time; not treating this as a fixed thing to chase further unless asked

## 8. Confirmed-correct, no changes needed (running list)
- Hero headline, homepage intro paragraph (verbatim)
- Brand gallery images/order: Secure Energy, Instant Aid, Art Not Evidence, Sea Legacy
- Digital gallery images/order: Only One, Finnish Institute, Design Declares, CCFF
- Reporting gallery images/order: WHEB Group, Impact Report, Beyond Trends, Only One 2023 Report
- Footer nav structure, CTA copy, "Learn more about our approach" link, "Pace of Change" featured
  card, bleed wordmark
- All Figma "Learn More" deep links (Strategy/Brand/Digital/Reporting)
- News grid content and links (after this session's copy-accuracy fixes)
