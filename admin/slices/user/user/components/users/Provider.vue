<script setup lang="ts">
import { pages } from '../../pages';
import { UsersService } from '#api';

const route = useRoute();
const router = useRouter();

const pageNumber = ref(route.query.page ? Number(route.query.page) : 1);

const { data, refresh, pending } = useAsyncData(
  'users',
  () => UsersService.getUsers({
    query: {
      ...route.query,
      page: pageNumber.value,
      perPage: 10,
    },
  }),
  { watch: [pageNumber] }
);

watch(pageNumber, (newPage) => {
  router.push({ query: { ...route.query, page: newPage } });
});

const handleDelete = async (id: string) => {
  await UsersService.deleteUser({ path: { id } });
  refresh();
};
</script>

<template>
  <div class="w-full">
    <div class="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Verified</TableHead>
            <TableHead>Banned</TableHead>
            <TableHead class="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-if="data?.data?.data?.length" v-for="item in data.data.data" :key="item.id">
            <TableCell class="font-medium">{{ item.name }}</TableCell>
            <TableCell>{{ item.email }}</TableCell>
            <TableCell>{{ item.adminRole }}</TableCell>
            <TableCell>{{ item.verified ? 'Yes' : 'No' }}</TableCell>
            <TableCell>{{ item.banned ? 'Yes' : 'No' }}</TableCell>
            <TableCell class="text-right">
              <NuxtLink :to="{ name: pages.usersItem, params: { id: item.id } }">
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
            <TableCell colspan="6" class="text-center">No Users yet</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div v-if="data?.data?.meta?.total && !pending" class="flex flex-row justify-center mt-6">
      <Pagination v-model:page="pageNumber" :total="data.data.meta.total" :items-per-page="data.data.meta.perPage"
        show-edges>
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
          <PaginationFirst />
          <PaginationPrev />
          <template v-for="(item, index) in items">
            <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
              <Button class="w-10 h-10 p-0" :variant="item.value === pageNumber ? 'default' : 'outline'">
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="'ellipsis-' + index" />
          </template>
          <PaginationNext />
          <PaginationLast />
        </PaginationList>
      </Pagination>
    </div>
  </div>
</template>
