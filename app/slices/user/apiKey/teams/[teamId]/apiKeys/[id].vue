<script setup lang="ts">
definePageMeta({
  layout: 'account',
});
const show = ref(false);
onMounted(() => {
  show.value = true;
});
</script>
<template>
  <ApiKeyUpdateThumb v-if="show" />
</template>
