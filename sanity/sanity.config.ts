import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'wugweb',
  title: 'wugweb',
  projectId: 'REPLACE_ME', // from sanity.io/manage
  dataset: 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
