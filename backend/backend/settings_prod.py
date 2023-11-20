import os
from .settings import *

DEBUG = False
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