FROM node:16.17.0-bullseye-slim

ENV NODE_ENV="production"

EXPOSE 3005

COPY ./services/service.auth /app/auth
COPY ./packages ./app/packages

WORKDIR /app/auth
RUN ["npm", "i", "-g", "typescript@next"]
RUN ["npm", "i", "-g", "rimraf"]
RUN ["npm", "i"]

ENTRYPOINT ["npm", "run", "start"]