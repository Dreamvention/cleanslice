<template>
  <div v-for="(item, index) in items" :key="index">
    <UserItemDetails :item="item" />
  </div>
</template>

<script lang="ts" setup>
import { ApiRepository } from '@/data/repositories';
const app = useNuxtApp();

// This is the simplest form of fetching and providing data.
// The Data object is taken from the API Client as UserDto.
// The UserItemDetails component also excepts UserDto.
// There are no Layers such a Domain and Data inside this slices.
// Use this approach for simple cases and extend to gateways or services
// once you need more control.

const items = await app.$di.resolve(ApiRepository).users.getUsers();
</script>
