<script lang="ts" setup>
const props = defineProps<{ title: string; subtitle?: string }>();
</script>
<template>
  <div class="border-b p-4 m-b-0 flex pr-12">
    <div class="flex-grow">
      <div class="text-lg font-semibold">{{ props.title }}</div>
      <div v-if="props.subtitle" class="text-muted-foreground text-sm">{{ props.subtitle }}</div>
    </div>
    <slot></slot>
  </div>
</template>
