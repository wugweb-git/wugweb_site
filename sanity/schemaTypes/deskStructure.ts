import { type StructureBuilder, type StructureResolver } from 'sanity/structure';
import { DashboardIcon } from '@sanity/icons/Dashboard';
import { ThListIcon } from '@sanity/icons/ThList';
import { SearchIcon } from '@sanity/icons/Search';
import { ImageIcon } from '@sanity/icons/Image';
import { ImagesIcon } from '@sanity/icons/Images';
import { ComposeIcon } from '@sanity/icons/Compose';
import { CaseIcon } from '@sanity/icons/Case';
import { RocketIcon } from '@sanity/icons/Rocket';
import { DocumentsIcon } from '@sanity/icons/Documents';
import { DocumentIcon } from '@sanity/icons/Document';
import { DocumentTextIcon } from '@sanity/icons/DocumentText';
import { EditIcon } from '@sanity/icons/Edit';
import { UsersIcon } from '@sanity/icons/Users';
import { UserIcon } from '@sanity/icons/User';
import { LeaveIcon } from '@sanity/icons/Leave';
import { StarIcon } from '@sanity/icons/Star';
import { CommentIcon } from '@sanity/icons/Comment';
import { MenuIcon } from '@sanity/icons/Menu';
import { LinkIcon } from '@sanity/icons/Link';
import { EarthAmericasIcon } from '@sanity/icons/EarthAmericas';
import { PlugIcon } from '@sanity/icons/Plug';
import { ArchiveIcon } from '@sanity/icons/Archive';
import { BellIcon } from '@sanity/icons/Bell';
import { WarningFilledIcon } from '@sanity/icons/WarningFilled';
import { ClockIcon } from '@sanity/icons/Clock';
import { CalendarIcon } from '@sanity/icons/Calendar';
import { LaunchIcon } from '@sanity/icons/Launch';
import { TagIcon } from '@sanity/icons/Tag';
import { OlistIcon } from '@sanity/icons/Olist';
import { PackageIcon } from '@sanity/icons/Package';
import { PinIcon } from '@sanity/icons/Pin';
import { BookIcon } from '@sanity/icons/Book';
import { CogIcon } from '@sanity/icons/Cog';
import { ControlsIcon } from '@sanity/icons/Controls';
import { HomeIcon } from '@sanity/icons/Home';
import { InfoOutlineIcon } from '@sanity/icons/InfoOutline';
import { EnvelopeIcon } from '@sanity/icons/Envelope';
import { LockIcon } from '@sanity/icons/Lock';
import { BillIcon } from '@sanity/icons/Bill';
import { HeartIcon } from '@sanity/icons/Heart';
import { SortIcon } from '@sanity/icons/Sort';
import { DocumentListPane } from '../components/DocumentListPane';

/**
 * Desk order follows CLAUDE.md: (Dashboard tool) → Editorial → Business →
 * Brand & Media → Global Settings → System. Every registered type has exactly
 * one home here.
 */
export const deskStructure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Wugweb Studio')
    .items([

      // ── Editorial ────────────────────────────────────────────────
      sectionItem(S, 'Editorial', ComposeIcon, [
        pane(S, 'post',      'Blog Posts',   'Blog Posts',   ComposeIcon, 'post'),
        pane(S, 'caseStudy', 'Case Studies', 'Case Studies', CaseIcon,    'caseStudy'),
        pane(S, 'service',   'Services',     'Services',     RocketIcon,  'service'),
        singletonPages(S),
        globalSections(S),
      ]),

      S.divider(),

      // ── Business ────────────────────────────────────────────────
      sectionItem(S, 'Business', UsersIcon, [
        pane(S, 'client',      'Clients',      'Clients',       EarthAmericasIcon, 'client'),
        pane(S, 'engagement',  'Engagements',  'Engagements',   ArchiveIcon,       'engagement'),
        pane(S, 'person',      'Team',         'Team / People', UserIcon,          'person'),
        pane(S, 'testimonial', 'Testimonials', 'Testimonials',  StarIcon,          'testimonial'),
      ]),

      S.divider(),

      // ── Brand & Media ────────────────────────────────────────────
      sectionItem(S, 'Brand & Media', ImagesIcon, [
        pane(S, 'asset',      'Media Library', 'Media Library', ImageIcon, 'asset'),
        pane(S, 'brandAsset', 'Brand Assets',  'Brand Assets',  TagIcon,   'brandAsset'),
      ]),

      S.divider(),

      // ── Global Settings ──────────────────────────────────────────
      sectionItem(S, 'Global Settings', CogIcon, [
        quickDoc(S, 'Site Settings', 'siteSettings', 'siteSettings', ControlsIcon),
        S.divider(),
        vocabList(S, 'Platforms',        'platform',        PlugIcon),
        vocabList(S, 'Tools / Tech',     'tech-stack',      OlistIcon),
        vocabList(S, 'Tags',             'tag',             TagIcon),
        vocabList(S, 'Asset types',      'asset-type',      PackageIcon),
        vocabList(S, 'Content types',    'content-type',    DocumentsIcon),
        vocabList(S, 'Departments',      'team-department', UsersIcon),
        vocabList(S, 'Countries',        'country',         EarthAmericasIcon),
        pane(S, 'sector',   'Sectors',         'Sector master',   PinIcon,  'sector'),
        pane(S, 'industry', 'Industry master', 'Industry master', PinIcon,  'industry'),
        pane(S, 'taxonomy', 'All taxonomy',    'All taxonomy',    BookIcon, 'taxonomy'),
        pane(S, 'platformProfile', 'Presence', 'Presence',        PlugIcon, 'platformProfile'),
        S.divider(),
        pane(S, 'navigationMenu', 'Navigation Menus', 'All Menus', MenuIcon, 'navigationMenu'),
        S.listItem()
          .title('Header Main Menu')
          .icon(MenuIcon)
          .child(
            S.documentList()
              .title('Header Main Menu')
              .filter('_type == "navigationMenu" && menuId == "header-main"')
          ),
        S.listItem()
          .title('Footer Links')
          .icon(LinkIcon)
          .child(
            S.documentList()
              .title('Footer Links')
              .filter('_type == "navigationMenu" && (menuId == "footer-services" || menuId == "footer-sitemap" || menuId == "footer-legal")')
          ),
        pane(S, 'redirect',   'Redirects',          'Redirects',      LinkIcon, 'redirect'),
        pane(S, 'siteScript', 'Tracking & Scripts', 'Scripts & Code', PlugIcon, 'siteScript'),
        S.documentTypeListItem('experiment').title('Experiments').icon(LaunchIcon),
      ]),

      S.divider(),

      // ── System (health / ops, for admins) ─────────────────────────
      sectionItem(S, 'System', BellIcon, [
        S.listItem()
          .title('Drafts Needing Review')
          .icon(EditIcon)
          .child(
            S.documentList()
              .title('Draft Documents')
              .filter('_id in path("drafts.**")')
              .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
          ),
        S.listItem()
          .title('Missing SEO Meta')
          .icon(WarningFilledIcon)
          .child(
            S.documentList()
              .title('Missing SEO Description')
              .filter('(_type in ["post", "caseStudy", "service", "singletonPage"]) && !defined(seoDescription)')
              .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
          ),
        S.listItem()
          .title('Missing Cover Images')
          .icon(ImageIcon)
          .child(
            S.documentList()
              .title('Missing Cover Media')
              .filter('(_type in ["post", "caseStudy"]) && !defined(coverImage) && !defined(coverPath)')
              .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
          ),
        S.listItem()
          .title('Scheduled Content')
          .icon(ClockIcon)
          .child(
            S.documentList()
              .title('Future Scheduled Posts')
              .filter('_type == "post" && dateTime(publishedAt) > dateTime(now())')
              .defaultOrdering([{ field: 'publishedAt', direction: 'asc' }])
          ),
        S.divider(),
        pane(S, 'syncStatus',        'Sync Status',         'Sync Status',         CalendarIcon, 'syncStatus'),
        pane(S, 'contactSubmission', 'Contact Submissions', 'Contact Submissions', EnvelopeIcon, 'contactSubmission'),
      ]),

    ]);

// ── Helpers ─────────────────────────────────────────────────────────────────

function sectionItem(S: StructureBuilder, title: string, icon: any, items: any[]) {
  return S.listItem().title(title).icon(icon).child(S.list().title(title).items(items));
}

function quickDoc(
  S: StructureBuilder,
  title: string,
  schemaType: string,
  documentId: string,
  icon: any,
  template?: { id: string; params: Record<string, string> }
) {
  let doc = S.document().schemaType(schemaType).documentId(documentId).title(title);
  // A fixed-id doc that does not exist yet is created from this template, so
  // its readOnly key (pageId / sectionId) is filled and it can be published.
  if (template) doc = doc.initialValueTemplate(template.id, template.params);
  return S.listItem().title(title).icon(icon).child(doc);
}

function pane(
  S: StructureBuilder,
  key: string,
  title: string,
  label: string,
  icon: any,
  schemaType: string
) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.component(DocumentListPane)
        .id(key)
        .title(label)
        .options({ schemaType, tableKey: key })
    );
}

function singletonPages(S: StructureBuilder) {
  const pages: [string, string, any][] = [
    ['Home',           'home',           HomeIcon],
    ['About',          'about',          InfoOutlineIcon],
    ['Services',       'services',       RocketIcon],
    ['Work',           'work',           CaseIcon],
    ['Blog',           'blog',           ComposeIcon],
    ['FAQ',            'faq',            CommentIcon],
    ['Contact',        'contact',        EnvelopeIcon],
    ['Privacy Policy', 'privacy-policy', LockIcon],
    ['Terms of Use',   'terms-of-use',   DocumentTextIcon],
    ['Refund Policy',  'refund-policy',  BillIcon],
    ['Cookie Policy',  'cookie-policy',  DocumentTextIcon],
    ['Impact',         'impact',         HeartIcon],
    ['Industries',     'industries',     EarthAmericasIcon],
    ['Subscription',   'subscription',   EnvelopeIcon],
    ['Reviews',        'reviews',        HeartIcon],
    ['Sitemap',        'sitemap',        SortIcon],
    ['Kits Showcase',  'kits',           ControlsIcon],
  ];
  return S.listItem()
    .title('Pages')
    .icon(DocumentsIcon)
    .child(
      S.list()
        .title('Pages')
        .items([
          pane(S, 'pages', 'All Pages', 'All Pages', DocumentsIcon, 'singletonPage'),
          S.divider(),
          ...pages.map(([label, pageId, icon]) =>
            quickDoc(S, label, 'singletonPage', pageId, icon, { id: 'singletonPage-by-id', params: { pageId } })
          ),
        ])
    );
}

/**
 * Section tier. Document ids are `section-<sectionId>`, NOT the bare sectionId.
 *
 * The bare form collides with singletonPage, which uses `_id === pageId`:
 * `industries` is both a pageId and a sectionId, so a pageSection created at
 * `_id: 'industries'` would land on top of the industries *page* document.
 * That is not theoretical — it happened on 2026-09-24 and overwrote that page's
 * title before it was caught and repaired. The prefix keeps both namespaces
 * open-by-fixed-id without either being able to clobber the other.
 */
function globalSections(S: StructureBuilder) {
  const sections: [string, string, any][] = [
    ['Industries strip', 'industries',     EarthAmericasIcon],
    ['Insights teaser',  'insights',       ComposeIcon],
    ['Final CTA',        'final-cta',      RocketIcon],
    ['Cookie consent',   'cookie-consent', LockIcon],
    ['Trust badges',     'trust-badges',   HeartIcon],
  ];
  return S.listItem()
    .title('Global Sections')
    .icon(ControlsIcon)
    .child(
      S.list()
        .title('Global Sections')
        .items([
          pane(S, 'globalSections', 'All Sections', 'All Sections', DocumentsIcon, 'pageSection'),
          S.divider(),
          ...sections.map(([label, sectionId, icon]) =>
            quickDoc(S, label, 'pageSection', `section-${sectionId}`, icon, { id: 'pageSection-by-id', params: { sectionId } })
          ),
        ])
    );
}

function vocabList(S: StructureBuilder, title: string, vocabulary: string, icon: any) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.documentList()
        .title(title)
        .filter('_type == "taxonomy" && vocabulary == $vocabulary')
        .params({ vocabulary })
        .defaultOrdering([{ field: 'order', direction: 'asc' }, { field: 'name', direction: 'asc' }])
    );
}
