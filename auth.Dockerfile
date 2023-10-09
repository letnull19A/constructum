FROM node:20-bullseye-slim

WORKDIR /services/service.auth
COPY ./services/service.auth/package.json .
COPY ./services/service.auth/tsconfig.json .
COPY ./services/service.auth/keys ./keys
COPY ./services/service.auth/.env.production .

WORKDIR /services/service.auth/src
COPY ./services/service.auth/src .

WORKDIR /packages
COPY ./packages .

WORKDIR /services/service.auth
ENV NODE_ENV="production"
RUN ["npm", "i", "-g", "typescript@next"]
RUN ["npm", "i", "-g", "rimraf"]
RUN ["npm", "i"]
RUN ["tsc"]

ENTRYPOINT ["npm", "run", "start"]