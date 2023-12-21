FROM node:20-alpine as deps
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn --production --frozen-lockfile

FROM node:20-alpine as run
WORKDIR /app

COPY --chown=node:node --from=deps /app/node_modules ./node_modules
COPY . .

USER 1000

ENV NODE_ENV=production

ENTRYPOINT ["yarn", "start"]
