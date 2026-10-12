import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'splvhmk1',
    dataset: 'production',
  },
  studioHost: 'wugweb',
  // TypeGen config lives in ./sanity-typegen.json. On Sanity 3.x,
  // `sanity typegen generate` reads ONLY that file (or --config-path); a
  // `typegen` key here is v4+ syntax that 3.99 silently ignores and that its
  // CliConfig type rejects (TS2353). Move it back here after a v4 upgrade.
})
