<template>
  <div v-for="(item, index) in items" :key="index">
    <UserGatewayItemDetails :item="item" />
  </div>
</template>

<script lang="ts" setup>
import { UsersGateway } from '@/data/gateways';
import { User } from '@/domain/entities';
const app = useNuxtApp();

// We are using UsersGateway to fetch IUserData[] and then are mapping it to a User Entity inside the component.
// This may be ok in a case like this where the is little logic.
// If you notice that you are doing more logic incide the component, move it to a dedicated UsersService.
const items = (await app.$di.resolve(UsersGateway).getUsers()).map((item) => new User(item));
</script>
