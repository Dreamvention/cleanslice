import { useToast } from '#theme/components/ui/toast/use-toast';

export default defineNuxtPlugin((nuxtApp) => {
  const { toast } = useToast();

  // Handle Vue errors
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    console.error('Vue Error:', error);
    console.error('Component:', instance);
    console.error('Info:', info);

    toast({
      title: 'Application Error',
      description: 'An unexpected error occurred. Please try again.',
      variant: 'destructive',
    });
  };

  // Handle Nuxt app errors
  nuxtApp.hook('app:error', (error) => {
    console.error('Nuxt App Error:', error);

    toast({
      title: 'Application Error',
      description: 'An unexpected error occurred. Please try again.',
      variant: 'destructive',
    });
  });

  // Handle Vue Router errors
  nuxtApp.hook('vue:error', (error) => {
    console.error('Vue Router Error:', error);

    toast({
      title: 'Navigation Error',
      description: 'An error occurred while navigating. Please try again.',
      variant: 'destructive',
    });
  });

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise Rejection:', event.reason);

    toast({
      title: 'Application Error',
      description: 'An unexpected error occurred. Please try again.',
      variant: 'destructive',
    });
  });
});
