FROM node:alpine

ENV NODE_ENV="production"

EXPOSE 11261

COPY . /app/compiler

WORKDIR /app/compiler
RUN ["npm", "i", "-g", "typescript@next"]
RUN ["npm", "i", "-g", "rimraf"]
RUN ["npm", "i"]

ENTRYPOINT ["npm", "run", "start"]