import { pages } from '../pages';
import { ApiRepository } from '@/data/repositories';

export default defineNuxtPlugin((nuxtApp) => {
  const auth = useAuthStore();
  auth.init();
  addRouteMiddleware(
    'auth',
    async (to) => {
      if (!auth.isPageIgnored(to.name as string)) {
        if (auth.isAuthenticated && auth.isPageForUnauthorized(to.name as string)) {
          console.log('Authorized. Forwarding to page ', pages.home);
          await navigateTo(pages.home, { external: true });
        }
        if (!auth.isAuthenticated && !auth.isPageForUnauthorized(to.name as string)) {
          console.log('Unauthorized. Forwarding to page ', pages.login);
          await navigateTo(pages.login, { external: true });
        }
      }
    },
    { global: true },
  );
});
