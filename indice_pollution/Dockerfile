FROM python:3.11-rc-alpine3.16

ADD . /code/
WORKDIR /code/

RUN apk add cargo
RUN pip install --upgrade pip

RUN pip install -r requirements.txt

ENV PIP_ROOT_USER_ACTION=ignore

RUN chown -R guest:guest /code
RUN chmod +x startup.sh

USER 405 # guest

CMD ["./startup.sh"]