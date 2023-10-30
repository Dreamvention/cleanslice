<template>
  <v-card width="400" :title="item.name" :subtitle="item.email" :text="'Data: ' + item.createdAt"></v-card>
</template>

<script lang="ts" setup>
import type { IUser } from '@/domain/entities';
defineProps({
  item: {
    type: Object as PropType<IUser>,
    required: true,
  },
});
</script>
