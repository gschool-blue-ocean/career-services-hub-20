FROM node:16-alpine

WORKDIR /code/app

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY src/ /code/app/src/
COPY faker.mjs /code/app/
COPY vite.config.js /code/app/

EXPOSE 3000
CMD ["npm", "start"]














