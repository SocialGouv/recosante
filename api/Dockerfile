FROM python:3.10.6-slim@sha256:c8ef926b002a8371fff6b4f40142dcc6d6f7e217f7afce2c2d1ed2e6c28e2b7c

RUN groupadd --gid 1000 pn && useradd --uid 1000 --gid pn --shell /bin/bash --create-home pn

RUN apt update && apt install -y --no-install-recommends curl
RUN apt update \
    && apt install -y --no-install-recommends curl gcc libc6-dev libpq-dev locales python3-dev \
    && rm -rf /var/lib/apt/lists/* \
    && sed -i '/^#.* fr_FR.UTF-8 /s/^#//' /etc/locale.gen \
    && locale-gen

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs && npm install --global yarn

WORKDIR /code

COPY api api/
COPY libs libs/
RUN pip install poetry

WORKDIR /code/api

RUN poetry install --without dev
RUN yarn install --frozen-lockfile

RUN apt-get purge -y curl gcc libc6-dev && apt-get autoremove -y

RUN chown -R 1000:1000 /code

USER 1000

CMD ["./start_all.sh"]
