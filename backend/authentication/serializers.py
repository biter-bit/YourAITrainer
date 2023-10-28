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


class UserProfileSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(allow_blank=True)
    password_confirmation = serializers.CharField(allow_blank=True)
    email = serializers.CharField()
    gender = serializers.CharField()
    age = serializers.IntegerField()
    weight = serializers.IntegerField()
    height = serializers.IntegerField()
    training_level = serializers.CharField()
    purpose_of_training = serializers.CharField()

    class Meta:
        model = CustomUser
        fields = '__all__'
