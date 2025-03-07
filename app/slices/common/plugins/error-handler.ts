export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:error', (error) => {
    // Handle or log the error globally
    console.error('Global error caught:', error);
  });
});
