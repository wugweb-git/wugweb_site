import { defineType, defineField } from 'sanity';

/**
 * Site-level tier of the four-tier content model: site → page → section → component.
 *
 * Scope boundary, so this document does not grow into a dumping ground:
 *  - Analytics / tag injection lives in `siteScript` (GA4, Hotjar, head/body
 *    placement, per-environment) — do not duplicate it here.
 *  - Per-page SEO/AEO lives on `singletonPage` (its SEO and AI · Answers groups).
 *  - HTTP response headers belong in `public/_headers` (Cloudflare Pages), not
 *    in content. That file does not exist yet — the site currently ships no
 *    HSTS, X-Content-Type-Options or frame policy.
 *  - The well-known files (robots.txt, llms.txt, ai-context.txt,
 *    brand-system.txt, security.txt) are static in `public/`. Only the values
 *    they need to stay in sync with are modelled here.
 */
export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'identity', title: 'Identity', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'social', title: 'Social & Images' },
    { name: 'organization', title: 'Organization' },
    { name: 'aeo', title: 'AI / Answers' },
  ],
  fields: [
    // ── Identity ──
    defineField({
      name: 'siteUrl', title: 'Canonical Site URL', type: 'url', group: 'identity',
      initialValue: 'https://wugweb.com',
      description: 'Absolute origin, no trailing slash. Required before canonical tags, absolute og:image URLs or sitemap.xml can be generated at all.',
    }),
    defineField({ name: 'siteTitle', title: 'Site Title', type: 'string', group: 'identity', description: 'e.g. Wugweb — Digital Experience Agency' }),
    defineField({
      name: 'titleTemplate', title: 'Title Template', type: 'string', group: 'identity',
      initialValue: '%s · wugweb',
      description: '%s is replaced by the page title. Currently hardcoded as "· wugweb" in BaseLayout.astro.',
    }),
    defineField({ name: 'companyName', title: 'Company Name', type: 'string', group: 'identity' }),
    defineField({ name: 'contactEmail', title: 'Contact Email', type: 'string', group: 'identity' }),
    defineField({ name: 'telephone', title: 'Telephone', type: 'string', group: 'identity', description: 'E.164 format, e.g. +91 92059 96219. Feeds Organization structured data.' }),
    defineField({ name: 'language', title: 'Default Language', type: 'string', options: { list: ['en-GB', 'en-US'] }, initialValue: 'en-GB', group: 'identity' }),
    defineField({ name: 'copyright', title: 'Copyright Text', type: 'string', group: 'identity' }),

    // ── SEO ──
    defineField({ name: 'seoDescription', title: 'Default SEO Description', type: 'text', rows: 2, group: 'seo', description: 'Fallback meta description for pages with none of their own. 150–160 characters.' }),
    defineField({
      name: 'sitemapExcludePaths', title: 'Sitemap Exclusions', type: 'array', of: [{ type: 'string' }], group: 'seo',
      description: 'Routes to keep out of sitemap.xml that are not Sanity documents, e.g. /thank-you. Pages with noIndex are excluded automatically.',
    }),
    defineField({
      name: 'crawlerPolicy', title: 'AI Crawler Policy', type: 'array', group: 'seo',
      description: 'Per-bot access, written into robots.txt. Allowing raises the odds of being cited in AI answers; blocking prevents training use. Review periodically — this area moves fast.',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'agent', title: 'User-agent', type: 'string',
            options: { list: ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'CCBot', 'Bytespider', 'Applebot-Extended'] },
            validation: (r: any) => r.required(),
          },
          { name: 'allow', title: 'Allow', type: 'boolean', initialValue: true },
          { name: 'note', title: 'Why', type: 'string' },
        ],
        preview: { select: { title: 'agent', allow: 'allow', subtitle: 'note' } },
      }],
    }),
    defineField({
      name: 'robotsExtra', title: 'Extra robots.txt Directives', type: 'text', rows: 4, group: 'seo',
      description: 'Appended verbatim. Keep it minimal — the Sitemap line and crawler policy are generated.',
    }),
    defineField({ name: 'googleSiteVerification', title: 'Google Search Console Token', type: 'string', group: 'seo' }),
    defineField({ name: 'bingSiteVerification', title: 'Bing Webmaster Token', type: 'string', group: 'seo' }),

    // ── Social & Images ──
    // Known bad state (verified 2026-09-24): every singletonPage has ogImage
    // empty and the fallback public/brand/og-default.png is 965×306, so social
    // previews crop wrong on every page, on every platform.
    defineField({ name: 'ogImage', title: 'Default OG Image', type: 'image', group: 'social', description: 'Must be exactly 1200×630. Prefer ogImagePath for R2.' }),
    defineField({ name: 'ogImagePath', title: 'Default OG Image (R2 path)', type: 'string', group: 'social', description: 'e.g. /assets/brand/og-default.png — 1200×630.' }),
    defineField({ name: 'favicon', title: 'Favicon', type: 'image', group: 'social', description: '64×64 or an SVG mark.' }),
    defineField({ name: 'faviconDark', title: 'Favicon (dark UI)', type: 'image', group: 'social', description: 'Optional variant for dark browser chrome.' }),
    defineField({ name: 'appleTouchIcon', title: 'Apple Touch Icon', type: 'image', group: 'social', description: '180×180. Falls back to the favicon today, which is the wrong shape for a home-screen icon.' }),
    defineField({
      name: 'socialLinks', title: 'Social Links', type: 'array', group: 'social',
      description: 'For display. Structured-data profile URLs go in sameAs.',
      of: [{ type: 'object', fields: [
        { name: 'platform', type: 'string', options: { list: ['Twitter/X', 'LinkedIn', 'Instagram', 'GitHub', 'Dribbble'] } },
        { name: 'url', type: 'url' },
      ]}],
    }),

    // ── Organization (EEAT / JSON-LD) ──
    defineField({
      name: 'organizationType', title: 'Organization Type', type: 'string', group: 'organization',
      options: { list: ['Organization', 'ProfessionalService', 'LocalBusiness'] },
      initialValue: 'ProfessionalService',
      description: 'Drives the sitewide Organization JSON-LD @type.',
    }),
    defineField({ name: 'legalName', title: 'Legal Name', type: 'string', group: 'organization', description: 'Registered entity name, where it differs from the trading name.' }),
    defineField({ name: 'foundingDate', title: 'Founding Date', type: 'date', group: 'organization' }),
    defineField({ name: 'logoPath', title: 'Logo (R2 path)', type: 'string', group: 'organization', description: 'Square-ish mark for Organization structured data, e.g. /brand/logo-small.svg. Needs an absolute URL at render time — built from siteUrl.' }),
    defineField({
      name: 'address', title: 'Address', type: 'object', group: 'organization',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'streetAddress', type: 'string' },
        { name: 'addressLocality', title: 'City', type: 'string' },
        { name: 'addressRegion', title: 'State / Region', type: 'string' },
        { name: 'postalCode', type: 'string' },
        { name: 'addressCountry', title: 'Country (ISO 2-letter)', type: 'string' },
      ],
    }),
    defineField({
      name: 'founders', title: 'Founders', type: 'array', group: 'organization',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
      description: 'EEAT signal — named, linkable people behind the work.',
    }),
    defineField({
      name: 'sameAs', title: 'sameAs (structured data)', type: 'array', of: [{ type: 'url' }], group: 'organization',
      description: 'Canonical profile URLs for Organization structured data. Leave empty to derive from the live platformProfile documents.',
    }),
    defineField({ name: 'areaServed', title: 'Area Served', type: 'array', of: [{ type: 'string' }], group: 'organization', description: 'e.g. IN, AE, GB, Worldwide.' }),

    // ── AI / Answers ──
    defineField({
      name: 'aiSummary', title: 'Site Summary (for answer engines)', type: 'text', rows: 3, group: 'aeo',
      description: 'What Wugweb is, in 40–60 words, answer-first. Reused as the Organization description and as the opening of llms.txt — keep it in sync with public/llms.txt and public/ai-context.txt.',
      validation: (r) => r.max(500).warning('Keep it to roughly 40–60 words.'),
    }),
    defineField({
      name: 'aiContextUrls', title: 'AI Context Files', type: 'array', of: [{ type: 'string' }], group: 'aeo',
      initialValue: ['/llms.txt', '/ai-context.txt', '/brand-system.txt', '/security.txt', '/robots.txt'],
      description: 'The well-known files served from public/. Listed here so the set is discoverable and auditable; the files themselves stay static.',
    }),

    // ── Sync (hidden, auto-managed) ──
    defineField({ name: 'neonSynced', type: 'boolean', readOnly: true, hidden: true, initialValue: false }),
    defineField({ name: 'neonSyncedAt', type: 'datetime', readOnly: true, hidden: true }),
  ],
  preview: {
    select: { title: 'siteTitle', subtitle: 'companyName' },
    prepare: ({ title, subtitle }: any) => ({
      title: title || 'Site Settings',
      subtitle: subtitle ? String(subtitle).replace(/&/g, 'and') : '',
    }),
  },
});
