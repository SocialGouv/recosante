FROM node:20-alpine

RUN apk update \
	&& apk add --no-cache openssl\
	&& rm -rf /var/lib/apt/lists/* \
	&& rm -rf /var/cache/apk/*

RUN mkdir /app-node && chown 1000:1000 /app-node \
  && chown 1000:1000 /tmp && \
  mkdir /home/node/.yarn && chown 1000:1000 /home/node/.yarn
WORKDIR /app-node
USER 1000

COPY --chown=1000:1000 ./yarn.lock ./.yarnrc.yml ./
COPY --chown=1000:1000 ./.yarn .yarn
RUN yarn fetch

COPY --chown=1000:1000 . .

ENV NODE_ENV=production

ENTRYPOINT ["yarn", "start"]
