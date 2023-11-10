// mocks/handlers
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Define your request handlers here
  http.get('http://localhost:3333/users', () => {
    return HttpResponse.json([
      {
        id: 1,
        name: 'John Doe2',
        email: 'testuser@email.com',
        password: '123456',
        createdAt: '2023-10-22T13:31:52.160Z',
        updatedAt: '2023-10-25T23:26:51.977Z',
      },
      {
        id: 2,
        name: 'John Doe',
        email: 'testuser@email.com',
        password: '123456',
        createdAt: '2023-10-25T23:26:06.646Z',
        updatedAt: '2023-10-25T23:26:06.646Z',
      },
    ]);
  }),
  // ...other handlers
];
