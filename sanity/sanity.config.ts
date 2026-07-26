import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'wugweb',
  title: 'wugweb',
  projectId: 'splvhmk1', // existing project, confirmed via Sanity MCP
  dataset: 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
