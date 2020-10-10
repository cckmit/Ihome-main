FROM nginx:latest

MAINTAINER kbearer weagles@163.com

COPY html/ /usr/share/nginx/html/

EXPOSE 18080
