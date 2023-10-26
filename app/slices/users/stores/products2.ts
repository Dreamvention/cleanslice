import { defineStore } from 'pinia';

export const useProducts2 = defineStore('products2', {
  state: () => ({ count: 4, name: 'Eduardo' }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
