<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <div class="pt-6">
    <div class="flex flex-row items-center justify-between">
      <div class="flex-grow space-y-2">
        <h1 class="scroll-m-20 text-4xl font-bold tracking-tight">{{ title }}</h1>
        <p v-if="subtitle" class="text-lg text-muted-foreground">{{ subtitle }}</p>
      </div>
      <div class="flex-shrink-0 ml-4"><slot /></div>
    </div>
  </div>
  <div class="flex items-center space-x-2 pt-4"></div>
</template>
