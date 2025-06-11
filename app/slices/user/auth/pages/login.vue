<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
  auth: {
    public: true,
    onlyNotAuthenticated: true,
    redirect: pages.goToAfterLogin,
  },
});
</script>

<template><AuthLoginProvider /></template>
