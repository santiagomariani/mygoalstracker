
# BUILD ENVIRONMENT
# base image
FROM alpine:latest as build

# install nodejs
RUN apk add --update nodejs nodejs-npm

WORKDIR /app

# This is to install all the dependencies
COPY package.json ./
COPY package-lock.json ./

# install dependencies
RUN npm install

# copy the rest of the files
COPY . ./

# build
RUN npm run build

########################

# PRODUCTION ENVIRONMENT

# this image comes with nginx
FROM nginx:stable-alpine

# lets copy static react files
COPY --from=build /app/build /usr/share/nginx/html

# delete default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# my nginx config
COPY react-nginx.template /etc/nginx/conf.d 

COPY docker-entrypoint.sh /

ENTRYPOINT ["sh", "/docker-entrypoint.sh"]
