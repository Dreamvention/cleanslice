// Add an item to the common Menu

import { MenuGroupTypes } from '#common';
export default defineNuxtPlugin((nuxtApp) => {
  const menu = useMenuStore();

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
