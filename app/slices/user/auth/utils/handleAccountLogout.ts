import Cookies from 'js-cookie';
import { authCookieName } from '../stores/auth';

export const handleAccountLogout = async () => {
  console.log('Logging out...');
  await Cookies.remove(authCookieName);
  handleApiAuthentication();
  // commented out because it keeps forwarding to login.

  const app = useNuxtApp();
  if (!app.$router.currentRoute.value.meta.public) {
    app.$router.push({ name: pages.login });
  }
};
