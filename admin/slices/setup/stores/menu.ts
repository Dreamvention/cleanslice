import { defineStore } from 'pinia';

export const useMenu = defineStore('menu', {
  state: () => ({
    items: [] as string[],
  }),
  getters: {
    getItems: (state) => state.items,
  },
  actions: {
    addItem(item: string) {
      this.items.push(item);
    },
  },
});
