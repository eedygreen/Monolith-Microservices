# Use NodeJS base image
FROM node:12

ARG POSTGRES_USERNAME
ARG POSTGRES_PASSWORD
ARG POSTGRES_HOST
ARG POSTGRES_DB
ARG AWS_BUCKET
ARG AWS_REGION
ARG AWS_PROFILE
ARG JWT_SECRET
ARG URL

ENV POSTGRES_USERNAME=${POSTGRES_USERNAME} POSTGRES_PASSWORD=${POSTGRES_PASSWORD} POSTGRES_HOST=${POSTGRES_HOST} POSTGRES_DB=${POSTGRES_DB} AWS_BUCKET=${AWS_MEDIA_BUCKET} AWS_REGION=${AWS_REGION} AWS_PROFILE=${AWS_PROFILE} JWT_SECRET=${JWT_SECRET} URL=${URL}

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies by copying
# package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm i

# Copy app source
COPY . .

# Expose port 8080 for the api connection
EXPOSE 8080

# Define the Docker image's behavior at runtime
CMD [ "npm", "run", "prod" ]