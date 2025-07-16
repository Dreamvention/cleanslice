import { useAuthStore } from '../stores/auth';
import { pages } from '../pages';
import { navigateTo } from '#app';

/**
 * Handles the user logout process by:
 * 1. Calling the auth store logout method
 * 2. Navigating to the login page
 * @returns Promise<void>
 */
export const handleAuthLogout = async (): Promise<void> => {
  const authStore = useAuthStore();

  // Call the store's logout method which handles:
  // - Clearing auth state
  // - Clearing auth cookie
  // - Resetting API authentication
  authStore.logout();

  // Navigate to login page
  await navigateTo({ name: pages.login });
};
