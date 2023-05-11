FROM python:3.10.6-slim@sha256:c8ef926b002a8371fff6b4f40142dcc6d6f7e217f7afce2c2d1ed2e6c28e2b7c

RUN groupadd --gid 1000 pn && useradd --uid 1000 --gid pn --shell /bin/bash --create-home pn

RUN apt update && apt install -y --no-install-recommends locales gcc libc6-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /code

RUN pip install poetry
ADD pyproject.toml poetry.toml poetry.lock ./
RUN poetry install

ADD . .

RUN chown -R 1000:1000 .

USER 1000

CMD ["./start_all.sh"]