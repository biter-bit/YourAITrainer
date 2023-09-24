from rest_framework.serializers import ModelSerializer
from article.models import Article

        
class ArticleModelSerializer(ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'title', 'source', 'content', 'created_at', 'updated_at', 'added_by', 'published']
