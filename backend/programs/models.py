from django.db import models


class Programs (models.Model):
    name = models.CharField(verbose_name='Название', max_length=256)
    current = models.BooleanField(verbose_name='Текущая', default=False)
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)
    # user_id = models.ForeignKey('Users',  verbose_name='Пользователь', on_delete=models.CASCADE) # доделать

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'programs'
        verbose_name = ("Программа")
        verbose_name_plural = ("Программы")


class TrainingDay (models.Model):
    day = models.IntegerField(verbose_name='День')
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)
    programs_id = models.ForeignKey('Programs',  verbose_name='Программа', on_delete=models.CASCADE)

    def __int__(self):
        return self.day

    class Meta:
        db_table = 'training_day'
        verbose_name = ("Тренировочкый день")
        verbose_name_plural = ("Тренировочные дни")


class Workout (models.Model):
    title = models.CharField(verbose_name='Название тренировки', max_length=255)
    description = models.TextField(verbose_name='Описание', blank=True)
    approach_num = models.SmallIntegerField(verbose_name='Кол-во подходов', )
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)
    training_day_id = models.ForeignKey('TrainingDay',  verbose_name='Тренировочный день', on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'workout'
        verbose_name = ("Тренировка")
        verbose_name_plural = ("Тренировки")


class Approaches (models.Model):
    index = models.SmallIntegerField(verbose_name='Подход №')
    quantity = models.SmallIntegerField(verbose_name='Рекомендуемое кол-во')
    result = models.SmallIntegerField(verbose_name='Сделано')
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)
    workout_id = models.ForeignKey('Workout', verbose_name='Упражнение', on_delete=models.CASCADE)

    def __int__(self):
        return self.quantity

    class Meta:
        db_table = 'approaches'
        verbose_name = ("Подход")
        verbose_name_plural = ("Подходы")