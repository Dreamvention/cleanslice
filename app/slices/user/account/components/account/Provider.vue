<script lang="ts" setup>
import { AuthService, UserDto } from '#api/data';

const app = useNuxtApp();

const { data, pending, error, refresh } = useAsyncData('account', () => AuthService.me());
</script>

<template>
  <div>
    <AccountForm v-if="!pending" :user="data?.data" @update="refresh" />
    <div class="mb-5"></div>
    <AccountItem :pending="pending" :user="data?.data" />
  </div>
</template>
