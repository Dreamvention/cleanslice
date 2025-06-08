import { defineStore } from 'pinia';
import { AuthService, UserDto } from '#api/data';

export const useAccountStore = defineStore('account', {
  state: () => ({
    user: null as null | UserDto,
    loading: false,
  }),

  getters: {
    getUser: (state) => {
      return state.user;
    },
    isLoading: (state) => state.loading,
  },
  actions: {
    async init() {
      console.log('account init start...');
      this.fetchAccount();
      console.log('account init finished...');
    },

    async fetchAccount() {
      try {
        this.loading = true;
        const response = await AuthService.me();
        if (response.data?.data) {
          this.user = response.data.data;
        }
        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    },
  },
});
