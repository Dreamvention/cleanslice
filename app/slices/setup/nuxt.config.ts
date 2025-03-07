import { fileURLToPath } from 'url';
import { dirname } from 'path';

const currentDir = dirname(fileURLToPath(import.meta.url));
// https://nuxt.com/docs/api/configuration/nuxt-config
import type { Nitro } from 'nitropack';
export default defineNuxtConfig({
  ssr: false,
  modules: ['@nuxtjs/i18n', '@pinia/nuxt'],
  alias: {
    '#setup': currentDir,
  },
  imports: {
    // Required for pinia
    dirs: ['../../stores', '../../slices/**/stores'],
  },
  hooks: {
    // Required for DI
    'nitro:build:before': (nitro: Nitro) => {
      nitro.options.moduleSideEffects.push('reflect-metadata');
    },
  },
  vite: {
    esbuild: {
      tsconfigRaw: {
        compilerOptions: {
          experimentalDecorators: true,
        },
      },
    },
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
