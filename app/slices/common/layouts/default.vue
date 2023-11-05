<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="Application bar"><LocaleSwitcher /></v-app-bar>

    <v-navigation-drawer>
      <MenuProvider />
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px">
      <slot />
    </v-main>
  </v-layout>
</template>
