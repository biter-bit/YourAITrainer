import os
from .settings import *

SECRET_KEY = 'django-insecure-1(asdfasfasf1%4hvb^$=gf9^o-$$m--q$a#7$1hwmypmxtbvnch4'

DEBUG = False

CORS_ALLOWED_ORIGINS = ['http://localhost:10001', 'http://127.0.0.1:10001'] # заменить после того, как залем фронт

ALLOWED_HOSTS = ['127.0.0.1'] # добавить домен при заливке

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "movies",
        "USER": "movies",
        "PASSWORD": "123456",
        "HOST": "127.0.0.1",
        "PORT": "5432",
    }
}