const { defineConfig } = require("cypress");
const { readPdf } = require("./cypress/scripts/readPdf");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        readPdf,
      });
    },
    baseUrl: "http://localhost:3000",
    supportFile: false,
  },
});
