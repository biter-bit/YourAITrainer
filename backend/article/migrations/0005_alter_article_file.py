# Generated by Django 4.2.4 on 2023-10-03 15:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0004_remove_article_added_by_article_file_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='file',
            field=models.ImageField(blank=True, null=True, upload_to='images'),
        ),
    ]