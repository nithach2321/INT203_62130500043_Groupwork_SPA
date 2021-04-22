FROM node:15.14.0-alpine3.10
 
WORKDIR /app
 
COPY package.json package.json
COPY package-lock.json package-lock.json
 
RUN npm instal
 
COPY . .

CMD [ "npm", "run build" ]
CMD [ "npm", "run serve" ]