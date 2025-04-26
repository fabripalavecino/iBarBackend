FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

# Compile TypeScript
RUN npm run compile

EXPOSE 5000

CMD ["node", "dist/server.js"]
