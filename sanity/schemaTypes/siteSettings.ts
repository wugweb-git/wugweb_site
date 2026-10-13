import { defineType, defineField } from 'sanity';
import { idValidator } from '../lib/integrationIds';

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
    { name: 'voice', title: 'Brand voice' },
    { name: 'integrations', title: 'Integrations' },
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

    // ── Integrations ── public IDs only, read by src/lib/integrations.ts.
    // Every provider loads ONLY on the canonical host AND after analytics
    // consent. Verification tags render on the canonical host only.
    defineField({ name: 'ga4MeasurementId', title: 'GA4 Measurement ID', type: 'string', group: 'integrations', description: 'e.g. G-XXXXXXXXXX. Empty falls back to G-W5WJ1PMTKD. Never paste API keys or secrets here.', validation: (r) => r.custom(idValidator('ga4MeasurementId')) }),
    defineField({ name: 'gtmContainerId', title: 'GTM Container ID', type: 'string', group: 'integrations', description: 'e.g. GTM-XXXXXXX. Not loaded while a GA4 ID is also set (double-counting). Never paste API keys or secrets here.', validation: (r) => [r.custom(idValidator('gtmContainerId')), r.custom((v: any) => (v ? 'GA4 is always active (this ID or the built-in fallback), so GTM will NOT load — loading both double-counts page views. Turning GA4 off needs a code change; ask before relying on GTM.' : true)).warning()] }),
    defineField({ name: 'yandexMetricaId', title: 'Yandex Metrica counter ID', type: 'string', group: 'integrations', description: 'A number. Never paste API keys or secrets here.', validation: (r) => r.custom(idValidator('yandexMetricaId')) }),
    defineField({ name: 'clarityId', title: 'Microsoft Clarity project ID', type: 'string', group: 'integrations', description: 'e.g. abcd1234ef. Never paste API keys or secrets here.', validation: (r) => r.custom(idValidator('clarityId')) }),
    defineField({ name: 'hotjarId', title: 'Hotjar Site ID', type: 'string', group: 'integrations', description: 'A number. Never paste API keys or secrets here.', validation: (r) => r.custom(idValidator('hotjarId')) }),
    defineField({ name: 'googleSiteVerification', title: 'Google Search Console verification', type: 'string', group: 'integrations', description: 'The content="…" value of the google-site-verification tag. Never paste API keys or secrets here.', validation: (r) => r.custom(idValidator('googleSiteVerification')) }),
    defineField({ name: 'bingSiteVerification', title: 'Bing Webmaster verification', type: 'string', group: 'integrations', description: 'The content="…" value of the msvalidate.01 tag. Never paste API keys or secrets here.', validation: (r) => r.custom(idValidator('bingSiteVerification')) }),
    defineField({ name: 'yandexVerification', title: 'Yandex Webmaster verification', type: 'string', group: 'integrations', description: 'The content="…" value of the yandex-verification tag. Never paste API keys or secrets here.', validation: (r) => r.custom(idValidator('yandexVerification')) }),

    // ── Brand voice ──
    // The guide only. The Studio voice checks (tool, badge, Check voice,
    // field warnings) were removed on 2026-10-13 at the owner's request; these
    // fields and the drafted guide are kept as reference content.
    defineField({
      name: 'status', title: 'Guide status', type: 'string', group: 'voice',
      options: { list: [{ title: 'Draft — for owner review', value: 'draft' }, { title: 'Approved — checks on', value: 'approved' }], layout: 'radio' },
      initialValue: 'draft',
      description: 'Draft or approved. Nothing reads this field now that the Studio voice checks are removed.',
    }),
    defineField({ name: 'persona', title: 'Persona', type: 'text', rows: 4, group: 'voice', description: 'Who is speaking, in a few sentences. Written from what the copy actually sounds like, not aspiration.' }),
    defineField({ name: 'audience', title: 'Audience', type: 'text', rows: 3, group: 'voice', description: 'Who reads it and what they already know.' }),
    defineField({ name: 'toneWords', title: 'Tone words', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' }, group: 'voice', description: 'Three to six adjectives, e.g. plain, confident, specific.' }),
    defineField({ name: 'writingPrinciples', title: 'Writing principles', type: 'array', of: [{ type: 'string' }], group: 'voice', description: 'One rule per line, e.g. "Lead with the outcome, then the method."' }),
    defineField({ name: 'doList', title: 'Do', type: 'array', of: [{ type: 'string' }], group: 'voice' }),
    defineField({ name: 'dontList', title: "Don't", type: 'array', of: [{ type: 'string' }], group: 'voice' }),
    defineField({
      name: 'preferredTerms', title: 'Preferred terms', type: 'array', group: 'voice',
      description: 'Flagged when the "instead of" word appears.',
      of: [{
        type: 'object', name: 'voiceTerm',
        fields: [
          { name: 'use', title: 'Use', type: 'string', validation: (r: any) => r.required() },
          { name: 'insteadOf', title: 'Instead of', type: 'string', validation: (r: any) => r.required() },
        ],
        preview: { select: { use: 'use', insteadOf: 'insteadOf' }, prepare: ({ use, insteadOf }: any) => ({ title: `${use}`, subtitle: `not "${insteadOf}"` }) },
      }],
    }),
    defineField({ name: 'bannedWords', title: 'Banned words and phrases', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' }, group: 'voice', description: 'Matched as whole words, case-insensitive.' }),
    defineField({
      name: 'spelling', title: 'Spelling', type: 'string', group: 'voice', initialValue: 'en-GB',
      options: { list: [{ title: 'British (en-GB)', value: 'en-GB' }, { title: 'American (en-US)', value: 'en-US' }], layout: 'radio' },
    }),
    defineField({ name: 'readingLevelMax', title: 'Max reading level', type: 'number', group: 'voice', initialValue: 10, description: 'Flesch-Kincaid grade. 10 reads like a good newspaper.', validation: (r) => r.min(1).max(20) }),
    defineField({ name: 'maxSentenceWords', title: 'Max words per sentence', type: 'number', group: 'voice', initialValue: 25, validation: (r) => r.min(8).max(60) }),
    defineField({ name: 'sampleGood', title: 'Sounds like us', type: 'array', of: [{ type: 'text', rows: 3 }], group: 'voice', description: 'Examples of copy that sounds like Wugweb.' }),
    defineField({ name: 'sampleBad', title: "Doesn't sound like us", type: 'array', of: [{ type: 'text', rows: 3 }], group: 'voice' }),

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
