FROM node:20-slim

RUN apt-get update && apt-get install -y libssl-dev ca-certificates && rm -rf /var/lib/apt/lists/*


RUN ln -s /usr/lib/libssl.so.3 /lib/libssl.so.3 # see https://github.com/prisma/prisma/issues/25817

RUN mkdir /app-node && chown 1000:1000 /app-node \
  && chown 1000:1000 /tmp \
  && mkdir -p /home/node/.yarn && chown 1000:1000 /home/node/.yarn

WORKDIR /app-node

USER 1000

COPY --chown=1000:1000 ./yarn.lock ./.yarnrc.yml ./
COPY --chown=1000:1000 ./.yarn .yarn

RUN yarn fetch

COPY --chown=1000:1000 . .

ENV NODE_ENV=production

ENTRYPOINT ["yarn", "start"]
