<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '#theme/utils/cn';

interface SkeletonProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<SkeletonProps>();
</script>

<template>
  <div :class="cn('animate-pulse rounded-md bg-muted', props.class)" />
</template>
