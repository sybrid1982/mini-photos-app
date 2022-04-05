FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install && npm cache clean --force
COPY . .
RUN npm run build

FROM nginx as runtime
COPY --from=build /app/dist /usr/share/nginx/html