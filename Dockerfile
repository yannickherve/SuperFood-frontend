FROM nginx:1.23-alpine

LABEL author="Yannick Dogne" description="Dockerfile superfood"

COPY ./docker/nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY ./docker/proxy.conf /etc/nginx/conf.d/proxy.conf

COPY ./dist/super-food-frontend /usr/share/nginx/html

ENTRYPOINT ["nginx"]
CMD [ "-g", "daemon off;" ]