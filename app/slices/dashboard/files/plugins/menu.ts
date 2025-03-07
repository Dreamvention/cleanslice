// Add an item to the common Menu
import { pages } from '../pages';
import { MenuGroupTypes } from '#common';
export default defineNuxtPlugin(() => {
  const menu = useMenuStore();
  menu.addSidebar({
    id: 'files',
    group: MenuGroupTypes.Resources,
    title: 'Files',
    link: pages.files,
    active: false,
    icon: 'File',
    isPolling: false,
    sortOrder: 1,
  });
});
