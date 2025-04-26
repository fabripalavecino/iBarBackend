# Stage 1: Build
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./


ENV NODE_ENV=development
RUN npm install

COPY . .

RUN npm run compile

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

ENV NODE_ENV=production
RUN npm install --production

COPY --from=builder /app/dist ./dist

EXPOSE 5000

CMD ["node", "dist/server.js"]
