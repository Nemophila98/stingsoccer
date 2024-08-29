import { defineConfig } from 'cypress';

export default defineConfig({
  includeShadowDom: true,
  e2e: {
    baseUrl: 'https://stingsoccer.dev.thesportcheck.com',
    viewportWidth: 1080,
    viewportHeight: 768,
    defaultCommandTimeout: 15e3,
    requestTimeout: 30e3,
    fileServerFolder: '/cypress/servers',
    experimentalStudio: true,
    env: {
      api_url: 'https://thesportcheck-dev-api.azurewebsites.net',
    },
    experimentalOriginDependencies: true,
    hideXHRInCommandLog: true,
  },
});
