<template>
  <Button size="lg" variant="outline" :to="{ name: pages.teamsItem, params: { teamId: team.codename } }">
    {{ team.name }}
  </Button>
</template>

<script lang="ts" setup>
import { TeamDto } from '#api';

defineProps<{
  team: TeamDto;
}>();
</script>
