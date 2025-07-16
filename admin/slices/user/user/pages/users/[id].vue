<script setup lang="ts">
import { UsersService } from '#api';
definePageMeta({
  layout: 'default',
});
const show = ref(false);
const route = useRoute();
const { data, pending, error, refresh, status } = useAsyncData('users', () =>
  UsersService.getUser({ path: { id: route.params.id as string } }),
);
onMounted(() => {
  show.value = true;
});
</script>
<template>
  <PageTitle title="Users" subtitle="Update User" />
  <Separator class="mt-2 max-w-2xl" />
  <UsersUpdateProvider
    v-if="show"
    :loading="status !== 'success'"
    class="mt-8 w-full max-w-2xl"
    :user="data?.data?.data"
  />
</template>
