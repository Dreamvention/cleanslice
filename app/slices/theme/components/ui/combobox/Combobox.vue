<script setup lang="ts">
import { ref } from 'vue'
import { Check, ChevronsUpDown } from 'lucide-vue-next'

import { cn } from '~/slices/theme/utils/cn';
defineOptions({
  inheritAttrs: false
})
const props = defineProps({
  options: {
    type: Array<{ value: string; label: string }>,
    required: true,
  },
  noFoundText: {
    type: String,
    default: () => 'No framework found.'
  },
  placeholder: {
    type: String,
    default: () => 'Search framework...'
  },
  selectText: {
    type: String,
    default: () => 'Select framework...'
  },
  modelValue: {
    type: [Object, String, Number, null],
    required: false
  }
});
const emit = defineEmits(['select', 'update:modelValue']);

const open = ref(false)
const value = ref(props.modelValue ?? '')

watch(props.modelValue , (val, oldVal) => {
  if (val !== oldVal && val !== value.value) {
    value.value = val
  }
})

watch(() => value.value, (val) => {
    if (val !== props.modelValue) {
        emit('update:modelValue', val)
        emit('select', props.options.find(v => v.value === val))
    }
})
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
    <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-[200px] justify-between"
        :class="$attrs?.class"
      >
        {{ value
          ? options.find((option) => option.value === value)?.label
          : selectText }}
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0">
      <Command>
        <CommandInput class="h-9" :placeholder="placeholder" />
        <CommandEmpty>{{noFoundText}}</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              @select="(ev) => {
                if (typeof ev.detail.value === 'string') {
                  value = ev.detail.value
                }
                open = false
              }"
            >
              {{ option.label }}
              <Check
                :class="cn(
                  'ml-auto h-4 w-4',
                  value === option.value ? 'opacity-100' : 'opacity-0',
                )"
              />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>