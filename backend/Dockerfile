FROM python:3.9
COPY . /code/backend/.
WORKDIR /code/backend/
RUN pip install --upgrade pip
RUN pip install -r requirements3.txt
RUN python manage.py makemigrations
RUN python manage.py migrate
CMD python manage.py runserver