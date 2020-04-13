FROM node:lts-slim

RUN mkdir -p /cloud_project/back
WORKDIR /cloud_project/back

COPY package*.json /cloud_project/back/

RUN npm install

COPY . /cloud_project/back/

EXPOSE 3000

CMD ["npm", "start"]
