<template>
  <div class="common-menu">
    <div class="common-menu__wrapper">
      <nuxt-link
        v-for="item in menu.getItems"
        :key="item.id"
        :to="{ name: item.link }"
        class="common-menu__item"
        :class="{ '--active': item.active }"
        aria-current="page"
        >{{ $t(item.title) }}
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
const menu = useMenuStore();
</script>

<style lang="scss">
.common-menu {
  &__wrapper {
    @apply flex space-x-4;
  }
  &__item {
    @apply text-gray-700 rounded-md px-3 py-2 text-sm cursor-pointer;
    &.--active {
      @apply text-gray-700 font-bold;
    }
  }
}
</style>
