<template>
  <CommonHeading>User</CommonHeading>
  <NuxtLink :to="{ name: pages.userEdit, params: { id: item.id } }">
    <v-card
      class="user-item-details"
      width="400"
      :title="item.name"
      :subtitle="item.email"
      :text="'Data: ' + formatDate(item.createdAt)"
    ></v-card
  ></NuxtLink>
</template>

<script lang="ts" setup>
import { UserDto } from '@/data/repositories';
import { pages } from '@/pages';

defineProps({
  item: {
    type: Object as PropType<UserDto>,
    required: true,
  },
});
</script>
