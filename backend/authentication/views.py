from authentication.serializers import UserModelSerializer, UserProfileSerializer
from djoser.views import UserViewSet as DjoserUserViewSet
from authentication.models import CustomUser
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet
from rest_framework.generics import ListAPIView
from rest_framework.response import Response


class UserListView(ViewSet, ListAPIView):
    permission_classes = [IsAdminUser]
    queryset = CustomUser.objects.all()
    serializer_class = UserModelSerializer
    lookup_field = 'id'


class RegisterViewSet(ViewSet, DjoserUserViewSet):
    serializer_class = UserModelSerializer


class CurrentUserProfile(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_id = request.user.id
        profile = CustomUser.objects.get(id=user_id)
        profile_data = UserProfileSerializer(profile).data
        profile_data['password'] = ''
        return Response(profile_data)

    def patch(self, request):
        user = request.user
        serializer = UserProfileSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        if data['username']: user.username = data['username']
        if data['password']: user.set_password(data['password'])
        if data['email']: user.email = data['email']
        if data['gender']: user.gender = data['gender']
        if data['age']: user.age = data['age']
        if data['weight']: user.weight = data['weight']
        if data['height']: user.height = data['height']
        if data['training_level']: user.training_level = data['training_level']
        if data['purpose_of_training']: user.purpose_of_training = data['purpose_of_training']

        user.save()

        return Response(data)
