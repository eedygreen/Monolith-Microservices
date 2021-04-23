FROM node:13-alpine as build

WORKDIR /usr/src/app

# package.json and package-lock.json
COPY package*.json ./

# Install ionic framework
RUN npm install -g ionic@5

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Build the App
RUN ionic build

# using nginx server
# FROM nginx:alpine

# Remove previous nginx files
# RUN rm -rf /usr/share/nginx/html/*

# Add the biuld to nginx path
# COPY --from=build /usr/src/app/www /usr/share/nginx/html/

EXPOSE 8080

CMD ["ng", "start"]
