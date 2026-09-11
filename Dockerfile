# syntax=docker/dockerfile:1

# ---- Base ----
FROM node:22-alpine AS base
WORKDIR /usr/src/app
RUN apk add --no-cache dumb-init

# ---- Dependencies ----
FROM base AS deps
COPY package*.json ./
RUN npm ci

# ---- Build ----
FROM base AS build
COPY package*.json tsconfig.json next.config.ts ./
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY public ./public
COPY src ./src
RUN npm run build

# ---- Runtime ----
FROM base AS runtime
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=build /usr/src/app/public ./public
COPY --from=build /usr/src/app/.next/standalone ./
COPY --from=build /usr/src/app/.next/static ./.next/static
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
