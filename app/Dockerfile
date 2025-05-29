FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ARG API_URL

RUN API_URL=${API_URL} npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
