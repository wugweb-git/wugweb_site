import { Badge, Text } from '@sanity/ui';
import type { Row, ColumnDef, TableConfig } from './types';
import { seoScore } from './health';
import { SeoBadge, StatusBadge, AuthorAvatar, UpdatedTime, PublishState, Thumb } from '../components/ui';
import { formatDate } from './format';

/**
 * Per-type table configs. Each GROQ query fetches BOTH drafts and published
 * (see lib/groq.ts merge). One-shot fetch, no subscriptions (free-tier safe).
 * `draft`/`seoScore`/`updatedAt` are derived client-side where possible to
 * avoid per-row subqueries.
 */

const TITLE: ColumnDef = { key: 'title', label: 'Title', width: 260, pinned: true };
const SEO: ColumnDef = {
  key: '__seo',
  label: 'Completeness',
  width: 110,
  sortable: false,
  render: (row) => <SeoBadge score={seoScore(row)} />,
};
const UPDATED: ColumnDef = {
  key: '_updatedAt',
  label: 'Updated',
  width: 100,
  sortable: true,
  render: (row) => <UpdatedTime iso={String(row._updatedAt ?? '')} />,
};
const STATE: ColumnDef = {
  key: '__state',
  label: 'State',
  width: 90,
  sortable: false,
  render: (row) => <PublishState row={row} />,
};


const ASSET_GROUPS = ['Work', 'Services', 'More', 'Brand', 'Blog', 'Framer'];
const ASSET_MEDIA = ['Image', 'Video', 'SVG', 'Audio'];
const ASSET_STATUS = ['Active', 'Archived', 'Reserved'];

const ASSET_LINKS: [string, string][] = [
  ['linkedCaseStudy', 'Case study'],
  ['linkedClient', 'Client'],
  ['linkedService', 'Service'],
  ['linkedPost', 'Post'],
  ['linkedPageId', 'Page'],
];
function assetLinkKind(row: Row): string {
  const hit = ASSET_LINKS.find(([k]) => row[k]);
  return hit ? hit[1] : 'Unlinked';
}
function assetLinkLabel(row: Row): string {
  const hit = ASSET_LINKS.find(([k]) => row[k]);
  return hit ? `${hit[1]}: ${String(row[hit[0]])}` : 'Unlinked';
}

export const TABLE_CONFIGS: TableConfig[] = [
  {
    key: 'redirect',
    type: 'redirect',
    title: 'Redirects',
    query: `*[_type=="redirect"][0...500] | order(enabled desc, hits desc) {
      _id, _type, _updatedAt, source, destination, statusCode, enabled, note, hits, lastUsedAt
    }`,
    columns: [
      { key: 'source', label: 'Old URL', width: 220, pinned: true },
      { key: 'destination', label: 'New URL', width: 220, render: (row) => <Text size={1}>{String(row.destination || '—')}</Text> },
      { key: 'statusCode', label: 'Status', width: 90, render: (row) => <Badge tone={Number(row.statusCode) === 301 ? 'positive' : 'caution'} fontSize={1}>{String(row.statusCode ?? '—')}</Badge> },
      { key: 'enabled', label: 'Enabled', width: 90, render: (row) => (row.enabled ? <Badge tone="positive">✓</Badge> : <Badge tone="neutral">✕</Badge>) },
      { key: 'hits', label: 'Hits', width: 70, render: (row) => <Text size={1} muted>{String(row.hits ?? 0)}</Text> },
      { key: 'note', label: 'Note', width: 240, render: (row) => <Text size={1} muted>{String(row.note || '—')}</Text> },
      UPDATED,
    ],
    titleField: 'source',
    // Row title reads as the rule itself: "/old → /new · 301".
    getTitle: (row) => `${String(row.source || '?')} → ${String(row.destination || '?')} · ${String(row.statusCode ?? 301)}`,
    getSubtitle: (row) => [row.enabled === false ? 'Disabled' : '', String(row.note || '')].filter(Boolean).join(' · '),
  },
  {
    key: 'post',
    type: 'post',
    title: 'Blog Posts',
    query: `*[_type=="post"][0...500] | order(coalesce(publishedAt, _createdAt) desc) {
      _id, _type, _updatedAt, title, "slug": slug.current, category, readingTime, publishedAt, featured,
      "authorName": author->name, "authorPhoto": author->photo,
      "coverUrl": coverImage.asset->url, coverPath, excerpt, seoDescription, ogImage, body
    }`,
    columns: [
      TITLE,
      { key: 'category', label: 'Category', width: 150, render: (row) => <Badge tone="primary" mode="outline" fontSize={1}>{String(row.category || '—')}</Badge> },
      {
        key: 'authorName', label: 'Author', width: 150,
        render: (row) => (
          <FlexRow><AuthorAvatar name={String(row.authorName ?? '')} url={String(row.authorPhoto ?? '')} /><Text size={1}>{String(row.authorName || '—')}</Text></FlexRow>
        ),
      },
      { key: 'readingTime', label: 'Read', width: 70, render: (row) => <Text size={1} muted>{row.readingTime ? `${row.readingTime}m` : '—'}</Text> },
      { key: 'publishedAt', label: 'Published', width: 110, render: (row) => <Text size={1} muted>{formatDate(String(row.publishedAt ?? ''))}</Text> },
      { key: 'featured', label: 'Featured', width: 90, render: (row) => (row.featured ? <Badge tone="caution">⭐ Featured</Badge> : <Text size={1} muted>—</Text>) },
      SEO,
      UPDATED,
      STATE,
    ],
    titleField: 'title',
    getThumb: (row) => {
      if (row.coverUrl) return String(row.coverUrl);
      const p = String(row.coverPath ?? '');
      if (p) return p.startsWith('/') ? `https://wugweb.pages.dev${p}` : p;
      return null;
    },
    getSubtitle: (row) => `@${String(row.slug ?? '')}`,
  },
  {
    key: 'caseStudy',
    type: 'caseStudy',
    title: 'Case Studies',
    query: `*[_type=="caseStudy"][0...500] | order(coalesce(publishedAt, _createdAt) desc) {
      _id, _type, _updatedAt, title, "slug": slug.current, "clientName": clientRef->name, client,
      "industryName": industryRef->name, disciplines, timeline, featured, publishedAt,
      "coverUrl": coverImage.asset->url, coverPath, thumbnailPath, "galleryCount": count(galleryPaths),
      summary, seoDescription
    }`,
    columns: [
      TITLE,
      { key: 'clientName', label: 'Client', width: 160, render: (row) => <Text size={1}>{String(row.clientName || row.client || '—')}</Text> },
      { key: 'industryName', label: 'Industry', width: 140, render: (row) => <Text size={1} muted>{String(row.industryName || '—')}</Text> },
      { key: 'disciplines', label: 'Disciplines', width: 180, render: (row) => <Text size={1} muted>{Array.isArray(row.disciplines) ? (row.disciplines as string[]).join(', ') : '—'}</Text> },
      { key: 'timeline', label: 'Timeline', width: 90, render: (row) => <Text size={1} muted>{String(row.timeline || '—')}</Text> },
      { key: 'galleryCount', label: 'Gallery', width: 80, render: (row) => <Text size={1} muted>{row.galleryCount ? `${row.galleryCount} files` : '—'}</Text> },
      { key: 'featured', label: 'Featured', width: 90, render: (row) => (row.featured ? <Badge tone="caution">⭐</Badge> : <Text size={1} muted>—</Text>) },
      SEO,
      UPDATED,
      STATE,
    ],
    titleField: 'title',
    getThumb: (row) => {
      if (row.coverUrl) return String(row.coverUrl);
      const p = String(row.coverPath || row.thumbnailPath || '');
      if (/\.(jpe?g|png|gif|webp)$/i.test(p)) {
        return p.startsWith('/') ? `https://wugweb.pages.dev${p}` : p;
      }
      return null;
    },
    getSubtitle: (row) => `@${String(row.slug ?? '')}`,
  },
  {
    key: 'service',
    type: 'service',
    title: 'Services',
    query: `*[_type=="service"][0...500] | order(order asc, title asc) {
      _id, _type, _updatedAt, title, "slug": slug.current, subtitle, tags, order, coverPath, heroText, summary,
      "caseStudyCount": count(caseStudies), seoDescription
    }`,
    columns: [
      { key: 'order', label: '#', width: 60, render: (row) => <Text size={1} muted>{String(row.order ?? '—')}</Text> },
      TITLE,
      { key: 'subtitle', label: 'Subtitle', width: 200, render: (row) => <Text size={1} muted>{String(row.subtitle || '—')}</Text> },
      { key: 'tags', label: 'Tags', width: 200, render: (row) => <Text size={1} muted>{Array.isArray(row.tags) ? (row.tags as string[]).join(', ') : '—'}</Text> },
      { key: 'caseStudyCount', label: 'Cases', width: 80, render: (row) => <Text size={1} muted>{String(row.caseStudyCount ?? 0)}</Text> },
      SEO,
      UPDATED,
      STATE,
    ],
    titleField: 'title',
    getSubtitle: (row) => `@${String(row.slug ?? '')}`,
  },
  {
    key: 'client',
    type: 'client',
    title: 'Clients',
    query: `*[_type=="client"][0...500] | order(name asc) {
      _id, _type, _updatedAt, name, "slug": slug.current, "industryName": industry->name,
      website, "logoUrl": logo.asset->url, logoPath, engagementType, description, seoDescription,
      "caseStudyCount": count(caseStudies), "engagementCount": count(engagements)
    }`,
    columns: [
      TITLE,
      { key: 'industryName', label: 'Industry', width: 140, render: (row) => <Text size={1} muted>{String(row.industryName || '—')}</Text> },
      { key: 'engagementType', label: 'Engagement', width: 110, render: (row) => <StatusBadge value={String(row.engagementType ?? '')} /> },
      { key: 'caseStudyCount', label: 'Cases', width: 70, render: (row) => <Text size={1} muted>{String(row.caseStudyCount ?? 0)}</Text> },
      { key: 'website', label: 'Website', width: 160, render: (row) => row.website ? <Text size={1} muted>{String(row.website).replace(/^https?:\/\//, '')}</Text> : <Text size={1} muted>—</Text> },
      SEO,
      UPDATED,
    ],
    titleField: 'name',
    getThumb: (row) => (row.logoUrl ? String(row.logoUrl) : row.logoPath ? String(row.logoPath) : null),
    getSubtitle: (row) => `@${String(row.slug ?? '')}`,
  },
  {
    key: 'engagement',
    type: 'engagement',
    title: 'Engagements',
    query: `*[_type=="engagement"][0...500] | order(coalesce(startDate, _createdAt) desc) {
      _id, _type, _updatedAt, name, "slug": slug.current, status, engagementType,
      "clientName": client->name, startDate, endDate, priceLabel, duration,
      "serviceCount": count(services)
    }`,
    columns: [
      TITLE,
      { key: 'clientName', label: 'Client', width: 150, render: (row) => <Text size={1}>{String(row.clientName || '—')}</Text> },
      { key: 'status', label: 'Status', width: 100, render: (row) => <StatusBadge value={String(row.status ?? '')} /> },
      { key: 'engagementType', label: 'Type', width: 110, render: (row) => <Text size={1} muted>{String(row.engagementType || '—')}</Text> },
      { key: 'startDate', label: 'Start', width: 100, render: (row) => <Text size={1} muted>{formatDate(String(row.startDate ?? ''))}</Text> },
      { key: 'serviceCount', label: 'Services', width: 80, render: (row) => <Text size={1} muted>{String(row.serviceCount ?? 0)}</Text> },
      { key: 'priceLabel', label: 'Price', width: 110, render: (row) => <Text size={1} muted>{String(row.priceLabel || '—')}</Text> },
      UPDATED,
    ],
    titleField: 'name',
    getSubtitle: (row) => `@${String(row.slug ?? '')}`,
  },
  {
    key: 'person',
    type: 'person',
    title: 'Team',
    query: `*[_type=="person"][0...500] | order(order asc, name asc) {
      _id, _type, _updatedAt, name, "slug": slug.current, role, order, email,
      "photoUrl": photo.asset->url, photoPath, "postCount": count(*[_type=="post" && author._ref == ^._id])
    }`,
    columns: [
      TITLE,
      { key: 'role', label: 'Role', width: 160, render: (row) => <Text size={1} muted>{String(row.role || '—')}</Text> },
      { key: 'order', label: 'Order', width: 70, render: (row) => <Text size={1} muted>{String(row.order ?? '—')}</Text> },
      { key: 'postCount', label: 'Posts', width: 70, render: (row) => <Text size={1} muted>{String(row.postCount ?? 0)}</Text> },
      { key: 'email', label: 'Email', width: 180, render: (row) => <Text size={1} muted>{String(row.email || '—')}</Text> },
      UPDATED,
    ],
    titleField: 'name',
    getThumb: (row) => (row.photoUrl ? String(row.photoUrl) : row.photoPath ? String(row.photoPath) : null),
    getSubtitle: (row) => `@${String(row.slug ?? '')}`,
  },
  {
    key: 'testimonial',
    type: 'testimonial',
    title: 'Testimonials',
    query: `*[_type=="testimonial"][0...500] | order(order asc, name asc) {
      _id, _type, _updatedAt, name, role, company, quote, rating, featured, source, subject, order,
      "photoUrl": photo.asset->url, photoPath
    }`,
    columns: [
      TITLE,
      { key: 'company', label: 'Company', width: 160, render: (row) => <Text size={1}>{String(row.company || '—')}</Text> },
      { key: 'rating', label: 'Rating', width: 90, render: (row) => <Text size={1} muted>{row.rating ? `${row.rating}/5` : '—'}</Text> },
      { key: 'source', label: 'Source', width: 140, render: (row) => <Badge tone="primary" mode="outline" fontSize={1}>{String(row.source || '—')}</Badge> },
      { key: 'subject', label: 'Subject', width: 110, render: (row) => <StatusBadge value={String(row.subject ?? '')} /> },
      { key: 'featured', label: 'Featured', width: 90, render: (row) => (row.featured ? <Badge tone="caution">⭐</Badge> : <Text size={1} muted>—</Text>) },
      UPDATED,
    ],
    titleField: 'name',
    getThumb: (row) => (row.photoUrl ? String(row.photoUrl) : row.photoPath ? String(row.photoPath) : null),
    getSubtitle: (row) => String(row.role || ''),
  },
  {
    key: 'asset',
    type: 'asset',
    title: 'Media Library',
    query: `*[_type=="asset"][0...2000] | order(assetGroup asc, name asc) {
      _id, _type, _updatedAt, name, displayName, alt, "slug": slug.current, assetType, mediaType, assetGroup,
      usage, status, folder, relativePath, sitePath, r2Key, publicUrl, fileName, extension,
      localExists, r2Synced, "linkedCaseStudy": linkedCaseStudy->title, "linkedClient": linkedClient->name,
      "linkedService": linkedService->title, "linkedPost": linkedPost->title, linkedPageId
    }`,
    columns: [
      { key: 'name', label: 'Name', width: 220, pinned: true },
      { key: 'displayName', label: 'Display name', width: 180, edit: { kind: 'text' } },
      { key: 'alt', label: 'Alt text', width: 220, edit: { kind: 'text' }, filter: true, value: (row) => (row.alt ? 'Has alt' : 'Missing alt') },
      { key: 'assetGroup', label: 'Group', width: 120, filter: true, groupable: true, edit: { kind: 'select', options: ASSET_GROUPS } },
      { key: 'mediaType', label: 'Media', width: 100, filter: true, groupable: true, edit: { kind: 'select', options: ASSET_MEDIA } },
      { key: 'status', label: 'Status', width: 110, filter: true, groupable: true, edit: { kind: 'select', options: ASSET_STATUS } },
      { key: 'usage', label: 'Usage', width: 130, filter: true, groupable: true, edit: { kind: 'combo' } },
      { key: 'linkedTo', label: 'Linked to', width: 200, filter: true, groupable: true, sortable: true, value: assetLinkKind, render: (row) => <Text size={1} muted>{assetLinkLabel(row)}</Text> },
      { key: 'localExists', label: 'Local', width: 80, filter: true, value: (row) => (row.localExists ? 'Yes' : 'No'), render: (row) => (row.localExists ? <Badge tone="positive">✓</Badge> : <Badge tone="caution">☁</Badge>) },
      { key: 'r2Synced', label: 'R2', width: 70, filter: true, value: (row) => (row.r2Synced ? 'Yes' : 'No'), render: (row) => (row.r2Synced ? <Badge tone="positive">✓</Badge> : <Badge tone="critical">✕</Badge>) },
      { key: 'folder', label: 'Folder', width: 160, groupable: true, hiddenByDefault: true },
      { key: 'relativePath', label: 'Path', width: 240, render: (row) => <Text size={1} muted>{String(row.relativePath || '—')}</Text> },
      UPDATED,
    ],
    bulkSets: [
      { field: 'assetGroup', label: 'group', options: ASSET_GROUPS },
      { field: 'mediaType', label: 'media type', options: ASSET_MEDIA },
      { field: 'status', label: 'status', options: ASSET_STATUS },
    ],
    titleField: 'displayName',
    getTitle: (row) => String(row.displayName || row.name || row._id),
    getSubtitle: (row) => String(row.relativePath || row.extension || ''),
  },
  {
    key: 'taxonomy',
    type: 'taxonomy',
    title: 'Taxonomy',
    query: `*[_type=="taxonomy"][0...2000] | order(vocabulary asc, order asc, name asc) {
      _id, _type, _updatedAt, name, "slug": slug.current, vocabulary, category, status, order, icon, color, iconPath
    }`,
    columns: [
      { key: 'icon', label: '', width: 50, sortable: false, render: (row) => <Text size={2}>{String(row.icon || '🏷')}</Text> },
      TITLE,
      { key: 'vocabulary', label: 'Vocabulary', width: 150, render: (row) => <Badge tone="primary" mode="outline" fontSize={1}>{String(row.vocabulary || '—')}</Badge> },
      { key: 'category', label: 'Category', width: 140, render: (row) => <Text size={1} muted>{String(row.category || '—')}</Text> },
      { key: 'status', label: 'Status', width: 100, render: (row) => <StatusBadge value={String(row.status ?? '')} /> },
      { key: 'order', label: 'Order', width: 70, render: (row) => <Text size={1} muted>{String(row.order ?? '—')}</Text> },
      UPDATED,
    ],
    titleField: 'name',
    getSubtitle: (row) => `@${String(row.slug ?? '')}`,
  },
  {
    key: 'platformProfile',
    type: 'platformProfile',
    title: 'Presence',
    query: `*[_type=="platformProfile"][0...1000] | order(platform asc, username asc) {
      _id, _type, _updatedAt, profileId, platform, username, profileUrl, category, profileStatus, owner,
      "platformMaster": platformRef->name
    }`,
    columns: [
      TITLE,
      { key: 'profileId', label: 'Profile ID', width: 140, render: (row) => <Text size={1} muted>{String(row.profileId || '—')}</Text> },
      { key: 'owner', label: 'Owner', width: 110, render: (row) => <StatusBadge value={String(row.owner ?? '')} /> },
      { key: 'profileStatus', label: 'Status', width: 110, render: (row) => <StatusBadge value={String(row.profileStatus ?? '')} /> },
      { key: 'category', label: 'Category', width: 140, render: (row) => <Text size={1} muted>{String(row.category || '—')}</Text> },
      { key: 'profileUrl', label: 'URL', width: 220, render: (row) => row.profileUrl ? <Text size={1} muted>{String(row.profileUrl).replace(/^https?:\/\//, '').slice(0, 40)}</Text> : <Text size={1} muted>—</Text> },
      UPDATED,
    ],
    titleField: 'platform',
    getTitle: (row) => String(row.platform || row.profileId || row._id),
    getSubtitle: (row) => `@${String(row.username || row.profileId || '')}`,
  },
  {
    key: 'industry',
    type: 'industry',
    title: 'Industries',
    query: `*[_type=="industry"][0...1000] | order(order asc, name asc) {
      _id, _type, _updatedAt, name, "slug": slug.current, description, order, icon, iconPath
    }`,
    columns: [
      { key: 'icon', label: '', width: 50, sortable: false, render: (row) => <Text size={2}>{String(row.icon || '🏭')}</Text> },
      TITLE,
      { key: 'order', label: 'Order', width: 70, render: (row) => <Text size={1} muted>{String(row.order ?? '—')}</Text> },
      { key: 'description', label: 'Description', width: 320, render: (row) => <Text size={1} muted>{String(row.description || '—')}</Text> },
      UPDATED,
    ],
    titleField: 'name',
    getSubtitle: (row) => `@${String(row.slug ?? '')}`,
  },
  {
    key: 'singletonPage',
    type: 'singletonPage',
    title: 'Pages',
    query: `*[_type=="singletonPage"][0...200] | order(pageId asc) {
      _id, _type, _updatedAt, pageId, title, subtitle, language, heroPath, seoDescription, "mediaCount": count(mediaPaths)
    }`,
    columns: [
      TITLE,
      { key: 'pageId', label: 'Page ID', width: 140, render: (row) => <Badge tone="default" fontSize={1}>{String(row.pageId || '—')}</Badge> },
      { key: 'language', label: 'Lang', width: 80, render: (row) => <Text size={1} muted>{String(row.language || '—')}</Text> },
      { key: 'mediaCount', label: 'Media', width: 70, render: (row) => <Text size={1} muted>{String(row.mediaCount ?? 0)}</Text> },
      SEO,
      UPDATED,
    ],
    titleField: 'title',
    getTitle: (row) => String(row.title || row.pageId || row._id),
    getSubtitle: (row) => `@${String(row.pageId ?? '')}`,
  },
  {
    key: 'contactSubmission',
    type: 'contactSubmission',
    title: 'Contact Submissions',
    query: `*[_type=="contactSubmission"][0...500] | order(submittedAt desc) {
      _id, _type, _updatedAt, name, email, company, topic, phone, budget, interests, contactMethod, newsletterOptIn, submittedAt
    }`,
    columns: [
      { key: 'name', label: 'Name', width: 160, pinned: true },
      { key: 'email', label: 'Email', width: 200, render: (row) => <Text size={1}>{String(row.email || '—')}</Text> },
      { key: 'company', label: 'Company', width: 150, render: (row) => <Text size={1} muted>{String(row.company || '—')}</Text> },
      { key: 'topic', label: 'Topic', width: 220, render: (row) => <Text size={1} muted>{String(row.topic || '—')}</Text> },
      { key: 'budget', label: 'Budget', width: 90, render: (row) => <Text size={1} muted>{String(row.budget || '—')}</Text> },
      { key: 'submittedAt', label: 'Submitted', width: 120, render: (row) => <Text size={1} muted>{formatDate(String(row.submittedAt ?? ''))}</Text> },
    ],
    titleField: 'name',
    getTitle: (row) => String(row.name || 'Anonymous'),
    getSubtitle: (row) => String(row.phone || ''),
  },
  {
    key: 'brandAsset',
    type: 'brandAsset',
    title: 'Brand Assets & Icons',
    query: `*[_type=="brandAsset"][0...1000] | order(category asc, name asc) {
      _id, _type, _updatedAt, name, "slug": slug.current, category, variant, dimensions, path, status,
      "imageUrl": image.asset->url
    }`,
    columns: [
      TITLE,
      { key: 'category', label: 'Category', width: 140, render: (row) => <Badge tone="primary" mode="outline" fontSize={1}>{String(row.category || '—')}</Badge> },
      { key: 'variant', label: 'Variant', width: 110, render: (row) => <Badge tone="default" fontSize={1}>{String(row.variant || 'default')}</Badge> },
      { key: 'status', label: 'Status', width: 100, render: (row) => <StatusBadge value={String(row.status ?? '')} /> },
      { key: 'dimensions', label: 'Dimensions', width: 100, render: (row) => <Text size={1} muted>{String(row.dimensions || '—')}</Text> },
      { key: 'path', label: 'Path', width: 220, render: (row) => <Text size={1} muted>{String(row.path || '—')}</Text> },
      UPDATED,
    ],
    titleField: 'name',
    getThumb: (row) => (row.imageUrl ? String(row.imageUrl) : row.path ? String(row.path) : null),
    getSubtitle: (row) => `@${String(row.slug ?? '')}`,
  },
  {
    key: 'siteScript',
    type: 'siteScript',
    title: 'Scripts & Integrations',
    query: `*[_type=="siteScript"][0...500] | order(priority asc, name asc) {
      _id, _type, _updatedAt, name, "slug": slug.current, scriptType, placement, enabled, environment, priority, trackingId, src
    }`,
    columns: [
      TITLE,
      { key: 'scriptType', label: 'Type', width: 150, render: (row) => <Badge tone="primary" mode="outline" fontSize={1}>{String(row.scriptType || '—')}</Badge> },
      { key: 'placement', label: 'Placement', width: 110, render: (row) => <Badge tone="default" fontSize={1}>{String(row.placement || 'head')}</Badge> },
      { key: 'enabled', label: 'Active', width: 90, render: (row) => (row.enabled ? <Badge tone="positive">🟢 Active</Badge> : <Badge tone="critical">⚪ Off</Badge>) },
      { key: 'environment', label: 'Env', width: 110, render: (row) => <Text size={1} muted>{String(row.environment || 'all')}</Text> },
      { key: 'trackingId', label: 'Tracking ID', width: 140, render: (row) => <Text size={1} muted>{String(row.trackingId || '—')}</Text> },
      UPDATED,
    ],
    titleField: 'name',
    getSubtitle: (row) => `@${String(row.slug ?? '')}`,
  },
  {
    key: 'navigationMenu',
    type: 'navigationMenu',
    title: 'Navigation Menus',
    query: `*[_type=="navigationMenu"][0...500] | order(menuId asc, title asc) {
      _id, _type, _updatedAt, title, menuId, description, "itemCount": count(items)
    }`,
    columns: [
      TITLE,
      { key: 'menuId', label: 'Menu ID', width: 160, render: (row) => <Badge tone="primary" fontSize={1}>{String(row.menuId || '—')}</Badge> },
      { key: 'itemCount', label: 'Items', width: 80, render: (row) => <Text size={1} muted>{String(row.itemCount ?? 0)} links</Text> },
      { key: 'description', label: 'Description', width: 260, render: (row) => <Text size={1} muted>{String(row.description || '—')}</Text> },
      UPDATED,
    ],
    titleField: 'title',
    getSubtitle: (row) => `@${String(row.menuId ?? '')}`,
  },
];

export const TABLE_MAP = Object.fromEntries(TABLE_CONFIGS.map((t) => [t.key, t]));

/** Small flex helper used in table render fns (avoids importing Flex everywhere). */
function FlexRow({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      {children}
    </span>
  );
}
