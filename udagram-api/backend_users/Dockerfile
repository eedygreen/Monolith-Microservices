# Use NodeJS base image
FROM node:13

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies by copying
# package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .
# build app
RUN npm run tsc

# Expose port 8080 for the api connection
EXPOSE 8080

# Define the Docker image's behavior at runtime
CMD [ "npm", "run", "dev" ]