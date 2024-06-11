FROM node:14-alpine3.15

EXPOSE 3000

COPY . .

RUN npm install

RUN npm run build 

CMD [ "npm","start" ]
