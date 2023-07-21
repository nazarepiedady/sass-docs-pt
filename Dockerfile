FROM node:16

WORKDIR /app

COPY . /app
RUN npm install

CMD npm run serve
