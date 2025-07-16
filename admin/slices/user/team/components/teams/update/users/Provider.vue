<script setup lang="ts">
import { pages } from '~/slices/users/teams/pages';
import { RolesService, TeamUsersService, UsersService } from '#api';

const route = useRoute();
const teamsStore = useTeamsStore();
const { data, pending, refresh } = useAsyncData('teamUsers', () =>
  TeamUsersService.getTeamUsers({
    path: {
      id: route.params.teamId as string,
    },
  }),
);
const rolesResponse = await RolesService.getRoles();
const roles = rolesResponse.data?.data;
const usersResponse = await UsersService.getUsers();
const users = usersResponse.data?.data;
const teamUsers = computed(() => {
  return data.value?.data?.data?.map((teamUser) => {
    return {
      name: users?.find((user) => user.id === teamUser.userId)?.name,
      email: teamUser.email,
      roleName: roles?.find((role) => role.id === teamUser.roleId)?.name,
      status: teamUser.status.toString(),
      userId: teamUser.userId,
      teamUserId: teamUser.id,
    };
  });
});

const handleDelete = async (teamUserId: string) => {
  try {
    await TeamUsersService.deleteTeamUser({
      path: {
        teamUserId,
        id: route.params.teamId as string,
      },
    });
    refresh();
  } catch (error) {
    console.error('Failed to delete team user:', error);
  }
};

watch(
  () => route.params,
  () => {
    refresh();
  },
);
</script>

<template>
  <div class="w-full">
    <div class="mb-4">
      <TeamsUpdateUsersCreateThumb :loading="pending" @create="refresh" />
    </div>
    <div class="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead> Name </TableHead>
            <TableHead> Email </TableHead>
            <TableHead> Role </TableHead>
            <TableHead> Status </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-if="teamUsers && teamUsers.length > 0" v-for="item in teamUsers">
            <TableCell class="font-medium"> {{ item.name || '-' }} </TableCell>
            <TableCell>{{ item.email }}</TableCell>
            <TableCell> {{ item.roleName }}</TableCell>
            <TableCell> {{ item.status }}</TableCell>
            <TableCell class="text-right">
              <NuxtLink
                :to="{ name: pages.teamUsersItem, params: { teamId: route.params.teamId, id: item.teamUserId } }"
              >
                <Button size="sm" class="mr-2">
                  <Icon name="Pencil" size="sm" />
                </Button>
              </NuxtLink>
              <Confirm
                :disabled="false"
                title="Delete Team User"
                description="Are you sure you want to remove this user from the team?"
                :onConfirm="() => handleDelete(item.teamUserId)"
              >
                <Button size="sm" variant="destructive">
                  <Icon name="Trash" size="sm" />
                </Button>
              </Confirm>
            </TableCell>
          </TableRow>
          <TableRow v-else>
            <TableCell colspan="5" class="text-center"> No Users yet</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
