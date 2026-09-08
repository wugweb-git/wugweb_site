/**
 * Supporting line for each capability sub-service, shown under the title in the
 * `/services/[slug]` showcase.
 *
 * Source: `Wugweb_Services 2026.md` (the services copy deck referenced in
 * CLAUDE.md) — verbatim, not rewritten. Keys are normalised titles via
 * `mediaKey()`, so Sanity wording changes like "Voice & Tone" → "Voice and Tone"
 * still resolve.
 *
 * This is a stopgap that mirrors the existing `services-data.ts` pattern. The
 * real home for this copy is Sanity: `service.capabilities[].items` is currently
 * `string[]`, so there is nowhere to store a description. Promoting `items` to
 * `{ title, blurb }` objects retires this file.
 *
 * A missing entry is a supported state — the row renders title-only.
 */

const COPY_BY_PILLAR: Record<string, Record<string, string>> = {
  brand: {
    'brand strategy':
      'Define your purpose, positioning, values, and competitive advantage to create a strong strategic foundation.',
    'brand positioning':
      'Establish a clear market position that differentiates your business and communicates why customers should choose you.',
    'brand identity systems':
      'Design scalable visual identity systems including logos, typography, color, iconography, and brand assets.',
    'messaging framework':
      'Develop messaging that communicates your value proposition consistently across every channel.',
    'voice tone':
      'Create communication guidelines that give your brand a distinct and authentic personality.',
    // Deck heading was "Naming & Brand Architecture"; Sanity calls it "Naming & Nomenclature".
    'naming nomenclature':
      'Develop memorable names and scalable brand structures for products, services, and organizations.',
    'brand guidelines':
      'Document visual, verbal, and experiential standards to maintain consistency as your brand grows.',

    // ---- DUMMY COPY — NOT FROM THE SERVICES DECK. REPLACE BEFORE LAUNCH. ----
    // The deck has no entry for these three. Placeholder text only, so the
    // layout is consistent while the pattern is reviewed. Deliberately neutral:
    // no numbers, claims, or client references that could ship as fact.
    'brand narrative':
      'Shape the story behind the brand — origin, purpose, and the through-line that carries every message.',
    'employer branding':
      'Extend the brand inward so hiring, onboarding, and culture communication feel like the same organisation.',
    'brand activation':
      'Take the identity to market across campaigns, launches, environments, and every customer touchpoint.',
    // ---- end dummy copy ----
  },
};

/** Shares `mediaKey`'s normalisation so both maps use identical keys. */
function copyKey(title: string): string {
  return String(title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function serviceCopyFor(pillar: string, title: string): string {
  return COPY_BY_PILLAR[pillar]?.[copyKey(title)] ?? '';
}
