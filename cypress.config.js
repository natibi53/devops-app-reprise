import { defineConfig } from "cypress";
import plugin from  "cypress-localstorage-commands/plugin.js";

export default defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:5173',
    setupNodeEvents(on, config) {
      plugin(on, config);
      return config;
    },
  },
});
