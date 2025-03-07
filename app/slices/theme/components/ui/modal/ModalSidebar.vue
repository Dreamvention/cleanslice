<script setup lang="ts">
import { ISidebarItem } from './';

const props = defineProps<{
  //   groups: {
  //     type: string[];
  //     default: [''];
  //   };
  items: ISidebarItem[];
}>();

const getSidebarByGroup = (group: string) => {
  if (group == '') return props.items;
  return props.items.filter((item) => item.group == group);
};
</script>
<template>
  <!-- <div v-for="group in groups" class="mb-4">
    <h4 v-if="group" class="mb-1 rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
      {{ group }}
    </h4> -->

  <div class="grid grid-flow-row auto-rows-max text-sm">
    <nuxt-link
      v-for="item in getSidebarByGroup('')"
      :key="item.id"
      :to="item?.to"
      class="group flex w-full items-center rounded-md border border-transparent px-4 py-2 text-muted-foreground"
      :class="{ '!font-semibold !text-foreground bg-slate-200': item.active }"
      aria-current="page"
    >
      <Icon
        v-if="item?.icon"
        :name="item.icon"
        class="mr-2"
        :class="{ 'animate-pulse text-orange-400': item?.isPolling }"
      />
      {{ $t(item.title) }}
      <!-- <Icon name="Radio" color="green" class="ml-2 animate-pulse" /> -->
    </nuxt-link>
  </div>
  <!-- </div> -->
</template>
