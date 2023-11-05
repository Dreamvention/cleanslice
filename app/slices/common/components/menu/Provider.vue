<template>
  <v-list>
    <v-list-item title="Navigation drawer">
      <NuxtLink v-for="item in menu.getItems" :key="item" :to="`/${item}`">{{ item }}</NuxtLink>
    </v-list-item>
  </v-list>
</template>
<script lang="ts" setup>
const menu = useMenu();
</script>
