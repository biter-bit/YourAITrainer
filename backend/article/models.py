from django.db import models


class Article(models.Model):
    title = models.CharField(verbose_name='название', max_length=200)
    short_description = models.TextField(verbose_name='краткое описание')
    content = models.TextField(verbose_name='текст')
    file = models.ImageField(null=True,upload_to = 'images',blank=True)
    created_at = models.DateTimeField(verbose_name='время создания', auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name='последнее обновление', auto_now=True)
    source = models.CharField(verbose_name='источник', max_length=200)
    published = models.BooleanField(verbose_name='опубликовано', default=False)
    
    def __str__(self):
        return self.title
    
    class Meta:
        db_table = 'articles'
        verbose_name = ("Статья")
        verbose_name_plural = ("Статьи")
