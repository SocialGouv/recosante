FROM node:18-alpine as base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Rebuild the source code only when needed
FROM base AS builder

# install deps
COPY yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
RUN yarn fetch workspaces focus frontend-next

# build
COPY ./frontend-next/ ./frontend-next/

ENV NEXT_TELEMETRY_DISABLED 1

# RUN yarn install
RUN yarn workspace frontend-next build

# Production image, copy all the files and run next
FROM base AS runner

# ENV ENV development
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nextjs

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/frontend-next/next.config.js /app/
COPY --from=builder /app/frontend-next/public /app/frontend-next/public

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/frontend-next/.next/standalone /app/
COPY --from=builder --chown=nextjs:nodejs /app/frontend-next/.next/static /app/frontend-next/.next/static

USER 1001
EXPOSE 3000
ENV PORT 3000

CMD ["node", "frontend-next/server.js"]
