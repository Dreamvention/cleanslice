# App CleanSlice (NUXT)

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Core philosophy

- Screaming architecture
- Abstract when necessary
- Write reusable code
- Test more, debug less

## Install CleanSlice on Nuxt

- install nuxt `npx nuxi@latest init` and name it `app`
- create folder `./slices`

create file in root `./registerSlices.ts`

```ts
import * as fs from 'fs';
export const registerSlices = (): string[] => {
  const slices = fs.readdirSync('./slices');
  if (!slices.length) return [];
  return slices?.filter((slice) => fs.existsSync(`./slices/${slice}`)).map((slice) => `./slices/${slice}`);
};
```

add to root `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  //...
  extends: [...registerSlices()],
});
```

## Slices

- [Setup](./slices/setup/readme.md)
- [Api](./slices/api/readme.md)
- [Theme](./slices/theme/readme.md)
- [Capacitor](./slices/capacitor/readme.md)
- [Common](./slices/common/readme.md)
- [Users with Repository](./slices/users/readme.md)
- [Users with Gateway](./slices/users-gateway/readme.md)
- [Users with Service](./slices/users-service/readme.md)

## Theory

There are three examples of structuring your app slice code.

1. Repository (simple)
2. Gateway
3. Service

### Simple

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

### Gateway

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

### Service

The Service architecture pattern demonstrates how you should implement the full Clean Architecture pattern with a complete Domain layer and Data layer. You Services will live in you Domain folder. You are required to implement all of the layers accordingly.

```ts
import { UsersService } from '@/domain/services';
const app = useNuxtApp();

// We are using UsersService to fetch User[].
// This is the preferred way to do it.
const items = await app.$di.resolve(UsersService).getUsers();
```

Use this pattern when you are implementing Application logic inside the Domain and require Services. You can add application specific logic into your Services (aka Use Cases) and use them throughout your UI layer.

### Which pattern to start with?

Start by implementing the simple pattern if you are also developing the API. You can rapidly prototype your application without having to write lots of abstractions and can take advantage of the OpenAPI CodeGen feature ([Api slice](./slices/api/readme.md))

If you are not in control of the API, you can start with the Gateway pattern. This allows you to add a layer of abstraction on top of a Repository, that is often a third-party SDK.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

### Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
