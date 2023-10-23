import httpx
import asyncio
from bs4 import BeautifulSoup
import os.path

from article.models import Article


async def get_article_text(httpx_client, link_parse):
    '''Парсер странички со статьёй'''

    try:
        response = await httpx_client.get(link_parse)
    except:
        print(f'Ошибка подключения к {link_parse}')
        exit(1)

    soup = BeautifulSoup(response.text, "html.parser")
    article_text = ''
    for row in soup.select(".pos-content")[0].find_next("div", class_='element-textarea'):
        raw_text = row.text
        if raw_text:
            article_text += raw_text
        else:
            article_text += f'\n'

    return article_text


async def site_parser_justsport(httpx_client, link_parse):
    '''Парсер списка статей'''

    while True:
        try:
            response = await httpx_client.get(link_parse)
        except:
            await asyncio.sleep(10)
            continue

        soup = BeautifulSoup(response.text, "html.parser")
        result = []

        for article in soup.select(".items-col-3")[0].find_all("div", class_='teaser-item'):

            summary = article.find_next('div', class_='element-text').text
            title = article.find_next('div', class_='element-itemname').text
            source = f'https://justsport.info{article.find_next("a").attrs["href"]}'
            article_text = await get_article_text(httpx_client, source)

            file = ''

            image = article.find_next('div', class_='element-image').find_next('img').attrs['src']
            if image:
                file_name = f'./media/images/{image.split("/")[-1]}'
                if not os.path.isfile(file_name):
                    with open(file_name, 'wb') as download_file:
                        url = image
                        with httpx.stream("GET", url) as response:
                            for chunk in response.iter_bytes():
                                download_file.write(chunk)
                    file = '/'.join(file_name.split('/')[-2:])

            result.append({
                'title': title,
                'source': source,
                'article_text': article_text,
                'short_description': summary,
                'file': file,
            })
        return result


def start_articles_import():
    link_parse = 'https://justsport.info/fitness'
    httpx_client = httpx.AsyncClient()

    imports = asyncio.run(site_parser_justsport(httpx_client, link_parse))
    count = 0

    if not imports:
        return False, 0

    for article in imports:
        if not len(Article.objects.filter(title=article['title'])):
            news_article = Article(
                title=article['title'],
                content=article['article_text'],
                short_description=article['short_description'],
                source=article['source'],
                file=article['file'],
                published=True,
            )
            news_article.save()
            count += 1

    return True, count


if __name__ == "__main__":
    print(start_articles_import())
