// Add an item to the common Menu
import { MenuGroupTypes } from '#common';
export default defineNuxtPlugin(async () => {
  const menu = useMenuStore();
  menu.addSidebar({
    id: 'team',
    group: MenuGroupTypes.Project,
    title: 'Chat',
    link: 'teams-teamId-chats',
    active: false,
    icon: 'MessageCircle',
    isPolling: false,
    sortOrder: 3,
  });
});
