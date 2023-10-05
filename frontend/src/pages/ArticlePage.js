import React from 'react';
//import Menu from "./components/Menu";
import { useParams } from 'react-router-dom';

function ArticlePage1(article) {
        

        return (

            <div class="articlePage">
                <h1>
                    {this.article.title}
                </h1>

             <div class="articleBlock link">
                <div class="articleSubBlock source">
                  {this.article.source}
                </div>

                <div class="articleSubBlock date">
                    {this.article.created_at}
                </div>
              </div>

              <div class="articleBlock content">
                <div class="articleSubBlock img">
                  <img src={this.article.img}
                    alt={'img ' + this.article.title}
                    align="left"
                    vspace="5" hspace="5"
                  />
                </div>
                <div class="articleSubBlock description">
                    <p>{this.article.content}</p>
                </div>
              </div>
            </div>
        );

}

function ArticleList1(article) {
    const numbers = article.numbers;
    const listItems = numbers.map((number) =>
    // Правильно! Ключ нужно определять внутри массива:
    <ArticlePage1 key={number.toString()} value={number} />
  );
  return (
    <ul>
      {ArticlePage1}
    </ul>

    //let { title } = useParams();
    //let filtered_items = articles.filter((article) => article.title == title)
    //return (
    //<>
    //    {articles.map((article) => <ArticlePage1 article={article} />)}
    //</>
    );
}

export default ArticlePage1;

