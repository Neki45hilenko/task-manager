import vuetify from "vite-plugin-vuetify";

export default defineNuxtConfig({
  compatibilityDate: "2025-10-26",

  css: ["vuetify/styles", "@mdi/font/css/materialdesignicons.css"],

  build: {
    transpile: ["vuetify"],
  },

  vite: {
    ssr: { noExternal: ["vuetify"] },
    plugins: [vuetify({ autoImport: true })],
  },
});
