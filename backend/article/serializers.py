from rest_framework.serializers import ModelSerializer
from article.models import Article
from drf_extra_fields.fields import Base64ImageField

        
class ArticleModelSerializer(ModelSerializer):
    file = Base64ImageField()
    
    class Meta:
        model = Article
        fields = ['id', 'title', 'short_description',  'source', 'content', 'created_at', 'updated_at', 'file', 'published']
