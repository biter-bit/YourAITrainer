from django.contrib import admin

# Register your models here.

from django.http import HttpResponseRedirect
from django.urls import re_path

from .models import Article
from services.get_articles import start_articles_import


@admin.register(Article)
class ArticlesAdmin(admin.ModelAdmin):
    change_list_template = "admin/model_change_list.html"

    def get_urls(self):
        urls = super(ArticlesAdmin, self).get_urls()
        custom_urls = [re_path('^import/$', self.process_import_btmp, name='process_import'),]
        return custom_urls + urls

    def process_import_btmp(self, request):
        imports = start_articles_import()
        count = 0

        if not imports:
            self.message_user(request, f"данные не были получены", level='warning')
            return HttpResponseRedirect("../")

        for article in imports:
            if not len(Article.objects.filter(title=article['title'])):
                news_article = Article(
                    title=article['title'],
                    content=article['article_text'],
                    source=article['source'],
                    added_by=request.user,
                    published=True,
                )
                news_article.save()
                count += 1

        self.message_user(request, f"создано {count} новых записей")

        return HttpResponseRedirect("../")
