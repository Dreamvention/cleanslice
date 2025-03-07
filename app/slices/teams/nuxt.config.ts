// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const currentDir = dirname(fileURLToPath(import.meta.url));
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],
  alias: {
    '#teams': currentDir,
  },
  i18n: {
    langDir: './locales',
    locales: [{ code: 'en', file: 'en.json' }],
  },
});
