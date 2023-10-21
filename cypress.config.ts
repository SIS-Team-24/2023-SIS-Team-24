import { defineConfig } from "cypress";
import { readPdf } from "./cypress/scripts/readPdf";

export default defineConfig({
  e2e: {
    setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ) {
      on("task", {
        readPdf,
      });
    },
    baseUrl: "http://localhost:3000",
    supportFile: false,
  },
});
