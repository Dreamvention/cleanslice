<template>
  <v-navigation-drawer :rail="rail" @click="rail = false">
    <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" title="John Leider">
      <template v-slot:append>
        <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        v-for="item in menu.getItems"
        :key="item.id"
        :active="item.active"
        :to="{ name: item.link }"
        :title="item.title"
        :prepend-icon="item.icon"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script lang="ts" setup>
const menu = useMenu();

const rail = ref(true);
</script>
