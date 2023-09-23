from rest_framework.serializers import ModelSerializer
from djoser.serializers import UserCreateSerializer
from article.models import Article
from authentication.models import CustomUser


class UserModelSerializer(UserCreateSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'
        
        
class ArticleModelSerializer(ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'title', 'source', 'content', 'created_at', 'updated_at', 'added_by', 'published']
