FROM python:3

ADD . /code/
WORKDIR /code/

RUN chmod +x startup.sh

ENV PIP_ROOT_USER_ACTION=ignore

CMD ["./startup.sh"]