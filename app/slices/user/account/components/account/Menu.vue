<script setup lang="ts">
const route = useRoute();

const menuItems = [
  {
    id: 'profile',
    title: 'Profile',
    link: pages.profile,
    active: false,
    icon: 'mdi-robot',
    sortOrder: 1,
  },

  {
    id: 'apiKeys',
    title: 'Api Keys',
    link: pages.apiKeys,
    active: false,
    icon: 'mdi-book',
    sortOrder: 1,
  },
];

const getMenuItems = computed(() => {
  return menuItems.map((item) => {
    if (route?.name) {
      item.active = route.name.toString() === item.link ? true : false;
    }
    return item;
  });
});
</script>

<template>
  <div>
    <h4 class="mb-1 rounded-md px-2 py-1 text-sm font-semibold">Account</h4>

    <div class="grid grid-flow-row auto-rows-max text-sm">
      <nuxt-link
        v-for="item in getMenuItems"
        :key="item.id"
        :to="{ name: item.link }"
        class="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground"
        :class="{ '!font-semibold !text-foreground': item.active }"
        aria-current="page"
        >{{ $t(item.title) }}
      </nuxt-link>
    </div>
  </div>
</template>
