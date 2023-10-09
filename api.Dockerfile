FROM node:20-bullseye-slim

WORKDIR /services/service.api
COPY ./services/service.api/package.json .
COPY ./services/service.api/tsconfig.json .
COPY ./services/service.api/keys ./keys
COPY ./services/service.api/.env.production .

WORKDIR /services/service.api/src
COPY ./services/service.api/src .

WORKDIR /packages
COPY ./packages .

WORKDIR /services/service.api
ENV NODE_ENV="production"
RUN ["npm", "i", "-g", "typescript@next"]
RUN ["npm", "i", "-g", "rimraf"]
RUN ["npm", "i"]
RUN ["tsc"]

ENTRYPOINT ["npm", "run", "start"]