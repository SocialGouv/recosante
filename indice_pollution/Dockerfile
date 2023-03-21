FROM python:3.8

RUN groupadd --gid 1000 pn && useradd --uid 1000 --gid pn --shell /bin/bash --create-home pn

WORKDIR /code

ADD requirements.txt setup.cfg setup.py .
RUN pip install -e .

ADD . .
RUN chmod +x startup.sh

USER 1000

CMD ["./startup.sh"]