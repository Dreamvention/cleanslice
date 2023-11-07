// https://nuxt.com/docs/api/configuration/nuxt-config
import type { Nitro } from 'nitropack';
import typescript from '@rollup/plugin-typescript';
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n', '@pinia/nuxt'],
  imports: {
    // Required for pinia
    dirs: ['../../stores', '../../slices/*/stores'],
  },
  hooks: {
    // Required for DI
    'nitro:build:before': (nitro: Nitro) => {
      nitro.options.moduleSideEffects.push('reflect-metadata');
    },
  },
  vite: {
    // Required for DI
    plugins: [typescript()],
  },
  build: {
    // Required for DI
    transpile: ['tslib'],
  },
  i18n: {
    // Required for i18n
    // read more https://i18n.nuxtjs.org/options/vue-i18n
    strategy: 'no_prefix',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
    },
  },
});
