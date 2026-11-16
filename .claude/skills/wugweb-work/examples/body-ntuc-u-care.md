# Example: NTUC U Care Fund, Body Content v2 proposal (web platform archetype)

A complete worked example of Body mode, from the 2026-11-11 reference audit. It shows the output format in `references/ops-cycle.md`: what changes, the proposed body, screen selection, owner questions, flagged screens, every own-folder file accounted for, and the block plan. Nothing here has been written to the source.

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
- The 6 borrowed stock images (ToT Bridal and Adneto folders) leave the NTUC body in the proposal; the files themselves are untouched.

### Block plan the resolver should produce from this body

hero (cover `NTUC.jpg`, no stats) → chapter + loop → chapter + points (4, grid 2×2) → chapter + points (4) + rail "Member" (8 phone screens) + figure (mockup) + loop → rail "States" (4) → chapter + wall "Dashboard" (9 landscape, lightbox) + figure (mockup) + loop → chapter + points (4) + pair (2 desktop) + rail "Back office" (5 phone) → chapter + steps (6) + rail "Cases" (3) → chapter + points (6, grid 3×2) + pair (Styles, 50:50, native size) → chapter (prose) → credits → related → next. Rendered media sums to 25.1 MB on the page (27.9 MB counting the card thumbnail video) against 52.5 MB in the folder, which sits on the 25 MB warning line: the largest are `NTUC_Solution.mp4` (4.6 MB) and the `challenges-image-9uky.jpg` mockup (2.9 MB); dropping that mockup brings the page to 22.2 MB. No file wider than its natural width; nothing cropped.
