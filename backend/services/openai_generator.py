import json
import time
from pprint import pprint
from typing import List, Dict
import logging

import openai

from backend.services.translator import Deepl

logging.basicConfig(level=logging.INFO)


class ProgramGenerator:
    def __init__(self, openai_token: str) -> None:
        self.openai = openai
        self.openai.api_key = openai_token
        self.gender_sub_prompt = {
            'm': 'man',
            'f': 'woman'
        }
        self.purpose_sub_prompt = {
            'weight_loss': 'to lose weight',
            'relief': 'to improve the relief of the body',
            'muscle_mass': 'to gain muscle mass',
            'endurance': 'to increase endurance'
        }
        self.level_sub_prompt = {
            'beginner': 'new',
            'amateur': 'from 1 to 3 years of training in the gym',
            'pro': 'more than 3 years of training in the gym'
        }
        self.num_of_exercises = {
            'beginner': 4,
            'amateur': 5,
            'pro': 6
        }

    def _gen_prompt(self, gender: str, age: int, weight: float, height: int, training_level: str,
                    purpose_of_training: str) -> str:
        """Функция принимает указанные параметры клиента и формирует основной запрос к ChatGPT на английском языке."""

        prompt = f'Your client is a {age} year old {self.gender_sub_prompt[gender]}. ' \
                 f'You have to make a training plan for 12 classes. Each workout should consist ' \
                 f'of {self.num_of_exercises[training_level]} exercises\n' \
                 f'Your answer should be in JSON format and not include any comments.\n' \
                 f'Your answer should consist of a dictionary, where the key is the sequence number of the ' \
                 f'workout, and the value is a list of exercises, where the exercise is a dictionary with the ' \
                 f'following keys and values:\n' \
                 f'- "title": the name of the exercise\n' \
                 f'- "desc": a brief description of the exercise technique for 100 - 150 words\n' \
                 f'- "number_of_approaches": recommended number of approaches\n' \
                 f'- "number_of_repetitions": recommended number of repetitions\n\n' \
                 f'When drawing up a training plan, you must take into account the following physical parameters of ' \
                 f'your client:\n' \
                 f'- {"his" if gender == "m" else "her"} weight is now {weight}kg\n' \
                 f'- {"his" if gender == "m" else "her"} height is now {height}cm\n' \
                 f'- {"his" if gender == "m" else "her"} main goal is {self.purpose_sub_prompt[purpose_of_training]}\n' \
                 f'- {"his" if gender == "m" else "her"} experience is {self.level_sub_prompt[training_level]}.\n' \

        return prompt

    @staticmethod
    def _create_messages(prompt: str) -> List:
        """Функция принимает сформированный запрос к ChatGPT и возвращает список сообщений для дальнейшего запроса."""
        return [
            {'role': 'system', 'content': 'Take on the persona of a Health and Fitness Coach.'},
            {'role': 'user', 'content': prompt}
        ]

    def gen_program(self, gender: str, age: int, weight: float, height: int, training_level: str,
                    purpose_of_training: str) -> Dict:
        start_time = time.time()
        prompt = self._gen_prompt(gender=gender, age=age, weight=weight, height=height, training_level=training_level,
                                  purpose_of_training=purpose_of_training)

        messages = self._create_messages(prompt=prompt)

        result = self.openai.ChatCompletion.create(
            model='gpt-3.5-turbo-16k',
            messages=messages,
            temperature=0.3,
        )

        result = result.choices[0].message.content

        if len(json.loads(result)) < 12:
            self.gen_program(gender, age, weight, height, training_level, purpose_of_training)

        with open('test.json', 'w', encoding='utf-8') as file:
            file.write(result)

        print(f'Time: {int(time.time() - start_time)}s.')

        return json.loads(result)


if __name__ == '__main__':
    generator = ProgramGenerator(openai_token='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')
    translater = Deepl(api_token='616e6dd7-e1ba-5ef6-42a3-a558ab6cb254:fx')

    program = generator.gen_program(
        gender='m',
        age=38,
        weight=89,
        height=180,
        training_level='pro',
        purpose_of_training='relief'
    )

    print('Start translating')

    translate = translater.translate_dict(program)

    pprint(translate)


