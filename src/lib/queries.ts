// Keep queries here (not inline in pages) so the shape of each
// document type only has to change in one place.

export const servicesListQuery = `
  *[_type == "service"] | order(order asc) {
    title, "slug": slug.current, summary
  }
`;

export const serviceBySlugQuery = `
  *[_type == "service" && slug.current == $slug][0] {
    title, summary, body
  }
`;

export const caseStudiesListQuery = `
  *[_type == "caseStudy"] | order(publishedAt desc) {
    title, "slug": slug.current, client, summary, coverImage
  }
`;

export const caseStudyBySlugQuery = `
  *[_type == "caseStudy" && slug.current == $slug][0] {
    title, client, summary, coverImage, gallery, body, publishedAt
  }
`;

export const postsListQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    title, "slug": slug.current, excerpt, coverImage, publishedAt
  }
`;

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    title, excerpt, coverImage, body, publishedAt, tags
  }
`;

export const singletonPageQuery = `
  *[_type == "singletonPage" && pageId == $pageId][0] {
    title, seoDescription, body
  }
`;
