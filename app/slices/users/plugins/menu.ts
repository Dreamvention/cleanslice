// Add an item to the common Menu
import { pages } from '../pages';
export default defineNuxtPlugin((nuxtApp) => {
  const menu = useMenu();
  menu.addItem({
    id: 'users',
    title: 'Users',
    link: pages.users,
    active: false,
    icon: 'mdi-account',
  });
});
