// Add an item to the common Menu
import { pages } from '../pages';
import { MenuGroupTypes } from '#common';
export default defineNuxtPlugin((nuxtApp) => {
  const menu = useMenuStore();

  menu.addSidebar({
    id: 'teams',
    group: MenuGroupTypes.Users,
    title: 'Teams',
    link: pages.teams,
    active: false,
    icon: 'Users',
    isPolling: false,
    sortOrder: 2,
  });
});
