FROM node:16

COPY package*.json ./

RUN yarn

COPY . .

ENV MONGO_DB=mongodb://movies-mongo:27017/netguru

CMD [ "yarn", "start" ]
