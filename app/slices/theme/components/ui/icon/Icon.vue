<script lang="ts" setup>
import { computed } from 'vue';
import * as icons from 'lucide-vue-next';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: String | Number,
  color: String,
  defaultClass: String,
});
const icon = computed(() => icons[props.name]);

const sizeVariants = {
  default: { size: 18, strokeWidth: 2 },
  xs: { size: 10, strokeWidth: 2 },
  sm: { size: 14, strokeWidth: 2 },
  md: { size: 18, strokeWidth: 2 },
  lg: { size: 26, strokeWidth: 2 },
  xl: { size: 36, strokeWidth: 2 },
};
const getSize = (size) => {
  if (typeof size === 'number') return size;
  return size ? sizeVariants[size]?.size : sizeVariants.default.size;
};

const getStrokeWidth = (size) => {
  if (typeof size === 'number') return 2;
  return size ? sizeVariants[size]?.strokeWidth : sizeVariants.default.strokeWidth;
};
</script>

<template>
  <component
    :is="icon"
    :size="getSize(size)"
    :color="color"
    :stroke-width="getStrokeWidth(size)"
    :default-class="defaultClass"
  />
</template>
