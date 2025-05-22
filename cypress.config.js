const { defineConfig } = require('cypress');
const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Aqui está a baseUrl
    setupNodeEvents(on, config) {
      // Configura o plugin de snapshot
      addMatchImageSnapshotPlugin(on, config);
      return config; // Importante: retorne o config modificado
    },
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results',
      overwrite: false,
      html: false,
      json: true,
    },
  }
});

