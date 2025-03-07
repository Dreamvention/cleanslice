// Add an item to the common Menu
import { pages } from '../pages';
import { MenuGroupTypes } from '#common';
export default defineNuxtPlugin((nuxtApp) => {
  const menu = useMenuStore();
  menu.addSidebar({
    id: 'profile',
    group: MenuGroupTypes.Account,
    title: 'Profile',
    link: pages.profile,
    active: false,
    icon: 'User',
    isPolling: false,
    sortOrder: 1,
  });

  menu.addSidebar({
    id: 'apiKeys',
    group: MenuGroupTypes.Account,
    title: 'Api Keys',
    link: pages.apiKeys,
    active: false,
    icon: 'LockOpen',
    isPolling: false,
    sortOrder: 2,
  });
});
