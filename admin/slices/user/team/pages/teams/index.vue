<script lang="ts" setup>
definePageMeta({
  layout: 'default',
  public: false,
});
</script>

<template>
  <PageTitle title="Teams" subtitle="Manage teams." />
  <TeamsProvider />
  <NuxtPage />
</template>
