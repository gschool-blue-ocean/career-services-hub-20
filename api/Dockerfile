FROM node:16-alpine

WORKDIR /code

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY src/ ./src/
COPY faker.mjs ./
COPY vite.config.js ./

EXPOSE 3000
CMD ["npm", "start"]














