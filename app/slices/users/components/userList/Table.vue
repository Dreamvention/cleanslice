<template>
  <CommonHeading>Users</CommonHeading>
  <!-- Responsive layout: Table for larger screens, Cards for mobile -->
  <v-row class="d-none d-sm-flex">
    <v-col>
      <v-data-table :headers="headers" :items="items" class="elevation-1">
        <template v-slot:item.updatedAt="{ item }">{{ formatDate(item.updatedAt) }}</template>
        <template v-slot:item.createdAt="{ item }">{{ formatDate(item.createdAt) }}</template>
        <template v-slot:item.action="{ item }">
          <v-btn color="primary" :to="{ name: pages.userItem, params: { id: item.id } }" class="ma-1">View</v-btn>
          <v-btn color="secondary" :to="{ name: pages.userEdit, params: { id: item.id } }" class="ma-1">Edit</v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-row>

  <v-row class="d-sm-none">
    <v-col v-for="user in items" :key="user.id">
      <v-card class="mb-2">
        <v-card-title>{{ user.name }}</v-card-title>
        <v-card-subtitle>{{ user.email }}</v-card-subtitle>
        <v-card-text>
          <div>Created: {{ formatDate(user.createdAt) }}</div>
          <div>Updated: {{ formatDate(user.updatedAt) }}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" :to="{ name: pages.userItem, params: { id: user.id } }">View</v-btn>
          <v-btn color="secondary" :to="{ name: pages.userEdit, params: { id: user.id } }">Edit</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { UserDto } from '@/data/repositories';
import { pages } from '@/pages';

defineProps({
  items: {
    type: Array as PropType<UserDto[]>,
    required: true,
  },
});

const headers = [
  { title: 'ID', value: 'id' },
  { title: 'Name', value: 'name' },
  { title: 'Email', value: 'email' },
  { title: 'Created At', value: 'createdAt' },
  { title: 'Updated At', value: 'updatedAt' },
  { title: 'Actions', value: 'action', sortable: false, align: 'end' },
];
</script>
<style lang="scss">
@media only screen and (max-width: 600px) {
  .v-data-table {
    display: none;
  }
}
</style>
