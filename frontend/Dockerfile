ARG NODE_VERSION=16-alpine3.16@sha256:27f56734cabb1bf0ed5176730091b67fb59b0c7249193e350f175c8b4ab12f8d

########
# Base : node
FROM node:$NODE_VERSION AS base
# Gatsby vaiables for the install / build / run
ARG GATSBY_API_BASE_URL
ENV GATSBY_API_BASE_URL $GATSBY_API_BASE_URL
ARG GATSBY_IFRAME_ID
ENV GATSBY_IFRAME_ID $GATSBY_IFRAME_ID
ARG GATSBY_URL
ENV GATSBY_URL $GATSBY_URL
ARG GATSBY_REPOSITORY_URL
ENV GATSBY_REPOSITORY_URL $GATSBY_REPOSITORY_URL
ENV GATSBY_TELEMETRY_DISABLED 1
WORKDIR /app
# Need lscpu
RUN apk add --no-cache --update util-linux && \
    rm -rf /var/cache/apk/* > /dev/null 2>&1
COPY frontend/package.json ./frontend/
ADD package.json yarn.lock ./
# Keep yarn install cache when bumping version and dependencies still the sames
RUN node -e " \
    const package = JSON.parse(fs.readFileSync('/app/package.json')); \
    const packageZero = { ...package, version: '0.0.0' };  \
    fs.writeFileSync('/app/package.json', JSON.stringify(packageZero, null, 2));"

########
# Need this hack to not install dependencies when frontend changes
FROM node:$NODE_VERSION AS tmp-frontend
COPY frontend frontend/

########
# Install dependencies only when needeed
FROM base AS installer
RUN yarn install

########
# Build gatsby
FROM installer AS builder
COPY --from=tmp-frontend /frontend ./frontend
RUN ls
WORKDIR /app/frontend
RUN yarn build

########
# Runner
FROM base AS runner
# Apparently needs gatsby 5.3.1
# See https://github.com/gatsbyjs/gatsby/issues/37246
# RUN addgroup --system --gid 1001 nodejs && \
#     adduser --system --uid 1001 frontend
# COPY --from=builder --chown=nodejs:frontend /app ./
COPY --from=builder /app ./
ARG GITHUB_SHA
ENV GITHUB_SHA $GITHUB_SHA
ARG PRODUCTION
ENV PRODUCTION $PRODUCTION
ENV NODE_ENV production
RUN yarn install --production && yarn cache clean

# USER 1001

WORKDIR /app/frontend
CMD ["node", "node_modules/.bin/gatsby", "serve", "--port", "8080", "--host", "0.0.0.0"]
