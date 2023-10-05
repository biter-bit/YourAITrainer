import React from 'react';
//import Menu from "./components/Menu";
import { useParams } from 'react-router-dom';

const ArticlePage1  = ({article})  => {
        return (

            <div class="articlePage">
                <h1>
                    {article.title}
                </h1>

             <div class="articleBlock link">
                <div class="articleSubBlock source">
                  {article.source}
                </div>

                <div class="articleSubBlock date">
                    {article.created_at}
                </div>
              </div>

              <div class="articleBlock content">
                <div class="articleSubBlock img">
                  <img src={article.img}
                    alt={'img ' + article.title}
                    align="left"
                    vspace="5" hspace="5"
                  />
                </div>
                <div class="articleSubBlock description">
                    <p>{article.content}</p>
                </div>
              </div>
            </div>
        )
}

const ArticleList1 = ({articles}) => {

    let { title } = useParams();
    let filtered_items = articles.filter((article) => article.title == title)
    return (
    <>
        {articles.map((article) => <ArticlePage1 article={article} />)}
    </>
    )
}


export default ArticleList1;
