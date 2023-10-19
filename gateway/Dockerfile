FROM nginx:1.17.10

WORKDIR /
COPY nginx.conf /etc/nginx

ENTRYPOINT ["nginx", "-g", "daemon off;"]