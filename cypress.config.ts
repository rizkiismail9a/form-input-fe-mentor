import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    specPattern: "src/**/*.cy.spec.ts",
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },

  e2e: {
    baseUrl: "http://localhost:9000",
    specPattern: "cypress/e2e/**/*.cy.spec.ts",
    supportFile: "cypress/support/e2e.ts",
  },
});
