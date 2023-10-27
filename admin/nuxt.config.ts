// https://nuxt.com/docs/api/configuration/nuxt-config
import { registerSlices } from "./registerSlices";
import type { Nitro } from "nitropack";
import typescript from "@rollup/plugin-typescript";
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: [...registerSlices()],
  modules: ["@invictus.codes/nuxt-vuetify", "@pinia/nuxt", "@nuxtjs/i18n"],
  css: ["~/assets/scss/main.scss"],
  hooks: {
    "nitro:build:before": (nitro: Nitro) => {
      nitro.options.moduleSideEffects.push("reflect-metadata");
    },
  },
  vuetify: {
    moduleOptions: {
      /* vite-plugin-vuetify options */
      autoImport: true,
      // styles: { configFile: "~/assets/scss/vuetify.scss" },
    },
  },
  vite: {
    plugins: [typescript()],
  },
  imports: {
    dirs: ["stores", "slices/*/stores"],
  },
});
