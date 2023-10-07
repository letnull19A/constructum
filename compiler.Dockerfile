FROM node:16.17.0-bullseye-slim

WORKDIR /services/service.compiler
COPY ./services/service.compiler/package.json .
COPY ./services/service.compiler/tsconfig.json .
COPY ./services/service.compiler/.env.production .

WORKDIR /services/service.compiler/src
COPY ./services/service.compiler/src .

WORKDIR /packages
COPY ./packages .

WORKDIR /services/service.compiler
ENV NODE_ENV="production"
RUN ["npm", "i", "-g", "typescript@next"]
RUN ["npm", "i", "-g", "cross-env"]
RUN ["npm", "i", "-g", "rimraf"]
RUN ["npm", "i"]
RUN ["tsc"]

ENTRYPOINT ["npm", "run", "start"]