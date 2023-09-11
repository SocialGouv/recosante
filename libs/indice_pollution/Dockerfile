ARG PYTHON_VERSION=3.11.3-slim@sha256:7b866f12347fbfccbb73284d9c04bbd67b5f9cca8b46786e9fa2bd07af53f09a

########
# Base
FROM python:$PYTHON_VERSION AS base
RUN pip install poetry
WORKDIR /code
RUN apt update && apt install -y --no-install-recommends gcc libc6-dev \
    && rm -rf /var/lib/apt/lists/*
    
########
# Install dependencies only when needeed
FROM base AS installer

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
