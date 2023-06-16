FROM node:16-alpine

WORKDIR /code

COPY package*.json ./
RUN npm install

COPY . ./api/src

CMD [ "npm", "run", "dev" ]

