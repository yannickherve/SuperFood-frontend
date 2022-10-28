FROM nginx:1.23-alpine

LABEL author="Yannick Dogne" description="Dockerfile superfood"

COPY ./docker/nginx-config/nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY ./docker/nginx-config/proxy.conf /etc/nginx/conf.d/proxy.conf

COPY ./angular/minimal-portfolio/dist/minimal-portfolio /usr/share/nginx/html

ENTRYPOINT ["nginx"]
CMD [ "-g", "daemon off;" ]