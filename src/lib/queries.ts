// Keep queries here (not inline in pages) so the shape of each
// document type only has to change in one place.
// NOTE: All slug queries exclude drafts and order by _updatedAt desc before
// taking [0] — making document selection deterministic even if duplicate
// slugs exist in the dataset (Phase 3 will remove the duplicates at source).

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    siteUrl, siteTitle, seoDescription, ogImage, ogImagePath, language, copyright,
    socialLinks, contactEmail, companyName,
    ga4MeasurementId, gtmContainerId, yandexMetricaId, clarityId, hotjarId,
    googleSiteVerification, bingSiteVerification, yandexVerification
  }
`;

export const servicesListQuery = `
  *[_type == "service" && !(_id in path("drafts.**"))] | order(order asc) {
    title, "slug": slug.current, subtitle, summary, icon, coverImage, coverPath, galleryPaths, tags
  }
`;

export const serviceBySlugQuery = `
  *[_type == "service" && slug.current == $slug && !(_id in path("drafts.**"))] | order(_updatedAt desc)[0] {
    title, subtitle, tags, summary, heroText, fullDescription, icon, coverImage, coverPath, galleryPaths,
    capabilities, approach, process, tools, why, body,
    seoTitle, seoDescription, ogImage, ogImagePath,
    "caseStudies": caseStudies[]->{ title, "slug": slug.current, client, summary, coverImage, coverPath, thumbnailPath, tags },
    faqs
  }
`;

export const caseStudiesListQuery = `
  *[_type == "caseStudy" && !(_id in path("drafts.**"))] | order(featured desc, publishedAt desc) {
    title, "slug": slug.current, client, summary, coverImage, coverPath, thumbnailPath, tags,
    disciplines, industry, timeline, publishedAt, featured,
    "services": services[]->{ "slug": slug.current }
  }
`;

export const caseStudyBySlugQuery = `
  *[_type == "caseStudy" && slug.current == $slug && !(_id in path("drafts.**"))] | order(_updatedAt desc)[0] {
    title, shortTitle, bodyMarkdown, extraMedia, subtitle, client, summary, about, challenges, solutions, designPhilosophy, impact, galleryPaths,
    bodyContent, tags, disciplines, industry, timeline, team, partner,
    coverImage, coverPath, thumbnailPath, results, canonicalUrl,
    seoTitle, seoDescription, ogImage, ogImagePath, ogTitle, ogDescription, noIndex, publishedAt, featured,
    "clientRef": clientRef->{ name, logo, logoPath, website },
    "services": services[]->{ title, "slug": slug.current }
  }
`;

export const postsListQuery = `
  *[_type == "post" && !(_id in path("drafts.**"))] | order(featured desc, publishedAt desc) {
    title, "slug": slug.current, excerpt, coverImage, coverPath, publishedAt, tags, category, topic, topicSlug, readingTime, featured,
    "author": author->{ name, photo, role }
  }
`;

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))] | order(_updatedAt desc)[0] {
    _id, _updatedAt,
    title, excerpt, coverImage, coverPath, publishedAt, tags, category, readingTime, language, syndicatedTo,
    seoTitle, seoDescription, ogImage, ogImagePath, ogTitle, ogDescription, noIndex, canonicalUrl,
    // internalLink marks carry only a _ref unless dereferenced here — without
    // this every internal link in a post body rendered as href="#".
    body[]{ ..., markDefs[]{ ..., _type == "internalLink" => { "reference": reference->{ _type, slug, pageId } } } },
    "author": author->{ name, photo, photoPath, role, bio, socialLinks },
    "relatedPosts": relatedPosts[]->{ title, "slug": slug.current, excerpt, coverPath, coverImage, publishedAt, category, readingTime }
  }
`;

export const singletonPageQuery = `
  *[_type == "singletonPage" && pageId == $pageId && !(_id in path("drafts.**"))] | order(_updatedAt desc)[0] {
    title, subtitle, seoTitle, seoDescription, ogImage, ogImagePath, ogTitle, ogDescription, noIndex, canonicalUrl, heroImage, heroPath, heroPosterPath, sectionImagePath, mediaPaths, language, body, items
  }
`;

export const serviceTagVideosQuery = `
  *[_type == "service" && defined(tagVideoPath) && !(_id in path("drafts.**"))] { "slug": slug.current, tagVideoPath }
`;

export const homeLogoBandQuery = `
  *[_type == "client" && showInLogoBand == true && defined(coalesce(bandLogoPath, logoPath)) && !(_id in path("drafts.**"))] | order(coalesce(bandOrder, 9999) asc, name asc) { name, "logoPath": coalesce(bandLogoPath, logoPath) }
`;

export const teamListQuery = `
  *[_type == "person"] | order(order asc) {
    name, "slug": slug.current, photo, photoPath, role, bio, socialLinks
  }
`;

// ══════════════════════════════════════════════════════════════════
// NEON SQL QUERIES — for Phase 2 migration
// Replace Sanity GROQ queries above with these when frontend reads
// from Neon instead of Sanity.
// ══════════════════════════════════════════════════════════════════

export const NEON = {
  siteSettings: `select data from content_items where content_type = 'siteSettings' and status = 'published' limit 1`,
  servicesList: `select id, data from content_items where content_type = 'service' and status = 'published' order by data->>'order' asc nulls last`,
  serviceBySlug: (slug: string) => ({
    text: `select data from content_items where content_type = 'service' and id = $1 and status = 'published' limit 1`,
    values: [slug],
  }),
  caseStudiesList: `select id, data from content_items where content_type = 'caseStudy' and status = 'published' order by data->>'publishedAt' desc nulls last`,
  caseStudyBySlug: (slug: string) => ({
    text: `select data from content_items where content_type = 'caseStudy' and id = $1 and status = 'published' limit 1`,
    values: [slug],
  }),
  postsList: `select id, data from content_items where content_type = 'post' and status = 'published' order by data->>'publishedAt' desc nulls last`,
  postBySlug: (slug: string) => ({
    text: `select data from content_items where content_type = 'post' and id = $1 and status = 'published' limit 1`,
    values: [slug],
  }),
  singletonPage: (pageId: string) => ({
    text: `select data from content_items where content_type = 'page' and id = $1 and status = 'published' limit 1`,
    values: [pageId],
  }),
  teamList: `select id, data from content_items where content_type = 'person' and status = 'published' order by data->>'order' asc nulls last`,
};
