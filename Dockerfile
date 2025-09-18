FROM node:18

RUN npm install --global @forge/cli
RUN forge settings set usage-analytics true

WORKDIR /app
COPY package.json package-lock.json manifest.yml src/ ./
RUN npm install

COPY static/cloud-developer-inverview/ static/cloud-developer-inverview/
WORKDIR /app/static/cloud-developer-inverview
RUN npm install
RUN npm run build

WORKDIR /app

RUN forge deploy -e production
