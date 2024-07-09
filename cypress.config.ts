import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    specPattern: "src/**/*.cy.spec.ts",
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});
