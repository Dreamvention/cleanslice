<script lang="ts" setup>
import { RoleDto, TeamDto } from '#api';
import { pages } from '../../pages';
defineProps<{
  role: RoleDto;
}>();
</script>

<template>
  <Button size="lg" variant="outline" :to="{ name: pages.rolesItem, params: { id: role.id } }">{{
    role.name
  }}</Button>
</template>
