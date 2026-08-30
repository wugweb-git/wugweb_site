import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { codeInput } from '@sanity/code-input';
import { table } from '@sanity/table';
import {
  DashboardIcon,
  ThListIcon,
  SearchIcon,
  ImagesIcon,
  MasterDetailIcon,
  CopyIcon,
  ShareIcon,
} from '@sanity/icons';
import { schemaTypes } from './schemaTypes';
import { deskStructure } from './schemaTypes/deskStructure';
import { TablesTool } from './tools/TablesTool';
import { DashboardTool } from './tools/DashboardTool';
import { SeoTool } from './tools/SeoTool';
import { MediaTool } from './tools/MediaTool';
import { SearchTool } from './tools/SearchTool';
import { ArticleExportTool } from './tools/ArticleExportTool';
import { GraphTool } from './tools/GraphTool';

import { SeoHealthBadge, ReadingTimeBadge, MediaStatusBadge } from './badges/documentBadges';
import { CopyArticleAction } from './actions/CopyArticleAction';
import { PreviewDocumentAction } from './actions/PreviewDocumentAction';
import { r2AssetSource } from './plugins/r2AssetSource';
import { StudioLogo } from './components/StudioLogo';
import { StudioNavbar } from './components/StudioNavbar';

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
    codeInput(),
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
      ...prev,
    ],
  },
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
      name: 'seo',
      title: 'SEO',
      icon: SearchIcon,
      component: SeoTool,
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
      name: 'export',
      title: 'Copy & Export',
      icon: CopyIcon,
      component: ArticleExportTool,
    },
    {
      name: 'search',
      title: 'Search',
      icon: MasterDetailIcon,
      component: SearchTool,
    },
    ...prev,
  ],
  schema: { types: schemaTypes },
});
