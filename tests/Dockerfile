FROM node:20-bullseye-slim

WORKDIR /tests
COPY . .

RUN ["npm", "i", "-g", "typescript"]
RUN ["npm", "i"]

ENTRYPOINT ["npm", "run", "test"]