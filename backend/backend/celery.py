import os
from celery import Celery
from dotenv import load_dotenv

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
load_dotenv()

app = Celery('your_ai_trainer')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
