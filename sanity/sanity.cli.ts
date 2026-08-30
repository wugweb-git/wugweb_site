import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'splvhmk1',
    dataset: 'production',
  },
  studioHost: 'wugweb',
  typegen: {
    enabled: true,
    path: '../src/**/*.{ts,tsx,js,jsx,astro}',
    schema: './schema.json',
    generates: '../sanity.types.ts',
    overloadClientMethods: true,
  },
})
