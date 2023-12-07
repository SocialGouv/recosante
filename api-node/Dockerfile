FROM node:20-alpine

WORKDIR /app

RUN chown node:node /app
RUN chmod 1777 /tmp

USER 1000

COPY . .

RUN yarn --production --frozen-lockfile && yarn cache clean

ENV NODE_ENV=production

ENTRYPOINT ["yarn", "start"]
