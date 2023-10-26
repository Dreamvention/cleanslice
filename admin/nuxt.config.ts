// https://nuxt.com/docs/api/configuration/nuxt-config
import { registerSlices } from "./registerSlices";
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: [...registerSlices()],
});
