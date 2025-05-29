<script setup lang="ts">
import { FormLabel } from '#theme/components/ui/form';

defineProps<{
  required?: boolean;
}>();
</script>

<template>
  <FormLabel>
    <slot />
    <span v-if="required" class="text-destructive"> *</span>
  </FormLabel>
</template>
