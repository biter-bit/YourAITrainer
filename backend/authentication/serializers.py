from rest_framework.serializers import HyperlinkedModelSerializer, ValidationError, ModelSerializer
from .models import User
from djoser.conf import settings
from djoser.compat import get_user_email, get_user_email_field_name


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        # fields = ('id', 'username', 'firstname', 'lastname', 'email',)


class UserDetailSerializerDjoser(ModelSerializer):
    class Meta:
        model = User
        fields = tuple(User.REQUIRED_FIELDS) + (
            settings.USER_ID_FIELD,
            settings.LOGIN_FIELD,
            'first_name', 'last_name', 'phone', 'gender', 'weight', 'age', 'is_active', 'height', 'training_level',
            'purpose_of_training'
            # ADD HERE EXTRA FIELDS OR IN READ_ONLY_FIELDS
        )

    def update(self, instance, validated_data):
        email_field = get_user_email_field_name(User)
        instance.email_changed = False
        if settings.SEND_ACTIVATION_EMAIL and email_field in validated_data:
            instance_email = get_user_email(instance)
            if instance_email != validated_data[email_field]:
                instance.is_active = False
                instance.email_changed = True
                instance.save(update_fields=["is_active"])
        return super().update(instance, validated_data)
