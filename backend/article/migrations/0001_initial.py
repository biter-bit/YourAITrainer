# Generated by Django 4.2.4 on 2023-10-12 10:50

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, verbose_name='название')),
                ('short_description', models.TextField(verbose_name='краткое описание')),
                ('content', models.TextField(verbose_name='текст')),
                ('file', models.ImageField(blank=True, null=True, upload_to='images')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='время создания')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='последнее обновление')),
                ('source', models.CharField(max_length=100, verbose_name='источник')),
                ('published', models.BooleanField(default=False, verbose_name='опубликовано')),
            ],
            options={
                'verbose_name': 'Статья',
                'verbose_name_plural': 'Статьи',
                'db_table': 'articles',
            },
        ),
    ]
