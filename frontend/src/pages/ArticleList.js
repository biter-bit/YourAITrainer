import React from 'react';
//import Menu from "./components/Menu";

const ArticlePage  = ({article})  => {
        return (

        <div class="articleList">
          <div class="articleListblock img">
          </div>

          <div class="articleListblock content">
            <div class="articleSubBlock Title">
                <h1> {article.title} </h1>
            </div>
            <div class="articleSubBlock content">
               <p> {article.content} </p>
            </div>
          <div class="articleSubBlock link"></div>
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