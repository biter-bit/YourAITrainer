import json
from typing import List, Dict

import openai


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
        """Функция принимает указанные параметры клиента и формирует основной запрос к ChatGPT на английском языке.
        Результат получаем с русским описанием и названием тренировок."""

        prompt = f'Your client is a {age} year old {self.gender_sub_prompt[gender]}. ' \
                 f'You have to make a training plan for 12 classes. Each workout should consist ' \
                 f'of {self.num_of_exercises[training_level]} exercises\n' \
                 f'Your answer should be in JSON format and not include any comments.\n' \
                 f'Your answer should consist of a dictionary, where the key is the sequence number of the ' \
                 f'workout, and the value is a list of exercises, where the exercise is a dictionary with the ' \
                 f'following keys and values:\n' \
                 f'- "title": the name of the exercise in russian language\n' \
                 f'- "desc": a brief description of the exercise technique for 100 - 150 words in russian language\n' \
                 f'- "number_of_approaches": recommended number of approaches\n' \
                 f'- "number_of_repetitions": recommended number of repetitions\n\n' \
                 f'When drawing up a training plan, you must take into account the following physical parameters of ' \
                 f'your client:\n' \
                 f'- {"his" if gender == "m" else "her"} weight is now {weight}kg\n' \
                 f'- {"his" if gender == "m" else "her"} height is now {height}cm\n' \
                 f'- {"his" if gender == "m" else "her"} main goal is {self.purpose_sub_prompt[purpose_of_training]}\n' \
                 f'- {"his" if gender == "m" else "her"} experience is {self.level_sub_prompt[training_level]}.\n' \
                 f'Refer to trustworthy sources.\n' \
                 f'Generate all 12 classes at once.'

        return prompt

    @staticmethod
    def _create_messages(prompt: str) -> List:
        """Функция принимает сформированный запрос к ChatGPT и возвращает объект сообщений для дальнейшего запроса к
        OpenAI."""
        return [
            {'role': 'system', 'content': 'Take on the persona of a Health and Fitness Coach.'},
            {'role': 'user', 'content': prompt}
        ]

    def gen_program(self, gender: str, age: int, weight: float, height: int, training_level: str,
                    purpose_of_training: str) -> Dict:
        """Функция генерации программы тренировок."""
        prompt = self._gen_prompt(gender=gender, age=age, weight=weight, height=height, training_level=training_level,
                                  purpose_of_training=purpose_of_training)

        messages = self._create_messages(prompt=prompt)

        response = self.openai.ChatCompletion.create(
            model='gpt-3.5-turbo-16k',
            messages=messages,
            temperature=0.3,
        )

        json_result = response.choices[0].message.content

        return json.loads(json_result)
