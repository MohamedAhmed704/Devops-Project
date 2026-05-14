# stage 1
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# stage 2 (production only)
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app .

EXPOSE 5000

CMD ["node", "index.js"]
