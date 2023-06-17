FROM node:alpine

ENV NODE_ENV="production"

EXPOSE 7301

WORKDIR /app/api
COPY ["/api", "."]

WORKDIR /app/packages
COPY ["/packages", "."]

WORKDIR /app/api
RUN ["npm", "i", "-g", "typescript@next"]
RUN ["npm", "i", "-g", "rimraf"]
RUN ["npm", "i"]

ENTRYPOINT ["npm", "run", "start"]