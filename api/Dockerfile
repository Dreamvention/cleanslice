FROM node:22-alpine AS builder

WORKDIR /app

# Установите необходимые зависимости для openssl
RUN apk add --no-cache openssl

COPY package.json package-lock.json ./
RUN npm i

COPY . .

RUN npx prisma generate
RUN npm run build

FROM node:22-alpine

WORKDIR /app

# Install dependency for openssl
RUN apk add --no-cache openssl

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json prisma ./

RUN npm install -g prisma

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "run", "start:prod"]
