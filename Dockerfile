FROM node:22

RUN npm install --global @forge/cli
RUN forge settings set usage-analytics true
WORKDIR /app
COPY . .
RUN npm install

WORKDIR /app/static/cloud-developer-inverview
RUN npm install
RUN npm run build

WORKDIR /app
ENTRYPOINT ["forge", "deploy", "-e", "production"]
