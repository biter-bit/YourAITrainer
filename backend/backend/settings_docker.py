from .settings import *

SECRET_KEY = 'django-insecure-1(n1_k#=)1%4hvb^$=gf9^o-$$m--q$a#7$1hwmypmxtbvnch4'

DEBUG = False

# кому доступен API
# if DEBUG:
#     CORS_ALLOW_ALL_ORIGINS = True
# else:
#     CORS_ALLOWED_ORIGINS = [
#         "http://localhost",
#         "http://127.0.0.1",
#         "http://localhost:3000",
#     ]

CORS_ALLOWED_ORIGINS = ['http://localhost:10001', 'http://127.0.0.1:10001']

ALLOWED_HOSTS = ['127.0.0.1', '91.200.84.202', 'youraitrainer.ru'] # добавить домен при заливке

#DATABASES = {
#    'default': {
#        'ENGINE': 'django.db.backends.sqlite3',
#        'NAME': 'D:\\IT\\projects\\YourAITrainer\\backend\\db.sqlite3',
        #'NAME': BASE_DIR / 'db.sqlite3',
#    }
#}

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "movies",
        "USER": "movies",
        "PASSWORD": "123456",
        "HOST": "db",
        "PORT": "5432",
    }
}

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
#STATICFILES_DIRS = (BASE_DIR/'frontend/build/static',)

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'