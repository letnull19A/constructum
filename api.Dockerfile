FROM node:16.17.0-bullseye-slim

ENV NODE_ENV="production"

EXPOSE 7301

COPY ./api ./app/api
COPY ./packages ./app/packages

WORKDIR /app/api
RUN ["npm", "i", "-g", "typescript@next"]
RUN ["npm", "i", "-g", "rimraf"]
RUN ["npm", "i"]

ENTRYPOINT ["npm", "run", "start"]