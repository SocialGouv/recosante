FROM node:20-slim

RUN apt-get update && apt-get install -y libssl-dev ca-certificates && rm -rf /var/lib/apt/lists/*


RUN ln -s /usr/lib/libssl.so.3 /lib/libssl.so.3 # see https://github.com/prisma/prisma/issues/25817

RUN mkdir /app-node && chown -R node:node /app-node
WORKDIR /app-node

USER node

COPY --chown=node:node ./yarn.lock ./.yarnrc.yml ./
COPY --chown=node:node ./.yarn .yarn
RUN yarn fetch

COPY --chown=node:node . .

RUN yarn prisma generate

ENV NODE_ENV=production

ENTRYPOINT ["yarn", "start"]
