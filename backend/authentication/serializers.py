from djoser.serializers import UserCreateSerializer
from authentication.models import CustomUser
from rest_framework import serializers


class UserModelSerializer(UserCreateSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'password', 'password_confirmation', 'email']

    def create(self, validated_data):
        password = validated_data.pop("password")
        password_confirmation = validated_data.pop("password_confirmation")

        if password != password_confirmation:
            raise serializers.ValidationError("Password and confirmation do not match.")

        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()
        return user
