// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetifyOptions from './assets/scss/vuetify.config';
export default defineNuxtConfig({
  modules: ['@invictus.codes/nuxt-vuetify'],
  css: ['@/slices/theme/assets/scss/main.scss'],
  vuetify: {
    vuetifyOptions,
    moduleOptions: {
      /* vite-plugin-vuetify options */
      // treeshaking: true,
      autoImport: true,
      // Read more https://www.npmjs.com/package/webpack-plugin-vuetify
      // styles: { configFile: '~/slices/theme/assets/scss/vuetify.scss' },
    },
  },
});
