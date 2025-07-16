// Add an item to the common Menu
import { pages } from '../pages';
import { MenuGroupTypes } from '#common';
export default defineNuxtPlugin((nuxtApp) => {
  const menu = useMenuStore();

  menu.addSidebar({
    id: 'users',
    group: MenuGroupTypes.Users,
    title: 'Users',
    link: pages.users,
    active: false,
    icon: 'User',
    isPolling: false,
    sortOrder: 2,
  });
});
