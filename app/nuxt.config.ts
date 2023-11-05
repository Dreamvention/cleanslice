// https://nuxt.com/docs/api/configuration/nuxt-config
import { registerSlices } from './registerSlices';
import type { Nitro } from 'nitropack';
import typescript from '@rollup/plugin-typescript';
import vuetifyOptions from './assets/scss/vuetify.config';
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: [...registerSlices()],
  css: ['~/assets/scss/main.scss'],
  modules: ['@invictus.codes/nuxt-vuetify', '@pinia/nuxt', '@nuxtjs/i18n'],
  vuetify: {
    vuetifyOptions,
    moduleOptions: {
      /* vite-plugin-vuetify options */
      // treeshaking: true,
      autoImport: true,
      // Read more https://www.npmjs.com/package/webpack-plugin-vuetify
      styles: { configFile: '~/assets/scss/vuetify.scss' },
    },
  },
  imports: {
    dirs: ['stores', 'slices/*/stores'],
  },
  hooks: {
    'nitro:build:before': (nitro: Nitro) => {
      nitro.options.moduleSideEffects.push('reflect-metadata');
    },
  },
  vite: {
    plugins: [typescript()],
  },
  i18n: {
    /* module options */
  },
  build: {
    // Required for DI
    transpile: ['tslib'],
  },
  watch: ['~/assets/scss/vuetify.config'],
});
