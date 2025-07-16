<script setup lang="ts">
definePageMeta({
  layout: 'default',
});
const show = ref(false);
onMounted(() => {
  show.value = true;
});
</script>
<template>
  <PageTitle title="Edit user" subtitle="Update user role in team." />
  <TeamsUpdateUsersUpdateThumb v-if="show" :loading="true" />
</template>
