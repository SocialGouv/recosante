FROM python:3.8-slim@sha256:92689d355058ec11621b8ad082b5e9191143aac0019051aaff702ede49ed2502

RUN groupadd --gid 1000 pn && useradd --uid 1000 --gid pn --shell /bin/bash --create-home pn

RUN apt update && apt install -y --no-install-recommends locales gcc libc6-dev \
    && rm -rf /var/lib/apt/lists/* 

WORKDIR /code

ADD requirements.txt setup.cfg setup.py .
RUN pip install -e .

ADD . .

RUN chown -R 1000:1000 .

USER 1000

CMD ["./start_all.sh"]