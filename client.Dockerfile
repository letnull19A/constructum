FROM node:20-bullseye-slim as builder

WORKDIR /packages
COPY ./packages .

WORKDIR /services/service.client
COPY ./services/service.client .
RUN ["npm", "i", "-g", "typescript@next"]
RUN ["npm", "i", "-g", "rimraf"]
RUN ["npm", "i"]
RUN ["npm", "run", "build"]

FROM nginx:1.17.10

WORKDIR /usr/share/nginx/
RUN rm -rf html
RUN mkdir html

WORKDIR /usr/share/nginx/html
RUN mkdir docs

WORKDIR /
COPY ./nginx/* /etc/nginx
COPY --from=builder ./services/service.client/dist/* /usr/share/nginx/html
COPY ./services/service.docs/public/* /usr/share/nginx/html/docs

# RUN ["nginx", "-t"]

ENTRYPOINT ["nginx", "-g", "daemon off;"]