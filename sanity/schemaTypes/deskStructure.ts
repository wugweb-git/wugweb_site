import { type StructureBuilder, type StructureResolver } from 'sanity/structure';
import { DocumentListPane } from '../components/DocumentListPane';

export const deskStructure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Wugweb')
    .items([
      // ── Overview ──
      sectionItem(S, 'Overview', '◈', [
        S.listItem()
          .title('Start here')
          .icon(() => '⌂')
          .child(
            S.list()
              .title('Start here')
              .items([
                S.documentTypeListItem('syncStatus').title('Sync Status'),
                S.documentTypeListItem('contactSubmission').title('Contact Submissions'),
              ])
          ),
        quickDoc(S, 'Site Settings', 'siteSettings', 'siteSettings', '⚙'),
      ]),

      S.divider(),

      // ── Content ──
      sectionItem(S, 'Content', '✎', [
        pane(S, 'post', 'Blog', 'Blog Posts', '✍', 'post'),
        pane(S, 'caseStudy', 'Case Studies', 'Case Studies', '💼', 'caseStudy'),
        pane(S, 'service', 'Services', 'Services', '🛠', 'service'),
        singletonPages(S),
      ]),

      S.divider(),

      // ── Marketing ──
      sectionItem(S, 'Marketing', '◈', [
        pane(S, 'landingPages', 'Landing Pages', 'Landing Pages', '✈', 'singletonPage'),
        // SEO reports live under Sync Status + Tables; SEO docs = singletonPage (seo group)
        S.listItem()
          .title('SEO')
          .icon(() => '🔎')
          .child(
            S.documentList()
              .title('SEO — Pages needing attention')
              .filter('_type == "singletonPage" && !defined(seoDescription)')
              .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
          ),
        pane(S, 'redirect', 'Redirects', 'Redirects', '↪', 'redirect'),
      ]),

      S.divider(),

      // ── Media ──
      sectionItem(S, 'Media', '▦', [pane(S, 'asset', 'Media Library', 'Media Library', '▦', 'asset')]),

      S.divider(),

      // ── Business ──
      sectionItem(S, 'Business', '◈', [
        pane(S, 'client', 'Clients', 'Clients', '🏢', 'client'),
        pane(S, 'engagement', 'Engagements', 'Engagements', '🤝', 'engagement'),
        pane(S, 'person', 'Team', 'Team / People', '👥', 'person'),
        pane(S, 'testimonial', 'Testimonials', 'Testimonials', '💬', 'testimonial'),
      ]),

      S.divider(),

      // ── Settings ──
      sectionItem(S, 'Settings', '⚙', [
        quickDoc(S, 'Site Settings', 'siteSettings', 'siteSettings', '⚙'),
        vocabList(S, 'Platforms', 'platform', '📡'),
        vocabList(S, 'Tools / Tech stack', 'tech-stack', '🛠'),
        vocabList(S, 'Tags', 'tag', '🏷'),
        vocabList(S, 'Asset types', 'asset-type', '🧩'),
        vocabList(S, 'Content types', 'content-type', '📄'),
        vocabList(S, 'Departments', 'team-department', '👥'),
        vocabList(S, 'Countries', 'country', '🌐'),
        pane(S, 'industry', 'Industries', 'Industry master', '🏭', 'industry'),
        pane(S, 'platformProfile', 'Presence', 'Presence', '🔗', 'platformProfile'),
        pane(S, 'taxonomy', 'All taxonomy', 'All taxonomy', '📚', 'taxonomy'),
      ]),
    ]);

// ── Helpers ──

function sectionItem(S: StructureBuilder, title: string, icon: string, items: any[]) {
  return S.listItem().title(title).icon(() => icon).child(S.list().title(title).items(items));
}

/** A single document singleton. */
function quickDoc(
  S: StructureBuilder,
  title: string,
  schemaType: string,
  documentId: string,
  icon: string
) {
  return S.listItem()
    .title(title)
    .icon(() => icon)
    .child(S.document().schemaType(schemaType).documentId(documentId).title(title));
}

/** A rich list pane using our custom DataTable-powered DocumentListPane. */
function pane(
  S: StructureBuilder,
  key: string,
  title: string,
  label: string,
  icon: string,
  schemaType: string
) {
  return S.listItem()
    .title(title)
    .icon(() => icon)
    .child(
      S.component(DocumentListPane)
        .id(key)
        .title(label)
        .options({ schemaType, tableKey: key })
    );
}

/** Pages singleton list (Content → Pages). */
function singletonPages(S: StructureBuilder) {
  const pages = [
    ['Home', 'home', '🏠'],
    ['About', 'about', '👋'],
    ['Services', 'services', '🛠'],
    ['Work', 'work', '💼'],
    ['Blog', 'blog', '✍'],
    ['FAQ', 'faq', '❓'],
    ['Contact', 'contact', '📬'],
    ['Privacy', 'privacy-policy', '🔒'],
    ['Terms', 'terms-of-use', '📋'],
    ['Refund', 'refund-policy', '💰'],
    ['Impact', 'impact', '🌍'],
    ['Subscription', 'subscription', '📨'],
    ['Sitemap', 'sitemap', '🗺'],
  ] as const;
  return S.listItem()
    .title('Pages')
    .icon(() => '📄')
    .child(
      S.list()
        .title('Pages')
        .items([
          pane(S, 'pages', 'All Pages', 'All Pages', '📄', 'singletonPage'),
          S.divider(),
          ...pages.map(([label, pageId, icon]) =>
            quickDoc(S, label, 'singletonPage', pageId, icon)
          ),
        ])
    );
}

function vocabList(S: StructureBuilder, title: string, vocabulary: string, icon: string) {
  return S.listItem()
    .title(title)
    .icon(() => icon)
    .child(
      S.documentList()
        .title(title)
        .filter('_type == "taxonomy" && vocabulary == $vocabulary')
        .params({ vocabulary })
        .defaultOrdering([{ field: 'order', direction: 'asc' }, { field: 'name', direction: 'asc' }])
    );
}
