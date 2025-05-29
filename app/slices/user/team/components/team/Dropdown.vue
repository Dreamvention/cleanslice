<script setup>
const teamStore = useTeamStore();

const teams = ref([
  { id: 1, name: 'Team Alpha' },
  { id: 2, name: 'Team Beta' },
  { id: 3, name: 'Team Gamma' },
]);

const selectTeam = (team) => {
  console.log('Selected team:', team);
};

const createNewTeam = () => {
  console.log('Creating new team...');
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">Select Team</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-48">
      <DropdownMenuItem v-for="team in teams" :key="team.id" @click="selectTeam(team)">
        {{ team.name }}
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="createNewTeam"> + Create New Team </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
