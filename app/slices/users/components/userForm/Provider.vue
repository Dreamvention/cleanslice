<template>
  <UserForm :item="item" />
</template>

<script lang="ts" setup>
import { ApiRepository } from '@/data/repositories';
const app = useNuxtApp();
const route = useRoute();

const item = await app.$di.resolve(ApiRepository).users.getUser(route.params.id);
</script>
