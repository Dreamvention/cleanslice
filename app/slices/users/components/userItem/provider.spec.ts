// @vitest-environment nuxt

import { describe, test, expect } from 'vitest';
import { mountSuspended } from 'nuxt-vitest/utils';
import { globalOptions } from '@/slices/test/globalOptions';

import UserItemProvider from './Provider.vue';

describe('users/components/userItem/Provider.vue', () => {
  test('renders UserItemProvider', async () => {
    expect(UserItemProvider).toBeTruthy();

    const wrapper = await mountSuspended(UserItemProvider, {
      global: globalOptions,
    });

    expect(wrapper.html()).contains('John Doe');
  });
});
