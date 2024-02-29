ARG NODE_VERSION=18-alpine3.17@sha256:44aaf1ccc80eaed6572a0f2ef7d6b5a2982d54481e4255480041ac92221e2f11

FROM node:$NODE_VERSION as base
WORKDIR /app

FROM base AS builder
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

COPY yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
RUN yarn fetch workspaces focus recosante-frontend
RUN yarn workspaces focus recosante-frontend

COPY frontend ./frontend

RUN yarn workspace recosante-frontend build
RUN yarn workspaces focus recosante-frontend --production && yarn cache clean

FROM base AS runner

ARG GITHUB_SHA
ENV GITHUB_SHA $GITHUB_SHA
ARG PRODUCTION
ENV PRODUCTION $PRODUCTION
ENV NODE_ENV production

RUN mkdir /.config
RUN chown -R node:node /.config
COPY --from=builder --chown=1000:1000 /app ./

USER 1000

WORKDIR /app/frontend
CMD ["node", "node_modules/.bin/gatsby", "serve", "--port", "8080", "--host", "0.0.0.0"]
