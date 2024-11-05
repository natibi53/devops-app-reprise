FROM nginx:1.27.2-alpine
LABEL authors="natibi53"

ENV NGINX_VERSION=1.27.2

COPY dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]