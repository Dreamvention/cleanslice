# Users-gateway

Dependencies:

- setup
- theme
- api
- common

This slices is responsible to Managing users, just like the users slice

Service architecture type (Domain layer includes Entities, Gateway interfaces and Services)

### Theory (Service)

The Service architecture pattern demonstrates how you should implement the full Clean Architecture pattern with a complete Domain layer and Data layer. You Services will live in you Domain folder. You are required to implement all of the layers accordingly.

```ts
import { UsersService } from '@/domain/services';
const app = useNuxtApp();

// We are using UsersService to fetch User[].
// This is the preferred way to do it.
const items = await app.$di.resolve(UsersService).getUsers();
```

Use this pattern when you are implementing Application logic inside the Domain and require Services. You can add application specific logic into your Services (aka Use Cases) and use them throughout your UI layer.
