FROM node:alpine

COPY . ./app/packages

WORKDIR /app/packages

WORKDIR constructum-interfaces
RUN ["npm", "i"]
RUN ["npm", "run", "build"]

WORKDIR ../constructum-compiler
RUN ["npm", "i"]
RUN ["npm", "run", "build"]
