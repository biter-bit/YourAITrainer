from django.db import models


class Programs (models.Model):
    name = models.CharField(verbose_name='Название', max_length=256)
    current = models.BooleanField(verbose_name='Текущая', default=False)
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)
    # user_id = models.ForeignKey('Users',  verbose_name='Пользователь', on_delete=models.CASCADE) # доделать

    def __str__(self):
        return self.name


class TrainingDay (models.Model):
    day = models.IntegerField(verbose_name='День')
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)
    programs_id = models.ForeignKey('Programs',  verbose_name='Программа', on_delete=models.CASCADE)

    def __int__(self):
        return self.day


class Workout (models.Model):
    title = models.CharField(verbose_name='Название тренировки', max_length=255)
    description = models.TextField(verbose_name='Описание', blank=True)
    approach_num = models.SmallIntegerField(verbose_name='Кол-во подходов', )
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)
    training_day_id = models.ForeignKey('TrainingDay',  verbose_name='Тренировочный день', on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Approaches (models.Model):
    index = models.SmallIntegerField(verbose_name='Подход №')
    quantity = models.SmallIntegerField(verbose_name='Рекомендуемое кол-во')
    result = models.SmallIntegerField(verbose_name='Сделано')
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)
    workout_id = models.ForeignKey('Workout', verbose_name='Упражнение', on_delete=models.CASCADE)

    def __int__(self):
        return self.quantity

