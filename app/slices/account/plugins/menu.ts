// Add an item to the common Menu
import { pages } from '../pages';
export default defineNuxtPlugin((nuxtApp) => {
  const menu = useMenu();
  menu.addItem({
    id: 'logout',
    title: 'Logout',
    link: pages.logout,
    active: false,
    icon: 'mdi-logout',
  });
});
