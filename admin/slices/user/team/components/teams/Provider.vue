<script setup lang="ts">
import { pages } from '../../pages';
import { TeamsService } from '#api';

const route = useRoute();
const { data, pending, refresh } = useAsyncData('teams', () => TeamsService.getAdminTeams());

const handleDelete = async (id: string) => {
  await TeamsService.deleteTeam({
    path: {
      id,
    },
  });
  refresh();
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
      <TeamsCreateThumb :loading="pending" @create="refresh" />
    </div>
    <div class="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead> Name </TableHead>
            <TableHead> Code name </TableHead>
            <TableHead class="text-right"> Actions </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-if="data?.data?.data && data?.data?.data.length > 0" v-for="item in data?.data?.data">
            <TableCell>{{ item.name }}</TableCell>
            <TableCell>
              {{ item.codename }}
            </TableCell>
            <TableCell class="text-right">
              <NuxtLink :to="{ name: pages.teamsItem, params: { teamId: item.id } }">
                <Button size="sm" class="mr-2">
                  <Icon name="Pencil" size="sm" />
                </Button>
              </NuxtLink>
              <Confirm @confirm="handleDelete(item.id)">
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
