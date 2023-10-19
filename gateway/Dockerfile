FROM nginx:1.17.10

WORKDIR /usr/share/nginx/
RUN rm -rf html

WORKDIR /
COPY ./nginx.conf /etc/nginx

ENTRYPOINT ["nginx", "-g", "daemon off;"]