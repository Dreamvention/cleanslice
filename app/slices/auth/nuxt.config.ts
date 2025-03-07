// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  //https://i18n.nuxtjs.org/guide/layers#merging-locales
  modules: ['@nuxtjs/i18n'],
  alias: {
    '#account': currentDir,
  },
  i18n: {
    langDir: './locales',
    locales: [
      { code: 'en', file: 'en.json' },
      { code: 'fr', file: 'fr.json' },
    ],
  },
});
