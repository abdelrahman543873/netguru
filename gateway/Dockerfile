FROM node:16

COPY package*.json ./

RUN yarn

COPY . .

ENV DOCKER_MOVIES_HOST=movies

CMD [ "yarn", "start" ]
