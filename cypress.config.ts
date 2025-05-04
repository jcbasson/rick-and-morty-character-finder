import { defineConfig } from "cypress";

module.exports = defineConfig({
  e2e: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {
      // setup code here
    },
    baseUrl: "http://localhost:3000",
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },

  viewportWidth: 1000,
  viewportHeight: 860,
});
