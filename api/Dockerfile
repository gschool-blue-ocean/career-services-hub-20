FROM node:16-alpine

WORKDIR /code/api

COPY package*.json ./
RUN npm ci

COPY . /code/api/

EXPOSE 3000
CMD ["npm", "start"]











