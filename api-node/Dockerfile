FROM node:20-slim

RUN apt-get update && apt-get install -y libssl-dev ca-certificates && rm -rf /var/lib/apt/lists/*


RUN ln -s /usr/lib/libssl.so.3 /lib/libssl.so.3 # see https://github.com/prisma/prisma/issues/25817

RUN mkdir /app-node && chown -R 1000:1000 /app-node
WORKDIR /app-node

USER 1000

COPY --chown=1000:1000 ./yarn.lock ./.yarnrc.yml ./
COPY --chown=1000:1000 ./.yarn .yarn
RUN yarn fetch

# Copy application code
COPY --chown=1000:1000 . .

RUN yarn prisma generate

ENV NODE_ENV=production

ENTRYPOINT ["yarn", "start"]
