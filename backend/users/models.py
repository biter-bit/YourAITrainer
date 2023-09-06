from django.db import models

class User(models.Model):
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

    name = models.CharField(verbose_name='имя', max_length=48)
    email = models.EmailField(verbose_name='почта')
    password = models.CharField(verbose_name='пароль', max_length=100)
    gender = models.CharField(verbose_name='пол', max_length=1, choices=GENDERS)
    age = models.SmallIntegerField(verbose_name='возраст')
    weight = models.SmallIntegerField(verbose_name='вес')
    height = models.SmallIntegerField(verbose_name='рост')
    training_level = models.CharField(verbose_name='уровень пользователя', max_length=8, choices=TRAINING_LEVELS)
    purpose_of_training = models.CharField(verbose_name='цель программы', max_length=12, choices=PURPOSES)
    created_at = models.DateTimeField(verbose_name='время создания')
    updated_at = models.DateTimeField(verbose_name='последнее обновление')

    class Meta:
        db_table = 'users'
        verbose_name = 'пользователь'
        verbose_name_plural = 'пользователи'