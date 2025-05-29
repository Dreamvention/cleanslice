import { fileURLToPath } from 'url';
import { dirname } from 'path';

const currentDir = dirname(fileURLToPath(import.meta.url));
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],
  alias: {
    '#i18n': currentDir,
  },
  i18n: {
    // Required for i18n
    vueI18n: 'i18n.config.ts',
    // read more https://i18n.nuxtjs.org/options/vue-i18n
    strategy: 'no_prefix',
    defaultLocale: 'en',
    compilation: {
      strictMessage: false,
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
    },
  },
});
