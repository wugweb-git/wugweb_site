import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';
import { deskStructure } from './schemaTypes/deskStructure';
import { TablesTool } from './tools/TablesTool';

export default defineConfig({
  name: 'wugweb',
  title: 'wugweb',
  projectId: 'splvhmk1',
  dataset: 'production',
  apiVersion: '2024-01-01',
  plugins: [structureTool({ structure: deskStructure }), visionTool()],
  tools: (prev) => [
    {
      name: 'tables',
      title: 'Tables',
      icon: () => '▦',
      component: TablesTool,
    },
    ...prev,
  ],
  schema: { types: schemaTypes },
});
