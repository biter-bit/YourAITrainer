from rest_framework.viewsets import  ViewSet
from article.models import Article
from article.serializer import UserModelSerializer, ArticleModelSerializer
from rest_framework.generics import ListAPIView, UpdateAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework import filters
from django.contrib.auth.models import User
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly, IsAdminUser


class CurrentUserView(ViewSet, ListAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    lookup_field = 'id'
    
class ArticletPagination(LimitOffsetPagination):
    default_limit = 10
    
class ArticleModelViewSet(ViewSet, ListAPIView, RetrieveAPIView, DestroyAPIView, CreateAPIView, UpdateAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Article.objects.all()
    serializer_class = ArticleModelSerializer
    lookup_field = 'id'
    pagination_class = ArticletPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ('title',)
    filterset_fields = ('id', 'title', 'author',)