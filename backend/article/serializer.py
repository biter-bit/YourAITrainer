from rest_framework.serializers import ModelSerializer
from article.models import Article
from django.contrib.auth.models import User

class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'date_joined']
        
        
class ArticleModelSerializer(ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'title', 'source', 'content', 'created_at', 'updated_at', 'added_by', 'published']
