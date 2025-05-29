import { fileURLToPath } from 'url';
import { dirname } from 'path';

const currentDir = dirname(fileURLToPath(import.meta.url));
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  alias: {
    '#pinia': currentDir,
  },
  imports: {
    // Required for pinia
    dirs: ['../../../stores', '../../../slices/**/stores'],
  },
});
