FROM node:16

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./

RUN yarn --silent

COPY . ./

RUN yarn build

CMD ["yarn", "start"]