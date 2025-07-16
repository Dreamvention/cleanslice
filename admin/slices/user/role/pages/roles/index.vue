<script lang="ts" setup>
definePageMeta({
  layout: 'default',
  public: false,
});
</script>

<template>
  <PageTitle title="Roles" subtitle="Add and manage system and organizations roles." />
  <RolesProvider />
  <NuxtPage />
</template>
