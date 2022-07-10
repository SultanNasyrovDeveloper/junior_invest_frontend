FROM node:15.13-alpine as build
WORKDIR /app
COPY . .
RUN npm install --silent
RUN npm run build
