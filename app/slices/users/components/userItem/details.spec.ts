// @vitest-environment nuxt

import { describe, test } from 'vitest';
import { mountSuspended } from 'nuxt-vitest/utils';
import { globalOptions } from '@/slices/test/globalOptions';

import { UserDto } from '@/slices/users/data/repositories';
import UserItemDetails from './Details.vue';

import { pages } from '@/slices/users/pages';

describe('users/components/UserItem/Details.vue', () => {
  test('renders UserItemDetails', async ({ expect }) => {
    expect(UserItemDetails).toBeTruthy();

    const user: UserDto = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
    };

    const wrapper = await mountSuspended(UserItemDetails, {
      props: {
        item: user,
      },
      ...globalOptions,
    });

    expect(wrapper.findComponent({ name: 'VCard' }).props('title')).toBe(user.name);
    expect(wrapper.findComponent({ name: 'VCard' }).props('subtitle')).toBe(user.email);
    expect(wrapper.text()).toMatchInlineSnapshot('""');
  });
});
