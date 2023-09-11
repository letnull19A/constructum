FROM node:alpine

EXPOSE 11261

COPY ./compiler /app/compiler
COPY ./packages ./app/packages

WORKDIR /app/compiler
RUN ["npm", "i", "-g", "typescript@next"]
RUN ["npm", "i", "-g", "rimraf"]
RUN ["npm", "i"]

ENTRYPOINT ["npm", "run", "start"]