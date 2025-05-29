<script setup lang="ts">
import { MenuGroupTypes } from '#common/stores/menu';
const menu = useMenuStore();
const route = useRoute();

const getSidebarByGroup = (group: MenuGroupTypes) => {
  const items = menu.getSidebar;
  return items.filter((item) => item.group == group);
};

</script>

<template>
  <div
    v-for="group in [
      MenuGroupTypes.Project,
      MenuGroupTypes.Playground,
      MenuGroupTypes.Account,
      MenuGroupTypes.Resources,
    ]"
    class="mb-4"
  >
    <h4 class="mb-1 rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">{{ group }}</h4>

    <div class="grid grid-flow-row auto-rows-max text-sm">
      <nuxt-link
        v-for="item in getSidebarByGroup(group)"
        :key="item.id"
        :to="{ name: item.link, params: { teamId: route.params.teamId } }"
        class="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground"
        :class="{ '!font-semibold !text-foreground': item.active }"
        aria-current="page"
      >
        <Icon :name="item.icon" class="mr-2" :class="{ 'animate-pulse text-orange-400': item.isPolling }" />
        {{ $t(item.title) }}
        <!-- <Icon name="Radio" color="green" class="ml-2 animate-pulse" /> -->
      </nuxt-link>
    </div>
  </div>
</template>
