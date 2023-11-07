# Api

Dependencies:

- setup

### CodeGen

run `npm i -D openapi-typescript-codegen`

add to `package.json`

```json
{
  "scripts": {
    //...
    "build:api": "sh ./slices/setup/build.sh",
    "dev": "npm run build:api && nuxt dev"
  }
}
```

add file `./data/repositories/api/api.repository.ts`

```ts
/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { injectable, inject } from 'tsyringe';
import type { OpenAPIConfig } from './core/OpenAPI';
import { ApiAxios } from '@/slices/setup/apiAxios';
import { ApiClient } from './ApiClient';

@injectable()
export class ApiRepository extends ApiClient {
  constructor(@inject('apiConfig') config: Partial<OpenAPIConfig>) {
    super(config, ApiAxios);
  }
}
```

add file `./data/repositories/index.ts`

```ts
export * from './api/api.repository';
```

### Axios

run `npm i -D axios axios-retry`
