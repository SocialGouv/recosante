FROM node:20-alpine

RUN mkdir /app-node && chown 1000:1000 /app-node \
  && chown 1000:1000 /tmp && \
  mkdir /home/node/.yarn && chown 1000:1000 /home/node/.yarn
WORKDIR /app-node
USER 1000

COPY api-node/yarn.lock api-node/.yarnrc.yml ./
COPY --chown=1000:1000 api-node/.yarn .yarn
RUN yarn fetch --immutable

COPY --chown=1000:1000 api-node/. .

ENV NODE_ENV=production

ENTRYPOINT ["yarn", "start"]
