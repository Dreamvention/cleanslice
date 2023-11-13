import { defineStore } from 'pinia';
import { pages } from '../pages';
export type IMenuData = {
  id: string;
  title: string;
  link: string;
  active: boolean;
  icon: string;
};

export const useMenu = defineStore('menu', {
  state: () => ({
    items: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        link: pages.dashboard,
        active: false,
        icon: 'mdi-view-dashboard',
      },
    ] as IMenuData[],
  }),
  getters: {
    getItems: (state) => {
      return state.items.map((item) => {
        const route = useRoute();
        if (route?.name) {
          item.active = route.name.toString().includes(item.link) ? true : false;
        }

        return item;
      });
    },
  },
  actions: {
    addItem(item: IMenuData) {
      // required to avoid duplicates from SSR
      const itemExists = this.items.some((existingItem) => existingItem.id === item.id);

      if (!itemExists) {
        this.items.push(item);
      }
    },
  },
});
