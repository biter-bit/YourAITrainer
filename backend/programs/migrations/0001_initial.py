from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Programs',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=256)),
                ('current', models.BooleanField(default=False)),
                ('time_create', models.DateTimeField(auto_now_add=True)),
                ('time_update', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Программа',
                'verbose_name_plural': 'Программы',
                'db_table': 'programs',
            },
        ),
        migrations.CreateModel(
            name='TrainingDay',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('day', models.IntegerField()),
                ('time_create', models.DateTimeField(auto_now_add=True)),
                ('time_update', models.DateTimeField(auto_now=True)),
                ('programs_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='programs.programs')),
            ],
            options={
                'verbose_name': 'Тренировочкый день',
                'verbose_name_plural': 'Тренировочные дни',
                'db_table': 'training_day',
            },
        ),
        migrations.CreateModel(
            name='Workout',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True)),
                ('approach_num', models.SmallIntegerField()),
                ('time_create', models.DateTimeField(auto_now_add=True)),
                ('time_update', models.DateTimeField(auto_now=True)),
                ('training_day_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='programs.trainingday')),
            ],
            options={
                'verbose_name': 'Тренировка',
                'verbose_name_plural': 'Тренировки',
                'db_table': 'workout',
            },
        ),
        migrations.CreateModel(
            name='Approaches',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('index', models.SmallIntegerField()),
                ('quantity', models.SmallIntegerField()),
                ('result', models.SmallIntegerField()),
                ('time_create', models.DateTimeField(auto_now_add=True)),
                ('time_update', models.DateTimeField(auto_now=True)),
                ('workout_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='programs.workout')),
            ],
            options={
                'verbose_name': 'Подход',
                'verbose_name_plural': 'Подходы',
                'db_table': 'approaches',
            },
        ),
    ]
