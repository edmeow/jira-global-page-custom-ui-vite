FROM node:20-alpine
WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 80
ENTRYPOINT ["npm", "run", "preview"]
