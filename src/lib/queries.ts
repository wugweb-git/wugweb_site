// Keep queries here (not inline in pages) so the shape of each
// document type only has to change in one place.

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    siteTitle, seoDescription, ogImage, language, copyright,
    socialLinks, contactEmail, companyName
  }
`;

export const servicesListQuery = `
  *[_type == "service"] | order(order asc) {
    title, "slug": slug.current, subtitle, summary, icon, coverImage, coverPath, galleryPaths, tags
  }
`;

export const serviceBySlugQuery = `
  *[_type == "service" && slug.current == $slug && !(_id in path("drafts.**"))] | order(_updatedAt desc)[0] {
    title, subtitle, tags, summary, heroText, fullDescription, icon, coverImage, coverPath, galleryPaths,
    capabilities, approach, process, tools, why, body,
    seoTitle, seoDescription, ogImage,
    "caseStudies": caseStudies[]->{ title, "slug": slug.current, client, summary, coverImage, coverPath, thumbnailPath, tags },
    faqs
  }
`;

export const caseStudiesListQuery = `
  *[_type == "caseStudy"] | order(featured desc, publishedAt desc) {
    title, "slug": slug.current, client, summary, about, coverImage, coverPath, thumbnailPath, galleryPaths, tags,
    disciplines, industry, timeline, publishedAt, featured
  }
`;

export const caseStudyBySlugQuery = `
  *[_type == "caseStudy" && slug.current == $slug][0] {
    title, client, summary, about, tags, disciplines, industry, timeline, team,
    coverImage, coverPath, thumbnailPath, galleryPaths, gallery, challenges, solutions, impact, results, body,
    seoTitle, seoDescription, ogImage, publishedAt, featured,
    "services": services[]->{ title, "slug": slug.current }
  }
`;

export const postsListQuery = `
  *[_type == "post"] | order(featured desc, publishedAt desc) {
    title, "slug": slug.current, excerpt, coverImage, coverPath, publishedAt, tags, category, readingTime, featured,
    "author": author->{ name, photo, role }
  }
`;

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    title, excerpt, coverImage, coverPath, body, publishedAt, tags, category, readingTime,
    seoTitle, seoDescription, ogImage,
    "author": author->{ name, photo, role, bio, socialLinks }
  }
`;

export const singletonPageQuery = `
  *[_type == "singletonPage" && pageId == $pageId][0] {
    title, subtitle, seoTitle, seoDescription, ogImage, heroImage, heroPath, mediaPaths, language, body, items
  }
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
