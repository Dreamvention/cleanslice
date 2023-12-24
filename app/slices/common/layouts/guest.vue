<template>
  <v-layout class="rounded rounded-md">
    <CommonHeader />
    <v-main class="d-flex align-center justify-center" style="min-height: 300px">
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-layout>
</template>
