# configure container
FROM node:8

# install and update system dependencies
RUN apt-get update
RUN apt-get install -y zip curl vim
RUN npm install -g pm2

# create api directory
RUN mkdir -p /www/mkrn-starter-apipm2
WORKDIR /www/mkrn-starter-api
COPY . /www/mkrn-starter-api

# install application
RUN yarn install

# add source
EXPOSE 3000
CMD ["pm2", "start", "--no-daemon", "index.js"]
