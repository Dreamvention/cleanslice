// Add an item to the common Menu

import { MenuGroupTypes } from '#common';
export default defineNuxtPlugin((nuxtApp) => {
  const menu = useMenuStore();
  menu.addSidebar({
    id: 'account',
    group: MenuGroupTypes.Account,
    title: 'Account',
    link: pages.account,
    active: false,
    icon: 'User',
    isPolling: false,
    sortOrder: 1,
  });
});
