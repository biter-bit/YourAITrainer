from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Program',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time_create', models.DateTimeField(auto_now_add=True, verbose_name='время создания')),
                ('time_update', models.DateTimeField(auto_now=True, verbose_name='последнее обновление')),
                ('name', models.CharField(max_length=100, verbose_name='название')),
                ('is_current', models.BooleanField(default=True, verbose_name='текущая')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='пользователь')),
            ],
            options={
                'verbose_name': 'программа',
                'verbose_name_plural': 'программы',
                'db_table': 'programs',
            },
        ),
        migrations.CreateModel(
            name='TrainingDay',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time_create', models.DateTimeField(auto_now_add=True, verbose_name='время создания')),
                ('time_update', models.DateTimeField(auto_now=True, verbose_name='последнее обновление')),
                ('day_num', models.SmallIntegerField(verbose_name='номер тренировки')),
                ('program', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='programs.program', verbose_name='программа')),
            ],
            options={
                'verbose_name': 'тренировка',
                'verbose_name_plural': 'тренировки',
                'db_table': 'training_days',
            },
        ),
        migrations.CreateModel(
            name='Workout',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time_create', models.DateTimeField(auto_now_add=True, verbose_name='время создания')),
                ('time_update', models.DateTimeField(auto_now=True, verbose_name='последнее обновление')),
                ('title', models.CharField(max_length=100, verbose_name='название')),
                ('description', models.TextField(verbose_name='описание')),
                ('approach_num', models.SmallIntegerField(verbose_name='количество подходов')),
                ('training_day', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='programs.trainingday', verbose_name='тренировка')),
            ],
            options={
                'verbose_name': 'упражнение',
                'verbose_name_plural': 'упражнения',
                'db_table': 'workout',
            },
        ),
        migrations.CreateModel(
            name='Approach',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time_create', models.DateTimeField(auto_now_add=True, verbose_name='время создания')),
                ('time_update', models.DateTimeField(auto_now=True, verbose_name='последнее обновление')),
                ('quantity', models.SmallIntegerField(verbose_name='количество повторений')),
                ('result', models.SmallIntegerField(blank=True, null=True, verbose_name='результат')),
                ('workout', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='programs.workout', verbose_name='упражнение')),
            ],
            options={
                'verbose_name': 'подход',
                'verbose_name_plural': 'подходы',
                'db_table': 'approaches',
            },
        ),
    ]
