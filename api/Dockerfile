FROM nikolaik/python-nodejs:python3.8-nodejs18

RUN apt update \
    && apt install -y --no-install-recommends locales \
    && rm -rf /var/lib/apt/lists/* \
    && sed -i '/^#.* fr_FR.UTF-8 /s/^#//' /etc/locale.gen \
    && locale-gen

WORKDIR /code

ADD package.json yarn.lock .
RUN yarn install
ADD requirements.txt setup.cfg setup.py .
RUN pip install -e .[test] 

ADD . .
RUN chown -R 1000:1000 /code 

USER 1000


CMD ["./start_all.sh"]


# TODO: optimize docker image size using python virtualenv with docker multistage image like in https://www.nannyml.com/blog/three-things-i-learned-whilst-containerizing-a-python-api