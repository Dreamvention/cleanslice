<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
  public: true,
  onlyNotAuthenticated: true,
});
</script>

<template><AuthConfirmProvider /></template>
