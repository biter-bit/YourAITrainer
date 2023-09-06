from rest_framework import status
from rest_framework.request import Request

from .models import User
from .serializers import UserModelSerializer
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer

from rest_framework.response import Response

#есть возможность просмотра списка и каждого пользователя в отдельности, можно вносить изменения, нельзя удалять и создавать;
class UserAPIView(APIView):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    #queryset = User.objects.all()
    #serializer_class = UserModelSerializer

    def get(self, request: Request, id, format=None)-> Response:
        user = User.objects.get(id=id)
        serializer = UserModelSerializer(user)
        return Response(serializer.data)


class UserListAPIView(APIView):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

    def get(self, request: Request, format=None)-> Response:
        #user_detail = UserViewSet.as_view({'get': 'retrieve'})
        users = User.objects.all()

        serializer = UserModelSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = UserModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

