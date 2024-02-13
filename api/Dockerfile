ARG PYTHON_VERSION=3.11.3-slim@sha256:7b866f12347fbfccbb73284d9c04bbd67b5f9cca8b46786e9fa2bd07af53f09a

########
# Base : node / fr locales + libs
FROM python:$PYTHON_VERSION AS base
RUN pip install poetry
RUN apt update && apt install -y --no-install-recommends curl
RUN apt update \
    && apt install -y --no-install-recommends curl gcc libc6-dev libpq-dev locales python3-dev \
    && rm -rf /var/lib/apt/lists/* \
    && sed -i '/^#.* fr_FR.UTF-8 /s/^#//' /etc/locale.gen \
    && locale-gen
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs && npm install --global yarn
WORKDIR /code
COPY libs libs/
ADD api/pyproject.toml api/poetry.toml api/poetry.lock api/package.json ./api/
COPY .yarn .yarn
COPY .yarnrc.yml ./
ADD package.json yarn.lock ./

########
# Need this hack to not install dependencies when api changes
FROM python:$PYTHON_VERSION AS tmp-api
COPY api api/

########
# Install dependencies only when needeed
FROM base AS installer
RUN yarn workspaces focus recosante-api
RUN mkdir -p api/node_modules
WORKDIR /code/api
RUN poetry install --without dev

########
# Runner
FROM base AS runner
RUN groupadd --gid 1000 pn && useradd --uid 1000 --gid pn --shell /bin/bash --create-home pn
RUN apt-get purge -y curl gcc libc6-dev && apt-get autoremove -y
RUN chown -R pn:pn /code
COPY --from=tmp-api --chown=pn:pn /api ./api
COPY --from=installer --chown=pn:pn /code/node_modules ./node_modules
COPY --from=installer --chown=pn:pn /code/api/node_modules ./api/node_modules
COPY --from=installer --chown=pn:pn /code/api/.venv ./api/.venv
RUN yarn workspaces focus recosante-api --production && yarn cache clean

USER 1000

WORKDIR /code/api
CMD ["./start_all.sh"]
