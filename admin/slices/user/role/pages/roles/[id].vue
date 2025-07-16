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
  <RolesUpdateThumb v-if="show" :loading="true" />
</template>
