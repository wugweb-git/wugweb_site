import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import {
  DashboardIcon,
  ThListIcon,
  SearchIcon,
  ImagesIcon,
  MasterDetailIcon,
} from '@sanity/icons';
import { schemaTypes } from './schemaTypes';
import { deskStructure } from './schemaTypes/deskStructure';
import { TablesTool } from './tools/TablesTool';
import { DashboardTool } from './tools/DashboardTool';
import { SeoTool } from './tools/SeoTool';
import { MediaTool } from './tools/MediaTool';
import { SearchTool } from './tools/SearchTool';

import { SeoHealthBadge, ReadingTimeBadge, MediaStatusBadge } from './badges/documentBadges';

export default defineConfig({
  name: 'wugweb',
  title: 'wugweb',
  projectId: 'splvhmk1',
  dataset: 'production',
  apiVersion: '2026-01-01',
  plugins: [structureTool({ structure: deskStructure }), visionTool()],
  document: {
    badges: (prev, context) => [
      SeoHealthBadge,
      ReadingTimeBadge,
      MediaStatusBadge,
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
      name: 'search',
      title: 'Search',
      icon: MasterDetailIcon,
      component: SearchTool,
    },
    ...prev,
  ],
  schema: { types: schemaTypes },
});
