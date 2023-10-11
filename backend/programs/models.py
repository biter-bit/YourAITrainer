from django.db import models


class BaseModel(models.Model):
    time_create = models.DateTimeField(verbose_name='время создания', auto_now_add=True)
    time_update = models.DateTimeField(verbose_name='последнее обновление', auto_now=True)

    class Meta:
        abstract = True


class Program(BaseModel):
    name = models.CharField(verbose_name='название', max_length=100)
    is_current = models.BooleanField(verbose_name='текущая', default=True)
    user = models.ForeignKey(verbose_name='пользователь', to='authentication.CustomUser', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'programs'
        verbose_name = 'программа'
        verbose_name_plural = 'программы'


class TrainingDay(BaseModel):
    day_num = models.SmallIntegerField(verbose_name='номер тренировки')
    program = models.ForeignKey(verbose_name='программа', to='Program', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.program.name} | #{self.day_num}'

    class Meta:
        db_table = 'training_days'
        verbose_name = 'тренировка'
        verbose_name_plural = 'тренировки'


class Workout(BaseModel):
    title = models.CharField(verbose_name='название', max_length=100)
    description = models.TextField(verbose_name='описание')
    approach_num = models.SmallIntegerField(verbose_name='количество подходов')
    training_day = models.ForeignKey(verbose_name='тренировка', to='TrainingDay', on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'workout'
        verbose_name = 'упражнение'
        verbose_name_plural = 'упражнения'


class Approach(BaseModel):
    quantity = models.SmallIntegerField(verbose_name='количество повторений')
    result = models.SmallIntegerField(verbose_name='результат', null=True, blank=True)
    workout = models.ForeignKey(verbose_name='упражнение', to='Workout', on_delete=models.CASCADE)

    def __int__(self):
        return self.quantity

    class Meta:
        db_table = 'approaches'
        verbose_name = 'подход'
        verbose_name_plural = 'подходы'
