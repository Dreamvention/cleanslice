<script setup lang="ts">
definePageMeta({
  layout: 'default',
  public: false,
});
const show = ref(false);
onMounted(() => {
  show.value = true;
});
</script>
<template>
  <TeamsUpdateProvider v-if="show" :loading="true" />
</template>
