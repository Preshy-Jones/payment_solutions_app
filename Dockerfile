FROM node:14-alpine as dev

RUN apk --update add postgresql-client

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:14-alpine as prod

RUN apk --update add postgresql-client

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=dev /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
