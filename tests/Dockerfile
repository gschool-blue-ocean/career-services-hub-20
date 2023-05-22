FROM node:14
WORKDIR /code
COPY package*.json .
RUN npm install
COPY . .
CMD ["./wait-for.sh", "api:8000", "npm", "test"]