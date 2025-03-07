<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/slices/theme/utils/cn'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <li
    data-sidebar="menu-item"
    :class="cn('group/menu-item relative', props.class)"
  >
    <slot />
  </li>
</template>
