import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'splvhmk1',
    dataset: 'production',
  },
  studioHost: 'wugweb',
  // TypeGen config lives in ./sanity-typegen.json, which `sanity typegen
  // generate` still reads on 6.x. Run both steps with `npm run typegen`.
})
