import { Nitro } from 'nitropack';
import typescript from '@rollup/plugin-typescript';
import { registerSlices } from '../slices/core/nuxt';
// https://nuxt.com/docs/api/configuration/nuxt-config

console.log(registerSlices())
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@invictus.codes/nuxt-vuetify', '@pinia/nuxt'],
  extends: [...registerSlices()],
  hooks: {
    'nitro:build:before': (nitro: Nitro) => {
      nitro.options.moduleSideEffects.push('reflect-metadata');
    },
  },
  vite: {
    plugins: [typescript()],
  },
});
