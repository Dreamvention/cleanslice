/// <reference types="vitest" />

// import Vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'url';
import { defineVitestConfig } from 'nuxt-vitest/config';

export default defineVitestConfig({
  // plugins: [Vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    deps: {
      inline: ['vuetify'],
    },
    include: ['./slices/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: ['./slices/test/vitestSetup.ts'],
  },
});
