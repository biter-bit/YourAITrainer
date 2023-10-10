import httpx
import asyncio
import feedparser
from bs4 import BeautifulSoup
import os.path

from article.models import Article


async def site_parser(httpx_client, link_parse):
    '''Парсер странички со статьёй'''

    try:
        response = await httpx_client.get(link_parse)
    except:
        print(f'Ошибка подключения к {link_parse}')
        exit(1)

    soup = BeautifulSoup(response.text, "html.parser")
    article_text = ''
    for row in soup.select(".content--full")[0].find_all("div", class_='l-island-a')[1:-2]:
        raw_text = row.find_next('p').text
        if raw_text:
            article_text += f'{raw_text}\n'
        else:
            article_text += f'\n'
    return article_text


async def rss_parser(httpx_client, rss_link):
    '''Парсер rss ленты'''

    while True:
        try:
            response = await httpx_client.get(rss_link)
        except:
            await asyncio.sleep(10)
            continue

        feed = feedparser.parse(response.text)
        result = []

        for entry in feed.entries[::-1]:
            summary = entry['description']
            title = entry['title']
            source = entry['link']
            article_text = await site_parser(httpx_client, source)
            file = ''

            for link in entry['links']:
                if link['rel'] == 'enclosure' and link['type'].find('image') >= 0:
                    file_name = f'./media/images/{entry["guid"]}.{link["type"].split("/")[-1]}'

                    if not os.path.isfile(file_name):
                        with open(file_name, 'wb') as download_file:
                            url = link['href']
                            with httpx.stream("GET", url) as response:
                                for chunk in response.iter_bytes():
                                    download_file.write(chunk)
                            print(download_file.name)
                    file = '/'.join(file_name.split('/')[-2:])
                    continue

            result.append({
                'title': title,
                'source': source,
                'article_text': article_text,
                'short_description': summary,
                'file': file,
            })

        return result


def start_articles_import():
    rss_link = 'https://vc.ru/rss/tag/fitness'
    httpx_client = httpx.AsyncClient()

    imports = asyncio.run(rss_parser(httpx_client, rss_link))
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
