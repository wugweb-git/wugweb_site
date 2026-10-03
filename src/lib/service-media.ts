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
    'brand strategy': { dir: 'services/brand', file: 'Brand Position Strategy' },
    'brand positioning': { dir: 'services/brand', file: 'Brand Experience' },
    'brand narrative': { dir: 'services/brand', file: 'Narrative Architecture' },
    'brand identity systems': { dir: 'services/brand', file: 'Brand Identity Systems' },
    'naming nomenclature': { dir: 'services/brand', file: 'Naming Nomenclature' },
    'messaging framework': { dir: "services/growth", file: "Immersive Content Strategies" }, // STAND-IN: reused clip, replace with real footage
    'voice tone': { dir: 'services/brand', file: 'Voice Tone' },
    'employer branding': { dir: 'services/brand', file: 'Brand Audit Analysis' },
    'brand guidelines': { dir: 'services/brand', file: 'Brand Evolution Management' },
    'brand activation': { dir: 'services/brand', file: 'Brand activation' },
  },
  strategy: {
    "business strategy": { dir: "services/brand", file: "Brand Position Strategy" }, // STAND-IN: reused clip, replace with real footage
    "business model design": { dir: "services/engineering", file: "Bespoke Digital Solutions" }, // STAND-IN: reused clip, replace with real footage
    "digital transformation innovation": { dir: "services/growth", file: "Digital Transformation Roadmaps" },
    "digital transformation": { dir: "services/growth", file: "Digital Transformation Roadmaps" },
    "innovation strategy": { dir: "services/growth", file: "Digital Transformation Roadmaps" },
    "market competitive research": { dir: "services/growth", file: "Future-Forward Market Insights" },
    "market research": { dir: "services/growth", file: "Future-Forward Market Insights" },
    "competitive analysis": { dir: "services/growth", file: "Future-Forward Market Insights" },
    "product strategy roadmapping": { dir: "services/engineering", file: "Digital Platform Architecture" }, // STAND-IN: reused clip, replace with real footage
    "product strategy": { dir: "services/engineering", file: "Digital Platform Architecture" }, // STAND-IN: reused clip, replace with real footage
    "product roadmapping": { dir: "services/engineering", file: "Digital Platform Architecture" }, // STAND-IN: reused clip, replace with real footage
    "product discovery mvp planning": { dir: "services/experience", file: "Rapid Concepting" }, // STAND-IN: reused clip, replace with real footage
    "product discovery": { dir: "services/experience", file: "Rapid Concepting" }, // STAND-IN: reused clip, replace with real footage
    "mvp planning": { dir: "services/experience", file: "Rapid Concepting" }, // STAND-IN: reused clip, replace with real footage
    "ai strategy": { dir: "services/growth", file: "Generative AI Content Creation" }, // STAND-IN: reused clip, replace with real footage
    "ai opportunity mapping": { dir: "services/growth", file: "Generative AI Content Creation" }, // STAND-IN: reused clip, replace with real footage
    "ai readiness assessment": { dir: "services/growth", file: "Predictive Analytics Attribution", noPoster: true }, // STAND-IN: reused clip, replace with real footage
    "transformation workshops": { dir: "services/growth", file: "Disruptive Innovation Workshops" },
  },
  engineering: {
    "website cms development": { dir: "services/engineering", file: "Front-End Engineering" },
    "website development": { dir: "services/engineering", file: "Front-End Engineering" },
    "cms development": { dir: "services/engineering", file: "Front-End Engineering" },
    "ecommerce development": { dir: "services/engineering", file: "Ecommerce" },
    "web application development": { dir: "services/engineering", file: "Progressive Web Applications (PWAs)" },
    "web app development": { dir: "services/engineering", file: "Progressive Web Applications (PWAs)" },
    "internal tools": { dir: "services/engineering", file: "Progressive Web Applications (PWAs)" },
    "saas development": { dir: "services/engineering", file: "Digital Platform Architecture" }, // STAND-IN: reused clip, replace with real footage
    "mobile application development": { dir: "services/engineering", file: "Native Mobile Application Development" },
    "mobile app development": { dir: "services/engineering", file: "Native Mobile Application Development" },
    "api system integrations": { dir: "services/engineering", file: "API" },
    "api development": { dir: "services/engineering", file: "API" },
    "system integrations": { dir: "services/engineering", file: "API" },
    "database engineering": { dir: "services/engineering", file: "Database Design Optimization", noPoster: true },
    "cloud devops": { dir: "services/engineering", file: "DevOps Cloud Implementation", noPoster: true },
    "cloud infrastructure": { dir: "services/engineering", file: "DevOps Cloud Implementation", noPoster: true },
    "devops engineering": { dir: "services/engineering", file: "DevOps Cloud Implementation", noPoster: true },
    "ci cd pipelines": { dir: "services/engineering", file: "DevOps Cloud Implementation", noPoster: true },
    "security engineering": { dir: "services/engineering", file: "backend" }, // STAND-IN: reused clip, replace with real footage
    "authentication systems": { dir: "services/engineering", file: "backend" }, // STAND-IN: reused clip, replace with real footage
    "performance engineering": { dir: "services/experience", file: "Performance Optimization" }, // STAND-IN: reused clip, replace with real footage
    "performance optimization": { dir: "services/experience", file: "Performance Optimization" }, // STAND-IN: reused clip, replace with real footage
    "no code low code development": { dir: "services/engineering", file: "Bespoke Digital Solutions" }, // STAND-IN: reused clip, replace with real footage
    "no code development": { dir: "services/engineering", file: "Bespoke Digital Solutions" }, // STAND-IN: reused clip, replace with real footage
    "low code development": { dir: "services/engineering", file: "Bespoke Digital Solutions" }, // STAND-IN: reused clip, replace with real footage
    "ai applications agents": { dir: "services/growth", file: "Automation architecture" }, // STAND-IN: reused clip, replace with real footage
    "ai applications": { dir: "services/growth", file: "Automation architecture" }, // STAND-IN: reused clip, replace with real footage
    "ai agents": { dir: "services/growth", file: "Automation architecture" }, // STAND-IN: reused clip, replace with real footage
  },
  growth: {
    "seo": { dir: "services/growth", file: "seamless platform integration" }, // STAND-IN: reused clip, replace with real footage
    "search engine optimization seo": { dir: "services/growth", file: "seamless platform integration" }, // STAND-IN: reused clip, replace with real footage
    "content strategy": { dir: "services/growth", file: "Immersive Content Strategies" },
    "social media marketing": { dir: "services/growth", file: "Personalized Content Delivery" }, // STAND-IN: reused clip, replace with real footage
    "performance marketing campaigns": { dir: "services/growth", file: "AI-Powered Performance Marketing" },
    "performance marketing": { dir: "services/growth", file: "AI-Powered Performance Marketing" },
    "campaign management": { dir: "services/growth", file: "AI-Powered Performance Marketing" },
    "marketing automation": { dir: "services/growth", file: "Automation architecture" },
    "email automation": { dir: "services/growth", file: "Automation architecture" },
    "customer journey automation": { dir: "services/growth", file: "Automation architecture" },
    "crm implementation": { dir: "services/growth", file: "MarTech stack design" }, // STAND-IN: reused clip, replace with real footage
    "analytics attribution": { dir: "services/growth", file: "Predictive Analytics Attribution", noPoster: true },
    "analytics dashboards": { dir: "services/growth", file: "Predictive Analytics Attribution", noPoster: true },
    "attribution modeling": { dir: "services/growth", file: "Predictive Analytics Attribution", noPoster: true },
    "customer insights": { dir: "services/experience", file: "User Intelligence" }, // STAND-IN: reused clip, replace with real footage
    "cro experimentation": { dir: "services/growth", file: "Conversion rate optimisation" },
    "cro": { dir: "services/growth", file: "Conversion rate optimisation" },
    "conversion rate optimization": { dir: "services/growth", file: "Conversion rate optimisation" },
    "experimentation a b testing": { dir: "services/growth", file: "Conversion rate optimisation" },
    "personalization ai marketing": { dir: "services/growth", file: "Generative AI Content Creation" },
    "personalization": { dir: "services/growth", file: "Generative AI Content Creation" },
    "ai marketing": { dir: "services/growth", file: "Generative AI Content Creation" },
  },
  operations: {
    "qa test automation": { dir: "services/engineering", file: "DevOps Cloud Implementation", noPoster: true }, // STAND-IN: reused clip, replace with real footage
    "quality assurance": { dir: "services/engineering", file: "DevOps Cloud Implementation", noPoster: true }, // STAND-IN: reused clip, replace with real footage
    "test automation": { dir: "services/engineering", file: "DevOps Cloud Implementation", noPoster: true }, // STAND-IN: reused clip, replace with real footage
    "performance security testing": { dir: "services/experience", file: "Performance Optimization" }, // STAND-IN: reused clip, replace with real footage
    "performance testing": { dir: "services/experience", file: "Performance Optimization" }, // STAND-IN: reused clip, replace with real footage
    "security testing": { dir: "services/experience", file: "Performance Optimization" }, // STAND-IN: reused clip, replace with real footage
    "performance optimization": { dir: "services/experience", file: "Performance Optimization" }, // STAND-IN: reused clip, replace with real footage
    "accessibility audits": { dir: "services/experience", file: "Interface Mastery - UI" }, // STAND-IN: reused clip, replace with real footage
    "technical ux audits": { dir: "services/experience", file: "Experience Design - UX" }, // STAND-IN: reused clip, replace with real footage
    "technical audits": { dir: "services/experience", file: "Experience Design - UX" }, // STAND-IN: reused clip, replace with real footage
    "ux audits": { dir: "services/experience", file: "Experience Design - UX" }, // STAND-IN: reused clip, replace with real footage
    "maintenance sla support": { dir: "services/engineering", file: "Ongoing Support" },
    "maintenance": { dir: "services/engineering", file: "Ongoing Support" },
    "sla support": { dir: "services/engineering", file: "Ongoing Support" },
    "monitoring observability": { dir: "services/engineering", file: "backend" }, // STAND-IN: reused clip, replace with real footage
    "incident response": { dir: "services/experience", file: "Rapid Concepting" }, // STAND-IN: reused clip, replace with real footage
    "release management": { dir: "services/engineering", file: "Digital Platform Architecture" }, // STAND-IN: reused clip, replace with real footage
    "product optimization": { dir: "services/growth", file: "Predictive Analytics Attribution", noPoster: true }, // STAND-IN: reused clip, replace with real footage
    "feature evolution": { dir: "services/experience", file: "Adaptive Platforms" }, // STAND-IN: reused clip, replace with real footage
  },
  experience: {
    "ux research": { dir: "services/experience", file: "User Intelligence" },
    "service design": { dir: "services/experience", file: "Adaptive Platforms" }, // STAND-IN: reused clip, replace with real footage
    "information architecture": { dir: "services/engineering", file: "Digital Platform Architecture" }, // STAND-IN: reused clip, replace with real footage
    "ux design": { dir: "services/experience", file: "Experience Design - UX" },
    "ui design": { dir: "services/experience", file: "Interface Mastery - UI" },
    "design systems": { dir: "services/experience", file: "Design Systems" },
    "accessibility design": { dir: "services/engineering", file: "Cross-Platform Hybrid Mobile Solutions", noPoster: true }, // STAND-IN: reused clip, replace with real footage
    "interactive prototyping": { dir: "services/experience", file: "Rapid Concepting" },
    "user testing": { dir: "services/growth", file: "Conversion rate optimisation" }, // STAND-IN: reused clip, replace with real footage
    "journey mapping": { dir: "services/experience", file: "Journey architecture" },
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
