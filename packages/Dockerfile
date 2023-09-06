FROM node:alpine

COPY . ./app/packages

WORKDIR /app/packages

WORKDIR /app/packages/constructum-interfaces
RUN ["npm", "i"]
RUN ["npm", "run", "build"]

WORKDIR /app/packages/constructum-compiler
RUN ["npm", "i"]
RUN ["npm", "run", "build"]
