from django.db import models


class Programs (models.Model):
    name = models.CharField(max_length=256)
    current = models.BooleanField(default=False)
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)
    # user_id = models.ForeignKey('Users',  on_delete=models.CASCADE) # доделать

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'programs'
        verbose_name = ("Программа")
        verbose_name_plural = ("Программы")


class TrainingDay (models.Model):
    day = models.IntegerField()
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)
    programs_id = models.ForeignKey('Programs',  on_delete=models.CASCADE)

    def __int__(self):
        return self.day

    class Meta:
        db_table = 'training_day'
        verbose_name = ("Тренировочкый день")
        verbose_name_plural = ("Тренировочные дни")


class Workout (models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    approach_num = models.SmallIntegerField()
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)
    training_day_id = models.ForeignKey('TrainingDay',  on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'workout'
        verbose_name = ("Тренировка")
        verbose_name_plural = ("Тренировки")


class Approaches (models.Model):
    index = models.SmallIntegerField()
    quantity = models.SmallIntegerField()
    result = models.SmallIntegerField()
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)
    workout_id = models.ForeignKey('Workout', on_delete=models.CASCADE)

    def __int__(self):
        return self.quantity

    class Meta:
        db_table = 'approaches'
        verbose_name = ("Подход")
        verbose_name_plural = ("Подходы")