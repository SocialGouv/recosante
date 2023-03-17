ARG NODE_VERSION=16-alpine3.16

# Install dependencies only when needed
FROM node:$NODE_VERSION AS prepare
WORKDIR /app
COPY package.json yarn.lock ./

# Keep yarn install cache when bumping version and dependencies still the sames
RUN node -e " \
    const package = JSON.parse(fs.readFileSync('/app/package.json')); \
    const packageZero = { ...package, version: '0.0.0' };  \
    fs.writeFileSync('/app/package.json', JSON.stringify(packageZero));"

FROM node:$NODE_VERSION as deps
WORKDIR /app
COPY --from=prepare /app/package.json /app/yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:$NODE_VERSION AS builder

ARG PRODUCTION
ENV PRODUCTION $PRODUCTION
ARG GITHUB_SHA
ENV GITHUB_SHA $GITHUB_SHA
ARG GATSBY_API_BASE_URL
ENV GATSBY_API_BASE_URL $GATSBY_API_BASE_URL
ARG GATSBY_IFRAME_ID
ENV GATSBY_IFRAME_ID $GATSBY_IFRAME_ID
ARG GATSBY_URL
ENV GATSBY_URL $GATSBY_URL
ARG GATSBY_REPOSITORY_URL

ENV GATSBY_REPOSITORY_URL $GATSBY_REPOSITORY_URL

ENV NODE_ENV production
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .


# Production image, copy all the files and run next
FROM ghcr.io/socialgouv/docker/nginx:7.3.0 AS runner

COPY --from=builder /app/public /usr/share/nginx/html

