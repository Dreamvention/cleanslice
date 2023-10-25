import { defineStore } from 'pinia';

export const useProducts = defineStore('products', {
  state: () => ({ count: 2, name: 'Eduardo' }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
