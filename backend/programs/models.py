from django.db import models


class Programs (models.Model):
    name = models.CharField(max_length=256)
    current = models.BooleanField(default=False)
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)
    # user_id = models.ForeignKey('Users',  on_delete=models.CASCADE) # доделать

    def __str__(self):
        return self.name


class TrainingDay (models.Model):
    day = models.IntegerField()
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)
    programs_id = models.ForeignKey('Programs',  on_delete=models.CASCADE)

    def __int__(self):
        return self.day


class Workout (models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    approach_num = models.SmallIntegerField()
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)
    training_day_id = models.ForeignKey('TrainingDay',  on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Approaches (models.Model):
    index = models.SmallIntegerField()
    quantity = models.SmallIntegerField()
    result = models.SmallIntegerField()
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)
    workout_id = models.ForeignKey('Workout', on_delete=models.CASCADE)

    def __int__(self):
        return self.quantity

