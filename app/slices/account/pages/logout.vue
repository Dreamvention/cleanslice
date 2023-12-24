<template>
  <div>Logging out</div>
</template>
<script lang="ts" setup>
import { pages } from '../pages';
definePageMeta({
  layout: 'guest',
});

const auth = useAuthStore();
await auth.logout();
await navigateTo(pages.login, { external: true });
</script>
