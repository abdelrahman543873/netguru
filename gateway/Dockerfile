FROM node:16

COPY package*.json ./

RUN yarn

COPY . .

ENV DOCKER_MOVIES_HOST=movies

ENV DOCKER_HOST=app

CMD [ "yarn", "start" ]
