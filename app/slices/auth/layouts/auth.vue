<script setup lang="ts">
import { pages } from '../pages';
</script>

<template>
  <div class="md:hidden"></div>

  <div
    class="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0"
  >
    <div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div class="absolute inset-0 bg-zinc-900" />
      <NuxtLink class="relative z-20 flex items-center text-lg font-medium" :to="{ name: pages.home }"
        >Cleanslice</NuxtLink
      >
    </div>
    <div class="lg:p-8">
      <slot />
    </div>
  </div>
</template>
