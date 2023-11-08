<template>
  <div v-for="(item, index) in items" :key="index">
    <UserGatewayItemDetails :item="item" />
  </div>
</template>

<script lang="ts" setup>
import { UsersService } from '@/domain/services';
const app = useNuxtApp();

// We are using UsersService to fetch User[].
// This is the preferred way to do it.
const items = await app.$di.resolve(UsersService).getUsers();
</script>
