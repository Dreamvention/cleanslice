<script setup lang="ts">
// import Toaster from '#theme/components/ui/toast/Toaster.vue';
// import { useNuxtApp } from '#app';

// const nuxtApp = useNuxtApp();

// nuxtApp.hook('vue:error', (error) => {
//   console.error('Global error handler:', error);
//   // You can trigger custom logic, like redirecting or showing a notification
// });
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toaster />
</template>
