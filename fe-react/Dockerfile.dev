FROM node:14.14.0-alpine
WORKDIR /home/app
COPY package.json .
RUN npm i 
COPY . .
CMD ["npm", "start"]