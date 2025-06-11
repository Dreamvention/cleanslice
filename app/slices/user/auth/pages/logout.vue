<script lang="ts" setup>
import { Loader } from '~/slices/setup/theme/components/ui/loader';
import { Icon } from '~/slices/setup/theme/components/ui/icon';

definePageMeta({
  layout: 'auth',
  auth: {
    public: true,
  },
});

const auth = useAuthStore();
const isLoading = ref(true);

onMounted(async () => {
  await auth.logout();
  // Add a small delay to ensure smooth transition
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});

const handleLogout = async () => {
  await navigateTo({ name: pages.login });
};
</script>
<template>
  <div class="flex flex-col space-y-2 text-center space-y-4">
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      mode="out-in"
    >
      <div v-if="isLoading" key="loading" class="flex flex-col items-center space-y-4">
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-semibold tracking-tight">Logging out</h1>
          <Loader />
        </div>
        <p class="text-sm text-muted-foreground">Just a moment. We're logging you out now.</p>
      </div>
      <div v-else key="complete" class="flex flex-col items-center space-y-4">
        <div class="rounded-full h-12 w-12 bg-green-100 flex items-center justify-center">
          <Icon name="Check" class="h-6 w-6 text-green-600" />
        </div>
        <h1 class="text-2xl font-semibold tracking-tight">Logged out successfully</h1>
        <p class="text-sm text-muted-foreground">You have been successfully logged out.</p>
        <div class="flex justify-center">
          <Button @click="handleLogout">Go to login</Button>
        </div>
      </div>
    </Transition>
  </div>
</template>
