ARG NODE_VERSION=18-alpine3.17@sha256:44aaf1ccc80eaed6572a0f2ef7d6b5a2982d54481e4255480041ac92221e2f11

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
# Apparently still does not work with gatsby 5.10 ...
# See https://github.com/gatsbyjs/gatsby/issues/37246
# RUN addgroup --system --gid 1001 nodejs && \
#     adduser --system --uid 1001 frontend
# COPY --from=builder --chown=nodejs:frontend /app ./

ARG GITHUB_SHA
ENV GITHUB_SHA $GITHUB_SHA
ARG PRODUCTION
ENV PRODUCTION $PRODUCTION
ENV NODE_ENV production

RUN mkdir /.config
RUN chown -R node:node /.config
COPY --from=builder --chown=1000:1000 /app ./

USER 1000

RUN yarn install --production && yarn cache clean

WORKDIR /app/frontend
CMD ["node", "node_modules/.bin/gatsby", "serve", "--port", "8080", "--host", "0.0.0.0"]
