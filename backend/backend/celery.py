import os

from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('your_ai_trainer')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
