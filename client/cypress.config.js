import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "2zeh16",
  e2e: {
    baseUrl:"https://sdelivery-farma.onrender.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  viewportWidth: 1400,
  viewportHeight: 700,
});
