from authentication.serializers import UserModelSerializer
from djoser.views import UserViewSet as DjoserUserViewSet
from authentication.models import CustomUser
from rest_framework.permissions import IsAdminUser
from rest_framework.viewsets import ViewSet
from rest_framework.generics import ListAPIView


class UserListView(ViewSet, ListAPIView):
    permission_classes = [IsAdminUser]
    queryset = CustomUser.objects.all()
    serializer_class = UserModelSerializer
    lookup_field = 'id'


class RegisterViewSet(ViewSet, DjoserUserViewSet):
    serializer_class = UserModelSerializer