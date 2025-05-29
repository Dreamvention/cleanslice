// Add an item to the common Menu
import { MenuGroupTypes } from '#common';
export default defineNuxtPlugin(async () => {
  const menu = useMenuStore();
  const teamsStore = useTeamStore();
  await teamsStore.init();
  if (!teamsStore.isLoading) {
    // if (teamsStore.hasTeam) {
    //   menu.addItem({
    //     id: 'team',
    //     group: MenuGroupTypes.Project,
    //     title: teamsStore.getTeam.name,
    //     link: 'teams-teamId-agents',
    //     active: false,
    //     icon: 'Bot',
    //     isPolling: false,
    //     sortOrder: 1,
    //   });
    // } else {
    //   menu.addItem({
    //     id: 'team',
    //     group: MenuGroupTypes.Project,
    //     title: 'Teams',
    //     link: 'teams',
    //     active: false,
    //     icon: 'Bot',
    //     isPolling: false,
    //     sortOrder: 1,
    //   });
    // }
  }
});
