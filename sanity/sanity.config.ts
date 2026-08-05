import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';
import { deskStructure } from './schemaTypes/deskStructure';
import { TablesTool } from './tools/TablesTool';
import { DashboardTool } from './tools/DashboardTool';
import { SeoTool } from './tools/SeoTool';
import { MediaTool } from './tools/MediaTool';
import { SearchTool } from './tools/SearchTool';

export default defineConfig({
  name: 'wugweb',
  title: 'wugweb',
  projectId: 'splvhmk1',
  dataset: 'production',
  apiVersion: '2024-01-01',
  plugins: [structureTool({ structure: deskStructure }), visionTool()],
  tools: (prev) => [
    {
      name: 'dashboard',
      title: 'Dashboard',
      icon: () => '◈',
      component: DashboardTool,
    },
    {
      name: 'tables',
      title: 'Tables',
      icon: () => '▦',
      component: TablesTool,
    },
    {
      name: 'seo',
      title: 'SEO',
      icon: () => '🔎',
      component: SeoTool,
    },
    {
      name: 'media',
      title: 'Media',
      icon: () => '▦',
      component: MediaTool,
    },
    {
      name: 'search',
      title: 'Search',
      icon: () => '⌕',
      component: SearchTool,
    },
    ...prev,
  ],
  schema: { types: schemaTypes },
});
