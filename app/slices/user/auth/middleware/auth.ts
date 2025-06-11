import { pages } from '#common/utils/pages';
import type { RouteLocationNormalized } from 'vue-router';

type AuthMiddlewareMeta =
  | boolean
  | {
      /**
       * Whether to allow only unauthenticated users to access this page.
       * Authenticated users will be redirected to the specified redirect path
       */
      onlyNotAuthenticated: boolean;
      /**
       * Where to redirect authenticated users if onlyNotAuthenticated is true
       */
      redirect?: string;
      /**
       * Whether the page is public (accessible without authentication)
       * @default false - all pages are protected by default
       */
      public?: boolean;
    };

declare module '#app' {
  interface PageMeta {
    auth?: AuthMiddlewareMeta;
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    auth?: AuthMiddlewareMeta;
  }
}

function normalizeAuthOptions(
  options: AuthMiddlewareMeta | undefined,
): { onlyNotAuthenticated: boolean; redirect: string; public: boolean } | undefined {
  if (typeof options === 'boolean' || options === undefined) {
    return options !== false
      ? {
          onlyNotAuthenticated: false,
          redirect: pages.goToAfterLogin,
          public: false,
        }
      : undefined;
  }

  if (typeof options === 'object') {
    return {
      onlyNotAuthenticated: options.onlyNotAuthenticated ?? false,
      redirect: options.redirect ?? pages.goToAfterLogin,
      public: options.public ?? false,
    };
  }
}

// Export the middleware function to be used with global registration
export const authMiddleware = async (to: RouteLocationNormalized) => {
  const authStore = useAuthStore();
  await authStore.init();

  console.log('🔒 Auth Middleware - Meta:', to.meta);
  // Normalize options
  const options = normalizeAuthOptions(to.meta.auth);
  console.log('🔒 Auth Middleware - Normalized Options:', options);

  if (!options) {
    return;
  }

  const isAuthenticated = authStore.isAuthenticated;

  // Check public access first
  if (options.public) {
    return;
  }

  // Handle guest-only pages (onlyNotAuthenticated)
  if (options.onlyNotAuthenticated) {
    if (!isAuthenticated) {
      return;
    }
    return navigateTo({ name: options.redirect });
  }

  // Handle protected pages
  console.log('🔒 Auth Middleware - Route:', to.path, options.public);
  if (!isAuthenticated && to.name !== pages.goToNotAuthanticated && !options.public) {
    return navigateTo({ name: pages.goToNotAuthanticated });
  }

  return;
};

// Export the middleware for direct use in page meta
export default defineNuxtRouteMiddleware(authMiddleware);
