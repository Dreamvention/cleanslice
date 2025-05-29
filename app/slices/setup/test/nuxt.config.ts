import { fileURLToPath } from 'url';
import { dirname } from 'path';

const currentDir = dirname(fileURLToPath(import.meta.url));
export default defineNuxtConfig({
  modules: ['@nuxt/test-utils/module'],
  alias: {
    '#test': currentDir,
  },
});
