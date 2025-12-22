<script lang="ts" setup>
import { useToast } from '#theme/components/ui/toast/use-toast';
import { useErrorStore } from '@/slices/setup/error/stores/error';

const authStore = useAuthStore();
const errorStore = useErrorStore();
const { toast } = useToast();

const login = async (data: { email: string; password: string }) => {
  const success = await authStore.login({ ...data, deviceId: 'app' });
  
  if (!success) {
    // Check if there's an error in the error store
    const error = errorStore.getError('auth_login');
    if (error) {
      toast({
        title: 'Login Failed',
        description: error.message,
        variant: 'destructive',
      });
      // Clear the error after showing it
      errorStore.clearError('auth_login');
    }
  }
};
</script>

<template>
  <NuxtLink :to="{ name: pages.register }" class="absolute right-4 top-4 md:right-8 md:top-8">
    <Button> Sign up </Button>
  </NuxtLink>
  <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
    <div class="flex flex-col space-y-2 text-center">
      <h1 class="text-2xl font-semibold tracking-tight">Login to your Account</h1>
      <p class="text-sm text-muted-foreground">Enter your email and password to sign in</p>
    </div>
    <AuthLoginForm @submit="login" :loading="authStore.loading" />
    <!-- <div class="mt-3">Don't have an account? <NuxtLink :to="{ name: pages.register }">Register</NuxtLink></div> -->
    <p class="px-8 text-center text-sm text-muted-foreground">
      Don't have an account?
      <NuxtLink class="underline underline-offset-4 hover:text-primary" :to="{ name: pages.register }"
        >Sign Up </NuxtLink
      >.
    </p>
  </div>
</template>
