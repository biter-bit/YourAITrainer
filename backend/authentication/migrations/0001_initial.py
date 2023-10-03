import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.ASCIIUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.CharField(error_messages={'unique': 'A user with that email address already exists.'}, max_length=256, unique=True, verbose_name='email address')),
                ('password_confirmation', models.CharField(blank=True, max_length=128, null=True)),
                ('gender', models.CharField(choices=[('m', 'мужской'), ('f', 'женский')], default=False, max_length=1, verbose_name='пол')),
                ('age', models.PositiveIntegerField(default=False, verbose_name='возраст')),
                ('weight', models.SmallIntegerField(default=False, verbose_name='вес')),
                ('height', models.SmallIntegerField(default=False, verbose_name='рост')),
                ('training_level', models.CharField(choices=[('beginner', 'новичок'), ('amateur', 'любитель'), ('pro', 'профессионал')], default=False, max_length=8, verbose_name='уровень пользователя')),
                ('purpose_of_training', models.CharField(choices=[('weight_loss', 'похудение'), ('relief', 'рельеф тела'), ('muscle_mass', 'набор мышечной массы'), ('endurance', 'выносливость')], default=False, max_length=12, verbose_name='цель программы')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='время создания')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='последнее обновление')),
                ('phone', models.CharField(blank=True, max_length=30, null=True, verbose_name='phone number')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active.             Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(auto_now_add=True, verbose_name='date joined')),
                ('is_verified', models.BooleanField(default=False, verbose_name='verified')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'unique_together': {('username', 'email', 'phone')},
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
    ]
