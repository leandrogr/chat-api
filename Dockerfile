FROM node:14.18.1-alpine3.14

RUN apk add --no-cache bash

RUN npm i -g @nestjs/cli@8.0.0

USER node

WORKDIR /home/node/app