FROM node:16.17.0-bullseye-slim

WORKDIR /services/service.identify
COPY ./services/service.identify/package.json .
COPY ./services/service.identify/tsconfig.json .
COPY ./services/service.identify/.env.production .

WORKDIR /services/service.identify/src
COPY ./services/service.identify/src .

WORKDIR /packages
COPY ./packages .

WORKDIR /services/service.identify
ENV NODE_ENV="production"
RUN ["npm", "i", "-g", "typescript@next"]
RUN ["npm", "i", "-g", "rimraf"]
RUN ["npm", "i"]
RUN ["tsc"]

ENTRYPOINT ["npm", "run", "start"]