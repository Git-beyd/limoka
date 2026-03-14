# Base image
FROM node:18-alpine AS base
WORKDIR /app

# -----------------------------
# Install dependencies
# -----------------------------
FROM base AS deps

COPY package.json pnpm-lock.yaml* package-lock.json* ./

RUN corepack enable

RUN \
  if [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  else echo "Lockfile not found." && exit 1; \
  fi

# -----------------------------
# Build the app
# -----------------------------
FROM base AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable
RUN pnpm install --frozen-lockfile || npm install

RUN npm run build

# -----------------------------
# Production image
# -----------------------------
FROM base AS runner

WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
