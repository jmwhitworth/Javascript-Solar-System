FROM node:20 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --omit=dev

COPY . .
RUN npm run build


FROM node:20-slim AS runner

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist /app/dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
