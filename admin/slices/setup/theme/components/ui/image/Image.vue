<script setup lang="ts">
import { AspectRatio } from 'radix-vue';

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <AspectRatio :ratio="160 / 116" class="overflow-hidden">
    <img
      class="h-full w-full object-cover transition-all hover:scale-105"
      :src="src"
      alt="Landscape photograph by Tobias Tullius"
    />
  </AspectRatio>
</template>
