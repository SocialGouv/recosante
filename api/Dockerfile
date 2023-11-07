ARG PYTHON_VERSION=3.11.3-slim@sha256:7b866f12347fbfccbb73284d9c04bbd67b5f9cca8b46786e9fa2bd07af53f09a

FROM python:$PYTHON_VERSION AS base
RUN groupadd --gid 1000 pn && useradd --uid 1000 --gid pn --shell /bin/bash --create-home pn
RUN apt update \
    && apt install -y --no-install-recommends \
        locales \
        curl \
    && rm -rf /var/lib/apt/lists/* \
    && sed -i '/^#.* fr_FR.UTF-8 /s/^#//' /etc/locale.gen \
    && locale-gen
RUN pip install poetry
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs && npm install --global yarn
WORKDIR /code

FROM base AS node-deps
COPY .yarnrc.yml yarn.lock ./
COPY .yarn .yarn
RUN yarn fetch workspaces focus @recosante/api

FROM base AS python-deps
RUN apt update \
    && apt install -y --no-install-recommends \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*
# gcc \
# libc6-dev \
# libpq-dev \
# python3-dev \

COPY api/pyproject.toml api/poetry.toml api/poetry.lock ./api/
COPY \
    libs/indice_pollution/pyproject.toml \
    libs/indice_pollution/poetry.lock \
    libs/indice_pollution/poetry.toml \
        libs/indice_pollution/
# COPY libs libs
WORKDIR /code/api
RUN poetry install --without dev

FROM base AS runner
RUN chown -R 1000:1000 /code
COPY --chown=1000:1000 api api/
COPY --chown=1000:1000 libs libs/
COPY --from=node-deps --chown=1000:1000 /code/node_modules ./node_modules
COPY --from=node-deps --chown=1000:1000 /code/api/node_modules ./api/node_modules
COPY --from=python-deps --chown=1000:1000 /code/api/.venv ./api/.venv

USER 1000

WORKDIR /code/api
CMD ["./start_all.sh"]
