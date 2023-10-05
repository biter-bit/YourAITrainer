import React from 'react';
//import Menu from "./components/Menu";

const ArticlePage  = ({article})  => {
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

const ArticleList = ({articles}) => {
    return (
    <>
        {articles.map((article) => <ArticlePage article={article} />)}
    </>
    )
}


export default ArticleList;