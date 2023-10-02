import httpx
import asyncio
import feedparser
from scrapy.selector import Selector


async def site_parser(httpx_client, link_parse):
    '''Парсер странички со статьёй'''

    try:
        response = await httpx_client.get(link_parse)
    except:
        print(f'Ошибка подключения к {link_parse}')
        exit(1)

    selector = Selector(text=response.text)
    article_text = ''
    for row in selector.xpath('//div[@class="content content--full "]')[0].xpath('//div[@class="l-island-a"]')[1:-2]:
        raw_text = row.xpath('*//text()').extract()
        if raw_text:
            article_text += f'{raw_text[0]}\n'
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
            # summary = entry['description']
            title = entry['title']
            source = entry['link']
            article_text = await site_parser(httpx_client, source)
            # news_text = f'Заголовок: {title}\nИсточник: {source}\nТекст статьи:\n{article_text}'

            result.append({
                'title': title,
                'source': source,
                'article_text': article_text,
            })

        return result


def start_articles_import():
    rss_link = 'https://vc.ru/rss/tag/fitness'
    httpx_client = httpx.AsyncClient()

    return asyncio.run(rss_parser(httpx_client, rss_link))


if __name__ == "__main__":
    print(start_articles_import())
