FROM node:22-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

EXPOSE 3000

CMD ["npx", "nodemon", "--watch", ".", "--ext", "ts,js", "--exec", "ts-node", "src/main.ts"]
