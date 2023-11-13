// @vitest-environment nuxt

import { describe, test, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '@/slices/test';
import { globalOptions } from '@/slices/test/globalOptions';
import { mountSuspended } from 'nuxt-vitest/utils';
import { apiConfig } from '@/configs/api.config';
import UserListProvider from './Provider.vue';
import { UserDto } from '@/slices/users/data/repositories';

describe('users/components/userList/Provider.vue', () => {
  test('renders UserListProvider', async () => {
    expect(UserListProvider).toBeTruthy();

    const response: UserDto[] = [
      {
        id: 1,
        name: 'John Doe',
        email: 'testuser@email.com',
        createdAt: '2023-10-22T13:31:52.160Z',
        updatedAt: '2023-10-25T23:26:51.977Z',
      },
    ];
    server.use(http.get(`${apiConfig.BASE}/users`, () => HttpResponse.json(response)));

    const wrapper = await mountSuspended(UserListProvider, {
      ...globalOptions,
    });

    expect(wrapper.html()).contains(response[0].name);
    // expect(wrapper.html()).toContain('v-card');
  });
});
