
FROM node:18-alpine AS builder


WORKDIR /app


COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

# Build the React app
RUN npm run build


FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/build /app/build

RUN npm install -g serve


CMD ["serve", "-s", "build"]
