import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';
import { deskStructure } from './schemaTypes/deskStructure';

export default defineConfig({
  name: 'wugweb',
  title: 'wugweb',
  projectId: 'splvhmk1',
  dataset: 'production',
  plugins: [structureTool({ structure: deskStructure })],
  schema: { types: schemaTypes },
});
