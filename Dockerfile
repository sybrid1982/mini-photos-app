FROM node:lts-alpine
EXPOSE 8080
WORKDIR /app 
COPY package*.json ./
RUN npm install && npm cache clean --force
COPY . .
ARG VUE_APP_BASE_API_URL
ENV VUE_APP_BASE_API_URL=$VUE_APP_BASE_API_URL
RUN npm run build
ENV VUE_APP_PORT=8080
CMD ["node", "server.js"]