![YourAITrainer](https://github.com/biter-bit/YourAITrainer/blob/main/content/exact_inscription_youraitrainer_bodybuilding_an.jpg)
YourAITrainer
===============

Веб-сервис представляет из себя личного тренера на основе искусственного интеллекта. Позволяет создавать программу тренировок на основе цели и определенных показателей пользователя. Вы можете посмотреть работу сервиса тут [youraitrainer.ru](https://youraitrainer.ru). На данный момент сервис генерирует 1 тренировочный день в качестве демонстрации, чтобы генерация была быстрее. В качестве искусственного интеллекта выступает ChatGPT 3.5-turbo-16k. Проект состоит из следующих технологий: 

- django
- react
- postgres
- celery
- redis

Дополнительно можно просматривать актуальные статьи по спорту.

# Использование

Сервис можно разделить на 3 блока:

1) Главная страница

Страница находится по адресу [https://youraitrainer.ru/](https://youraitrainer.ru/). Сюда пользователь попадает при первом посещении. Для незарегестрированного пользователя доступен просмотр статей. Чтобы получить доступ к другим страницам пользователь должен зарегестрироваться. На этой странице есть формы регистрации и авторизации.

![Пример отображения главной страницы](https://github.com/biter-bit/YourAITrainer/blob/main/content/main-2.png)

![Пример отображения авторизации](https://github.com/biter-bit/YourAITrainer/blob/main/content/authorization.png)

![Пример отображения регистрации](https://github.com/biter-bit/YourAITrainer/blob/main/content/registration.png)

2) Статьи

Этот блок представляет из себя просмотр как отдельных статей, так и всех статей сразу. Страница находится по адресу [https://youraitrainer.ru/articles/](https://youraitrainer.ru/articles/). 

![Пример отображения всех статей](https://github.com/biter-bit/YourAITrainer/blob/main/content/articles.png)

Для просмотра отдельной статьи нужно указать путь /article/<номер статьи>/ ([https://youraitrainer.ru/article/1](https://youraitrainer.ru/article/1))

![Пример отображения статьи](https://github.com/biter-bit/YourAITrainer/blob/main/content/article.png)

3) Дневник тренировок

После авторизации открывается доступ к генерации и ведению тренировок. Страница находится по адресу [https://youraitrainer.ru.ru/diary/](https://youraitrainer.ru/diary/). Также на этой странице можно менять данные пользователя

![Пример отображения страницы дневника](https://github.com/biter-bit/YourAITrainer/blob/main/content/diary.png)

![Пример отображения формы генерации тренировок](https://github.com/biter-bit/YourAITrainer/blob/main/content/generation.png)
