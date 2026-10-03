import { defineType, defineField } from 'sanity';
import { R2AssetInput } from '../components/R2AssetInput';

const uniquePageIdValidation = (rule: any) =>
  rule.required().custom(async (pageId: string | undefined, context: any) => {
    if (!pageId) return true;
    const client = context.getClient({ apiVersion: '2026-01-01' });
    const id = String(context.document?._id || '').replace(/^drafts\./, '');
    const duplicateCount = await client.fetch(
      'count(*[_type == "singletonPage" && pageId == $pageId && _id != $id && _id != $draftId])',
      { pageId, id, draftId: `drafts.${id}` },
    );
    return duplicateCount === 0 || 'This page ID is already used by another Page document.';
  });

export default defineType({
  name: 'singletonPage',
  title: 'Page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'aeo', title: 'AI / Answers' },
  ],
  fields: [
    // `pageId` is the single shared key for this page across systems: it is the
    // Sanity document `_id`, and the key Notion stores as a property. (Notion
    // assigns its own page UUIDs and they cannot be set, so parity is by
    // property, not by Notion's id.) 11 of 14 live docs already have
    // `_id === pageId`; about / faq / home still carry random UUIDs and need
    // recreating under the right id — `_id` cannot be renamed in place.
    defineField({
      name: 'pageId', type: 'string', readOnly: true, group: 'content',
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'About', value: 'about' },
          { title: 'FAQ', value: 'faq' },
          { title: 'Contact', value: 'contact' },
          { title: 'Privacy Policy', value: 'privacy-policy' },
          { title: 'Terms of Use', value: 'terms-of-use' },
          { title: 'Refund Policy', value: 'refund-policy' },
          { title: 'Cookie Policy', value: 'cookie-policy' },
          { title: 'Impact', value: 'impact' },
          // /footer/reviews already queries singletonPageQuery with
          // pageId 'reviews' — without this enum entry that lookup could
          // never match, so the route always fell through to hardcoded copy.
          { title: 'Reviews', value: 'reviews' },
          { title: 'Industries', value: 'industries' },
          { title: 'Subscription', value: 'subscription' },
          { title: 'Sitemap', value: 'sitemap' },
          { title: 'Services', value: 'services' },
          { title: 'Work', value: 'work' },
          { title: 'Blog', value: 'blog' },
          { title: 'Kits', value: 'kits' },
          { title: '404 — Not found', value: '404' },
          { title: 'Contact error', value: 'contact-error' },
          { title: 'Offline', value: 'offline' },
          { title: 'Thank you', value: 'thank-you' },
        ],
      },
      validation: (r) => r.required().custom(async (value: any, ctx: any) => {
        if (!value) return true;
        const client = ctx.getClient({ apiVersion: '2026-01-01' });
        const id = ctx.document?._id?.replace('drafts.', '') ?? '';
        const count = await client.fetch(
          `count(*[_type == "singletonPage" && pageId == $pageId && _id != $id && !(_id in path("drafts.**"))])`,
          { pageId: value, id },
        );
        return count === 0 || `A published page with pageId "${value}" already exists. Edit the existing document instead.`;
      }),
    }),
    defineField({
      name: 'route', type: 'string', group: 'content',
      description: 'The live URL path this document renders at, e.g. /contact-us. Must start with a slash, no trailing slash, no origin. Several pageIds do not match their route (contact → /contact-us, terms-of-use → /termsofuse, impact → /footer/impact), which is why the route is stored rather than derived.',
      validation: (r) => r
        .regex(/^\/(?!.*\/$).*$|^\/$/, { name: 'path' })
        .custom(async (value: any, ctx: any) => {
          if (!value) return true;
          if (!value.startsWith('/')) return 'Must start with /';
          const client = ctx.getClient({ apiVersion: '2026-01-01' });
          const id = ctx.document?._id?.replace('drafts.', '') ?? '';
          const count = await client.fetch(
            `count(*[_type == "singletonPage" && route == $route && _id != $id && !(_id in path("drafts.**"))])`,
            { route: value, id },
          );
          return count === 0 || `Another published page already claims ${value}.`;
        }),
    }),
    defineField({
      name: 'httpStatus', type: 'string', group: 'content',
      initialValue: '200',
      options: { list: [
        { title: '200 — Live', value: '200' },
        { title: '301 — Moved permanently', value: '301' },
        { title: '302 — Moved temporarily', value: '302' },
        { title: '410 — Gone (retired on purpose)', value: '410' },
      ] },
      description: 'What this route should return. Anything other than 200 also needs redirectTo. For URL-level rules that are not pages, use the redirect document type instead.',
    }),
    defineField({
      name: 'redirectTo', type: 'string', group: 'content',
      hidden: ({ document }: any) => !document?.httpStatus || document.httpStatus === '200' || document.httpStatus === '410',
      description: 'Destination path for a 301/302, e.g. /contact-us.',
      validation: (r) => r.custom((value: any, ctx: any) => {
        const status = (ctx.document as any)?.httpStatus;
        if (status === '301' || status === '302') {
          if (!value) return 'A 301/302 needs a destination.';
          if (!String(value).startsWith('/')) return 'Must start with /';
        }
        return true;
      }),
    }),
    defineField({ name: 'language', type: 'string', options: { list: ['en-GB', 'en-US', 'fr', 'de', 'es'] }, initialValue: 'en-GB', group: 'content' }),
    defineField({ name: 'title', type: 'string', description: 'Page heading (H1)', group: 'content' }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true }, group: 'content' }),
    defineField({
      name: 'heroPath',
      type: 'string',
      description: 'R2/local hero media path e.g. /assets/more/home/home.mp4',
      components: { input: R2AssetInput },
      group: 'content',
    }),
    defineField({ name: 'mediaPaths', type: 'array', of: [{ type: 'string' }], description: 'Additional page media under /assets/…', group: 'content' }),
    defineField({ name: 'body', type: 'blockContent', group: 'content' }),
    defineField({
      name: 'items', type: 'array', group: 'content',
      of: [{ type: 'object', fields: [
        { name: 'title', type: 'string' },
        { name: 'text', type: 'text', rows: 3 },
        { name: 'image', type: 'image', options: { hotspot: true } },
        { name: 'imagePath', type: 'string', description: 'Legacy R2/local path alternative to Sanity image', deprecated: { reason: 'Legacy media path; prefer Sanity assets.' } },
      ]}],
    }),

    // ── SEO ──
    // Nothing in this group renders until the head tags land: the site has no
    // canonical link, no og:url, no robots meta, no robots.txt and no sitemap
    // yet. Fields first so editors can fill them; wiring tracked in pending.md.
    defineField({ name: 'seoTitle', type: 'string', description: 'Override <title> tag. 50–60 characters, focus keyword near the front.', group: 'seo' }),
    defineField({ name: 'seoDescription', type: 'text', rows: 2, description: 'Meta description for search results. 150–160 characters.', group: 'seo' }),
    defineField({ name: 'ogImage', type: 'image', description: 'Social sharing image (1200×630). Prefer ogImagePath for R2.', group: 'seo' }),
    defineField({
      name: 'ogImagePath',
      type: 'string',
      description: 'R2/local OG image path — matches the path-field convention used everywhere else.',
      components: { input: R2AssetInput },
      group: 'seo',
    }),
    defineField({ name: 'ogTitle', type: 'string', description: 'Optional. Social copy is a different job from SERP copy — leave empty to reuse seoTitle.', group: 'seo' }),
    defineField({ name: 'ogDescription', type: 'text', rows: 2, description: 'Optional. Leave empty to reuse seoDescription.', group: 'seo' }),
    defineField({
      name: 'noIndex', type: 'boolean', initialValue: false, group: 'seo',
      description: 'Hide from search engines. Emits <meta name="robots" content="noindex"> AND must exclude the page from sitemap.xml.',
    }),
    defineField({
      name: 'canonicalUrl', type: 'url', group: 'seo',
      description: 'Leave empty for self-canonical. Set only when this page duplicates or syndicates another URL.',
    }),
    defineField({
      name: 'focusKeyword', type: 'string', group: 'seo',
      description: 'One primary term this page targets. NOT emitted as meta keywords — it is an editorial anchor (check it appears in the title, H1, description and first 100 words) and stops two pages competing for the same term.',
    }),
    defineField({
      name: 'secondaryKeywords', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' }, group: 'seo',
      description: 'Related terms to cover on-page — good source material for H2s that match real queries.',
    }),
    defineField({
      name: 'searchIntent', type: 'string', group: 'seo',
      options: { list: [
        { title: 'Informational — answers a question', value: 'informational' },
        { title: 'Commercial — compares options', value: 'commercial' },
        { title: 'Transactional — ready to act', value: 'transactional' },
        { title: 'Navigational — looking for us by name', value: 'navigational' },
      ] },
      description: 'Pairs with the focus keyword and decides the page shape.',
    }),
    defineField({
      name: 'breadcrumbLabel', type: 'string', group: 'seo',
      description: 'Short label for BreadcrumbList structured data, where the H1 is too long to use.',
    }),

    // ── AI / Answers (AEO) ──
    defineField({
      name: 'aiSummary', type: 'text', rows: 3, group: 'aeo',
      description: 'A direct, extractive answer in 40–60 words: lead with the answer, then explain. Render this visibly on the page — answer engines discount hidden meta-only text — and reuse it as the JSON-LD description.',
      validation: (r) => r.max(500).warning('Keep it to roughly 40–60 words.'),
    }),
    defineField({
      name: 'keyTakeaways', type: 'array', of: [{ type: 'string' }], group: 'aeo',
      description: 'Three to five one-line takeaways. AI extracts lists far more reliably than prose.',
      validation: (r) => r.max(5).warning('Three to five reads best.'),
    }),
    defineField({
      name: 'faqs', type: 'array', group: 'aeo',
      description: 'Question/answer pairs — the highest-leverage AEO field. Emits FAQPage structured data. Useful on every page, not just /faq.',
      of: [{
        type: 'object',
        fields: [
          { name: 'question', type: 'string', validation: (r: any) => r.required() },
          { name: 'answer', type: 'text', rows: 3, validation: (r: any) => r.required() },
        ],
        preview: { select: { title: 'question', subtitle: 'answer' } },
      }],
    }),
    defineField({
      name: 'schemaType', type: 'string', group: 'aeo',
      options: { list: ['WebPage', 'AboutPage', 'ContactPage', 'CollectionPage', 'FAQPage', 'Service'] },
      initialValue: 'WebPage',
      description: 'Drives the JSON-LD @type for this page instead of hardcoding it per route.',
    }),
    defineField({
      name: 'lastReviewedAt', type: 'datetime', group: 'aeo',
      description: 'Freshness signal → dateModified. Set it when the content genuinely changes; _updatedAt moves on every trivial edit, so it is not a usable substitute.',
    }),

    // ── Sync (hidden, auto-managed) ──
    defineField({ name: 'neonSynced', type: 'boolean', readOnly: true, hidden: true, initialValue: false }),
    defineField({ name: 'neonSyncedAt', type: 'datetime', readOnly: true, hidden: true }),
  ],
  orderings: [{ name: 'pageIdAsc', title: 'Page ID', by: [{ field: 'pageId', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'pageId' },
    prepare: ({ title, subtitle }: any) => ({ title: title || 'Untitled Page', subtitle: subtitle ? String(subtitle).replace(/&/g, 'and') : '' }),
  },
});
