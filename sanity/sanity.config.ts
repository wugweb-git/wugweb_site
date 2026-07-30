import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { dashboardTool } from '@sanity/dashboard';
import { schemaTypes } from './schemaTypes';
import { deskStructure } from './schemaTypes/deskStructure';

export default defineConfig({
  name: 'wugweb',
  title: 'wugweb',
  projectId: 'splvhmk1',
  dataset: 'production',
  apiVersion: '2024-01-01',
  plugins: [
    structureTool({ structure: deskStructure }),
    visionTool(),
    dashboardTool({
      widgets: [
        {
          name: 'content-stats',
          component: () => {
            // Dynamic import to avoid SSR issues
            if (typeof window !== 'undefined') {
              const { ContentStatsWidget } = require('./structure/dashboardWidget');
              return ContentStatsWidget;
            }
            return null;
          },
          options: { title: 'Content Overview' },
        },
      ],
    }),
  ],
  schema: { types: schemaTypes },
});
