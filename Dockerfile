# syntax=docker.io/docker/dockerfile:1

FROM node:20-alpine AS base

# Install dependencies globally (as before)
RUN apk add --no-cache libc6-compat \
    && npm install -g pnpm

# Builder stage (as before)
FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile
RUN pnpm -v
COPY . .
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# Runner stage (with improved permissions)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create group and user (as before)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy and CHOWN in ONE STEP (important!)
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
RUN mkdir .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set ownership of ALL files in /app to nextjs:nodejs
RUN chown -R nextjs:nodejs /app  # Recursive chown is crucial

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]