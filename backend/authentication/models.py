from pathlib import Path
from time import time

from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.validators import ASCIIUsernameValidator
from django.core.mail import send_mail
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError


class CustomUser(AbstractUser, PermissionsMixin):
    username_validator = ASCIIUsernameValidator()

    GENDERS = (
        ('m', 'мужской'),
        ('f', 'женский'),
    )

    TRAINING_LEVELS = (
        ('beginner', 'новичок'),
        ('amateur', 'любитель'),
        ('pro', 'профессионал')
    )

    PURPOSES = (
        ('weight_loss', 'похудение'),
        ('relief', 'рельеф тела'),
        ('muscle_mass', 'набор мышечной массы'),
        ('endurance', 'выносливость')
    )
    username = models.CharField(
        _("username"),
        max_length=150,
        unique=True,
        help_text=_("Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."),
        validators=[username_validator],
        error_messages={
            "unique": _("A user with that username already exists."),
        },
    )
    first_name = models.CharField(_("first name"), max_length=150, blank=True)
    last_name = models.CharField(_("last name"), max_length=150, blank=True)

    email = models.CharField(
        _("email address"),
        max_length=256,
        unique=True,
        error_messages={
            "unique": _("A user with that email address already exists."),
        },
    )
    password_confirmation = models.CharField(max_length=128, blank=True, null=True)
    gender = models.CharField(verbose_name='пол', max_length=12, choices=GENDERS, default=False)
    age = models.PositiveIntegerField(verbose_name='возраст', default=False)
    weight = models.SmallIntegerField(verbose_name='вес', default=False)
    height = models.SmallIntegerField(verbose_name='рост', default=False)
    training_level = models.CharField(verbose_name='уровень пользователя', max_length=8, choices=TRAINING_LEVELS, default=False)
    purpose_of_training = models.CharField(verbose_name='цель программы', max_length=12, choices=PURPOSES, default=False)
    created_at = models.DateTimeField(verbose_name='время создания', auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name='последнее обновление', auto_now=True)
    phone = models.CharField(_('phone number'), max_length=30, blank=True, null=True)
    is_staff = models.BooleanField(
        _("staff status"),
        default=False,
        help_text=_("Designates whether the user can log into this admin site."),
    )
    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_(
            "Designates whether this user should be treated as active. \
            Unselect this instead of deleting accounts."
        ),
    )
    date_joined = models.DateTimeField(_("date joined"), auto_now_add=True)
    is_verified = models.BooleanField(_('verified'), default=False)

    #EMAIL_FIELD = "email"
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")
        unique_together = ('username', 'email', 'phone')

    def __str__(self):
        return self.username
