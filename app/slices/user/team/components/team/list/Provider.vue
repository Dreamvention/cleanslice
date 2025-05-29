<script lang="ts" setup>
const teamStore = useTeamStore();
</script>
<template>
  <Card>
    <CardHeader>
      <CardTitle>Select your Team</CardTitle>
      <p>Select the team you wish to work in.</p>
    </CardHeader>
    <CardContent class="flex flex-col gap-2">
      <TeamListThumb v-for="item in teamStore.getTeams" :key="item.id" :team="item" />
    </CardContent>
    <CardFooter>
      <Button :to="{ name: pages.teamsCreate }" class="w-full">Create new Team</Button>
    </CardFooter>
  </Card>
</template>
