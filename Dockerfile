FROM nginx:latest

MAINTAINER kbearer weagles@163.com

COPY html /usr/share/nginx/html
COPY nginx.conf /etc/nginx/

EXPOSE 18080
