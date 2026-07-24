# --- Build stage: compile TypeScript to JS ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm ci
COPY agents ./agents
COPY core ./core
COPY config ./config
RUN npm run build

# --- Runtime stage: production deps + compiled output only ---
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
CMD ["node", "dist/core/orchestrator.js"]
