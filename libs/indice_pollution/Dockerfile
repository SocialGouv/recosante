ARG PYTHON_VERSION=3.11.3-slim

########
# Base
FROM python:$PYTHON_VERSION AS base
RUN pip install poetry
WORKDIR /code

########
# Install dependencies only when needeed
FROM base AS installer
RUN apt update && apt install -y --no-install-recommends gcc libc6-dev \
    && rm -rf /var/lib/apt/lists/*
ADD pyproject.toml poetry.toml poetry.lock ./
RUN poetry install --without dev

########
# Runner
FROM base AS runner
RUN groupadd --gid 1000 pn && useradd --uid 1000 --gid pn --shell /bin/bash --create-home pn
ADD . .
COPY --from=installer /code/.venv ./.venv

RUN chown -R 1000:1000 .

USER 1000

CMD ["./start_all.sh"]
