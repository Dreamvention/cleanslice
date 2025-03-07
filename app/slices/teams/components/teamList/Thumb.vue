<template>
  <Button size="lg" variant="outline" :to="{ name: pages.agents, params: { teamId: team.codename } }">{{
    team.name
  }}</Button>
</template>

<script lang="ts" setup>
import { TeamDto } from '#api';
import { pages } from '../../pages';
defineProps<{
  team: TeamDto;
}>();
</script>
