<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
  auth: {
    public: true,
    onlyNotAuthenticated: true,
  },
});
</script>

<template><AuthRegisterProvider /></template>
