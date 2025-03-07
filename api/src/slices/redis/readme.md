# Radis

Reponsible for managing Radis cache. Can be used with AWS ElastiCache with Radis.

### Install

run `npm install redis`

### Terraform

I am not using terraform for this service since the AWS ElastiCache is too expensive ($90 per month min). Instead I am using a free version from https://upstash.com

- https://console.upstash.com/redis/b273d465-1745-463a-ac40-e1bfb1378fda

in .env pass set the environment

```bash
REDIS_URL="rediss://default:<PASSWORD>@immortal-hagfish-44090.upstash.io:6379"
REDIS_EXPIRE="86400" #60*60*24 = 1 day
```

### Docker

Docker is very easy to setup. add to you docker-compose.yml file

```yml
redis-local:
  image: redis:latest
  ports:
    - '6379:6379'
```

in .env set

```bash
REDIS_URL="redis://localhost:6379"
REDIS_EXPIRE="86400" #60*60*24 = 1 day
```
