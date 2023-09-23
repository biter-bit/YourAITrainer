from django.db import models
from django.conf import settings


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    telegram = models.CharField("telegram", max_length=50)

    def __str__(self):
        return f'{self.telegram}'
