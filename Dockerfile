FROM python:latest
COPY ./backend/ /code/backend/.

WORKDIR /code/backend/
RUN pip install -r requirements.txt
