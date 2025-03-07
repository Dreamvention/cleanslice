import { pages } from '../pages';

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();
  await authStore.init();

  const teamsStore = useTeamsStore();
  await teamsStore.init();

  addRouteMiddleware(
    'auth',
    async (to) => {
      const isPublic = to.meta.public || false;
      const onlyNotAuthenticated = to.meta.onlyNotAuthenticated || false;
      const paths = ['/dashboard', '/agents', '/knowledges', '/sources', '/chats', '/apps', '/playground'];
      const isDashboard = paths.some((path) => to.path.startsWith(path));
      console.log('teamsStore.hasTeam', teamsStore.hasTeam);
      if (isDashboard && authStore.isAuthenticated && !teamsStore.hasTeam) {
        console.log('no teamsStore.hasTeam');
        return navigateTo({ name: pages.teamsCreate });
      } else if (onlyNotAuthenticated && authStore.isAuthenticated) {
        console.log('Only Not Authenticated Allowed. Forwarding to page ', pages.agents);
        if (teamsStore.hasTeam) {
          // return navigateTo({ name: pages.agents });
        } else {
          return navigateTo({ name: pages.teamsCreate });
        }

        // REFACTOR
        // return navigateTo({ name: pages.agents });
      } else if (!isPublic && !authStore.isAuthenticated) {
        console.log('Unauthorized. Forwarding to page ', pages.login);
        return navigateTo({ name: pages.login });
        // return navigateTo({ name: pages.login });
      }
    },
    { global: true },
  );
});
