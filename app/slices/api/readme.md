# Api

Dependencies:

- setup

### Install Axios

Run in terminal

```bash
npm i -D axios axios-retry
```

### Install CodeGen

Run in terminal

```bash
npm i -D openapi-typescript-codegen
```

Add to `package.json`

```json
{
  "scripts": {
    //...
    "build:api": "sh ./slices/api/build.sh",
    "dev": "npm run build:api && nuxt dev"
  }
}
```

Add file `./data/repositories/api/api.repository.ts`

```ts
/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { injectable, inject } from 'tsyringe';
import type { OpenAPIConfig } from './core/OpenAPI';
import { ApiAxios } from '../../../apiAxios';
import { ApiClient } from './ApiClient';

@injectable()
export class ApiRepository extends ApiClient {
  constructor(@inject('apiConfig') config: Partial<OpenAPIConfig>) {
    super(config, ApiAxios);
  }
}
```

Add file `./data/repositories/index.ts`

```ts
export * from './api/api.repository';
```

Create file `api.config.ts` in `rootDir/configs`

```ts
export const apiConfig = {
  BASE: 'http://localhost:3333',
  VERSION: '1.0',
  WITH_CREDENTIALS: false,
  CREDENTIALS: 'include',
  TOKEN: undefined,
  USERNAME: undefined,
  PASSWORD: undefined,
  HEADERS: undefined,
  ENCODE_PATH: undefined,
};
```

### How to use API in slices

In other slices to use `@/data/repository/api` copy the following 2 files

- `data/repositories/api.ts`

```ts
/** This is a proxy Api Repository
 *  Install @slices/api
 */

export * from '@/slices/api/data/repositories/api/api.repository';
export * from '@/slices/api/data/repositories/api';
```

- `data/repositories/index.ts`

```ts
export * from './api';
```
