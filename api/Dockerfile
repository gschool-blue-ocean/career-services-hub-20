FROM node:16-alpine

WORKDIR /code

COPY package*.json ./
RUN npm ci
COPY . ./api/src/


CMD [ "npm", "run", "dev" ]

