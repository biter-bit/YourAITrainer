from authentication.models import CustomUser
from django.db.models import Q
from django.contrib.auth.backends import ModelBackend


class AuthBackend(ModelBackend):
    supports_object_permissions = True
    supports_anonymous_user = False
    supports_inactive_user = True

    def get_user(self, user_id):
        try:
            return CustomUser.objects.get(pk=user_id)
        except CustomUser.DoesNotExist:
            return None

    def authenticate(self, request, username, password):
        try:
            user = CustomUser.objects.get(Q(username=username) | Q(email=username) | Q(phone=username))
        except CustomUser.DoesNotExist:
            return None

        if user.check_password(password):
            return user
        else:
            return None
