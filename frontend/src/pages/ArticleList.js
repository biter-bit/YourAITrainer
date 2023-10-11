import React from 'react';
//import Menu from "./components/Menu";

const ArticlePage  = ({article})  => {
        return (

        <div class="articleList">
          <div class="articleListblock Articleimg">
            <img src={article.img}
                    alt={'img ' + article.title}
                    align="left"
                    vspace="5" hspace="5"
            />
          </div>

          <div class="articleListblock content">
            <div class="articleSubBlock Title">
                <h3> {article.title} </h3>
            </div>
            <div class="articleSubBlock content">
                {article.content}
            </div>
          <div class="articleSubBlock link">
          <p> {article.source + article.created_at} </p>

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