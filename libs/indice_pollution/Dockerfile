ARG PYTHON_VERSION=3.13.5-slim@sha256:6544e0e002b40ae0f59bc3618b07c1e48064c4faed3a15ae2fbd2e8f663e8283

########
# Base
FROM python:$PYTHON_VERSION AS base
RUN pip install poetry
WORKDIR /code

########
# Install dependencies only when needeed
FROM base AS installer
RUN chmod 1777 /tmp
RUN apt-get update && apt-get install -y --no-install-recommends gcc libc6-dev \
    && rm -rf /var/lib/apt/lists/*
ADD pyproject.toml poetry.toml poetry.lock ./
RUN poetry install --without dev --no-root

########
# Runner
FROM base AS runner
RUN groupadd --gid 1000 pn && useradd --uid 1000 --gid pn --shell /bin/bash --create-home pn
ADD . .
COPY --from=installer /code/.venv ./.venv

# Install the local package now that all files are available
RUN poetry install --only-root

RUN chown -R 1000:1000 .

USER 1000

CMD ["./start_all.sh"]
