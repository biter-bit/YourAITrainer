from authentication.models import CustomUser
from backend import celery_app

from programs.models import Program, TrainingDay, Workout, Approach
from services import program_generator
import json


def parse_nums(num_str: str) -> int:
    """Функция парсит числа в случае если ответ получен в виде строки. Возвращает среднее значение."""
    nums = list(map(int, num_str.split('-')))
    return int(sum(nums) / len(nums))


def create_models(user_id: int, raw_program: dict, program_name: str) -> None:
    """Запись программы в БД"""
    program_obj = Program.objects.create(user_id=user_id, name=program_name)

    for day_num, workouts in raw_program.items():
        training_day = TrainingDay.objects.create(day_num=int(day_num), program=program_obj)

        for workout in workouts:
            num_of_approaches = workout['number_of_approaches'] if isinstance(workout['number_of_approaches'], int) \
                else parse_nums(workout['number_of_approaches'])

            num_of_repetitions = workout['number_of_repetitions'] if isinstance(workout['number_of_repetitions'], int) \
                else parse_nums(workout['number_of_repetitions'])

            workout_obj = Workout.objects.create(
                title=workout['title'],
                description=workout['desc'],
                approach_num=num_of_approaches,
                training_day=training_day
            )

            for _ in range(num_of_approaches):
                Approach.objects.create(quantity=num_of_repetitions, workout=workout_obj)


@celery_app.task
def start_program_generation(user_id: int, gender: str, age: int, weight: float, height: int, training_level: str,
                             purpose_of_training: str) -> str:
    raw_program = program_generator.gen_program(gender=gender, age=age, weight=weight, height=height,
                                                training_level=training_level, purpose_of_training=purpose_of_training)
    with open('test.json', 'w') as file:
        json.dump(raw_program, file)
    program_dict = {'weight_loss': 'Похудение', 'relief': 'Рельеф тела', 'muscle_mass': 'Набор мышечной массы',
                    'endurance': 'Выносливость'}
    level_dict = {'beginner': 'Новичок', 'amateur': 'Любитель', 'pro': 'Профессионал'}
    program_name = f'{program_dict[purpose_of_training]} ({level_dict[training_level]})'

    create_models(user_id=user_id, raw_program=raw_program, program_name=program_name)
    return 'Ok'