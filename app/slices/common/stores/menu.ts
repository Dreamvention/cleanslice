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
      // required to avoid duplicates from SSR
      if (this.items.indexOf(item) === -1) {
        this.items.push(item);
      }
    },
  },
});
