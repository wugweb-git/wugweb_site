import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';
import { deskStructure } from './schemaTypes/deskStructure';

export default defineConfig({
  name: 'wugweb',
  title: 'wugweb',
  projectId: 'splvhmk1',
  dataset: 'production',
  apiVersion: '2024-01-01',
  plugins: [structureTool({ structure: deskStructure }), visionTool()],
  schema: { types: schemaTypes },
});
