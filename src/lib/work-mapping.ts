/**
 * Case study → service pillar mapping.
 *
 * The proper join is `caseStudy.services[] -> service`, and it is **empty on
 * all 57 published case studies** — so nothing can be mapped through it yet.
 * Until an editor populates it, the only real signal is `disciplines`, which is
 * well filled: 34 distinct values across the set, led by `ux design` (37),
 * `strategy` (34), `ui design` (26), `product design` (16), `branding` (12).
 *
 * The old filter compared a discipline to the pillar slug directly, which only
 * ever hit `strategy` — the vocabulary says "branding", not "brand", and
 * nothing at all says "experience", "engineering" or "growth". Four of the six
 * service pages therefore rendered no work section.
 *
 * Every key below is a discipline that actually appears in the data (verified
 * 2026-09-09). Add to it rather than loosening the matching: a substring rule
 * would put "content strategy" under Strategy and "systems design" under
 * Experience, both wrong.
 */
const DISCIPLINE_TO_PILLARS: Record<string, string[]> = {
  // Strategy
  strategy: ['strategy'],
  consulting: ['strategy'],
  leadership: ['strategy'],
  'content strategy': ['strategy', 'brand'],

  // Brand
  branding: ['brand'],
  'visual identity': ['brand'],
  'creative direction': ['brand'],
  'visual design': ['brand', 'experience'],

  // Experience
  'ux design': ['experience'],
  'ui design': ['experience'],
  'ux/ui design': ['experience'],
  'ui/ux design': ['experience'],
  'product ui/ux': ['experience'],
  'product design': ['experience'],
  'interaction design': ['experience'],
  'dashboard design': ['experience'],
  'mobility ux': ['experience'],
  'erp design': ['experience', 'operations'],
  'data visualization': ['experience', 'growth'],

  // Engineering
  'web development': ['engineering'],
  'website development': ['engineering'],
  'frontend development': ['engineering'],
  'frontend engineering': ['engineering'],
  'backend development': ['engineering'],
  'full-stack development': ['engineering'],
  'e-commerce development': ['engineering', 'growth'],
  'creative technology': ['engineering', 'brand'],
  'cms architecture': ['engineering'],
  'content architecture': ['engineering', 'brand'],

  // Operations
  'systems integration': ['operations', 'engineering'],
  'systems architecture': ['operations', 'engineering'],
  'system architecture': ['operations', 'engineering'],
  'systems design': ['operations', 'engineering'],
};

export type CaseStudyLike = {
  slug?: string;
  title?: string;
  disciplines?: string[];
  tags?: string[];
  industry?: string;
  services?: { slug?: string }[];
  featured?: boolean;
};

const norm = (s: unknown) => String(s ?? '').trim().toLowerCase();

/** Pillars a case study belongs to, most reliable source first. */
export function pillarsFor(cs: CaseStudyLike): Set<string> {
  const out = new Set<string>();

  // 1. The explicit reference, if an editor ever fills it in.
  (cs.services || []).forEach((s) => s?.slug && out.add(norm(s.slug)));

  // 2. Disciplines, via the table above.
  (cs.disciplines || []).forEach((d) => {
    (DISCIPLINE_TO_PILLARS[norm(d)] || []).forEach((p) => out.add(p));
  });

  // 3. Tags naming a pillar outright — rare, but free to honour.
  (cs.tags || []).forEach((t) => {
    const n = norm(t);
    if (['strategy', 'brand', 'experience', 'engineering', 'growth', 'operations'].includes(n)) {
      out.add(n);
    }
  });

  return out;
}

/**
 * Related work for a pillar: mapped, de-duplicated, featured first.
 *
 * De-duplicated **on title, not slug**. 13 of the 57 published case studies are
 * duplicate documents with the same title but different slugs and ids — e.g.
 * `caseStudy-airtel-xsafe` and
 * `caseStudy-airtel-xsafe-securing-homes-with-intuitive-digital-experiences`.
 * Keying on the slug therefore misses them, which is what printed Airtel Xsafe
 * and Airtel Xstream Play twice each on `/services/strategy`. The shorter slug
 * wins because the list is ordered `featured desc, publishedAt desc` and it
 * comes first. The duplicates themselves are a content problem — see pending.
 */
export function relatedWorkFor<T extends CaseStudyLike>(all: T[], pillar: string, limit = 4): T[] {
  const p = norm(pillar);
  const seen = new Set<string>();
  return (all || [])
    .filter((cs) => pillarsFor(cs).has(p))
    .filter((cs) => {
      const key = norm(cs.title) || norm(cs.slug);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
    .slice(0, limit);
}
