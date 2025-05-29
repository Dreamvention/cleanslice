// https://nuxt.com/docs/api/configuration/nuxt-config
// import tailwindOptions from '../../configs/tailwind.config';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import svgLoader from 'vite-svg-loader';

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
  css: ['#theme/assets/scss/main.scss'],
  alias: {
    '#theme': currentDir,
  },
  tailwindcss: {
    cssPath: '#theme/assets/css/tailwind.css',
    configPath: './tailwind.config',
  },
  vite: {
    plugins: [svgLoader()],
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './slices/setup/theme/components/ui',
  },
});
