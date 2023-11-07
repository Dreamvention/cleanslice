// https://nuxt.com/docs/api/configuration/nuxt-config
import { registerSlices } from './registerSlices';

// import loadLanguages from './loadLanguages';

export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: [...registerSlices()],
});
