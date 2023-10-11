FROM python:3.9
COPY ./backend/ /code/backend/.
WORKDIR /code/backend/
RUN pip install --upgrade pip
#RUN apt-get update && apt-get install -y libffi-dev libssl-dev
RUN pip install -r requirements.txt