FROM node:lts-slim

RUN npm install -g @angular/cli

RUN mkdir -p /cloud_project/front
WORKDIR /cloud_project/front

COPY package*.json /cloud_project/front/

RUN npm install

COPY . /cloud_project/front/

EXPOSE 4200

CMD ["npm", "start"]
