<script lang="ts" setup>
defineProps<{
  title: {
    type: string | undefined;
    required: false;
  };
  description: {
    type: string | undefined;
    required: false;
  };
  disabled: boolean;
}>();

const emit = defineEmits<{
  (e: 'confirm', value: Boolean): void;
}>();
const open = ref(false);

const handleConfirm = () => {
  open.value = false;
  emit('confirm', true);
};
</script>
<template>
  <Dialog v-model:open="open">
    <DialogTrigger :disabled="disabled">
      <slot />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ title ?? `Are you sure?` }} </DialogTitle>
        <DialogDescription> {{ description ?? `You are about to delete this item.` }}</DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button @click="handleConfirm"> Yes </Button>
        <Button @click="open = false" variant="outline"> No </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
