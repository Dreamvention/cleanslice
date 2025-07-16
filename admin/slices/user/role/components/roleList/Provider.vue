<script lang="ts" setup>
import { pages } from '../../pages';
const teamsStore = useTeamsStore();
</script>
<template>
  <Card>
    <CardHeader>
      <CardTitle>Select your Organization</CardTitle>
      <p>Select the Organization you wish to work in.</p>
    </CardHeader>
    <CardContent class="flex flex-col gap-2">
      <TeamListThumb v-for="item in teamsStore.getTeams" :key="item.id" :team="item" />
    </CardContent>
    <CardFooter>
      <Button :to="{ name: pages.teams }" class="w-full">Create new Organization</Button>
    </CardFooter>
  </Card>
</template>
