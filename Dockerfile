FROM python:3.9
COPY ./backend/ /code/backend/.
WORKDIR /code/backend/
RUN pip install --upgrade pip
RUN pip install -r requirements3.txt