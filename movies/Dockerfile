FROM node:16

COPY package*.json ./

RUN yarn

COPY . .

ENV MONGO_DB=mongodb://movies-mongo:27017/netguru

ENV DOCKER_MOVIES_HOST=movies

CMD [ "yarn", "start" ]
