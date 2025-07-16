// Add an item to the common Menu
import { pages } from '../pages';
import { MenuGroupTypes } from '#common';
export default defineNuxtPlugin((nuxtApp) => {
  const menu = useMenuStore();

  menu.addSidebar({
    id: 'apiKeys',
    group: MenuGroupTypes.Users,
    title: 'API Keys',
    link: pages.apiKeys,
    active: false,
    icon: 'Key',
    isPolling: false,
    sortOrder: 2,
  });
});
