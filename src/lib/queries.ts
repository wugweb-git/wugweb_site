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
    title, "slug": slug.current, subtitle, summary, icon, coverImage, tags
  }
`;

export const serviceBySlugQuery = `
  *[_type == "service" && slug.current == $slug][0] {
    title, subtitle, tags, summary, heroText, fullDescription, icon, coverImage,
    capabilities, approach, process, tools, why, body,
    seoTitle, seoDescription, ogImage,
    "caseStudies": caseStudies[]->{ title, "slug": slug.current, client, summary, coverImage, tags },
    faqs
  }
`;

export const caseStudiesListQuery = `
  *[_type == "caseStudy"] | order(featured desc, publishedAt desc) {
    title, "slug": slug.current, client, summary, about, coverImage, tags,
    disciplines, industry, timeline, publishedAt, featured
  }
`;

export const caseStudyBySlugQuery = `
  *[_type == "caseStudy" && slug.current == $slug][0] {
    title, client, summary, about, tags, disciplines, industry, timeline, team,
    coverImage, gallery, challenges, solutions, impact, results, body,
    seoTitle, seoDescription, ogImage, publishedAt, featured,
    "services": services[]->{ title, "slug": slug.current }
  }
`;

export const postsListQuery = `
  *[_type == "post"] | order(featured desc, publishedAt desc) {
    title, "slug": slug.current, excerpt, coverImage, publishedAt, tags, category, readingTime, featured,
    "author": author->{ name, photo, role }
  }
`;

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    title, excerpt, coverImage, body, publishedAt, tags, category, readingTime,
    seoTitle, seoDescription, ogImage,
    "author": author->{ name, photo, role, bio, socialLinks }
  }
`;

export const singletonPageQuery = `
  *[_type == "singletonPage" && pageId == $pageId][0] {
    title, subtitle, seoTitle, seoDescription, ogImage, heroImage, language, body, items
  }
`;

export const teamListQuery = `
  *[_type == "person"] | order(order asc) {
    name, "slug": slug.current, photo, role, bio, socialLinks
  }
`;
