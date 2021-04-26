# Use NodeJS base image
FROM node:13

# Create app directory
WORKDIR /usr/app

# Install app dependencies by copying
# package.json and package-lock.json
COPY package.json /usr/app/

# Install dependencies
RUN npm install

# Copy app source
COPY /src /usr/app

RUN npm run build

# Expose port 8080 for the api connection
EXPOSE 8080

# Define the Docker image's behavior at runtime
CMD [ "npm", "run", "prod" ]