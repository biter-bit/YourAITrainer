from django.db import models

class Article(models.Model):
    title = models.CharField(verbose_name='название', max_length=255)
    meta = models.CharField(verbose_name='мета описание', max_length=255)
    text = models.TextField(verbose_name='текст')
    source = models.CharField(verbose_name='источник', max_length=100)
    is_draft = models.BooleanField(verbose_name='черновик', default=True)
    created_at = models.DateTimeField(verbose_name='время создания')
    updated_at = models.DateTimeField(verbose_name='последнее обновление')

    class Meta:
        db_table = 'articles'
        verbose_name = 'статья'
        verbose_name_plural = 'статьи'

    def __str__(self):
        return f"{self.title}, {self.meta}, {self.text}, {self.source}, {self.is_draft}"

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

    def __str__(self):
        return f"{self.name}, {self.email}, {self.gender}, {self.age}, {self.weight}, {self.height}, {self.training_level}, {self.purpose_of_training}"



class Program(models.Model):
    user = models.ForeignKey(verbose_name='пользователь', to=User, on_delete=models.CASCADE)
    is_current = models.BooleanField(verbose_name='текущая', default=True)
    created_at = models.DateTimeField(verbose_name='время создания')
    updated_at = models.DateTimeField(verbose_name='последнее обновление')

    class Meta:
        db_table = 'programs'
        verbose_name = 'программа'
        verbose_name_plural = 'программы'


class TrainingDay(models.Model):
    date = models.DateField(verbose_name='дата')
    program = models.ForeignKey(verbose_name='программа', to=Program, on_delete=models.CASCADE)
    created_at = models.DateTimeField(verbose_name='время создания')
    updated_at = models.DateTimeField(verbose_name='последнее обновление')

    class Meta:
        db_table = 'training_days'
        verbose_name = 'тренировка'
        verbose_name_plural = 'тренировки'


class Workout(models.Model):
    title = models.CharField(verbose_name='название упражнения', max_length=100)
    description = models.TextField(verbose_name='описание')
    approach_nums = models.SmallIntegerField(verbose_name='количество подходов')
    training_day = models.ForeignKey(verbose_name='тренировка', to=TrainingDay, on_delete=models.CASCADE)
    created_at = models.DateTimeField(verbose_name='время создания')
    updated_at = models.DateTimeField(verbose_name='последнее обновление')

    class Meta:
        db_table = 'workouts'
        verbose_name = 'упражнение'
        verbose_name_plural = 'упражнения'


class Approach(models.Model):
    workout = models.ForeignKey(verbose_name='упражнение', to=Workout, on_delete=models.CASCADE)
    quantity = models.SmallIntegerField(verbose_name='количество повторений')
    result = models.IntegerField(verbose_name='результат')
    created_at = models.DateTimeField(verbose_name='время создания')
    updated_at = models.DateTimeField(verbose_name='последнее обновление')

    class Meta:
        db_table = 'approaches'
        verbose_name = 'подход'
        verbose_name_plural = 'подходы'
