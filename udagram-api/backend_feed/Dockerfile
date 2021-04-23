FROM node:13

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Install app dependencies by copying package.json and package-lock.json
COPY package*.json /usr/src/app/

# Install dependencies
RUN npm install

# Copy app source
COPY . /usr/src/app

RUN npm run tsc

# Bind the port that the image will run on
EXPOSE 8080

# Define the Docker image's behavior at runtime
CMD ["node", "run", "dev"]