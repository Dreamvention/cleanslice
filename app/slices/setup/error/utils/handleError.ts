import { useToast } from '#theme/components/ui/toast/use-toast';

// Track refresh attempts to prevent loops
let refreshAttempts = 0;
const MAX_REFRESH_ATTEMPTS = 2;

export const handleError = async (error: any) => {
  console.log('🔴 Error:', error);
  const { toast } = useToast();
  const account = useAuthStore();
  const app = useNuxtApp();

  if (!error?.response) {
    //Show popup error window.
    throw createError({ statusCode: 404, message: 'Data not found' });
  }

  if (error.response.status === 401) {
    // Reset refresh attempts if we're not in a refresh loop
    if (refreshAttempts === 0) {
      refreshAttempts = 1;
    } else if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
      // Too many refresh attempts, force logout
      refreshAttempts = 0;
      account.logout();
      navigateTo(pages.logout);
      return;
    } else {
      refreshAttempts++;
    }

    const refreshSuccess = await account.refreshToken();
    if (!refreshSuccess) {
      refreshAttempts = 0;
      navigateTo(pages.logout);
      return;
    }

    // Reset refresh attempts on successful refresh
    refreshAttempts = 0;
    return;
  }

  if (error.response.data.code) {
    try {
      const code = error.response.data.code;
      const apiMessage = error.response.data.message;

      // Try to use the actual API error message if available
      let title = app.$i18n.t(`${code}_title`);
      let description = apiMessage || app.$i18n.t(`${code}_description`, {
        supportLink: `<strong><a href="mailto:support@cleanslice.com">support@cleanslice.com</a></strong>`,
      });

      // If translation doesn't exist, use fallbacks
      if (title === `${code}_title`) {
        title = 'Error';
      }
      if (description === `${code}_description` && apiMessage) {
        description = apiMessage;
      }

      toast({
        title,
        description,
        variant: 'destructive',
      });
    } catch (e) {
      console.error('Error showing toast:', e);
    }
  }
};
