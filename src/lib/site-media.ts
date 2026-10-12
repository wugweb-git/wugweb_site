import registry from './site-media.json';
import { assetUrl } from './assets';

/**
 * Site media that is not driven by the CMS, kept in one place instead of
 * scattered through pages. The JSON holds R2-relative paths (R2 key =
 * `assets/<path>`); everything here resolves them through assetUrl().
 * `node scripts/verify-site-media.mjs` checks every entry exists in the bucket.
 */
export const SITE_MEDIA = {
  home: {
    heroVideo: assetUrl(registry.home.heroVideo),
    heroPoster: assetUrl(registry.home.heroPoster),
    clientLogos: registry.home.clientLogos.map((l) => ({ name: l.name, src: assetUrl(l.path) })),
  },
  about: {
    messageVideo: assetUrl(registry.about.messageVideo),
    messagePoster: assetUrl(registry.about.messagePoster),
    cultureImage: assetUrl(registry.about.cultureImage),
  },
  seo: { ogDefault: assetUrl(registry.seo.ogDefault) },
  serviceTags: Object.fromEntries(
    Object.entries(registry.serviceTags).map(([k, p]) => [k, assetUrl(p as string)]),
  ) as Record<string, string>,
} as const;
