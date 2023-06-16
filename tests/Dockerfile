FROM node:14

WORKDIR /code

# Copy package.json and package-lock.json
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy the remaining files
COPY . .

# Set the command to run the tests
CMD ["api:8000", "npm", "test"]

