// Add an item to the common Menu
import { pages } from '../pages';
import { MenuGroupTypes } from '#common';
export default defineNuxtPlugin((nuxtApp) => {
  const menu = useMenuStore();

  menu.addSidebar({
    id: 'roles',
    group: MenuGroupTypes.Users,
    title: 'Roles',
    link: pages.roles,
    active: false,
    icon: 'ShieldHalf',
    isPolling: false,
    sortOrder: 2,
  });
});
