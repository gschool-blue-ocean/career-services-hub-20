FROM node:16-alpine

WORKDIR /code/app

COPY package*.json ./
RUN npm ci

COPY . /code/app/

EXPOSE 3000
CMD ["npm", "start"]












