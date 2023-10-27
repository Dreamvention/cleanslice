<template>
  <ProductDetails />
  <div>
    {{ store.doubleCount }}
    {{ items }}
  </div>
  <v-row>
    <LocaleSwitcher />
  </v-row>
  {{ $t("home") }}
</template>

<script lang="ts" setup>
import { ApiRepository } from "@/data/repositories";
const app = useNuxtApp();
// const items = ref('');
const items = await app.$di
  .resolve(ApiRepository)
  .default.usersControllerGetUser("1");
const item = ref("null");

const store = useProducts2();
</script>
