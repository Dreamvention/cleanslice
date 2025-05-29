<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
  public: true,
});

const auth = useAuthStore();
await auth.logout();
await navigateTo({ name: pages.login });
</script>
<template>
  <div class="flex flex-col space-y-2 text-center">
    <h1 class="text-2xl font-semibold tracking-tight">Logging out</h1>
    <p class="text-sm text-muted-foreground">Just a moment. We’re logging you out now.</p>
  </div>
</template>
