// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  //https://i18n.nuxtjs.org/guide/layers#merging-locales
  modules: ['@nuxtjs/i18n'],
  i18n: {
    langDir: './locales',
    locales: [
      { code: 'en', file: 'en.json' },
      { code: 'fr', file: 'fr.json' },
    ],
  },
});
