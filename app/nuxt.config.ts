// https://nuxt.com/docs/api/configuration/nuxt-config
import { registerSlices } from './registerSlices';

// import loadLanguages from './loadLanguages';

export default defineNuxtConfig({
  devtools: { enabled: false },
  extends: [...registerSlices()],

  vite: {
    define: {
      'process.env': process.env,
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
  },

  modules: ['@nuxt/image'],
  compatibilityDate: '2024-10-04',
});
