FROM node:alpine

ENV NODE_ENV="production"

EXPOSE 11261

WORKDIR /app/auth
COPY ["/auth", "."]

WORKDIR /app/packages
COPY ["/packages", "."]

WORKDIR /app/auth
RUN ["npm", "i", "-g", "typescript@next"]
RUN ["npm", "i", "-g", "rimraf"]
RUN ["npm", "i"]

ENTRYPOINT ["npm", "run", "start"]