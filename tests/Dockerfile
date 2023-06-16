FROM node:14
WORKDIR /code

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

# Copy other necessary files
COPY src/ ./src/
COPY .prettierignore ./
COPY Dockerfile ./
COPY vite.config.js ./

# Copy test files explicitly
COPY <path_to_test_files> ./   # Specify the path to your test files here

# Add additional configuration or commands if needed

CMD echo "JUST HERE FOR DEVELOPMENT!"
