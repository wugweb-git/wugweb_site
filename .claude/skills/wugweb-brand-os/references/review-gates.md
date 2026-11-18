# Review gates

The check lists for Visual check and Fact check, the scoring, and the rights labels. Every result is a finding for the owner; nothing is edited.

## Findings format

One row per finding:

| Field | Holds |
| --- | --- |
| Where | The exact place in the piece |
| What | The element or the quoted claim, as seen, without interpretation |
| Rule | The rule or gate it breaks, why it matters, and the reference file that holds it |
| Severity | Must fix (breaks a brand rule or carries risk), should fix (inconsistent), or nice to have (preference) |
| Fix | What to change, as current to proposed, in the piece's own style |

Keep taste apart from real problems. A taste note is labelled "taste" and is never a must fix. Use words for severity, not emoji. Open with the overall impression, say what works, and close with the top three fixes in order. Match the depth of the review to the stage of the work.

## Positioning check on a draft

Before any wording review, confirm the piece says who it is for, what it replaces and why Wugweb. If it does not, report "fix positioning first" and stop. Wording review is `wugweb-voice`'s job.

## Visual check

Run in this order. How to look at each point is in `visual-os/judging-a-visual.md`.

1. **Mode.** Name the one visual mode. Two modes blended casually is a fail.
2. **Claim.** One claim, one tension, one proof, one outcome. The idea survives with the headline removed.
3. **Anchor.** One dominant anchor and no competing focal point.
4. **Proof.** A meaningful relationship between person, object and interface. A real photo or screenshot comes before generated imagery.
5. **Banned motifs.** Any item on the banned list in `visual-os/art-direction.md` is a fail, named.
6. **Cover rule.** A case-study cover shows a project-specific object or outcome. A generic laptop or dashboard is a fail.
7. **Colour.** Yellow at 10% or less and kept for the final call to action; text never pure white; accents limited. Points still open with the owner are reported as "not decided", not failed.
8. **Media rules.** Check against the media rules in `docs/skills/STANDING-RULES.md`: cropping, re-encoding, aspect ratio, and a mask over the proof.
9. **Format.** The format's row in `visual-os/formats-and-campaigns.md` is met, and the piece reads at its final size.
10. **Rights.** Every photograph, screenshot, logo and reference has a rights label.

Also approve only when these hold: rounded language, asymmetry and breathing room; a limited palette with controlled photography; it looks art-directed, not machine-made; the fixed brand rules in `SKILL.md` and the media rules in `docs/skills/STANDING-RULES.md` hold.

Result: pass or fail, the mode chosen, each finding, and what could not be judged (for example, a brief with no image).

## Scoring (source: `brand_guidelines/09_VALIDATION/Scoring.md`)

Score each of ten points from 0 to 2: concept, hierarchy, brand language, craft, differentiation, object and interface logic, palette and density, human role, accessibility, compliance. Production work needs 16 out of 20 with no zero. Revise by removing or replacing the weakest component, not by adding.

## Quality gates (source: `Quality_Gates.md`)

- **Concept:** one idea survives without the headline.
- **Composition:** one focal point and adequate negative space.
- **Brand:** palette, rounded language and collage logic are present.
- **Craft:** the interface is credible and no artefacts or text errors remain.
- **Compliance:** no banned motifs and no unsafe claims.

Take the gates in this order and stop at the first that fails. A weak concept is not fixed by craft.

## Common failures (source: `Common_Mistakes.md`)

Adding cards to cover an unclear concept; showing AI as a robot or brain; reusing the same profile-card metaphor; decorative people beside an interface; filling negative space with connectors; using every colour equally; treating a generated scene as a composed collage.

## Fact check

1. List every claim about Wugweb in the copy: numbers, names, dates, places, counts, descriptors, "first", "only", "leading".
2. Look each one up in `brand-facts.md`.
3. Mark each **approved** (status approved or fixed) or not approved, with the status and source `brand-facts.md` records, or say it is absent.
4. Never soften, round or replace a number that is not approved. Report it.
5. Claims about a client are not checked here; they belong to the case study in `wugweb-work`.
6. Positioning claims are checked against `identity-and-positioning.md`. While the line is blank, any stated positioning line is not approved.

Also report any of these, each as a finding:

- A superlative with no evidence.
- A comparison with a named competitor the owner has not approved.
- A quote without a named source and permission.
- A number without its source and date.

Signs positioning is broken, to report when seen: more than one descriptor in the same piece, a difference with no proof, a line a competitor could use unchanged.

## Rights labels (source: `06_SOURCE_AND_RIGHTS.md`)

Every reusable reference carries one label: `owned`, `licensed`, `public-reference-only`, or `generated`.

- Record the source of every photograph, screenshot, logo, external reference and generated asset.
- Confirm permission or licence for external imagery and fonts.
- No client product screen, customer data or identifiable person without approval.
- Other studios' work is principle-level inspiration only. Never copy a composition, typography, imagery or campaign asset.
- Never present generated work as a real product screenshot, a real client outcome or a real photograph.
