import { defineStore } from 'pinia';
import { pages } from '../pages';

export enum MenuGroupTypes {
  Project = 'project',
  Playground = 'playground',
  Account = 'account',
  Resources = 'resources',
}
export type IMenuData = {
  id: string;
  group?: MenuGroupTypes;
  title: string;
  link: string;
  active: boolean;
  icon: string;
  sortOrder: number;
  isPolling: boolean;
};

export const useMenuStore = defineStore('menu', {
  state: () => ({
    sidebar: [
      // {
      //   id: 'dashboard',
      //   group: MenuGroupTypes.Project,
      //   title: 'Dashboard',
      //   link: pages.dashboard,
      //   active: false,
      //   icon: 'LayoutDashboard',
      //   isPolling: false,
      //   sortOrder: 1,
      // },
    ] as IMenuData[],
    items: [
      // {
      //   id: 'dashboard',
      //   title: 'Dashboard',
      //   link: pages.dashboard,
      //   active: false,
      //   icon: 'LayoutDashboard',
      //   isPolling: false,
      //   sortOrder: 1,
      // },
    ] as IMenuData[],
  }),
  getters: {
    getSidebar: (state) => {
      return state.sidebar
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((item) => {
          const route = useRoute();
          if (route?.name) {
            item.active = route.name.toString() === item.link ? true : false;
          }

          return item;
        });
    },
    getItems: (state) => {
      return state.items
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((item) => {
          const route = useRoute();
          if (route?.name) {
            item.active = route.name.toString() === item.link ? true : false;
          }

          return item;
        });
    },
  },
  actions: {
    addSidebar(item: IMenuData) {
      // required to avoid duplicates from SSR
      const itemExists = this.sidebar.some(
        (existingItem) => existingItem.id === item.id && existingItem.group === item.group,
      );

      if (!itemExists) {
        this.sidebar.push(item);
      }
    },
    addItem(item: IMenuData) {
      // required to avoid duplicates from SSR
      const itemExists = this.items.some((existingItem) => existingItem.id === item.id);

      if (!itemExists) {
        this.items.push(item);
      }
    },
  },
});
