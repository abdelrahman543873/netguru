FROM node:16

COPY package*.json ./

RUN yarn

COPY . .

CMD [ "yarn", "start" ]
