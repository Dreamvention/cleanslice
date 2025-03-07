<script lang="ts" setup>
import { useToast } from '#theme/components/ui/toast/use-toast';
import { pages } from '../../pages';
const authStore = useAuthStore();
const teamsStore = useTeamsStore();
const router = useRouter();
const { toast } = useToast();
const loading = ref(false);

const login = async (user: { email: string; password: string }) => {
  loading.value = true;

  await authStore.login(user.email, user.password);

  if (authStore.isAuthenticated) {
    await teamsStore.init();
    if (teamsStore.hasTeam) {
      await router.push({ name: pages.teams });
    } else {
      await router.push({ name: pages.teamsCreate });
    }
  }
  loading.value = false;
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
    <UserLoginForm @submit="login" :loading="loading" />
    <!-- <div class="mt-3">Don't have an account? <NuxtLink :to="{ name: pages.register }">Register</NuxtLink></div> -->
    <p class="px-8 text-center text-sm text-muted-foreground">
      Don't have an account?
      <NuxtLink class="underline underline-offset-4 hover:text-primary" :to="{ name: pages.register }"
        >Sign Up </NuxtLink
      >.
    </p>
  </div>
</template>
