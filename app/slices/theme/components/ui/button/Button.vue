<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { Primitive, type PrimitiveProps } from 'radix-vue';
import { type ButtonVariants, buttonVariants } from '.';
import { cn } from '~/slices/theme/utils/cn';
import { RouterLink } from 'vue-router';

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
  as?: string;
  class?: HTMLAttributes['class'];
  loading?: boolean;
  icon?: string;
  disabled?: boolean;
  to?: string | Record<string, any>; // Supports Vue Router's `to` prop format
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
});
</script>

<template>
  <Primitive
    v-if="!to"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    :disabled="disabled"
  >
    <Icon v-if="loading" name="Loader2" :size="props.size" class="animate-spin mr-2" />
    <Icon v-if="icon && !loading" :name="icon" :size="props.size" class="mr-2"></Icon>
    <slot />
  </Primitive>
  <RouterLink v-else :to="to" :class="cn(buttonVariants({ variant, size }), props.class)">
    <Icon v-if="loading" name="Loader2" :size="props.size" class="animate-spin mr-2" />
    <Icon v-if="icon && !loading" :name="icon" :size="props.size" class="mr-2"></Icon>
    <slot />
  </RouterLink>
</template>
