FROM python:3.9
COPY ./backend/ /code/backend/.
COPY ./backend/static /app/staticfiles/
WORKDIR /code/backend/
RUN pip install --upgrade pip && \
    pip install -r requirements.txt