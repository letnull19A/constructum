FROM nginx:1.17.10

WORKDIR /
COPY ./test/nginx.conf /etc/nginx

ENTRYPOINT ["nginx", "-g", "daemon off;"]