import { type StructureBuilder, type StructureResolver } from 'sanity/structure';

// Document types that appear in cross-type dashboard widgets.
const contentTypes = ['caseStudy', 'post', 'service', 'singletonPage'];
const businessTypes = ['client', 'engagement', 'industry', 'person'];
const editableTypes = [
  ...contentTypes,
  ...businessTypes,
  'asset',
  'taxonomy',
  'siteSettings',
  'syncStatus',
  'contactSubmission',
];

export const deskStructure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Wugweb Admin')
    .items([
      dashboardItem(S),
      S.divider(),
      sectionItem(S, '✍ Content', '📝', [
        listItem(S, '📄', 'Pages', [
          singletonPageItem(S, 'Home', 'home', '🏠'),
          singletonPageItem(S, 'About', 'about', '👋'),
          singletonPageItem(S, 'Services', 'services', '🛠️'),
          singletonPageItem(S, 'Work', 'work', '💼'),
          singletonPageItem(S, 'Blog', 'blog', '✍️'),
          singletonPageItem(S, 'FAQ', 'faq', '❓'),
          singletonPageItem(S, 'Contact', 'contact', '📬'),
          S.divider(),
          singletonPageItem(S, 'Privacy', 'privacy-policy', '🔒'),
          singletonPageItem(S, 'Terms', 'terms-of-use', '📋'),
          singletonPageItem(S, 'Refund', 'refund-policy', '💰'),
          S.divider(),
          singletonPageItem(S, 'Impact', 'impact', '🌍'),
          singletonPageItem(S, 'Subscription', 'subscription', '📨'),
          singletonPageItem(S, 'Sitemap', 'sitemap', '🗺️'),
        ]),
        S.documentTypeListItem('caseStudy').title('Case Studies').icon(() => '💼'),
        S.documentTypeListItem('post').title('Blog Posts').icon(() => '✍️'),
        S.documentTypeListItem('service').title('Services').icon(() => '🛠️'),
      ]),
      S.divider(),
      sectionItem(S, '💼 Business', '🏢', [
        S.documentTypeListItem('client').title('Clients').icon(() => '🏢'),
        S.documentTypeListItem('engagement').title('Engagements').icon(() => '🤝'),
        S.documentTypeListItem('industry').title('Industries').icon(() => '🏭'),
        S.documentTypeListItem('person').title('Team / People').icon(() => '👥'),
      ]),
      S.divider(),
      sectionItem(S, '🎨 Brand & Media', '🖼️', [
        S.documentTypeListItem('asset').title('Assets').icon(() => '🖼️'),
      ]),
      S.divider(),
      sectionItem(S, '🧠 Knowledge', '📚', [
        S.documentTypeListItem('taxonomy').title('Taxonomy Terms').icon(() => '🏷️'),
        S.documentTypeListItem('platformProfile').title('Platform Profiles').icon(() => '🔗'),
      ]),
      S.divider(),
      sectionItem(S, '⚙ System', '🔧', [
        S.listItem().title('Site Settings').icon(() => '⚙️').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
        S.documentTypeListItem('syncStatus').title('Sync Status').icon(() => '🔄'),
        S.documentTypeListItem('contactSubmission').title('Contact Submissions').icon(() => '📬'),
      ]),
    ]);

function dashboardItem(S: StructureBuilder) {
  return S.listItem()
    .title('📊 Dashboard')
    .icon(() => '📊')
    .child(
      S.list()
        .title('Dashboard')
        .items([
          S.documentTypeListItem('post').title('Blog Posts').icon(() => '✍️'),
          S.documentTypeListItem('caseStudy').title('Case Studies').icon(() => '💼'),
          S.documentTypeListItem('service').title('Services').icon(() => '🛠️'),
          S.documentTypeListItem('client').title('Clients').icon(() => '🏢'),
          S.documentTypeListItem('engagement').title('Engagements').icon(() => '🤝'),
          S.documentTypeListItem('industry').title('Industries').icon(() => '🏭'),
          S.documentTypeListItem('person').title('Team').icon(() => '👥'),
          S.divider(),
          S.documentTypeListItem('syncStatus').title('Sync Status').icon(() => '🔄'),
          S.documentTypeListItem('siteSettings').title('Site Settings').icon(() => '⚙️'),
        ])
    );
}

function quickStat(
  S: StructureBuilder,
  icon: string,
  title: string,
  filter: string,
  order: string,
  params?: Record<string, unknown>
) {
  const [orderField, orderDirection = 'desc'] = order.split(' ');

  return S.listItem()
    .title(`${icon} ${title}`)
    .icon(() => icon)
    .child(
      S.documentList()
        .title(title)
        .filter(filter)
        .params(params || {})
        .defaultOrdering([{ field: orderField, direction: orderDirection as 'asc' | 'desc' }])
    );
}

function healthList(
  S: StructureBuilder,
  title: string,
  schemaType: string,
  filter: string,
  listTitle: string
) {
  const fullFilter = `_type == "${schemaType}" && ${filter}`;

  return S.listItem()
    .title(title)
    .icon(() => '⚠️')
    .child(
      S.documentList()
        .title(listTitle)
        .schemaType(schemaType)
        .filter(fullFilter)
        .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
    );
}

function filteredList(
  S: StructureBuilder,
  title: string,
  schemaType: string,
  filter: string
) {
  const fullFilter = filter ? `_type == "${schemaType}" && ${filter}` : `_type == "${schemaType}"`;

  return S.listItem()
    .title(title)
    .icon(() => '📌')
    .child(
      S.documentList()
        .title(title)
        .schemaType(schemaType)
        .filter(fullFilter)
        .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
    );
}

function sectionItem(S: StructureBuilder, title: string, icon: string, items: any[]) {
  return S.listItem()
    .title(title)
    .icon(() => icon)
    .child(S.list().title(title).items(items));
}

function listItem(S: StructureBuilder, icon: string, title: string, items: any[]) {
  return S.listItem()
    .title(title)
    .icon(() => icon)
    .child(S.list().title(title).items(items));
}

function singletonPageItem(S: StructureBuilder, label: string, pageId: string, icon: string) {
  return S.listItem()
    .title(label)
    .icon(() => icon)
    .child(S.document().schemaType('singletonPage').documentId(pageId).title(label));
}
