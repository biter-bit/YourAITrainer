import React from 'react';
import ArticlePreview from "./ArticlePreview";

const Articles = ({articles}) => {

  return (
    <>
        {
        articles.map((article) => {
            return (
            <ArticlePreview key={article.id} article={article} />
            )
          }
        )
        }
    </>
  );
};

export default Articles;
