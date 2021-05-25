FROM node:14.14.0-alpine AS build

WORKDIR /home/app
COPY package*.json .
RUN npm i 
COPY . .
RUN npm run build

FROM nginx:lastest 
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build  /home/app/build /usr/share/nginx/html
