FROM node:16.14-slim

RUN apt-get update && apt-get install -y openssl && apt-get install -y netcat

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

CMD ["sh", "./init.sh"]