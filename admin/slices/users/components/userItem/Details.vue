<template>
  <v-card width="400" :title="item.name" :subtitle="item.email" :text="'Data: ' + item.createdAt"></v-card>
</template>

<script lang="ts" setup>
import { UserDto } from '@/data/repositories/api';
defineProps({
  item: {
    type: Object as PropType<UserDto>,
    required: true,
  },
});
</script>
