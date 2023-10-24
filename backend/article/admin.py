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
        success, count = start_articles_import()

        if not success:
            self.message_user(request, f"данные не были получены", level='warning')
            return HttpResponseRedirect("../")

        self.message_user(request, f"создано {count} новых записей")

        return HttpResponseRedirect("../")
