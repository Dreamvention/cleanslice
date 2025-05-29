export default defineNuxtPlugin(async (nuxtApp) => {
  const webFontLoader = await import(/* webpackChunkName: "webfontloader" */ 'webfontloader');

  webFontLoader.load({
    google: {
      families: ['Manrope:100,300,400,500,700,900&display=swap'],
    },
  });
});
