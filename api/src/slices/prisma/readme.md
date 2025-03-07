# Prisma

Responsible for managing the SQL database.

### Install

run in terminal

```bash
npm i @prisma/client
npm i -D prisma
```

add to `package.json`

```json
{
  "scripts": {
    //...
    "predev": "npm run migrate",
    "premigrate": "npx prisma-import --force",
    "migrate": "dotenv -e .env.dev -- npx prisma migrate dev && dotenv -e .env.dev -- npx prisma generate"
  },
  //...
  "prisma": {
    "import": {
      "schemas": "./**/!(schema).prisma",
      "output": "./prisma/schema.prisma"
    }
  }
}
```
