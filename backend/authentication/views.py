from django.shortcuts import render
from djoser.views import UserViewSet
from article.serializers import UserModelSerializer


class CustomUserViewSet(UserViewSet):
    serializer_class = UserModelSerializer
