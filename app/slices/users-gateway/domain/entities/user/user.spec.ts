// @vitest-environment node

import { describe, test, expect } from 'vitest';
import { User, IUserData } from './';

describe('Users > Domain > Entities', () => {
  test('User', async () => {
    const data: IUserData = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
    };

    const user = new User(data);

    expect(user.id).toBe(1);
  });
});
