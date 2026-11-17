import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { table } from '@sanity/table';
import { DashboardIcon } from '@sanity/icons/Dashboard';
import { ThListIcon } from '@sanity/icons/ThList';
import { ImagesIcon } from '@sanity/icons/Images';
import { MasterDetailIcon } from '@sanity/icons/MasterDetail';
import { ShareIcon } from '@sanity/icons/Share';
import { schemaTypes } from './schemaTypes';
import { deskStructure } from './schemaTypes/deskStructure';
import { TablesTool } from './tools/TablesTool';
import { DashboardTool } from './tools/DashboardTool';
import { MediaTool } from './tools/MediaTool';
import { SearchTool } from './tools/SearchTool';
import { GraphTool } from './tools/GraphTool';

import { SeoHealthBadge, ReadingTimeBadge, MediaStatusBadge } from './badges/documentBadges';
import { CopyArticleAction } from './actions/CopyArticleAction';
import { PreviewDocumentAction } from './actions/PreviewDocumentAction';
import { r2AssetSource } from './plugins/r2AssetSource';
import { StudioLogo } from './components/StudioLogo';
import { StudioNavbar } from './components/StudioNavbar';

/**
 * One document per key (siteSettings, a page per pageId, a section per
 * sectionId; sync and form records are written by code). They are opened from
 * fixed desk entries, so they are kept out of the global Create menu and lose
 * Duplicate / Delete / Unpublish. The same set drives the table actions.
 */
const LOCKED_TYPES = new Set(['siteSettings', 'singletonPage', 'pageSection', 'syncStatus', 'contactSubmission']);
const LOCKED_ACTIONS = new Set(['duplicate', 'delete', 'unpublish']);

export default defineConfig({
  name: 'wugweb',
  title: 'wugweb Studio',
  projectId: 'splvhmk1',
  dataset: 'production',
  apiVersion: '2026-01-01',
  studio: {
    components: {
      logo: StudioLogo,
      navbar: StudioNavbar,
    },
  },
  form: {
    components: {
      portableText: {
        // Studio v5+ turns on smart typography by default: it rewrites `--` and
        // `---` into en/em dashes and straight quotes into curly ones, inside
        // stored content. Site copy bans dashes, so it stays off.
        plugins: (props) =>
          props.renderDefault({ ...props, plugins: { ...props.plugins, typography: { enabled: false } } }),
      },
    },
    image: {
      assetSources: (prev) => [r2AssetSource, ...prev],
    },
    file: {
      assetSources: (prev) => [r2AssetSource, ...prev],
    },
  },
  plugins: [
    structureTool({ structure: deskStructure }),
    visionTool(),
    table(),
  ],
  document: {
    badges: (prev, context) => [
      SeoHealthBadge,
      ReadingTimeBadge,
      MediaStatusBadge,
      ...prev,
    ],
    actions: (prev, context) => [
      PreviewDocumentAction,
      CopyArticleAction,
      ...(LOCKED_TYPES.has(context.schemaType)
        ? prev.filter((a) => !LOCKED_ACTIONS.has((a as any).action))
        : prev),
    ],
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === 'global'
        ? prev.filter((t) => !LOCKED_TYPES.has(t.templateId))
        : prev,
  },
  // The SEO and Copy & Export tools were folded into Tables on 2026-10-13
  // (SEO description / Completeness / Checks passed columns, Auto Meta, Copy
  // as Markdown, Download .md).
  tools: (prev) => [
    {
      name: 'dashboard',
      title: 'Dashboard',
      icon: DashboardIcon,
      component: DashboardTool,
    },
    {
      name: 'tables',
      title: 'Tables',
      icon: ThListIcon,
      component: TablesTool,
    },
    {
      name: 'media',
      title: 'Media',
      icon: ImagesIcon,
      component: MediaTool,
    },
    {
      name: 'graph',
      title: 'Graph View',
      icon: ShareIcon,
      component: GraphTool,
    },
    {
      name: 'search',
      title: 'Search',
      icon: MasterDetailIcon,
      component: SearchTool,
    },
    ...prev,
  ],
  schema: {
    types: schemaTypes,
    // Fixed-id desk entries (Pages, Global Sections) open these templates, so
    // a page or section that does not exist yet starts with its key filled in.
    // pageId / sectionId are readOnly, so without this a new one could never
    // be published.
    templates: (prev) => [
      ...prev,
      {
        id: 'singletonPage-by-id',
        title: 'Page',
        schemaType: 'singletonPage',
        parameters: [{ name: 'pageId', type: 'string' }],
        value: ({ pageId }: { pageId: string }) => ({ pageId }),
      },
      {
        id: 'pageSection-by-id',
        title: 'Global Section',
        schemaType: 'pageSection',
        parameters: [{ name: 'sectionId', type: 'string' }],
        value: ({ sectionId }: { sectionId: string }) => ({ sectionId }),
      },
    ],
  },
});
