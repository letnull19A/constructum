FROM node:20-bullseye-slim

WORKDIR /tests
COPY ./tests/* .

RUN ["npm", "i", "-g", "typescript@next"]
RUN ["npm", "i", "-g", "rimraf"]
RUN ["npm", "i"]

ENTRYPOINT ["npm", "run", "test"]