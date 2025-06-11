<script lang="ts" setup>
const authStore = useAuthStore();

const register = async (data: { name: string; email: string; password: string }) => {
  await authStore.register({ name: data.name, email: data.email, password: data.password, deviceId: 'app' });
};
</script>

<template>
  <NuxtLink :to="{ name: pages.login }" class="absolute right-4 top-4 md:right-8 md:top-8">
    <Button> Sign in </Button>
  </NuxtLink>
  <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
    <div class="flex flex-col space-y-2 text-center">
      <h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>
      <p class="text-sm text-muted-foreground">Enter your email below to create your account</p>
    </div>
    <AuthRegisterForm @submit="register" :loading="authStore.loading" />
    <!-- <div class="mt-3">Don't have an account? -->
    <p class="px-8 text-center text-sm text-muted-foreground">
      Already have an account?
      <NuxtLink class="underline underline-offset-4 hover:text-primary" :to="{ name: pages.login }">Sign In </NuxtLink>.
    </p>
  </div>
</template>
