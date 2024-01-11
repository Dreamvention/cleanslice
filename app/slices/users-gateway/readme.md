# Users-gateway

Dependencies:

- setup
- theme
- api
- common

This slices is responsible to Managing users, just like the users slice

Gateway architecture type (Domain layer only with Entities and Gateway interfaces)

### Theory (gateway)

The Gateway architecture pattern demonstrates how you should implement the basic Clean Architecture pattern with Entities and Gateway Interfaces in the Domain and Gateways and Mappers in the Data layers. You are not required to create extra abstraction with Services.

```ts
import { UsersGateway } from '@/data/gateways';
import { User } from '@/domain/entities';
const app = useNuxtApp();

// We are using UsersGateway to fetch IUserData[] and then are mapping it to a User Entity inside the component.
// This may be ok in a case like this where there is little to no logic.
// If you notice that you are doing more logic inside the component, move it to a dedicated UsersService.
const items = (await app.$di.resolve(UsersGateway).getUsers()).map((item) => new User(item));
```

Use this pattern when you are implementing Business logic inside the Domain and require Entities. You can choose to skip creating Services, if you plan only to fetch Data through your Gateways. You will also have to implement this pattern if you need FilterOptions.
