export { default as Modal } from './Modal.vue';
export { default as ModalHeader } from './ModalHeader.vue';
export { default as ModalFooter } from './ModalFooter.vue';
export { default as ModalSidebar } from './ModalSidebar.vue';
import { RouteLocationRaw } from '#vue-router';

export type ISidebarItem = {
  id: string;
  group?: string;
  title: string;
  to?: RouteLocationRaw;
  active: boolean;
  icon?: string;
  sortOrder: number;
  isPolling?: boolean;
};
