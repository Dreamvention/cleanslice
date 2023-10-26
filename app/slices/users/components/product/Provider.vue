<template>
  {{ store.doubleCount }}
  {{ items }}
  <ProductDetails />
</template>

<script lang="ts" setup>
import { ApiRepository } from '@/data/repositories';
import { useProducts2 } from '@/stores/products2';
const app = useNuxtApp();
// const items = ref('');
const items = await app.$di.resolve(ApiRepository).default.appControllerGetProducts();
const item = ref('null');

const store = useProducts2();
</script>
