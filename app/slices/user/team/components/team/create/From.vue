<script lang="ts" setup>
const { form, onSubmit } = useFormTeams();

const emits = defineEmits(['submit']);
</script>

<template>
  <form class="space-y-6" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="text" placeholder="Name" />
        </FormControl>
        <FormDescription> Give a public name for the Team</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="codename">
      <FormItem>
        <FormLabel>Codename</FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="text" placeholder="Codename" />
        </FormControl>
        <FormDescription> Give your team a URL codename</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit"> Create team </Button>
  </form>
</template>
