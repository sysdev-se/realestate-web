# Build: install dependencies and run `nuxt build` (also type-checks).
FROM node:22-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Run: .output is self-contained, so no node_modules are needed.
FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build --chown=node:node /app/.output ./.output
USER node
# Cloud Run sets PORT (8080); Nitro listens on it.
EXPOSE 8080
CMD ["node", ".output/server/index.mjs"]
