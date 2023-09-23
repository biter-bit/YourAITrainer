from django.db import models
from authentication.models import CustomUser


class Article(models.Model):
    title = models.CharField(verbose_name='название', max_length=100)
    content = models.TextField(verbose_name='текст')
    created_at = models.DateTimeField(verbose_name='время создания', auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name='последнее обновление', auto_now=True)
    added_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    source = models.CharField(verbose_name='источник', max_length=100)
    published = models.BooleanField(verbose_name='опубликовано', default=False)
    
    def __str__(self):
        return self.title
    
    class Meta:
        db_table = 'articles'
        verbose_name = ("Статья")
        verbose_name_plural = ("Статьи")
