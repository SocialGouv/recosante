ARG PYTHON_VERSION=3.11.3-slim@sha256:7b866f12347fbfccbb73284d9c04bbd67b5f9cca8b46786e9fa2bd07af53f09a

########
# Base
FROM python:$PYTHON_VERSION AS base
RUN pip install poetry
WORKDIR /code

########
FROM base AS installer

RUN sed -i 's|http://deb.debian.org|http://ftp.fr.debian.org|g' /etc/apt/sources.list && \
    chmod 1777 /tmp && \
    apt-get update && \
    apt-get install -y --no-install-recommends gcc libc6-dev && \
    rm -rf /var/lib/apt/lists/*


ADD pyproject.toml poetry.toml poetry.lock ./

RUN poetry install --without dev --no-root

########
# Runner
FROM base AS runner

RUN groupadd --gid 1000 pn && useradd --uid 1000 --gid pn --shell /bin/bash --create-home pn

ADD . .

COPY --from=installer /code/.venv ./.venv

RUN chown -R 1000:1000 .

USER 1000

CMD ["./start_all.sh"]
