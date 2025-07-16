import type { RouteLocationNormalized } from 'vue-router';

type TeamMiddlewareMeta =
  | boolean
  | {
      /**
       * Whether to skip team initialization for this route
       * @default false - team will be initialized by default
       */
      skipTeamInit?: boolean;
    };

declare module '#app' {
  interface PageMeta {
    team?: TeamMiddlewareMeta;
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    team?: TeamMiddlewareMeta;
  }
}

function normalizeTeamOptions(options: TeamMiddlewareMeta | undefined): { skipTeamInit: boolean } | undefined {
  if (typeof options === 'boolean' || options === undefined) {
    return options !== false
      ? {
          skipTeamInit: false,
        }
      : undefined;
  }

  if (typeof options === 'object') {
    return {
      skipTeamInit: options.skipTeamInit ?? false,
    };
  }
}

// Export the middleware function to be used with global registration
export const teamMiddleware = async (to: RouteLocationNormalized) => {
  const authStore = useAuthStore();
  const teamStore = useTeamStore();

  // If user is not authenticated, skip team initialization
  if (!authStore.isAuthenticated) {
    console.log('👥 Team Middleware - Skipping team init: User not authenticated');
    return;
  }

  // Normalize options
  const options = normalizeTeamOptions(to.meta.team);
  console.log('👥 Team Middleware - Normalized Options:', options);

  if (!options) {
    return;
  }

  // Skip initialization if explicitly set
  if (options.skipTeamInit) {
    return;
  }

  // Initialize team store
  await teamStore.init();

  return;
};

// Export the middleware for direct use in page meta
export default defineNuxtRouteMiddleware(teamMiddleware);
