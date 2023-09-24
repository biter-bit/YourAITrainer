from rest_framework.viewsets import  ViewSet
from article.models import Article
from article.serializers import ArticleModelSerializer
from rest_framework.generics import ListAPIView, UpdateAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework import filters
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly


class ArticletPagination(LimitOffsetPagination):
    default_limit = 10


class ArticleModelViewSet(ViewSet, ListAPIView, RetrieveAPIView, DestroyAPIView, CreateAPIView, UpdateAPIView):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Article.objects.all()
    serializer_class = ArticleModelSerializer
    lookup_field = 'id'
    pagination_class = ArticletPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ('title',)
    filterset_fields = ('id', 'title', 'source',)