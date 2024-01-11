# Users

Dependencies:

- setup
- theme
- api
- common

This slices is responsible to Managing users.

Simple architecture type (No Domain layer)

### Theory (simple)

The Repository (simple) architecture pattern demonstrates how you can fetch data using only the `ApiRepository`. You can rely on the repository DTOs and use them as interfaces for your components. You don't need to create extra abstractions with Entities, Gateways, Mappers and Services.

```ts
import { ApiRepository } from '@/data/repositories';
const app = useNuxtApp();

// This is the simplest pattern of fetching and providing data.
// The Data object is taken from the API Client as UserDto.
// The UserItemDetails component also accepts UserDto.
// There are no Layers such a Domain and Data inside this slice.
// Use this approach for simple cases and extend to gateways or services
// once you need more control.

const items = await app.$di.resolve(ApiRepository).users.getUsers();
```

Use this pattern when you are prototyping and can rely on the `ApiRepository` because you are also responsible for developing the backend.
