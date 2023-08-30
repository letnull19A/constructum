FROM node:alpine

EXPOSE 7301

COPY . ./app/client

RUN ["npm", "i"]
RUN ["npm", "run", "build"]

ENTRYPOINT ["npm", "run", "preview"]