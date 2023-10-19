FROM nginx:1.17.10

WORKDIR /
COPY ./gateway/nginx.conf /etc/nginx

ENTRYPOINT ["nginx", "-g", "daemon off;"]