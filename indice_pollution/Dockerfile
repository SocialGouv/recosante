FROM python:3.10-alpine3.16

ADD . /code/
WORKDIR /code/

RUN apk add cargo
RUN pip install --upgrade pip

RUN pip install python-dotenv
RUN pip install -e .

ENV PIP_ROOT_USER_ACTION=ignore

RUN adduser -DH -u 1000 app
RUN chown -R app:app /code
RUN chmod +x startup.sh

USER 1000

CMD ["./startup.sh"]