<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue';
import { TagsInputItemText, type TagsInputItemTextProps, useForwardProps } from 'radix-vue';
import { cn } from '#theme/utils/cn';

const props = defineProps<TagsInputItemTextProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <TagsInputItemText v-bind="forwardedProps" :class="cn('py-1 px-2 text-sm rounded bg-transparent', props.class)" />
</template>
