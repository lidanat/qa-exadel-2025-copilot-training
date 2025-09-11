import type { Options } from '@wdio/types'

export const config: Options.Testrunner = {
  runner: 'local',
  specs: ['./test/specs/**/*.ts'],
  maxInstances: 1,
  capabilities: [
    {
      browserName: 'chrome',
    }
  ],
  logLevel: 'info',
  baseUrl: 'https://example.com',
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
  before: async () => {
    require('ts-node').register({ files: true })
  },
}
