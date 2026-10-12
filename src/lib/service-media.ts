/**
 * Media manifest for the `/services/[slug]` capability showcase.
 *
 * `public/` is not walkable at SSR time on Workers, so the mapping from a
 * capability item title → its clip lives here as data. Keys are normalised
 * titles (lowercase, alphanumerics only) so Sanity copy edits like
 * "Voice & Tone" → "Voice and Tone" still resolve.
 *
 * Anything absent from this map renders the media-less placeholder state —
 * that is the intended default, not a failure. Add entries as real footage
 * lands; do not guess a clip onto a sub-service it does not depict.
 *
 * Path map (see docs/r2-assets.md): local public/assets/<path>
 *                                   ↔ site /assets/<path> ↔ R2 assets/<path>
 * Every consumer routes these through `assetUrl()`.
 *
 * Poster convention, produced alongside each clip:
 *   <dir>/<file>.mp4              the clip
 *   <dir>/posters/<file>.webp     640w poster, used as the <video poster>
 *   <dir>/posters/<file>.blur.webp  40w poster, upscaled by the browser as the
 *                                   crossfading backdrop (no filter: blur cost)
 */

export type ServiceMedia = {
  video: string;
  /** Doubles as the <video poster> and the full-bleed backdrop image — one
   *  request serves both, and the glass panel's backdrop-filter does the
   *  blurring, exactly as the reference component does it. */
  poster: string;
};

type MediaRef = {
  dir: string;
  file: string;
  /** Set where the `posters/` sibling has not been generated yet. Without it
   *  the <video poster> 404s and the frame paints empty until playback starts. */
  noPoster?: boolean;
};

/**
 * 100% coverage map (2026-10-04). Every sub-service in the six pillars resolves
 * to a clip. Entries tagged STAND-IN reuse footage that does not depict the
 * sub-service — they exist so no row renders the empty placeholder while real
 * footage is produced. Search for "STAND-IN" to find and replace them.
 * Keys cover both the merged names and the older names that fold into them.
 * Clips live in the retained folders services/{brand,engineering,experience,growth}.
 */
const MEDIA_BY_PILLAR: Record<string, Record<string, MediaRef>> = {
  brand: {
    'brand strategy': { dir: 'site/services/brand', file: 'Brand Position Strategy' },
    'brand positioning': { dir: 'site/services/brand', file: 'Brand Experience' },
    'brand narrative': { dir: 'site/services/brand', file: 'Narrative Architecture' },
    'brand identity systems': { dir: 'site/services/brand', file: 'Brand Identity Systems' },
    'naming nomenclature': { dir: 'site/services/brand', file: 'Naming Nomenclature' },
    'messaging framework': { dir: "site/services/growth", file: "Immersive Content Strategies" }, // STAND-IN: reused clip, replace with real footage
    'voice tone': { dir: 'site/services/brand', file: 'Voice Tone' },
    'employer branding': { dir: 'site/services/brand', file: 'Brand Audit Analysis' },
    'brand guidelines': { dir: 'site/services/brand', file: 'Brand Evolution Management' },
    'brand activation': { dir: 'site/services/brand', file: 'Brand activation' },
  },
  strategy: {
    "business strategy": { dir: "site/services/brand", file: "Brand Position Strategy" }, // STAND-IN: reused clip, replace with real footage
    "business model design": { dir: "site/services/engineering", file: "Bespoke Digital Solutions" }, // STAND-IN: reused clip, replace with real footage
    "digital transformation innovation": { dir: "site/services/strategy", file: "Digital Transformation Roadmaps" },
    "digital transformation": { dir: "site/services/strategy", file: "Digital Transformation Roadmaps" },
    "innovation strategy": { dir: "site/services/strategy", file: "Digital Transformation Roadmaps" },
    "market competitive research": { dir: "site/services/strategy", file: "Future-Forward Market Insights" },
    "market research": { dir: "site/services/strategy", file: "Future-Forward Market Insights" },
    "competitive analysis": { dir: "site/services/strategy", file: "Future-Forward Market Insights" },
    "product strategy roadmapping": { dir: "site/services/engineering", file: "Digital Platform Architecture" }, // STAND-IN: reused clip, replace with real footage
    "product strategy": { dir: "site/services/engineering", file: "Digital Platform Architecture" }, // STAND-IN: reused clip, replace with real footage
    "product roadmapping": { dir: "site/services/engineering", file: "Digital Platform Architecture" }, // STAND-IN: reused clip, replace with real footage
    "product discovery mvp planning": { dir: "site/services/experience", file: "Rapid Concepting" }, // STAND-IN: reused clip, replace with real footage
    "product discovery": { dir: "site/services/experience", file: "Rapid Concepting" }, // STAND-IN: reused clip, replace with real footage
    "mvp planning": { dir: "site/services/experience", file: "Rapid Concepting" }, // STAND-IN: reused clip, replace with real footage
    "ai strategy": { dir: "site/services/growth", file: "Generative AI Content Creation" }, // STAND-IN: reused clip, replace with real footage
    "ai opportunity mapping": { dir: "site/services/growth", file: "Generative AI Content Creation" }, // STAND-IN: reused clip, replace with real footage
    "ai readiness assessment": { dir: "site/services/growth", file: "Predictive Analytics Attribution", noPoster: true }, // STAND-IN: reused clip, replace with real footage
    "transformation workshops": { dir: "site/services/strategy", file: "Disruptive Innovation Workshops" },
  },
  engineering: {
    "website cms development": { dir: "site/services/engineering", file: "Front-End Engineering" },
    "website development": { dir: "site/services/engineering", file: "Front-End Engineering" },
    "cms development": { dir: "site/services/engineering", file: "Front-End Engineering" },
    "ecommerce development": { dir: "site/services/engineering", file: "Ecommerce" },
    "web application development": { dir: "site/services/engineering", file: "Progressive Web Applications (PWAs)" },
    "web app development": { dir: "site/services/engineering", file: "Progressive Web Applications (PWAs)" },
    "internal tools": { dir: "site/services/engineering", file: "Progressive Web Applications (PWAs)" },
    "saas development": { dir: "site/services/engineering", file: "Digital Platform Architecture" }, // STAND-IN: reused clip, replace with real footage
    "mobile application development": { dir: "site/services/engineering", file: "Native Mobile Application Development" },
    "mobile app development": { dir: "site/services/engineering", file: "Native Mobile Application Development" },
    "api system integrations": { dir: "site/services/engineering", file: "API" },
    "api development": { dir: "site/services/engineering", file: "API" },
    "system integrations": { dir: "site/services/engineering", file: "API" },
    "database engineering": { dir: "site/services/engineering", file: "Database Design Optimization", noPoster: true },
    "cloud devops": { dir: "site/services/engineering", file: "DevOps Cloud Implementation", noPoster: true },
    "cloud infrastructure": { dir: "site/services/engineering", file: "DevOps Cloud Implementation", noPoster: true },
    "devops engineering": { dir: "site/services/engineering", file: "DevOps Cloud Implementation", noPoster: true },
    "ci cd pipelines": { dir: "site/services/engineering", file: "DevOps Cloud Implementation", noPoster: true },
    "security engineering": { dir: "site/services/engineering", file: "backend" }, // STAND-IN: reused clip, replace with real footage
    "authentication systems": { dir: "site/services/engineering", file: "backend" }, // STAND-IN: reused clip, replace with real footage
    "performance engineering": { dir: "site/services/experience", file: "Performance Optimization" }, // STAND-IN: reused clip, replace with real footage
    "performance optimization": { dir: "site/services/experience", file: "Performance Optimization" }, // STAND-IN: reused clip, replace with real footage
    "no code low code development": { dir: "site/services/engineering", file: "Bespoke Digital Solutions" }, // STAND-IN: reused clip, replace with real footage
    "no code development": { dir: "site/services/engineering", file: "Bespoke Digital Solutions" }, // STAND-IN: reused clip, replace with real footage
    "low code development": { dir: "site/services/engineering", file: "Bespoke Digital Solutions" }, // STAND-IN: reused clip, replace with real footage
    "ai applications agents": { dir: "site/services/growth", file: "Automation architecture" }, // STAND-IN: reused clip, replace with real footage
    "ai applications": { dir: "site/services/growth", file: "Automation architecture" }, // STAND-IN: reused clip, replace with real footage
    "ai agents": { dir: "site/services/growth", file: "Automation architecture" }, // STAND-IN: reused clip, replace with real footage
  },
  growth: {
    "seo": { dir: "site/services/growth", file: "seamless platform integration" }, // STAND-IN: reused clip, replace with real footage
    "search engine optimization seo": { dir: "site/services/growth", file: "seamless platform integration" }, // STAND-IN: reused clip, replace with real footage
    "content strategy": { dir: "site/services/growth", file: "Immersive Content Strategies" },
    "social media marketing": { dir: "site/services/growth", file: "Personalized Content Delivery" }, // STAND-IN: reused clip, replace with real footage
    "performance marketing campaigns": { dir: "site/services/growth", file: "AI-Powered Performance Marketing" },
    "performance marketing": { dir: "site/services/growth", file: "AI-Powered Performance Marketing" },
    "campaign management": { dir: "site/services/growth", file: "AI-Powered Performance Marketing" },
    "marketing automation": { dir: "site/services/growth", file: "Automation architecture" },
    "email automation": { dir: "site/services/growth", file: "Automation architecture" },
    "customer journey automation": { dir: "site/services/growth", file: "Automation architecture" },
    "crm implementation": { dir: "site/services/growth", file: "MarTech stack design" }, // STAND-IN: reused clip, replace with real footage
    "analytics attribution": { dir: "site/services/growth", file: "Predictive Analytics Attribution", noPoster: true },
    "analytics dashboards": { dir: "site/services/growth", file: "Predictive Analytics Attribution", noPoster: true },
    "attribution modeling": { dir: "site/services/growth", file: "Predictive Analytics Attribution", noPoster: true },
    "customer insights": { dir: "site/services/experience", file: "User Intelligence" }, // STAND-IN: reused clip, replace with real footage
    "cro experimentation": { dir: "site/services/growth", file: "Conversion rate optimisation" },
    "cro": { dir: "site/services/growth", file: "Conversion rate optimisation" },
    "conversion rate optimization": { dir: "site/services/growth", file: "Conversion rate optimisation" },
    "experimentation a b testing": { dir: "site/services/growth", file: "Conversion rate optimisation" },
    "personalization ai marketing": { dir: "site/services/growth", file: "Generative AI Content Creation" },
    "personalization": { dir: "site/services/growth", file: "Generative AI Content Creation" },
    "ai marketing": { dir: "site/services/growth", file: "Generative AI Content Creation" },
  },
  operations: {
    "qa test automation": { dir: "site/services/engineering", file: "DevOps Cloud Implementation", noPoster: true }, // STAND-IN: reused clip, replace with real footage
    "quality assurance": { dir: "site/services/engineering", file: "DevOps Cloud Implementation", noPoster: true }, // STAND-IN: reused clip, replace with real footage
    "test automation": { dir: "site/services/engineering", file: "DevOps Cloud Implementation", noPoster: true }, // STAND-IN: reused clip, replace with real footage
    "performance security testing": { dir: "site/services/experience", file: "Performance Optimization" }, // STAND-IN: reused clip, replace with real footage
    "performance testing": { dir: "site/services/experience", file: "Performance Optimization" }, // STAND-IN: reused clip, replace with real footage
    "security testing": { dir: "site/services/experience", file: "Performance Optimization" }, // STAND-IN: reused clip, replace with real footage
    "performance optimization": { dir: "site/services/experience", file: "Performance Optimization" }, // STAND-IN: reused clip, replace with real footage
    "accessibility audits": { dir: "site/services/experience", file: "Interface Mastery - UI" }, // STAND-IN: reused clip, replace with real footage
    "technical ux audits": { dir: "site/services/experience", file: "Experience Design - UX" }, // STAND-IN: reused clip, replace with real footage
    "technical audits": { dir: "site/services/experience", file: "Experience Design - UX" }, // STAND-IN: reused clip, replace with real footage
    "ux audits": { dir: "site/services/experience", file: "Experience Design - UX" }, // STAND-IN: reused clip, replace with real footage
    "maintenance sla support": { dir: "site/services/operations", file: "Ongoing Support" },
    "maintenance": { dir: "site/services/operations", file: "Ongoing Support" },
    "sla support": { dir: "site/services/operations", file: "Ongoing Support" },
    "monitoring observability": { dir: "site/services/engineering", file: "backend" }, // STAND-IN: reused clip, replace with real footage
    "incident response": { dir: "site/services/experience", file: "Rapid Concepting" }, // STAND-IN: reused clip, replace with real footage
    "release management": { dir: "site/services/engineering", file: "Digital Platform Architecture" }, // STAND-IN: reused clip, replace with real footage
    "product optimization": { dir: "site/services/growth", file: "Predictive Analytics Attribution", noPoster: true }, // STAND-IN: reused clip, replace with real footage
    "feature evolution": { dir: "site/services/experience", file: "Adaptive Platforms" }, // STAND-IN: reused clip, replace with real footage
  },
  experience: {
    "ux research": { dir: "site/services/experience", file: "User Intelligence" },
    "service design": { dir: "site/services/experience", file: "Adaptive Platforms" }, // STAND-IN: reused clip, replace with real footage
    "information architecture": { dir: "site/services/engineering", file: "Digital Platform Architecture" }, // STAND-IN: reused clip, replace with real footage
    "ux design": { dir: "site/services/experience", file: "Experience Design - UX" },
    "ui design": { dir: "site/services/experience", file: "Interface Mastery - UI" },
    "design systems": { dir: "site/services/experience", file: "Design Systems" },
    "accessibility design": { dir: "site/services/engineering", file: "Cross-Platform Hybrid Mobile Solutions", noPoster: true }, // STAND-IN: reused clip, replace with real footage
    "interactive prototyping": { dir: "site/services/experience", file: "Rapid Concepting" },
    "user testing": { dir: "site/services/growth", file: "Conversion rate optimisation" }, // STAND-IN: reused clip, replace with real footage
    "journey mapping": { dir: "site/services/experience", file: "Journey architecture" },
  },
};

/**
 * Framework-phase → clip, for the "How we work" ProcessMap cards.
 *
 * **Empty on purpose.** Every pillar is currently unmapped.
 *
 * The `services/<pillar>` folders were checked on 2026-09-09: the eight
 * `services/experience` clips are byte-distinct from `services/brand`, but
 * distinct is not the same as ours. Reviewed on screen they are third-party
 * showreel footage — a product-marketplace mockup, a birthday-card UI — and
 * putting them behind "Design" or "Optimization" labels someone else's work as
 * a phase of our process. See pending #6.
 *
 * The ProcessMap renders a card with no media frame when a phase is absent
 * here, which is the intended state, not a gap to paper over. Add entries only
 * as footage that actually depicts the phase lands.
 */
const PHASE_MEDIA_BY_PILLAR: Record<string, Record<string, MediaRef>> = {};

/** Lowercase, alphanumerics + single spaces. "Voice & Tone" → "voice tone". */
export function mediaKey(title: string): string {
  return String(title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/**
 * Resolve a capability item to its clip + posters, or `null` for the
 * placeholder state. `resolve` is the caller's URL builder (`assetUrl`), which
 * decides between the local path and the R2 origin.
 */
export function serviceMediaFor(
  pillar: string,
  title: string,
  resolve: (path: string) => string
): ServiceMedia | null {
  const ref = MEDIA_BY_PILLAR[pillar]?.[mediaKey(title)];
  if (!ref) return null;
  return {
    video: encodeURI(resolve(`${ref.dir}/${ref.file}.mp4`)),
    poster: ref.noPoster ? '' : encodeURI(resolve(`${ref.dir}/posters/${ref.file}.webp`)),
  };
}

/** Same contract as `serviceMediaFor`, keyed by framework phase name. */
export function phaseMediaFor(
  pillar: string,
  phase: string,
  resolve: (path: string) => string
): ServiceMedia | null {
  const ref = PHASE_MEDIA_BY_PILLAR[pillar]?.[mediaKey(phase)];
  if (!ref) return null;
  return {
    video: encodeURI(resolve(`${ref.dir}/${ref.file}.mp4`)),
    poster: ref.noPoster ? '' : encodeURI(resolve(`${ref.dir}/posters/${ref.file}.webp`)),
  };
}
