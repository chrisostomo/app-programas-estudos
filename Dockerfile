FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN yarn install && yarn run build
RUN yarn run build

ENTRYPOINT ["yarn", "run"]
CMD [ "start" ]