<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue';
import SelectProvider from './SelectProvider.vue';
import type { SelectRootEmits, SelectRootProps } from 'radix-vue';
import { useForwardPropsEmits } from 'radix-vue';

const props = defineProps<SelectRootProps & { placeholder: string; options: { label: string; value: string }[] }>();
const emits = defineEmits<SelectRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <SelectProvider v-bind="forwarded">
    <SelectTrigger>
      <SelectValue :placeholder="placeholder" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup v-for="option in options" :key="option.value">
        <SelectItem :value="option.value"> {{ option.label }} </SelectItem>
      </SelectGroup>
    </SelectContent>
  </SelectProvider>
</template>
