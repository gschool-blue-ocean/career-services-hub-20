FROM node:16-alpine

WORKDIR /code

COPY package*.json ./
RUN npm ci

WORKDIR /code/api/src
COPY . .

EXPOSE 3000
CMD ["npm", "start"]






