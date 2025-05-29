// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const currentDir = dirname(fileURLToPath(import.meta.url));
export default defineNuxtConfig({
  alias: {
    '#api': currentDir,
  },
});
