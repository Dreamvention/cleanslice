import { useToast } from '#theme/components/ui/toast/use-toast';

export const handleError = async (error: any) => {
  const { toast } = useToast();
  const account = useAuthStore();
  const app = useNuxtApp();

  if (!error?.response) {
    //Show popup error window.
    throw createError({ statusCode: 404, message: 'Data not found' });
  }

  if (error.response.status === 401) {
    await account.refreshToken();
    if (!account.isAuthenticated) {
      handleAccountLogout();
    }
  }

  if (error.response.data.code) {
    try {
      const code = error.response.data.code;

      toast({
        title: app.$i18n.t(`${code}_title`),
        description: app.$i18n.t(`${code}_description`, {
          supportLink: `<strong><a href="mailto:support@cleanslice.com">support@cleanslice.com</a></strong>`,
        }),
        variant: 'destructive',
      });
    } catch (e) {
      console.log(e);
    }
  }
};
