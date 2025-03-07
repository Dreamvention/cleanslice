<script lang="ts" setup>
import { pages } from '../../pages';
const authStore = useAuthStore();
</script>

<template>
  <nav class="sticky z-40 top-0 bg-background/80 backdrop-blur-lg border-b border-border">
    <div class="container flex justify-between h-14 max-w-screen-2xl items-center">
      <div class="flex flex-1 items-stretch justify-start">
        <NuxtLink class="flex flex-shrink-0 items-center font-bold mr-4" :to="{ name: pages.home }"
          >Cleanslice</NuxtLink
        >
        <MenuTop v-if="authStore.isAuthenticated" />
      </div>
      <div class="">
        <NuxtLink
          v-if="authStore.isAuthenticated"
          :to="{ name: pages.logout }"
          class="text-sm hover:font-semibold inline-flex items-center"
          ><Icon name="LogOut" /><span class="hidden md:block ml-2">Sign out</span></NuxtLink
        >
        <NuxtLink v-else :to="{ name: pages.login }" class="text-sm hover:font-semibold inline-flex items-center"
          ><Icon name="LogIn" /><span class="hidden sm:block ml-2">Sign in</span></NuxtLink
        >
        <ModelCreateDialog />
      </div>
    </div>
  </nav>
</template>
