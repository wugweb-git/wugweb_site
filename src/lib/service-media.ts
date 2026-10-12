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
 * Clips are named after the sub-service they depict and live at
 *   site/services/<pillar>/<sub-service-slug>.mp4
 *   site/services/<pillar>/posters/<sub-service-slug>.webp (+ .blur.webp)
 * so a capability item resolves by slug — no per-title mapping to maintain.
 * Slug: lowercase, "&" → "and", every other run of non-alphanumerics → "-".
 *
 * Some clips are STAND-INs (footage reused from another sub-service while real
 * footage is produced). They are recorded in the Sanity asset notes
 * ("STAND-IN footage (copy of …)"); replace the file in place, same name.
 * A slug absent from this list renders the media-less placeholder.
 */
const SLUGS_BY_PILLAR: Record<string, string[]> = {
  brand: [
    'brand-strategy',
    'brand-positioning',
    'brand-narrative',
    'brand-identity-systems',
    'naming-and-nomenclature',
    'messaging-framework',
    'voice-and-tone',
    'employer-branding',
    'brand-guidelines',
    'brand-activation',
  ],
  engineering: [
    'website-and-cms-development',
    'web-application-development',
    'mobile-application-development',
    'saas-development',
    'ecommerce-development',
    'api-and-system-integrations',
    'database-engineering',
    'cloud-and-devops',
    'security-engineering',
    'performance-engineering',
    'ai-applications-and-agents',
    'no-code-and-low-code-development',
  ],
  experience: [
    'ux-research',
    'service-design',
    'information-architecture',
    'ux-design',
    'ui-design',
    'design-systems',
    'accessibility-design',
    'interactive-prototyping',
    'user-testing',
    'journey-mapping',
  ],
  growth: [
    'seo',
    'content-strategy',
    'social-media-marketing',
    'performance-marketing-and-campaigns',
    'crm-implementation',
    'marketing-automation',
    'personalization-and-ai-marketing',
    'analytics-and-attribution',
    'customer-insights',
    'cro-and-experimentation',
  ],
  operations: [
    'qa-and-test-automation',
    'performance-and-security-testing',
    'accessibility-audits',
    'maintenance-and-sla-support',
    'monitoring-and-observability',
    'incident-response',
    'release-management',
    'technical-and-ux-audits',
    'product-optimization',
    'feature-evolution',
  ],
  strategy: [
    'business-strategy',
    'business-model-design',
    'digital-transformation-and-innovation',
    'market-and-competitive-research',
    'product-strategy-and-roadmapping',
    'product-discovery-and-mvp-planning',
    'ai-strategy',
    'ai-readiness-assessment',
    'transformation-workshops',
  ],
};

export function mediaSlug(title: string): string {
  return String(title)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

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
  const slug = mediaSlug(title);
  if (!SLUGS_BY_PILLAR[pillar]?.includes(slug)) return null;
  return {
    video: encodeURI(resolve(`site/services/${pillar}/${slug}.mp4`)),
    poster: encodeURI(resolve(`site/services/${pillar}/posters/${slug}.webp`)),
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
