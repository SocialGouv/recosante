FROM python:3.8-slim@sha256:92689d355058ec11621b8ad082b5e9191143aac0019051aaff702ede49ed2502

RUN groupadd --gid 1000 pn && useradd --uid 1000 --gid pn --shell /bin/bash --create-home pn

RUN apt update \
    && apt install -y --no-install-recommends locales curl libpq-dev gcc libc6-dev \
    && rm -rf /var/lib/apt/lists/* \
    && sed -i '/^#.* fr_FR.UTF-8 /s/^#//' /etc/locale.gen \
    && locale-gen

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - &&\
    apt-get install -y nodejs && npm install --global yarn

WORKDIR /code

ADD package.json yarn.lock ./
RUN yarn install
ADD requirements.txt setup.cfg setup.py ./
RUN pip install -e .[test] 

RUN apt-get purge -y curl gcc libc6-dev && apt-get autoremove -y

ADD . .
RUN chown -R 1000:1000 /code 

USER 1000


CMD ["./start_all.sh"]


# TODO: optimize docker image size using python virtualenv with docker multistage image like in https://www.nannyml.com/blog/three-things-i-learned-whilst-containerizing-a-python-api
