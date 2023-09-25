from django.contrib import admin

#from models import Article, User, Program, TrainingDay, Workout, Approach

from users.models import Article, User
@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    pass
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    pass

# Register your models here.
