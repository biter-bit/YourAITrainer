import time
from typing import Dict

from requests import Session


class Deepl:
    def __init__(self, api_token):
        self.headers = {
            'Authorization': 'DeepL-Auth-Key ' + api_token,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
        self.url = 'https://api-free.deepl.com/v2/translate'

    def _make_request(self, text: str) -> str:
        payload = {
            'text': text,
            'target_lang': 'RU'
        }

        with Session() as session:
            response = session.post(url=self.url, data=payload, headers=self.headers)
            if response.ok:
                result = response.json()
                return result.get('translations')[0].get('text')

    def translate_dict(self, program: Dict) -> Dict:
        start_time = time.time()
        for day in program.values():
            for exercise in day:
                exercise['title'] = self._make_request(exercise['title'])
                exercise['desc'] = self._make_request(exercise['desc'])

        print(f'Translate time: {time.time() - start_time}s.')

        return program
