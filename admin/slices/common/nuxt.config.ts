// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n', '@nuxt/content'],
  alias: {
    '#common': currentDir,
  },
  i18n: {
    langDir: '../locales',
    locales: [{ code: 'en', file: 'en.json' }],
  },
  content: {
    sources: {
      common: {
        driver: 'fs',
        prefix: '/', // All contents inside this source will be prefixed with `/docs`
        base: currentDir + '/content',
      },
    },
  },
});
