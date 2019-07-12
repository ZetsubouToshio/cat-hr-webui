FROM nginx:1.16
RUN mkdir -p /etc/nginx/volume
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY build /usr/share/nginx/html
