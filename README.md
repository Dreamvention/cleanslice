# Setup APP

- run `npm create vuetify` and name it `app`
- run `nest new api`
- run `npm install --save @nestjs/swagger`
- create folder `core` in root

# Setup API

# Setup Prisma (Database)

# File structure

# Beaufactor

- Do:

```js
const [password, salt] = user.password.split('.');
```

- Don't:

```js
const parts = user.password.split('.');
password = parts[0];
salt = parts[1];
```
