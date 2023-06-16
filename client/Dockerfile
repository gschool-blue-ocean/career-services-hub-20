FROM node:16-alpine
WORKDIR /code

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./
RUN npm ci

# Copy other necessary files
COPY src/ ./src/
COPY .prettierignore ./
COPY Dockerfile ./
COPY vite.config.js ./

EXPOSE 3000
CMD echo "JUST HERE FOR DEVELOPMENT!"


