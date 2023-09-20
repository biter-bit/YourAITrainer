from django.dispatch import receiver
from djoser.signals import user_registered

from mainapp.models import Profile


@receiver(user_registered, dispatch_uid="create_profile")
def create_profile(sender, user, request, **kwargs):
    data = request.data

    Profile.objects.create(
        user=user,
        name=data.get("name", ""),
        surname=data.get("surname", "")
    )
